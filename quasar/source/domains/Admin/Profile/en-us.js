import { SCOPES } from '@devitools/Agnostic/enum'

/**
 */
export default {
  routes: {
    group: {
      crumb: 'Admin / Profiles'
    },
    [SCOPES.SCOPE_INDEX]: {
      title: 'Profiles'
    },
    [SCOPES.SCOPE_TRASH]: {
      title: 'Profile Trash',
      crumb: 'Trash'
    },
    [SCOPES.SCOPE_ADD]: {
      title: 'Create Profile',
      crumb: 'Create'
    },
    [SCOPES.SCOPE_VIEW]: {
      title: 'View Profile',
      crumb: 'View'
    },
    [SCOPES.SCOPE_EDIT]: {
      title: 'Edit Profile',
      crumb: 'Edit'
    }
  },
  print: {
    title: 'Profile Printing'
  },
  fields: {
    // [primaryKey]: 'Id',
    name: 'Name',
    reference: {
      label: 'Reference',
      options: [
        { value: 'admin', label: 'ADMINISTRATOR' },
        { value: 'regular', label: 'REGULAR' }
      ]
    },
    permissions: {
      label: 'Permissions'
    }
  }
}
