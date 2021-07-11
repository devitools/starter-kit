<!--suppress ES6ModulesDependencies -->
<template>
  <div class="AppBuiltinFormContainer">
    <div class="AppBuiltinFormContainer__bar">
      <span>{{ title }}</span>
    </div>
    <AppBuiltinForm
      ref="form"
      v-bind="$props"
      :scope="scope"
      :value="item"
      :builtin="true"
      :debugger-allowed="false"
      @input="$emit('update:item', $event)"
      @action="$emit('action', $event)"
      @broadcast:action="$emit('broadcast:action', $event)"
    />
  </div>
</template>

<script>
import Props from '../../Schema/Contracts/Props'
import AppBuiltinForm from './AppBuiltinForm'

import { APP_BUILT_IN_DEFAULT_TABLE_HEIGHT, references } from '../settings'

export default {
  /**
   */
  name: 'AppBuiltinFormContainer',
  /**
   */
  components: {
    AppBuiltinForm
  },
  /**
   */
  mixins: [Props],
  /**
   */
  props: {
    item: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    scope: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: APP_BUILT_IN_DEFAULT_TABLE_HEIGHT
    },
    readonly: {
      type: Boolean,
      default: false
    },
    overrides: {
      type: Object,
      default: () => ({
        fields: () => undefined,
        actions: () => undefined
      })
    }
  },
  /**
   */
  computed: {
    title () {
      if (this.label) {
        return this.label
      }
      const reference = references[this.scope]
      const paths = [
        `domains.${this.domain}.components.builtin.form.${reference}`,
        `domains.${this.domain}.components.builtin.form.${this.scope}`,
        `agnostic.components.builtin.form.${reference}`
      ]
      return this.$lang(paths)
    }
  },
  /**
   */
  data: () => ({
    record: {}
  }),
  /**
   */
  methods: {
    /**
     */
    closeForm () {
      this.$emit('update:active', false)
    },
    /**
     * @return {Boolean}
     */
    isValidForm () {
      this.$refs.form.$v.$touch()
      const erroAutomatic = this.$refs.form.$v.$error
      const errorManual = this.$refs.form.hasErrors()

      return !!(!erroAutomatic && !errorManual)
    }
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
>
.AppBuiltinFormContainer {
  min-height: 300px;

  > .AppBuiltinFormContainer__bar {
    height: 50px;
    min-height: 50px;
    max-height: 50px;
    padding: 10px;
    border-width: 0 0 1px 0;
    border-style: solid;
    border-color: #ddd;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
    background: var(--q-color-primary);
    color: #ffffff;
  }

  > .AppBuiltinForm {
    background: #ffffff;

    > .AppBuiltinForm__wrapper {
      min-height: 250px;

      > .AppBuiltinForm__body {
        overflow: auto;
        min-height: 190px;
        padding: 10px;
      }

      > .app-form-buttons {
        padding: 10px;
        border-width: 1px 0 0 0;
        border-style: solid;
        border-color #dddddd;

        > button {
          padding: 4px;
          margin: 0 10px 0 0;
          font-size: 0.8rem;
          min-width: 140px;

          &.button-position-right {
            float: right;
          }

          &.button-position-left {
            float: left;
          }

          &.button-position-none {
            float: none;
          }

          &.button-no-min-width {
            min-width: auto !important;
          }
        }
      }
    }
  }
}

@media (max-width 1200px) {
  .AppBuiltinFormContainer > .AppBuiltinForm > .AppBuiltinForm__wrapper > .app-form-buttons > button:not(.button-no-min-width) {
    min-width: auto;
  }
}

@media (max-width 768px) {
  .AppBuiltinFormContainer > .AppBuiltinForm > .AppBuiltinForm__wrapper > .app-form-buttons > button {
    > .q-btn__wrapper > .q-btn__content > span {
      display: none !important;
    }
  }
}
</style>
