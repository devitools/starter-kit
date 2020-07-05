import Rest from '@devitools/Services/Rest'
import { resource } from '../settings'

/**
 * @class {AccountService}
 */
export default class AccountService extends Rest {
  /**
   * @type {string}
   */
  resource = resource
}
