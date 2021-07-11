/**
 * @typedef {Object} Hook
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {string} hook
     * @param {Object} context
     */
    triggerHook (hook, context = {}) {
      const hooks = this.hooks()

      if (!hooks) {
        return
      }
      if (!hooks[hook]) {
        return
      }
      const action = hooks[hook]
      if (typeof action !== 'function') {
        return
      }

      return action.call(this, context)
    },
    /**
     * @param {string} hook
     */
    triggerOption (hook) {
      if (!this.$options) {
        return
      }
      if (!this.$options[hook]) {
        return
      }
      const action = this.$options[hook]
      if (typeof action !== 'function') {
        return
      }

      return action.call(this)
    }
  },
  beforeCreate () {
    this.$performance.start(this.$parent.$options.name)
  },
  /**
   */
  created () {
    this.$performance.start(`${this.$parent.$options.name}:initialize`)
    this.triggerOption('createdHook')
    this.triggerHook('created:default')
    this.triggerHook('created')
    this.$performance.end(`${this.$parent.$options.name}:initialize`)
  },
  /**
   */
  mounted () {
    this.triggerOption('mountedHook')
    this.triggerHook('mounted:default')
    this.triggerHook('mounted')
    this.$performance.end(this.$parent.$options.name)
  },
  /**
   */
  beforeMount () {
    this.triggerOption('beforeMountHook')
    this.triggerHook('beforeMount:default')
    this.triggerHook('beforeMount')
  },
  /**
   */
  beforeDestroy () {
    this.triggerOption('beforeDestroyHook')
    this.triggerHook('beforeDestroy:default')
    this.triggerHook('beforeDestroy')
  },
  /**
   */
  destroyed () {
    this.triggerOption('destroyedHook')
    this.triggerHook('destroyed:default')
    this.triggerHook('destroyed')
  }
}
