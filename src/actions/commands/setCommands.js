import { getStore } from 'SVStore'
import { ActionTypes } from 'SVConstants'

/**
 * Adds commands to the Store
 * @param {Object} commands - Commands to be added to the store
 *
 * @returns {void}
 */
export const setCommands = ({ commands }) => {
  getStore().dispatch({
    type: ActionTypes.SET_CMDS,
    commands
  })
}
