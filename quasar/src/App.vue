<template>
  <div id="root">
    <QAjaxBar
      color="red"
      size="3px"
    />

    <div id="q-app">
      <router-view />
    </div>

    <div
      v-if="printing"
      id="printable"
    >
      <Printable />
    </div>
  </div>
</template>

<script type="text/javascript">
import { QAjaxBar } from 'quasar'
import Local from '@devitools/Services/Local'
import Dialog from '@devitools/Components/Schema/Contracts/Dialog'
import Printable from 'resources/views/dashboard/print/Printable'

import $store from 'source/modules/General/version'
import { namespaces } from 'src/settings/permissions'

export default {
  /**
   */
  name: 'App',
  /**
   */
  components: { Printable, QAjaxBar },
  /**
   */
  mixins: [Dialog],
  /**
   */
  computed: {
    /**
     * @returns {*}
     */
    printing () {
      return this.$store.getters['app/getPrint']
    }
  },
  /**
   */
  methods: {
    /**
     * This is a simple method to ask user to update the version
     */
    notify () {
      if (this.confirmed) {
        return
      }
      this.confirmed = this.$confirm(this.$lang('app.version.notify'))
      if (this.confirmed) {
        // noinspection JSDeprecatedSymbols
        window.location.reload(true)
      }
    },
    /**
     * Receive the version fetched from server
     * @param {AxiosResponse} data
     */
    receiveVersion ({ data }) {
      if (this.version && this.version !== data) {
        this.notify()
      }
      $store.commit('updateVersion', data)
    },
    /**
     * Fetch the current app version from server
     */
    fetchVersion () {
      if (this.$dev) {
        return
      }
      Local
        .instance()
        .get('statics/version')
        .then(this.receiveVersion)
        .catch(() => {})
    }
  },
  /**
   */
  watch: {
    printing (value) {
      if (value) {
        this.title = window.document.title
        const domain = this.$util.get(value, 'domain', 'none')
        window.document.title = this.$lang(`domains.${domain}.print.title`)
        return
      }
      if (!this.title) {
        return
      }
      window.document.title = this.title
      this.title = undefined
    }
  },
  /**
   */
  created () {
    if (this.$dev) {
      window.$namespaces = namespaces()
      return
    }
    // wait 1 second to take a breath
    window.setTimeout(this.fetchVersion, 1000)
  }
}
</script>

<style>
</style>
