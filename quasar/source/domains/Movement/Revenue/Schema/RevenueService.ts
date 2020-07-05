import Rest from '@devitools/Services/Rest'
import { resource } from '../settings'

/**
 * @class {RevenueService}
 */
export default class RevenueService extends Rest {
  /**
   * @type {string}
   */
  resource = resource
}
