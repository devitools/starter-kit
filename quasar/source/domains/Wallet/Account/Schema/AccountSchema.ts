import Schema from '@devitools/Agnostic/Schema'

import AccountService from './AccountService'
import { domain } from '../settings'

/**
 * @class {AccountSchema}
 */
export default class AccountSchema extends Schema {
  /**
   * @type {string}
   */
  static domain = domain

  /**
   * @type {AccountService}
   */
  service = AccountService

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
