import * as user from 'resources/views/dashboard/admin/user'
import * as profile from 'resources/views/dashboard/admin/profile'
import * as notification from 'resources/views/dashboard/admin/notification'

/**
 * @param {AppRouterGroup} $router
 */
export default ($router) => {
  $router.provide(user)
  $router.provide(profile)
  $router.provide(notification)
}
