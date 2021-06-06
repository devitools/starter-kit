<template>
  <div
    class="AppArrayHead form form-grid"
    :class="{'AppArrayHead--readonly': readonly}"
  >
    <template v-for="field in components">
      <div
        :key="field.$key"
        class="AppArrayForm__th app-form__label"
        :class="field.$class"
      >
        <label>{{ field.$label }}</label>
      </div>
    </template>
  </div>
</template>

<script type="text/javascript">
import { SCOPES } from '@devitools/Agnostic/enum'

export default {
  /**
   */
  name: 'AppArrayHead',
  /**
   */
  props: {
    domain: {
      type: String,
      required: true
    },
    fields: {
      type: Function,
      required: true
    },
    readonly: {
      type: Boolean,
      required: false
    },
    scope: {
      type: String,
      default: () => SCOPES.SCOPE_ADD
    }
  },
  /**
   */
  data: () => ({
    components: []
  }),
  /**
   */
  methods: {
    /**
     * @param {Field} field
     */
    generateClassNames (field) {
      return [
        'field',
        field.$layout.formWidth ? `width-${field.$layout.formWidth}` : 'width-100',
        `$key-${field.$key}`
      ]
    },
    /**
     */
    updateComponents () {
      const components = Object.values(this.fields()).filter((field) => {
        if (field.hasOwnProperty('$visible')) {
          return field.$visible.call(this)
        }

        if (!field.scopes.includes(this.scope)) {
          return false
        }
        return !field.$layout.formHidden
      })

      this.components = components
        .map((component) => {
          return {
            $key: component.$key,
            $class: this.generateClassNames(component),
            $label: this.$lang([
              `domains.${this.domain}.fields.${component.$key}.label`,
              `domains.${this.domain}.fields.${component.$key}`
            ])
          }
        })
    }
  },
  /**
   */
  watch: {
    fields: {
      immediate: true,
      deep: true,
      handler () {
        this.updateComponents()
      }
    },
    scope: {
      immediate: true,
      handler () {
        this.updateComponents()
      }
    }
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  scoped
>
.AppArrayHead {
  .AppArrayForm__th {
    padding: 6px !important;
  }

  &:not(.AppArrayHead--readonly) {
    .AppArrayForm__th:first-child {
      // #padding
      padding: 6px 6px 6px 24px !important;
    }
  }
}

</style>
