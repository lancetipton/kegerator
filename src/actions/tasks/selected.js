import { getStore } from 'SVStore'
import { ActionTypes } from 'SVConstants'

/**
 * Sets a command to be selected in the Store
 * @param {string} selected - Name of the command to set as selected
 *
 * @returns {void}
 */
export const cmdSelected = selected => {
  getStore().dispatch({
    type: ActionTypes.CMD_SELECTED,
    selected
  })
}
