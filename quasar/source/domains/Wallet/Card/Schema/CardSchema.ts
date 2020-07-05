import Schema from '@devitools/Agnostic/Schema'

import CardService from './CardService'
import { domain } from '../settings'

/**
 * @class {CardSchema}
 */
export default class CardSchema extends Schema {
  /**
   * @type {string}
   */
  static domain = domain

  /**
   * @type {CardService}
   */
  service = CardService

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
