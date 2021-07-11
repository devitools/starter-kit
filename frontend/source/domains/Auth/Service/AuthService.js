import Http from '@devitools/Services/Http'

/**
 * @type {AuthService}
 */
export default class AuthService extends Http {
  /**
   * @type {string}
   */
  path = '/api'

  /**
   * @param {Record<string,unknown>} form
   * @return {Promise<*>}
   */
  signIn (form) {
    return this.post('/v1/auth/sign-in', form)
  }

  /**
   * @return {Promise<*>}
   */
  me () {
    return this.get('api/v1/auth/me')
  }

  /**
   * @param {Object} form
   * @returns {Promise}
   */
  signUp (form) {
    return this.post('/v1/auth/sign-up', form)
  }

  /**
   * @param {Record<string,unknown>} data
   * @returns {Promise}
   */
  recover (data) {
    return this.post('/v1/auth/recover', data)
  }

  /**
   * @param {Record<string,unknown>} data
   * @returns {Promise}
   */
  change (data) {
    return this.post('/v1/auth/change', data)
  }
}
