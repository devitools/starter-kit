import Schema from '@devitools/Agnostic/Schema'

import InvestmentService from './InvestmentService'
import { domain } from '../settings'

/**
 * @class {InvestmentSchema}
 */
export default class InvestmentSchema extends Schema {
  /**
   * @type {string}
   */
  static domain = domain

  /**
   * @type {InvestmentService}
   */
  service = InvestmentService

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
