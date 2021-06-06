export { domain } from 'source/domains/Admin/Profile/settings'

/**
 * @type {string}
 */
export const path = '/dashboard/admin/profile'

/**
 * @type {string}
 */
export const icon = 'manage_accounts'

/**
 * @type {function}
 */
export const table = () => import('resources/views/dashboard/admin/profile/ProfileTable.vue')

/**
 * @type {function}
 */
export const form = () => import('resources/views/dashboard/admin/profile/ProfileForm.vue')
