import { defaultActions } from 'src/settings/action'

/**
 * @class {ConfigureActionsSchema}
 */
export default class ConfigureActionsSchema {
  /**
   */
  configureActionsSchema () {
    defaultActions(this)
  }
}
