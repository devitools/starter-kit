import { permission } from '@devitools/Security/permissions'
import * as notification from 'resources/views/dashboard/admin/notification'
import * as profile from 'resources/views/dashboard/admin/profile'
import * as user from 'resources/views/dashboard/admin/user'

export { domain, icon } from 'resources/views/dashboard/admin'

/** @type {*[]} */
export const children = [
  permission(user),
  permission(profile),
  permission(notification)
]
