import { replacement } from '../../../Util/string'

export default {
  /**
   */
  computed: {
    /**
     * @returns {string}
     */
    empty () {
      const template = this.$lang('agnostic.components.array.empty')
      const replaces = {
        button: '<strong style="font-size: 1.4rem">+</strong>'
      }
      return replacement(template, replaces)
    }
  }
}
