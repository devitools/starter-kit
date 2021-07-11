import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'
import { $store } from 'src/store'

/**
 * @param Vue
 * @returns {*}
 */
export default ({ Vue }) => {
  if (!process.env.VUE_APP_SENTRY_DSN) {
    return
  }

  let error = {}
  Vue.config.errorHandler = function (err, vm) {
    const name = vm.$options.name
    const data = vm.$data
    const content = String(vm.$options.__file)
      .replace(/\//g, '.')
      .split('.')
    error.component = { name, data, content }
    error.message = String(err)
  }

  // noinspection JSCheckFunctionSignatures
  Sentry.init({
    Vue,
    tracingOptions: {
      trackComponents: true
    },
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'Request failed with status code 401'
    ],
    dsn: process.env.VUE_APP_SENTRY_DSN,
    // release: '',
    integrations: [
      new Integrations.BrowserTracing()
    ],
    tracesSampleRate: 1.0,
    beforeSend (event) {
      event.extra = {
        ...event.extra,
        ...error,
        user: $store.getters['auth/getUser']
      }
      error = {}
      return event
    }
  })
}
