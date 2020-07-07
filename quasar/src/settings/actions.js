import { action, actionGroup, actionMenu } from '@devitools/Security/actions'

// domains/Admin
import * as profile from 'resources/views/dashboard/admin/profile'
import * as user from 'resources/views/dashboard/admin/user'

/**
 * @param {Object|undefined} session
 * @return {*}
 */
export default function (session) {
  if (!session) {
    return []
  }

  const { permissions } = session
  if (!Array.isArray(permissions)) {
    return [
      actionMenu('home', '/dashboard/home', 'home')
    ]
  }

  const actions = [
    actionMenu('home', '/dashboard/home', 'home'),
    actionGroup('admin', 'settings', [
      action(user, true),
      action(profile)
    ])
  ]

  const reduce = function (accumulator, action) {
    if (action.children) {
      action.children = action.children.reduce(reduce, [])
    }

    if (!action.path && !action.children.length) {
      return accumulator
    }

    if (!action.namespace || permissions.includes(action.namespace)) {
      accumulator.push(action)
    }

    return accumulator
  }

  return actions.reduce(reduce, [])
}
