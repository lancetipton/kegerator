import io from 'socket.io-client';
import { EventTypes } from 'SVConstants'
import { isFunc } from '@ltipton/jsutils'
import {
  addPeer,
  onConnected,
  onFail,
  onMessage,
  peerDisconnect,
  setCommands,
  setId,
  toggleIsRunning,
} from 'SVActions'

const isDEV = process.env.NODE_ENV === 'development'

const formatEvt = (cb) => {
  return message => isFunc(cb) && cb(message && JSON.parse(message))
}

// All events that toggle the isRunning bool
const runningToggleEvents = [
  EventTypes.CMD_RUNNING,
  EventTypes.CMD_END,
]

class SocketService {
  
  buildEndpoint = websocket => {
    return websocket.port
      ? `${websocket.endpoint}:${websocket.port}`
      : websocket.endpoint
  }

  initSocket = (config, token) => {
    // If the sockets already setup, just return
    if(this.socket) return

    // Setup the socket, and connect to the server
    this.socket = io(this.buildEndpoint(config), {
      path: config.paths.socket,
    })

    this.addEvents(token)
  }
  
  addEvents = token => {
    if(!this.socket) return
    
    // Initial connection to the server through the socket
    // Call the onConnection method which will handel authorization
    this.socket.on(`connect`, formatEvt(this.onConnection.bind(this, token)))
    
    // EventTypes.SET_ID is called directly after the Auth token
    // You can assume at this point, the user is authorized
    this.socket.on(EventTypes.SET_ID, formatEvt(message => {
      console.log(`---------- message ----------`)
      console.log(message)
      // onConnected(message)
      // setId(message)
      // setCommands(message)
    }))

    // Add / Remove peer users, may be used later
    this.socket.on(EventTypes.ADD_PEER, formatEvt(addPeer))
    this.socket.on(EventTypes.PEER_DISCONNECT, formatEvt(peerDisconnect))

    // The event captures the command output from the server
    this.socket.on(EventTypes.CMD_OUT, formatEvt(onMessage))
    
    // The event captures the command error output from the server
    this.socket.on(EventTypes.CMD_ERR, formatEvt(onMessage))

    // The event captures the command fail output from the server
    this.socket.on(EventTypes.CMD_FAIL, formatEvt(onFail))


    // Ensure the isRunning toggle is switched off after a command finishes running
    // Loops through the toggle event types and adds a listener for each one
    runningToggleEvents.map(event => this.socket.on(
      event,
      formatEvt(toggleIsRunning)
    ))

  }

  onConnection = token => {
    // Send the token to the server to be validated
    // this.emit(EventTypes.AUTH_TOKEN, { token: token })
  }

  emit = (type, data) => {
    if(!this.socket)
      return console.error(`Socket not connected, cannot emit socket event!`)
      
    if(!type)
      return console.error(`Event type is missing, cannot emit socket event!`, type)

    // Send a message to the server
    this.socket.emit(type, data)
  }

  disconnect = () => {
    if(!this.socket) 
      return console.log(`Socket already disconnected!`)
      
    console.log(`Disconnecting from Socket!`)
    this.socket.disconnect()
    this.socket = undefined
  }

}

const WSService = new SocketService()

export { WSService }
