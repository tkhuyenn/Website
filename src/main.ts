import Vue from 'vue'
import App from './App.vue'

import './registerServiceWorker'
import router from './router'
import './icons'
import './assets/styles/index.scss'
// import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// // optional style for arrows & dots
// import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

import i18n from '@/utils/language'

import store from './store'

// import module
import listModules from '@/modules'

//format
import * as format from '@/configs'

//plugins
import './plugins/element-ui'

// import module
import forEach from 'lodash/forEach'

// base components
import components from './components/base'

import VueSocialSharing from 'vue-social-sharing'

Vue.use(VueSocialSharing)

//end

Vue.config.productionTip = false

forEach(components, (value, key) => {
  Vue.component(key, value)
})
// modules
forEach(listModules, module => {
  // register route
  forEach(module.router, value => {
    router.addRoute(value)
  })

  // // register store
  forEach(module.stores, (value, key) => {
    store.registerModule(key, value)
  })

  // //register component
  forEach(module.components, (value, key) => {
    Vue.component(key, value)
  })
})

//register filter
Object.keys(format).forEach(key => {
  Vue.filter(key, (format as any)[key])
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
