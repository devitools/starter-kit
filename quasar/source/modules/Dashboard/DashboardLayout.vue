<template>
  <QLayout
    class="DashboardLayout"
    :class="{ 'DashboardLayout--modal': modal }"
    view="hHh LpR fff"
  >
    <QHeader
      v-if="!modal"
      elevated
      class="DashboardLayout__header bg-primary text-white"
    >
      <QToolbar>
        <QBtn
          dense
          flat
          round
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        />
        <img
          alt="logo"
          class="DashboardLayout__header_logo "
          :src="$static('dashboard/header-logo.png')"
        >
        <QSpace />
        <DashboardMenu />
      </QToolbar>
    </QHeader>

    <QDrawer
      v-model="leftDrawer"
      side="left"
      elevated
      content-class="bg-white"
    >
      <QScrollArea class="fit">
        <div class="DashboardLayout__drawer_header">
          <img
            alt="logo"
            :src="$static('dashboard/header-logo.png')"
          >
        </div>
        <DashboardActions :actions="actions" />
      </QScrollArea>
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
// noinspection ES6CheckImport
import {
  QLayout,
  QHeader,
  QToolbar,
  QBtn,
  QSpace,
  QDrawer,
  QScrollArea,
  QPageContainer,
  QPage
} from 'quasar'
import DashboardActions from 'source/modules/Dashboard/components/DashboardActions'
import DashboardMenu from 'source/modules/Dashboard/components/DashboardMenu'
import AppBreadcrumb from '@devitools/Components/Breadcrumb/AppBreadcrumb'

/**
 */
export default {
  /**
   */
  name: 'DashboardLayout',
  /**
   */
  components: {
    AppBreadcrumb,
    DashboardMenu,
    DashboardActions,
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
    offline: false
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
    actions () {
      return this.$store.getters['auth/getActions']
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
    /**
     */
    leftDrawer (leftDrawer) {
      window.localStorage.setItem('leftDrawer', leftDrawer ? 'true' : 'false')
    },
    /**
     */
    title: {
      immediate: true,
      handler (title) {
        window.document.title = title
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
    this.$q.loading.hide()
  }
}
</script>

<style lang="stylus">
@import '~src/css/quasar.variables.styl'

.DashboardLayout
  background-color #f5f5f5

  .DashboardLayout__header

    small
      text-shadow 1px 1px 1px #777777
      text-transform lowercase
      color #fff
      font-weight 300

    .DashboardLayout__header_logo
      height 40px
      margin 0 15px

  .DashboardLayout__drawer_header
    padding 10px
    background $primary
    border-bottom 1px solid #cacaca
    display flex
    justify-content center

  @media (min-width 999px)
    .DashboardLayout__drawer_header
      display none

  .q-drawer__content
    i
      color #616161 !important

    .q-list--bordered, .q-list--separator > .q-item-type + .q-item-type, .q-list--separator > .q-virtual-scroll__content > .q-item-type + .q-item-type
      border-color rgba(0, 0, 0, 0.06)

    .q-item
      position relative

      &.q-router-link--active, &.q-item--active
        background rgba(215, 215, 215, 0.5)
        color #181818

      &.resource-not-implemented
        opacity 0.7

      &.resource-separated:after
        content: ''
        position absolute
        background-image linear-gradient(90deg, rgba(0, 0, 0, .04), #ddd, #ddd, rgba(0, 0, 0, .04))
        height 1px
        bottom 0
        width 86%
        left 7%

    .q-expansion-item
      position relative

      &.q-expansion-item--expanded:after
        content ''
        position absolute
        background-image linear-gradient(90deg, rgba(0, 0, 0, 0.04), #ddd, #ddd, rgba(0, 0, 0, 0.04))
        height 1px
        top 48px
        width 96%
        left 2%

    .q-expansion-item.q-expansion-item--expanded > .q-expansion-item__container > .q-item
      box-shadow 0 2px 5px rgba(0, 0, 0, 0.2), 0 -1px 1px 1px rgba(150, 150, 150, 0.1)

    // box-shadow 0 2px 5px 1px rgba(0, 0, 0, 0.1), 0 -1px 1px 1px rgba(150,150,150,0.1)

    /*
    */

    .q-expansion-item__content
      background-color #f2f2f2
      box-shadow inset 0 3px 3px rgba(0, 0, 0, 0.16), inset 2px -3px 5px 1px rgba(177, 177, 177, 0.15), inset 2px 0 5px 1px rgba(177, 177, 177, 0.15)

    .q-expansion-item__content
      > .q-item
        padding 8px 8px 8px 26px

  @media (max-width 768px)
    .DashboardLayout__header_logo
      height 35px
      margin 0

    .DashboardLayout__user
      display none

  @media (max-width 1200px)
    .hide-in-1200
      display none

  @media (max-width 1024px)
    .DashboardLayout__header_details
      width calc(100vw - 250px) !important

  @media (max-width 768px)
    .DashboardLayout__header_details
      width calc(100vw - 180px) !important

    .hide-in-768
      display none

  @media (max-width 425px)
    .DashboardLayout__header
      > .q-toolbar
        padding 0

        > .q-btn.q-btn-dropdown
          padding 0

      .DashboardLayout__header_details
        width calc(100vw - 120px) !important
        margin 0 10px 0 0

    .hide-in-425
      display none

  @media (max-width 320px)
    .DashboardLayout__header_details
      .q-toggle__label
        font-size 0.6rem !important

    .hide-in-320
      display none

.DashboardLayout__dropdown_menu
  border-radius 0 0 4px 4px
  box-shadow 0 5px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 0px 1px -2px rgba(0, 0, 0, 0.12)
  border-top 1px solid #f3f1f1
</style>
