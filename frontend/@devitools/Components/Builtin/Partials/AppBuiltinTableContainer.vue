<!--suppress ES6ModulesDependencies -->
<template>
  <AppBuiltinTable
    class="AppBuiltinTableContainer"
    v-bind="bind"
    :scope="scope"
    :value="items"
    :builtin="true"
    :debugger-allowed="false"
    :size="size"
    selection="none"
    @action="$emit('action', $event)"
    @broadcast:action="$emit('broadcast:action', $event)"
  />
</template>

<script type="text/javascript">
import { SCOPES_BUILTIN } from '../../../Agnostic/enum'

import Props from '../../Schema/Contracts/Props'
import AppBuiltinTable from './AppBuiltinTable'
import { APP_BUILT_IN_DEFAULT_TABLE_HEIGHT } from '../settings'

export default {
  /**
   */
  name: 'AppBuiltinTableContainer',
  /**
   */
  mixins: [Props],
  /**
   */
  components: { AppBuiltinTable },
  /**
   */
  props: {
    items: {
      type: Array,
      required: true
    },
    height: {
      type: String,
      default: APP_BUILT_IN_DEFAULT_TABLE_HEIGHT
    },
    size: {
      type: Number,
      default: 10
    },
    readonly: {
      type: Boolean,
      default: false
    },
    headless: {
      type: Boolean,
      default: false
    }
  },
  /**
   */
  computed: {
    /**
     * @return {Array}
     */
    fieldsParsed () {
      return this.fields.map((field) => this.parseField(field))
    },
    /**
     * @return {string}
     */
    emptyHeight () {
      return `calc(${this.height} - ${this.emptyHeightCompensation})`
    },
    /**
     * @return {*}
     */
    bind () {
      return {
        headless: this.headless,
        readonly: this.readonly,
        actions: this.$props.actions || this.$attrs.actions,
        builtin: this.$props.builtin || this.$attrs.builtin,
        debuggerAllowed: this.$props.debuggerAllowed || this.$attrs.debuggerAllowed,
        displayKey: this.$props.displayKey || this.$attrs.displayKey,
        domain: this.$props.domain || this.$attrs.domain,
        fields: this.$props.fields || this.$attrs.fields,
        form: this.$props.form || this.$attrs.form,
        groupType: this.$props.groupType || this.$attrs.groupType,
        groups: this.$props.groups || this.$attrs.groups,
        height: this.$props.height || this.$attrs.height,
        hooks: this.$props.hooks || this.$attrs.hooks,
        path: this.$props.path || this.$attrs.path,
        primaryKey: this.$props.primaryKey || this.$attrs.primaryKey,
        scope: this.$props.scope || this.$attrs.scope,
        selection: this.$props.selection || this.$attrs.selection,
        settings: this.$props.settings || this.$attrs.settings,
        size: this.$props.size || this.$attrs.size,
        table: this.$props.table || this.$attrs.table,
        value: this.$props.value || this.$attrs.value,
        watches: this.$props.watches || this.$attrs.watches
      }
    }
  },
  /**
   */
  data: () => ({
    scope: SCOPES_BUILTIN.SCOPE_BUILTIN_INDEX
  }),
  /**
   */
  methods: {
    /**
     */
    addItem () {
      this.formActive = true
    },
    /**
     * @param {Object} field
     * @return {Object}
     */
    parseField (field) {
      const paths = [
        `domains.${this.domain}.fields.${field.$key}.label`,
        `domains.${this.domain}.fields.${field.$key}`
      ]
      const label = this.$lang(paths)
      const textAlign = field.attrs.align ? field.attrs.align : 'left'
      const type = field.$type

      return {
        key: field.$key,
        label,
        textAlign,
        type
      }
    }
  }
}
</script>

<style lang="stylus">
.AppBuiltinTableContainer {
  min-height: 300px;

  > .q-table__container {
    min-height: 300px;

    .q-table__middle {
      height: auto;
    }

    > .q-table__top {
      height: 50px;
      min-height: 50px;
      max-height: 50px;

      & > .app-form-buttons {
        display: flex;
      }
    }
  }
}
</style>
