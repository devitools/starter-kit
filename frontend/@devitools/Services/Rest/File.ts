import Basic from './Basic'

/**
 * @class {File}
 */
export default abstract class File extends Basic {
  /**
   * @param {Record<string, unknown>} data
   * @param {Record<string, unknown>} config
   * @returns {Promise}
   */
  send (data: Record<string, unknown>, config: Record<string, unknown> = {}) {
    const file = data.blob as Blob
    const formData = new FormData()
    formData.append('file', file)
    return this.post('/statics/upload', formData, config)
  }

  /**
   * @param {string} name
   * @param {Record<string, unknown>} config
   * @returns {Promise}
   */
  receive (name: string, config: Record<string, unknown> = {}) {
    return this.get(`/statics/download/${name}`, config)
  }
}
