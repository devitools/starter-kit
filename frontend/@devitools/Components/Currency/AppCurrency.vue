<template>
  <QField
    v-model="currency"
    v-bind="bind"
    v-on="on"
  >
    <template v-slot:control="{ id, floatingLabel: show, value: money }">
      <money
        :id="id"
        class="q-field__input text-right"
        :value="money"
        @input="updateValue"
        v-bind="moneyFormatForComponent"
        v-show="show"
        :disabled="readonly || disable"
        @keyup.native="handleKeyboard"
      />
    </template>
  </QField>
</template>

<script>
import { QField } from 'quasar'
import { Money } from 'v-money'

export default {
  name: 'AppCurrency',
  components: { Money, QField },
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
    },
    decimal: {
      type: String,
      default: '.'
    },
    thousands: {
      type: String,
      default: ','
    },
    prefix: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    },
    precision: {
      type: Number,
      default: 2
    },
    masked: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  /**
   */
  data: () => ({
    currency: 0
  }),
  /**
   */
  computed: {
    bind () {
      return { ...this.$attrs, ...this.$props, clearable: false }
    },
    on () {
      return { ...this.$listeners, input: () => undefined }
    },
    moneyFormatForComponent () {
      return {
        decimal: this.decimal,
        thousands: this.thousands,
        precision: this.precision,
        masked: this.masked
      }
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
      this.updateValue(Number(this.currency) - 1)
    },
    /**
     */
    plus () {
      this.updateValue(Number(this.currency) + 1)
    },
    /**
     * @param {number | string} value
     */
    updateValue (value) {
      if (Number(this.currency) === Number(value)) {
        return
      }
      this.$emit('input', Number(value))
    }
  },
  /**
   */
  watch: {
    value: {
      immediate: true,
      handler (value) {
        this.currency = value
      }
    }
  }
}
</script>

<style scoped>

</style>
