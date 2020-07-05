export { domain } from 'source/domains/Preview/Simulation/settings'

/**
 * @type {string}
 */
export const path = '/dashboard/general/simulation'

/**
 * @type {string}
 */
export const icon = 'calendar_today'

/**
 * @type {function}
 */
export const table = () => import('resources/views/dashboard/preview/simulation/SimulationTable.vue')

/**
 * @type {function}
 */
export const form = () => import('resources/views/dashboard/preview/simulation/SimulationForm.vue')
