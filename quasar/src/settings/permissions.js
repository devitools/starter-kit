import { permission, permissionGroup } from '@devitools/Security/permissions'

// domains/Admin
import * as profile from 'resources/views/dashboard/admin/profile'
import * as user from 'resources/views/dashboard/admin/user'

/**
 * @type {*}
 */
export const permissions = [
  permissionGroup('all', 'ballot', [
    permissionGroup('admin', 'settings', [
      permission(profile),
      permission(user)
    ])
  ])
]

/**
 * @param {string} namespace
 * @return {string[]}
 */
export function dependencies (namespace) {
  const references = {
  }
  return references[namespace] || []
}

/**
 * @return {*}
 */
export function namespaces () {
  const reducer = (accumulator, permission) => {
    if (permission.children) {
      return permission.children.reduce(reducer, accumulator)
    }
    if (!permission.namespace) {
      return accumulator
    }
    accumulator.push(permission.namespace)
    return accumulator
  }
  return permissions.reduce(reducer, [])
}

/**
 * @return {Array}
 */
export default function () {
  return permissions
}
