import './polyfill'

import validation from 'vuelidate'

import $emporium from './emporium'

import * as messages from './message'

import $lang from './Lang'
import * as components from './Components'
import util from './Util'

import { browse as $browse } from './Util/general'

import $clipboard from './Plugins/$clipboard'
import $memory from './Plugins/$memory'
import $performance from './Plugins/$performance'

/**
 * @param {Vue} Vue
 */
export default ({ Vue }) => {
  // install general colors
  window.chartColors = {
    red: 'rgba(252, 106, 137, 0.8)',
    orange: 'rgb(255, 159, 64, 0.8)',
    yellow: 'rgb(255, 205, 86, 0.8)',
    green: 'rgb(75, 192, 192, 0.8)',
    blue: 'rgb(54, 162, 235, 0.8)',
    purple: 'rgb(153, 102, 255, 0.8)',
    grey: 'rgb(201, 203, 206, 0.8)'
  }

  /**
   */
  Vue.use(validation)

  /**
   */
  Object.keys(components).forEach((key) => {
    // eslint-disable-next-line import/namespace
    Vue.component(key, components[key])
  })

  /**
   */
  Object.defineProperty(Vue.prototype, '$lang', {
    get () {
      /**
       * @param {string|array} path
       * @param {string} fallback
       * @returns {*}
       */
      return (path, fallback = '') => {
        if (typeof path === 'string') {
          fallback = path
          path = [path, `domains.${this.domain}.${path}`]
        }
        return $lang(path, fallback)
      }
    }
  })

  /**
   */
  Object.defineProperty(Vue.prototype, '$browse', {
    get () {
      return $browse
    }
  })

  /**
   */
  Object.defineProperty(Vue.prototype, '$dev', {
    get () {
      return process.env.VUE_APP_DEVI_TOOLS === 'true'
    }
  })

  /**
   */
  Object.defineProperty(Vue.prototype, '$log', {
    get () {
      return process.env.NODE_ENV !== 'production' ? console.log : () => undefined
    }
  })

  /**
   */
  Object.defineProperty(Vue.prototype, '$memory', {
    get () {
      return $memory
    }
  })

  /**
   */
  Object.defineProperty(Vue.prototype, '$clipboard', {
    get () {
      return $clipboard
    }
  })

  /**
   */
  Object.defineProperty(Vue.prototype, '$service', {
    get () {
      if (this.$options && this.$options.service) {
        return this.$options.service
      }
      if (this.service) {
        return this.service
      }
      throw new Error('The component doesn\'t have a service')
    }
  })

  /**
   */
  Object.defineProperty(Vue.prototype, '$message', {
    get () {
      return messages
    }
  })

  /**
   */
  Object.defineProperty(Vue.prototype, '$util', {
    get () {
      const base = util(this)
      if (this.$options && this.$options.util) {
        return Object.assign({}, base, this.$options.util)
      }
      if (this.$props && this.$props.util) {
        return Object.assign({}, base, this.$props.util)
      }
      return base
    }
  })

  /**
   */
  Object.defineProperty(Vue.prototype, '$user', {
    get () {
      return (property = '') => {
        if (!property) {
          return this.$store.getters['auth/getUser']
        }
        return this.$util.get(this.$store.getters['auth/getUser'], property)
      }
    }
  })

  /**
   */
  Object.defineProperty(Vue.prototype, '$performance', {
    get () {
      return $performance
    }
  })

  /**
   */
  Object.defineProperty(Vue.prototype, '$dialog', {
    get () {
      return {
        show: (component, modal, props = {}, container = {}, dialog = {}) => {
          const config = {
            visible: true,
            component: component,
            props: {
              ...props,
              modal
            },
            container: {
              style: {
                width: '1280px',
                'max-width': '92vw'
              },
              ...container
            },
            dialog: dialog
          }
          $emporium.commit('updateModal', config)
        },
        hide: () => {
          $emporium.commit('updateModal', {
            visible: false,
            component: undefined,
            props: {},
            container: {},
            dialog: {}
          })
        }
      }
    }
  })
}
