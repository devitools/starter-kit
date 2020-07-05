export { domain } from 'source/domains/General/Category/settings'

/**
 * @type {string}
 */
export const path = '/dashboard/general/category'

/**
 * @type {string}
 */
export const icon = 'folder'

/**
 * @type {function}
 */
export const table = () => import('resources/views/dashboard/general/category/CategoryTable.vue')

/**
 * @type {function}
 */
export const form = () => import('resources/views/dashboard/general/category/CategoryForm.vue')
