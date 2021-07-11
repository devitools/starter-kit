import { routes } from 'resources/lang/pt-br/helper'

const parent = 'Administração'
const singular = 'Perfil'
const plural = 'Perfis'

export const print = {
  title: `Imprimir ${singular}`
}

export const fields = {
  name: {
    label: 'Nome',
    placeholder: 'ex: Secretaria',
    tooltip: 'Nome usado para identificar o perfil'
  },
  permissions: {
    label: 'Permissões',
    tooltip: 'Permissões de acesso que serão concedidas neste perfil'
  },
  reference: {
    label: 'Tipo',
    placeholder: 'Selecione uma Aplicação para o Perfil',
    tooltip: 'Determina qual a aplicação do Perfil no sistema',
    options: [
      {
        value: 'admin',
        label: 'Administrador'
      },
      {
        value: 'user',
        label: 'Usuário'
      }
    ]
  }
}

export default {
  routes: routes(parent, plural, singular),
  print,
  fields
}
