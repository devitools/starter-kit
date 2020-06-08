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
   * @returns {Promise}
   */
  login (username, password) {
    return this.post('/v1/auth/sign-in', { username, password })
  }

  /**
   * @param {Object} form
   * @returns {Promise}
   */
  register (form) {
    return this.post('/v1/auth/register', form)
  }

  /**
   * @returns {Promise}
   */
  refresh () {
    return this.get('/v1/auth/refresh')
  }
}
