import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import { $store } from 'src/store'

/**
 * @param Vue
 * @returns {*}
 */
export default ({ Vue }) => {
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  let ERROR_AGGREGATOR = {}

  Vue.config.errorHandler = function (err, vm) {
    ERROR_AGGREGATOR.componentName = vm.$options.name
    ERROR_AGGREGATOR.componentData = vm.$data
    ERROR_AGGREGATOR.componentContent = String(vm.$options.__file)
      .replace(/\//g, '.')
      .split('.')
    ERROR_AGGREGATOR.message = String(err)
  }

  // noinspection JSCheckFunctionSignatures
  Sentry.init({
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'Request failed with status code 401'
    ],
    dsn: process.env.VUE_APP_SENTRY_DSN,
    integrations: [new Integrations.Vue({ Vue, attachProps: true })],
    beforeSend (event) {
      event.extra = { ...event.extra, ...ERROR_AGGREGATOR, user: $store.getters['auth/getUser'] }
      ERROR_AGGREGATOR = {}
      return event
    }
  })

  /**
   */
  Object.defineProperty(Vue.prototype, '$error', {
    get () {
      return {
        notify (error) {
          Sentry.captureException(error)
        }
      }
    }
  })
}
