import { SCOPES_EMBED } from '../../Agnostic/enum'
import SchemaForm from '../Schema/SchemaForm'

/**
 * @component {AppEmbedForm}
 */
export default {
  /**
   */
  extends: SchemaForm,
  /**
   */
  name: 'AppEmbedForm',
  /**
   */
  props: {
    value: {
      type: [String, Number],
      default: () => undefined
    },
    readonly: {
      default: false
    },
    disable: {
      default: false
    },
    masterKey: {
      type: String,
      default: undefined
    },
    masterValue: {
      required: true
    },
    clipboard: {
      type: Object,
      default: () => ({})
    },
    embed: {
      type: Boolean,
      default: false
    }
  },
  /**
   */
  computed: {
    /**
     * @return {boolean}
     */
    locked () {
      if (this.readonly) {
        return true
      }
      return !this.masterValue
    }
  },
  methods: {
    /**
     * @param id
     */
    loadRecordMasterDetailForm (id) {
      const scopes = [SCOPES_EMBED.SCOPE_EMBED_EDIT, SCOPES_EMBED.SCOPE_EMBED_VIEW]
      if (!scopes.includes(this.scope)) {
        return
      }
      return this.fetchRecord(id)
    }
  },
  watch: {
    scope: {
      handler (scope) {
        if (scope === SCOPES_EMBED.SCOPE_EMBED_INDEX) {
          return
        }

        this.reloadComponents()

        if (scope !== SCOPES_EMBED.SCOPE_EMBED_VIEW) {
          return
        }

        if (!this.components) {
          return
        }
        const setField = (key) => this.setFieldAttrs(key, { readonly: true, disable: true })
        Object.keys(this.components).forEach(setField)
      },
      immediate: true
    },
    'clipboard.forceClear': {
      handler () {
        this.renderRecord()
        this.record[this.masterKey] = this.masterValue
      },
      immediate: true
    },
    masterValue: {
      handler (value) {
        this.record[this.masterKey] = value
      },
      immediate: true
    }
  },
  /**
   */
  created () {
    this.record[this.masterKey] = this.masterValue

    this.$watch(`clipboard.${this.primaryKey}`, (id) => {
      return this.loadRecordMasterDetailForm(id)
    }, { immediate: true })
  },
  /**
   * @param {function} h
   */
  render (h) {
    const data = {
      class: ['AppEmbedForm'],
      attrs: {
        padding: true
      }
    }
    const children = [
      this.renderForm(h),
      this.renderFormDebuggers(h)
    ]

    return h('div', data, children)
  }
}
