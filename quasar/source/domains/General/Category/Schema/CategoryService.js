import Rest from '@devitools/Services/Rest'
import { resource } from '../settings'

/**
 * @class {CategoryService}
 */
export default class CategoryService extends Rest {
  /**
   * @type {string}
   */
  resource = resource
}
