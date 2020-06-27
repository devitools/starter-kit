export { domain } from 'source/domains/General/Product/settings'

/**
 * @type {string}
 */
export const path = '/dashboard/general/product'

/**
 * @type {string}
 */
export const icon = 'extension'

/**
 * @type {function}
 */
export const table = () => import('resources/views/dashboard/general/product/ProductTable.vue')

/**
 * @type {function}
 */
export const form = () => import('resources/views/dashboard/general/product/ProductForm.vue')
