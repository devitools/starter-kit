import * as profile from 'resources/views/dashboard/admin/profile'
import * as user from 'resources/views/dashboard/admin/user'

/**
 * @param {AppRouterGroup} $router
 */
export default ($router) => {
  $router.resource(profile)
  $router.resource(user)
}
