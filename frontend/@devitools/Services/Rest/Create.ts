import Basic from './Basic'

import { $store } from 'src/store'

/**
 * @class {Rest}
 */
export default abstract class Create extends Basic {
  /**
   * @param {string | number | Record<string, unknown> | FormData} record
   * @param {Record<string, unknown>} config
   * @returns {Promise}
   */
  create (record: string | number | Record<string, unknown> | FormData, config: Record<string, unknown> = {}) {
    if ($store.getters['app/getOffline'] || this.offline) {
      return new Promise((resolve, reject) => {
        reject('Unsupported action create')
      })
    }
    return this.post(this.getResource(), record, config)
  }
}
