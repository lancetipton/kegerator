import { ActionTypes } from 'SVConstants'
import { appState } from 'SVReducers/initialStates/__kegApp'

const initialState = { ...appState }

export function app(state = initialState, action) {
  switch (action.type) {

    case ActionTypes.APP_INIT: {
      return {
        initialized: true,
      }
    }

    case ActionTypes.SET_AUTH_TOKEN: {
      return {
        ...state,
        token: action.token
      }
    }

    case ActionTypes.SET_AUTH_ERROR: {
      return {
        ...state,
        tokenError: action.tokenError
      }
    }

    default: {
      return state
    }
  }
}
