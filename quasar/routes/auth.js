import { checkSession, checkIsAlreadyConnected, checkPermission } from 'source/modules/Auth/router/middleware'
import { otherwise } from 'src/router'
import { signIn, register, layout } from 'source/modules/Auth/components'
/**
 * @param {AppRouter} $router
 */
export default ($router) => {
  $router.group(otherwise, layout, (group) => {
    group.route('', signIn, { name: 'sign-in', public: true })
    group.route('/register', register, { name: 'register', public: true })
  })

  // check user is logged in app
  $router.beforeThis(otherwise, checkIsAlreadyConnected)

  // check the user session
  $router.beforeEach(checkSession)

  // check the permission to route
  $router.beforeEach(checkPermission)
}
