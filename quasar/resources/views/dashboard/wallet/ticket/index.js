export { domain } from 'source/domains/Wallet/Ticket/settings'

/**
 * @type {string}
 */
export const path = '/dashboard/wallet/ticket'

/**
 * @type {string}
 */
export const icon = 'redeem'

/**
 * @type {function}
 */
export const table = () => import('resources/views/dashboard/wallet/ticket/TicketTable.vue')

/**
 * @type {function}
 */
export const form = () => import('resources/views/dashboard/wallet/ticket/TicketForm.vue')
