import Schema from '@devitools/Agnostic/Schema'

import SimulationService from './SimulationService'
import { domain } from '../settings'

/**
 * @class {SimulationSchema}
 */
export default class SimulationSchema extends Schema {
  /**
   * @type {string}
   */
  static domain = domain

  /**
   * @type {SimulationService}
   */
  service = SimulationService

  /**
   * Call schema builder method
   */
  construct (): void {
    // the magic happens

    this.addField('name')
      .fieldTableShow()
      .fieldTableWhere()
      .fieldFormAutofocus()
  }
}
