import { ModuleInterface } from '@/interface/module'
import authModule from './auth'
import marketplaceModule from './marketplace/home'
const listModules: Record<string, ModuleInterface> = {
  authModule,
  marketplaceModule
}

export default listModules
