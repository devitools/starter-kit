import { SCOPES } from '@devitools/Agnostic/enum'

/**
 */
export default {
  routes: {
    group: {
      crumb: 'Organizers / Labels'
    },
    [SCOPES.SCOPE_INDEX]: {
      title: 'Labels'
    },
    [SCOPES.SCOPE_TRASH]: {
      title: 'Trash Labels',
      crumb: 'Trash'
    },
    [SCOPES.SCOPE_ADD]: {
      title: 'Create Label',
      crumb: 'Create'
    },
    [SCOPES.SCOPE_VIEW]: {
      title: 'View Label',
      crumb: 'View'
    },
    [SCOPES.SCOPE_EDIT]: {
      title: 'Edit Marker',
      crumb: 'Edit'
    }
  },
  print: {
    title: 'Print Marker'
  },
  fields: {
    name: {
      label: 'Name',
      placeholder: 'ex.: bakery, pharmacy'
    }
  }
}
