<template>
  <AppTable
    class="AppTableRaw"
    :class="{ 'AppTableRaw--readonly': readonly }"
    :style="{ height }"
    :title="title"
    :dense="dense"
    :row-key="rowKey"
    :pagination="pagination"
    :hide-bottom="hideBottom"
    :data="rows"
    :columns="columns"
  >
    <template v-slot:body-cell-actions="props">
      <QTd
        :props="props"
        :style="{ padding: 0 }"
      >
        <template v-for="(action, key) in actions">
          <QBtn
            :key="key"
            flat
            dense
            round
            v-bind="action"
            @click="execute(action, props.row)"
          />
        </template>
        <QBtn
          v-if="isRemovable(props)"
          icon="delete"
          flat
          dense
          round
          color="grey-8"
          @click="remove(index(props))"
        />
      </QTd>
    </template>
  </AppTable>
</template>

<script>
import { QBtn, QTd } from 'quasar'
import { SCOPES } from '../../Agnostic/enum'

import Dialog from '../Schema/Contracts/Dialog'
import Field from '../Schema/Contracts/Field'
import TableColumns from '../Schema/Contracts/Table/TableColumns'

import AppTable from './AppTable'

export default {
  /**
   */
  name: 'AppTableRaw',
  /**
   */
  mixins: [Dialog, Field, TableColumns],
  /**
   */
  components: {
    AppTable,
    QTd,
    QBtn
  },
  /**
   */
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    readonly: {
      type: Boolean,
      default: () => false
    },
    title: {
      type: String,
      default: () => ('')
    },
    rowKey: {
      type: String,
      default: () => ('id')
    },
    height: {
      type: String,
      default: () => ('')
    },
    rowsPerPage: {
      type: Number,
      default: () => 100
    },
    hideBottom: {
      type: Boolean,
      default: () => false
    },
    providing: {
      type: Function,
      default: () => undefined
    },
    scope: {
      type: String,
      default: () => SCOPES.SCOPE_INDEX
    },
    dense: {
      type: Boolean,
      default: () => true
    }
  },
  /**
   */
  data () {
    return {
      rows: [],
      lastIndex: null,
      pagination: {
        page: 1,
        rowsPerPage: this.rowsPerPage
      },
      columns: [],
      override: {},
      domain: '',
      fields: () => ({})
    }
  },
  /**
   */
  methods: {
    execute (action, row) {
      this.$emit('execute', { action, row })
    },
    /**
     * @param {number} index
     * @return {Promise<void>}
     */
    async remove (index) {
      const remove = () => {
        const rows = [...this.rows]
        const removed = rows.splice(index, 1)
        this.$emit('remove', removed)
        this.$emit('input', rows)
      }

      if (!this.confirm) {
        remove()
        return
      }

      try {
        const confirm = await this.$confirm(this.confirm)
        if (confirm) {
          remove()
        }
      } catch (e) {
        // silent is gold
      }
    },
    /**
     * @param {Record<string, unknown>} row
     */
    add (row) {
      const rows = [...this.rows]
      rows.push(row)
      this.$emit('input', rows)
    },
    /**
     * @param {Record<string, unknown>} row
     */
    isRemovable ({ row }) {
      if (this.hideRemove) {
        return false
      }
      if (typeof this.removable !== 'function') {
        return true
      }
      const isRemovable = this.removable(row)
      if (isRemovable === undefined) {
        return true
      }
      return isRemovable
    },
    /**
     * @param {Record<string,unknown>} props
     * @return {number}
     */
    index (props) {
      if (!Array.isArray(this.rows)) {
        return -1
      }
      return this.rows.findIndex((row) => String(props.row[this.rowKey]) === String(row[this.rowKey]))
    }
  },
  /**
   */
  watch: {
    value: {
      immediate: true,
      handler (value) {
        if (!Array.isArray(value)) {
          return
        }
        this.rows = value
      }
    },
    providing: {
      immediate: true,
      handler (providing) {
        if (typeof providing !== 'function') {
          return
        }
        const provide = providing()

        const { fields, domain } = provide
        this.domain = domain
        this.fields = fields

        this.renderColumns({ useCounter: false })
      }
    }
  }
}
</script>

<style>
.has-error > .AppTableRaw {
  background: rgba(255, 225, 220, 0.7);
}

.AppTableRaw {
  box-shadow: none;
  border: 1px solid #c2c2c2;
}

.AppTableRaw.AppTableRaw--readonly {
  border-style: dotted;
}

.AppTableRaw thead {
  position: sticky;
  zoom: 1;
  top: 0;
  overflow: hidden;
  z-index: 1000;
  background: linear-gradient(180deg, #fbfbfb 0, #f7f7f7 20%, #f1f1f1 50%, #efefef 100%);
}
</style>
