import Rest from '@devitools/Services/Rest'
import { resource } from '../settings'

/**
 * @class {TicketService}
 */
export default class TicketService extends Rest {
  /**
   * @type {string}
   */
  resource = resource
}
