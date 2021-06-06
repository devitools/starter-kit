import Schema from '@devitools/Agnostic/Schema'

import { SCOPES } from '@devitools/Agnostic/enum'
import { Component, Payload } from '@devitools/Agnostic/Helper/interfaces'

import { UNKNOWN_VALUE } from 'src/settings/schema'

import { domain } from '../settings'

import Service from 'source/domains/Admin/User/Schema/UserService'
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
   * @type {string}
   */
  static remoteKey = 'remote'

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
      .fieldFormWidth(40)
      .fieldFormFill()
      .validationRequired()

    this.addField('email')
      .fieldIsEmail()
      .fieldTableShow()
      .fieldTableWhere()
      .fieldFormWidth(30)
      .fieldFormFill()
      .validationRequired()
      .validationEmail()

    this.addField('profile')
      .fieldIsSelectRemote(ProfileSchema.provideRemote())
      .fieldFormWidth(30)
      .validationRequired()

    this.addSeparator('security')

    this.addField('password')
      .fieldIsPassword()
      .fieldFormWidth(50)
      .fieldFormFill()
      .fieldOn('generate', function (this: Component, payload: Payload) {
        const { $event } = payload
        this.$getField('confirmation').$setValue($event)
      })
      .validationPassword()
      .validationRequiredWhen(function (this: Component) {
        return this.scope === SCOPES.SCOPE_ADD
      })

    this.addField('confirmation')
      .fieldFormWidth(50)
      .fieldIsPassword({ generator: false })
      .validationSameAs(['password'])

    this.addField('active')
      .fieldTableShow()
      .fieldTableWhere()
      .fieldIsToggle()
      .fieldFormDefaultValue(true)
      .fieldFormHidden(false, { [SCOPES.SCOPE_ADD]: true })
      .fieldFormWidth(50)
  }

  /**
   * @param {Object} options
   * @returns {Record<string, unknown>}
   */
  static provideRemote (options = {}) {
    const remote = super.provideRemote(options)
    const format = function (record: Record<string, unknown>) {
      if (!record) {
        return UNKNOWN_VALUE
      }
      return `${record.usu_nome} - ${record.usu_login}`
    }
    return {
      ...remote,
      format
    }
  }
}
