import Vue from 'vue'
import VueI18n, { LocaleMessages } from 'vue-i18n'

import ptBR from '../../resources/lang/pt-br'

declare module 'vue/types/vue' {
  interface Vue {
    i18n: VueI18n;
  }
}

Vue.use(VueI18n)

export const messages: LocaleMessages = {
  'pt-br': ptBR
}

const i18n = new VueI18n({
  locale: String(process.env.VUE_APP_LOCALE) || 'en-us',
  fallbackLocale: 'en-us',
  messages
})

export default i18n
