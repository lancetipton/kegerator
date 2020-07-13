
const SocketIO = require('socket.io')
const { checkCall, get } = require('@ltipton/jsutils')
const { commands } = require('KegSCmds')
const SocketManager = require('./manager')
const { EventTypes } = require('KegSConst')
const config = require('KegConfigs/server.config')

const setupSocketCmds = (socket) => {
  // Check for auth, and setup an auth token if needed
  return !SocketManager.auth
    ? checkCall(() => {
        // Setup the socket, and update connected peers
        SocketManager.setupSocket(socket)
        // Setup the socket commands to listen too
        return commands(socket, SocketManager)
      })
    : socket.on(EventTypes.AUTH_TOKEN, message => {
        // Setup the auth token
        SocketManager.authToken(socket, message, (error, authorized) => {

          // If authorized, setup the commands
          if(authorized) return commands(socket, SocketManager)

          // If not authorized, log it and disconnect the socket!
          const message = error && error.message || `Unauthorized socket connection!`
          console.error(error && error.stack || message, socket) 
          SocketManager.disconnect(socket, message)

        })
      })
}

const setupWebSocket = server => {
  // Setup the socket
  const io = new SocketIO({ path: get(config, 'websocket.paths.socket', "/socket") })

  // attache to the server
  io.attach(server)

  // Ensure we have access to the SocketIO class
  SocketManager.socketIo = SocketManager.socketIo || io

  // Setup the socket listener, and add socket commands listener
  io.on('connection', socket => setupSocketCmds(socket))

}

module.exports = {
  websocket: setupWebSocket
}
