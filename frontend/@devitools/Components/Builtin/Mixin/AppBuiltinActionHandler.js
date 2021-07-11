import { primaryKey } from 'src/settings/schema'

import { SCOPES_BUILTIN } from '../../../Agnostic/enum'
import { unique } from '../../../Util/general'
import Dialog from '../../Schema/Contracts/Dialog'

/**
 */
export default {
  /**
   */
  mixins: [Dialog],
  /**
   */
  data: () => ({
    formActive: false,
    item: {},
    items: []
  }),
  /**
   */
  methods: {
    /**
     * @param {{$key: string, event: string, parameters: Record<string,unknown>}} config
     */
    resolveAction (config) {
      const {
        $key,
        parameters,
        event
      } = config
      const listener = this.listeners[$key] || {}
      const handler = listener[event]
      if (typeof handler !== 'function') {
        return
      }
      handler.call(this, parameters)
    },
    /**
     * @param {Object} record
     * @param {string} scope
     */
    setItem (record, scope) {
      this.__currentItem = record.__id
      this.item = record
      this.scope = scope
      this.formActive = true
    },
    /**
     * @param {Array} items
     */
    updateValue (items) {
      this.$emit('input', items)
    },
    /**
     * @param {Object} record
     * @return {number | *}
     */
    getCurrentIndex (record) {
      return this.items.findIndex((item) => item.__id === record.__id)
    }
  },
  /**
   */
  watch: {
    value: {
      handler (value) {
        if (!Array.isArray(value)) {
          return
        }

        let update
        const __unique = unique()

        this.items = value.map((item, index) => {
          const __id = item.__id || item[primaryKey] || `${__unique}__${index}`
          if (this.item.__id === __id) {
            update = {
              ...this.$util.clone(item),
              __id
            }
          }
          return {
            ...item,
            __id
          }
        })

        if (!update) {
          return
        }
        this.item = update
      },
      immediate: true
    },
    defaults (defaults) {
      if (this.scope !== SCOPES_BUILTIN.SCOPE_BUILTIN_ADD) {
        return
      }
      this.item = this.$util.clone(defaults)
    }
  }
}
