import $lang from '@devitools/Lang'
import { action } from './@helper'

// domains/Admin
import * as profile from 'resources/views/dashboard/admin/profile'
import * as user from 'resources/views/dashboard/admin/user'

// domains/General
import * as category from 'resources/views/dashboard/general/category'

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
      {
        name: $lang('actions.home'),
        path: '/dashboard/home',
        icon: 'home',
        separated: false
      }
    ]
  }

  const actions = [
    {
      name: $lang('actions.home'),
      path: '/dashboard/home',
      icon: 'home',
      separated: false
    },
    {
      name: $lang('actions.general'),
      icon: 'desktop_windows',
      separated: false,
      children: [
        action(category, false)
      ]
    },
    {
      name: $lang('actions.admin'),
      icon: 'settings',
      separated: false,
      children: [
        action(user, true),
        action(profile)
      ]
    }
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
