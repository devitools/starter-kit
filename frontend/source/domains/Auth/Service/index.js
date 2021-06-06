import AuthService from '@devitools/Services/Http'
import { $store } from 'src/store'

/**
 * @returns {Promise}
 */
export function me () {
  return AuthService.build().get('api/v1/auth/me')
    .then(({ data }) => data)
    .then((user) => $store.dispatch('auth/updateUser', user))
}
