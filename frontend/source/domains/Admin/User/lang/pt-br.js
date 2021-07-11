import { routes } from 'resources/lang/pt-br/helper'

const parent = 'Administração'
const singular = 'Usuário'
const plural = 'Usuários'

export const print = {
  title: `Imprimir ${singular}`
}

export const fields = {
  name: {
    label: 'Nome',
    tooltip: 'O nome usado para identificar o usuário',
    placeholder: 'ex: Usuário Exemplo'
  },
  email: {
    label: 'Email',
    tooltip: 'Email do usuário que será utilizado para recuperar senha e 2FA',
    placeholder: 'ex.: pqd@cbpq.org.br'
  },
  profile: {
    label: 'Perfil',
    tooltip: 'Especifique o nível de permissões do usuário',
    placeholder: 'Digite para pesquisar um perfil e clique na lista para selecionar ...'
  },
  active: {
    label: 'Ativo',
    tooltip: 'Este campo determina se um usuário poderá acessar a plataforma ou não',
    info: 'Permitir acesso'
  },
  password: {
    label: 'Senha',
    placeholder: 'ex.: @y5l3cGy (vazio será ignorado)',
    tooltip: 'A senha deve ter letras, números, símbolos especiais com no mínimo seis caracteres'
  },
  confirmation: {
    label: 'Confirmação de senha',
    placeholder: 'ex .: @ y5l3cGy (vazio será ignorado ao editar)',
    tooltip: 'Repita a senha para confirmar'
  }
}

export const validations = {
  name: {
    unique: 'Nome de usuário já em uso',
    regex: 'O nome de usuário fornecido não é válido'
  },
  password: {
    requiredIf: 'É necessária uma senha para criar usuário',
    regex: 'A senha deve conter letras, números e pelo menos seis caracteres'
  },
  confirmacao: {
    sameAs: 'A confirmação deve corresponder à senha'
  }
}

export const separators = {
  security: 'Segurança'
}

/**
 */
export default {
  routes: routes(parent, plural, singular),
  print,
  separators,
  fields,
  validations
}
