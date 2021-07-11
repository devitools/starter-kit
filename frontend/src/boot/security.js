import { $store } from 'src/store'

/**
 * @param {Vue} Vue
 */
export default ({ Vue }) => {
  /**
   */
  Object.defineProperty(Vue.prototype, '$can', {
    get () {
      return (namespace) => {
        const permissions = $store.getters['auth/getPermissions']
        if (!Array.isArray(permissions)) {
          return false
        }
        return permissions.includes(namespace)
      }
    }
  })
}
