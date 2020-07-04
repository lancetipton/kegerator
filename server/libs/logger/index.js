'use strict'
const path = require('path')
const events = require('events')
const { spawn } = require('child_process')
const util = require('util')
const CBuffer = require('CBuffer')
const byline = require('byline')

const buildTail = (Logger, paths, options) => {

  // Edge Case - Set the follow options based on the platform
  const followOpt = process.platform === 'openbsd' ? '-f' : '-F'
  const firstPath = path.resolve(process.env.HOME, paths[0])

  // Build a tile of the passed in path
  const tail = spawn('tail', ['-n', options.buffer, followOpt].concat(firstPath))

  // If there is any important error then display it in the console. Logger will keep running.
  // File can be truncated over network.
  tail.stderr
    .on('data', (data) => {
      data.toString().indexOf('file truncated') === -1 && console.error(data.toString())
    })
  
  // call helper to emmit incoming lines through event emmiter
  buildByLine(Logger, tail.stdout)

  // Kill the tail, when the process dies
  process.on('exit', () => tail.kill())

}

const buildByLine = (Logger, lineFrom) => {

  byline(lineFrom || process.stdin)
    .on('data', line => {
      // Get the incoming line
      const str = line.toString()
      // Add it to the buffer
      Logger._buffer.push(str)
      // Then emmit the line with the event emmiter
      Logger.emit('line', str)
    })
}

function Logger(paths, opts) {

  // Initialze the event emmiter
  events.EventEmitter.call(this)

  // Setup any passed in options
  const options = opts || { buffer: 0 }

  // Build the buffer for storing the logs
  this._buffer = new CBuffer(options.buffer)

  // Check if the tail option is passed in
  paths[0] === '-' ? buildByLine(this) : buildTail(this, paths, options)
}

// Add the event emitter to the Logger
util.inherits(Logger, events.EventEmitter)

// Helpers to the buffer
Logger.prototype.getBuffer = function getBuffer() {
  return this._buffer.toArray()
}

module.exports = (paths, options) => new Logger(paths, options)