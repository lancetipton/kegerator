import { getStore } from 'SVStore'
import { ActionTypes } from 'SVConstants'

export const toggleIsRunning = ({ isRunning, name }) => {
  getStore().dispatch({
    type: ActionTypes.IS_RUNNING,
    isRunning,
    name
  })
}
