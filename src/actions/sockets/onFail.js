import { getStore } from 'SVStore'
import { ActionTypes } from 'SVConstants'
import { toggleIsRunning } from './toggleIsRunning'

export const onFail = data => {

  data && data.message && getStore().dispatch({
    type: ActionTypes.ON_MESSAGE,
    ...data
  })

  toggleMessageModal(true)
  toggleIsRunning(data)

}
