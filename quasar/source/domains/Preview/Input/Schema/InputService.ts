import Rest from '@devitools/Services/Rest'
import { resource } from '../settings'

/**
 * @class {InputService}
 */
export default class InputService extends Rest {
  /**
   * @type {string}
   */
  resource = resource
}
