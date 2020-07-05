import Schema from '@devitools/Agnostic/Schema'
import { Component } from '@devitools/Agnostic/Helper/interfaces'

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
   * @param {Component} $component
   * Call schema builder method
   */
  construct ($component: Component) {
    // the magic happens

    this.addField('name')
      .fieldIsInputPlan()
      .fieldTableShow()
      .fieldTableWhere()
      .validationRequired()

    this.addField('description')
      .fieldIsText()
      .fieldTableShow()
      .fieldTableWhere()
      .fieldFormDefaultValue('')

    this.addField('active')
      .fieldIsToggle()
      .fieldTableShow()
      .fieldTableWhere()
      .fieldFormDefaultValue(true)
  }
}
