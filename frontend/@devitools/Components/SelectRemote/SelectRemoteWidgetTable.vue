<template>
  <div class="SelectRemoteWidgetTable">
    <AppTable
      class="SchemaTable"
      :columns="columns"
      :data="data"
      :dense="$q.platform.is.desktop"
      :filter="filter"
      :loading="loading"
      :pagination.sync="pagination"
      :selected.sync="selected"
      :visible-columns="visibleColumns"
      @request="onRequest"
      binary-state-sort
      row-key="uuid"
      selection="multiple"
    >
      <template v-slot:top-left>
        <div class="SelectRemoteWidgetTable__buttons">
          <QBtn
            icon="done"
            color="default"
            flat
            dense
            @click="onConfirm"
          >
            <AppTooltip>{{ $lang('agnostic.components.remote.confirm') }}</AppTooltip>
          </QBtn>
          <QBtn
            icon="clear_all"
            color="default"
            flat
            dense
            @click="onClear"
          >
            <AppTooltip>{{ $lang('agnostic.components.remote.clear') }}</AppTooltip>
          </QBtn>
          <QBtn
            icon="clear"
            color="default"
            flat
            dense
            @click="onCancel"
          >
            <AppTooltip>{{ $lang('agnostic.components.remote.cancel') }}</AppTooltip>
          </QBtn>
        </div>
      </template>
      <template v-slot:top-right>
        <QInput
          :placeholder="$lang('agnostic.components.remote.search')"
          debounce="300"
          v-model="filter"
          v-bind="defaultAttrs"
        >
          <template v-slot:append>
            <QIcon name="search" />
          </template>
        </QInput>
      </template>
    </AppTable>
  </div>
</template>

<script>
import { attrs } from 'src/settings/components'

export default {
  /**
   */
  name: 'SelectRemoteWidgetTable',
  /**
   */
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    data: {
      type: Array,
      default: () => ([])
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    visibleColumns: {
      type: Array,
      default: () => ([])
    },
    search: {
      type: String,
      default: ''
    }
  },
  /**
   */
  data () {
    return {
      defaultAttrs: attrs,
      selected: [],
      filter: '',
      loading: false,
      pagination: {
        sortBy: '',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      }
    }
  },
  /**
   */
  mounted () {
    // get initial data from server (1st page)
    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })
  },
  /**
   */
  methods: {
    /**
     */
    onConfirm () {
      this.$emit('confirm', this.selected)
    },
    /**
     */
    onCancel () {
      this.$emit('cancel')
    },
    /**
     */
    onClear () {
      this.selected = []
    },
    /**
     * @param {Object} props
     */
    onRequest (props) {
      const { page, rowsPerPage, rowsNumber, sortBy, descending } = props.pagination
      const filter = props.filter
      this.loading = true
      const done = (pagination = {}) => {
        this.loading = false
        Object.keys(pagination).forEach((prop) => {
          this.pagination[prop] = pagination[prop]
        })
      }
      this.$emit('request', { filter, page, rowsPerPage, rowsNumber, sortBy, descending, done })
    }
  },
  /**
   */
  watch: {
    value: {
      immediate: true,
      handler (value) {
        if (!Array.isArray(value)) {
          this.selected = []
          return
        }
        this.selected = this.$util.clone(value)
      }
    },
    /**
     */
    search () {
      this.onRequest({ filter: '', pagination: { ...this.pagination } })
    }
  }
}
</script>

<style lang="stylus">
.SelectRemoteWidgetTable
  position relative

  .SchemaTable
    &.q-table__card
      box-shadow none

    .q-table__top
      padding 12px 0

    .q-table__middle
      min-height 340px
      border-width 0 1px 1px 1px
      border-style solid
      border-color #c2c2c2
      border-radius 4px
      height calc(100vh - 195px) !important

    .q-table__bottom
      border none

.q-dialog__inner--maximized
  .SelectRemoteWidgetTable
    > .SchemaTable
      .q-table__middle
        height calc(100vh - 150px) !important

.AppSelectRemote__widget
  .SchemaTableWhere__side
    .app-form-buttons
      min-height 58px
</style>
