export { domain } from 'source/domains/Admin/Notification/settings'

/** @type {string} */
export const path = '/dashboard/admin/notification'

/** @type {string} */
export const icon = 'notifications'

/** @type {function} */
export const table = () => import('resources/views/dashboard/admin/notification/NotificationTable.vue')

/** @type {function} */
export const form = () => import('resources/views/dashboard/admin/notification/NotificationForm.vue')
