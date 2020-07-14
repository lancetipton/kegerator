import { getStore } from 'SVStore'
import { ActionTypes } from 'SVConstants'

/**
 * Toggles a group as active/inactive
 * @param {string} group - Name of group to be toggled
 *
 * @returns {void}
 */
export const toggleGroup = group => {
  getStore().dispatch({
    type: ActionTypes.TOGGLE_GROUP,
    group
  })
}