import { primaryKey } from 'src/settings/schema'

import { agnostic } from '../en-us'
import actions from './actions'

/**
 * @type {Object}
 */
export default {
  ...agnostic,
  table: {
    search: 'Pesquisar...',
    columns: 'Colunas'
  },
  filter: {
    select: 'Selecione o filtro corretamente'
  },
  fields: {
    [primaryKey]: 'Id',
    createdAt: 'Criado em',
    updatedAt: 'Atualizado em',
    deletedAt: 'Apagado em',
    createdBy: 'Criado por',
    updatedBy: 'Atualizado por',
    deletedBy: 'Apagado por'
  },
  components: {
    validation: {
      title: 'Mensagens de Validação'
    },
    array: {
      empty: 'Use o botão {button} abaixo para adicionar elementos',
      remove: 'Remove este elemento da lista',
      confirm: 'Deseja realmente remover este elemento da lista?',
      edit: 'Permite editar este elemento',
      reset: 'Cancela as alterações feitas',
      add: 'Adiciona um novo elemento na lista',
      apply: 'Aplica as alterações feitas no elemento',
      options: 'Opções'
    },
    appSelectRemote: {
      notFound: '-',
      noResults: 'A coleção está vazia',
      searching: 'Pesquisando...',
      confirm: 'Confirmar',
      cancel: 'Cancelar',
      clear: 'Limpar Seleção',
      search: 'Pesquisar',
      placeholder: 'Digite para pesquisar...'
    },
    appSelectWithOthers: {
      others: {
        label: 'Outros',
        placeholder: 'informe (use vírgula para separar ou enter para adicionar valores)'
      }
    },
    password: {
      copied: 'Uma nova senha foi criada e enviada para a área de transferência',
      generator: {
        tooltip: 'Cria uma senha com {length} caracteres'
      },
      visible: {
        tooltip: 'Deixa a senha visível'
      }
    },
    image: {
      button: 'Selecione uma imagem'
    },
    file: {
      upload: 'Clique aqui para importar o arquivo',
      download: 'Clique aqui para baixar o arquivo',
      downloadName: 'arquivo'
    },
    embed: {
      actions: {
        embedCreate: actions.create,
        embedUpdate: actions.update,
        embedReset: actions.reset,
        embedAdd: actions.add,
        embedTrash: actions.trash,
        embedEdit: actions.edit,
        embedDestroy: actions.destroy,
        embedRestore: actions.restore,
        embedView: actions.view,
        embedHome: actions.home,
        embedBack: actions.back,
        embedPrint: actions.print,
        embedRefresh: actions.refresh,
        embedSortClear: actions.sortClear,
        embedSearch: actions.search,
        embedSearchClear: actions.searchClear
      }
    },
    builtin: {
      form: {
        add: 'Novo',
        edit: 'Editar',
        view: 'Visualizar'
      },
      actions: {
        builtinAdd: {
          label: 'Adicionar',
          tooltip: 'Adiciona um elemento na lista'
        },
        builtinBack: {
          label: 'Voltar',
          tooltip: 'Volta para a lista de elementos'
        },
        builtinCancel: {
          label: 'Fechar',
          tooltip: 'Desfazer alterações e voltar para a lista'
        },
        builtinApply: {
          label: 'Aplicar',
          tooltip: 'Aplicar a alteração à lista',
          validation: 'Verifique os campos destacados'
        },
        builtinView: {
          label: 'Visualizar',
          tooltip: 'Visualizar este elemento'
        },
        builtinEdit: {
          label: 'Editar',
          tooltip: 'Editar este elemento'
        },
        builtinDestroy: {
          label: 'Remover',
          tooltip: 'Remover este elemento da lista',
          title: 'Remover',
          message: 'Deseja remover este elemento da lista?'
        }
      }
    }
  },
  dialog: {
    alert: {
      title: 'Atenção'
    },
    confirm: {
      title: 'Confirmação'
    },
    prompt: {
      title: 'Informe'
    }
  },
  options: {
    gender: {
      male: 'Masculino',
      female: 'Feminino'
    },
    yesNo: {
      yes: 'Sim',
      no: 'Não'
    }
  },
  modified: 'Existem modificações pendentes na tela. Deseja continuar mesmo assim?',
  actions: actions
}
