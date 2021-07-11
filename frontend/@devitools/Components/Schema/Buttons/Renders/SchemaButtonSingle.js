// noinspection ES6CheckImport
import { QBtn } from 'quasar'

/**
 * @typedef {Object} SchemaButtonSingle
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {function} h
     * @param {Object} data
     * @param {Array} children
     * @returns {*}
     */
    renderButtonSingle (h, data, children) {
      return h(QBtn, data, children)
    }
  }
}
