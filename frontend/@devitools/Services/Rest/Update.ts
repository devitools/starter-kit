import Basic from './Basic'

import { $store } from 'src/store'

/**
 * @class {Rest}
 */
export default abstract class Update extends Basic {
  /**
   * @param {string | number | Record<string, unknown> | FormData} record
   * @param {Record<string, unknown>} config
   * @returns {Promise}
   */
  update (record: string | number | Record<string, unknown> | FormData, config: Record<string, unknown> = {}) {
    if ($store.getters['app/getOffline'] || this.offline) {
      return this.updateOffline(record)
    }
    const id = this.getId(record)
    const resource = this.getResource()
    const url = `${resource}/${id}`

    if (record instanceof FormData) {
      return this.post(url, record, config)
    }
    return this.patch(url, record, config)
  }

  /**
   * @param {string | number | Record<string, unknown> | FormData} record
   * @returns {Promise}
   */
  updateOffline (record: string | number | Record<string, unknown> | FormData) {
    const executor = (resolve: Function, reject: Function) => {
      const update = () => {
        const id = this.getId(record)
        const data = this.getOfflineRecord(id)
        if (!data) {
          reject({ type: 'notFound' })
          return
        }
        if (typeof record === 'object') {
          record = { ...data, ...record }
        } else {
          record = data
        }
        const response = this.setOfflineRecord(id, record)
        resolve(response)
      }
      window.setTimeout(update, 100)
    }
    return new Promise(executor)
  }

  /**
   * @param {string} id
   * @param {string | number | Record<string, unknown> | FormData} record
   * @returns {Object}
   * @private
   */
  setOfflineRecord (id: string, record: string | number | Record<string, unknown> | FormData) {
    if (!this.$store) {
      return undefined
    }
    // @ts-ignore
    this.$store.commit('updateRecord', record)
    return { data: { ticket: id } }
  }
}
