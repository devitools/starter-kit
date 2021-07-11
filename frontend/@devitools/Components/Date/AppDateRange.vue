<template>
  <QInput
    mask="##/##/#### - ##/##/####"
    :value="inputValue"
    @input="inputUpdateValue($event)"
    v-bind="bind"
  >
    <template v-slot:prepend>
      <DateWidgetDate
        :format="format"
        :value="startValue"
        :disable="readonly"
        @input="startUpdateValue($event)"
      />
    </template>
    <template v-slot:append>
      <DateWidgetDate
        :format="format"
        :value="endValue"
        :disable="readonly"
        @input="endUpdateValue($event)"
      />
    </template>
  </QInput>
</template>

<script>
import { QInput } from 'quasar'

import MixinPropsDate from './MixinPropsDate'
import MixinBehaviour from './MixinBehaviour'
import DateWidgetDate from './DateWidgetDate'
import { dateFormatter } from '../../Util/formatter'

export default {
  /**
   */
  name: 'AppDateRange',
  /**
   */
  mixins: [MixinPropsDate, MixinBehaviour],
  /**
   */
  components: { QInput, DateWidgetDate },
  /**
   */
  computed: {
    /**
     * @returns {string}
     */
    inputValue () {
      const start = dateFormatter(this.startValue, this.display, this.format)
      const end = dateFormatter(this.endValue, this.display, this.format)
      if (start && end) {
        return `${start} - ${end}`
      }
      return ''
    },
    /**
     * @returns {string}
     */
    startValue () {
      const start = String(this.value).split(',').shift().trim()
      const value = dateFormatter(start, this.format, this.format)
      if (!value) {
        return ''
      }
      return value
    },
    /**
     * @returns {string}
     */
    endValue () {
      const end = String(this.value).split(',').pop().trim()
      const value = dateFormatter(end, this.format, this.format)
      if (!value) {
        return ''
      }
      return value
    }
  },
  /**
   */
  methods: {
    /**
     * @param {string} value
     */
    inputUpdateValue (value) {
      // console.log('~> inputUpdateValue: value', value)
      let [start, end] = String(value).split('-')
      start = dateFormatter(String(start).trim(), this.format, this.display)
      end = dateFormatter(String(end).trim(), this.format, this.display)
      // console.log('~> inputUpdateValue: start', start)
      // console.log('~> inputUpdateValue: end', end)
      if (start && end) {
        // console.log('~> inputUpdateValue: start,end', `${start},${end}`)
        this.$emit('input', `${start},${end}`)
        return
      }
      // console.log('~> inputUpdateValue: start,end', undefined)
      this.$emit('input', undefined)
    },
    /**
     * @param {string} start
     */
    startUpdateValue (start) {
      // console.log('~> startUpdateValue: start', start)
      let [, end] = String(this.value).split(',')
      end = dateFormatter(String(end).trim(), this.format, this.format)
      // console.log('~> startUpdateValue: end', end)
      if (!end) {
        end = start
      }
      // console.log('~> startUpdateValue: emit', `${start},${end}`)
      this.$emit('input', `${start},${end}`)
    },
    /**
     * @param {string} end
     */
    endUpdateValue (end) {
      // console.log('~> endUpdateValue: end', end)
      let [start] = String(this.value).split(',')
      start = dateFormatter(String(start).trim(), this.format, this.format)
      // console.log('~> endUpdateValue: start', start)
      if (!start) {
        start = end
      }
      // console.log('~> endUpdateValue: emit', `${start},${end}`)
      this.$emit('input', `${start},${end}`)
    }
  }
}
</script>

<style scoped>

</style>
