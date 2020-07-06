export { domain } from 'source/domains/Movement/Revenue/settings'

/**
 * @type {string}
 */
export const path = '/dashboard/movement/revenue'

/**
 * @type {string}
 */
export const icon = 'attach_money'

/**
 * @type {function}
 */
export const table = () => import('resources/views/dashboard/movement/revenue/RevenueTable_.vue')

/**
 * @type {function}
 */
export const form = () => import('resources/views/dashboard/movement/revenue/RevenueForm.vue')
