import { SCOPES } from '@devitools/Agnostic/enum'

/**
 */
export default {
  routes: {
    group: {
      crumb: 'Admin / Users'
    },
    [SCOPES.SCOPE_INDEX]: {
      title: 'Users'
    },
    [SCOPES.SCOPE_TRASH]: {
      title: 'User Trash',
      crumb: 'Trash'
    },
    [SCOPES.SCOPE_ADD]: {
      title: 'Create User',
      crumb: 'Create'
    },
    [SCOPES.SCOPE_VIEW]: {
      title: 'View User',
      crumb: 'View'
    },
    [SCOPES.SCOPE_EDIT]: {
      title: 'Edit User',
      crumb: 'Edit'
    }
  },
  print: {
    title: 'User Impression'
  },
  fields: {
    name: {
      label: 'Name',
      tooltip: 'The name of used to identify the user',
      placeholder: 'ex: John Doe'
    },
    username: {
      label: 'Username',
      tooltip: 'Must start with a letter and can have letters, numbers and underscore',
      placeholder: 'ex.: john_doe'
    },
    profile: {
      label: 'Profile',
      tooltip: 'Specify the user permissions level',
      placeholder: 'Type to search a Profile and click on list to select...'
    },
    active: {
      label: 'Active',
      tooltip: 'This field determines whether a user will be able to access the platform or not',
      info: 'Allow access'
    },
    password: {
      label: 'Password',
      placeholder: 'ex.: @y5l3cGy (empty will be ignored when editing)',
      tooltip: 'Password must have letters, numbers, special symbols with a minimum of six characters'
    },
    confirmPassword: {
      label: 'Password Confirmation',
      placeholder: 'ex.: @y5l3cGy (empty will be ignored when editing)',
      tooltip: 'Repeat the password to confirm it'
    }
  },
  validation: {
    username: {
      unique: 'Username already in use',
      regex: 'The username given is not valid'
    },
    password: {
      requiredIf: 'Password is required to create user',
      regex: 'Password must have letters, numbers and at least six chars'
    },
    confirmPassword: {
      sameAs: 'Confirmation must match password'
    }
  }
}
