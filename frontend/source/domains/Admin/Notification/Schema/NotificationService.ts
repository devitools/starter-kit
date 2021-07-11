import Rest from '@devitools/Services/Rest'
import { resource } from '../settings'

/**
 * @type { NotificationService }
 */
export default class NotificationService extends Rest {
  /**
   * @type {String}
   */
  resource = resource

  /**
   * @param {number|string} id
   *
   * @return {Promise<unknown>}
   */
  markAsRead (id: number | string) {
    const resource = this.getResource()
    return this.patch(`${resource}/${id}/mark-as-read`)
  }
}
