import Schema from '@devitools/Agnostic/Schema'
import { Component, FieldEvent } from '@devitools/Agnostic/Helper/interfaces'

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
      .fieldTableShow()
      .fieldTableWhere()
      .fieldIsInputPlan()
      .validationRequired()
      .fieldOn('input', function (fieldEvent: FieldEvent) {
        const { $event } = fieldEvent
        $component.$getField('description').$setValue($event)
      })

    this.addField('description')
      .fieldTableShow()
      .fieldTableWhere()
      .fieldIsText()
      .fieldFormDefaultValue('')

    this.addField('active')
      .fieldTableShow()
      .fieldTableWhere()
      .fieldIsToggle()
      .fieldFormDefaultValue(true)
      .fieldWatch(function (this: Component, value: boolean) {
        this.$getField('description').$fieldFormHidden(!value)
      })
  }
}
