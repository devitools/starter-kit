// noinspection ES6CheckImport
import { QIcon } from 'quasar'

// settings
import { serializeSearch, serializeWhere, unSerializeSearch } from 'src/settings/schema'

// app
import { POSITIONS } from '../../../../Agnostic/enum'
import { is, withoutSeparator } from '../../../../Util/general'

// mixin
import Button from '../../Contracts/Button'
// component
import SchemaTableWhereForm from './SchemaTableWhereForm'
import SchemaButtons from '../../Buttons/SchemaButtons'

/**
 * @component {SchemaTableWhere}
 */
export default {
  /**
   */
  name: 'SchemaTableWhere',
  /**
   */
  mixins: [
    Button
  ],
  /**
   */
  props: {
    domain: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      required: true
    },
    primaryKey: {
      type: String,
      required: true
    },
    displayKey: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: () => ''
    },
    fields: {
      type: [Function, Object],
      default: () => ({})
    },
    actions: {
      type: Function,
      default: () => ([])
    },
    schema: {
      type: String,
      default: () => '*'
    }
  },
  /**
   */
  data () {
    const fields = this.$util.run(this.fields)

    const components = Object.values(fields)
      .filter((field) => {
        const tableWhere = !!field.$layout.tableWhere
        if (!tableWhere) {
          return false
        }
        if (field.hasOwnProperty('$visible')) {
          return field.$visible.call(this)
        }
        return true
      })
      .reduce((accumulator, field) => {
        accumulator[field.$key] = field
        return accumulator
      }, {})

    const record = Object.keys(components)
      .reduce((accumulator, key) => {
        accumulator[key] = undefined
        return accumulator
      }, {})

    return {
      components,
      record,

      open: false,
      activeSearching: false,
      ready: false,
      errors: {}
    }
  },
  /**
   */
  computed: {
    /**
     * @returns {[string]}
     */
    classNames () {
      const classNames = ['SchemaTableWhere']
      if (this.open) {
        classNames.push('SchemaTableWhere--open')
      }
      if (this.ready) {
        classNames.push('SchemaTableWhere--ready')
      }
      return classNames
    },
    /**
     * @return {*}
     */
    route () {
      return this.$store.getters['app/getRoute']
    }
  },
  /**
   */
  methods: {
    /**
     * @param {function} h
     * @returns {*}
     */
    renderToggle (h) {
      const className = 'SchemaTableWhere__toggle'
      const data = {
        class: className + (this.activeSearching ? ` ${className}--searching` : ''),
        on: { click: this.toggleWhere }
      }
      const children = [
        this.renderToggleIcon(h)
      ]
      return h('div', data, children)
    },
    /**
     * @param {function} h
     * @returns {*}
     */
    renderToggleIcon (h) {
      const color = 'white'
      const size = '1.4rem'
      return [
        h(QIcon, {
          domProps: { id: 'search' },
          attrs: {
            color,
            size,
            name: 'search'
          }
        }),
        h(QIcon, {
          domProps: { id: 'arrow' },
          attrs: {
            color,
            size,
            name: 'arrow_back'
          }
        })
      ]
    },
    /**
     * @param {function} h
     * @returns {*}
     */
    renderSide (h) {
      if (!this.open) {
        return
      }

      this.$performance.start('renderSide')
      const data = {
        class: 'SchemaTableWhere__side',
        on: { submit: this.searchSubmit }
      }
      const children = [
        this.renderSideForm(h),
        this.renderSideButtons(h)
      ]
      this.$performance.end('renderSide')
      return h('form', data, children)
    },
    /**
     * @param {function} h
     * @returns {*}
     */
    renderSideBackdrop (h) {
      const data = {
        class: 'SchemaTableWhere__backdrop',
        on: { click: this.dismissWhere }
      }
      return h('div', data)
    },
    /**
     * @param {function} h
     * @returns {*}
     */
    renderSideForm (h) {
      const data = {
        attrs: {
          domain: this.domain,
          components: this.$util.clone(this.components),
          dataset: this.$util.clone(this.record)
        },
        domProps: { value: this.record },
        props: { value: this.record },
        on: {
          input: this.receiveInput,
          submit: this.searchApply
        }
      }
      return h(SchemaTableWhereForm, data)
    },
    /**
     * @param {function} h
     * @returns {*}
     */
    renderSideButtons (h) {
      const attrs = {
        component: this,
        scope: this.scope,
        buttons: this.buttons,
        context: { record: this.record },
        position: POSITIONS.POSITION_TABLE_SEARCH
      }
      const data = { attrs }
      return h(SchemaButtons, data)
    },
    /**
     * @receiveInput {SchemaTableWhere}
     * @param {field} field
     * @param {*} value
     */
    receiveInput ({ field, value }) {
      this.record[field] = value
    },
    /**
     */
    toggleWhere () {
      if (this.open === false) {
        this.backup = this.$util.clone(this.record)
      }
      this.open = !this.open
    },
    /**
     */
    dismissWhere () {
      this.open = false
      window.setTimeout(() => {
        this.record = this.backup
      }, 500)
    },
    /**
     * @param {Event} $event
     */
    searchSubmit ($event) {
      $event.preventDefault()
      $event.stopPropagation()
      this.searchApply()
    },
    /**
     */
    searchApply () {
      const query = serializeWhere(this.record, this.components)
      this.activeSearching = true
      this.$emit('input', serializeSearch(query))
      this.toggleWhere()
    },
    /**
     */
    searchCancel () {
      this.activeSearching = false
      this.$emit('input', '')
      this.toggleWhere()
    },
    /**
     * @param {string} value
     */
    hydrateRecord (value) {
      const unSerialized = unSerializeSearch(value)
      Object.keys(this.record).forEach((field) => {
        if (unSerialized[field]) {
          this.record[field] = this.hydrateRecordValue(field, withoutSeparator(unSerialized[field]))
          return
        }
        const component = this.components[field]
        const defaults = {
          currency: 0,
          string: '',
          select: undefined,
          datetime: undefined,
          user: undefined
        }
        this.record[field] = defaults[component.$type]
      })
    },
    /**
     * @param {string} key
     * @param {*} value
     */
    hydrateRecordValue (key, value) {
      if (!this.activeSearching) {
        this.activeSearching = true
      }
      const component = this.components[key]

      if (component.$type === 'number' || component.$type === 'currency') {
        return isNaN(Number(value)) ? 0 : Number(value)
      }

      if (component.$type === 'boolean') {
        return !!value
      }

      if (component.$type !== 'select') {
        return value
      }

      if (component.attrs.options) {
        return isNaN(Number(value)) ? String(value) : Number(value)
      }
      try {
        const payload = JSON.parse(value)
        return {
          [component.attrs.keyValue]: payload[component.attrs.keyValue],
          [component.attrs.keyLabel]: payload[component.attrs.keyLabel]
        }
      } catch (e) {
        return value
      }
    }
  },
  /**
   */
  watch: {
    value: {
      immediate: true,
      handler (value) {
        this.hydrateRecord(value)
      }
    },
    route () {
      this.ready = false
    }
  },
  /**
   */
  created () {
    this.renderButtons()
    if (is(this.buttons)) {
      return
    }

    this.buttons = {
      search: {
        positions: [POSITIONS.POSITION_TABLE_SEARCH],
        scopes: [''],
        attrs: {
          label: this.$lang('agnostic.actions.search.label'),
          tooltip: this.$lang('agnostic.actions.search.tooltip'),
          color: 'primary',
          icon: 'search'
        },
        listeners: { click: this.searchApply }
      },
      cancel: {
        positions: [POSITIONS.POSITION_TABLE_SEARCH],
        scopes: [''],
        attrs: {
          label: this.$lang('agnostic.actions.searchClear.label'),
          tooltip: this.$lang('agnostic.actions.searchClear.tooltip'),
          icon: 'cancel'
        },
        listeners: { click: this.searchCancel }
      }
    }
  },
  /**
   */
  mounted () {
    const ready = () => {
      this.ready = true
    }
    window.setTimeout(ready, 500)
  },
  /**
   * @param {function} h
   * @returns {*}
   */
  render (h) {
    if (!Object.keys(this.components).length) {
      return undefined
    }

    const data = { class: this.classNames }
    const children = [
      this.renderSideBackdrop(h),
      this.renderToggle(h),
      this.renderSide(h)
    ]

    return h('div', data, children)
  }
}
