import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'

type coinMain = 'CLM' | 'LYNK'
export interface ISBase {
  popup: string[]
  drawer: string[]
  coinMain: coinMain
  email: string
  urlSystem: Record<string, any>
  siteKey: string
  isDesktop: boolean
}

const state: ISBase = {
  popup: [],
  drawer: [],
  coinMain: 'LYNK',
  email: '',
  urlSystem: {},
  // site key live
  // siteKey: '6Ld51lIdAAAAAEF0cK0CBRSL9H_nnGWJfKUYmcHz'
  // site key test
  siteKey: '6LcbbKAcAAAAAGS9BixBvH4okIBVNsY7lywPDleX',
  isDesktop: true
}

const beBase: Module<ISBase, unknown> = {
  namespaced: true,
  state,
  actions,
  mutations
}

export default beBase
