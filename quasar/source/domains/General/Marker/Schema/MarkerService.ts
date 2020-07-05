import Rest from '@devitools/Services/Rest'
import { resource } from '../settings'

/**
 * @class {MarkerService}
 */
export default class MarkerService extends Rest {
  /**
   * @type {string}
   */
  resource = resource
}
