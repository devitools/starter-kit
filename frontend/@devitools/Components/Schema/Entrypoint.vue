<template>
  <div>
    <slot name="printable">
      <div
        v-if="printing"
        id="printable"
      >
        <Printable />
      </div>
    </slot>

    <QDialog
      v-model="visible"
      v-bind="modal.dialog"
    >
      <slot name="modal">
        <div
          class="AppModal"
          v-bind="modal.container"
        >
          <component
            :is="modal.component"
            v-bind="modal.props"
          />
        </div>
      </slot>
    </QDialog>
  </div>
</template>

<script type="text/javascript">
import { QDialog } from 'quasar'

import $emporium from '../../emporium'
import Local from '../../Services/Local'
import Printable from './Print/Printable'
import Dialog from './Contracts/Dialog'

import { on } from 'src/settings/socket'

export default {
  /**
   */
  name: 'Entrypoint',
  /**
   */
  components: {
    QDialog,
    Printable
  },
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
      return $emporium.state.printing
    },
    /**
     * @returns {*}
     */
    modal () {
      const modal = $emporium.state.modal
      return {
        visible: modal?.visible ?? false,
        component: modal?.component,
        props: modal?.props ?? {},
        container: modal?.container ?? {},
        dialog: modal?.dialog ?? {}
      }
    },
    visible: {
      get () {
        return $emporium.state.modal.visible === true
      },
      set (value) {
        const modal = {
          ...$emporium.state.modal,
          visible: value
        }
        $emporium.commit('updateModal', modal)
      }
    }
  },
  /**
   */
  methods: {
    /**
     * Ask user to update the version
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
     * @param {AxiosResponse} result
     */
    receiveVersion (result) {
      if (this.version && this.version !== result.data) {
        this.notify()
      }
      $emporium.commit('updateVersion', result.data)
    },
    /**
     * Fetch the current app version from server
     */
    fetchVersion () {
      if (process.env.NODE_ENV !== 'production') {
        return
      }

      Local
        .instance()
        .get('statics/version')
        .then(this.receiveVersion)
        .catch(() => {
        })
    },
    /**
     */
    configureGlobalEvents () {
      on('version:update', (version) => {
        this.receiveVersion({ data: version })
      })
      on('notify', (options) => {
        this.$q.notify(options)
      })
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
    this.configureGlobalEvents()

    // wait 1 second to take a breath
    window.setTimeout(this.fetchVersion, 1000)
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
>
.AppModal {
  > .SchemaForm,
  > div > .SchemaForm {
    height: auto;

    > .app-form-wrapper {
      height: auto;

      > .app-form-body {
        height: auto;
      }
    }
  }

  > div > .SchemaForm {
    > .app-form-wrapper {
      > .app-form-buttons {
        height: auto !important;
      }
    }
  }
}
</style>
