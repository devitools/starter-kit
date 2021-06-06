import { actionEntry, actionGroup } from '@devitools/Security/actions'
import { getAllowedMenuEntries } from 'src/settings/security'

import * as admin from 'src/menu/admin'

/**
 * @param {Record<string, unknown>|undefined} session
 * @return {*[]}
 */
export default function (session) {
  if (!session) {
    return []
  }

  const { permissions } = session
  if (!Array.isArray(permissions)) {
    return [
      actionEntry('home', '/dashboard/home', 'home', 'home')
    ]
  }

  const actions = [
    actionEntry('home', '/dashboard/home', 'home', 'home'),
    actionGroup(admin)
  ]

  return getAllowedMenuEntries(actions)
}
