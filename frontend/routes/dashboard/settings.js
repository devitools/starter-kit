import { domain as account } from 'source/domains/Settings/Account/settings'
import { SCOPES } from '@devitools/Agnostic/enum'

/**
 * @param {AppRouterGroup} $router
 */
export default ($router) => {
  $router.route(
    '/dashboard/settings/account',
    () => import('resources/views/dashboard/settings/MyAccountForm.vue'),
    {
      name: 'my-account',
      domain: account,
      scope: SCOPES.SCOPE_EDIT
    }
  )
}
