export { domain } from 'source/domains/Preview/Alert/settings'

/**
 * @type {string}
 */
export const path = '/dashboard/general/alert'

/**
 * @type {string}
 */
export const icon = 'notifications_active'

/**
 * @type {function}
 */
export const table = () => import('resources/views/dashboard/preview/alert/AlertTable.vue')

/**
 * @type {function}
 */
export const form = () => import('resources/views/dashboard/preview/alert/AlertForm.vue')
