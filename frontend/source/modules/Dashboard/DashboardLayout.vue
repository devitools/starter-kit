<template>
  <QLayout
    class="DashboardLayout"
    :class="{ 'DashboardLayout--modal': modal }"
    view="hHh LpR fff"
  >
    <QHeader
      v-if="!modal"
      elevated
      class="DashboardLayout__header"
    >
      <QToolbar class="DashboardLayout__toolbar">
        <QBtn
          dense
          flat
          round
          color="grey-8"
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        />
        <img
          alt="logo"
          class="DashboardLayout__header_logo"
          :src="$static('/logo/horizontal-100x40.png')"
        >
        <QSpace />
        <QBtn
          dense
          flat
          round
          class="q-mr-md"
          icon="notifications"
          @click="goToNotifications"
        >
          <AppTooltip>{{ $lang('pages.dashboard.index.notification') }}</AppTooltip>
        </QBtn>
        <QBtn
          dense
          flat
          round
          icon="update"
          @click="checkForUpdates"
        >
          <AppTooltip>{{ $lang('pages.dashboard.index.update') }}</AppTooltip>
        </QBtn>
        <DashboardDropdown />
      </QToolbar>
    </QHeader>

    <QDrawer
      v-if="!modal"
      v-model="leftDrawer"
      side="left"
      elevated
      :mini="miniState"
      :mini-to-overlay="miniState"
      :breakpoint="710"
      content-class="bg-white"
      @mouseover="handleMiniState('over')"
      @mouseout="handleMiniState('out')"
    >
      <QScrollArea class="DashboardLayout_drawer_wrapper fit">
        <DashboardDrawer :entries="entries" />
      </QScrollArea>

      <div
        v-if="!miniState"
        class="DashboardLayout_drawer_version absolute absolute-bottom full-width q-pt-sm q-pb-sm q-pl-md q-pr-md"
      >
        <small class="float-left"><i>&copy; {{ $t('name') }} · {{ year }}</i></small>
        <small class="float-right">
          <i>{{ $lang('pages.dashboard.index.version') }}: </i>
          <b style="font-family: monospace;">{{ version }}</b>
        </small>
      </div>
    </QDrawer>

    <QPageContainer>
      <QPage padding>
        <AppBreadcrumb />
        <transition
          name="fade"
          mode="out-in"
        >
          <RouterView :key="key" />
        </transition>
      </QPage>
    </QPageContainer>
  </QLayout>
</template>

<script>
import { QBtn, QDrawer, QHeader, QLayout, QPage, QPageContainer, QScrollArea, QSpace, QToolbar } from 'quasar'
import $emporium from '@devitools/emporium'

import { checkForUpdates } from 'src/boot/update'

import { me } from 'source/domains/Auth/Service'

import DashboardDrawer from './components/DashboardDrawer'
import DashboardDropdown from './components/DashboardDropdown'

import $store from 'source/modules/General/version'

/**
 */
export default {
  /**
   */
  name: 'DashboardLayout',
  /**
   */
  components: {
    DashboardDropdown,
    DashboardDrawer,
    QLayout,
    QHeader,
    QToolbar,
    QBtn,
    QSpace,
    QDrawer,
    QScrollArea,
    QPageContainer,
    QPage
  },
  /**
   */
  data: () => ({
    leftDrawer: false,
    modal: false,
    offline: false,
    miniState: false,
    mouseControl: false
  }),
  /**
   */
  computed: {
    /**
     * @returns {string}
     */
    key () {
      return this.$route.fullPath
    },
    /**
     * @returns {Object}
     */
    entries () {
      return this.$store.getters['auth/getMenu']
    },
    /**
     * @returns {string}
     */
    version () {
      return $store.state.version || 'develop'
    },
    /**
     * @returns {string}
     */
    year () {
      return String(new Date().getFullYear())
    },
    /**
     * @returns {string}
     */
    title () {
      return this.$store.getters['dashboard/getTitle']
    }
  },
  /**
   */
  watch: {
    title: {
      immediate: true,
      handler (title) {
        window.document.title = title
      }
    },
    /**
     */
    leftDrawer (leftDrawer) {
      window.localStorage.setItem('leftDrawer', leftDrawer ? 'true' : 'false')
    },
    /**
     */
    '$q.screen.width': {
      handler (value) {
        if (value >= 1360) {
          this.miniState = false
          this.leftDrawer = true
          this.mouseControl = false
          return
        }
        if (value <= 1024) {
          this.miniState = true
          this.mouseControl = true
        }
      }
    }
  },
  /**
   */
  created () {
    this.offline = this.$store.getters['app/getOffline']
    this.$watch('offline', (offline) => {
      this.$store.dispatch('app/setOffline', offline)
    })

    if (this.$route.query.modal) {
      this.modal = true
      return
    }
    const stored = window.localStorage.getItem('leftDrawer')
    this.leftDrawer = stored === null ? true : stored === 'true'
  },
  /**
   */
  mounted () {
    // hide the loading that was activated by SignIn
    this.$q.loading.hide()

    window.addEventListener('beforeunload', this.beforeUnload)
  },
  /**
   */
  destroyed () {
    window.removeEventListener('beforeunload', this.beforeUnload)
  },
  /**
   */
  methods: {
    /**
     */
    beforeUnload ($event) {
      if (!$emporium.state.modified) {
        return
      }
      $event.returnValue = this.$lang('agnostic.modified')
    },
    /**
     */
    checkForUpdates () {
      if (process.env.NODE_ENV === 'production') {
        try {
          checkForUpdates()
        } catch (e) {
          // silent is gold
        }
      }

      try {
        me()
      } catch (e) {
        // silent is gold
      }
    },
    /**
     */
    goToNotifications () {
      this.$browse('/dashboard/admin/notification')
    },
    /**
     */
    handleMiniState (mouseState) {
      if (!this.mouseControl) {
        return
      }
      if (mouseState === 'over') {
        this.miniState = false
        return
      }
      if (mouseState === 'out') {
        this.miniState = true
      }
    }
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
>
.DashboardLayout {
  background-color: #f5f5f5;

  .DashboardLayout__header {
    background-image: linear-gradient(60deg, #ffffff 0%, #bfd9fd 20%, #77a7ea 50%, $primary 100%);

    small {
      /*text-shadow: 1px 1px 1px #777777;*/
      text-transform: lowercase;
      /*font-weight: 300;*/
    }

    .DashboardLayout__header_logo {
      height: 40px;
      margin: 0 15px;
    }
  }

  .DashboardLayout_drawer_wrapper {
    max-height: calc(100vh - 91px);
  }

  .DashboardLayout_drawer_version {
    background-color: #fbfbfb;
    box-shadow: inset 0 0 3px 0 #d5d5d5, inset 0 0 3px 1px #eaeaea;
  }

  .DashboardLayout__user {
    font-size: 0.9em;

    > div {
      line-height: 8px;
    }

    > small {
      display: block;
      text-align: right;
    }
  }

  .DashboardLayout__avatar {
    box-shadow: 0 0 1px 2px #fbfbfb;
  }

  @media (max-width 768px) {
    .DashboardLayout__header_logo {
      height: 35px;
      margin: 0;
    }

    .DashboardLayout__user {
      display: none;
    }
  }

  @media (max-width 1200px) {
    .hide-in-1200 {
      display: none;
    }
  }

  @media (max-width 1024px) {
    .DashboardLayout__header_details {
      width: calc(100vw - 250px) !important;
    }
  }

  @media (max-width 768px) {
    .DashboardLayout__header_details {
      width: calc(100vw - 180px) !important;
    }

    .hide-in-768 {
      display: none;
    }
  }

  @media (max-width 425px) {
    .DashboardLayout_drawer_wrapper {
      max-height: calc(100vh - 31px);
    }

    .DashboardLayout__header {
      > .q-toolbar {
        padding: 0;

        > .q-btn.q-btn-dropdown {
          padding: 0;
        }
      }

      .DashboardLayout__header_details {
        width: calc(100vw - 120px) !important;
        margin: 0 10px 0 0;
      }
    }

    .hide-in-425 {
      display: none;
    }
  }

  @media (max-width 320px) {
    .DashboardLayout__header_details {
      .q-toggle__label {
        font-size: 0.6rem !important;
      }
    }

    .hide-in-320 {
      display: none;
    }
  }

  .q-drawer__content {

    .q-list--bordered, .q-list--separator > .q-item-type + .q-item-type, .q-list--separator > .q-virtual-scroll__content > .q-item-type + .q-item-type {
      border-color: rgba(0, 0, 0, 0.025);
    }

    .q-item {
      position: relative;

      &.q-router-link--active, &.q-item--active {
        background: rgba(215, 215, 215, 0.5);
        color: #181818;
      }

      &.resource-not-implemented {
        opacity: 0.7;
      }

      &.resource-separated:after {
        content: '';
        position: absolute;
        background-image: linear-gradient(90deg, rgba(0, 0, 0, .04), #ddd, #ddd, rgba(0, 0, 0, .04));
        height: 1px;
        bottom: 0;
        width: 86%;
        left: 7%;
      }
    }

    .q-expansion-item {
      position: relative;

      &.q-expansion-item--expanded:after {
        content: '';
        position: absolute;
        background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.04), #ddd, #ddd, rgba(0, 0, 0, 0.04));
        height: 1px;
        top: 48px;
        width: 96%;
        left: 2%;
      }
    }

    .q-expansion-item.q-expansion-item--expanded > .q-expansion-item__container > .q-item {
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2), 0 -1px 1px 1px rgba(150, 150, 150, 0.1);
    }

    .q-expansion-item__content {
      background-color: #f2f2f2;
      box-shadow: inset 0 3px 3px rgba(0, 0, 0, 0.16), inset 2px -3px 5px 1px rgba(177, 177, 177, 0.15), inset 2px 0 5px 1px rgba(177, 177, 177, 0.15);
    }

    .q-expansion-item__content {
      > .q-item {
        padding: 8px 8px 8px 26px;
      }
    }
  }
}

.DashboardLayout__dropdown_menu {
  border-radius: 0 0 4px 4px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 0px 1px -2px rgba(0, 0, 0, 0.12);
  border-top: 1px solid #f3f1f1;
}
</style>
