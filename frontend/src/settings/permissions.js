import { permissionGroup } from '@devitools/Security/permissions'

import * as admin from 'src/permission/admin'

/**
 * @type {*}
 */
export const permissions = [
  permissionGroup('all', 'ballot', [
    permissionGroup(admin)
  ])
]

/**
 * @return {string[]}
 */
export function groups () {
  try {
    const root = permissions[0]
    const children = root.children.map((group) => group.namespace)
    return [root.namespace, ...children]
  } catch (e) {
    // silence is gold
  }
  return []
}

/**
 * @param {string} namespace
 * @return {string[]}
 */
export function dependencies (namespace) {
  const references = {}
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
