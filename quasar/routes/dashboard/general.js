import * as category from 'resources/views/dashboard/general/category'

/**
 * @param {AppRouterGroup} $router
 */
export default ($router) => {
  $router.resource(category)
}
