import action from 'src/settings/action'

import $lang from '../../Lang'
import Base from '../Base'
import { Action } from '../Helper/interfaces'

/**
 * @class {Actions}
 */
export default abstract class Actions extends Base {
  /**
   * @param {string} id
   * @param {string} label
   * @returns {this}
   */
  addAction (id: string, label = ''): this {
    if (this.__actions[id]) {
      throw new Error(`Action '${id}' already exists`)
    }
    this.__currentAction = id

    const order = Object.keys(this.__actions).length
    const scopes = this.scopes
    const positions: string[] = []
    const classNames: string[] = []
    const attrs = { label }

    this.__actions[id] = action(this, id, order, scopes, positions, attrs, classNames)
    return this
  }

  /**
   * @param {string} id
   * @returns {this}
   */
  actionClone (id: string): this {
    this.__actions[this.__currentAction] = this.$clone(this.__actions[id])
    return this
  }

  /**
   * @param {string} id
   * @returns {this}
   */
  getAction (id: string): this {
    if (!this.__actions[id]) {
      throw new Error(`Action '${id}' not exists`)
    }
    this.__currentAction = id
    return this
  }

  /**
   * @param {string} id
   * @returns {this}
   */
  removeAction (id: string): this {
    if (!this.__actions[id]) {
      throw new Error(`Action '${id}' not exists`)
    }
    delete this.__actions[id]
    return this
  }

  /**
   * @param {string[]} actionIds
   * @returns {this}
   */
  removeActions (actionIds: string[]): this {
    for (const id in this.__actions) {
      if (!this.__actions.hasOwnProperty(id)) {
        continue
      }
      if (!actionIds.includes(id)) {
        continue
      }
      delete this.__actions[id]
    }
    return this
  }

  /**
   * @param {string[]} actionIds
   * @returns {this}
   */
  removeExceptActions (actionIds: string[]): this {
    for (const id in this.__actions) {
      if (!this.__actions.hasOwnProperty(id)) {
        continue
      }
      if (actionIds.includes(id)) {
        continue
      }
      delete this.__actions[id]
    }
    return this
  }

  /**
   * @param {string[]} scopes
   * @returns {this}
   */
  actionScopes (scopes: string[]): this {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].scopes = scopes
    }
    return this
  }

  /**
   * @param {string[]} scopes
   * @returns {this}
   */
  actionScopesAppend (scopes: string[]): this {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].scopes.push(...scopes)
    }
    return this
  }

  /**
   * @param {string[]} levels
   * @returns {this}
   */
  actionLevels (levels: string[]): this {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].levels = levels
    }
    return this
  }

  /**
   * @param {string} namespace
   * @returns {this}
   */
  actionNamespace (namespace: string): this {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].namespace = namespace
    }
    return this
  }

  /**
   * @param {string[]} positions
   * @returns {this}
   */
  actionPositions (positions: string[]): this {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].positions = positions
    }
    return this
  }

  /**
   * @param {string} scope
   * @returns {this}
   */
  actionScopeJust (scope: string): this {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].scopes = [scope]
    }
    return this
  }

  /**
   * @param {string} scope
   * @returns {this}
   */
  actionScopeExcept (scope: string): this {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].scopes = this.scopes.filter(item => item !== scope)
    }
    return this
  }

  /**
   * @param {number} order
   * @returns {this}
   */
  actionOrder (order: number): this {
    const id = this.__currentAction
    Object.keys(this.__actions).forEach((key) => {
      if (key === this.__currentAction) {
        return
      }
      const action = this.__actions[key]
      if (action.order < order) {
        return
      }
      action.order = action.order + 1
    })
    if (this.__actions[id]) {
      this.__actions[id].order = order
    }
    return this
  }

  /**
   * @param {string} label
   * @returns {this}
   */
  actionLabel (label = ''): this {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].attrs.label = label
    }
    return this
  }

  /**
   * @param {string} icon
   * @returns {this}
   */
  actionIcon (icon = ''): this {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].attrs.icon = icon
    }
    return this
  }

  /**
   * @param {string} tooltip
   * @returns {this}
   */
  actionTooltip (tooltip = ''): this {
    const id = this.__currentAction
    this.__actions[id].attrs.tooltip = this.$lang(tooltip || `actions.${id}.tooltip`)
    return this
  }

  /**
   * @param {string} color
   * @returns {this}
   */
  actionColor (color = ''): this {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].attrs.color = color
    }
    return this
  }

  /**
   * @param {string} textColor
   * @returns {this}
   */
  actionTextColor (textColor = ''): this {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].attrs.textColor = textColor
    }
    return this
  }

  /**
   * @param {Boolean} disabled
   * @returns {this}
   */
  actionDisabled (disabled = true): this {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].attrs.disable = disabled
    }
    return this
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @returns {this}
   */
  actionAttrsAppendAttrs (attrs: Record<string, unknown>): this {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].attrs = { ...this.__actions[id].attrs, ...attrs }
    }
    return this
  }

  /**
   * @returns {this}
   */
  actionFloatRight (): this {
    return this.actionAddClassName('button-position-right')
  }

  /**
   * @returns {this}
   */
  actionFloatLeft (): this {
    return this.actionAddClassName('button-position-left')
  }

  /**
   * @returns {this}
   */
  actionNoMinWidth (): this {
    return this.actionAddClassName('button-no-min-width')
  }

  /**
   * @param {string} className
   * @returns {this}
   */
  actionAddClassName (className: string): this {
    const id = this.__currentAction
    if (this.__actions[id]) {
      if (!this.__actions[id].class) {
        this.__actions[id].class = []
      }
      this.__actions[id].class.push(className)
    }
    return this
  }

  /**
   * @param {Boolean} hidden
   * @returns {this}
   */
  actionHidden (hidden = true): this {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].hidden = hidden
    }
    return this
  }

  /**
   * @param {Action[]} actions
   * @returns {this}
   */
  actionDropdown (actions: Action[]): this {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].dropdown = true
      if (!Array.isArray(actions)) {
        actions = []
      }
      this.__actions[id].actions = actions
    }
    return this
  }

  /**
   * @param {Function} validate
   * @returns {this}
   */
  actionValidate (validate: Function): this {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].validate = validate
    }
    return this
  }

  /**
   * @param {Function} configure
   * @returns {this}
   */
  actionConfigure (configure: Function): this {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].configure = configure
    }
    return this
  }

  /**
   * @param {string} event
   * @param {Function} handler
   * @returns {this}
   */
  actionOn (event: string, handler: Function): this {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].on[event] = handler
    }
    return this
  }

  /**
   * @returns {Action[]}
   */
  getActions (): Action[] {
    const actions = Object.values(this.__actions)
    if (this.safe) {
      return this.$clone(actions)
    }
    return actions
  }
}
