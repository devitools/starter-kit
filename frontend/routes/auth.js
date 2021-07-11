import { checkSession, checkIsAlreadyConnected, checkPermission } from 'source/modules/Auth/router/middleware'
import { otherwise } from 'src/router'
import { signIn, recoverPassword, layout } from 'source/modules/Auth/components'
import { checkModified } from 'source/modules/General/router/middleware'
/**
 * @param {AppRouter} $router
 */
export default ($router) => {
  $router.group(otherwise, layout, (group) => {
    group.route('', signIn, { name: 'sign-in', public: true })
    group.route('/recover-password', recoverPassword, { name: 'recover-password', public: true })
  })

  // check user is logged in app
  $router.beforeThis(otherwise, checkIsAlreadyConnected)

  // check if there is modification
  $router.beforeEach(checkModified)

  // check the user session
  $router.beforeEach(checkSession)

  // check the permission to route
  $router.beforeEach(checkPermission)
}
