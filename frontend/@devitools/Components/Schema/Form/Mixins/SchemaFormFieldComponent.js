import { renderField } from 'src/settings/schema'

/**
 * @mixin {SchemaFormFieldComponent}
 */
export default {
  /**
   */
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    validations: {
      type: Object,
      default: () => ({})
    },
    safe: {
      type: Boolean,
      default: true
    }
  },
  /**
   */
  data: () => ({
    record: {}
  }),
  /**
   */
  methods: {
    /**
     * @param {Object} field
     */
    componentRef (field) {
      return `form:component-${field.$key}`
    },
    /**
     * @returns {number}
     */
    componentTabIndex () {
      if (!this.counter) {
        this.counter = 0
      }
      this.counter++
      return this.counter
    },
    /**
     * @param {Object} $event
     * @param {Object} component
     */
    componentInput ($event, component) {
      if (this.useFormReadonly) {
        return
      }
      const value = component.$parseOutput ? component.$parseOutput($event) : $event
      const field = component.$key
      this.record[field] = value
      /**
       * @receiveInput {SchemaTableWhere}
       * @receiveInput {SchemaForm.@mixin:SchemaBody}
       */
      this.$emit('input', { field, value })
      if (component.listeners.input) {
        component.listeners.input($event)
      }
    },
    /**
     * @param {function} h
     * @param {Object} field
     * @returns {*}
     */
    renderFieldComponent (h, field) {
      const value = this.record[field.$key]
      const error = this.inheritErrors ? (this.inheritErrors[field.$key] || {}) : {}
      const input = ($event) => this.componentInput($event, field)
      const ref = this.componentRef(field)
      const tabIndex = this.componentTabIndex()
      const attrs = { domain: field.attrs.domain || this.domain, inheritErrors: error, name: field.$key }
      let readonly = 'readonly'
      if (!field.attrs.useReadonly) {
        readonly = 'disable'
      }
      if (this.useFormReadonly) {
        attrs[readonly] = this.useFormReadonly
      }
      return renderField(h, field, input, value, ref, tabIndex, attrs)
    },
    /**
     * @param {Object} value
     */
    updateRecord (value) {
      if (this.safe) {
        this.record = this.$util.clone(value)
        return
      }
      this.record = value
    }
  },
  /**
   */
  watch: {
    /**
     * @param value
     */
    value: {
      deep: true,
      immediate: true,
      handler (value) {
        this.updateRecord(value)
      }
    }
  },
  /**
   */
  created () {
    this.counter = 1
  }
}
