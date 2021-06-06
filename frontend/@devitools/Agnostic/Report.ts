import Base from './Base'

import Groups from './Schema/Groups'
import Fields from './Schema/Fields'
import FieldTable from './Schema/FieldTable'
import FieldForm from './Schema/FieldForm'
import FieldIs from './Schema/FieldIs'
import FieldValidation from './Schema/FieldValidation'
import Actions from './Schema/Actions'
import Hooks from './Schema/Hooks'
import Watches from './Schema/Watches'
import Avoids from './Schema/Avoids'
import ConfigureComponentReport from './Schema/Component/ConfigureComponentReport'

import { ProvideReport, SchemaForm, SchemaTable } from './Helper/interfaces'
import mixin from './Helper/mixin'

/**
 * @class {Report}
 */
abstract class Report extends Base {
  /**
   * @type {string}
   */
  static identifier: string

  /**
   * @returns {[string]}
   */
  initScopes () {
    return ['report']
  }

  /**
   * Bootstrap everything
   * @param {SchemaForm | SchemaTable} $component
   */
  bootstrap ($component?: SchemaForm | SchemaTable) {
    this.configureComponentInitialization()
  }

  /**
   * @return {ProvideReport}
   */
  provide (): ProvideReport {
    const schema = <typeof Report>this.constructor
    return {
      report: schema.identifier,
      groupType: schema.groupType,
      settings: {},
      domain: schema.domain,
      hooks: () => this.getHooks(),
      groups: () => this.getActions(),
      actions: () => this.getActions(),
      fields: () => this.getFields(),
      watches: () => this.getWatches()
    }
  }
}

/**
 * @interface {Report}
 */
interface Report extends Groups,
  Fields,
  FieldTable,
  FieldForm,
  FieldIs,
  FieldValidation,
  Actions,
  Hooks,
  Watches,
  Avoids,
  ConfigureComponentReport {
}

mixin(Report, [
  Groups,
  Fields,
  FieldTable,
  FieldForm,
  FieldIs,
  FieldValidation,
  Actions,
  Hooks,
  Watches,
  Avoids,
  ConfigureComponentReport
])

export default Report
