// noinspection ES6CheckImport
import { QFabAction } from 'quasar'

/**
 * @typedef {Object} SchemaButtonSingle
 * @link https://codepen.io/wilcorrea/pen/BaBJpjR?editors=0010s
 * TODO: use label as static tooltips
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
    renderButtonFloating (h, data, children) {
      return h(QFabAction, data, children)
    }
  }
}
