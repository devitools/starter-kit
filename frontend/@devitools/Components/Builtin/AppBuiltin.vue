<!--suppress ES6ModulesDependencies -->
<template>
  <div class="AppBuiltin">
    <QDialog
      class="AppBuiltinFormModal__container"
      v-model="formActive"
      persistent
    >
      <div
        class="AppBuiltinFormModal__container__wrapper"
        :domain="attributes.domain"
      >
        <AppBuiltinFormContainer
          ref="form"
          v-if="formActive"
          v-bind="attributes"
          :active.sync="formActive"
          :scope="scope"
          :item.sync="item"
          @action="resolveAction"
          @broadcast:action="$emit('broadcast:action', $event)"
        />
      </div>
    </QDialog>

    <div
      class="AppBuiltinTable__container"
      :class="{ 'AppBuiltinTable__container--hidden': formActive }"
      :domain="attributes.domain"
    >
      <AppBuiltinTableContainer
        v-bind="attributes"
        :items="items"
        @action="resolveAction"
        @broadcast:action="$emit('broadcast:action', $event)"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import { QDialog } from 'quasar'
import { displayKey, primaryKey } from 'src/settings/schema'

import { SCOPES_BUILTIN, scopesBuiltin } from '../../Agnostic/enum'

import Handler from './Mixin/AppBuiltinActionHandler'

import AppBuiltinTableContainer from './Partials/AppBuiltinTableContainer'
import AppBuiltinFormContainer from './Partials/AppBuiltinFormContainer'

import { APP_BUILT_IN_DEFAULT_TABLE_HEIGHT } from './settings'

export default {
  /**
   */
  name: 'AppBuiltin',
  /**
   */
  mixins: [Handler],
  /**
   */
  components: {
    QDialog,
    AppBuiltinFormContainer,
    AppBuiltinTableContainer
  },
  /**
   */
  props: {
    providing: {
      type: Function,
      required: true
    },
    builtin: {
      type: Boolean,
      default: true
    },
    debuggerAllowed: {
      type: Boolean,
      default: true
    },
    value: {
      type: Array,
      default: () => ([])
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: APP_BUILT_IN_DEFAULT_TABLE_HEIGHT
    },
    size: {
      type: Number,
      default: 10
    },
    defaults: {
      type: Object,
      default: () => ({})
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
  data () {
    return {
      scope: SCOPES_BUILTIN.SCOPE_BUILTIN_INDEX,
      path: '',
      domain: '',
      table: {},
      form: {},
      settings: {},
      primaryKey: primaryKey,
      displayKey: displayKey,
      fields: () => ({}),
      groups: () => () => ({}),
      actions: () => ({}),
      hooks: () => ({}),
      watches: () => ({})
    }
  },
  /**
   */
  computed: {
    /**
     * @return {*}
     */
    attributes () {
      return {
        ...this.$attrs,
        ...this.$props,
        debuggerAllowed: false,
        path: this.path,
        table: this.table,
        form: this.form,
        settings: this.settings,
        primaryKey: this.primaryKey,
        displayKey: this.displayKey,
        groupType: this.groupType,
        fields: this.fields,
        groups: this.groups,
        actions: this.builtinActions,
        hooks: this.hooks,
        watches: this.watches,
        domain: this.domain,
        overrides: this.overrides
      }
    }
  },
  /**
   */
  methods: {
    /**
     * @return {Array}
     */
    builtinActions () {
      const allowed = scopesBuiltin()
      const on = (action) => {
        const reduce = (accumulator, event) => {
          const handler = function (parameters) {
            this.$emit('action', {
              $key: action.$key,
              event,
              parameters
            })
          }
          return {
            ...accumulator,
            [event]: handler
          }
        }
        return Object.keys(action.on).reduce(reduce, {})
      }

      return this.actions()
        .filter((action) => allowed.includes(...action.scopes))
        .map((action) => {
          const mapped = { ...action }
          mapped.on = on(action)
          return mapped
        })
    }
  },
  watch: {
    providing: {
      immediate: true,
      handler (providing) {
        const provide = providing()

        this.path = provide['path']
        this.domain = provide['domain']
        this.table = provide['table']
        this.form = provide['form']
        this.settings = provide['settings']
        this.primaryKey = provide['primaryKey']
        this.displayKey = provide['displayKey']
        this.fields = provide['fields']
        this.groupType = provide['groupType']
        this.groups = provide['groups']
        this.actions = provide['actions']
        this.hooks = provide['hooks']
        this.watches = provide['watches']
      }
    },
    actions: {
      immediate: true,
      handler () {
        this.listeners = this.actions().reduce((accumulator, action) => {
          return {
            ...accumulator,
            [action.$key]: { ...action.on }
          }
        }, {})
      }
    }
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
>
.AppBuiltin {
  border-width: 1px;
  border-style: solid;
  border-color: #ddd;
  border-radius: 4px;
  position: relative;
  overflow-x: hidden;
  min-height: 300px;

  .AppBuiltinTable__container {
    position: relative;
    overflow: hidden;
    opacity: 1;
    transition: opacity 0.5s;

    &.AppBuiltinTable__container--hidden {
      opacity: 0.8;
    }
  }

  .AppBuiltinForm__container {
    position: absolute;
    top: 0;
    height 100%
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9000;
    overflow: auto;

    background: #fff;
    box-shadow: 0 0 4px 2px #ddd;
    transform: translateX(100vw);
    transition: transform 0.250s;

    &.AppBuiltinForm__container--active {
      transform: translateX(0);
    }
  }
}

.AppBuiltinFormModal__container__wrapper {
  width: 1024px;
  max-width: unset !important;
  max-height: 90vw;
}
</style>
