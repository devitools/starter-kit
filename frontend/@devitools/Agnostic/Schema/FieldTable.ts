import Base from '../Base'

import { fieldsReorder } from '../Helper'
import { OPERATORS } from '../../Agnostic/enum'

/**
 * @class {FieldTable}
 */
export default abstract class FieldTable extends Base {
  /**
   * @param {number | string} tableWidth
   * @returns {Schema}
   */
  fieldTableWidth (tableWidth: number | string): this {
    return this.setLayout({ tableWidth })
  }

  /**
   * @param {Boolean} show
   * @returns {Schema}
   */
  fieldTableShow (show = true): this {
    return this.setLayout({ tableHidden: !show })
  }

  /**
   * @param {string|null} tableWhere
   * @param {string} tableWhereComponent
   * @returns {Schema}
   */
  fieldTableWhere (tableWhere: string | null = OPERATORS.AUTOMATIC, tableWhereComponent?: unknown): this {
    return this.setLayout({ tableWhere, tableWhereComponent })
  }

  /**
   * @param {string} fieldTableWhereOperator
   * @returns {Schema}
   */
  fieldTableWhereOperator (fieldTableWhereOperator: string): this {
    return this.setLayout({ fieldTableWhereOperator })
  }

  /**
   * @param {Function} tableFilter
   * @returns {Schema}
   */
  fieldTableFilter (tableFilter: Function): this {
    return this.setLayout({ tableFilter })
  }

  /**
   * @param {boolean} tableRequired
   * @returns {Schema}
   */
  fieldTableRequired (tableRequired: boolean): this {
    return this.setLayout({ tableRequired })
  }

  /**
   * @param {string} tableName
   * @returns {Schema}
   */
  fieldTableName (tableName: string): this {
    return this.setLayout({ tableName })
  }

  /**
   * @param {string} tableAlign
   * @returns {Schema}
   */
  fieldTableAlign (tableAlign: string): this {
    return this.setLayout({ tableAlign })
  }

  /**
   * @param {boolean} tableSortable
   * @returns {Schema}
   */
  fieldTableSortable (tableSortable: boolean): this {
    return this.setLayout({ tableSortable })
  }

  /**
   * @param {Function} tableFormat
   * @returns {Schema}
   */
  fieldTableFormat (tableFormat: Function): this {
    return this.setLayout({ tableFormat })
  }

  /**
   * @param {number} order
   * @param {boolean} updateOthers
   * @returns {Schema}
   */
  fieldTableOrder (order: number, updateOthers = false): this {
    this.setLayout({ tableOrder: order })
    if (updateOthers) {
      fieldsReorder(this.__fields, this.__currentField, 'tableOrder', order)
    }
    return this
  }
}
