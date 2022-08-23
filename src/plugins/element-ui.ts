import i18n from '@/utils/language'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// @ts-ignore
// import locale from 'element-ui/lib/locale/lang/vi'

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
