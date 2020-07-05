export { domain } from 'source/domains/Wallet/BankAccount/settings'

/**
 * @type {string}
 */
export const path = '/dashboard/wallet/bank-account'

/**
 * @type {string}
 */
export const icon = 'account_balance'

/**
 * @type {function}
 */
export const table = () => import('resources/views/dashboard/wallet/bankAccount/BankAccountTable.vue')

/**
 * @type {function}
 */
export const form = () => import('resources/views/dashboard/wallet/bankAccount/BankAccountForm.vue')
