const action = 'Show in menu'

const index = 'Allow access list'
const trash = 'Allow access trash'
const add = 'Allow add a new record'
const view = 'Allow view a record'
const edit = 'Allow edit a record'
const destroy = 'Allow destroy a record'

/**
 * @type {Object}
 */
export default {
  all: 'All',
  actions: 'Actions',
  resources: 'Resources',
  admin: 'Admin',
  'admin.profile': 'Profile',
  'admin.profile.action': action,
  'admin.profile.index': index,
  'admin.profile.trash': trash,
  'admin.profile.add': add,
  'admin.profile.view': view,
  'admin.profile.edit': edit,
  'admin.profile.destroy': destroy,
  'admin.user': 'User',
  'admin.user.action': action,
  'admin.user.index': index,
  'admin.user.trash': trash,
  'admin.user.add': add,
  'admin.user.view': view,
  'admin.user.edit': edit,
  'admin.user.destroy': destroy,
  general: 'General',
  'general.category': 'Category',
  'general.category.action': action,
  'general.category.index': index,
  'general.category.trash': trash,
  'general.category.add': add,
  'general.category.view': view,
  'general.category.edit': edit,
  'general.category.destroy': destroy
}
