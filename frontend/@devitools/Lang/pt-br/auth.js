import { auth } from '../en-us'

/**
 */
export default {
  ...auth,
  signIn: {
    title: 'Bem vindo!',
    username: 'Nome de Usuário',
    password: 'Senha',
    button: 'Entrar',
    goToRegister: 'Quero me cadastrar',
    forgotPassword: 'Esqueci minha senha',
    error: 'Nome de usuário ou senha incorretos'
  },
  register: {
    title: 'Vamos lá! Insira suas informações',
    name: 'Nome',
    username: 'Nome de Usuário',
    password: 'Senha',
    confirmPassword: 'Confirmação de Senha',
    confirmation: '"Confirmação de Senha" não combina com "Senha"',
    phone: 'Celular',
    role: 'Perfil do negócio',
    person: 'Pessoa',
    createAccount: 'Registrar',
    backToLogin: 'voltar ao login',
    error: 'Erro inesperado'
  },
  forgotPassword: {
    title: 'Recuperar senha',
    username: 'Nome de Usuário',
    reset: 'enviar',
    backToLogin: 'voltar ao login',
    error: 'Erro inesperado',
    success: 'Mensagem de recuperação enviada com sucesso'
  }
}
