import { POSITIONS } from '../../../Agnostic/enum'

/**
 * @class {ConfigureComponentReport}
 */
export default class ConfigureComponentReport {
  /**
   * Component created hook
   * @param {Schema} schema
   */
  createdHook (schema) {
    // will override by schemas
  }

  /**
   * Method that perform all configure events
   * It call the methods of all default scopes
   */
  configureComponentInitialization () {
    this.addAction('submit')
      .actionLabel(this.$lang('report.actions.submit.label'))
      .actionTooltip(this.$lang('report.actions.submit.tooltip'))
      .actionColor('primary')
      .actionIcon('search')
      .actionScopes(['report'])
      .actionFloatRight()
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionOn('click', function (payload) {
        this.reportSubmit(payload)
      })

    this.addAction('printing')
      .actionLabel(this.$lang('report.actions.printing.label'))
      .actionTooltip(this.$lang('report.actions.printing.tooltip'))
      .actionColor('default')
      .actionIcon('print')
      .actionScopes(['report'])
      .actionFloatRight()
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionOn('click', function (payload) {
        this.reportSubmit(payload, true)
      })

    this.addAction('return')
      .actionLabel(this.$lang('report.actions.return.label'))
      .actionTooltip(this.$lang('report.actions.return.tooltip'))
      .actionColor('default')
      .actionIcon('undo')
      .actionScopes(['report'])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionOn('click', function ({ $event }) {
        $event.stopPropagation()
        $event.preventDefault()
        this.reportBack()
      })

    this.addAction('printer')
      .actionLabel(this.$lang('report.actions.printer.label'))
      .actionTooltip(this.$lang('report.actions.printer.tooltip'))
      .actionColor('default')
      .actionIcon('print')
      .actionScopes(['report'])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionOn('click', function ({ $event }) {
        $event.stopPropagation()
        $event.preventDefault()
        this.reportPrint()
      })

    this.addAction('csv')
      .actionLabel(this.$lang('report.actions.csv.label'))
      .actionTooltip(this.$lang('report.actions.csv.tooltip'))
      .actionColor('default')
      .actionIcon('cloud_download')
      .actionScopes(['report'])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionOn('click', function ({ $event }) {
        $event.stopPropagation()
        $event.preventDefault()
        this.reportDownload('csv')
      })

    const schema = this
    this.addHook('created:default', function () {
      // call component initialize method
      if (this.initialize && typeof this.initialize === 'function') {
        this.initialize()
      }

      // call global prototype configure
      /**
       * @fires.createdHook
       */
      schema.createdHook.call(this, schema)
    })
  }
}
