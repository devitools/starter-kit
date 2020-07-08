import $emporium from '@devitools/emporium'
import { confirm } from '@devitools/dialog'

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

/**
 * @param {Object} to
 * @param {Object} from
 * @param {Function} next
 *
 * > It works better in beforeEach
 */
export const checkModified = async (to, from, next) => {
  if (!$emporium.state.modified) {
    next()
    return
  }
  try {
    const ok = await confirm('agnostic.modified')
    if (!ok) {
      return
    }
  } catch (e) {
    return
  }
  $emporium.commit('updateModified', false)
  next()
}

/**
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 *
 * > It works better in beforeEach
 */
export const updateTransition = (to, from, next) => {
  if (to.path === from.path) {
    $store.dispatch('dashboard/setTransition', '').then(next)
    return
  }
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  const transitionName = (toDepth < fromDepth) ? 'slide-right' : 'slide-left'

  $store.dispatch('dashboard/setTransition', transitionName).then(next)
}
