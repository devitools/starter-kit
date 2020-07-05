import Rest from '@devitools/Services/Rest'
import { resource } from '../settings'

/**
 * @class {GoalService}
 */
export default class GoalService extends Rest {
  /**
   * @type {string}
   */
  resource = resource
}
