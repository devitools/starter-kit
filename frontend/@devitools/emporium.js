import $store from './Util/store'
import { read, write } from './Util/storage'

/**
 * @type {*}
 */
const $emporium = $store({
  // the states of store
  state: {
    debugging: read('debugging', true) || false,
    filling: read('filling', true) || false,
    profiling: read('profiling', true) || false,
    purging: read('purging', true) || false,
    modified: false,
    modal: {},
    pending: '',
    printing: undefined,
    version: window.localStorage.getItem('version') ?? ''
  },
  // the mutations to call with commit
  // ex.: $store.commit('updateVersion')
  mutations: {
    /**
     * @param {Object} state
     * @param {string} debugging
     */
    updateDebugging (state, debugging) {
      state.debugging = debugging
      write('debugging', debugging, true)
    },
    /**
     * @param {Object} state
     * @param {string} purging
     */
    updateFilling (state, purging) {
      state.filling = purging
      write('filling', purging, true)
    },
    /**
     * @param {Object} state
     * @param {string} purging
     */
    updateProfiling (state, purging) {
      state.profiling = purging
      write('profiling', purging, true)
    },
    /**
     * @param {Object} state
     * @param {string} purging
     */
    updatePurging (state, purging) {
      state.purging = purging
      write('purging', purging, true)
    },
    /**
     * @param {Object} state
     * @param {boolean} modified
     */
    updateModified (state, modified) {
      if (modified === false && state.modified !== '') {
        state.modified = ''
      }
      state.modified = modified
    },
    /**
     * @param {Object} state
     * @param {Record<string,unknown>} modal
     */
    updateModal (state, modal) {
      state.modal = modal
    },
    /**
     * @param {Object} state
     * @param {string} pending
     */
    updatePending (state, pending) {
      if (pending !== '' && state.modified === false) {
        state.modified = true
      }
      state.pending = pending
    },
    /**
     * @param {Object} state
     * @param {Object} printing
     */
    updatePrinting (state, printing) {
      state.printing = printing
    },
    /**
     * @param {Object} state
     * @param {string} version
     */
    updateVersion (state, version) {
      state.version = version
      window.localStorage.setItem('version', version)
    }
  }
})

export default $emporium
