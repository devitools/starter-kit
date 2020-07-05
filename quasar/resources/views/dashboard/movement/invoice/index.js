export { domain } from 'source/domains/Movement/Invoice/settings'

/**
 * @type {string}
 */
export const path = '/dashboard/movement/invoice'

/**
 * @type {string}
 */
export const icon = 'payments'

/**
 * @type {function}
 */
export const table = () => import('resources/views/dashboard/movement/invoice/InvoiceTable.vue')

/**
 * @type {function}
 */
export const form = () => import('resources/views/dashboard/movement/invoice/InvoiceForm.vue')
