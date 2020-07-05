import { SCOPES } from '@devitools/Agnostic/enum'

/**
 */
export default {
  routes: {
    group: {
      crumb: 'Organizers / Labels Types'
    },
    [SCOPES.SCOPE_INDEX]: {
      title: 'Labels Types'
    },
    [SCOPES.SCOPE_TRASH]: {
      title: 'Trash Labels Types',
      crumb: 'Trash'
    },
    [SCOPES.SCOPE_ADD]: {
      title: 'Create Label Type',
      crumb: 'Create'
    },
    [SCOPES.SCOPE_VIEW]: {
      title: 'View Label Type',
      crumb: 'View'
    },
    [SCOPES.SCOPE_EDIT]: {
      title: 'Edit Label Type',
      crumb: 'Edit'
    }
  },
  print: {
    title: 'Print Label Type'
  },
  fields: {
    name: {
      label: 'Name',
      placeholder: 'ex.: food, medicines'
    }
  }
}
