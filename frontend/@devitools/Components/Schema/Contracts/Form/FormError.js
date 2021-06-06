import $emporium from '../../../../emporium'
import { is } from '../../../../Util/general'

/**
 * @mixin {FormError}
 */
export default {
  /**
   */
  methods: {
    /**
     * @returns {boolean}
     */
    hasErrors () {
      return Object.keys(this.errors).filter((key) => this.errors[key]).length > 0
    },
    /**
     * @returns {boolean}
     */
    hasPending () {
      if (!$emporium.state.pending) {
        return false
      }
      const property = $emporium.state.pending
      this.errors[property] = {
        validation: 'required',
        parameters: {}
      }
      return true
    },
    /**
     */
    renderErrors () {
      const reduceErrors = (errors, field) => {
        errors[field.$key] = ''
        return errors
      }
      this.errors = Object.values(this.components).reduce(reduceErrors, {})
    },
    /**
     * @return {Record<string, Record<string,unknown> | Record<string,unknown>[]>}
     */
    getErrors () {
      const getManualErrors = (accumulator, [key, message]) => {
        if (!is(message)) {
          return accumulator
        }
        accumulator[key] = message
        return accumulator
      }
      const manual = Object
        .entries(this.errors)
        .reduce(getManualErrors, {})

      const getAutomaticErrors = (accumulator, [key, message]) => {
        if (!message?.$error) {
          return accumulator
        }
        const params = message?.$params
        if (!params) {
          return accumulator
        }
        const rules = Object.values(params)
        const messages = []
        for (const rule of rules) {
          if (!rule) {
            continue
          }
          if (message[rule.type]) {
            continue
          }
          messages.push(rule)
        }
        if (!messages.length) {
          return accumulator
        }
        accumulator[key] = messages
        return accumulator
      }
      const automatic = Object
        .entries(this.$v.record)
        .reduce(getAutomaticErrors, {})

      return { ...manual, ...automatic }
    }
  }
}
