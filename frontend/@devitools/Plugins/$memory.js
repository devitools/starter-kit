import $emporium from '../emporium'

let storage = {}

export default {
  /**
   * @param {string} index
   * @returns {undefined|*}
   */
  get (index) {
    if ($emporium.state.purging) {
      return undefined
    }

    return storage[index]
  },
  /**
   * @param {string} index
   * @param {*} value
   */
  set (index, value) {
    if ($emporium.state.purging) {
      return
    }

    storage[index] = value
  },
  /**
   */
  clear () {
    storage = {}
  }
}
