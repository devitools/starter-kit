<template>
  <QField
    class="AppPhoneInternational"
    v-bind="{ ...$attrs, ...$props }"
    @clear="$emit('input', '')"
  >
    <div
      ref="root"
      class="AppPhoneInternational__root"
    />
  </QField>
</template>

<script>
import { QField } from 'quasar'
/* https://github.com/jackocnr/intl-tel-input#getting-started */
import intlTelInput from 'intl-tel-input'
import 'intl-tel-input/build/css/intlTelInput.min.css'
import 'intl-tel-input/build/js/utils.js'
import { uuid } from '../../Util/general'

export default {
  /**
   */
  name: 'AppPhoneInternational',
  /**
   */
  components: { QField },
  /**
   */
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      required: true
    },
    regex: {
      type: RegExp,
      default: () => (/[\d -]+/)
    },
    allowDropdown: {
      type: Boolean,
      default: true
    },
    autoHideDialCode: {
      type: Boolean,
      default: true
    },
    autoPlaceholder: {
      type: String,
      default: 'polite'
    },
    customPlaceholder: {
      type: Function,
      default: null
    },
    excludeCountries: {
      type: Array,
      default: () => ([])
    },
    formatOnDisplay: {
      type: Boolean,
      default: true
    },
    geoIpLookup: {
      type: Function,
      default: null
    },
    initialCountry: {
      type: String,
      default: ''
    },
    preferredCountries: {
      type: Array,
      default: () => (['us', 'gb'])
    },
    separateDialCode: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    identifier: '',
    focused: false
  }),
  /**
   */
  methods: {
    /**
     * @return {HTMLInputElement}
     */
    createIntlInput () {
      const regex = this.regex

      const input = document.createElement('input')
      input.id = this.identifier
      input.type = 'tel'
      input.value = this.value || ''
      input.onkeypress = function ($event) {
        return regex.test(String.fromCharCode($event.which))
      }

      input.addEventListener('focus', () => {
        this.focused = true
      })

      input.addEventListener('blur', () => {
        this.focused = false
      })

      input.addEventListener('change', () => {
        const value = this.$iti.getNumber()
        this.$emit('input', value)

        if (!value) {
          return
        }

        const validationCode = this.$iti.getValidationError()
        if (validationCode === 0) {
          this.$emit('hasError', '')
          return
        }

        const validationCodes = {
          // 0: 'phone-international:IS_POSSIBLE',
          1: 'phone-international:INVALID_COUNTRY_CODE',
          2: 'phone-international:TOO_SHORT',
          3: 'phone-international:TOO_LONG',
          4: 'phone-international:IS_POSSIBLE_LOCAL_ONLY',
          5: 'phone-international:INVALID_LENGTH'
        }
        this.$emit('hasError', validationCodes[validationCode])
      })

      this.$refs.root.appendChild(input)

      return input
    },
    /**
     * @return {*}
     */
    getIntlOptions () {
      const options = {
        allowDropdown: this.allowDropdown,
        autoHideDialCode: this.autoHideDialCode,
        autoPlaceholder: this.autoPlaceholder,
        customPlaceholder: this.customPlaceholder,
        excludeCountries: this.excludeCountries,
        formatOnDisplay: this.formatOnDisplay,
        geoIpLookup: this.geoIpLookup,
        initialCountry: process.env.VUE_APP_COUNTRY_CODE || this.initialCountry,
        preferredCountries: this.preferredCountries,
        separateDialCode: this.separateDialCode
      }

      if (!this.geoIpLookup) {
        return options
      }

      options.initialCountry = 'auto'
      const countryCode = this.$memory.get('country-code')
      if (countryCode) {
        options.initialCountry = countryCode
        return options
      }

      options.geoIpLookup = async (resolve) => {
        const country = await this.geoIpLookup()
        this.$memory.set('country-code', country)
        resolve(country)
      }

      return options
    }
  },
  /**
   */
  watch: {
    value (value) {
      this.$iti.setNumber(value)
    }
  },
  /**
   */
  created () {
    this.identifier = 'identifier_' + uuid().replace(/-/g, '_')
  },
  /**
   */
  mounted () {
    this.$iti = intlTelInput(this.createIntlInput(), this.getIntlOptions())
  },
  /**
   */
  beforeDestroy () {
    this.$refs.root.classList.add('AppPhoneInternational__root--destroyed')
    this.$iti.destroy()
  }
}
</script>

<style lang="stylus">
.AppPhoneInternational {
  height: 40px;
  padding-top: 1px !important;
  padding-left: 1px !important;
  padding-bottom: 1px !important;

  .q-field__control {
    padding: 1px !important;

    .q-field__control-container {
      overflow: visible !important;

      & > .AppPhoneInternational__root {
        width: 100%

        .iti {
          color: #909090;
          height: 38px;

          &.iti--allow-dropdown {
            width: 100%;

            input {
              width: 100%;
              /*border-radius: 4px;*/
              border: none !important;
              padding: 5px 6px 0 70px;
              font-size: 13px;
              font-weight: 400;
              line-height: 28px;
              letter-spacing: 0.00937em;
              text-decoration: inherit;
              text-transform: inherit;
            }
          }

        }
      }
    }

    .q-field__append.q-field__marginal {
      margin-right: 10px;
    }
  }

  .AppPhoneInternational__root {
    &.AppPhoneInternational__root--destroyed {
      & > * {
        display: none;
      }
    }
  }
}

</style>
