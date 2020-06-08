/**
 * @param {string} id
 * @param {function} handler
 * @param {number} order
 * @param {string[]} scopes
 * @param {string[]} positions
 * @param {Object} attrs "{ label: '', color: 'white', textColor: 'grey-10', tooltip: undefined, icon: undefined, disabled: false }"
 * @param {string[]} classNames
 * @return {Object}
 */
export default (
  id,
  handler,
  order,
  scopes = [],
  positions = [],
  attrs = {},
  classNames = []
) => {
  const attributes = {
    label: '',
    color: 'white',
    textColor: 'grey-10',
    tooltip: undefined,
    icon: undefined,
    disabled: false
  }
  return {
    $key: id,
    hidden: false,
    dropdown: false,
    validate: undefined,
    on: { click: handler },
    scopes: scopes,
    positions: positions,
    class: classNames,
    order: order,
    attrs: { ...attributes, ...attrs },
    levels: []
    // configure: (button, context) => button
  }
}

/**
 * @type {*[]}
 */
export const ignored = []
