import Base from '../Base'

/**
 * @class {Avoids}
 */
export default abstract class Avoids extends Base {
  /**
   * @param {string} field
   * @returns {this}
   */
  addAvoid (field: string) {
    this.__avoids.push(field)
    return this
  }

  /**
   * @returns {this}
   */
  fieldAvoid (): this {
    this.__avoids.push(this.__currentField)
    return this
  }

  /**
   * @return {string[]}
   */
  getAvoids (): string[] {
    return this.__avoids
  }
}
