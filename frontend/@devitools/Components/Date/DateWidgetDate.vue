<template>
  <QIcon
    class="cursor-pointer"
    name="event"
    :disabled="disable"
  >
    <QPopupProxy
      v-if="!disable"
      ref="qDateProxy"
      transition-hide="scale"
      transition-show="scale"
    >
      <QDate
        :mask="format"
        :value="value"
        @input="input"
      />
    </QPopupProxy>
  </QIcon>
</template>

<script>
import { QIcon, QPopupProxy, QDate } from 'quasar'
import AppDateMixinProps from './MixinPropsDate'

export default {
  /**
   */
  name: 'DateWidgetDate',
  /**
   */
  mixins: [AppDateMixinProps],
  /**
   */
  components: { QIcon, QPopupProxy, QDate },
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
  methods: {
    /**
     * @param value
     */
    input (value) {
      this.$refs.qDateProxy.hide()
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>

</style>
