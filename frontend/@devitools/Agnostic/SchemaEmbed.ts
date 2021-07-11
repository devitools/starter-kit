import Skeleton from './Skeleton'

import { SchemaForm, SchemaTable } from './Helper/interfaces'
import mixin from './Helper/mixin'
import ConfigureActionsSchemaEmbed from './Schema/Component/ConfigureActionsSchemaEmbed'
import { scopesEmbed } from './enum'

/**
 * @class {SchemaEmbed}
 */
abstract class SchemaEmbed extends Skeleton {
  /**
   * @return {string[]}
   */
  initScopes (): string[] {
    return scopesEmbed()
  }

  /**
   * Bootstrap everything
   * @param {SchemaForm | SchemaTable} $component
   */
  bootstrap ($component?: SchemaForm | SchemaTable) {
    this.fieldAsPrimaryKey()

    this.configureActionsSchemaEmbed()
    this.configureComponentInitialization()
    this.configureRequestRecords()
    this.configureRequestRecord()
  }

  /**
   * @param {string} masterKey
   * @returns {ProvideEmbed}
   */
  static provideEmbed (masterKey: string): ProvideEmbed {
    let build: SchemaEmbed
    const instance = () => {
      if (!build) {
        build = this.build()
      }
      return build
    }

    return {
      masterKey: masterKey,
      groupType: this.groupType,
      domain: this.domain,
      primaryKey: this.primaryKey,
      displayKey: this.displayKey,
      hooks: () => instance().getHooks(),
      actions: () => instance().getActions(),
      groups: () => instance().getGroups(),
      fields: () => instance().getFields(),
      watches: () => instance().getWatches()
    }
  }
}

/**
 * @type {ProvideEmbed}
 */
type ProvideEmbed = {
  masterKey: string
  groupType: string
  domain: string
  primaryKey: string
  displayKey: string
  hooks: Function
  actions: Function
  groups: Function
  fields: Function
  watches: Function
}

/**
 * @interface {SchemaEmbed}
 */
interface SchemaEmbed extends ConfigureActionsSchemaEmbed {
  provideEmbed (masterKey: string): ProvideEmbed
}

mixin(SchemaEmbed, [ConfigureActionsSchemaEmbed])

export default SchemaEmbed
