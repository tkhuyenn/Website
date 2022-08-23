import trim from 'lodash/trim'
import { IAuth } from './index'
import { GetterTree } from 'vuex'
import { filter } from 'lodash'

const getters: GetterTree<IAuth, any> = {
  isLogin: state => {
    return !!state.access_token && trim(state.access_token) !== '' && state.typeLogin === 'WEB'
  },
  isBid: state => {
    return state.featureConfig.bid
  },
  isBuy: state => {
    return state.featureConfig.buy
  },
  isOffer: state => {
    return state.featureConfig.offer
  },
  isExternalWallet: state => {
    return state.featureConfig.isExternalWallet
  },
  isExternalWalletMobile: state => {
    return state.featureConfig.isExternalWalletMobile
  },
  isShowCheckboxAccept: state => {
    const module = filter(state.systemParamsPublic, param => param.key === 'system.marketplace.payment.require.accept.policies')
    if (module.length) {
      return module[0].value === 'ON'
    }
    return false
  }
}

export default getters
