import Rest from '@devitools/Services/Rest'
import { resource } from '../settings'

/**
 * @class {ConfirmationService}
 */
export default class ConfirmationService extends Rest {
  /**
   * @type {string}
   */
  resource = resource
}
