import { QBtn } from 'quasar'
// app
import { POSITIONS } from '../../../../Agnostic/enum'
import { is } from '../../../../Util/general'
// components
import SkeletonSchemaForm from '../../SkeletonSchemaForm'
import SchemaDebugger from '../../Debugger/SchemaDebugger'
import SchemaFormValidationPanel from '../Components/SchemaFormValidationPanel'

/**
 * @mixin {SchemaFormRender}
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {function} h
     * @returns {VNode}
     */
    renderForm (h) {
      const data = {
        class: this.renderFormWrapperClassNames(),
        style: this.renderFormWrapperStyles()
      }
      const children = [
        this.renderFormBody(h),
        this.renderSchemaButtons(h, POSITIONS.POSITION_FORM_FOOTER, { record: this.record })
      ]

      return h('div', data, children)
    },
    /**
     * @param creator
     * @return {*}
     */
    renderFormValidationPanel (creator) {
      const domain = this.domain

      const errors = this.getErrors()

      const operations = {
        component: this,
        scope: this.scope,
        buttons: this.buttons,
        context: { record: this.record },
        position: POSITIONS.POSITION_FORM_VALIDATION
      }
      const attrs = { domain, errors, operations }
      const data = { attrs }
      return creator(SchemaFormValidationPanel, data)
    },
    /**
     * @param {function} h
     * @returns {VNode}
     */
    renderFormBody (h) {
      const slotScope = () => ({
        domain: this.domain,
        scope: this.scope,
        components: this.getComponents(''),
        record: this.record
      })

      if (this.$scopedSlots['form-body']) {
        // noinspection JSValidateTypes
        return this.$scopedSlots['form-body'](slotScope())
      }

      const data = {
        class: this.renderFormBodyClassNames(),
        style: this.renderFormBodyStyles()
      }

      const children = []
      if (this.settings?.noGroupPosition === undefined || this.settings?.noGroupPosition === 'before') {
        children.push(this.renderFormBodyComponents(h, this.getComponents()))
      }
      if (this.hasSections) {
        children.push(this.renderFormBodySections(h, this.grouping))
      }
      if (this.hasTabs) {
        children.push(this.renderFormBodyTabs(h, this.grouping))
      }
      if (this.settings?.noGroupPosition === 'after') {
        children.push(this.renderFormBodyComponents(h, this.getComponents()))
      }

      if (this.$scopedSlots['form-footer']) {
        children.push(this.$scopedSlots['form-footer'](slotScope()))
      }

      return h('div', data, children)
    },
    /**
     * @param {function} h
     */
    renderFormFiller (h) {
      const data = {
        class: 'SchemaForm__Filler'
      }
      const children = [
        h(QBtn, {
          attrs: { icon: 'code', flat: true, round: true, dense: true },
          on: { click: this.fillComponentsValue }
        })
      ]
      return h('div', data, children)
    },
    /**
     * @param {function} h
     */
    renderFormDebuggers (h) {
      const debugging = [
        h(SchemaDebugger, { attrs: { label: 'Validation', inspect: this.$v } }),
        h(SchemaDebugger, { attrs: { label: 'Record', inspect: this.record } }),
        h(SchemaDebugger, { attrs: { label: 'Components', inspect: this.components } }),
        h(SchemaDebugger, { attrs: { label: 'Buttons', inspect: this.buttons } })
      ]

      return h('div', debugging)
    },
    /**
     * @return {string}
     */
    renderFormGroupingClass () {
      if (this.hasSections) {
        return 'SchemaForm--with-sections'
      }
      if (this.hasTabs) {
        return 'SchemaForm--with-tabs'
      }
      return ''
    },
    /**
     * @return {string|Array|Object}
     */
    renderFormClassNames () {
      return ['SchemaForm', this.renderFormGroupingClass()]
    },
    /**
     * @return {string|Array|Object}
     */
    renderFormStyles () {
      return ''
    },
    /**
     * @return {Object}
     */
    renderFormAttributes () {
      return {}
    },
    /**
     * @return {string|Array|Object}
     */
    renderFormWrapperClassNames () {
      return 'app-form-wrapper'
    },
    /**
     * @return {string|Array|Object}
     */
    renderFormWrapperStyles () {
      return ''
    },
    /**
     * @return {string|Array|Object}
     */
    renderFormBodyClassNames () {
      return 'app-form-body'
    },
    /**
     * @return {string|Array|Object}
     */
    renderFormBodyStyles () {
      return ''
    },
    /**
     * @param {function} h
     * @return {VNode}
     */
    renderLoading (h) {
      if (this.$scopedSlots['loading']) {
        // noinspection JSValidateTypes
        return this.$scopedSlots['loading']({ scope: this.scope })
      }
      return h(SkeletonSchemaForm)
    }
  },
  /**
   * @param {function} creator
   */
  render (creator) {
    if ((!this.domain && this.settings?.showPlaceholderContent) || this.showPlaceholderContent) {
      return this.renderLoading(creator)
    }

    const data = {
      class: this.renderFormClassNames(),
      style: this.renderFormStyles(),
      attrs: this.renderFormAttributes()
    }
    const children = [
      this.renderFormValidationPanel(creator),
      this.renderForm(creator)
    ]

    if (this.filling) {
      children.push(this.renderFormFiller(creator))
    }

    if (this.debugging) {
      children.push(this.renderFormDebuggers(creator))
    }

    return creator('div', data, children)
  }
}
/**
 * template direto
 * template com .vue
 * render function
 */
