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
   */
  construct () {
    // magical happens
    this.addField('name')
      .fieldTableShow()
      .fieldTableWhere()
      .fieldIsInputPlan()
      .validationRequired()
  }
}
