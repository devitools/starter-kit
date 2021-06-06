import { boot } from 'quasar/wrappers'
import i18n from 'src/i18n'

export default boot(({ app }) => {
  // Set i18n instance on app
  app.i18n = i18n
})
