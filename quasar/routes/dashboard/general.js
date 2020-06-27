import * as category from 'resources/views/dashboard/general/category'
import * as product from 'resources/views/dashboard/general/product'

/**
 * @param {AppRouterGroup} $router
 */
export default ($router) => {
  $router.resource(category)
  $router.resource(product)
}
