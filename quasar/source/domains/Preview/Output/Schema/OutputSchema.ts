import Schema from '@devitools/Agnostic/Schema'

import OutputService from './OutputService'
import { domain } from '../settings'

/**
 * @class {OutputSchema}
 */
export default class OutputSchema extends Schema {
  /**
   * @type {string}
   */
  static domain = domain

  /**
   * @type {OutputService}
   */
  service = OutputService

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
