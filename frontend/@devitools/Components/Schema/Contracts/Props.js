/**
 * @mixin {Props}
 */
export default {
  props: {
    groupType: {
      type: String,
      default: () => 'sections'
    },
    path: {
      type: String,
      default: () => ''
    },
    schema: {
      type: String,
      default: () => ''
    },
    domain: {
      type: String,
      default: () => ''
    },
    table: {
      type: Object,
      default: () => ({})
    },
    form: {
      type: Object,
      default: () => ({})
    },
    settings: {
      type: Object,
      default: () => ({})
    },
    primaryKey: {
      type: String,
      default: () => 'id'
    },
    displayKey: {
      type: String,
      default: () => ''
    },
    fields: {
      type: Function,
      default: () => ({})
    },
    groups: {
      type: Function,
      default: () => () => ({})
    },
    actions: {
      type: Function,
      default: () => ([])
    },
    hooks: {
      type: Function,
      default: () => ({})
    },
    watches: {
      type: Function,
      default: () => ({})
    },
    builtin: {
      type: Boolean,
      default: false
    },
    debuggerAllowed: {
      type: Boolean,
      default: true
    },
    fillerAllowed: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    avoids: {
      type: Function,
      default: () => ({})
    }
  }
}
