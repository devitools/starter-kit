import $emporium from '../emporium'

/**
 * @type {{}}
 */
const performance = {}

/**
 */
export default {
  start (reference) {
    if (!$emporium.state.profiling) {
      return
    }
    performance[reference] = window.performance.now()
  },
  end (reference) {
    if (!$emporium.state.profiling) {
      return
    }
    const t1 = window.performance.now()
    const t0 = performance[reference]
    console.warn(`[${reference}] ${Math.round(t1 - t0)}ms`)
  }
}
