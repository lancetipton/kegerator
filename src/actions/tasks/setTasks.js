import { getStore } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'
const { CATEGORIES } = Values
/**
 * Adds Tasks to the Store
 * @param {Object} commands - Commands to be added to the store
 *
 * @returns {void}
 */
export const setTasks = ({ tasks }) => {
  getStore().dispatch({
    type: ActionTypes.UPSERT_ITEMS,
    payload: {
      category: CATEGORIES.TASKS,
      items: tasks,
    },
  })
}
