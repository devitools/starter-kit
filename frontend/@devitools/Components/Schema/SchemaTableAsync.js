// contracts
import Basic from './Contracts/Basic'
import Table from './Contracts/Table'
// mixins
import SchemaTableRender from './Table/Mixins/SchemaTableRender'
import SchemaTableSlots from './Table/Mixins/SchemaTableSlots'

/**
 * @component {SchemaTableAsync}
 */
export default {
  name: 'SchemaTableAsync',
  /**
   */
  mixins: [Basic, Table, SchemaTableSlots, SchemaTableRender],
  /**
   */
  props: {
    path: {
      type: String,
      required: true
    }
  },
  /**
   */
  data: () => ({
    settings: {},
    domain: '',
    groupType: '',
    displayKey: '',
    primaryKey: '',
    groups: () => ({}),
    fields: () => ({}),
    actions: () => ([]),
    hooks: () => ({}),
    watches: () => ({}),
    builtin: false,
    debuggerAllowed: true
  })
}
