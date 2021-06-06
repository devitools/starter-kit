import Basic from './Basic'

import { $store } from 'src/store'
import { parseRestRecord } from 'src/settings/rest'

/**
 * @class {Rest}
 */
export default abstract class Read extends Basic {
  /**
   * @param {string | number | Record<string, unknown> | FormData} record
   * @param {boolean} trash
   * @param {Record<string, unknown>} config
   * @returns {Promise}
   */
  read (record: string | number | Record<string, unknown> | FormData, trash = false, config: Record<string, unknown> = {}) {
    let queryString = ''
    if (trash) {
      queryString = '?trash=true'
    }

    if ($store.getters['app/getOffline'] || this.offline) {
      return this.readOffline(record, trash)
    }
    const url = `${this.getResource()}/${this.getId(record)}${queryString}`
    // @ts-ignore
    const parse = parseRestRecord()
    return this
      .get(url, config)
      .then((response) => parse(response))
  }

  /**
   * @param {string | number | Record<string, unknown> | FormData} record
   * @param {boolean} trash
   * @returns {Promise}
   */
  readOffline (record: string | number | Record<string, unknown> | FormData, trash = false) {
    const executor = (resolve: Function) => {
      const read = () => {
        const id = this.getId(record)
        const data = this.getOfflineRecord(id)
        const response = { data }
        resolve(response)
      }
      window.setTimeout(read, 100)
    }
    return new Promise(executor)
  }
}
