import { permission, permissionGroup } from '@devitools/Security/permissions'
import { RULES } from './schema'
// domains/Admin
import * as profile from 'resources/views/dashboard/admin/profile'
import * as user from 'resources/views/dashboard/admin/user'

// domains/General
import * as category from 'resources/views/dashboard/general/category'
import * as marker from 'resources/views/dashboard/general/marker'
import * as type from 'resources/views/dashboard/general/type'

/**
 * @type {*}
 */
export const permissions = [
  permissionGroup('all', 'ballot', [
    permissionGroup('general', 'bookmarks', [
      permission(category),
      permission(marker),
      permission(type)
    ]),
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
    [`${category.domain}.${RULES.LEVEL_AVAILABLE}`]: [
      `${category.domain}.${RULES.LEVEL_INDEX}`
    ]
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
