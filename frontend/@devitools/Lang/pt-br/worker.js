import { worker } from '../en-us'

/**
 */
export default {
  ...worker,
  ready: {
    message: 'O aplicativo pronto'
  },
  cached: {
    message: 'O aplicativo está em cache'
  },
  update: {
    message: 'Há uma atualização disponível para esse aplicativo',
    warning: 'Há uma atualização disponível para esse aplicativo.<br>' +
      'Atualização automática em {minutes} minutos.',
    close: 'Fechar',
    confirm: 'Atualizar',
    updating: 'Atualizando o aplicativo...'
  }
}
