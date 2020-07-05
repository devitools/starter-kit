import Rest from '@devitools/Services/Rest'
import { resource } from '../settings'

/**
 * @class {AlertService}
 */
export default class AlertService extends Rest {
  /**
   * @type {string}
   */
  resource = resource
}
