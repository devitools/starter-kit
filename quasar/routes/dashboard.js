import { SCOPES } from '@devitools/Agnostic/enum.js'

import { changeRoute } from 'source/modules/Dashboard/router/middleware'
// routes
import { index, layout } from 'source/modules/Dashboard/components'

import admin from 'routes/dashboard/admin'

import { domain as account } from 'source/domains/Settings/Account/settings'

/**
 * @type {string}
 */
export const root = '/dashboard'

/**
 * @var {string}
 */
export const dashboard = '/dashboard/home'

/**
 * @param {AppRouter} $router
 */
export default ($router) => {
  $router.group(root, layout, (group) => {
    group.redirect('', dashboard)
    group.route(dashboard, index, { name: 'dashboard' })

    admin(group)

    group.route(
      '/dashboard/settings/account',
      () => import('resources/views/dashboard/settings/MyAccountForm.vue'),
      { name: 'my-account', namespace: account, scope: SCOPES.SCOPE_EDIT }
    )
  })

  // update the info about the current route
  $router.beforeEach(changeRoute)
}
