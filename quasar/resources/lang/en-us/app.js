import { app } from '@devitools/Lang/en-us'

/**
 * @type {Object}
 */
export default {
  ...app,
  menu: {
    ...app.menu,
    balance: {
      label: 'My Balance',
      caption: 'Show your current balance'
    }
  },
  export: {
    error: 'Can not export your data'
  }
}
