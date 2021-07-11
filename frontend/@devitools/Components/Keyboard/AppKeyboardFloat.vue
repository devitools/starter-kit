<template>
  <QDialog
    maximized
    :value="visible"
    @hide="close"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <div
      class="AppKeyboardFloat"
      :class="{ 'AppKeyboardFloat--numpad': numpad }"
    >
      <div
        class="AppKeyboardFloat__container"
        :class="{ 'AppKeyboardFloat__container--numpad': numpad }"
      >
        <div
          class="AppKeyboardFloat__closer"
          :class="{ 'AppKeyboardFloat__closer--numpad': numpad }"
        >
          <QBtn
            round
            color="negative"
            icon="close"
            size="1.5em"
            v-close-popup
          />
        </div>
        <div
          class="AppKeyboardFloat__display"
          :class="{ 'AppKeyboardFloat__display--decimal': decimal }"
        >
          {{ display }}
        </div>
        <AppKeyboard
          :value="value"
          :numpad="numpad"
          :layout="layout"
          @input="$emit('input', $event)"
          @keypress="$emit('keypress', $event)"
        />
      </div>
    </div>
  </QDialog>
</template>

<script>
import { QBtn, QDialog } from 'quasar'
import AppKeyboard from './AppKeyboard'
import { currencyFormatter } from '../../Util/formatter'

import { DEFAULT_CURRENCY } from 'src/settings/components'

export default {
  /**
   */
  name: 'AppKeyboardFloat',
  /**
   */
  components: {
    AppKeyboard,
    QBtn,
    QDialog
  },
  /**
   */
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: ''
    },
    numpad: {
      type: Boolean,
      default: false
    },
    layout: {
      type: Array,
      default: undefined
    },
    currency: {
      type: Boolean,
      default: false
    },
    decimal: {
      type: Number,
      default: 0
    },
    formatter: {
      type: Object,
      default: () => ({})
    }
  },
  /**
   */
  computed: {
    /**
     * @return {string|number}
     */
    display () {
      if (this.decimal > 0) {
        const factor = Math.pow(10, this.decimal)
        const value = this.value / factor
        const options = { ...DEFAULT_CURRENCY, ...this.formatter }
        return currencyFormatter(value, options)
      }
      return this.value
    }
  },
  /**
   */
  methods: {
    /**
     */
    close () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
>
.AppKeyboardFloat {
  display: flex;
  justify-content: center;
  align-items: flex-end;

  &.AppKeyboardFloat--numpad {
    align-items: center;

    .simple-keyboard--is-numpad {

      > .hg-layout-custom {
        width: 320px;

        .hg-row {
          .hg-button {
            font-size: 2.1em;
            height: 90px !important;
            max-width: 90px !important;
            min-width: 90px !important;
            background: #ffffff !important;

            &.hg-button-bksp {
              background: #f0f0f0 !important;
            }

            &.hg-button-enter {
              background: #007aff !important;
              color: #ffffff;
            }
          }
        }
      }
    }
  }

  .AppKeyboard .simple-keyboard {
    border-radius: 0;
  }

  .AppKeyboardFloat__container {
    margin: 0 auto;
    width: 992px;
    position: relative;

    &.AppKeyboardFloat__container--numpad {
      width: 320px;

      > .AppKeyboardFloat__display {
        width: 320px;
      }
    }

    .AppKeyboardFloat__closer {
      position: absolute;
      z-index: 20;
      top: -32px;
      right: -10px;

      &.AppKeyboardFloat__closer--numpad {
        top: -32px;
        right: -48px;
      }
    }

    .AppKeyboardFloat__display {
      padding: 5px 10px;
      background: #fff;
      height: 73px;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
      border-radius: 5px 5px 0 0;
      font-size: 2.8em;
      overflow: auto;
      width: 992px;
      margin: 0 auto;

      &.AppKeyboardFloat__display--decimal {
        text-align: right;
      }
    }
  }
}
</style>
