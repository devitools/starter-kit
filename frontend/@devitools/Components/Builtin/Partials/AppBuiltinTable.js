import SchemaTable from '../../Schema/SchemaTable'
import AppTable from '../../Table/AppTable'

import { POSITIONS, SCOPES_BUILTIN } from '../../../Agnostic/enum'
import { counter } from 'src/settings/schema'

/**
 * @component {AppBuiltinTable}
 */
export default {
  /**
   */
  extends: SchemaTable,
  /**
   */
  name: 'AppBuiltinTable',
  /**
   */
  props: {
    height: {
      type: String,
      default: '400px'
    },
    readonly: {
      type: Boolean,
      default: false
    },
    headless: {
      type: Boolean,
      default: false
    }
  },
  /**
   */
  methods: {
    /**
     */
    renderButtons () {
      const actions = this.actions()
      if (!actions) {
        return
      }

      if (this.readonly) {
        this.buttons = actions.reduce(this.buttonReduce, {})
        return
      }

      const filter = (action) => action.scopes.includes(this.scope)
      this.buttons = actions
        .filter(filter)
        .reduce(this.buttonReduce, {})
    },
    /**
     * @param h
     * @returns {*}
     */
    renderTableSlots (h) {
      if (this.readonly || this.headless) {
        return {
          /** @counter */
          [`body-cell-${counter.name}`]: (props) => {
            return this.renderTableCellButtons(h, props)
          },
          pagination: (props) => {
            return this.renderTablePagination(h, props)
          }
        }
      }

      return {
        top: (props) => {
          return this.renderTableTop(h, props)
        },
        /** @counter */
        [`body-cell-${counter.name}`]: (props) => {
          return this.renderTableCellButtons(h, props)
        },
        pagination: (props) => {
          return this.renderTablePagination(h, props)
        }
      }
    },
    /**
     * @param {function} h
     * @param {Object} props
     * @returns {*}
     */
    renderTableTop (h, props) {
      return [
        this.renderSchemaButtonsCompact(h, POSITIONS.POSITION_TABLE_TOP, { records: this.selected })
      ]
    },
    /**
     * @param {function} h
     * @param {Array} classes
     * @param {boolean} embed
     * @returns {*}
     */
    renderTable (h, classes = ['SchemaTable'], embed = false) {
      if (this.scope === SCOPES_BUILTIN.SCOPE_BUILTIN_TRASH) {
        classes.push('trash')
      }

      const attrs = this.renderTableAttrs()

      const props = this.renderTableProps()

      const style = { height: this.height }

      const scopedSlots = this.renderTableSlots(h)

      const on = this.renderTableOn()

      return h(AppTable, { class: classes, props, attrs, style, scopedSlots, on })
    }
  },
  /**
   * @param {function} h
   */
  render (h) {
    const data = { class: ['AppBuiltinTable'] }
    const children = [
      this.renderTable(h)
    ]

    return h('div', data, children)
  }
}
