import Cookies from 'js-cookie'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
// import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import store from '../store'
import includes from 'lodash/includes'
import Layout from '@/components/layout/marketplace/Layout.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',

    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('../modules/landing/view/Home.vue')
      },
      {
        path: '/download-app',
        name: 'download-app-ido',
        component: () => import('../modules/landing/Download-app.vue')
      }
    ]
  },
  // {
  //   path: '/user/delete',
  //   name: 'userDelete',
  //   component: () => import('../modules/setting/view/DeleteAccount.vue')
  // },
  {
    path: '*',
    name: 'notFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  //@ts-ignore
  if (to.name === 'Wallet' && store.state.beBase.coinMain === 'LYNK') {
    router.push({ name: 'WalletLyn', query: to.query }).catch(err => err)
  }
  //@ts-ignore
  if (to.name === 'Wallet' && store.state.beBase.coinMain === 'CLM') {
    router.push({ name: 'WalletClm', query: to.query }).catch(err => err)
  }
  //@ts-ignore
  if (to.name === 'WalletLyn' && store.state.beBase.coinMain === 'CLM') {
    router.push({ name: 'WalletClm', query: to.query }).catch(err => err)
  }
  //@ts-ignore
  if (to.name === 'WalletClm' && store.state.beBase.coinMain === 'LYNK') {
    router.push({ name: 'WalletLyn', query: to.query }).catch(err => err)
  }

  if (to.meta?.isNotLogin) {
    if (to.name === 'verify-phone' && to.query.reason === 'CHANGE_PHONE') {
      next()
      return
    }
    if (to.name === 'reset-password' && to.query.reason === 'UNLOCK_USER') {
      next()
      return
    }
    if (Cookies.get('access_token') && Cookies.get('type_login') === 'WEB') {
      location.href = '/'
      return
    }
    next()
    return
  }
  if (!store.getters['beAuth/isLogin']) {
    const whiteList: string[] = [
      'reset-2fa',
      'unlock-user',
      'reset-pin',
      'userDelete',

      // Router marketplace nft
      'MarketPlace',
      'TopCollection',
      'DetailCollection',
      'DetailCategory',
      'DetailNftItem',
      'MyProfileNft',
      'UserProfile',
      'homeCLM',

      // Router marketplace cũ
      'MarketPlacePrimary',
      'DetailProject',
      'DetailProjectPrimary',
      'ProjectList',
      'ListProduct',

      // Router landing
      'download-app',
      'home',
      'download-app-ido',
      'Landing',
      'notFound',

      //router profile khi login external
      'Profile'
    ]
    if (includes(whiteList, to.name)) {
      next()
      // const a = document.querySelector('#main-center')
      // a?.scrollTo(0, 0)
      window.scrollTo(0, 0)
      return
    } else {
      router.push({ name: 'login' })
      Cookies.remove('access_token')
      Cookies.remove('refresh_token')
      location.href = '/'
    }
  }
  next()
  window.scrollTo(0, 0)
})

export default router
