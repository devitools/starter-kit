import { SCOPES } from '@devitools/Agnostic/enum'

/**
 */
export default {
  routes: {
    group: {
      crumb: 'Admin / Usuários'
    },
    [SCOPES.SCOPE_INDEX]: {
      title: 'Usuários'
    },
    [SCOPES.SCOPE_Trash]: {
      title: 'Usuário Lixeira',
      crumb: 'Lixeira'
    },
    [SCOPES.SCOPE_ADD]: {
      title: 'Create Usuário',
      crumb: 'Create'
    },
    [SCOPES.SCOPE_View]: {
      title: 'Ver Usuário',
      crumb: 'Ver'
    },
    [SCOPES.SCOPE_Edit]: {
      title: 'Editar Usuário',
      crumb: 'Editar'
    }
  },
  print: {
    title: 'Impressão do usuário'
  },
  fields: {
    name: {
      label: 'Nome',
      tooltip: 'O nome usado para identificar o usuário',
      placeholder: 'ex: John Doe'
    },
    Usuárioname: {
      label: 'Usuário',
      tooltip: 'Especifique o nível de permissão do usuário',
      placeholder: 'ex.: john_doe'
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
      placeholder: 'ex.: @y5l3cGy (empty will be ignored when Editaring)',
      tooltip: 'A senha deve ter letras, números, símbolos especiais com no mínimo seis caracteres'
    },
    confirmPassword: {
      label: 'Confirmação de senha',
      placeholder: 'ex .: @ y5l3cGy (vazio será ignorado ao Editarar)',
      tooltip: 'Repita a senha para confirmar'
    }
  },
  validation: {
    Usuárioname: {
      unique: 'Nome de usuário já em uso',
      regex: 'O nome de usuário fornecido não é válido'
    },
    password: {
      requiredIf: 'É necessária uma senha para criar usuário',
      regex: 'A senha deve conter letras, números e pelo menos seis caracteres'
    },
    confirmPassword: {
      sameAs: 'A confirmação deve corresponder à senha'
    }
  }
}
