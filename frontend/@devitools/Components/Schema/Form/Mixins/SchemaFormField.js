import SchemaFieldComponent from './SchemaFormFieldComponent'
import SchemaFieldLabel from './SchemaFormFieldLabel'
import SchemaFieldError from './SchemaFormFieldError'

/**
 * @mixin {SchemaFormField}
 */
export default {
  /**
   */
  mixins: [
    SchemaFieldLabel, SchemaFieldComponent, SchemaFieldError
  ],
  /**
   */
  methods: {
    /**
     * @param {function} h
     * @param {Object} field
     */
    renderField (h, field) {
      const key = field.$key

      const error = this.fieldHasError(key)
      const data = {
        key: key,
        class: this.fieldClass(field, error)
      }

      const children = [
        this.renderFieldLabel(h, field),
        this.renderFieldComponent(h, field),
        field.$layout.formError ? this.renderFieldError(h, key, error) : undefined,
        this.renderFieldUtilities(h)
      ]

      return h('div', data, children)
    },
    /**
     * @param {function} h
     */
    renderFieldUtilities (h) {
      const children = []
      if (this.$scopedSlots.resizer) {
        children.push(this.$scopedSlots.resizer())
      }
      if (children.length) {
        return h('div', { class: 'field-utilities' }, children)
      }
    },
    /**
     * @param {*} field
     * @param {Boolean} error
     * @returns {Array}
     */
    fieldClass (field, error = false) {
      const width = field.$layout.formWidth
      const height = field.$layout.formHeight
      const background = field.$layout.formBackground
      const hidden = field.$layout.formHidden
      const classNames = [field.$key.replace(/\./g, ' '), 'field', `width-${width}`, `height-${height}`, background]
      if (hidden) {
        classNames.push('hide')
      }
      if (error) {
        classNames.push('has-error')
      }
      return classNames
    },
    /**
     * @param {string} key
     */
    fieldHasError (key) {
      if (this.errors[key]) {
        return true
      }
      const record = this.$util.get(this.validations, 'record', {})
      if (record[key] === undefined) {
        return false
      }
      return record[key].$error
    }
  }
}
