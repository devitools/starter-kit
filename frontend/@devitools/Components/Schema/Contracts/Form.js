import { fieldsReorder } from '../../../Agnostic/Helper'

import FormComponents from './Form/FormComponents'
import FormError from './Form/FormError'
import FormFetch from './Form/FormFetch'
import FormField from './Form/FormField'
import FormRecord from './Form/FormRecord'
import FormValidation from './Form/FormValidation'

/**
 * @typedef {Object} Form
 */
export default {
  /**
   */
  mixins: [
    FormComponents, FormError, FormFetch, FormField, FormRecord, FormValidation
  ],
  /**
   */
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  /**
   */
  data () {
    return {
      components: {},
      record: {},
      payload: {},
      grouping: {},
      errors: {},

      inheritErrors: {},
      showPlaceholderContent: false,
      useFormReadonly: false
    }
  },
  /**
   */
  methods: {
    /**
     */
    initialize () {
      this.record = {}
      this.components = {}

      this.renderGroups()
      this.renderComponents()
      this.renderErrors()
      this.renderRecord()
      this.renderButtons()
      this.renderWatches()
    },
    /**
     * @param {Schema} schema
     * @param {string} fail
     * @returns {boolean}
     */
    formCheckIntegrity (schema, fail) {
      this.$v.$touch()
      if (this.$v.$error || this.hasErrors() || this.hasPending()) {
        this.$message.warning(this.$lang(fail))
        return false
      }
      return !!schema.service
    },
    /**
     * @param {boolean} formHidden
     * @return {this}
     */
    $fieldFormHidden (formHidden = true) {
      return this.$setLayout('formHidden', formHidden)
    },
    /**
     * @param {number} formWidth
     * @return {this}
     */
    $fieldFormWidth (formWidth) {
      return this.$setLayout('formWidth', formWidth)
    },
    /**
     * @param {number} formHeight
     * @return {this}
     */
    $fieldFormHeight (formHeight) {
      return this.$setLayout('formHeight', formHeight)
    },
    /**
     * @param {string} property
     * @param {*} value
     * @return {this}
     */
    $fieldAttr (property, value) {
      return this.$setAttr(property, value)
    },
    /**
     * @param {boolean} disable
     * @return {this}
     */
    $fieldFormDisabled (disable = true) {
      return this.$setAttr('disable', disable)
    },
    /**
     * @param {number} formOrder
     * @param {boolean} updateOthers
     * @return {this}
     */
    $fieldFormOrder (formOrder, updateOthers = false) {
      this.$setLayout('formOrder', formOrder)
      if (updateOthers) {
        fieldsReorder(this.components, this.__currentField, 'formOrder', formOrder)
      }
      return this
    }
  }
}
