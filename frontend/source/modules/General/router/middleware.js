import $emporium from '@devitools/emporium'
import { confirm } from '@devitools/dialog'

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
