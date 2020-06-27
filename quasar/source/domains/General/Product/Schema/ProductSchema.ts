import Schema from '@devitools/Agnostic/Schema'
import { Component, FieldEvent } from '@devitools/Agnostic/Helper/interfaces'

import ProductService from './ProductService'
import { domain } from '../settings'

/**
 * @class {ProductSchema}
 */
export default class ProductSchema extends Schema {
  /**
   * @type {string}
   */
  static domain = domain

  /**
   * @type {ProductService}
   */
  service = ProductService

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
      .fieldIsInputPlan()
      // use events as arrow function
      .fieldOn('input', (fieldEvent: FieldEvent) => {
        const { $event } = fieldEvent
        $component.$getField('description').$setValue($event)
      })
  }
}
