import Schema from '@devitools/Agnostic/Schema'

import AlertService from './AlertService'
import { domain } from '../settings'

/**
 * @class {AlertSchema}
 */
export default class AlertSchema extends Schema {
  /**
   * @type {string}
   */
  static domain = domain

  /**
   * @type {AlertService}
   */
  service = AlertService

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
