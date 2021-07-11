import { QCheckbox, QTable } from 'quasar'
import { get } from '../../Util/general'

/**
 * @component {AppTable}
 */
export default {
  /**
   */
  extends: QTable,
  /**
   */
  name: 'AppTable',
  /**
   */
  methods: {
    /**
     * @param h
     * @param row
     * @param bodySlot
     * @param pageIndex
     * @return {*}
     * @private
     */
    __getTBodyTR (h, row, bodySlot, pageIndex) {
      const
        key = this.getRowKey(row),
        selected = this.isRowSelected(key)

      if (bodySlot !== void 0) {
        return bodySlot(
          this.__getBodyScope({
            key,
            row,
            pageIndex,
            __trClass: selected ? 'selected' : ''
          })
        )
      }

      const
        bodyCell = this.$scopedSlots['body-cell'],
        child = this.computedCols.map(col => {
          const
            bodyCellCol = this.$scopedSlots[`body-cell-${col.name}`],
            slot = bodyCellCol !== void 0 ? bodyCellCol : bodyCell

          if (slot !== void 0) {
            return slot(this.__getBodyCellScope({ key, row, pageIndex, col }))
          }
          const value = this.getCellValue(col, row)
          const domProps = {}
          if (col.format) {
            domProps.innerHTML = value
          }
          let staticClass = col.__tdClass
          if (typeof staticClass === 'function') {
            staticClass = staticClass()
          }
          let classes = col.classes
          if (Array.isArray(col.classes)) {
            classes = col.classes.join(' ')
          }
          const data = {
            staticClass,
            style: col.style,
            class: classes,
            domProps
          }
          return h('td', data, value)
        })

      if (this.hasSelectionMode === true) {
        const slot = this.$scopedSlots['body-selection']
        const content = slot !== void 0
          ? slot(this.__getBodySelectionScope({ key, row, pageIndex }))
          : [
            h(QCheckbox, {
              props: {
                value: selected,
                color: this.color,
                dark: this.isDark,
                dense: this.dense
              },
              on: {
                input: (adding, evt) => {
                  this.__updateSelection([key], [row], adding, evt)
                }
              }
            })
          ]

        child.unshift(
          h('td', { staticClass: 'q-table--col-auto-width' }, content)
        )
      }

      const data = { key, class: { selected }, on: {} }

      if (this.qListeners['row-click'] !== void 0) {
        data.class['cursor-pointer'] = true
        data.on.click = evt => {
          this.$emit('row-click', evt, row, pageIndex)
        }
      }

      if (this.qListeners['row-dblclick'] !== void 0) {
        data.class['cursor-pointer'] = true
        data.on.dblclick = evt => {
          this.$emit('row-dblclick', evt, row, pageIndex)
        }
      }

      return h('tr', data, child)
    },
    /**
     * @param {function} h
     * @return {VNode}
     */
    getTableBody (h) {
      const
        body = this.$scopedSlots.body,
        bodyCell = this.$scopedSlots['body-cell'],
        topRow = this.$scopedSlots['top-row'],
        bottomRow = this.$scopedSlots['bottom-row']
      let
        child = []

      if (body !== void 0) {
        child = this.computedRows.map(row => {
          const
            key = row[this.rowKey],
            selected = this.isRowSelected(key)

          return body(this.addBodyRowMeta({
            key,
            row,
            cols: this.computedCols,
            colsMap: this.computedColsMap,
            __trClass: selected ? 'selected' : ''
          }))
        })
      } else {
        child = this.computedRows.map(row => {
          const
            key = row[this.rowKey],
            selected = this.isRowSelected(key),
            child = bodyCell
              ? this.computedCols.map(col => bodyCell(this.addBodyCellMetaData({ row, col })))
              : this.computedCols.map(col => {
                let value = this.getCellValue(col, row)
                const domProps = {}
                if (col.format) {
                  domProps.innerHTML = value
                  value = undefined
                }
                const properties = {
                  staticClass: col.__tdClass,
                  style: col.style,
                  class: col.classes,
                  domProps
                }
                const slot = this.$scopedSlots[`body-cell-${col.name}`]
                if (!slot) {
                  return h('td', properties, value)
                }
                return slot(this.addBodyCellMetaData({ row, col: col }))
              })

          this.hasSelectionMode === true && child.unshift(
            h('td', { staticClass: 'q-table--col-auto-width' }, [
              h(QCheckbox, {
                props: {
                  value: selected,
                  color: this.color,
                  dark: this.dark,
                  dense: this.dense
                },
                on: {
                  input: adding => {
                    this.__updateSelection([key], [row], adding)
                  }
                }
              })
            ])
          )

          return h('tr', { key, class: { selected } }, child)
        })
      }

      if (topRow !== void 0) {
        child.unshift(topRow({ cols: this.computedCols }))
      }
      if (bottomRow !== void 0) {
        child.push(bottomRow({ cols: this.computedCols }))
      }

      return h('tbody', child)
    },
    /**
     * @param {Object} col
     * @param {Object} row
     * @returns {*}
     */
    getCellValue (col, row) {
      const value = typeof col.field === 'function' ? col.field(row) : get(row, col.field)
      if (col.format === void 0) {
        return value
      }
      return col.format(value, row, col)
    }
  }
}
