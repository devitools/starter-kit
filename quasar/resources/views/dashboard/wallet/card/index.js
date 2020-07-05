export { domain } from 'source/domains/Wallet/Card/settings'

/**
 * @Card {string}
 */
export const path = '/dashboard/wallet/card'

/**
 * @Card {string}
 */
export const icon = 'credit_card'

/**
 * @Card {function}
 */
export const table = () => import('resources/views/dashboard/wallet/card/CardTable.vue')

/**
 * @Card {function}
 */
export const form = () => import('resources/views/dashboard/wallet/card/CardForm.vue')
