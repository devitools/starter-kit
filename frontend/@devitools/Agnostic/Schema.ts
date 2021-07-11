import { timestamps } from 'src/settings/field'
import { SHOW_PLACEHOLDER_CONTENT } from 'src/settings/schema'

import Skeleton from './Skeleton'
import ConfigureActionsSchema from './Schema/Component/ConfigureActionsSchema'
import mixin from './Helper/mixin'

import { Provide, Timestamp, SchemaForm, SchemaTable } from './Helper/interfaces'
import { SCOPES } from './enum'

/**
 * @class {Schema}
 */
abstract class Schema extends Skeleton {
  /**
   * @type {boolean}
   */
  static useUuid = true

  /**
   * @type {boolean}
   */
  static useModified = true

  /**
   * @type {boolean}
   */
  static showPlaceholderContent = SHOW_PLACEHOLDER_CONTENT

  /**
   * @type {string}
   */
  static noGroupPosition = 'before'

  /**
   * @type {string}
   */
  static selection?: string

  /**
   * Bootstrap everything
   * @param {SchemaForm | SchemaTable} $component
   */
  bootstrap ($component?: SchemaForm | SchemaTable) {
    this.fieldAsPrimaryKey()

    this.configureActionsSchema()
    this.configureComponentInitialization()
    this.configureRequestRecords()
    this.configureRequestDownload()
    this.configureRequestRecord()
  }

  /**
   */
  timestamps () {
    timestamps.forEach((element: Timestamp, index: number) => {
      if (this.__fields[element.name]) {
        return
      }

      this.addField(element.name)
        .fieldScopes([SCOPES.SCOPE_INDEX, SCOPES.SCOPE_VIEW])
        .fieldAppendAttrs({ borderLess: true, printable: true })
        .fieldTableOrder(200 + index)
        .fieldFormDisabled()
        .fieldFormHidden()
        .fieldFormWidth(index === 0 || index === 3 ? 34 : 33)
        .fieldFormOrder(200 + index)
        .setType(element.type)
    })
  }

  /**
   * @return {Provide}
   */
  provide (): Provide {
    const schema = <typeof Schema>this.constructor
    return {
      settings: {
        useUuid: schema.useUuid,
        showPlaceholderContent: schema.showPlaceholderContent,
        useModified: schema.useModified,
        noGroupPosition: schema.noGroupPosition,
        selection: schema.selection
      },
      domain: schema.domain,
      primaryKey: schema.primaryKey,
      displayKey: schema.displayKey,
      groupType: schema.groupType,
      groups: () => this.getGroups(),
      fields: () => this.getFields(),
      actions: () => this.getActions(),
      hooks: () => this.getHooks(),
      watches: () => this.getWatches(),
      avoids: () => this.getAvoids()
    }
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @return {{providing: () => Provide}}
   */
  static provider (attrs: Record<string, unknown> = {}): { providing: () => Provide } {
    return {
      providing: () => this.build().provide(),
      ...attrs
    }
  }
}

/**
 * @interface {Schema}
 */
interface Schema extends ConfigureActionsSchema {
  provide (): Provide
}

mixin(Schema, [ConfigureActionsSchema])

export default Schema
