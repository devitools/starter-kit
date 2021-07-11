import { primaryKey } from 'src/settings/schema'
import { SCOPES } from '../../../Agnostic/enum'

export default {
  /**
   */
  props: {
    domain: {
      type: String,
      required: true
    },
    fields: {
      type: Function,
      required: true
    },
    value: {
      type: Array,
      default: () => ([])
    },
    primaryKey: {
      type: String,
      default: primaryKey
    },
    optimize: {
      type: Boolean,
      default: false
    },
    useUuid: {
      type: Boolean,
      default: false
    },
    hooks: {
      type: Function,
      default: () => ({})
    },
    readonly: {
      type: Boolean,
      default: false
    },
    static: {
      type: Boolean,
      default: false
    },
    debuggerAllowed: {
      type: Boolean,
      default: false
    },
    inheritErrors: {
      type: Object,
      default: () => ({})
    },
    scope: {
      type: String,
      default: () => SCOPES.SCOPE_ADD
    },
    startNoEmpty: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    overrides: {
      type: Object,
      default: () => ({
        fields: () => undefined,
        actions: () => undefined
      })
    }
  }
}
