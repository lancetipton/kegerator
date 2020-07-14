import { getStore } from 'SVStore'
import { ActionTypes } from 'SVConstants'

export const onConnected = () => {
  getStore().dispatch({
    type: ActionTypes.ON_CONNECTED,
    connected: true
  })
}
