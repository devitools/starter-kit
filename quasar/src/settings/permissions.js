import $lang from '@devitools/Lang'

import { permission } from './@helper'
import { RULES } from './schema'

// domains/Admin
import * as profile from 'resources/views/dashboard/admin/profile'
import * as user from 'resources/views/dashboard/admin/user'

// domains/General
import * as category from 'resources/views/dashboard/general/category'

/**
 * @type {*}
 */
export const permissions = [
  {
    label: $lang('permissions.all'),
    namespace: 'all',
    icon: 'ballot',
    children: [
      {
        label: $lang('permissions.general'),
        namespace: 'general',
        icon: 'desktop_windows',
        children: [
          permission(category.domain, category.icon)
        ]
      },
      {
        label: $lang('permissions.admin'),
        namespace: 'admin',
        icon: 'settings',
        children: [
          permission(profile.domain, profile.icon),
          permission(user.domain, user.icon)
        ]
      }
    ]
  }
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
