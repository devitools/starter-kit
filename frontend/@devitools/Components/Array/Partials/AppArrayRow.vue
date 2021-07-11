<template>
  <div
    class="AppArrayRow form form-grid"
    :class="classNames"
  >
    <template v-if="editable || fluent">
      <div class="AppArrayForm__form__inline field width-100">
        <!--suppress RequiredAttributes -->
        <AppForm
          ref="form"
          v-bind="bind"
          v-model="record"
          @input="updateRowValue($event)"
        />
        <div
          v-if="!fluent"
          class="AppArrayForm__actions"
        >
          <QBtn
            v-bind="$options.INTERNAL_ATTRS"
            icon="cancel"
            @click="resetRow"
          >
            <AppTooltip>{{ $lang('agnostic.components.array.reset') }}</AppTooltip>
          </QBtn>
          <QBtn
            v-bind="$options.INTERNAL_ATTRS"
            icon="done"
            @click="applyRow"
          >
            <AppTooltip>{{ $lang('agnostic.components.array.apply') }}</AppTooltip>
          </QBtn>
        </div>
      </div>
    </template>

    <template v-else>
      <template v-for="field in components">
        <div
          :key="field.$key"
          class="AppArrayForm__td"
          :class="field.$class"
        >
          <div class="AppArrayForm__td_value">
            <AppArrayValue
              :field="field"
              :value="value[field.$key]"
            />
          </div>
        </div>
      </template>
    </template>

    <div
      v-if="!readonly"
      v-show="!editable"
      class="AppArrayRow__buttons"
    >
      <div
        v-if="!fluent && !static"
        class="AppArrayForm__indicator"
      >
        <QBtn
          v-bind="$options.INTERNAL_ATTRS"
          round
          :icon="visible ? 'close' : indicator"
          @click="visible = !visible"
        />
      </div>
      <div
        v-if="!fluent"
        class="AppArrayForm__edit"
      >
        <QBtn
          v-bind="$options.INTERNAL_ATTRS"
          round
          icon="edit"
          @click="editRow"
        >
          <AppTooltip>{{ $lang('agnostic.components.array.edit') }}</AppTooltip>
        </QBtn>
      </div>
      <div
        v-if="!static"
        class="AppArrayForm__remove"
      >
        <QBtn
          v-bind="$options.INTERNAL_ATTRS"
          round
          icon="delete"
          @click="removeRow"
        >
          <AppTooltip>{{ $lang('agnostic.components.array.remove') }}</AppTooltip>
        </QBtn>
      </div>
    </div>
  </div>
</template>

<script>
import { QBtn } from 'quasar'

import { ICON_GROUP_ACTIONS, INTERNAL_ATTRS } from 'src/settings/action'

import $emporium from '../../../emporium'
import AppForm from '../../../Components/Form/AppForm'
import { SCOPES } from '../../../Agnostic/enum'
import { confirm } from '../../../dialog'

import AppArrayValue from './AppArrayValue'

export default {
  /**
   */
  name: 'AppArrayRow',
  /**
   */
  INTERNAL_ATTRS,
  /**
   */
  components: { AppArrayValue, AppForm, QBtn },
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
    hooks: {
      type: Function,
      required: true
    },
    primaryKey: {
      type: String,
      required: true
    },
    value: {
      type: Object,
      required: true
    },
    readonly: {
      type: Boolean,
      required: false
    },
    static: {
      type: Boolean,
      default: false
    },
    fluent: {
      type: Boolean,
      default: false
    },
    editable: {
      type: [Boolean, undefined],
      default: false
    },
    indicator: {
      type: String,
      default: ICON_GROUP_ACTIONS
    },
    scope: {
      type: String,
      default: () => SCOPES.SCOPE_ADD
    },
    name: {
      type: String,
      default: ''
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
  data: () => ({
    components: {},
    record: {},
    visible: false
  }),
  /**
   */
  computed: {
    /**
     * @return {Record<string, unknown>}
     */
    bind () {
      return {
        builtin: true,
        'debugger-allowed': false,
        domain: this.domain,
        fields: this.fields,
        'filler-allowed': false,
        hooks: this.hooks,
        primaryKey: this.primaryKey,
        scope: this.scope,
        overrides: this.overrides
      }
    },
    /**
     * @return {Record<string, boolean>}
     */
    classNames () {
      return {
        'AppArrayRow--buttons-visible': this.visible,
        'AppArrayRow--readonly': this.readonly,
        'AppArrayRow--static': this.static,
        'AppArrayRow--fluent': this.fluent
      }
    }
  },
  /**
   */
  methods: {
    /**
     */
    resetRow () {
      this.$emit('edit', false)
      if (this.record.__new) {
        this.cancelRow()
      }
      this.record = {}
    },
    /**
     */
    async removeRow () {
      if (this.fluent) {
        this.$emit('remove')
        return
      }

      try {
        await confirm(this.$lang('agnostic.components.array.confirm'))
      } catch (e) {
        return
      }
      this.$emit('remove')
    },
    /**
     */
    cancelRow () {
      this.$emit('cancel')
    },
    /**
     */
    editRow () {
      this.$emit('edit', true)
      this.record = this.$util.clone(this.value)
    },
    /**
     */
    applyRow () {
      let ref = this.$refs.form
      if (!ref) {
        return
      }
      if (Array.isArray(ref)) {
        ref = ref[0]
      }
      ref.$v.$touch()

      if (ref.$v.$error) {
        return
      }

      const value = this.$util.clone(this.record)
      this.record = {}
      this.updateValue(value)
      this.$emit('edit', false)
    },
    /**
     * @param {Record<string, unknown>} input
     */
    updateRowValue (input) {
      if (!this.fluent) {
        $emporium.commit('updatePending', this.name)
        return
      }
      this.$emit('input', input)
    },
    /**
     * @param {Record<string, unknown>} input
     */
    updateValue (input) {
      $emporium.commit('updatePending', '')
      this.$emit('input', input)
    },
    /**
     * @param {Field} field
     */
    generateClassNames (field) {
      const classNames = [
        'field',
        field.$layout.formWidth ? `width-${field.$layout.formWidth}` : 'width-100',
        `$key-${field.$key}`
      ]
      if (field.attrs.uppercase) {
        classNames.push('text-uppercase')
      }
      return classNames
    },
    /**
     */
    updateComponents () {
      this.components = Object.values(this.fields())
        .filter((field) => {
          if (field.hasOwnProperty('$visible')) {
            return field.$visible.call(this)
          }
          if (!field.scopes.includes(this.scope)) {
            return false
          }
          return !field.$layout.formHidden
        })
        .map((component) => {
          const $class = this.generateClassNames(component, true)
          return { ...component, $class }
        })
    }
  },
  /**
   */
  watch: {
    value: {
      immediate: true,
      handler (value) {
        if (!this.fluent) {
          return
        }
        this.record = value
      }
    },
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
>
@import './app-array-include.styl'

.desktop .AppArrayRow:hover, .AppArrayRow.AppArrayRow--buttons-visible {
  .AppArrayRow__buttons {
    .AppArrayForm__edit, .AppArrayForm__remove {
      display: inline-block;
      padding: 0 5px;
    }
  }
}

.AppArrayRow.AppArrayRow--buttons-visible {
  .AppArrayRow__buttons {
    width: 132px;
  }
}

.desktop .AppArrayRow:hover {
  .AppArrayForm__indicator {
    display: none;
  }
}

.desktop .AppArrayRow:not(.AppArrayRow--static):not(.AppArrayRow--fluent):hover {
  .AppArrayRow__buttons {
    // 88px is enough
    width: 90px;
  }
}

.AppArrayRow {
  position: relative;
  padding: 2px 5px !important;

  > .AppArrayForm__form__inline {
    padding: 0 !important;
    > .AppForm > .AppForm__wrapper > .AppForm__body > .form {
      padding: 0 !important;
    }
}

  @extend .AppArray__element--color
  border-width: 1px 0 0 0;

  .AppArrayForm__form__inline {
    position: relative;

    .AppArrayForm__actions {
      @extend .AppArray__element--color
      border-width: 1px 0 0 0;
      padding: 2px;
      margin: 0 -5px;

      button {
        margin: 0 5px 0 0;
      }
    }
  }

  .AppArrayRow__buttons {
    @extend .AppArray__element--color
    border-width: 1px;
    border-radius: 2px;
    position: absolute;
    margin: 4px 0 0 -18px;
    background: #ffffff;
    z-index: 1000;
    width: 36px;
    height: 36px;
    overflow: hidden;
    transition: width .3s;

    .AppArrayForm__indicator {
      display: inline-block;
    }

    .AppArrayForm__edit, .AppArrayForm__remove {
      display: none;
      background: #ffffff;
    }
  }

  .AppArrayForm__td {
    &.field {
      padding: 4px 5px !important;
    }

    > .AppArrayForm__td_value {
      width: 100%;

      .uppercase {
        text-transform: uppercase !important;
      }
    }
  }

  &:not(.AppArrayRow--readonly) {
    .AppArrayForm__td {
      &.field:first-child {
        // #padding
        padding: 4px 5px 5px 24px !important;
      }
    }
  }

  &.AppArrayRow--static {
    .AppArrayRow__buttons .AppArrayForm__edit {
      display: inline-block !important;
      padding: 0 !important;
    }
  }

  &.AppArrayRow--fluent {
    .field-error {
      display: none;
    }

    .AppArrayRow__buttons .AppArrayForm__remove {
      display: inline-block !important;
      padding: 0 !important;
    }

    .AppArrayForm__form__inline {
      > .AppForm > .AppForm__wrapper > .AppForm__body > .form > .field:not(.hide) {
        // #padding
        padding-left: 18px;
      }

      .AppForm > .AppForm__wrapper > .AppForm__body > .form > .field:not(.hide) ~ .field:not(.hide) {
        padding-left: 5px !important;
      }
    }
  }
}
</style>
