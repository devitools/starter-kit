export { domain } from 'source/domains/General/Marker/settings'

/**
 * @type {string}
 */
export const path = '/dashboard/general/marker'

/**
 * @type {string}
 */
export const icon = 'beenhere'

/**
 * @type {function}
 */
export const table = () => import('resources/views/dashboard/general/marker/MarkerTable.vue')

/**
 * @type {function}
 */
export const form = () => import('resources/views/dashboard/general/marker/MarkerForm.vue')
