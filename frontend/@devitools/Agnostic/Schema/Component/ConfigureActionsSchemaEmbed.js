import { POSITIONS, SCOPES_EMBED } from '../../../Agnostic/enum'
import { unique } from '../../../Util/general'

/**
 * @class {ConfigureActionsSchemaEmbed}
 */
export default class ConfigureActionsSchemaEmbed {
  /**
   */
  configureActionsSchemaEmbed () {
    const schema = this
    const readonly = schema.constructor.readonly

    this.addAction('embedBack')
      .actionScopes(readonly ? [] : [
        SCOPES_EMBED.SCOPE_EMBED_ADD,
        SCOPES_EMBED.SCOPE_EMBED_VIEW,
        SCOPES_EMBED.SCOPE_EMBED_EDIT
      ])
      .actionPositions([
        POSITIONS.POSITION_FORM_FOOTER
      ])
      .actionIcon('reply')
      .actionOn('click', function () {
        this.$emit('change', { scope: SCOPES_EMBED.SCOPE_EMBED_INDEX })
      })

    this.addAction('embedAdd')
      .actionScopes(readonly ? [] : [SCOPES_EMBED.SCOPE_EMBED_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_TOP, POSITIONS.POSITION_TABLE_FLOAT])
      .actionIcon('add')
      .actionColor('primary')
      .actionConfigure(function (action) {
        if (this.locked) {
          action.hidden = true
        }
        return action
      })
      .actionOn('click', function () {
        const payload = {
          scope: SCOPES_EMBED.SCOPE_EMBED_ADD,
          clipboard: { forceClear: unique() }
        }
        this.$emit('change', payload)
      })

    this.addAction('embedCreate')
      .actionScopes(readonly ? [] : [SCOPES_EMBED.SCOPE_EMBED_ADD])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionFloatRight()
      .actionIcon('save')
      .actionColor('primary')
      .actionConfigure(function (action) {
        if (this.locked) {
          action.hidden = true
        }
        return action
      })
      .actionOn('click', function ({ context, $event }) {
        const payload = {
          scope: SCOPES_EMBED.SCOPE_EMBED_INDEX,
          clipboard: { forceRefresh: unique() }
        }
        const after = () => {
          this.$emit('change', payload)
        }
        return schema.actionCreate.call(this, { $event, schema, after, ...context })
      })

    this.addAction('embedUpdate')
      .actionScopes([SCOPES_EMBED.SCOPE_EMBED_EDIT])
      .actionPositions(readonly ? [] : [POSITIONS.POSITION_FORM_FOOTER])
      .actionFloatRight()
      .actionIcon('save')
      .actionColor('primary')
      .actionConfigure(function (action) {
        if (this.locked) {
          action.hidden = true
        }
        return action
      })
      .actionOn('click', function ({ context, $event }) {
        const payload = {
          scope: SCOPES_EMBED.SCOPE_EMBED_INDEX,
          clipboard: { forceRefresh: unique() }
        }
        const after = () => {
          this.$emit('change', payload)
        }
        return schema.actionUpdate.call(this, { $event, schema, after, ...context })
      })

    this.addAction('embedView')
      .actionScopes([SCOPES_EMBED.SCOPE_EMBED_INDEX])
      .actionPositions([
        POSITIONS.POSITION_TABLE_TOP,
        POSITIONS.POSITION_TABLE_FLOAT,
        POSITIONS.POSITION_TABLE_CELL
      ])
      .actionIcon('visibility')
      .actionOn('click', function ({ context: { record, records } }) {
        if (!record && records && Array.isArray(records) && records.length) {
          record = records[0]
        }
        if (!record) {
          return
        }

        const payload = {
          scope: SCOPES_EMBED.SCOPE_EMBED_VIEW,
          clipboard: { [this.primaryKey]: record[this.primaryKey] }
        }
        this.$emit('change', payload)
      })

    this.addAction('embedEdit')
      .actionScopes(readonly ? [] : [SCOPES_EMBED.SCOPE_EMBED_INDEX])
      .actionPositions([
        POSITIONS.POSITION_TABLE_TOP,
        POSITIONS.POSITION_TABLE_FLOAT,
        POSITIONS.POSITION_TABLE_CELL
      ])
      .actionColor('primary')
      .actionIcon('edit')
      .actionConfigure(function (action) {
        if (this.locked) {
          action.hidden = true
        }
        return action
      })
      .actionOn('click', function ({ context: { record, records } }) {
        if (!record && records && Array.isArray(records) && records.length) {
          record = records[0]
        }
        if (!record) {
          return
        }

        const payload = {
          scope: SCOPES_EMBED.SCOPE_EMBED_EDIT,
          clipboard: { [this.primaryKey]: record[this.primaryKey] }
        }
        this.$emit('change', payload)
      })

    const scopesDestroy = readonly
      ? []
      : [
        SCOPES_EMBED.SCOPE_EMBED_INDEX,
        SCOPES_EMBED.SCOPE_EMBED_VIEW,
        SCOPES_EMBED.SCOPE_EMBED_EDIT
      ]
    this.addAction('embedDestroy')
      .actionScopes(scopesDestroy)
      .actionPositions([
        POSITIONS.POSITION_TABLE_CELL,
        POSITIONS.POSITION_TABLE_FLOAT,
        POSITIONS.POSITION_TABLE_TOP
      ])
      .actionConfigure(function (action, { context: { record, records }, position }) {
        if ([POSITIONS.POSITION_TABLE_CELL, POSITIONS.POSITION_FORM_FOOTER].includes(position)) {
          action.hidden = record.deletedAt
        }
        if (this.locked) {
          action.hidden = true
        }
        return action
      })
      .actionColor('negative')
      .actionIcon('delete')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionDestroy.call(this, { $event, schema, ...context })
      })

    this.addAction('embedSortClear')
      .actionScopes([SCOPES_EMBED.SCOPE_EMBED_INDEX, SCOPES_EMBED.SCOPE_EMBED_TRASH])
      .actionPositions([POSITIONS.POSITION_TABLE_TOP])
      .actionIcon('layers_clear')
      .actionNoMinWidth()
      .actionOn('click', function ({ context, $event }) {
        // return schema.actionSortClear.call(this, { $event, schema, ...context })
      })

    this.addAction('embedRefresh')
      .actionScopes([SCOPES_EMBED.SCOPE_EMBED_INDEX, SCOPES_EMBED.SCOPE_EMBED_TRASH])
      .actionPositions([POSITIONS.POSITION_TABLE_TOP, POSITIONS.POSITION_TABLE_FLOAT])
      .actionIcon('refresh')
      .actionNoMinWidth()
      .actionOn('click', function () {
        this.fetchRecords()
      })

    this.addAction('embedSearch')
      .actionScopes([SCOPES_EMBED.SCOPE_EMBED_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_SEARCH])
      .actionIcon('search')
      .actionColor('primary')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionSearch.call(this, { $event, schema, ...context })
      })

    this.addAction('embedSearchClear')
      .actionScopes([SCOPES_EMBED.SCOPE_EMBED_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_SEARCH])
      .actionIcon('cancel')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionSearchCancel.call(this, { $event, schema, ...context })
      })
  }
}
