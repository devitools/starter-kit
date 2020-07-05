import Rest from '@devitools/Services/Rest'
import { resource } from '../settings'

/**
 * @class {OutputService}
 */
export default class OutputService extends Rest {
  /**
   * @type {string}
   */
  resource = resource
}
