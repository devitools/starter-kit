/**
 * @mixin {FormFetch}
 */
import { delayLoading } from 'src/settings/rest'

export default {
  /**
   */
  methods: {
    /**
     * @param {boolean|number} wait
     * @param {string} [message]
     * @param {boolean} wait
     */
    loadingShow (wait = true, message = undefined) {
      const delay = wait === true ? delayLoading(this) : Number(wait || 0)
      this.$q.loading.show({ delay, message })
    },
    /**
     */
    loadingHide () {
      this.$q.loading.hide()
    },
    /**
     * @param {Number|String} id
     * @returns {Promise}
     */
    fetchRecord (id) {
      if (this.builtin) {
        return new Promise((resolve) => resolve(false))
      }

      this.loadingShow()

      this.triggerHook('request:record', { id })
        .then(this.successFetchRecord)
        .catch(this.errorFetchRecord)
        .finally(this.finallyFetchRecord)
    },
    /**
     * @param {Object} record
     */
    successFetchRecord (record) {
      this.loadingHide()

      this.fetching = true
      this.$payload = this.$util.clone(record)
      const recordName = this.$options.recordName || 'record'
      const unavailable = Symbol('unavailable')

      Object.keys(this[recordName]).forEach((key) => {
        const value = this.$util.get(record, key, unavailable)
        if (value === unavailable) {
          return
        }

        if (this.components[key] && this.components[key].$parseInput) {
          this[recordName][key] = this.components[key].$parseInput(value)
          return
        }

        this[recordName][key] = value
      })
      const handler = () => (this.fetching = false)
      window.setTimeout(handler, 500)

      if (!this.triggerHook) {
        return
      }
      this.triggerHook('fetch:record')
    },
    /**
     */
    errorFetchRecord (/* error */) {
      // this.$error.report(error)
    },
    /**
     */
    finallyFetchRecord (/* error */) {
      this.loadingHide()
      this.showPlaceholderContent = false
    }
  }
}
