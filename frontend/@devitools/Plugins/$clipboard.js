let clipboard = {}

/**
 * @type {Clipboard}
 */
export default {
  /**
   * @param {string} index
   * @param {*} value
   */
  register (index, value) {
    clipboard[index] = value
  },
  /**
   * @param {string} index
   * @returns {undefined|*}
   */
  recover (index) {
    if (!clipboard.hasOwnProperty(index)) {
      return undefined
    }
    try {
      const clone = JSON.parse(JSON.stringify(clipboard[index]))
      delete clipboard[index]
      return clone
    } catch (e) {
      // silent is gold
    }
    return undefined
  },
  /**
   */
  clear () {
    clipboard = {}
  }
}
