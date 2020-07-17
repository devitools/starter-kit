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
   * @param {string} username
   * @param {string} password
   * @return {Promise<*>}
   */
  signIn (username, password) {
    return this.post('/v1/auth/sign-in', { username, password })
  }

  /**
   * @param {Object} form
   * @returns {Promise}
   */
  signUp (form) {
    return this.post('/v1/auth/sign-up', form)
  }

  /**
   * @returns {Promise}
   */
  refresh () {
    return this.get('/v1/auth/refresh')
  }
}
