// noinspection ES6CheckImport
import { QBtnDropdown } from 'quasar'

/**
 * @typedef {Object} SchemaButtonDropdown
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {function} h
     * @param {Object} data
     * @returns {*}
     */
    renderButtonDropdown (h, data) {
      // TODO: implement dropdown items
      /*
      <q-list link>
        <q-item
          v-bind="button.attrs"
          v-for="(action, key) in button.actions"
          :key="key"
          v-close-overlay
          @click.native="action.native"
        >
          <q-item-main>
            <q-item-tile label>{{ action.label }}</q-item-tile>
          </q-item-main>
        </q-item>
      </q-list>
      */
      data.attrs.split = true

      return h(QBtnDropdown, data)
    }
  }
}
