// contracts
import Dynamic from './Contracts/Dynamic'
import Form from './Contracts/Form'
import Group from './Contracts/Group'

// mixins
import SchemaFormRender from './Form/Mixins/SchemaFormRender'
import SchemaFormBody from './Form/Mixins/SchemaFormBody'

/**
 * @component {SchemaForm}
 */
export default {
  /**
   */
  name: 'SchemaForm',
  /**
   */
  mixins: [Dynamic, Form, Group, SchemaFormBody, SchemaFormRender],
  /**
   */
  data: () => ({
    groupSelected: ''
  }),
  /**
   */
  created () {
    this.$payload = {}
  }
}
