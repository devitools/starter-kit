import Rest from '@devitools/Services/Rest'
import { resource } from '../settings'

/**
 * @class {CardService}
 */
export default class CardService extends Rest {
  /**
   * @type {string}
   */
  resource = resource
}
