import Base from '../Base'
import { Group } from '../Helper/interfaces'

/**
 * @class {Groups}
 */
export default abstract class Groups extends Base {
  /**
   * @param {string} id
   * @param {Object} options
   * @returns {Schema|Skeleton}
   */
  addGroup (id: string, options = {}) {
    const self = this.$self()
    const label = String(this.$lang(`domains.${self.domain}.groups.${id}`))
    this.__groups[id] = { label, ...options }
    return this
  }

  /**
   * @param {string} id
   * @return {this}
   */
  removeGroup (id: string): this {
    delete this.__groups[id]
    return this
  }

  /**
   * @returns {Record<string, Group>}
   */
  getGroups (): Record<string, Group> {
    if (this.safe) {
      return this.$clone(this.__groups)
    }
    return this.__groups
  }
}
