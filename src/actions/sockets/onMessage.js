import { getStore } from 'SVStore'
import { ActionTypes } from 'SVConstants'

export const onMessage = data => {
  data && data.message && getStore().dispatch({
    type: ActionTypes.ON_MESSAGE,
    ...data
  })

  toggleMessageModal(true)

}
