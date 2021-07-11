import { route } from 'quasar/wrappers'
import AppRouter from '@devitools/Routing/AppRouter'
import { Store } from 'vuex'
import { StateInterface } from '../store'

import updateTitle from 'src/router/middleware/updateTitle'
import updateDevice from 'src/router/middleware/updateDevice'

import authRouteFile from 'routes/auth'
import dashboardRouteFile from 'routes/dashboard'

/**
 * expose the router
 * use import { storing as $router } from 'src/router'
 */
export let $router: AppRouter

/**
 * @type {string}
 */
export const otherwise = '/'

/**
 * @type {string}
 */
export const forbidden = '/forbidden'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route<Store<StateInterface>>(function ({ Vue }) {
  Vue.use(AppRouter)

  const options = {
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: [],

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  }
  // create router
  $router = new AppRouter(options)

  // update device info
  $router.beforeEach(updateDevice)
  // just a simple middleware
  $router.afterEach(updateTitle)

  authRouteFile($router)
  dashboardRouteFile($router)

  const errorForbidden = () => import('resources/views/Error403.vue')
  const errorNotFound = () => import('resources/views/Error404.vue')

  $router.route(forbidden, errorForbidden, { name: '403', public: true })
  if (process.env.MODE !== 'ssr') {
    $router.route('*', errorNotFound, { name: '404', public: true })
  }

  return $router
})
