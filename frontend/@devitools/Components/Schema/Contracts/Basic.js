import $emporium from '../../../emporium'

import Trigger from './Hook'
import Button from './Button'
import Dialog from './Dialog'
import Field from './Field'
import Action from './Action'
import Operation from './Operation'
import SchemaButtons from '../Buttons/SchemaButtons'

/**
 * @typedef {Object} Basic
 */
export default {
  /**
   */
  mixins: [
    Trigger, Button, Dialog, Field, Action, Operation
  ],
  /**
   */
  props: {
    scope: {
      type: String,
      required: true
    },
    modal: {
      type: Object,
      default: () => undefined
    },
    overrides: {
      type: Object,
      default: () => ({
        fields: () => undefined,
        actions: () => undefined
      })
    }
  },
  /**
   * @returns {Object}
   */
  data: () => ({
    customActionPath: undefined,
    payload: {}
  }),
  /**
   */
  computed: {
    /**
     */
    debugging () {
      return this.debuggerAllowed && !this.builtin && $emporium.state.debugging
    },
    /**
     */
    filling () {
      return this.fillerAllowed && !this.builtin && $emporium.state.filling
    }
  },
  /**
   */
  methods: {
    /**
     * @override
     */
    initialize () {
      // will override by specialists
    },
    /**
     * @param {Provide} provide
     */
    configureProvide (provide) {
      this.settings = provide.settings || {}
      this.domain = provide.domain
      this.groupType = provide.groupType
      this.displayKey = provide.displayKey
      this.primaryKey = provide.primaryKey
      this.groups = provide.groups
      this.fields = provide.fields
      this.actions = provide.actions
      this.hooks = provide.hooks
      this.watches = provide.watches
    },
    /**
     * @param {function} h
     * @param {string} position
     * @param {Object} context
     * @param {Object} override
     * @param {string} type
     * @returns {*}
     */
    renderSchemaButtons (h, position, context, override = {}, type = 'default') {
      const attrs = {
        component: this,
        type: type,
        scope: this.scope,
        locked: this.locked,
        buttons: this.buttons,
        context: context,
        position: position,
        override: override
      }
      const data = {
        attrs
      }
      return h(SchemaButtons, data)
    },
    /**
     * @param {function} h
     * @param {string} position
     * @param {Object} context
     * @param {Object} extra
     * @returns {*}
     */
    renderSchemaButtonsCompact (h, position, context, extra = { textColor: 'blue-grey-10' }) {
      const override = { ...extra, dense: true, label: '', flat: true }
      return this.renderSchemaButtons(h, position, context, override)
    },
    /**
     * @param {function} h
     * @param {string} position
     * @param {Object} context
     * @returns {*}
     */
    renderSchemaButtonsFabInline (h, position, context) {
      const override = { dense: true, label: '' }
      return this.renderSchemaButtons(h, position, context, override, 'fab-cell')
    },
    /**
     * @param {Object} field
     */
    generateComponentRef (field) {
      return `form:component-${field.$key}`
    },
    /**
     * @param {string} $key
     * @returns {*}
     */
    getComponent ($key) {
      return new Promise((resolve, reject) => {
        let component = this.findComponentByRef(`form:component-${$key}`)
        if (!component) {
          reject()
          return
        }
        if (Array.isArray(component) && component[0]) {
          component = component[0]
        }
        resolve(component)
      })
    },
    /**
     * @param {string} ref
     * @returns {*}
     */
    getComponentByRef (ref) {
      const component = this.findComponentByRef(ref)
      if (!component) {
        return null
      }
      if (Array.isArray(component) && component[0]) {
        return component[0]
      }
      return component
    },
    /**
     * @param {string} ref
     * @return {Vue | Element | Vue[] | Element[] | undefined}
     */
    findComponentByRef (ref) {
      const reduce = (accumulator, formBody) => {
        if (accumulator) {
          return accumulator
        }
        if (!formBody) {
          return accumulator
        }
        if (formBody.$refs[ref]) {
          accumulator = formBody.$refs[ref]
        }
        return accumulator
      }
      return Object.values(this.$refs).reduce(reduce, undefined)
    },
    /**
     * @returns {*}
     */
    getActionPath () {
      return this.customActionPath || this.path
    },
    /**
     */
    renderWatches () {
      // get the watches from provided watches
      const entries = Object.entries(this.watches())
      // walk on entries
      for (const entry of entries) {
        // get the key and watches from entry
        const [key, watches] = entry
        // walk on watches
        for (const watch of watches) {
          // get the props that they have
          const { handler, options } = watch
          // get the options
          const { immediate, deep } = options
          // register the watch
          this.$watch(key, handler.bind(this), { immediate, deep })
        }
      }
    },
    /**
     * @param {function(components: Record<string, unknown>)} callback
     */
    configureComponents (callback) {
      callback(this.components)
    }
  }
}
