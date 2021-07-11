import Basic from '@devitools/Services/Rest/Basic'

import { resource } from '../settings'

/**
 * @type {MyAccountService}
 */
export default class MyAccountService extends Basic {
  /**
   * @type {String}
   */
  resource = resource

  /**
   * @param {string | number | Record<string, unknown> | FormData} record
   * @param {Record<string, unknown>} config
   * @returns {Promise}
   */
  update (record: string | number | Record<string, unknown> | FormData, config: Record<string, unknown> = {}) {
    const url = this.getResource()

    if (record instanceof FormData) {
      return this.post(url, record, config)
    }
    return this.patch(url, record, config)
  }
}
