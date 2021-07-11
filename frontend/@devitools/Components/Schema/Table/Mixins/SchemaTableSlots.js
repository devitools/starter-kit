import { QBtn, QIcon, QInput, QSelect, QSpace, QTd } from 'quasar'

import { counter, filterKey, renderField } from 'src/settings/schema'
import { attrs as defaultAttrs } from 'src/settings/components'
import { tableShowColumnsSelector, tableShowFilters, tableShowSearch } from 'src/settings/table'

import { POSITIONS } from '../../../../Agnostic/enum'
import { erase, write } from '../../../../Util/storage'
import { styleStringToObject } from '../../../../Util/general'

import SchemaTablePagination from '../Components/SchemaTablePagination'

/**
 * @mixin {SchemaTableSlots}
 */
export default {
  /**
   */
  data: () => ({
    tableFilters: {}
  }),
  /**
   */
  methods: {
    /**
     * @param h
     * @returns {*}
     */
    renderTableSlots (h) {
      const slots = {}
      slots.top = (props) => {
        return this.renderTableTop(h, props)
      }

      /** @counter */
      slots[`body-cell-${counter.name}`] = (props) => {
        return this.renderTableCellButtons(h, props)
      }

      if (!this.$scopedSlots.bottom) {
        slots.pagination = (props) => {
          return this.renderTablePagination(h, props)
        }
        return slots
      }

      slots.bottom = this.$scopedSlots.bottom

      return slots
    },
    /**
     * @param {function} h
     * @param {Object} props
     * @returns {*}
     */
    renderTableTop (h, props) {
      const top = [
        this.renderSchemaButtonsCompact(h, POSITIONS.POSITION_TABLE_TOP, { records: this.selected })
      ]

      if (tableShowColumnsSelector) {
        top.push(h(QSpace))
        top.push(this.renderTableColumnsSelector(h))
      }

      if (tableShowFilters) {
        top.push(h(QSpace))
        top.push(this.renderTableFilter(h))
      }

      if (tableShowSearch) {
        top.push(h(QSpace))
        top.push(this.renderTableSearch(h))
      }

      return top
    },
    /**
     * @param {function} h
     * @returns {*}
     */
    renderTableColumnsSelector (h) {
      const domProps = { id: 'selector' }
      const attrs = {
        'display-value': this.$lang('agnostic.table.columns'),
        multiple: true,
        borderless: true,
        dense: true,
        'options-dense': true,
        'emit-value': true,
        'map-options': true,
        options: this.columns,
        'option-value': 'name',
        'transition-show': 'jump-up',
        'transition-hide': 'flip-down',
        'popup-content-class': 'SchemaTable__selector__popup',
        ...defaultAttrs,
        clearable: false
      }
      const props = {
        value: this.visibleColumns
      }
      const style = {
        'min-width': '120px'
      }
      const on = {
        input: (visibleColumns) => {
          this.visibleColumns = visibleColumns
          if (!this.schema) {
            return
          }
          write(`${this.schema}:visible-columns`, visibleColumns, true)
        }
      }

      const scopedSlots = {
        prepend: () => {
          const attrs = { icon: 'close', flat: true, round: true, size: 'sm' }
          const style = { 'margin-left': '-8px' }
          const on = {
            click: ($event) => {
              $event.preventDefault()
              $event.stopPropagation()
              erase(`${this.schema}:visible-columns`)
              this.visibleColumns = this.parseVisibleColumns()
            }
          }
          const options = { attrs, style, on }
          return h(QBtn, options)
        }
      }

      const options = {
        domProps,
        attrs,
        props,
        on,
        style,
        scopedSlots
      }
      return h(QSelect, options)
    },
    /**
     * @param {function} h
     */
    renderTableFilter (h) {
      const filters = Object.values(this.fields()).filter((field) => field.$layout.tableFilter !== undefined)
      if (!filters.length) {
        return
      }

      const tableFilters = filters.map((field) => {
        const input = ($event) => {
          this.tableFilters[field.$key] = $event && $event.target ? $event.target.value : $event
          field.$layout.tableFilter.call(this, $event)
        }
        field.classNames = 'keep-visible'
        return renderField(h, field, input, this.tableFilters[field.$key])
      })
      return [h(QSpace), ...tableFilters]
    },
    /**
     * @param {function} h
     * @returns {*}
     */
    renderTableSearch (h) {
      const domProps = { id: 'search' }
      const attrs = {
        autofocus: this.$q.platform.is.desktop,
        dense: true,
        clearable: true,
        debounce: 2000,
        placeholder: this.$lang('agnostic.table.search'),
        ...defaultAttrs
      }
      const props = { value: this[filterKey] }
      const keypress = ($event) => {
        if ($event.key !== 'Enter') {
          return
        }
        this.tableFetchApplyFilter($event.target.value)
      }
      const on = {
        input: this.tableFetchApplyFilter,
        keypress
      }
      const scopedSlots = {
        append: () => h(QIcon, { attrs: { name: 'search' } })
      }

      return h(QInput, {
        domProps,
        attrs,
        props,
        on,
        scopedSlots
      })
    },
    /**
     * @param {function} h
     * @param {Object} props
     * @returns {*}
     */
    renderTableCellButtons (h, props) {
      if (this.counter === undefined) {
        this.counter = 0
      }

      const style = styleStringToObject(counter.style)
      const data = {
        style: { position: 'relative', ...style }
      }
      const children = []
      if (this.$q.platform.is.desktop) {
        /** @counter */
        children.push(
          counter.generate(this.pagination.page, this.pagination.rowsPerPage, this.counter++),
          this.renderSchemaButtonsCompact(h, POSITIONS.POSITION_TABLE_CELL, { record: props.row })
        )
        if (this.counter >= this.data.length) {
          this.counter = 0
        }
      }
      if (this.$q.platform.is.mobile) {
        children.push(this.renderSchemaButtonsFabInline(h, POSITIONS.POSITION_TABLE_CELL, { record: props.row }))
      }
      return h(QTd, data, children)
    },
    /**
     * @param {function} h
     * @param {Object} props
     * @returns {*}
     */
    renderTablePagination (h, props) {
      const on = {
        'trigger:first-page': this.firstPage,
        'trigger:previous-page': this.previousPage,
        'trigger:next-page': this.nextPage,
        'trigger:last-page': this.lastPage
      }
      return [
        h(SchemaTablePagination, { props, on })
      ]
    }
  },
  /**
   */
  created () {
    const filters = Object.values(this.fields()).filter((field) => field.$layout.tableFilter !== undefined)
    this.tableFilters = filters.reduce((accumulator, field) => {
      accumulator[field.$key] = field.attrs.value
      return accumulator
    }, {})
  }
}
