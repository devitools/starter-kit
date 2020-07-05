export { domain } from 'source/domains/Preview/Output/settings'

/**
 * @type {string}
 */
export const path = '/dashboard/general/output'

/**
 * @type {string}
 */
export const icon = 'money_off'

/**
 * @type {function}
 */
export const table = () => import('resources/views/dashboard/preview/output/OutputTable.vue')

/**
 * @type {function}
 */
export const form = () => import('resources/views/dashboard/preview/output/OutputForm.vue')
