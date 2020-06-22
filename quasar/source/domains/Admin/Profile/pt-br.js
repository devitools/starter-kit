import { SCOPES } from '@devitools/Agnostic/enum'

/**
 */
export default {
  routes: {
    group: {
      crumb: 'Admin / Perfils'
    },
    [SCOPES.SCOPE_INDEX]: {
      title: 'Perfis'
    },
    [SCOPES.SCOPE_Trash]: {
      title: 'Perfil Lixeira',
      crumb: 'Lixeira'
    },
    [SCOPES.SCOPE_ADD]: {
      title: 'Create Perfil',
      crumb: 'Create'
    },
    [SCOPES.SCOPE_View]: {
      title: 'Ver Perfil',
      crumb: 'Ver'
    },
    [SCOPES.SCOPE_Edit]: {
      title: 'Editar Perfil',
      crumb: 'Editar'
    }
  },
  print: {
    title: 'Impressão de Perfil'
  },
  fields: {
    // [primaryKey]: 'Id',
    name: 'Nome',
    reference: {
      label: 'Referência',
      options: [
        { value: 'admin', label: 'ADMINISTRADOR' },
        { value: 'regular', label: 'REGULAR' }
      ]
    },
    permissions: {
      label: 'Permissões'
    }
  }
}
