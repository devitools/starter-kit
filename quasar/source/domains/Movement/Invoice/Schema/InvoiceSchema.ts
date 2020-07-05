import Schema from '@devitools/Agnostic/Schema'

import InvoiceService from './InvoiceService'
import { domain } from '../settings'

/**
 * @class {InvoiceSchema}
 */
export default class InvoiceSchema extends Schema {
  /**
   * @type {string}
   */
  static domain = domain

  /**
   * @type {InvoiceService}
   */
  service = InvoiceService

  /**
   * Call schema builder method
   */
  construct (): void {
    // the magic happens

    this.addField('name')
      .fieldTableShow()
      .fieldTableWhere()
      .fieldFormAutofocus()
  }
}
