<template>
  <AppTable
    class="AppTableStatic"
    ref="table"
    :selection="selection"
    :style="{ height }"
    :title="title"
    :data="data"
    :columns="fields"
    :row-key="rowKey"
    :selected.sync="selected"
    :pagination="pagination"
  >
    <template v-slot:body-cell-actions="props">
      <QTd
        :props="props"
        :style="{ padding: 0 }"
      >
        <template v-for="(button, index) in actions">
          <QBtn
            :key="index"
            :icon="button.icon"
            flat
            dense
            round
            color="grey-8"
            @click="$emit(button.name, props.row)"
          />
        </template>
      </QTd>
    </template>
  </AppTable>
</template>

<script>
import AppTable from './AppTable'
import { QBtn, QTd } from 'quasar'

export default {
  /**
   */
  name: 'AppTableStatic',
  /**
   */
  components: {
    AppTable,
    QBtn,
    QTd
  },
  props: {
    title: {
      type: String,
      default: () => ('')
    },
    rowKey: {
      type: String,
      default: () => ('id')
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    actions: {
      type: Array,
      default: () => ([])
    },
    data: {
      type: Array,
      default: () => ([])
    },
    height: {
      type: String,
      default: () => ('')
    },
    rowsPerPage: {
      type: Number,
      default: () => 100
    },
    selection: {
      type: String,
      default: () => ('multiple')
    }
  },
  /**
   * @return {{lastIndex: null, selected: []}}
   */
  data () {
    return {
      selected: [],
      lastIndex: null,
      pagination: {
        page: 1,
        rowsPerPage: this.rowsPerPage
      }
    }
  },
  /**
   */
  computed: {
    fields () {
      if (this.actions.length) {
        const actions = {
          name: 'actions',
          label: '*',
          sortable: false,
          required: true,
          align: 'left',
          style: 'width: 50px'
        }
        return [actions, ...this.columns]
      }
      return this.columns
    }
  },
  /**
   */
  watch: {
    selected () {
      this.$emit('input', this.selected)
    }
  }
}
</script>

<style scoped>
.AppTableStatic {
  box-shadow: none;
  border: 1px solid #c2c2c2;
}
</style>
