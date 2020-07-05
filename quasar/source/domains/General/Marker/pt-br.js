import { SCOPES } from '@devitools/Agnostic/enum'

/**
 */
export default {
  routes: {
    group: {
      crumb: 'Organizadores / Marcadores'
    },
    [SCOPES.SCOPE_INDEX]: {
      title: 'Marcadores'
    },
    [SCOPES.SCOPE_TRASH]: {
      title: 'Lixeira dos Marcadores',
      crumb: 'Lixeira'
    },
    [SCOPES.SCOPE_ADD]: {
      title: 'Criar Marcador',
      crumb: 'Criar'
    },
    [SCOPES.SCOPE_VIEW]: {
      title: 'Ver Marcador',
      crumb: 'Ver'
    },
    [SCOPES.SCOPE_EDIT]: {
      title: 'Editar Marcador',
      crumb: 'Editar'
    }
  },
  print: {
    title: 'Impressão de Marcador'
  },
  fields: {
    // [primaryKey]: 'Id',
    name: {
      label: 'Nome',
      placeholder: 'ex.: padaria, farmácia'
    }
  }
}
