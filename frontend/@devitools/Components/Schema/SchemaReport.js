import FileSaver from 'file-saver'
import { primaryKey } from 'src/settings/schema'
import { reportAction, reportContext, reportDownload, reportLoading, reportMethod } from 'src/settings/report'
// app
import { POSITIONS } from '../../Agnostic/enum'
// mixins
import Dynamic from './Contracts/Dynamic'
import Form from './Contracts/Form'
import SchemaBody from './Form/Mixins/SchemaFormBody'

/**
 * @component {SchemaReport}
 */
export default {
  /**
   */
  name: 'SchemaReport',
  /**
   */
  mixins: [Dynamic, Form, SchemaBody],
  /**
   */
  props: {
    /**
     */
    report: {
      type: String,
      required: true
    }
  },
  /**
   */
  data: () => ({
    submitting: false,
    printing: false,
    nonce: ''
  }),
  /**
   */
  methods: {
    /**
     * @param {function} h
     */
    renderReport (h) {
      const data = { class: 'app-form-wrapper' }
      const children = [
        this.renderReportBody(h),
        this.renderReportIframe(h),
        this.renderSchemaButtons(h, POSITIONS.POSITION_FORM_FOOTER, { record: this.record })
      ]

      return h('div', data, children)
    },
    /**
     * @param {function} h
     * @returns {*}
     */
    renderReportBody (h) {
      const token = this.$store.getters['auth/getToken']
      const data = {
        ref: 'form',
        class: 'app-form-body',
        domProps: {
          action: reportAction(this.report, token, this.printing),
          method: reportMethod(this.report, token, this.printing),
          target: 'report-iframe'
        }
      }
      const fields = this.getComponents()
      const children = [
        this.renderFormBodyComponents(h, fields),
        this.renderFormBodyHidden(h, fields),
        this.renderFormBodyInfo(h, fields)
      ]
      return h('form', data, children)
    },
    /**
     * @param {function} h
     * @param {Object} fields
     * @returns {Array}
     */
    renderFormBodyHidden (h, fields) {
      const map = (field) => {
        const name = field.$key
        const record = this.record[name]
        if (record === undefined || record === null) {
          return
        }
        const value = typeof record === 'object' ? record[primaryKey] : record
        const domProps = {
          type: 'hidden',
          name,
          value
        }
        return h('input', { domProps })
      }
      return Object.values(fields).map(map).filter((item) => item !== undefined)
    },
    /**
     * @param {function} h
     * @param {Object} fields
     * @returns {Array}
     */
    renderFormBodyInfo (h, fields) {
      const map = (field) => {
        const name = field.$key
        const record = this.record[name]
        if (record === undefined || record === null) {
          return
        }
        const value = typeof record === 'object' ? record[field.attrs.keyLabel] : record
        const label = field.label
        const type = field.$type
        const options = field.attrs.options
        const domProps = {
          type: 'hidden',
          name: `__@info[${name}]`,
          value: JSON.stringify({ value, label, type, options })
        }
        return h('input', { domProps })
      }
      const filter = (item) => item !== undefined
      const info = Object.values(fields).map(map).filter(filter)
      info.push(reportContext(h))
      return info
    },
    /**
     * @param {function} h
     * @returns {*}
     */
    renderReportIframe (h) {
      const data = {
        ref: 'iframe',
        class: 'app-iframe-body',
        domProps: {
          src: reportLoading(this.report),
          id: 'report-iframe',
          name: 'report-iframe'
        }
      }
      return h('iframe', data)
    },
    /**
     * @param schema
     * @param printing
     */
    reportSubmit ({ schema }, printing = false) {
      this.$v.$touch()
      if (this.$v.$error || this.hasErrors()) {
        this.$message.error(this.$lang('agnostic.actions.create.validation'))
        return
      }
      this.printing = printing
      this.$nextTick(() => {
        this.$refs.form.submit()
        this.submitting = true
      })
    },
    /**
     * @param {string} type
     * @returns {Promise<void>}
     */
    async reportDownload (type = '') {
      this.$v.$touch()
      if (this.$v.$error || this.hasErrors()) {
        this.$message.error(this.$lang('report.validation'))
        return
      }

      this.$q.loading.show({ delay: 0 })
      try {
        const token = this.$store.getters['auth/getToken']
        const response = await reportDownload(this.report, token, this.record, type)

        const suggestedFileName = response.headers['x-suggested-filename']
        const effectiveFileName = suggestedFileName === undefined
          ? 'document.csv'
          : suggestedFileName

        const file = new Blob([response.data], { type: 'data:text/csv;charset=utf-8,%EF%BB%BF' })
        this.$q.loading.hide()
        FileSaver.saveAs(file, effectiveFileName)
      } catch (e) {
        this.$message.error(this.$lang('report.fail'))
      }
      this.$q.loading.hide()
    },
    /**
     */
    reportBack () {
      this.submitting = false
      this.$refs.iframe.src = reportLoading(this.report)
    },
    /**
     */
    reportPrint () {
      try {
        window.frames.report.focus()
        window.frames.report.print()
      } catch (e) {
        window.alert(e.message)
      }
    },
    /**
     */
    renderButtons () {
      const actions = this.actions()
      if (!actions) {
        return
      }

      this.buttons = actions.reduce(this.buttonReduce, {})
    }
  },
  /**
   * @param {function} h
   */
  render (h) {
    const data = {
      class: ['SchemaForm', 'SchemaReport', this.submitting ? 'submitting' : ''],
      attrs: {
        padding: true
      }
    }
    const children = [
      this.renderReport(h)
    ]

    return h('div', data, children)
  }
}
