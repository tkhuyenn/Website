import { ModuleInterface } from '@/interface/module'
import marketplaceRouters from './router'
import marketHomeStores from './store'
const marketplaceModule: ModuleInterface = {
  router: marketplaceRouters,
  stores: marketHomeStores
}

export default marketplaceModule
