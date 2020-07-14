import { getStore } from 'SVStore'
import { ActionTypes } from 'SVConstants'

export const addPeer = ({ id, peers }) => {
  getStore().dispatch({
    type: ActionTypes.ADD_PEER,
    id,
    peers
  })
}
