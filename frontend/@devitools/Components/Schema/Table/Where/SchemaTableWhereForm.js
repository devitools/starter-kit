import FormComponent from '../../Contracts/Form/FormComponent'
import SchemaFieldLabel from '../../Form/Mixins/SchemaFormFieldLabel'
import SchemaFieldComponent from '../../Form/Mixins/SchemaFormFieldComponent'

/**
 * @component {SchemaTableWhereForm}
 */
export default {
  /**
   */
  name: 'SchemaTableWhereForm',
  /**
   */
  mixins: [
    FormComponent, SchemaFieldLabel, SchemaFieldComponent
  ],
  /**
   */
  props: {
    domain: {
      type: String,
      required: true
    },
    components: {
      type: Object,
      required: true
    },
    dataset: {
      type: Object,
      required: true
    }
  },
  /**
   * @return {*}
   */
  data () {
    return {
      record: this.dataset,
      errors: {}
    }
  },
  /**
   */
  methods: {
    /**
     * @param $event
     */
    fieldKeyup ($event) {
      if ($event.keyCode !== 13) {
        return
      }
      this.$emit('submit')
    },
    /**
     * @param {function} h
     * @param {Field|Object} field
     * @returns {*}
     */
    renderWhereFormComponent (h, field) {
      if (field.$layout.tableWhereComponent) {
        field.is = field.$layout.tableWhereComponent
      }
      field.label = this.parseFieldLabel(field)
      field.attrs.label = undefined
      field.attrs.clearable = field.$type !== 'currency'
      if (field.attrs.options) {
        let options = this.parseFieldOptions(field)
        if (Array.isArray(options)) {
          options = options.map((option) => {
            if (option.hasOwnProperty('disable')) {
              delete option.disable
            }
            return option
          })
        }
        field.attrs.options = options
      }
      (['disable', 'borderLess', 'disabled', 'readonly', 'autofocus']).forEach((property) => {
        field.attrs[property] = false
      })
      field.listeners = { keyup: this.fieldKeyup }

      if (field.$type === 'boolean') {
        field.attrs['indeterminate-value'] = undefined
        field.attrs['toggle-indeterminate'] = true
      }

      const data = { class: 'SchemaTableWhere__component' }
      const children = [
        this.renderFieldLabel(h, field),
        this.renderFieldComponent(h, field)
      ]
      return h('div', data, children)
    }
  },
  /**
   * @param {function} h
   * @returns {*}
   */
  render (h) {
    const data = { class: 'SchemaTableWhere__form' }
    const children = Object.values(this.components)
      .map((field) => this.renderWhereFormComponent(h, field))
    return [h('div', data, children)]
  }
}
