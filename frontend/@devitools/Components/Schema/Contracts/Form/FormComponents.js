import { is } from '../../../../Util/general'
import FormComponent from './FormComponent'
import filler from 'src/settings/filler'

/**
 * @mixin {FormComponents}
 */
export default {
  /**
   */
  mixins: [
    FormComponent
  ],
  /**
   */
  computed: {
    /**
     * @returns {boolean}
     */
    hasSections () {
      return is(this.grouping) && this.groupType === 'sections'
    },
    /**
     * @returns {boolean}
     */
    hasTabs () {
      return is(this.grouping) && this.groupType === 'tabs'
    }
  },
  /**
   */
  methods: {
    /**
     */
    configure () {
      const configure = (key) => {
        const field = this.components[key]
        if (field.$configure && typeof field.$configure === 'function') {
          const configured = field.$configure.call(this, field, this.scope)
          if (!configured || configured.$key !== this.components[key].$key) {
            throw Error('The return of configure must be the self field')
          }
          this.components[key] = configured
        }
      }
      Object.keys(this.components).forEach(configure)
    },
    /**
     */
    renderGroups () {
      this.grouping = this.groups()
    },
    /**
     */
    renderComponents () {
      this.components = this.performRenderComponents(this.fields())
      if (typeof this.overrides?.fields !== 'function') {
        return
      }
      this.overrides.fields(this.components)
    },
    /**
     * @param {Object} fields
     */
    performRenderComponents (fields) {
      return Object.values(fields)
        .map((field) => this.mapComponents(field))
        .sort((a, b) => this.sortComponents(a, b))
        .reduce((components, field) => this.reduceComponents(components, field), {})
    },
    /**
     */
    reloadComponents () {
      this.components = this.performRenderComponents(this.components)
    },
    /**
     * @param {Field} field
     */
    mapComponents (field) {
      if (!field.$created) {
        return field
      }
      field.$created.forEach((created) => {
        if (created.scope !== this.scope) {
          return
        }
        this.$util.set(field, created.path, created.value)
      })
      return field
    },
    /**
     * @param {Object} a
     * @param {Object} b
     * @returns {number}
     */
    sortComponents (a, b) {
      if (a.$layout.formOrder < b.$layout.formOrder) {
        return -1
      }
      if (a.$layout.formOrder > b.$layout.formOrder) {
        return 1
      }
      return 0
    },
    /**
     * @param {*} components
     * @param {Object} field
     * @returns {*}
     */
    reduceComponents (components, field) {
      const hasScopes = field.scopes && Array.isArray(field.scopes)
      if (this.scope && hasScopes && !field.scopes.includes(this.scope)) {
        return components
      }

      if (field.hasOwnProperty('$visible') && !field.$visible.call(this)) {
        return components
      }

      components[field.$key] = this.parseField(field)

      return components
    },
    /**
     * @param {string} group
     */
    getComponents (group = undefined) {
      if (group === undefined) {
        const reduce = (accumulator, key) => {
          const field = this.components[key]
          if (!field.group || this.groupType === 'none') {
            accumulator[key] = field
          }
          return accumulator
        }
        return Object.keys(this.components).reduce(reduce, {})
      }

      const reduce = (accumulator, key) => {
        const field = this.components[key]
        if (field.group === group || group === '') {
          accumulator[key] = field
        }
        return accumulator
      }
      return Object.keys(this.components).reduce(reduce, {})
    },
    /**
     * @param {string} $key
     * @param {string} listener
     * @param {*} $event
     * @param {Array} parameters
     */
    fieldApplyListener ($key, listener, $event, parameters) {
      if (!Array.isArray(this.components[$key].on[listener])) {
        throw Error(`The event '${listener}' is not an array`)
      }
      this.components[$key].on[listener].forEach((callable) => {
        callable.call(this, { $event, field: this.components[$key], parameters })
      })
    },
    /**
     * @param {Object} $event
     * @param {Object} field
     * @param {Object} action
     * @param {Boolean} stop
     * @param {Object} parameters
     */
    fieldApplyAction ($event, field, action, stop = false, parameters = {}) {
      if (stop && $event && $event.stopPropagation) {
        $event.preventDefault()
        $event.stopPropagation()
      }
      if (typeof action !== 'object') {
        return
      }
      if (typeof action.original !== 'function') {
        return
      }
      action.original.call(this, { $event, field, ...parameters })
    },
    /**
     */
    fillComponentsValue () {
      return Object.entries(this.components).forEach((entry) => {
        const [key, field] = entry

        const value = filler.call(this, field, this.record[key])
        if (value === undefined) {
          return
        }
        this.record[key] = value
      })
    }
  }
}
