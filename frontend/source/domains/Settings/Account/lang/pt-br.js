import { SCOPES } from '@devitools/Agnostic/enum'

export const routes = {
  [SCOPES.SCOPE_EDIT]: {
    title: 'Minha Conta',
    crumb: 'Configurações / Minha Conta'
  }
}

export const fields = {
  name: {
    label: 'Nome',
    tooltip: 'Nome completo do atleta',
    placeholder: 'ex: Digite o nome'
  },
  apelido: {
    label: 'Apelido',
    tooltip: 'Apelido é a forma como será exibido o Nome do Atleta'
  },
  email: {
    label: 'E-mail',
    tooltip: 'E-mail de contato do atleta',
    placeholder: 'ex: Digite o e-mail'
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

export const actions = {
  update: {
    success: 'Perfil atualizado com sucesso'
  }
}

export const groups = {
  basico: 'Básico',
  adicional: 'Adicional'
}

export const separators = {
  pessoal: 'Dados Pessoais',
  contato: 'Contato',
  emergencia: 'Emergência'
}

export const validations = {
  rg: {
    requiredIf: 'RG é obrigatório'
  },
  cpf: {
    requiredIf: 'CPF é obrigatório'
  },
  documento: {
    requiredIf: 'Passaporte é obrigatório'
  },
  confirmacao: {
    sameAs: 'Confirmação de senha deve ser igual a senha'
  }
}

/**
 */
export default {
  routes,
  fields,
  groups,
  separators,
  validations
}
