// middleware
import { changeRoute } from 'source/modules/Dashboard/router/middleware'
import { checkModified } from 'source/modules/General/router/middleware'

// components
import { index, layout } from 'source/modules/Dashboard/components'

// routes
import admin from './dashboard/admin'
import settings from './dashboard/settings'

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
    settings(group)
  })

  // check if there is modification
  $router.beforeEach(checkModified)

  // update the info about the current route
  $router.beforeEach(changeRoute)

  // $router.beforeEach(updateTransition)
}
