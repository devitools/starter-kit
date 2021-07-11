<template>
  <QIcon
    class="cursor-pointer"
    name="access_time"
    :disabled="disable"
  >
    <QPopupProxy
      v-if="!disable"
      ref="qDatetimeProxy"
      transition-hide="scale"
      transition-show="scale"
      @before-show="datetimeBeforeShow"
    >
      <QTime
        :mask="format"
        :value="datetimeValue"
        @input="datetimeInput"
        format24h
      />
    </QPopupProxy>
  </QIcon>
</template>

<script>
import { QIcon, QPopupProxy, QTime } from 'quasar'
import AppDateMixinProps from './MixinPropsDate'
import { now } from '../../Util/date'

export default {
  /**
   */
  name: 'DateWidgetDatetime',
  /**
   */
  mixins: [AppDateMixinProps],
  /**
   */
  components: { QIcon, QPopupProxy, QTime },
  /**
   */
  props: {
    disable: {
      type: Boolean,
      default: false
    }
  },
  /**
   */
  data: () => ({
    datetime: null
  }),
  /**
   */
  computed: {
    /**
     * @returns {string}
     */
    datetimeValue () {
      if (!this.value) {
        return this.datetime
      }
      return this.value
    }
  },
  /**
   */
  methods: {
    /**
     * @param value
     */
    datetimeInput (value) {
      this.$refs.qDatetimeProxy.hide()
      this.$emit('input', value)
    },
    /**
     */
    datetimeBeforeShow () {
      this.datetime = now()
    }
  }
}
</script>

<style scoped>

</style>
