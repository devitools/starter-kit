import Schema from '@devitools/Agnostic/Schema'

import Service from 'source/domains/Admin/User/Schema/UserService'
import { domain } from 'source/domains/Admin/User/settings'

import { OPERATORS, SCOPES } from '@devitools/Agnostic/enum'
import ProfileSchema from 'source/domains/Admin/Profile/Schema/ProfileSchema'
import { withSeparator } from '@devitools/Util/general'

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
    const profileOptions = { query: { reference: withSeparator('regular', OPERATORS.NOT_EQUAL) } }

    this.addField('name')
      .fieldTableShow()
      .fieldTableWhere()
      .fieldFormAutofocus()
      .fieldFormWidth(50)
      .validationRequired()

    this.addField('username')
      .fieldTableShow()
      .fieldTableWhere()
      .fieldIsInputPlan()
      .fieldFormWidth(50)
      .validationRequired()
      .validationMinLength(2)
      .validationAs('regex', function (value) {
        return (/(^([a-zA-Z]+)([_]+)?(\d+)?([a-zA-Z]+)?)$/g).test(value)
      })

    this.addField('profile')
      .fieldTableShow()
      .fieldTableWhere()
      .fieldIsSelectRemote(ProfileSchema.build().provideRemote(profileOptions))
      .fieldFormWidth(100)
      .validationRequired()

    this.addField('password')
      .fieldFormWidth(50)
      .fieldIsPassword()
      .fieldOn('generate', function ({ $event }) {
        this.$getField('confirmPassword').$setValue($event)
      })
      .validationPassword()
      .validationRequiredWhen(function () {
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
      .fieldConfigure(function (field) {
        if (this.scope === SCOPES.SCOPE_ADD) {
          field.$layout.formHidden = true
        }
        return field
      })
  }

  /**
   * @param {boolean} isElevated
   * @param {boolean} isAdmin
   * @return {*}
   */
  provideRemoteWithQuery (isElevated, isAdmin) {
    let options
    if (isElevated) {
      options = { query: { 'profile.reference': withSeparator('regular', OPERATORS.EQUAL) } }
      if (isAdmin) {
        options.query = { 'profile.reference': withSeparator('agent,regular', OPERATORS.IN) }
      }
    }
    return this.provideRemote(options)
  }
}
