import { ModuleInterface } from '@/interface/module'
import authRouters from './router'
import authStores from './store'

const authModule: ModuleInterface = {
  router: authRouters,
  stores: authStores
}

export default authModule
