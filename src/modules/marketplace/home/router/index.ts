import LayoutMarketplace from '@/components/layout/marketplace/Layout.vue'
import { RouteConfig } from 'vue-router'
import RedirectDownloadApp from '@/modules/marketplace/home/components/RedirectDownloadApp.vue'

const marketplaceRouters: RouteConfig[] = [
  {
    path: '/marketplace-real-estate',
    component: LayoutMarketplace,
    children: [
      {
        path: '/',
        name: 'MarketMainPrimary',
        redirect: { name: 'MarketPlacePrimary' },
        component: () => import('../view/Home.vue'),
        children: [
          {
            path: 'real-estate',
            name: 'MarketPlacePrimary',
            component: () => import('../view/MarketPlace.vue')
          },
          {
            path: 'real-estate/detail/:type/:id',
            name: 'DetailProjectPrimary',
            component: () => import('../view/DetailProject.vue')
          },
          {
            path: 'real-estate/product-list',
            name: 'ListProduct',
            component: () => import('../view/ProductList.vue')
          },
          {
            path: 'real-estate/project-list',
            name: 'ProjectList',
            component: () => import('../components/detail-project/ProjectList.vue')
          }
        ]
      },
      {
        path: '*',
        redirect: '/marketplace-real-estate'
      }
    ]
  },
  {
    path: '/mobile-app/download',
    component: RedirectDownloadApp,
    name: 'download-app'
  }
]

export default marketplaceRouters
