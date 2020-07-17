import Schema from '@devitools/Agnostic/Schema'

import Service from './ProfileService'
import { domain } from '../settings'

import permissions from 'src/settings/permissions'

/**
 * @type {ProfileSchema}
 */
export default class ProfileSchema extends Schema {
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
      .fieldTableShow()
      .fieldTableWhere()
      .fieldFormAutofocus()
      .fieldFormWidth(50)
      .validationRequired()

    this.addField('reference')
      .fieldTableShow()
      .fieldTableWhere()
      .fieldIsSelect()
      .fieldFormWidth(50)
      .validationRequired()

    this.addField('permissions')
      .fieldIsTree({
        open: ['all', 'general', 'admin'],
        nodes: permissions(),
        nodeKey: 'namespace',
        valueKey: 'namespace'
      })
  }
}
