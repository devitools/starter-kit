import SchemaTableAsync from '../../Components/Schema/SchemaTableAsync'
import SchemaFormAsync from '../../Components/Schema/SchemaFormAsync'
import SkeletonSchemaTable from '../../Components/Schema/SkeletonSchemaTable'
import SkeletonSchemaForm from '../../Components/Schema/SkeletonSchemaForm'

/**
 * @param {Schema} schema
 * @param {Record<string, unknown>} dependencies
 * @return {{SchemaTableAsync: Function}}
 */
export function table (schema, dependencies = {}) {
  return {
    SchemaTableAsync () {
      return {
        // The component to load (should be a Promise)
        component: new Promise(function (resolve) {
          const handler = () => {
            const provide = schema.build(undefined, dependencies).provide()
            resolve({
              extends: SchemaTableAsync,
              createdHook () {
                this.configureProvide(provide)
              }
            })
          }
          window.setTimeout(handler, 10)
        }),
        // A component to use while the async component is loading
        loading: SkeletonSchemaTable,
        // A component to use if the load fails
        // error: ErrorComponent,
        // Delay before showing the loading component. Default: 200ms.
        delay: 0,
        // The error component will be displayed if a timeout is
        // provided and exceeded. Default: Infinity.
        timeout: 3000
      }
    }
  }
}

/**
 * @param {Schema} schema
 * @param {Record<string, unknown>} dependencies
 * @return {{SchemaFormAsync: Function}}
 */
export function form (schema, dependencies = {}) {
  return {
    SchemaFormAsync () {
      return {
        // The component to load (should be a Promise)
        component: new Promise(function (resolve) {
          const handler = () => {
            const provide = schema.build(undefined, dependencies).provide()
            resolve({
              extends: SchemaFormAsync,
              createdHook () {
                this.configureProvide(provide)
              }
            })
          }
          window.setTimeout(handler, 10)
        }),
        // A component to use while the async component is loading
        loading: SkeletonSchemaForm,
        // A component to use if the load fails
        // error: ErrorComponent,
        // Delay before showing the loading component. Default: 200ms.
        delay: 0,
        // The error component will be displayed if a timeout is
        // provided and exceeded. Default: Infinity.
        timeout: 3000
      }
    }
  }
}

/**
 * @mixin {View}
 */
export default {
  /**
   */
  props: {
    path: {
      type: String,
      default: undefined
    }
  },
  /**
   */
  components: {
    /**
     * SchemaTable async component
     */
    SchemaTableAsync (resolve) {
      resolve({
        extends: SchemaTableAsync,
        createdHook () {
          const provide = this.$parent.$options.schema.build(this).provide()
          this.configureProvide(provide)
        }
      })
    },
    /**
     * SchemaForm async component
     */
    SchemaFormAsync (resolve) {
      resolve({
        extends: SchemaFormAsync,
        createdHook () {
          const provide = this.$parent.$options.schema.build(this).provide()
          this.configureProvide(provide)
        }
      })
    }
  },
  /**
   */
  data () {
    return {
      bind: {
        scope: this.$route.meta.scope,
        path: this.path
      }
    }
  }
}
