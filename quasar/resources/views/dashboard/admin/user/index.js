export { domain } from 'source/domains/Admin/User/settings'

/**
 * @type {string}
 */
export const path = '/dashboard/admin/user'

/**
 * @type {string}
 */
export const icon = 'group'

/**
 * @type {function}
 */
export const table = () => import('resources/views/dashboard/admin/user/UserTable.vue')

/**
 * @type {function}
 */
export const form = () => import('resources/views/dashboard/admin/user/UserForm.vue')
