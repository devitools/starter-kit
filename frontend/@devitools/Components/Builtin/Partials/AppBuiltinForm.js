import SchemaForm from '../../Schema/SchemaForm'
import {
  APP_BUILT_IN_DEFAULT_TABLE_HEIGHT,
  APP_BUILT_IN_FORM_HEIGHT_COMPENSATION
} from '../settings'

/**
 * @component {AppBuiltinForm}
 */
export default {
  /**
   */
  extends: SchemaForm,
  /**
   */
  name: 'AppBuiltinForm',
  /**
   */
  props: {
    height: {
      type: String,
      default: APP_BUILT_IN_DEFAULT_TABLE_HEIGHT
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  /**
   */
  methods: {
    /**
     * @return {string|Array|Object}
     */
    renderFormClassNames () {
      return ['SchemaForm', 'AppBuiltinForm', this.renderFormGroupingClass()]
    },
    /**
     * @return {string|Array|Object}
     */
    renderFormWrapperClassNames () {
      return 'AppBuiltinForm__wrapper'
    },
    /**
     * @return {string|Array|Object}
     */
    renderFormBodyClassNames () {
      return 'AppBuiltinForm__body'
    }
  },
  watch: {
    value (value) {
      this.record = value
      this.showPlaceholderContent = false
    },
    readonly: {
      immediate: true,
      handler (readonly) {
        this.useFormReadonly = readonly
      }
    }
  }
}
