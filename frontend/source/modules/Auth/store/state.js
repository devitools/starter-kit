/**
 * @type {Object}
 */
import { recover } from '@devitools/Util/storage'

export default {
  token: recover('token', window.$token),
  user: recover('user', undefined),
  remember: recover('remember', false)
}
