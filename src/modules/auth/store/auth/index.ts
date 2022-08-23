import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import Cookies from 'js-cookie'

export interface IAuth {
  access_token: string
  refresh_token: string
  typeLogin: string
  user: Record<string, any>
  moduleConfig: Record<string, boolean>
  featureConfig: Record<string, boolean>
  currencyCanWithDraw: string[]
  walletAddress: string
  userNft: Record<string, any>
  systemParamsPublic: Array<Record<string, any>>
}

const state: IAuth = {
  access_token: Cookies.get('access_token') || '',
  refresh_token: Cookies.get('refresh_token') || '',
  typeLogin: Cookies.get('type_login') || '',
  user: {},
  userNft: {},
  moduleConfig: {
    Deposit: false,
    Crowdsale: false,
    Transfer: false,
    Withdraw: false
  },
  currencyCanWithDraw: [],
  featureConfig: {
    buy: false,
    bid: false,
    offer: false,
    isExternalWallet: false,
    isExternalWalletMobile: false
  },
  walletAddress: '',
  systemParamsPublic: []
}

const beAuth: Module<IAuth, unknown> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default beAuth
