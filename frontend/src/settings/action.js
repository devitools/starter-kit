import { POSITIONS, SCOPES } from '@devitools/Agnostic/enum'
import { RULES } from './schema'

/**
 * @type {string[]}
 */
export const IGNORED_ACTIONS = Object.freeze([])

/**
 * @type {Readonly<{color: string, unelevated: boolean, dense: boolean}>}
 */
export const INTERNAL_ATTRS = Object.freeze({
  unelevated: true,
  dense: true,
  color: 'default'
})

/**
 * @type {string}
 */
export const ICON_GROUP_ACTIONS = 'apps'

let actions

/**
 defines: [
 'back',
 'print',
 'home',
 'create',
 'update',
 'view',
 'edit',
 'destroy',
 'trash',
 'restore',
 'erase',
 'sortClear',
 'refresh',
 'add',
 'search',
 'searchClear',
 ]
 */
export function defaultActions (schema) {
  const readonly = schema.constructor.readonly

  if (!schema.afterCreate) {
    /**
     * available: ['edit', 'view', 'index']
     * @type {string}
     */
    schema.afterCreate = 'index'
  }

  if (!schema.afterUpdate) {
    /**
     * available: ['none', 'index']
     * @type {string}
     */
    schema.afterUpdate = 'index'
  }

  if (!actions) {
    const ALL_POSITIONS = [
      POSITIONS.POSITION_TABLE_TOP,
      POSITIONS.POSITION_TABLE_FLOAT,
      POSITIONS.POSITION_TABLE_CELL,
      POSITIONS.POSITION_FORM_FOOTER
    ]

    const ALL_TABLE_POSITIONS = [
      POSITIONS.POSITION_TABLE_TOP,
      POSITIONS.POSITION_TABLE_FLOAT,
      POSITIONS.POSITION_TABLE_CELL
    ]

    schema.addAction('back')
      .actionScopes([SCOPES.SCOPE_ADD, SCOPES.SCOPE_VIEW, SCOPES.SCOPE_EDIT])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionIcon('reply')

    schema.addAction('print')
      .actionScopes([SCOPES.SCOPE_INDEX, SCOPES.SCOPE_ADD, SCOPES.SCOPE_VIEW, SCOPES.SCOPE_EDIT])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionIcon('print')

    schema.addAction('home')
      .actionFloatRight()
      .actionScopes([SCOPES.SCOPE_TRASH, SCOPES.SCOPE_ADD, SCOPES.SCOPE_VIEW, SCOPES.SCOPE_EDIT])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER, POSITIONS.POSITION_TABLE_TOP, POSITIONS.POSITION_TABLE_FLOAT])
      .actionIcon('dvr')

    schema.addAction('create')
      .actionScopes(readonly ? [] : [SCOPES.SCOPE_ADD])
      .actionLevels([RULES.LEVEL_ADD])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionFloatRight()
      .actionIcon('save')
      .actionColor('primary')

    schema.addAction('update')
      .actionScopes([SCOPES.SCOPE_EDIT])
      .actionLevels([RULES.LEVEL_EDIT])
      .actionPositions(readonly ? [] : [POSITIONS.POSITION_FORM_FOOTER])
      .actionFloatRight()
      .actionIcon('save')
      .actionColor('primary')

    schema.addAction('add')
      .actionScopes(readonly ? [] : [SCOPES.SCOPE_INDEX])
      .actionLevels([RULES.LEVEL_ADD])
      .actionPositions([POSITIONS.POSITION_TABLE_TOP, POSITIONS.POSITION_TABLE_FLOAT])
      .actionIcon('add')
      .actionColor('primary')

    schema.addAction('view')
      .actionScopes([SCOPES.SCOPE_INDEX, SCOPES.SCOPE_TRASH])
      .actionLevels([RULES.LEVEL_VIEW])
      .actionPositions(ALL_TABLE_POSITIONS)
      .actionIcon('visibility')

    schema.addAction('edit')
      .actionScopes([SCOPES.SCOPE_INDEX])
      .actionLevels([RULES.LEVEL_EDIT])
      .actionPositions(readonly ? [] : ALL_TABLE_POSITIONS)
      .actionColor('secondary')
      .actionIcon('edit')

    schema.addAction('destroy')
      .actionScopes(readonly ? [] : [SCOPES.SCOPE_INDEX])
      .actionLevels([RULES.LEVEL_DESTROY])
      .actionPositions(ALL_POSITIONS)
      .actionColor('negative')
      .actionIcon('delete')

    schema.addAction('trash')
      .actionFloatRight()
      .actionScopes([SCOPES.SCOPE_INDEX])
      .actionLevels([RULES.LEVEL_TRASH])
      .actionPositions(readonly ? [] : [POSITIONS.POSITION_TABLE_TOP, POSITIONS.POSITION_TABLE_FLOAT])
      .actionIcon('restore')

    schema.addAction('restore')
      .actionScopes([SCOPES.SCOPE_VIEW, SCOPES.SCOPE_TRASH])
      .actionLevels([RULES.LEVEL_TRASH])
      .actionPositions(ALL_POSITIONS)
      .actionColor('primary')
      .actionIcon('restore_from_trash')

    schema.addAction('erase')
      .actionScopes(readonly ? [] : [SCOPES.SCOPE_TRASH, SCOPES.SCOPE_VIEW, SCOPES.SCOPE_EDIT])
      .actionLevels([RULES.LEVEL_TRASH])
      .actionPositions(ALL_POSITIONS)
      .actionColor('negative')
      .actionIcon('clear')

    schema.addAction('sortClear')
      .actionScopes([SCOPES.SCOPE_INDEX, SCOPES.SCOPE_TRASH])
      .actionLevels([RULES.LEVEL_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_TOP])
      .actionIcon('layers_clear')
      .actionNoMinWidth()

    schema.addAction('refresh')
      .actionScopes([SCOPES.SCOPE_INDEX, SCOPES.SCOPE_TRASH])
      .actionLevels([RULES.LEVEL_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_TOP, POSITIONS.POSITION_TABLE_FLOAT])
      .actionIcon('refresh')
      .actionNoMinWidth()

    schema.addAction('export')
      .actionScopes([SCOPES.SCOPE_INDEX, SCOPES.SCOPE_TRASH])
      .actionLevels([RULES.LEVEL_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_TOP, POSITIONS.POSITION_TABLE_FLOAT])
      .actionIcon('cloud_download')
      .actionNoMinWidth()

    schema.addAction('search')
      .actionScopes([SCOPES.SCOPE_INDEX])
      .actionLevels([RULES.LEVEL_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_SEARCH])
      .actionLevels([RULES.LEVEL_INDEX])
      .actionIcon('search')
      .actionColor('primary')

    schema.addAction('searchClear')
      .actionScopes([SCOPES.SCOPE_INDEX])
      .actionLevels([RULES.LEVEL_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_SEARCH])
      .actionIcon('cancel')

    schema.addAction('validationClear')
      .actionScopes([SCOPES.SCOPE_ADD, SCOPES.SCOPE_VIEW, SCOPES.SCOPE_EDIT])
      .actionLevels([RULES.LEVEL_AVAILABLE])
      .actionPositions([POSITIONS.POSITION_FORM_VALIDATION])
      .actionIcon('cancel')
      .actionColor('negative')
      .actionAddClassName('full-width')

    actions = schema.__actions
  }

  const HIDE_IF_DELETED = function (action, { context: { record }, position }) {
    if ([POSITIONS.POSITION_TABLE_CELL, POSITIONS.POSITION_FORM_FOOTER].includes(position)) {
      action.hidden = record.deletedAt
    }
    return action
  }

  const HIDE_IF_NOT_DELETED = function (action, { context: { record }, position }) {
    if ([POSITIONS.POSITION_TABLE_CELL, POSITIONS.POSITION_FORM_FOOTER].includes(position)) {
      action.hidden = !record.deletedAt
    }
    return action
  }

  schema.__actions = JSON.parse(JSON.stringify(actions))

  schema.getAction('back')
    .actionOn('click', function ({ context, $event }) {
      return schema.actionBack.call(this, { $event, schema, ...context })
    })

  schema.getAction('print')
    .actionOn('click', function ({ context, $event }) {
      return schema.actionPrint.call(this, { $event, schema, ...context })
    })

  schema.getAction('home')
    .actionOn('click', function ({ context, $event }) {
      return schema.actionHome.call(this, { $event, schema, ...context })
    })

  schema.getAction('create')
    .actionOn('click', function ({ context, $event }) {
      return schema.actionCreate.call(this, { $event, schema, ...context })
    })

  schema.getAction('update')
    .actionOn('click', function ({ context, $event }) {
      return schema.actionUpdate.call(this, { $event, schema, ...context })
    })

  schema.getAction('add')
    .actionOn('click', function ({ context, $event }) {
      return schema.actionAdd.call(this, { $event, schema, ...context })
    })

  schema.getAction('view')
    .actionOn('click', function ({ context, $event }) {
      return schema.actionView.call(this, { $event, schema, ...context })
    })

  schema.getAction('edit')
    .actionOn('click', function ({ context, $event }) {
      return schema.actionEdit.call(this, { $event, schema, ...context })
    })

  schema.getAction('destroy')
    .actionConfigure(HIDE_IF_DELETED)
    .actionOn('click', function ({ context, $event }) {
      return schema.actionDestroy.call(this, { $event, schema, ...context })
    })

  schema.getAction('trash')
    .actionOn('click', function ({ context, $event }) {
      return schema.actionTrash.call(this, { $event, schema, ...context })
    })

  schema.getAction('restore')
    .actionConfigure(HIDE_IF_NOT_DELETED)
    .actionOn('click', function ({ context, $event }) {
      return schema.actionRestore.call(this, { $event, schema, ...context })
    })

  schema.getAction('erase')
    .actionConfigure(HIDE_IF_NOT_DELETED)
    .actionOn('click', function ({ context, $event }) {
      return schema.actionDestroy.call(this, { $event, schema, ...context, erase: true })
    })

  schema.getAction('sortClear')
    .actionOn('click', function ({ context, $event }) {
      return schema.actionSortClear.call(this, { $event, schema, ...context })
    })

  schema.getAction('refresh')
    .actionOn('click', function ({ context, $event }) {
      return schema.actionRefresh.call(this, { $event, schema, ...context })
    })

  schema.getAction('export')
    .actionOn('click', function ({ context, $event }) {
      return schema.actionExport.call(this, { $event, schema, ...context })
    })

  schema.getAction('search')
    .actionOn('click', function ({ context, $event }) {
      return schema.actionSearch.call(this, { $event, schema, ...context })
    })

  schema.getAction('searchClear')
    .actionOn('click', function ({ context, $event }) {
      return schema.actionSearchCancel.call(this, { $event, schema, ...context })
    })

  schema.getAction('validationClear')
    .actionOn('click', function ({ context, $event }) {
      return schema.actionValidationClear.call(this, { $event, schema, ...context })
    })
}

/**
 * @param {Schema} schema
 * @param {string} id
 * @param {number} order
 * @param {string[]} scopes
 * @param {string[]} positions
 * @param {Object} attrs
 * @param {string[]} classNames
 * @return {Action}
 */
export default (schema, id, order, scopes = [], positions = [], attrs = {}, classNames = []) => {
  const attributes = {
    label: '',
    color: 'default',
    textColor: undefined,
    tooltip: undefined,
    icon: undefined,
    disabled: false
  }

  const handler = function (payload) {
    if (schema[id] && typeof schema[id] === 'function') {
      schema[id].call(this, { schema, ...payload })
      return
    }

    const action = `action${id.capitalize()}`
    if (schema[action] && typeof schema[action] === 'function') {
      schema[action].call(this, { schema, ...payload })
    }
  }

  return {
    $key: id,
    hidden: false,
    dropdown: false,
    validate: undefined,
    on: { click: handler },
    scopes: [...scopes],
    positions: positions,
    class: classNames,
    order: order,
    attrs: { ...attributes, ...attrs },
    levels: []
    // configure: (button, context) => button
  }
}
