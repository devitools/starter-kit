import { SCOPES } from '@devitools/Agnostic/enum'

/**
 */
export default {
  routes: {
    group: {
      crumb: 'Geral / Categorias'
    },
    [SCOPES.SCOPE_INDEX]: {
      title: 'Categorias'
    },
    [SCOPES.SCOPE_TRASH]: {
      title: 'Categoria Lixeira',
      crumb: 'Lixeira'
    },
    [SCOPES.SCOPE_ADD]: {
      title: 'Criar Categoria',
      crumb: 'Criar'
    },
    [SCOPES.SCOPE_VIEW]: {
      title: 'Ver Categoria',
      crumb: 'Ver'
    },
    [SCOPES.SCOPE_EDIT]: {
      title: 'Editar Categoria',
      crumb: 'Editar'
    }
  },
  print: {
    title: 'Impressão de categoria'
  },
  fields: {
    // [primaryKey]: 'Id',
    name: {
      label: 'Nome',
      placeholder: 'Digite um bom nome para sua categoria'
    }
  }
}
