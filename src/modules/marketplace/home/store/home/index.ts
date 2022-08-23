import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'

export interface IAuth {
  blockMeta: Array<Record<string, any>>
  productMeta: Array<Record<string, any>>
  projectMeta: Array<Record<string, any>>
  featureMeta: Array<Record<string, any>>
}

const state: IAuth = {
  blockMeta: [],
  productMeta: [],
  projectMeta: [],
  featureMeta: []
}

const bcMarketPrimaryHome: Module<IAuth, unknown> = {
  namespaced: true,
  state,
  actions,
  mutations
}

export default bcMarketPrimaryHome
