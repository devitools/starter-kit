import Schema from '@devitools/Agnostic/Schema'
import { SCOPES } from '@devitools/Agnostic/enum'
import { Component } from '@devitools/Agnostic/Helper/interfaces'

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
   * @param {Record<string, unknown>} dependencies
   * Call schema builder method
   */
  construct ($component?: Component, dependencies?: Record<string, unknown>): void {
    // the magic happens

    this.addField('name')
      .fieldTableShow()
      .fieldTableWhere()
      .fieldFormAutofocus()
  }
}
