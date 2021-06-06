/**
 * @mixin {Group}
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {string} group
     * @returns {Object}
     */
    $getGroup (group) {
      this.__currentGroup = group
      return this
    },
    /**
     * @param {boolean} hidden
     * @return {this}
     */
    $groupHidden (hidden = true) {
      return this._setGroup('hidden', hidden)
    },
    /**
     * @param {string} property
     * @param {Any} value
     * @return {this}
     */
    _setGroup (property, value) {
      this.grouping[this.__currentGroup][property] = value
      return this
    }
  }
}
