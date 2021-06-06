import SchemaError from '../SchemaFormError'
import { replacement } from '../../../../Util/string'

/**
 * @mixin {SchemaFormFieldError}
 */
export default {
  /**
   */
  props: {
    errors: {
      type: Object,
      default: () => ({})
    }
  },
  /**
   */
  components: {
    SchemaError
  },
  /**
   */
  methods: {
    /**
     * @param {string} field
     * @returns {string}
     */
    errorContent (field) {
      const errorMessages = []
      const domain = String(this.domain).replace(/\//g, '.')
      const validations = this.$util.get(this.validations, `record.${field}`)

      if (validations) {
        for (const validation in validations.$params) {
          if (!validations.$params.hasOwnProperty(validation)) {
            continue
          }
          let status
          try {
            status = validations[validation]
          } catch (e) {
            status = true
          }
          if (status) {
            continue
          }
          const replaces = Object.assign(
            validations.$params[validation] || {},
            { domain, field, validation }
          )
          const preference = `domains.${domain}.validations.${field}.${validation}`
          const paths = [
            preference,
            `domains.${domain}.validation.${field}.${validation}`,
            `domains.${domain}.validations.${field}.${validation}`,
            `domains.${this.domain}.validation.${field}.${validation}`,
            `domains.${this.domain}.validations.${field}.${validation}`,
            `validation.${validation}`
          ]
          const message = replacement(this.$lang(paths, preference), replaces) || preference
          errorMessages.push(message)
        }
      }

      if (this.errors[field]) {
        const error = this.errors[field]
        const validation = error.validation
        const paths = [
          `domains.${domain}.validation.${field}.${validation}`,
          `domains.${domain}.validations.${field}.${validation}`,
          `domains.${this.domain}.validation.${field}.${validation}`,
          `domains.${this.domain}.validations.${field}.${validation}`,
          `validation.${validation}`
        ]
        const message = this.$lang(paths, validation)
        errorMessages.push(replacement(message, error.parameters))
      }

      return errorMessages.join(' / ')
    },
    /**
     * @param {Function} h
     * @param {string} key
     * @param {boolean} error
     * @returns {*}
     */
    renderFieldError (h, key, error) {
      return h('schema-error', { attrs: { show: error, message: this.errorContent(key) } })
    }
  }
}
