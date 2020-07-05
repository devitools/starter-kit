import Schema from '@devitools/Agnostic/Schema'

import InputService from './InputService'
import { domain } from '../settings'

/**
 * @class {InputSchema}
 */
export default class InputSchema extends Schema {
  /**
   * @type {string}
   */
  static domain = domain

  /**
   * @type {InputService}
   */
  service = InputService

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
