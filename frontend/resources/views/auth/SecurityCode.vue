<template>
  <div class="SecurityCode__wrapper">
    <label for="code">
      <div class="SecurityCode__container">
        <div
          v-for="(item, index) in length"
          :key="index"
          class="SecurityCode__field_wrapper"
        >
          <i class="SecurityCode__field_number">
            {{ code[index] || placeholder }}
          </i>
        </div>
      </div>
    </label>

    <input
      id="code"
      ref="input"
      v-model="code"
      name="code"
      class="input-code"
      type="tel"
      :maxlength="length"
      autocomplete="off"
      autocapitalize="off"
      @keyup="handleInput($event)"
    >
  </div>
</template>

<script type="text/javascript">
export default {
  /**
   */
  props: {
    length: {
      type: Number,
      default: 4
    },
    placeholder: {
      type: String,
      default: '-'
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  /**
   */
  data () {
    return {
      code: ''
    }
  },
  /**
   */
  watch: {
    value: {
      immediate: true,
      handler (value) {
        this.code = value
      }
    }
  },
  /**
   */
  methods: {
    // TO DO: Test in android/ios keyboard
    hideKeyboard () {
      document.activeElement.blur()
      this.$refs.input.blur()
    },
    updateValue () {
      this.$emit('input', this.code)
    },
    validateNumber (digit) {
      return digit.replace(/\D/g, '')
    },
    handleInput (e) {
      this.$refs.input.value = this.validateNumber(this.code)
      this.updateValue()
      // if (this.code.length >= this.number) {
      //   this.hideKeyboard()
      // }
    }
  }
}
</script>

<style
  scoped
  lang="stylus"
>
.SecurityCode__wrapper {
  overflow: hidden;
}

.SecurityCode__container {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;

  .SecurityCode__field_wrapper {
    border-radius: 4px;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.1);
    display: block;
    list-style: none;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    margin: 5px;
    text-align: center;
    border: 1px solid grey;

    .SecurityCode__field_number {
      font-style: normal;
    }
  }
}

.input-code {
  position: absolute;
  left: -9999px;
  top: -99999px;
  width: 0;
  height: 0;
  opacity: 0;
  overflow: visible;
  z-index: -1;
}
</style>
