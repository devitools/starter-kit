import { $store } from 'src/store'

/**
 * @param {Object} to
 * @param {Object} from
 * @param {Function} next
 *
 * > It works better in beforeEach
 */
export const changeRoute = (to, from, next) => {
  $store.dispatch('app/setRoute', to.path)
  next()
}
