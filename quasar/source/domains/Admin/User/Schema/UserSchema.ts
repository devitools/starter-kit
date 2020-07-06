import Schema from '@devitools/Agnostic/Schema'
import { Component, Field, Payload } from '@devitools/Agnostic/Helper/interfaces'
import { SCOPES } from '@devitools/Agnostic/enum'

import Service from 'source/domains/Admin/User/Schema/UserService'
import { domain } from 'source/domains/Admin/User/settings'

import ProfileSchema from 'source/domains/Admin/Profile/Schema/ProfileSchema'

/**
 * @class {UserSchema}
 */
export default class UserSchema extends Schema {
  /**
   * @type {string}
   */
  static domain = domain

  /**
   * @type {Http}
   */
  service = Service

  /**
   */
  construct () {
    this.addField('name')
      .fieldIsInputPlan()
      .fieldTableShow()
      .fieldTableWhere()
      .fieldFormAutofocus()
      .fieldFormWidth(50)
      .fieldFormFill()
      .validationRequired()

    this.addField('username')
      .fieldIsInputPlan()
      .fieldTableShow()
      .fieldTableWhere()
      .fieldFormWidth(50)
      .fieldFormFill()
      .validationRequired()
      .validationMinLength(2)
      .validationEmail()
    /*
    .validationAs('regex', function (value) {
      return (/(^([a-zA-Z]+)([_]+)?(\d+)?([a-zA-Z]+)?)$/g).test(value)
    })
    */

    this.addField('profile')
      .fieldIsSelectRemote(ProfileSchema.provideRemote())
      .fieldTableShow()
      .fieldTableWhere()
      .fieldFormWidth(100)
      .fieldFormFill()
      .validationRequired()

    this.addField('password')
      .fieldIsPassword()
      .fieldFormWidth(50)
      .fieldFormFill()
      .fieldOn('generate', function (this: Component, payload: Payload) {
        const { $event } = payload
        this.$getField('confirmPassword').$setValue($event)
      })
      .validationPassword()
      .validationRequiredWhen(function (this: Component) {
        return this.scope === SCOPES.SCOPE_ADD
      })

    this.addField('confirmPassword')
      .fieldFormWidth(50)
      .fieldIsPassword({ generator: false })
      .validationSameAs(['password'])

    this.addField('active')
      .fieldTableShow()
      .fieldTableWhere()
      .fieldIsToggle()
      .fieldFormDefaultValue(true)
      .fieldConfigure(function (this: Component, field: Field) {
        if (this.scope === SCOPES.SCOPE_ADD) {
          field.$layout.formHidden = true
        }
        return field
      })
  }
}
