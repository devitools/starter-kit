import Base from '../Base'

/**
 * @class {Hooks}
 */
export default abstract class Hooks extends Base {
  /**
   * @param {string} name
   * @param {function} handler
   * @returns {this}
   */
  addHook (name: string, handler: Function) {
    this.__hooks[name] = handler
    return this
  }

  /**
   * @param {string} name
   * @returns {this}
   */
  removeHook (name: string) {
    delete this.__hooks[name]
    return this
  }

  /**
   * @return {Record<string, Function>}
   */
  getHooks (): Record<string, Function> {
    return this.__hooks
  }
}
