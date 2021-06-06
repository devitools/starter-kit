import Schema from '@devitools/Agnostic/Schema'
import { Component, EventContext, Payload } from '@devitools/Agnostic/Helper/interfaces'

import { me } from 'source/domains/Auth/Service/index'

import Service from './MyAccountService'
import { domain } from '../settings'
import $emporium from '@devitools/emporium'

/**
 * @class {MyAccountSchema}
 */
export default class MyAccountSchema extends Schema {
  /**
   * @type {string}
   */
  static domain = domain

  /**
   * @type {Http}
   */
  service = Service

  /**
   * available: ['none', 'index']
   * @type {string}
   */
  afterCreate = 'none'

  /**
   * @param {Component} $component
   * @param {Record<string, unknown>} dependencies
   * Call schema builder method
   */
  construct ($component?: Component, dependencies?: Record<string, unknown>): void {
    this.addField('name')
      .fieldIsInputPlan()
      .fieldFormAutofocus()
      .fieldFormWidth(50)
      .validationRequired()

    this.addField('email')
      .fieldIsInputPlan()
      .fieldFormWidth(50)
      .validationRequired()
      .validationEmail()

    this.addField('password')
      .fieldIsPassword({ generator: true })
      .fieldFormWidth(50)
      .fieldOn('generate', function (this: Component, payload: Payload) {
        const { $event } = payload
        this.$getField('confirmation').$setValue($event)
      })
      .validationPassword()

    this.addField('confirmation')
      .fieldFormWidth(50)
      .fieldIsPassword({ generator: false })
      .validationSameAs(['password'])

    this.removeActions(['back', 'print', 'destroy', 'home'])

    const schema = this
    this.getAction('update')
      .actionOn('click', function (this: Component, eventContext: EventContext) {
        const {
          context,
          $event
        } = eventContext
        const after = () => {
          $emporium.commit('updateModified', false)
          me()
        }
        return schema.actionUpdate.call(this, {
          $event,
          schema,
          ...context,
          after
        })
      })
  }

  /**
   * @param {MyAccountSchema} schema
   */
  createdHook (this: Component, schema: MyAccountSchema) {
    const fields = ['name', 'email']
    for (const field of fields) {
      this.$getField(field).$setValue(this.$user(field))
    }
  }
}
