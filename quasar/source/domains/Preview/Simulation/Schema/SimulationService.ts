import Rest from '@devitools/Services/Rest'
import { resource } from '../settings'

/**
 * @class {SimulationService}
 */
export default class SimulationService extends Rest {
  /**
   * @type {string}
   */
  resource = resource
}
