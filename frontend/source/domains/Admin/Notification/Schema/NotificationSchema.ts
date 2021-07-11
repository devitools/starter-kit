import Schema from '@devitools/Agnostic/Schema'

import { SCOPES } from '@devitools/Agnostic/enum'
import { Component } from '@devitools/Agnostic/Helper/interfaces'

import NotificationService from './NotificationService'
import { domain } from '../settings'

import UserSchema from 'source/domains/Admin/User/Schema/UserSchema'
import { primaryKey } from 'src/settings/schema'

/**
 * @class { NotificationSchema }
 */
export default class NotificationSchema extends Schema {
  /**
   * @type {string}
   */
  static domain = domain

  /**
   * @type {Http}
   */
  service = NotificationService

  /**
   */
  construct () {
    this.addField('user')
      .fieldVisible(function (this: Component) {
        return this.$user('admin') === 1
      })
      .fieldIsSelectRemote(UserSchema.provideRemote())
      .fieldTableShow()
      .fieldTableWhere()
      .fieldFormWidth(50)
      .validationRequired()

    this.addField('subject')
      .fieldTableShow()
      .fieldTableWhere()
      .fieldFormWidth(50)
      .validationRequired()

    this.addField('message')
      .fieldIsTextEditor()
      .fieldFormWidth(50)
      .fieldFormHeight(3)
      .validationRequired()

    this.getField('createdAt')
      .fieldIsDatetime()
      .fieldTableShow()
      .fieldFormWidth(25)
      .fieldFormOrder(8)
      .fieldFormHidden(false)

    this.addField('readAt')
      .fieldIsDatetime()
      .fieldFormWidth(25)
      .fieldTableShow()
      .fieldTableWhere()
      .fieldFormHidden(false, { [SCOPES.SCOPE_ADD]: true })

    this.addField('read')
      .fieldIsToggle()
      .fieldFormWidth(10)
      .fieldFormHidden(false, { [SCOPES.SCOPE_ADD]: true })
      .fieldFormDisabled()
      .fieldFormDefaultValue(0)
      .fieldTableShow()

    this.removeActions(['save', 'update', 'add', 'edit', 'destroy'])

    const schema = this
    this.addHook('fetch:record', async function (this: Component) {
      const read = this.$getField('read').$getValue()
      if (read === 1) {
        return
      }

      try {
        const id = String(this.$getField(primaryKey).$getValue())
        const response = await schema.$service().markAsRead(id)
        const data = response?.data ?? {}
        this.$getField('readAt').$setValue(data['readAt'])
        this.$getField('read').$setValue(data['read'])
      } catch (e) {
        // silent is gold
      }
    })
  }

  /**
   * @return {NotificationService}
   */
  $service (): NotificationService {
    const self = <typeof Schema>this.constructor
    return NotificationService.instance().setPrimaryKey(self.primaryKey)
  }
}
