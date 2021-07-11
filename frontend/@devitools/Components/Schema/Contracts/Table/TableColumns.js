import { counter } from 'src/settings/schema'
import { read } from '../../../../Util/storage'

/**
 * @mixin {TableColumns}
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {Record<string, unknown>} options
     */
    renderColumns (options = {}) {
      const { ignore = undefined, primaryKeyLast = false, useCounter = true } = options

      const fields = this.fields()
      const columns = Object
        .values(fields)
        .filter((field) => this.columnsFilter(field, ignore))
        .map((accumulator, field) => this.columnsMap(accumulator, field), [])
        .sort((a, b) => this.columnsSort(a, b, primaryKeyLast))

      if (useCounter) {
        /** @counter */
        columns.unshift(counter)
      }
      this.columns = columns

      let visibleColumns
      if (this.schema) {
        visibleColumns = read(`${this.schema}:visible-columns`, true)
      }
      if (!visibleColumns) {
        visibleColumns = this.parseVisibleColumns()
      }
      this.visibleColumns = visibleColumns
    },
    /**
     * @return {*[]}
     */
    parseVisibleColumns () {
      return this.columns.filter((column) => !column.hidden).map((column) => column.name)
    },
    /**
     * @param {Object} field
     * @param {string} ignore
     * @return {boolean}
     */
    columnsFilter (field, ignore) {
      if (field.hasOwnProperty('$visible')) {
        return field.$visible.call(this)
      }
      if (field?.attrs?.separator) {
        return false
      }
      const scopes = field?.scopes ?? []
      if (!scopes.includes(this.scope)) {
        return false
      }
      return field[ignore] !== true
    },
    /**
     * @param {Field} field
     * @return {*}
     */
    columnsMap (field) {
      const label = this.parseFieldLabel(field)
      const hidden = this.parseFieldHidden(field)
      return {
        label,
        hidden,
        options: field.attrs.options,
        $remoteKey: field.$layout.tableRemoteKey || field.$key,
        $type: field.$type,
        name: field.$layout.tableName || field.$key,
        field: field.$key,
        $primaryKey: field.$primaryKey,
        required: field.$layout.tableRequired,
        style: `width: ${field.$layout.tableWidth}`,
        align: field.$layout.tableAlign || 'left',
        sortable: field.$layout.tableSortable,
        format: field.$layout.tableFormat ? field.$layout.tableFormat.bind(this) : undefined,
        classes: [`$key-${field.$key}`, field.attrs.uppercase ? 'text-uppercase' : ''],
        __order: field.$layout.tableOrder
      }
    },
    /**
     * @param {Object} a
     * @param {Object} b
     * @param {boolean} primaryKeyLast
     * @return {number}
     */
    columnsSort (a, b, primaryKeyLast) {
      if (primaryKeyLast && b.$primaryKey) {
        return -1
      }
      if (a.__order < b.__order) {
        return -1
      }
      if (a.__order > b.__order) {
        return 1
      }
      return 0
    },
    /**
     */
    configure () {
      Object.keys(this.columns).forEach((key) => {
        const field = this.columns[key]
        if (!(field.$configure && typeof field.$configure === 'function')) {
          return
        }
        const configured = field.$configure.call(this, this.columns[key], this.scope)
        if (!configured || configured.$key !== field.$key) {
          throw Error('The configure return must be the field')
        }
        this.columns[key] = configured
      })
    },
    /**
     * @param {Field} field
     * @return {boolean}
     */
    parseFieldHidden (field) {
      if (!field.scopes.includes(this.scope)) {
        return true
      }
      if (this.override[field.$key] && this.override[field.$key].$layout.hasOwnProperty('tableHidden')) {
        return this.override[field.$key].$layout.tableHidden
      }
      return field.$layout.tableHidden
    }
  }
}
