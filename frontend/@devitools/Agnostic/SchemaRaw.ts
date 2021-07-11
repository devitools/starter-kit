import Schema from './Schema'
import { SchemaForm, SchemaTable } from './Helper/interfaces'

/**
 * @class {SchemaRaw}
 */
export default abstract class SchemaRaw extends Schema {
  /**
   * Bootstrap everything
   * @param {SchemaForm | SchemaTable} $component
   */
  bootstrap ($component?: SchemaForm | SchemaTable) {
    this.configureComponentInitialization()
  }

  /**
   */
  timestamps () {
  }
}
