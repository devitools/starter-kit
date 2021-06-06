import { store } from 'quasar/wrappers'
import Vuex, { Store } from 'vuex'

import app from './app'
import auth from 'source/modules/Auth/store'
import dashboard from 'source/modules/Dashboard/store'

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  app: Record<string, unknown>,
  auth: Record<string, unknown>,
  dashboard: Record<string, unknown>
}

/**
 * expose the store
 * use import { $store } from 'src/store'
 */
export let $store: Store<StateInterface>

export default store(function ({ Vue }) {
  Vue.use(Vuex)

  $store = new Vuex.Store<StateInterface>({
    modules: {
      app,
      auth,
      dashboard
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEBUGGING
  })

  return $store
})
