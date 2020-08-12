import { getStore } from 'SVStore'
import { ActionTypes } from 'SVConstants'

/**
 * Clears a single stored message from the store
 * @param {string} timestamp - Timestamp of the message to be removed
 *
 * @returns {void}
 */
export const removeMessage = timestamp => {
  getStore().dispatch({
    type: ActionTypes.REMOVE_MESSAGE,
    timestamp
  })

}
