import { getStore } from 'SVStore'
import { ActionTypes } from 'SVConstants'

export const setId = ({id, peers, isRunning }) => {
  getStore().dispatch({
    type: ActionTypes.SET_ID,
    id,
    peers,
    isRunning
  })
}
