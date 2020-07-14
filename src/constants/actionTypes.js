import { keyMap } from 'jsutils'

export const ActionTypes = keyMap(
  [
    // Navigation Tabs
    'UPDATE_ACTIVE_TAB',

    // Messages
    'TOGGLE_MESSAGE_MODAL',
    'REMOVE_MESSAGE',
    'CLEAR_MESSAGES',

    // Command actions
    'SET_CMDS',
    'CMD_SELECTED',
    'CMD_RUNNING',
    'CMD_UPDATE_PARAM',
    'ON_MESSAGE',
    'ON_FAIL',
    'IS_RUNNING',
    'TOGGLE_GROUP',

    // Api actions
    'API_RESPONSE',
    'API_ERROR',
    
    // Web sockets
    'ON_CONNECTED',
    'SET_ID',
    'ADD_PEER',
    'DISCONNECT_PEER',

    
    // SV auth token
    'SET_AUTH_TOKEN',
    'SET_AUTH_ERROR',
  ],
  true
)
