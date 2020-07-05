import Rest from '@devitools/Services/Rest'
import { resource } from '../settings'

/**
 * @class {ExpenseService}
 */
export default class ExpenseService extends Rest {
  /**
   * @type {string}
   */
  resource = resource
}
