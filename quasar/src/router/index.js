import Vue from 'vue'
import AppRouter from '@devitools/Routing/AppRouter'

import updateTitle from 'src/router/middleware/updateTitle'
import updateDevice from 'src/router/middleware/updateDevice'

import authRouteFile from 'routes/auth'
import dashboardRouteFile from 'routes/dashboard'

Vue.use(AppRouter)

/**
 * expose the router
 * use import { $router } from 'src/router'
 */
export let $router

/**
 * @type {string}
 */
export const otherwise = '/'

/**
 * @type {string}
 */
export const forbidden = '/forbidden'

/**
 * @returns {AppRouter}
 */
export default function (/* { store, ssrContext } */) {
  // the router options
  const options = {
    routes: [],
    scrollBehavior: () => ({ x: 0, y: 0 }),
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

  // inject router on auth module
  authRouteFile($router)
  // inject router on dashboard module
  dashboardRouteFile($router)

  $router.route(forbidden, () => import('resources/views/Error403.vue'), { name: '403', public: true })
  if (process.env.MODE !== 'ssr') {
    $router.route('*', () => import('resources/views/Error404.vue'), { name: '404', public: true })
  }

  return $router
}
