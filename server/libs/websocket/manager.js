const { isFunc, isObj, isStr, checkCall } = require('@ltipton/jsutils')
const svAuth = require('../auth')
const { commands } = require('KegSCmds')
const { EventTypes } = require('KegSConst')

const logError = (e, method) => {
  console.log(`[ Socket Error ] --- SocketManager.${method}`)
  console.error(e.stack)
}

class SocketManager {
  
  constructor(opts={}){
    this.auth = opts.auth
    this.peers = {}
    this.socketIo
    this.isRunning = false
  }
  
  setAuth(auth){
    this.auth = auth
  }
  
  add(socket, io){
    this.peers[ socket.id ] = socket
    socket.on('disconnect', _ => this.onDisconnect(socket))

    return socket.id
  }

  getId(sockOrId){
    return isStr(sockOrId) && sockOrId || sockOrId.id
  } 
  
  getSocket(id){
    return this.peers[id]
  }
  
  formatMessage(data){
    try {
      return JSON.stringify(!isObj(data) && { data } || data)
    }
    catch(err){
      console.error(err.stack)
      return JSON.stringify({ error: 'Error in SocketManager.formatMessage' })
    }
  }

  emit(socket, tag, data){
    try {
      if(isStr(socket)) socket = this.getSocket(socket)
      
      socket && isFunc(socket.emit)
        ? socket.emit(tag, this.formatMessage(data))
        : console.error(`Socket is required to emit an event!`)
    }
    catch(err){
      console.error(err.stack)
    }
  }
  
  broadCastAll(socket, tag, data){
    try {
      if(isStr(socket)) socket = this.getSocket(socket)
      
      socket && socket.broadcast &&
        isFunc(socket.broadcast.emit) &&
        socket.broadcast.emit(tag, this.formatMessage(data))
    }
    catch(err){
      console.error(err.stack)
    }
  }

  emitAll(type, data){
    try {
      if(!this.socketIo) return console.error(`Socket.IO is not set on SocketManager!`)
      if(!type) return console.error(`SocketManager.emitAll requires an event type as param 2!`)

      this.socketIo.emit(
        type,
        JSON.stringify(!isObj(data) && { data } || data)
      )
    }
    catch(err){
      console.error(err.stack, 'emitAll')
    }
  }

  authToken(socket, message, cb){

    // If no token, then return with an error
    if(this.auth && !message.token)
      return cb(new Error(`Missing authorization. Please login!`), false)

    // Add the token to the socket
    socket[EventTypes.AUTH_TOKEN] = message.token

    // Setup the socket
    this.setupSocket(socket)

    // Call the callback as valid
    cb(null, true)

  }

  async checkAuth(socket, message, cb){
    if(!this.auth) return checkCall(cb, this, socket, message)
    
    const token = socket[EventTypes.AUTH_TOKEN]
    const authorized = token && await svAuth.validate(token)

    authorized && authorized.isValid
      ? checkCall(cb, this, socket, message)
      : this.disconnect(socket)
  }

  setupSocket(socket, kegTasks){

    try {

      const id = this.add(socket)
      if(!id)
        return console.error('Could not add socket. No id returned.', socket, id)

      this.emit(
        socket,
        EventTypes.SET_ID,
        { 
          id,
          tasks: kegTasks,
          isRunning: this.isRunning,
          peers: Object.keys(this.peers)
        }
      )

      this.broadCastAll(
        socket,
        EventTypes.ADD_PEER,
        { id: socket.id, peers: Object.keys(this.peers) }
      )
    }
    catch(err){
      console.error(err.stack)
    }

  }

  disconnect(socket, message){
    if(!socket) return
    
    // Update the client with the NOT_AUTHORIZED event
    this.emit(
      socket,
      EventTypes.NOT_AUTHORIZED,
      { message: message || 'Missing authorization. Please login!' }
    )

    // Wait a little bit tl allow the NOT_AUTHORIZED event to be sent,
    setTimeout(() => socket.disconnect(), 100)

  }

  onDisconnect(socket){
    try {
      if(!this.peers[socket.id]) return
      
      delete this.peers[socket.id]
      this.emitAll(
        EventTypes.PEER_DISCONNECT,
        { id: socket.id, peers: Object.keys(this.peers) }
      )
    }
    catch(err){
      console.log(err.stack)
      if(isObj(this.peers)) delete this.peers[socket.id]
    }
  }

}

const Manager = new SocketManager()

module.exports = Manager
