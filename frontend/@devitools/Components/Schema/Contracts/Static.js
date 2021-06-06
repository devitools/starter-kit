import Basic from './Basic'

/**
 * @typedef {Object} Static
 */
export default {
  /**
   */
  mixins: [
    Basic
  ],
  /**
   */
  inject: [
    'path',
    'domain',
    'table',
    'form',
    'domains',
    'primaryKey',
    'displayKey',
    'fields',
    'actions',
    'hooks'
  ]
}
