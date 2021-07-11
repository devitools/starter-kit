<template>
  <div class="DashboardIndex">
    <div class="q-pa-xs">
      <QToolbar
        class="text-white shadow-2 bg-primary rounded-borders"
      >
        <div class="float-left">
          <QAvatar
            text-color="white"
            :icon="icon"
            size="50px"
            font-size="30px"
          />
          {{ greetings }} <strong>{{ name }}</strong>
        </div>

        <QSpace />

        <div class="hide-in-768">
          <strong>{{ dayWeek }}</strong> · {{ day }} de {{ month }} {{ year }}
        </div>
      </QToolbar>
    </div>

  </div>
</template>

<script type="text/javascript">
import { date, QAvatar, QSpace, QToolbar } from 'quasar'

export default {
  /**
   */
  name: 'DashboardIndex',
  /**
   */
  components: {
    QToolbar,
    QAvatar,
    QSpace
  },
  /**
   */
  data: () => ({}),
  /**
   */
  computed: {
    /**
     * @returns {string}
     */
    dayWeek () {
      return date.formatDate(new Date(), 'dddd')
    },
    /**
     * @returns {string}
     */
    day () {
      return date.formatDate(new Date(), 'DD')
    },
    /**
     * @returns {string}
     */
    month () {
      return date.formatDate(new Date(), 'MMMM')
    },
    /**
     * @returns {number}
     */
    year () {
      return new Date().getFullYear()
    },
    /**
     * @returns {Object}
     */
    user () {
      return this.$store.getters['auth/getUser']
    },
    /**
     * @returns {string}
     */
    name () {
      return this.$util.get(this.$store.getters['auth/getUser'], 'name')
    },
    /**
     * @returns {string}
     */
    icon () {
      const hour = (new Date()).getHours()

      if (hour >= 0 && hour <= 12) {
        return 'filter_drama'
      }
      if (hour > 12 && hour <= 18) {
        return 'wb_sunny'
      }
      return 'bedtime'
    },
    /**
     * @returns {string}
     */
    greetings () {
      const hour = (new Date()).getHours()

      if (hour >= 0 && hour <= 12) {
        return this.$lang('app.greetings.morning')
      }
      if (hour > 12 && hour <= 18) {
        return this.$lang('app.greetings.afternoon')
      }
      return this.$lang('app.greetings.night')
    }
  }
}
</script>

<style lang="stylus">
.DashboardIndex
  min-height calc(100vh - 130px)

  .DashboardIndex__card
    cursor pointer
    min-height 100%
    flex 1
    display flex
    flex-direction column
    justify-content center

    &.bg-white:hover
      background-color #f0f0f0 !important

.q-field__inner
  background-color transparent
</style>
