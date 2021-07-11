// contracts
import Dynamic from './Contracts/Dynamic'
import Table from './Contracts/Table'

// mixins
import SchemaTableRender from './Table/Mixins/SchemaTableRender'
import SchemaTableSlots from './Table/Mixins/SchemaTableSlots'

/**
 * @component {SchemaTable}
 */
export default {
  /**
   */
  name: 'SchemaTable',
  /**
   */
  mixins: [Dynamic, Table, SchemaTableSlots, SchemaTableRender],
  /**
   */
  created () {
    this.$payload = {}
  }
}
