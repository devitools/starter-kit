import $emporium from '@devitools/emporium'
import { otherwise } from 'src/router'
import { dashboard } from 'routes/dashboard'

/**
 * @mixin {DashboardSession}
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {number} timeout
     */
    openDashboard (timeout = 2000) {
      if (this.setLoading) {
        this.setLoading(true)
      }

      let target = this.$route.query.current !== otherwise ? this.$route.query.current : undefined
      if (!target) {
        target = this.$route.query.toForbidden
      }
      if (!target) {
        target = this.$route.query.fromForbidden
      }
      if (!target) {
        target = dashboard
      }
      this.$browse(target)

      if (this.setLoading) {
        window.setTimeout(() => this.setLoading(false), timeout)
      }
    },
    /**
     * @param {string|Record<string, unknown>} target
     */
    async closeDashboard (target = otherwise) {
      if ($emporium.state.modified) {
        try {
          await this.$confirm('agnostic.modified')
          $emporium.commit('updateModified', false)
        } catch (e) {
          return
        }
      }
      this.$store
        .dispatch('auth/logout')
        .then(() => this.$memory.clear())
        .then(() => this.$browse(target))
    }
  }
}
