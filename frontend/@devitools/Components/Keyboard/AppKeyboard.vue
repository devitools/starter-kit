<template>
  <div
    class="AppKeyboard"
    :class="numpad ? 'simple-keyboard--is-numpad' : 'simple-keyboard--is-full'"
  >
    <div
      ref="keyboard"
      class="simple-keyboard"
    />
  </div>
</template>

<script>
// https://github.com/simple-keyboard/vue-simple-keyboard
import Keyboard from 'simple-keyboard'
import 'simple-keyboard/build/css/index.css'

export default {
  name: 'AppKeyboard',
  /**
   */
  props: {
    value: {
      type: [String, Number],
      default: undefined
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
      type: Array,
      default: undefined
    },
    decimal: {
      type: Array,
      default: undefined
    }
  },
  /**
   */
  data: () => ({
    keyboard: null
  }),
  /**
   */
  methods: {
    /**
     */
    initKeyboard () {
      if (this.$keyboard) {
        this.$keyboard.destroy()
      }

      let layoutName = 'default'

      const layout = {
        /*
        default: [
          'Q W E R T Y U I O P',
          'A S D F G H J K L {bksp}',
          'Z X C V B N M Ç {enter}',
          '{tab} . , ! ? ; & % {lock} {numeric}',
          '+ - $ @ .com {space}'
        ],
        shift: [
          'q w e r t y u i o p',
          'a s d f g h j k l {bksp}',
          'z x c v b n m ç {enter}',
          '< > \\ / ( ) { } {lock} {numeric}',
          '* http https :// {space}'
        ],
        */
        default: [
          'Q W E R T Y U I O P',
          'A S D F G H J K L {bksp}',
          'Z X C V B N M Ç {numeric} {lock}',
          '{tab} . , {space} ? {enter}'
        ],
        shift: [
          'q w e r t y u i o p',
          'a s d f g h j k l {bksp}',
          'z x c v b n m ç {numeric} {lock}',
          '{tab} @ ; {space} ! {enter}'
        ],
        numbers: [
          '1 2 3 4 5 {clear}',
          '6 7 8 9 0 {bksp}',
          '< > \\ / ( ) { } {numeric} {lock}',
          '{tab} + - {space} # {enter}'
        ],
        numpad: [
          '1 2 3',
          '4 5 6',
          '7 8 9',
          '{bksp} 0 {clear}',
          '{enter}'
        ],
        custom: this.layout
      }

      const display = {
        '{enter}': '<i class="mdi mdi-keyboard-return"></i>',
        '{space}': '<i class="mdi mdi-keyboard-space"></i>',
        '{tab}': '<i class="mdi mdi-keyboard-tab"></i>',
        '{bksp}': '<i class="mdi mdi-keyboard-backspace"></i>',
        '{lock}': '<i class="mdi mdi-apple-keyboard-caps"></i>',
        '{numeric}': '<i class="mdi mdi-numeric"></i>',
        '{clear}': '<i class="mdi mdi-backspace-outline"></i>'
      }
      if (this.numpad) {
        layoutName = 'numpad'
      }

      if (this.layout !== undefined) {
        layoutName = 'custom'
      }
      const options = {
        onChange: this.onChange,
        onKeyPress: this.onKeyPress,
        layoutName: layoutName,
        layout: layout,
        display: display
      }
      this.$keyboard = new Keyboard(this.$refs.keyboard, options)

      if (this.value) {
        this.$keyboard.setInput(this.value)
      }
    },
    /**
     * @param {string} input
     */
    onChange (input) {
      this.$emit('input', input)
    },
    /**
     */
    onKeyPress (button) {
      if (button === '{clear}') {
        this.$emit('input', '')
      }
      this.$emit('keypress', button)

      if (!['{lock}', '{numeric}'].includes(button)) {
        return
      }
      const layouts = { '{lock}': 'shift', '{numeric}': 'numbers' }
      const layout = layouts[button]
      this.setLayout(layout)
    },
    /**
     * @param {string} layout
     */
    setLayout (layout) {
      const currentLayout = this.$keyboard.options.layoutName
      if (currentLayout === 'default') {
        this.$keyboard.setOptions({ layoutName: layout })
        return
      }
      if (currentLayout !== layout) {
        this.$keyboard.setOptions({ layoutName: layout })
        return
      }
      this.$keyboard.setOptions({ layoutName: 'default' })
    }
  },
  /**
   */
  watch: {
    /**
     */
    value (input) {
      this.$keyboard.setInput(input)
    },
    /**
     */
    numpad () {
      this.initKeyboard()
    }
  },
  /**
   */
  mounted () {
    this.initKeyboard()
  },
  /**
   */
  destroyed () {
    if (this.$keyboard) {
      this.$keyboard.destroy()
    }
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
>
.AppKeyboard {

  .simple-keyboard {
    padding: 10px;
    background: #f7f7f7;
    width: 992px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);

    &.hg-theme-default {

      > .hg-row {
        justify-content: center;
        align-items: center;

        .hg-button-container,
        .hg-button:not(:last-child) {
          margin-right: 15px !important;
        }

        &:not(:last-child) {
          margin-bottom: 15px !important;
        }

        > .hg-button {
          transition: all 0.4s ease-in;
          font-family: "Fira Code", monospace;
          position: relative;
          // start click effect
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 1px -1px rgba(131, 128, 128, 0.05), 0 -2px 1px -1px rgba(0, 0, 0, 0.01) !important;

          &[data-skbtn="{enter}"] {
            background: #007aff !important;
            color: #fff;
          }

          &[data-skbtn="{clear}"] {
            color: #ffffff !important;
            background: #ff4343 !important;
          }

          &:before {
            content: '';
            background-color: rgba(228, 255, 209, 0.329);
            border-radius: 50%;
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            transform: scale(0.001, 0.001);
          }

          &.hg-activeButton {
            outline: 0;

            &:before {
              animation: effect_dylan 0.8s ease-out;
            }
          }
        }

        @keyframes effect_dylan {
          50% {
            transform: scale(4, 4);
            opacity: 0;
          }
          99% {
            transform: scale(0.001, 0.001);
            opacity: 0;
          }
          100% {
            transform: scale(0.001, 0.001);
            opacity: 1;
          }
        }
      }
    }
  }

  &.simple-keyboard--is-full {

    .hg-layout-shift {
      .hg-row {
        .hg-button {
          &[data-skbtn="{lock}"] {
            color: #82730f !important;
            background: #feffd1 !important;
          }
        }
      }
    }

    .hg-layout-numbers {
      .hg-row {
        .hg-button {
          &[data-skbtn="{numeric}"] {
            color: #82730f !important;
            background: #feffd1 !important;
          }

          &[data-skbtn="{clear}"],
          &[data-skbtn="{bksp}"] {
            max-width: 75px !important;
            min-width: 75px !important;
          }

          &[data-skbtn="1"],
          &[data-skbtn="2"],
          &[data-skbtn="3"],
          &[data-skbtn="4"],
          &[data-skbtn="5"],
          &[data-skbtn="6"],
          &[data-skbtn="7"],
          &[data-skbtn="8"],
          &[data-skbtn="9"],
          &[data-skbtn="0"] {
            background: #ffffff !important;
            color: #030303 !important;
          }
        }
      }
    }

    .hg-row {
      > .hg-button {
        font-size: 1.6em;
        height: 90px !important;
        background: #f0f0f0 !important;

        &[data-skbtn="{space}"] {
          background: #ffffff !important;
        }

        &[data-skbtn="Q"],
        &[data-skbtn="q"],
        &[data-skbtn="W"],
        &[data-skbtn="w"],
        &[data-skbtn="E"],
        &[data-skbtn="e"],
        &[data-skbtn="R"],
        &[data-skbtn="r"],
        &[data-skbtn="T"],
        &[data-skbtn="t"],
        &[data-skbtn="Y"],
        &[data-skbtn="y"],
        &[data-skbtn="U"],
        &[data-skbtn="u"],
        &[data-skbtn="I"],
        &[data-skbtn="i"],
        &[data-skbtn="O"],
        &[data-skbtn="o"],
        &[data-skbtn="P"],
        &[data-skbtn="p"],
        &[data-skbtn="A"],
        &[data-skbtn="a"],
        &[data-skbtn="S"],
        &[data-skbtn="s"],
        &[data-skbtn="D"],
        &[data-skbtn="d"],
        &[data-skbtn="F"],
        &[data-skbtn="f"],
        &[data-skbtn="G"],
        &[data-skbtn="g"],
        &[data-skbtn="H"],
        &[data-skbtn="h"],
        &[data-skbtn="I"],
        &[data-skbtn="i"],
        &[data-skbtn="J"],
        &[data-skbtn="j"],
        &[data-skbtn="Ç"],
        &[data-skbtn="ç"],
        &[data-skbtn="K"],
        &[data-skbtn="k"],
        &[data-skbtn="L"],
        &[data-skbtn="l"],
        &[data-skbtn="Z"],
        &[data-skbtn="z"],
        &[data-skbtn="X"],
        &[data-skbtn="x"],
        &[data-skbtn="C"],
        &[data-skbtn="c"],
        &[data-skbtn="V"],
        &[data-skbtn="v"],
        &[data-skbtn="B"],
        &[data-skbtn="b"],
        &[data-skbtn="N"],
        &[data-skbtn="n"],
        &[data-skbtn="M"],
        &[data-skbtn="m"] {
          background: #ffffff !important;
          color: #030303 !important;
          min-width: 83.5px !important;
          max-width: 83.5px !important;
        }

        &[data-skbtn="\+"],
        &[data-skbtn="\-"],
        &[data-skbtn="\$"],
        &[data-skbtn="\*"],
        &[data-skbtn="\@"],
        &[data-skbtn="\://"] {
          min-width: 84px !important;
          max-width: 84px !important;
        }

        &[data-skbtn="\.com"] {
          max-width: unset !important;
        }

        &[data-skbtn="{enter}"] {
          max-width: 164px !important;
          min-width: 164px !important;
        }

        &[data-skbtn="{lock}"],
        &[data-skbtn="{numeric}"] {
          max-width: 75px !important;
          min-width: 75px !important;
        }

        &[data-skbtn="{space}"] {
          min-width: 380px !important;
          max-width: 380px !important;
        }

        &[data-skbtn="A"],
        &[data-skbtn="a"] {
          margin-left: 10px;
        }

        &[data-skbtn="Z"],
        &[data-skbtn="z"] {
          margin-left: 20px;
        }
      }
    }
  }

  &.simple-keyboard--is-numpad {

    > .hg-layout-numpad {
      width: 320px;

      .hg-row {
        .hg-button {
          font-size: 2.1em;
          height: 90px !important;
          max-width: 90px;
          min-width: 90px !important;
          background: #ffffff !important;

          &.hg-button-bksp {
            background: #f0f0f0 !important;
          }

          &.hg-button-enter {
            background: #007aff !important;
            color: #ffffff;
            max-width: unset;
          }
        }
      }
    }
  }
}
</style>
