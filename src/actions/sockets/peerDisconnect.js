import { getStore } from 'SVStore'
import { ActionTypes } from 'SVConstants'

export const peerDisconnect = ({ id, peers }) => {
  getStore().dispatch({
    type: ActionTypes.DISCONNECT_PEER,
    id,
    peers,
  })
}
