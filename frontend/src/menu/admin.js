import { action } from '@devitools/Security/actions'
import * as notification from 'resources/views/dashboard/admin/notification'
import * as profile from 'resources/views/dashboard/admin/profile'
import * as user from 'resources/views/dashboard/admin/user'

export { domain, icon } from 'resources/views/dashboard/admin'

/** @type {*[]} */
export const children = [
  action(user),
  action(profile, true),
  action(notification)
]
