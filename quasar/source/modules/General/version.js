import $store from '@devitools/Util/store'

/**
 * @type {*}
 */
const store = $store({
  // the states of store
  state: {
    version: window.localStorage.getItem('version')
  },
  // the mutations to call with commit
  // ex.: $store.commit('updateVersion')
  mutations: {
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

export default store
