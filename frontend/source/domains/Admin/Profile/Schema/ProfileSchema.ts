import Schema from '@devitools/Agnostic/Schema'

import Service from './ProfileService'
import { domain } from '../settings'

import permissions, { groups } from 'src/settings/permissions'

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
      .fieldFormWidth(54)
      .validationRequired()

    this.addField('permissions')
      .fieldIsTree({
        open: groups(),
        nodes: permissions(),
        nodeKey: 'namespace',
        valueKey: 'namespace'
      })
      .fieldFormWidth(46)
      .fieldFormHeight(4)
      .validationRequired()

    this.addField('reference')
      .fieldIsSelect()
      .fieldTableShow()
      .fieldTableWhere()
      .fieldFormWidth(54)
      .validationRequired()
  }
}
