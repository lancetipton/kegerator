'use strict'

const path = require('path')
const SocketIO = require('socket.io')
const fs = require('fs')
const untildify = require('untildify')
const Logger = require('../logger')
const appConfig = require('KegConfigs/app.config')

const { HIGHLIGHT, PRESET, URL_PATH, LINES, NUMBER, NO_INDENT } = process.env
const config = {
  highlight: HIGHLIGHT || false,
  preset: PRESET,
  number: NUMBER || 10,
  lines: LINES || 2000,
  urlPath: URL_PATH,
  noIndent: NO_INDENT || false
}

const getHighlightConf = () => {
  if (config.highlight) {
    const presetPath = !config.preset
      ? path.join(__dirname, '../logger/preset/default.json')
      : path.resolve(untildify(config.preset))
    
    if(!fs.existsSync(presetPath))
      throw new Error(`Preset file ${presetPath} doesn't exists`)

    return JSON.parse(fs.readFileSync(presetPath))
  }
}

const setupFileSocket = (io, logger) => {
  return io
    .on('connection', socket => {
      // Set the initial lines to see to the frontend
      socket.emit('options:lines', config.lines)

      // Setup config options
      if (config.noIndent) socket.emit('options:no-indent')
      if (config.highlight) socket.emit('options:highlightConfig', getHighlightConf())

      // Get the buffer from the logger and emmit to the front end
      logger
        .getBuffer()
        .map(line => socket.emit('line', line))
        
      // Send incoming data from the Logger
      logger.on('line', (line) => socket.emit('line', line))
    })
}

/**
  * socket.io setup
  */
const setupWebSocket = (server, files) => {
  
  // Setup the socket
  const io = new SocketIO({ path: appConfig.websocket.paths.socket })

  // attache to the server
  io.attach(server)

  // Connect to the logger, and send starting data
  const logger = Logger(files, { buffer: config.number })
  const filesSocket = setupFileSocket(io, logger)

  // Ensure we cleanup on exit
  process.on('SIGINT', process.exit)
  process.on('SIGTERM', process.exit)

}



module.exports = setupWebSocket
