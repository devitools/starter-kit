import Rest from '@devitools/Services/Rest'
import { resource } from '../settings'

/**
 * @class {ProductService}
 */
export default class ProductService extends Rest {
  /**
   * @type {string}
   */
  resource = resource
}
