import { checkSession, checkIsAlreadyConnected, checkPermission } from 'source/modules/Auth/router/middleware'
import { otherwise } from 'src/router'
import { signIn, signUp, layout } from 'source/modules/Auth/components'
/**
 * @param {AppRouter} $router
 */
export default ($router) => {
  $router.group(otherwise, layout, (group) => {
    group.route('', signIn, { name: 'sign-in', public: true })
    group.route('/signup', signUp, { name: 'signUp', public: true })
    group.route('/signin', signIn, { name: 'signIn', public: true })
  })

  // check user is logged in app
  $router.beforeThis(otherwise, checkIsAlreadyConnected)

  // check the user session
  $router.beforeEach(checkSession)

  // check the permission to route
  $router.beforeEach(checkPermission)
}
