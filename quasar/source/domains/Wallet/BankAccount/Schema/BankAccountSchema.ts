import Schema from '@devitools/Agnostic/Schema'

import BankAccountService from './BankAccountService'
import { domain } from '../settings'

/**
 * @class {BankAccountSchema}
 */
export default class BankAccountSchema extends Schema {
  /**
   * @type {string}
   */
  static domain = domain

  /**
   * @type {BankAccountService}
   */
  service = BankAccountService

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
