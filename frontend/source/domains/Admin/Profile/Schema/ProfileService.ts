import Rest from '@devitools/Services/Rest'
import { resource } from '../settings'

/**
 * @type {ProfileService}
 */
export default class ProfileService extends Rest {
  /**
   * @type {String}
   */
  resource = resource
}
