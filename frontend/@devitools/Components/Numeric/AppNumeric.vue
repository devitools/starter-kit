<template>
  <QInput
    v-bind="bind"
    v-on="on"
    input-style="text-align: center"
    ref="input"
  >
    <template v-slot:prepend>
      <q-btn
        unelevated
        style="margin: 0 0 0 -11px; height: 38px;"
        dense
        :disabled="$attrs.readonly"
        color="primary"
        icon="remove"
        @click="minus"
      />
    </template>

    <template v-slot:append>
      <q-btn
        unelevated
        style="margin: 0 -11px 0 0; height: 38px;"
        dense
        :disabled="$attrs.readonly"
        color="primary"
        icon="add"
        @click="plus"
      />
    </template>
  </QInput>
</template>

<script>
import { QBtn, QInput } from 'quasar'

export default {
  /**
   */
  name: 'AppNumeric',
  /**
   */
  components: { QBtn, QInput },
  /**
   */
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    min: {
      type: Number,
      default: undefined
    },
    max: {
      type: Number,
      default: undefined
    }
  },
  /**
   */
  computed: {
    bind () {
      return { ...this.$attrs, ...this.$props, clearable: false }
    },
    on () {
      return { ...this.$listeners, input: this.updateValue, keyup: this.handleKeyboard }
    }
  },
  /**
   */
  methods: {
    /**
     * @param {Event} $event
     */
    handleKeyboard ($event) {
      $event.stopPropagation()
      $event.preventDefault()
      if ($event.key === 'ArrowDown') {
        this.minus()
        return
      }
      if ($event.key === 'ArrowUp') {
        this.plus()
      }
    },
    /**
     */
    minus () {
      this.updateValue(Number(this.value) - 1)
    },
    /**
     */
    plus () {
      this.updateValue(Number(this.value) + 1)
    },
    /**
     * @param value
     */
    updateValue (value) {
      if (value === '-') {
        return
      }

      let input = Number(value)
      if (isNaN(input)) {
        return
      }

      if (this.min !== undefined && input < this.min) {
        input = this.min
      }
      if (this.max !== undefined && input > this.max) {
        input = this.max
      }
      this.$emit('input', input)
      const element = this.$refs.input.$el.querySelector('input')
      element.value = String(input)
    }
  }
}
</script>

<style scoped>

</style>
