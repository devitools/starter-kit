import Schema from '@devitools/Agnostic/Schema'

import MarkerService from './MarkerService'
import { domain } from '../settings'

/**
 * @class {MarkerSchema}
 */
export default class MarkerSchema extends Schema {
  /**
   * @type {string}
   */
  static domain = domain

  /**
   * @type {MarkerService}
   */
  service = MarkerService

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
