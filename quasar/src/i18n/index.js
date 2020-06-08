import Vue from 'vue'
import VueI18n from 'vue-i18n'

import enUs from '../../resources/lang/en-us'

Vue.use(VueI18n)

/**
 */
export default new VueI18n({
  locale: String(process.env.VUE_APP_LOCALE),
  fallbackLocale: 'en-us',
  messages: {
    'en-us': enUs
  }
})
