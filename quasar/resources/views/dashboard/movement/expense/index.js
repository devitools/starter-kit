export { domain } from 'source/domains/Movement/Expense/settings'

/**
 * @type {string}
 */
export const path = '/dashboard/movement/expense'

/**
 * @type {string}
 */
export const icon = 'money_off'

/**
 * @type {function}
 */
export const table = () => import('resources/views/dashboard/movement/expense/ExpenseTable.vue')

/**
 * @type {function}
 */
export const form = () => import('resources/views/dashboard/movement/expense/ExpenseForm.vue')
