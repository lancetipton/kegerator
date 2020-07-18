import { ActionTypes } from 'SVConstants'
import { get, unset } from 'jsutils'

const initialState = {
  selected: null,
  params: {},
  group: null,
  messages: {},
}

const getTimeStamp = () => new Date().getTime()

export function commands(state = initialState, action) {
  switch (action.type) {

    case ActionTypes.SET_CMDS: {
      return !action.commands
        ? state
        : {
            ...state,
            list: action.commands,
            messages: Object.keys(commands).reduce((messageObj, key) => {
              messageObj[key] = {}
              return messageObj
            }, {}),
          }
    }

    case ActionTypes.CMD_SELECTED: {
      return !action.selected || action.selected === state.selected
        ? state
        : {
          ...state,
          selected: action.selected,
          params: {},
        }
    }

    case ActionTypes.CMD_UPDATE_PARAM: {
      return !action.params
        ? state
        : {
          ...state,
          params: action.params
        }
    }

    case ActionTypes.ON_MESSAGE: {

      const { type, name, group, ...message } = action
      const command = name && state.list[group][name]
      if(!command) return state

      const hasMessage = get(state.messages, `${name}.${message.timestamp}`)
      hasMessage && ( message.timestamp = getTimeStamp() )

      return hasMessage && hasMessage.message === message.message
        ? state
        : {
            ...state,
            messages: {
              ...state.messages,
              [name]: {
                ...(state.messages[name] || {}),
                [ message.timestamp ]: message
              }
            }
          }

    }

    case ActionTypes.TOGGLE_MESSAGE_MODAL: {
      return {
        ...state,
        openMessage: action.isVisible
      }
    }

    case ActionTypes.REMOVE_MESSAGE: {

      const key = action.key || state.selected
      const messageList = state.messages[ key ]
      if(!messageList) return state
      
      messageList[action.timestamp] &&
        unset(messageList, [ action.timestamp ])

      return {
        ...state,
        messages: {
          ...state.messages,
          [key]: { ...messageList }
        }
      }
    }

    case ActionTypes.CLEAR_MESSAGES: {

      return !action.key && !state.selected
        ? state
        : {
            ...state,
            messages: {
              ...state.messages,
              [ action.key || state.selected ]: {}
            }
          }
      
    }

    case ActionTypes.TOGGLE_GROUP: {
      return {
        ...state,
        group: action.group !== state.group
          ? action.group
          : null
      }
    }

    default: {
      return state
    }
  }
}
