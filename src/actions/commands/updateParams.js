import { getStore } from 'SVStore'
import { ActionTypes } from 'SVConstants'

/**
 * Updates the params of the currently selected command
 * @param {Object} params - Contains what the params should be updated to
 *
 * @returns {void}
 */
export const updateParams = (params) => {
  getStore().dispatch({
    type: ActionTypes.CMD_UPDATE_PARAM,
    params
  })
}
