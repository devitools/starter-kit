export { domain } from 'source/domains/Movement/Confirmation/settings'

/**
 * @type {string}
 */
export const path = '/dashboard/movement/confirmation'

/**
 * @type {string}
 */
export const icon = 'done_all'

/**
 * @type {function}
 */
export const table = () => import('resources/views/dashboard/movement/confirmation/ConfirmationTable.vue')

/**
 * @type {function}
 */
export const form = () => import('resources/views/dashboard/movement/confirmation/ConfirmationForm.vue')
