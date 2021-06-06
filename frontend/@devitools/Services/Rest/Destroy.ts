import Basic from './Basic'

import { $store } from 'src/store'

/**
 * @class {Rest}
 */
export default abstract class Destroy extends Basic {
  /**
   * @param {Record<string, unknown>} record
   * @param {Record<string, unknown>} config
   * @returns {Promise<unknown>}
   */
  destroy (record: string | number | Record<string, unknown> | FormData, config: Record<string, unknown> = {}) {
    if ($store.getters['app/getOffline'] || this.offline) {
      return new Promise((resolve, reject) => {
        reject('Unsupported action create')
      })
    }
    const { erase } = config
    const _erase = erase ? '/erase' : ''
    const url = `${this.getResource()}/${this.getId(record)}${_erase}`
    return this.delete(url, config)
  }

  /**
   * @param {record: string | number | Record<string, unknown> | FormData} record
   * @param {Record<string, unknown>} config
   * @returns {Promise}
   */
  restore (record: string | number | Record<string, unknown> | FormData, config: Record<string, unknown> = {}) {
    const url = `${this.getResource()}/${this.getId(record)}/restore`
    return this.put(url, undefined, config)
  }

  /**
   * @param {string[]} records
   * @param {Object} config
   * @returns {Promise}
   */
  remove (records: string[], config: Record<string, unknown> = {}) {
    const callback = (record: string) => this.getId(record)
    const remove = records.map(callback).join(',')
    const { erase } = config
    const _erase = erase ? '/erase' : ''
    if (records.length === 1) {
      return this.delete(`${this.getResource()}/${remove}${_erase}`)
    }
    return this.delete(`${this.getResource()}/[${remove}]${_erase}`)
  }
}
