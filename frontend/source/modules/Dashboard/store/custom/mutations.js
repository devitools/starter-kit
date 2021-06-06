import { erase, write } from '@devitools/Util/storage'

/**
 * @param {Object} state
 * @param {string} unit
 */
export const mutateUnit = (state, unit) => {
  state.unit = unit
  if (unit) {
    write('unit', unit)
    return
  }
  erase('unit')
}
