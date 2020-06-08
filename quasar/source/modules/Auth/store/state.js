/**
 * @type {Object}
 */
import { read } from '@devitools/Util/storage'

export default {
  token: read('token'),
  user: read('user')
}
