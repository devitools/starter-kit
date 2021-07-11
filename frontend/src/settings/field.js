import $lang from '@devitools/Lang'
import components from 'src/settings/components'

/**
 * @type {string}
 */
export const component = 'plan'

/**
 * @type {{name: string, type: string}[]}
 */
export const timestamps = [
  { name: 'createdAt', type: 'datetime' },
  { name: 'updatedAt', type: 'datetime' },
  { name: 'deletedAt', type: 'datetime' },
  { name: 'createdBy', type: 'user' },
  { name: 'updatedBy', type: 'user' },
  { name: 'deletedBy', type: 'user' }
]

/**
 * @param {string} $key
 * @param {Object} options
 * @param {Object} attrs
 * @param {Object} on
 * @returns {Field}
 */
export default ($key, options = {}, attrs = {}, on = {}) => {
  let is = component
  const properties = components[component]
  if (properties) {
    is = properties.is
    on = { ...on, ...properties.listeners }
    attrs = { ...attrs, ...(typeof properties?.attrs === 'function' ? properties.attrs() : properties.attrs) }
  }

  const { domain } = options
  if (domain) {
    let hint = $lang(`domains.${domain}.fields.${$key}.hint`)
    const placeholder = $lang(`domains.${domain}.fields.${$key}.placeholder`)
    let tooltip = $lang(`domains.${domain}.fields.${$key}.tooltip`)
    let label = $lang(`domains.${domain}.fields.${$key}.info`)
    if (!hint) {
      hint = undefined
    }
    if (!tooltip) {
      tooltip = undefined
    }
    if (!label) {
      label = undefined
    }
    attrs = { ...attrs, label, hint, tooltip, placeholder }
  }

  return {
    $key,
    is,
    attrs,
    on,
    $type: options.type,
    $validations: {},
    $layout: {
      formLabel: options.label || '',
      formWidth: options.width || 100,
      formHeight: options.height || 1,
      formHidden: false,
      formOrder: options.order,
      formError: true,
      tableLabel: options.label || '',
      tableWidth: 'auto',
      tableHidden: true,
      tableRequired: false,
      tableAlign: 'left',
      tableSortable: true,
      tableOrder: options.order,
      tableFormat: undefined,
      tableWhere: undefined
    },
    scopes: [...options.scopes],
    chars: '',
    $fill: ''
  }
}
