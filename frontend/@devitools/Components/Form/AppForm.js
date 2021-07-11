import SchemaForm from '../../Components/Schema/SchemaForm'

/**
 * @component {AppForm}
 */
export default {
  /**
   */
  extends: SchemaForm,
  /**
   */
  name: 'AppForm',
  /**
   */
  props: {
    height: {
      type: String,
      default: 'auto'
    }
  },
  /**
   */
  methods: {
    /**
     * @return {string|Array|Object}
     */
    renderFormClassNames () {
      return ['AppForm', this.renderFormGroupingClass()]
    },
    /**
     * @return {string|Array|Object}
     */
    renderFormWrapperClassNames () {
      return 'AppForm__wrapper'
    },
    /**
     * @return {string|Array|Object}
     */
    renderFormBodyClassNames () {
      return 'AppForm__body'
    },
    /**
     * @return {string|Array|Object}
     */
    renderFormBodyStyles () {
      return { height: 'auto' }
    },
    /**
     * @param {function} h
     * @returns {VNode}
     */
    renderForm (h) {
      const data = { class: this.renderFormWrapperClassNames(), style: this.renderFormWrapperStyles() }
      const children = [
        this.renderFormBody(h)
      ]

      return h('div', data, children)
    }
  },
  watch: {
    value (value) {
      this.record = value
    }
  }
}
