import Schema from '@devitools/Agnostic/Schema'

import ConfirmationService from './ConfirmationService'
import { domain } from '../settings'

/**
 * @class {ConfirmationSchema}
 */
export default class ConfirmationSchema extends Schema {
  /**
   * @type {string}
   */
  static domain = domain

  /**
   * @type {ConfirmationService}
   */
  service = ConfirmationService

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
