export { domain } from 'source/domains/General/Type/settings'

/**
 * @type {string}
 */
export const path = '/dashboard/general/type'

/**
 * @type {string}
 */
export const icon = 'local_offer'

/**
 * @type {function}
 */
export const table = () => import('resources/views/dashboard/general/type/TypeTable.vue')

/**
 * @type {function}
 */
export const form = () => import('resources/views/dashboard/general/type/TypeForm.vue')
