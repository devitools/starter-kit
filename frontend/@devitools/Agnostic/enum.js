/**
 * @type {{
 * SCOPE_REMOVE: string,
 * SCOPE_ADD: string,
 * SCOPE_EDIT: string,
 * SCOPE_TRASH: string,
 * SCOPE_INDEX: string,
 * SCOPE_VIEW: string
 * }}
 */
export const SCOPES = Object.freeze({
  SCOPE_INDEX: 'scope-index',
  SCOPE_ADD: 'scope-add',
  SCOPE_VIEW: 'scope-view',
  SCOPE_EDIT: 'scope-edit',
  SCOPE_REMOVE: 'scope-remove',
  SCOPE_TRASH: 'scope-trash'
})

/**
 * @return {Array}
 */
export const scopes = () => Object.values(SCOPES)

/**
 * @type {{
 * SCOPE_EMBED_VIEW: string,
 * SCOPE_EMBED_TRASH: string,
 * SCOPE_EMBED_ADD: string,
 * SCOPE_EMBED_INDEX: string,
 * SCOPE_EMBED_EDIT: string,
 * SCOPE_EMBED_REMOVE: string
 * }}
 */
export const SCOPES_EMBED = Object.freeze({
  SCOPE_EMBED_INDEX: 'scope-embed-index',
  SCOPE_EMBED_ADD: 'scope-embed-add',
  SCOPE_EMBED_VIEW: 'scope-embed-view',
  SCOPE_EMBED_EDIT: 'scope-embed-edit',
  SCOPE_EMBED_REMOVE: 'scope-embed-remove',
  SCOPE_EMBED_TRASH: 'scope-embed-trash'
})

/**
 * @return {Array}
 */
export const scopesEmbed = () => Object.values(SCOPES_EMBED)

/**
 * @type {{
 * SCOPE_BUILTIN_VIEW: string,
 * SCOPE_BUILTIN_TRASH: string,
 * SCOPE_BUILTIN_ADD: string,
 * SCOPE_BUILTIN_INDEX: string,
 * SCOPE_BUILTIN_EDIT: string,
 * SCOPE_BUILTIN_REMOVE: string
 * }}
 */
export const SCOPES_BUILTIN = Object.freeze({
  SCOPE_BUILTIN_INDEX: 'scope-builtin-index',
  SCOPE_BUILTIN_ADD: 'scope-builtin-add',
  SCOPE_BUILTIN_VIEW: 'scope-builtin-view',
  SCOPE_BUILTIN_EDIT: 'scope-builtin-edit',
  SCOPE_BUILTIN_REMOVE: 'scope-builtin-remove',
  SCOPE_BUILTIN_TRASH: 'scope-builtin-trash'
})

/**
 * @return {Array}
 */
export const scopesBuiltin = () => Object.values(SCOPES_BUILTIN)

/**
 * @type {{
 * POSITION_TABLE_SEARCH: string,
 * POSITION_FORM_FOOTER: string,
 * POSITION_TABLE_TOP: string,
 * POSITION_TABLE_FLOAT: string,
 * POSITION_TABLE_CELL: string
 * }}
 */
export const POSITIONS = Object.freeze({
  POSITION_TABLE_TOP: 'table-top',
  POSITION_TABLE_CELL: 'table-cell',
  POSITION_TABLE_FLOAT: 'table-float',
  POSITION_TABLE_SEARCH: 'table-search',
  POSITION_FORM_FOOTER: 'form-footer',
  POSITION_FORM_VALIDATION: 'form-validation'
})

/**
 * @return {array}
 */
export const positions = () => Object.values(POSITIONS)

/**
 * @type {{
 * NONE: string,
 * CURRENCY: string,
 * AUTOMATIC: string,
 * NIN: string,
 * LIKE: string,
 * IN: string,
 * EQUAL: string,
 * NOT_EQUAL: string
 * }}
 */
export const OPERATORS = Object.freeze({
  NONE: 'none',
  EQUAL: 'eq',
  NOT_EQUAL: 'neq',
  LIKE: 'like',
  IN: 'in',
  NIN: 'nin',
  CURRENCY: 'currency',
  AUTOMATIC: 'automatic'
})
