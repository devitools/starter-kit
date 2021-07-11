import AppTooltip from '../../../Tooltip/AppTooltip'

/**
 * @mixin {SchemaFormFieldLabel}
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {function} h
     * @param {Object} field
     * @returns {*}
     */
    renderFieldLabel (h, field) {
      const data = {}
      if (typeof field.label !== 'string') {
        return undefined
      }

      const children = [
        h('span', { domProps: { innerHTML: field.label } })
      ]
      const required = this.labelRequired(h, field)
      if (required) {
        children.push(required)
      }
      const tooltip = this.labelTooltip(h, field)
      if (tooltip) {
        children.push(tooltip)
      }
      return h('div', { class: 'app-form__label' }, [h('label', data, children)])
    },
    /**
     * @param {function} h
     * @param {Object} field
     * @returns {string}
     */
    labelRequired (h, field) {
      // no label, no extra
      if (!field.label) {
        return undefined
      }
      const manual = !!this.errors[field.$key]
      const automatic = this.$util.get(this.validations, `record.${field.$key}.$error`)
      // not validation, return without *
      if (!field.$hasValidation && !manual && !automatic) {
        return undefined
      }
      // lets validate, return with *
      return h('i', { class: 'is-required' })
    },
    /**
     * @param {function} h
     * @param {Object} field
     * @returns {string}
     */
    labelTooltip (h, field) {
      if (!field.tooltip && !field.attrs.tooltip) {
        return undefined
      }

      return h(AppTooltip, field.tooltip || field.attrs.tooltip)
    }
  }
}
