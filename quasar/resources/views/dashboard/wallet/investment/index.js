export { domain } from 'source/domains/Wallet/Investment/settings'

/**
 * @type {string}
 */
export const path = '/dashboard/wallet/investment'

/**
 * @type {string}
 */
export const icon = 'insights'

/**
 * @type {function}
 */
export const table = () => import('app/resources/views/dashboard/wallet/investment/InvestmentTable.vue')

/**
 * @type {function}
 */
export const form = () => import('app/resources/views/dashboard/wallet/investment/InvestmentForm.vue')
