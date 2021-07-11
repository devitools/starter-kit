<template>
  <QList
    bordered
    separator
  >
    <template v-for="entry in entries">
      <DashboardDrawerEntry
        :key="entry.uuid"
        :entry="entry"
        @popup="openPopup"
      />
    </template>
  </QList>
</template>

<script>
import { QList } from 'quasar'
import DashboardDrawerEntry from 'source/modules/Dashboard/components/DashboardDrawerEntry'
import Popup from '@devitools/Mixins/Popup'

export default {
  /**
   */
  name: 'DashboardDrawer',
  /**
   */
  components: {
    QList, DashboardDrawerEntry
  },
  /**
   */
  mixins: [Popup],
  /**
   */
  props: {
    entries: {
      type: [Array, Object],
      default: () => []
    }
  },
  /**
   */
  methods: {
    /**
     * @param {string} path
     */
    openPopup (path) {
      // Fixes dual-screen position                         Most browsers      Firefox
      const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX
      const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY

      const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
      const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

      const w = 1024
      const h = 600
      const systemZoom = width / window.screen.availWidth
      const left = (width - w) / 2 / systemZoom + dualScreenLeft
      const top = (height - h) / 2 / systemZoom + dualScreenTop
      const options = 'menubar=no,' +
        'location=no,' +
        'resizable=yes,' +
        'scrollbars=no,' +
        'status=no,' +
        'width=' + w / systemZoom + ',' +
        'height=' + h / systemZoom + ',' +
        'top=' + top + ',' +
        'left=' + left
      const base = (`${window.location.origin}${window.location.pathname}`).replace(this.$route.path, '')
      const url = `${base}${path}?modal=true`
      const title = 'Popup'
      const newWindow = window.open(url, title, options)

      // Puts focus on the newWindow
      if (window.focus) {
        newWindow.focus()
      }
    }
  }
}
</script>
