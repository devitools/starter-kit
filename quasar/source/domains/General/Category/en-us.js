import { SCOPES } from '@devitools/Agnostic/enum'

/**
 */
export default {
  routes: {
    group: {
      crumb: 'General / Categories'
    },
    [SCOPES.SCOPE_INDEX]: {
      title: 'Categories'
    },
    [SCOPES.SCOPE_TRASH]: {
      title: 'Category Trash',
      crumb: 'Trash'
    },
    [SCOPES.SCOPE_ADD]: {
      title: 'Create Category',
      crumb: 'Create'
    },
    [SCOPES.SCOPE_VIEW]: {
      title: 'View Category',
      crumb: 'View'
    },
    [SCOPES.SCOPE_EDIT]: {
      title: 'Edit Category',
      crumb: 'Edit'
    }
  },
  print: {
    title: 'Category Printing'
  },
  fields: {
    // [primaryKey]: 'Id',
    name: 'Name'
  }
}
