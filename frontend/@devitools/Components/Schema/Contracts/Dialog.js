import { alert, confirm, prompt } from '../../../dialog'

/**
 */
export default {
  /**
   */
  methods: {
    /**
     */
    install () {
      /**
       * @param {string} message
       * @param {Object} options
       * @returns {Promise}
       */
      this.$alert = alert

      /**
       * @param {string} message
       * @param {Object} options
       * @returns {Promise}
       */
      this.$confirm = confirm

      /**
       * @param {string} message
       * @param {Object} options
       * @returns {Promise}
       */
      this.$prompt = prompt
    }
  },
  /**
   */
  created () {
    this.install()
  }
}
