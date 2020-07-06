import Schema from '@devitools/Agnostic/Schema'

import TypeService from './TypeService'
import { domain } from '../settings'

/**
 * @class {TypeSchema}
 */
export default class TypeSchema extends Schema {
  /**
   * @type {string}
   */
  static domain = domain

  /**
   * @type {TypeService}
   */
  service = TypeService

  /**
   * Call schema builder method
   */
  construct () {
    // the magic happens

    this.addField('name')
      .fieldIsInputPlan()
      .fieldTableShow()
      .fieldTableWhere()
      .fieldFormAutofocus()
      .fieldFormFill()
      .validationRequired()
  }
}
