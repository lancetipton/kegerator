
const SocketIO = require('socket.io')
const { checkCall, get } = require('@ltipton/jsutils')
const { commands } = require('KegSCmds')
const SocketManager = require('./manager')
const { EventTypes } = require('KegSConst')
const config = require('KegConfigs/server.config')

const setupSocketCmds = (socket, kegTasks) => {
  // Setup the socket, and update connected peers
  SocketManager.setupSocket(socket, kegTasks)
  // Setup the socket commands to listen too
  return commands(socket, SocketManager)
}

const setupWebSocket = (server, kegTasks) => {
  // Setup the socket
  const io = new SocketIO({ path: get(config, 'websocket.paths.socket', "/socket") })

  // attache to the server
  io.attach(server)

  // Ensure we have access to the SocketIO class
  SocketManager.socketIo = SocketManager.socketIo || io

  // Setup the socket listener, and add socket commands listener
  io.on('connection', socket => setupSocketCmds(socket, kegTasks))

}

module.exports = {
  websocket: setupWebSocket
}
