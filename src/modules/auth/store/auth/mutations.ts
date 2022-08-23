import filter from 'lodash/filter'
import { MutationTree } from 'vuex'

import { IAuth } from '.'
import forEach from 'lodash/forEach'
import includes from 'lodash/includes'

const mutations: MutationTree<IAuth> = {
  SET_USER_INFO: (state, data) => {
    state.user = data
    state.access_token = data.accessToken
    state.refresh_token = data.refreshToken
    state.typeLogin = 'WEB'
  },
  SET_INFO_EXTERNAL_LOGIN: (state, data) => {
    state.user = data
    state.access_token = data.accessToken
    state.typeLogin = 'EXTERNAL'
  },
  LOG_OUT: state => {
    state.user = {}
    state.access_token = ''
    state.refresh_token = ''
    state.typeLogin = 'WEB'
  },
  SET_INFO: (state, info) => {
    state.user = info
  },
  SET_TOKEN: (state, data) => {
    state.access_token = data.accessToken
    state.refresh_token = data.refreshToken
  },
  SET_CONFIG_MODULE: (state, listModule) => {
    forEach(listModule, module => {
      if (module.moduleCode === 'Withdraw') {
        state.currencyCanWithDraw = module.listCurrencies
      }
      if (module.displayStatus === 'ON' && module.status === 'GOLIVE') {
        state.moduleConfig[module.moduleCode] = true
      } else if (module.status === 'BETA') {
        state.moduleConfig[module.moduleCode] = includes(module.listUserIds, state.user.userId)
      } else {
        state.moduleConfig[module.moduleCode] = false
      }
    })
  },
  SET_FEATURE_CONFIG: (state, config) => {
    const featureBuy = filter(config, elm => elm.featureCode === 'BUY')[0]
    const featureBid = filter(config, elm => elm.featureCode === 'BID')[0]
    const featureOffer = filter(config, elm => elm.featureCode === 'OFFER')[0]
    const isExternalWallet = filter(config, elm => elm.featureCode === 'EXTERNAL_WALLET')[0]
    const isExternalWalletMobile = filter(config, elm => elm.featureCode === 'EXTERNAL_WALLET_MOBILE')[0]
    state.featureConfig.buy = featureBuy.status === 'GOLIVE' && featureBuy.displayStatus === 'ON'
    state.featureConfig.bid = featureBid.status === 'GOLIVE' && featureBid.displayStatus === 'ON'
    state.featureConfig.offer = featureOffer.status === 'GOLIVE' && featureOffer.displayStatus === 'ON'
    state.featureConfig.isExternalWallet = isExternalWallet.status === 'GOLIVE' && isExternalWallet.displayStatus === 'ON'
    state.featureConfig.isExternalWalletMobile = isExternalWalletMobile.status === 'GOLIVE' && isExternalWalletMobile.displayStatus === 'ON'
  },
  SET_SYSTEM_PARAMS_PUBLIC: (state, payload) => {
    state.systemParamsPublic = payload
  },
  SET_WALLET_ADDRESS: (state, address: string) => {
    state.walletAddress = address
  },
  SET_INFO_USER_NFT: (state, info: Record<string, any>) => {
    state.userNft = info
  }
}
export default mutations
