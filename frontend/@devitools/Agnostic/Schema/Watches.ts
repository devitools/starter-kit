import Base from '../Base'
import { Watch } from '../Helper/interfaces'

/**
 * @class {Watches}
 */
export default abstract class Watches extends Base {
  /**
   * @param {string} name
   * @param {function} handler
   * @param {Options} options
   * @returns {this}
   */
  addWatch (name: string, handler: Function, options = {}) {
    if (!this.__watches[name]) {
      this.__watches[name] = []
    }
    this.__watches[name].push({ handler, options })
    return this
  }

  /**
   * @param {string} name
   * @returns {this}
   */
  removeWatch (name: string) {
    delete this.__watches[name]
    return this
  }

  /**
   * @returns {Record<string, Watch[]>}
   */
  getWatches (): Record<string, Watch[]> {
    if (this.safe) {
      return this.$clone(this.__watches)
    }
    return this.__watches
  }
}
