import Schema from '@devitools/Agnostic/Schema'

import GoalService from './GoalService'
import { domain } from '../settings'

/**
 * @class {GoalSchema}
 */
export default class GoalSchema extends Schema {
  /**
   * @type {string}
   */
  static domain = domain

  /**
   * @type {GoalService}
   */
  service = GoalService

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
