import Schema from '@devitools/Agnostic/Schema'

import TicketService from './TicketService'
import { domain } from '../settings'

/**
 * @class {TicketSchema}
 */
export default class TicketSchema extends Schema {
  /**
   * @type {string}
   */
  static domain = domain

  /**
   * @type {TicketService}
   */
  service = TicketService

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
