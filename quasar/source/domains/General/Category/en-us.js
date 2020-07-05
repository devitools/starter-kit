import { SCOPES } from '@devitools/Agnostic/enum'

/**
 */
export default {
  routes: {
    group: {
      crumb: 'Organizers / Folders'
    },
    [SCOPES.SCOPE_INDEX]: {
      title: 'Folders'
    },
    [SCOPES.SCOPE_TRASH]: {
      title: 'Folder Trash',
      crumb: 'Trash'
    },
    [SCOPES.SCOPE_ADD]: {
      title: 'Create Folder',
      crumb: 'Create'
    },
    [SCOPES.SCOPE_VIEW]: {
      title: 'View Folder',
      crumb: 'See'
    },
    [SCOPES.SCOPE_EDIT]: {
      title: 'Edit Folder',
      crumb: 'Edit'
    }
  },
  print: {
    title: 'Folder Printing'
  },
  fields: {
    name: {
      label: 'Name',
      placeholder: 'ex: personal, business'
    },
    description: {
      label: 'Description',
      placeholder: ''
    },
    active: {
      label: 'Active',
      info: 'If unchecked, the folder will be archived and will not be displayed for selection'
    }
  }
}
