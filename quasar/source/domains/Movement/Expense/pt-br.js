import { SCOPES } from '@devitools/Agnostic/enum'

/**
 */
export default {
  routes: {
    group: {
      crumb: 'Geral / Produtos'
    },
    [SCOPES.SCOPE_INDEX]: {
      title: 'Produtos'
    },
    [SCOPES.SCOPE_TRASH]: {
      title: 'Lixeira dos Produtos',
      crumb: 'Lixeira'
    },
    [SCOPES.SCOPE_ADD]: {
      title: 'Criar Produto',
      crumb: 'Criar'
    },
    [SCOPES.SCOPE_VIEW]: {
      title: 'Ver Produto',
      crumb: 'Ver'
    },
    [SCOPES.SCOPE_EDIT]: {
      title: 'Editar Produto',
      crumb: 'Editar'
    }
  },
  print: {
    title: 'Impressão de Produto'
  },
  fields: {
    // [primaryKey]: 'Id',
    name: {
      label: 'Nome',
      placeholder: 'Nome do seu produto'
    }
  }
}
