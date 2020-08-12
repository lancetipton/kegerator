import { getStore } from 'SVStore'
import { ActionTypes } from 'SVConstants'

/**
 * Clears stored messages from the store
 * @param {string} command - Name of the command to have it's messages removed
 *
 * @returns {void}
 */
export const clearMessages = command => {
  getStore().dispatch({
    type: ActionTypes.CLEAR_MESSAGES,
    command
  })
}