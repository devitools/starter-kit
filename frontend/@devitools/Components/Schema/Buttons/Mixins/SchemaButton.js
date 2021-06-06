import AppTooltip from '../../../Tooltip/AppTooltip'

import SchemaButtonDropdown from '../Renders/SchemaButtonDropdown'
import SchemaButtonFloating from '../Renders/SchemaButtonFloating'
import SchemaButtonSingle from '../Renders/SchemaButtonSingle'

/**
 * @mixin {SchemaButton}
 */
export default {
  /**
   */
  mixins: [
    SchemaButtonDropdown, SchemaButtonFloating, SchemaButtonSingle
  ],
  /**
   */
  methods: {
    /**
     * @param {string} key
     */
    buttonRef (key) {
      return `form:button-${key}`
    },
    /**
     * @param {function} h
     * @param {Object} button
     * @returns {*}
     */
    renderButton (h, button) {
      if (button.hidden) {
        return
      }

      const data = {
        key: button.$key,
        ref: button.reference ? this.buttonRef(button.reference) : undefined,
        class: button.class,
        domProps: { name: button.$key },
        attrs: { ...button.attrs },
        on: { ...button.listeners },
        style: button.style
      }

      const children = []
      if (button.attrs.tooltip) {
        children.push(h(AppTooltip, button.attrs.tooltip))
      }

      if (button.dropdown) {
        return this.renderButtonDropdown(h, data)
      }

      if (button.__floating) {
        return this.renderButtonFloating(h, data, children)
      }

      return this.renderButtonSingle(h, data, children)
    }
  }
}
