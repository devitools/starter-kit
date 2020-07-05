import { action, actionGroup, actionMenu } from '@devitools/Security/actions'

// domains/Admin
import * as profile from 'resources/views/dashboard/admin/profile'
import * as user from 'resources/views/dashboard/admin/user'

// domains/General
import * as category from 'resources/views/dashboard/general/category'
import * as marker from 'resources/views/dashboard/general/marker'
import * as type from 'resources/views/dashboard/general/type'

// domains/Preview
import * as alert from 'resources/views/dashboard/preview/alert'
import * as goal from 'resources/views/dashboard/preview/goal'
import * as input from 'resources/views/dashboard/preview/input'
import * as output from 'resources/views/dashboard/preview/output'
import * as simulation from 'resources/views/dashboard/preview/simulation'

// domains/Movement
import * as confirmation from 'resources/views/dashboard/movement/confirmation'
import * as revenue from 'resources/views/dashboard/movement/revenue'
import * as expense from 'resources/views/dashboard/movement/expense'
import * as invoice from 'resources/views/dashboard/movement/invoice'

// domains/Wallet
import * as card from 'resources/views/dashboard/wallet/card'
import * as bankAccount from 'resources/views/dashboard/wallet/bankAccount'
import * as ticket from 'resources/views/dashboard/wallet/ticket'
import * as account from 'resources/views/dashboard/wallet/account'
import * as investment from 'resources/views/dashboard/wallet/investment'

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
    actionGroup('general', 'bookmarks', [
      action(category, true),
      action(marker),
      action(type)
    ]),
    actionGroup('wallet', 'account_balance_wallet', [
      action(account, true),
      action(card),
      action(bankAccount, true),
      action(ticket),
      action(investment)
    ]),
    actionGroup('preview', 'schedule', [
      action(input),
      action(output, true),
      action(alert, true),
      action(goal),
      action(simulation)
    ]),
    actionGroup('movement', 'sync_alt', [
      action(revenue),
      action(expense, true),
      action(confirmation, true),
      action(invoice)
    ]),
    actionGroup('admin', 'settings', [
      action(user, true),
      action(profile)
    ])
  ]

  return actions
  // const reduce = function (accumulator, action) {
  //   if (action.children) {
  //     action.children = action.children.reduce(reduce, [])
  //   }
  //
  //   if (!action.path && !action.children.length) {
  //     return accumulator
  //   }
  //
  //   if (!action.namespace || permissions.includes(action.namespace)) {
  //     accumulator.push(action)
  //   }
  //
  //   return accumulator
  // }
  //
  // return actions.reduce(reduce, [])
}
