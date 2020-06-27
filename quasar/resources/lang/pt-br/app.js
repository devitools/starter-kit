import { app } from '@devitools/Lang/pt-br'

/**
 * @type {Object}
 */
export default {
  ...app,
  menu: {
    ...app.menu,
    balance: {
      label: 'Meu saldo',
      caption: 'Mostre seu saldo atual'
    }
  },
  export: {
    error: 'Não é possível exportar seus dados'
  }
}
