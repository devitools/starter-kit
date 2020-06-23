import Schema from '@devitools/Agnostic/Schema'
import { SchemaForm, FieldEvent } from '@devitools/Agnostic/Helper/interfaces'

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
      .fieldTableShow()
      .fieldTableWhere()
      .fieldIsInputPlan()
      .validationRequired()
      .fieldOn('input', function (this: SchemaForm, event: FieldEvent) {
        const { $event } = event
        this.$getField('description').$setValue($event)
      })

    this.addField('description')
      .fieldTableShow()
      .fieldTableWhere()
      .fieldIsText()
      .validationRequired()
      .fieldFormDefaultValue('')
  }
}
