import { SCOPES } from '@devitools/Agnostic/enum'

/**
 */
export default {
  routes: {
    group: {
      crumb: 'Organizadores / Pastas'
    },
    [SCOPES.SCOPE_INDEX]: {
      title: 'Pastas'
    },
    [SCOPES.SCOPE_TRASH]: {
      title: 'Lixeira de Pastas',
      crumb: 'Lixeira'
    },
    [SCOPES.SCOPE_ADD]: {
      title: 'Criar Pasta',
      crumb: 'Criar'
    },
    [SCOPES.SCOPE_VIEW]: {
      title: 'Ver Pasta',
      crumb: 'Ver'
    },
    [SCOPES.SCOPE_EDIT]: {
      title: 'Editar Pasta',
      crumb: 'Editar'
    }
  },
  print: {
    title: 'Impressão de Pasta'
  },
  fields: {
    name: {
      label: 'Nome',
      placeholder: 'ex: pessoal, empresa'
    },
    description: {
      label: 'Descrição',
      placeholder: ''
    },
    active: {
      label: 'Ativo',
      info: 'Se desmarcado a pasta será arquivada e não será exibida para ser selecionada'
    }
  }
}
