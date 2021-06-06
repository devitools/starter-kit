import {
  QBar,
  QBtn,
  QCard,
  QCardSection,
  QDialog,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QSpace,
  QPopupProxy
} from 'quasar'

import Popup from '../../Mixins/Popup'
import { withSeparator } from '../../Util/general'
import AppTooltip from '../Tooltip/AppTooltip'

/**
 * @mixin {AppSelectRemote}
 */
export default {
  /**
   */
  multiple: undefined,
  /**
   */
  mixins: [Popup],
  /**
   */
  components: {
    QBar,
    QBtn,
    QCard,
    QCardSection,
    QDialog,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QSpace,
    QPopupProxy,
    AppTooltip
  },
  /**
   */
  props: {
    value: {
      type: Array, // [Number, String, Object, Array]
      default: () => []
    },
    remote: {
      type: Function,
      required: true
    },
    widget: {
      type: Boolean,
      default: false
    },
    fields: {
      type: Object,
      default: () => undefined
    },
    domain: {
      type: String,
      default: ''
    },
    keyValue: {
      type: String,
      required: true
    },
    keyLabel: {
      type: String,
      required: true
    },
    component: {
      type: [String, Function, Object],
      default: () => undefined
    },
    query: {
      type: Object,
      default: () => ({})
    },
    format: {
      type: Function,
      default: undefined
    },
    path: {
      default: undefined
    },
    uppercase: {
      type: Boolean,
      default: true
    }
  },
  /**
   */
  computed: {
    arriving () {
      return this.value
    },
    bind () {
      const attrs = { ...this.$attrs }
      const bind = {
        'use-input': true,
        'map-options': true,
        clearable: true,
        'use-chips': this.$options.multiple,
        multiple: this.$options.multiple,
        'popup-content-class': this.uppercase ? 'uppercase' : '',
        loading: this.loading,
        ...attrs
      }
      delete bind.value
      delete bind.placeholder
      return bind
    },
    /**
     * @return {boolean}
     */
    hideSelected () {
      if (this.$options.multiple) {
        return false
      }
      return this.searching
    },
    /**
     * @return {String|Object}
     */
    noResults () {
      let path = 'agnostic.components.appSelectRemote.noResults'
      if (this.loading) {
        path = 'agnostic.components.appSelectRemote.searching'
      }
      return this.$lang(path)
    },
    /**
     * @return {String|Object|string}
     */
    placeholder () {
      if (this.value) {
        return ''
      }
      return this.$lang('agnostic.components.appSelectRemote.placeholder')
    }
  },
  /**
   */
  data: () => ({
    options: [],
    loading: false,
    openPreview: false,
    searching: false
  }),
  /**
   */
  methods: {
    /**
     * @param filter
     * @param update
     * @param abort
     */
    async filterRemote (filter, update, abort) {
      this.loading = true
      try {
        let query = { ...this.query }
        if (Array.isArray(this.value)) {
          const values = this.value.map((item) => item[this.keyValue]).join(',')
          query = { [this.keyValue]: withSeparator(values, 'nin') }
        }
        let options = await this.remote(filter, undefined, query)
        if (!Array.isArray(options)) {
          options = []
        }
        this.loading = false
        this.__options = options
        this.updateOptions()
        if (!update) {
          return
        }
        update()
      } catch (e) {
        this.loading = false
        this.options = []
        if (!abort) {
          return
        }
        abort()
      }
    },
    /**
     */
    filterAbortRemote () {
      this.options = []
    },
    /**
     * @param value
     */
    goingOut (value) {
      let input = value
      if (Array.isArray(value)) {
        input = value.map((selected) => selected.__meta)
      }
      this.$emit('input', input)
    },
    /**
     */
    updateOptions () {
      if (!this.__options) {
        return
      }

      const options = this.__options.map((row) => this.parseOptions(row))
      if (Array.isArray(this.value)) {
        const selected = this.value.map((selected) => selected[this.keyValue])
        this.options = options.filter((option) => !selected.includes(option.value))
        return
      }
      this.options = options
    },
    /**
     * @param {Object} row
     */
    parseOptions (row) {
      const value = row[this.keyValue]
      const label = this.format ? this.format(row, row[this.keyLabel]) : row[this.keyLabel]
      return { value, label, __meta: row }
    },
    /**
     * @param {Event} $event
     */
    hideCurrentValue ($event = undefined) {
      if ($event && $event.key && ['Enter', 'Tab'].includes($event.key)) {
        return
      }
      this.searching = true
    },
    /**
     */
    showCurrentValue () {
      this.searching = false
    },
    /**
     * @param {Event} $event
     */
    widgetOpen ($event) {
      $event.preventDefault()
      $event.stopPropagation()
      this.showCurrentValue()

      if (this.path) {
        this.openPopup(this.path)
        return
      }
      this.openDialog = true
    },
    /**
     * @param {Event} $event
     */
    previewOpen ($event) {
      $event.preventDefault()
      $event.stopPropagation()
      this.openPreview = true
    }
  },
  /**
   */
  watch: {
    value () {
      this.updateOptions()
    }
  }
}
