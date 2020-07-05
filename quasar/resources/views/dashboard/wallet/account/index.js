export { domain } from 'source/domains/Wallet/Account/settings'

/**
 * @type {string}
 */
export const path = '/dashboard/wallet/type'

/**
 * @type {string}
 */
export const icon = 'request_quote'

/**
 * @type {function}
 */
export const table = () => import('resources/views/dashboard/wallet/account/AccountTable.vue')

/**
 * @type {function}
 */
export const form = () => import('resources/views/dashboard/wallet/account/AccountForm.vue')
