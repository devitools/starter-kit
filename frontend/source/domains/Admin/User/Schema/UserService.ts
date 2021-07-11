import Rest from '@devitools/Services/Rest'
import { resource } from '../settings'

/**
 * @type {UserService}
 */
export default class UserService extends Rest {
  /**
   * @type {String}
   */
  resource = resource

  /**
   * @type {number}
   */
  size = 100
}
