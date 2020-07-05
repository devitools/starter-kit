import * as category from 'resources/views/dashboard/general/category'
import * as marker from 'resources/views/dashboard/general/marker'
import * as type from 'resources/views/dashboard/general/type'

/**
 * @param {AppRouterGroup} $router
 */
export default ($router) => {
  $router.resource(category)
  $router.resource(marker)
  $router.resource(type)
}
