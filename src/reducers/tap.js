import { ActionTypes } from 'SVConstants'
import { AppConfig } from '../../configs/app.config'

const initialState = { ...AppConfig }


export function tap(state = initialState, action) {
  switch (action.type) {

    default: {
      return state
    }
  }
}
