import { deepFreeze } from '@ltipton/jsutils'

/**
 * Constant values
 * @typedef Values
 * @type {object}
 * @property {{
 *  EVENTS: 'events',
 *  SESSIONS: 'sessions',
 *  FILTERS: 'filters',
 *  ACTIVE_SESSION: 'activeSession',
 *  BOOKING: 'booking',
 *  ATTENDEES: 'attendees',
 *  PRESENTERS: 'presenters',
 *  SETTINGS: 'settings',
 *  LABELS: 'labels',
 *  LOCATIONS: 'locations'
 * }} CATEGORIES
 * @property {{
 *  PERSON: 'person',
 *  GROUP: 'group'
 * }} BOOKING_TYPES
 * @property {{
 *  AGENDA_SETTINGS: 'agendaSettings',
 *  ACTIVE_FILTERS: 'activeFilters',
 *  SELECTED_FILTERS: 'selectedFilters'
 * }} SUB_CATEGORIES
 */
/** @type {Values} */
export const Values = deepFreeze({
  CATEGORIES: {
    TASKS: 'tasks',
  },

  SUB_CATEGORIES: {

  },

})
