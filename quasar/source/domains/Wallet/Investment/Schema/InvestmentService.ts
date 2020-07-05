import Rest from '@devitools/Services/Rest'
import { resource } from '../settings'

/**
 * @class {InvestmentService}
 */
export default class InvestmentService extends Rest {
  /**
   * @type {string}
   */
  resource = resource
}
