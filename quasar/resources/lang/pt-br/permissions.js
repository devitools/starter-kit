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
  general: 'Organizadores',
  'general.category': 'Pastas',
  'general.category.action': action,
  'general.category.index': index,
  'general.category.trash': trash,
  'general.category.add': add,
  'general.category.view': view,
  'general.category.edit': edit,
  'general.category.destroy': destroy,
  'general.marker': 'Marcadores',
  'general.marker.action': action,
  'general.marker.index': index,
  'general.marker.trash': trash,
  'general.marker.add': add,
  'general.marker.view': view,
  'general.marker.edit': edit,
  'general.marker.destroy': destroy,
  'general.type': 'Tipos de Movimento',
  'general.type.action': action,
  'general.type.index': index,
  'general.type.trash': trash,
  'general.type.add': add,
  'general.type.view': view,
  'general.type.edit': edit,
  'general.type.destroy': destroy
}
