import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementViLocale from 'element-ui/lib/locale/lang/vi' // element-ui lang
import elementRuLocale from 'element-ui/lib/locale/lang/ru-RU' // element-ui lang
import elementKoLocale from 'element-ui/lib/locale/lang/ko'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import elementJaLocale from 'element-ui/lib/locale/lang/ja'
import enLocale from './json/en.json'
import viLocale from './json/vi.json'
import ruLocale from './json/ru.json'
import krLocale from './json/kr.json'
import cnLocale from './json/cn.json'
import jpLocale from './json/jp.json'
Vue.use(VueI18n)

// function loadLocaleMessages(): Record<string, any> {
//   const locales = require.context('./json', true, /[A-Za-z0-9-_,\s]+\.json$/i)
//   const messages: Record<string, any> = {}
//   locales.keys().forEach(key => {
//     const matched = key.match(/([A-Za-z0-9-_]+)\./i)
//     if (matched && matched.length > 1) {
//       const locale = matched[1]
//       messages[locale] = locales(key)
//     }
//   })
//   return messages
// }
const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  vi: {
    ...viLocale,
    ...elementViLocale
  },
  ru: {
    ...ruLocale,
    ...elementRuLocale
  },
  kr: {
    ...krLocale,
    ...elementKoLocale
  },
  jp: {
    ...jpLocale,
    ...elementJaLocale
  },
  cn: {
    ...cnLocale,
    ...zhLocale
  }
}

export default new VueI18n({
  locale: localStorage.getItem('bc-lang')!,
  fallbackLocale: localStorage.getItem('bc-lang')!,
  messages
})
