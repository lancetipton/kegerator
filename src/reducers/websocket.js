import { ActionTypes } from 'SVConstants'


const initialState = {
  connected: false,
  peers: [],
  id: null,
  runningCmd: null,
  isRunning: false,
}

export function websocket(state = initialState, action) {
  switch (action.type) {

    case ActionTypes.ON_CONNECTED: {
      return {
        ...state,
        connected: true,
      }
    }

    case ActionTypes.SET_ID: {
      return !action.id
        ? state
        : {
          ...state,
          id: action.id,
          peers: action.peers,
          isRunning: action.isRunning,
        }
    }

    case ActionTypes.IS_RUNNING: {
      return {
        ...state,
        runningCmd: action.isRunning && action.name || null,
        isRunning: action.isRunning,
      }
    }

    case ActionTypes.ADD_PEER: {
      return !action.peers
        ? state
        : {
          ...state,
          peers: action.peers,
        }
    }
    
    case ActionTypes.DISCONNECT_PEER: {
      return !action.peers
        ? state
        : {
          ...state,
          peers: action.peers,
        }
    }

    default: {
      return state
    }
  }
}
