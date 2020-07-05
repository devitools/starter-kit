import Rest from '@devitools/Services/Rest'
import { resource } from '../settings'

/**
 * @class {InvoiceService}
 */
export default class InvoiceService extends Rest {
  /**
   * @type {string}
   */
  resource = resource
}
