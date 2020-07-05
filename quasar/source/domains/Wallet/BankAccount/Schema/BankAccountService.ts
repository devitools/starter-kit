import Rest from '@devitools/Services/Rest'
import { resource } from '../settings'

/**
 * @class {BankAccountService}
 */
export default class BankAccountService extends Rest {
  /**
   * @type {string}
   */
  resource = resource
}
