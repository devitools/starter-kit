export { domain } from 'source/domains/Preview/Input/settings'

/**
 * @type {string}
 */
export const path = '/dashboard/general/input'

/**
 * @type {string}
 */
export const icon = 'attach_money'

/**
 * @type {function}
 */
export const table = () => import('resources/views/dashboard/preview/input/InputTable.vue')

/**
 * @type {function}
 */
export const form = () => import('resources/views/dashboard/preview/input/InputForm.vue')
