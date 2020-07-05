import Schema from '@devitools/Agnostic/Schema'

import ExpenseService from './ExpenseService'
import { domain } from '../settings'

/**
 * @class {ExpenseSchema}
 */
export default class ExpenseSchema extends Schema {
  /**
   * @type {string}
   */
  static domain = domain

  /**
   * @type {ExpenseService}
   */
  service = ExpenseService

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
