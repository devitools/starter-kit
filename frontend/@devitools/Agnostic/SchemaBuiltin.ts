import Schema from './Schema'

import { Provide, SchemaForm, SchemaTable } from './Helper/interfaces'
import mixin from './Helper/mixin'
import ConfigureActionsSchemaBuiltin from './Schema/Component/ConfigureActionsSchemaBuiltin'
import { scopesBuiltin } from './enum'

/**
 * @class {SchemaBuiltin}
 */
abstract class SchemaBuiltin extends Schema {
  /**
   * @return {string[]}
   */
  initScopes (): string[] {
    return scopesBuiltin()
  }

  /**
   * Bootstrap everything
   * @param {SchemaForm | SchemaTable} $component
   */
  bootstrap ($component?: SchemaForm | SchemaTable) {
    this.fieldAsPrimaryKey()

    this.configureActionsSchemaBuiltin()
    this.configureComponentInitialization()
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @return {ProvideBuiltin}
   */
  static provideBuiltin (attrs: Record<string, unknown> = {}): ProvideBuiltin {
    return {
      providing: () => this.build().provide(),
      defaults: {},
      debuggerAllowed: attrs?.debuggerAllowed ? Boolean(attrs.debuggerAllowed) : undefined,
      disable: attrs?.disable ? Boolean(attrs.disable) : undefined,
      height: attrs?.height ? String(attrs.height) : undefined,
      size: attrs?.size ? Number(attrs.size) : undefined,
      ...attrs
    }
  }
}

/**
 * @type: ProvideBuiltin
 */
type ProvideBuiltin = {
  providing(): Provide
  defaults: Record<string, unknown>
  debuggerAllowed?: boolean
  disable?: boolean
  height?: string
  size?: number
}

/**
 * @class {SchemaBuiltin}
 */
interface SchemaBuiltin extends ConfigureActionsSchemaBuiltin {
  provideBuiltin (attrs?: Record<string, unknown>): ProvideBuiltin
}

mixin(SchemaBuiltin, [ConfigureActionsSchemaBuiltin])

export default SchemaBuiltin
