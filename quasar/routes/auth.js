import { bootstrap, checkIsLogged, checkPermission } from 'source/modules/Auth/router/middleware'
import { otherwise } from 'src/router'

import { index, layout } from 'source/modules/Auth/components'

/**
 * @param {AppRouter} $router
 */
export default ($router) => {
  $router.group(otherwise, layout, (group) => {
    group.route('', index, { name: 'sign-in' })
  })

  // init the store user
  $router.beforeEach(bootstrap)
  // check user is logged in app
  $router.beforeThis(otherwise, checkIsLogged)
  // check the permission to route
  $router.beforeEach(checkPermission)
}
