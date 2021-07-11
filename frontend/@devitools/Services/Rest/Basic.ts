import { primaryKey } from 'src/settings/schema'

import Http from '../Http'

import { is } from '../../Util/general'
import { replacement } from '../../Util/string'

/**
 * @class {Basic}
 */
export default abstract class Basic extends Http {
  /**
   * @type {string}
   */
  path = '/api/v1'

  /**
   * @type {string}
   */
  resource = '/please/override/resource'

  /**
   * @type {string}
   */
  primaryKey = primaryKey

  /**
   * @type {number}
   */
  size = 10

  /**
   * @type {Object}
   */
  __resourceParams = {}

  /**
   * @type {Object}
   */
  $store = {}

  /**
   * @type {Array}
   */
  filterable = []

  /**
   * @param {Record<string, unknown>} resourceParams
   * @param {boolean} override
   * @returns {this}
   */
  resourceParams (resourceParams: Record<string, unknown>, override = true) {
    if (!override && is(this.__resourceParams)) {
      return this
    }
    this.__resourceParams = resourceParams
    return this
  }

  /**
   * @returns {string}
   */
  getResource () {
    if (is(this.__resourceParams)) {
      return replacement(this.resource, this.__resourceParams)
    }
    return this.resource
  }

  /**
   * @param {record: string | number | Record<string, unknown> | FormData} record
   * @returns {string}
   */
  getId (record: string | number | Record<string, unknown> | FormData): string {
    if (typeof record === 'string' || typeof record === 'number') {
      return String(record)
    }
    if (record instanceof FormData) {
      return String(record.get(this.primaryKey))
    }
    return String(record[this.primaryKey])
  }

  /**
   * @returns {Array}
   * @private
   */
  getOfflineRecords () {
    if (!this.$store) {
      return []
    }
    // @ts-ignore
    if (!Array.isArray(this.$store.state.records)) {
      return []
    }
    // @ts-ignore
    return this.$store.state.records
  }

  /**
   * @param id
   * @returns {Object}
   * @private
   */
  getOfflineRecord (id: string) {
    const records = this.getOfflineRecords()
    return records.find((record: Record<string, unknown>) => record[this.primaryKey] === id)
  }

  /**
   * @param {string} primaryKey
   * @return {this}
   */
  setPrimaryKey (primaryKey: string): this {
    this.primaryKey = primaryKey
    return this
  }
}
