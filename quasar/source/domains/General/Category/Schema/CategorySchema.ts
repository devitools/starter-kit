import Schema from '@devitools/Agnostic/Schema'

import CategoryService from './CategoryService'
import { domain } from '../settings'

/**
 * @class {CategorySchema}
 */
export default class CategorySchema extends Schema {
  /**
   * @type {string}
   */
  static domain = domain

  /**
   * @type {CategoryService}
   */
  service = CategoryService

  /**
   * Call schema builder method
   */
  construct () {
    // the magic happens

    this.addField('name')
      .fieldIsInputPlan()
      .fieldTableShow()
      .fieldTableWhere()
      .fieldFormFill()
      .validationRequired()

    this.addField('description')
      .fieldIsText()
      .fieldTableShow()
      .fieldTableWhere()
      .fieldFormDefaultValue('')
      .fieldFormFill()

    this.addField('active')
      .fieldIsToggle()
      .fieldTableShow()
      .fieldTableWhere()
      .fieldFormDefaultValue(true)
      .fieldFormFill()
  }
}
