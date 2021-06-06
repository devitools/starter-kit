<template>
  <div
    class="AppSelectWithOthers"
    :class="{ 'AppSelectWithOthers--has-error q-field--error': error }"
  >
    <QOptionGroup
      type="checkbox"
      :options="available"
      v-model="selected"
      :disable="readonly"
      @input="updateValue"
    />

    <div class="AppSelectWithOthers__allow_other">
      <QCheckbox
        :label="$lang('agnostic.components.appSelectWithOthers.others.label')"
        v-model="othersEnable"
        :disable="readonly"
      />
    </div>

    <QSelect
      outlined
      :label="$lang('agnostic.components.appSelectWithOthers.others.placeholder')"
      v-model="others"
      use-input
      use-chips
      multiple
      hide-dropdown-icon
      input-debounce="0"
      new-value-mode="add-unique"
      :disable="!othersEnable || readonly"
      @input="updateValue"
      @input-value="otherInputValue"
      @blur="parseOtherInputValue"
    />
    <div
      class="AppSelectWithOthers__error_message q-field__bottom"
      v-html="errorMessage"
    />
  </div>
</template>

<script>
import { QCheckbox, QOptionGroup, QSelect } from 'quasar'

export default {
  /**
   */
  name: 'AppSelectWithOther',
  /**
   */
  components: { QCheckbox, QOptionGroup, QSelect },
  /**
   */
  props: {
    value: {
      type: [Array, String],
      default: () => ([])
    },
    options: {
      type: Array,
      default: () => ([])
    },
    error: {
      type: Boolean,
      default: () => false
    },
    errorMessage: {
      type: String,
      default: () => undefined
    },
    readonly: {
      type: Boolean,
      default: () => false
    }
  },
  /**
   */
  data: () => ({
    othersEnable: false,
    others: [],
    selected: [],
    otherTyped: ''
  }),
  /**
   */
  computed: {
    /**
     * @return {{label: string, value: string|number|boolean}[]}
     */
    available () {
      if (!Array.isArray(this.options)) {
        return []
      }
      return [...this.options]
    }
  },
  methods: {
    /**
     * @param {string} value
     */
    otherInputValue (value) {
      this.otherTyped = value
    },
    /**
     */
    parseOtherInputValue () {
      const others = String(this.otherTyped)
        .split(',')
        .filter((other) => !!other.trim())
      this.others.push(...others)

      this.updateValue()
    },
    /**
     */
    updateValue () {
      const all = [...this.selected.filter((option) => option !== 'others'), ...this.others]
      this.$emit('input', all)
    }
  },
  /**
   */
  watch: {
    value: {
      immediate: true,
      handler (value) {
        if (typeof value === 'string') {
          try {
            value = JSON.parse(value)
          } catch (e) {
            // silent is gold
          }
        }
        if (!Array.isArray(value)) {
          return
        }
        const values = this.options.map((option) => option.value)
        this.selected = value.filter((value) => values.includes(value))
        this.others = value.filter((value) => !values.includes(value))
        if (this.others.length) {
          this.othersEnable = true
        }
      }
    }
  }
}
</script>

<style scoped>
.AppSelectWithOthers > .AppSelectWithOthers__error_message {
  display: none;
}

.AppSelectWithOthers.AppSelectWithOthers--has-error > .AppSelectWithOthers__error_message {
  display: block;
}

.AppSelectWithOthers.AppSelectWithOthers--has-error >>> .q-checkbox:not(.disabled) {
  color: var(--q-color-negative);
}

.AppSelectWithOthers.AppSelectWithOthers--has-error >>> .q-checkbox:not(.disabled) .q-checkbox__bg {
  border-color: var(--q-color-negative);
}

.AppSelectWithOthers > .AppSelectWithOthers__allow_other {
  margin: 0 0 0 8px;
}
</style>
