/**
 * messages to routes
 * crumb is used in breadcrumb
 * @see AppBreadcrumb
 * title is used to update the document.title for update router middleware
 * @see updateTitle
 */
export default {
  '/': {
    title: 'Entrar'
  },
  '/dashboard': {
    crumb: 'Início'
  },
  '/dashboard/home': {
    title: 'Início'
  },
  auth: {
    signIn: {
      title: 'Bem vindo(a)!',
      email: 'Email / Usuário',
      password: 'Senha',
      button: 'Entrar',
      goToRegister: 'Quero me cadastrar',
      forgotPassword: 'Esqueci minha senha',
      error: 'Verifique os dados e tente novamente!',
      errorRecaptcha: 'Favor preencher o captcha'
    },
    forgotPassword: {
      title: 'Recuperação de Senha',
      titleRecovering: 'Digite o código enviado no seu e-mail',
      sendAgain: 'Não recebeu? Clique aqui para reenviar',
      email: {
        label: 'Email / Usuário',
        error: 'Nome de usuário inválido.'
      },
      code: {
        error: 'O código informado não é válido'
      },
      password: {
        label: 'Nova senha',
        error: 'Senha é obrigatório e mínimo 6 caracteres'
      },
      confirmPassword: {
        label: 'Confirmar nova senha',
        error: 'Confirmar senha é obrigatório e deve ser igual ao campo acima'
      },
      requestVerificationCode: 'Solicitar Código',
      updatePasswordButton: 'Atualizar senha',
      backToSignIn: 'Lembrei minha senha',
      gotoTypeTheCode: 'Tenho um código',
      validateVerificationCode: 'Avançar',
      backToRequestCode: 'Pedir um código'
    }
  },
  dashboard: {
    index: {
      version: 'versão',
      update: 'Verificar atualizações',
      notification: 'Visualizar notificações',
      'open-in-popup': 'Abrir em nova janela'
    },
    registration: {
      'athlete-license-renew': {
        unallowed: 'A <b>{federacao_nome}</b> ainda não iniciou seu processo de renovação por este canal',
        unavailable: 'Este recurso está disponível apenas para usuários que estejam credenciados como atletas ou profissionais.',
        approved: {
          mainText: 'Sua licença <b>{tipo}</b> está aprovada para o período de <b>{data_inicio}</b> a <b>{data_termino}</b>',
          goodLuck: 'Bons saltos!'
        }
      }
    },
    notification: {
      label: 'Notificações',
      caption: 'Visualiza as mensagens do usuário conectado'
    }
  }
}
