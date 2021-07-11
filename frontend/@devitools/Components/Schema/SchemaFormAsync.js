// contracts
import Basic from './Contracts/Basic'
import Form from './Contracts/Form'
import Group from './Contracts/Group'
// mixins
import SchemaFormRender from './Form/Mixins/SchemaFormRender'
import SchemaFormBody from './Form/Mixins/SchemaFormBody'

/**
 * @component {SchemaFormAsync}
 */
export default {
  /**
   */
  name: 'SchemaFormAsync',
  /**
   */
  mixins: [Basic, Form, Group, SchemaFormBody, SchemaFormRender],
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
    groupSelected: '',
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
