import { SCOPES } from '@devitools/Agnostic/enum'

/**
 */
export default {
  routes: {
    group: {
      crumb: 'General / Products'
    },
    [SCOPES.SCOPE_INDEX]: {
      title: 'Products'
    },
    [SCOPES.SCOPE_TRASH]: {
      title: 'Product Trash',
      crumb: 'Trash'
    },
    [SCOPES.SCOPE_ADD]: {
      title: 'Create Product',
      crumb: 'Create'
    },
    [SCOPES.SCOPE_VIEW]: {
      title: 'View Product',
      crumb: 'View'
    },
    [SCOPES.SCOPE_EDIT]: {
      title: 'Edit Product',
      crumb: 'Edit'
    }
  },
  print: {
    title: 'Product Printing'
  },
  fields: {
    // [primaryKey]: 'Id',
    name: {
      label: 'Name',
      placeholder: 'Name of your product'
    }
  }
}
