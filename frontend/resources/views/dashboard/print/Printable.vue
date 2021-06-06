<template>
  <div
    class="Printable"
    style="margin: 0 auto; max-width: 810px;"
  >
    <img
      :src="$static('/logo/horizontal-300x120.png')"
      alt="logo"
      style="height: 50px"
      class="float-left"
    >
    <QIcon
      name="close"
      size="2rem"
      class="float-right cursor-pointer"
      @click="close"
    />
    <br style="clear: both">
    <h6>{{ $lang(`domains.${domain}.print.title`) }}</h6>
    <div
      class="form form-grid no-break"
    >
      <div
        v-for="(component, key) in components"
        :key="key"
        :class="`field width-${component.$layout.formWidth}`"
      >
        <label>{{ label(key) }}:</label> &nbsp; {{ value(record, key) }}
      </div>
    </div>

    <div
      v-for="(component, key) in arrays"
      :key="key"
      style="margin: 15px 0; border-top: 1px solid #333"
    >
      <label>{{ label(key) }}</label>
      <PrintableArray
        :component="component"
        :items="value(record, key)"
      />
    </div>
    <div
      class="flex"
      style="justify-content: space-between; margin: 15px 0; border-top: 1px solid #333"
    >
      <small><strong>{{ $lang('app.print.user') }}:</strong> &nbsp; {{ name }}</small>
      <small><strong>{{ $lang('app.print.date') }}:</strong> &nbsp; {{ now }}</small>
    </div>
    <div
      v-if="signatures.length"
      class="flex"
      style="justify-content: space-around; margin-top: 40px;"
    >
      <div
        v-for="(signature, index) in signatures"
        :key="index"
        class="text-center"
      >
        <div>_______________________________________</div>
        <div>{{ signature }}</div>
      </div>
    </div>
    <QIcon
      name="print"
      size="1.8rem"
      class="float-right cursor-pointer"
      @click="print"
    />
  </div>
</template>

<script>
import { QIcon } from 'quasar'
import { datetimeFormatter } from '@devitools/Util/formatter'
import { now } from '@devitools/Util/date'
import PrintableMixin from 'resources/views/dashboard/print/PrintableMixin'
import PrintableArray from 'resources/views/dashboard/print/PrintableArray'

export default {
  /**
   */
  name: 'Printable',
  /**
   */
  components: { PrintableArray, QIcon },
  /**
   */
  mixins: [PrintableMixin],
  /**
   */
  computed: {
    /**
     * @returns {string}
     */
    name () {
      return this.$util.get(this.$store.getters['auth/getUser'], 'name')
    },
    /**
     * @returns {string}
     */
    now () {
      return datetimeFormatter(now())
    },
    /**
     * @returns {Object}
     */
    components () {
      const components = this.$util.get(this.$store.getters['app/getPrint'], 'components')
      if (!components) {
        return {}
      }
      return Object.keys(components).reduce((accumulator, key) => {
        const hidden = (components[key].$layout.formHidden || components[key].$type === 'array')
        if (hidden && !components[key].attrs.printable) {
          return accumulator
        }
        accumulator[key] = components[key]
        return accumulator
      }, {})
    },
    /**
     * @returns {Object}
     */
    arrays () {
      const components = this.$util.get(this.$store.getters['app/getPrint'], 'components')
      if (!components) {
        return {}
      }
      return Object.keys(components).reduce((accumulator, key) => {
        if (components[key].$layout.formHidden || components[key].$type !== 'array') {
          return accumulator
        }
        accumulator[key] = components[key]
        return accumulator
      }, {})
    },
    /**
     * @returns {Object}
     */
    domain () {
      return this.$util.get(this.$store.getters['app/getPrint'], 'domain', '')
    },
    /**
     * @returns {Object}
     */
    record () {
      return this.$util.get(this.$store.getters['app/getPrint'], 'record', {})
    },
    /**
     * @returns {Array}
     */
    signatures () {
      const signatures = this.$lang(`domains.${this.domain}.print.signatures`)
      if (!Array.isArray(signatures)) {
        return []
      }
      return signatures
    }
  },
  /**
   */
  created () {
    document.body.classList.add('printing')
  },
  /**
   */
  destroyed () {
    document.body.classList.remove('printing')
  },
  /**
   */
  methods: {
    /**
     */
    close () {
      this.$store.dispatch('app/setPrint', undefined)
    },
    /**
     */
    print () {
      window.print()
    }
  }
}
</script>

<style
  lang="stylus"
  scoped
>
label
  font-weight bold

h6
  line-height normal
  letter-spacing normal
  padding 15px 0
  border-width 1px 0
  border-color #333
  border-style solid
  margin 10px 0

@media print
  .q-icon
    display none
</style>
