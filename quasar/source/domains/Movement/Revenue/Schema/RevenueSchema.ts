import Schema from '@devitools/Agnostic/Schema'

import RevenueService from './RevenueService'
import { domain } from '../settings'

/**
 * @class {RevenueSchema}
 */
export default class RevenueSchema extends Schema {
  /**
   * @type {string}
   */
  static domain = domain

  /**
   * @type {RevenueService}
   */
  service = RevenueService

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
