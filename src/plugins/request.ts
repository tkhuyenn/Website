import includes from 'lodash/includes'
import axios from 'axios'
import { Message } from 'element-ui'
import Cookies from 'js-cookie'
import store from '../store'
import i18n from '@/utils/language'
import { formatNumber, convertAmountDecimal } from '@/configs/format'

import Moralis from 'moralis'
const serverUrl = process.env.VUE_APP_KEY_SERVER_URL_MORALIS || ''
const appId = process.env.VUE_APP_KEY_APPID_MORALIS || ''
Moralis.start({ serverUrl, appId })

// const isAlreadyFetchingAccessToken = false
// let subscribers: any[] = []
const API_URL: string | undefined = process.env.VUE_APP_BASE_API

const request = axios.create({
  baseURL: API_URL,
  withCredentials: false
})

request.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'
request.defaults.headers.common['Authorization'] = Cookies.get('access_token') ? 'Bearer ' + Cookies.get('access_token') : ''

request.interceptors.request.use(request => {
  return request
})

// function onAccessTokenFetched(access_token: string) {
//   subscribers = subscribers.filter((callback: any) => callback(access_token))
// }

// function addSubscriber(callback: any) {
//   subscribers.push(callback)
// }

request.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log('>>> / file: request.ts / line 43 / error', error)
    const { config, data, status } = error.response
    // const originalRequest = config
    if (status === 401 || data.errorCode === 401) {
      Cookies.remove('access_token')
      Cookies.remove('refresh_token')
      request.defaults.headers.common['Authorization'] = ''
      location.href = '/login'
      Moralis.User.logOut()
      store.commit('beAuth/SET_WALLET_ADDRESS', '')
      // if (!isAlreadyFetchingAccessToken) {
      //   isAlreadyFetchingAccessToken = true
      //   store
      //     .dispatch('beAuth/refreshToken')
      //     .then(res => {
      //       isAlreadyFetchingAccessToken = false
      //       onAccessTokenFetched(res.accessToken)
      //     })
      //     .catch(err => {
      //       // store.dispatch('beAuth/logout')
      //       Cookies.remove('access_token')
      //       Cookies.remove('refresh_token')
      //       request.defaults.headers.common['Authorization'] = ''
      //       setTimeout(() => {
      //         location.href = '/'
      //       }, 2000)
      //       return err
      //     })
      // }
      // const retryOriginalRequest = new Promise(resolve => {
      //   addSubscriber(access_token => {
      //     originalRequest.headers.Authorization = 'Bearer ' + access_token
      //     resolve(axios(originalRequest))
      //   })
      // })
      // return retryOriginalRequest
    }
    if (data.statusCode === 400 || data.httpStatus == 400) {
      let message: any = ''

      //return error về xử lý ở popup transfer nft
      const listStatus = [
        'WRONG_RECEIVE_ADDRESS',
        'INVALID_PIN',
        'LESS_THAN_ZERO',
        'BALANCE_NOT_ENOUGH',
        'RECEIVER_NOT_EXIST',
        'MORE_OWN_QUANTITY',
        'NOT_OWN_ITEM',
        'NOT_ENOUGH_QUANTITY'
      ]
      if (includes(listStatus, data.status) && includes(config.url, 'item/transfer')) {
        return Promise.reject(error)
      }
      // end

      if (data.status === 'INVALID_MIN_TO_BUY_CROWDSALE') {
        const amount = data.message.replace(/[^0-9]/g, '')
        const _amount = formatNumber(amount)
        message = i18n.t('notify.min-to-buy-crowdsale', { amount: _amount })
      }
      if (data.code === 'INVALID_TOKEN_TO_USD_EXCHANGE_RATE') {
        message = i18n.t('notify.invalid-token-to-usd')
      }

      if (data.status === 'INVALID_TOKEN_TO_USD_EXCHANGE_RATE') {
        message = i18n.t('notify.invalid-exchange-rate')
      }

      if (data.message === 'User not exits' || data.message === 'Username or password is incorrect') {
        message = i18n.tc('notify.user-exits')
      }
      if (data.message === 'Please update your profile before sending KYC request') {
        message = i18n.tc('notify.error-request-kyc')
      }
      if (data.status === 'INVALID_PASSWORD') {
        message = i18n.tc('notify.pass-invalid')
      }
      if (data.message === 'Email already register' || data.status === 'ACCOUNT_ALREADY_EXISTS') {
        message = i18n.tc('notify.email-register')
      }
      if (data.message === 'Phone already register') {
        message = i18n.tc('notify.phone-already-register')
      }
      if (data.message === 'Wrong more than over times. User locked!') {
        message = i18n.tc('notify.user-locked')
      }
      if (data.message === 'Crowd sales round does not exist or has ended') {
        message = i18n.tc('notify.crowd-sale-ended')
      }
      if (data.message === 'Invalid asset balances') {
        message = i18n.tc('notify.invalid-balances')
      }
      if (data.message === 'Invalid token amount') {
        message = i18n.tc('notify.invalid-token-amount')
      }
      if (data.message === 'Invalid token address') {
        message = i18n.tc('notify.invalid-token-address')
      }
      if (data.message === 'ID number is not valid.') {
        message = i18n.tc('notify.id-number-is-not-valid')
      }

      if ((data.status === 'USER_LOCKED' || data.status === 'USER_BLOCKED') && config.url == `${API_URL}/api/v1/user/info)`) {
        return Promise.reject(error)
      }
      if (data.status === 'USER_LOCKED' && includes(config.url, 'settings/gen-code')) {
        message = i18n.tc('notify.user-locked')
        Message.error({ message, duration: 5000 })
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        request.defaults.headers.common['Authorization'] = ''
        setTimeout(() => {
          location.href = '/login'
        }, 2000)
        return Promise.reject(error)
      }
      if (data.status === 'USER_LOCKED') {
        message = i18n.tc('notify.user-locked')
        Message.error({ message, duration: 5000 })
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        request.defaults.headers.common['Authorization'] = ''
        setTimeout(() => {
          location.href = '/login'
        }, 2000)
        return Promise.reject(error)
      }
      if (data.status === 'BAD_REQUEST' && data.message === 'Incorrect old password' && includes(config.url, 'change-pass')) {
        message = i18n.tc('notify.incorrect-old-pass')
      }
      if (data.status === 'USER_BLOCKED' && includes(config.url, 'resendCode')) {
        // return Promise.reject(error)
        message = i18n.tc('notify.user-blocked')
        Message.error({ message, duration: 5000 })
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        request.defaults.headers.common['Authorization'] = ''
        setTimeout(() => {
          location.href = '/login'
        }, 3000)

        return
      }
      if (data.status === 'USER_BLOCKED') {
        message = i18n.tc('notify.user-blocked')
        Message.error({ message, duration: 5000 })
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        request.defaults.headers.common['Authorization'] = ''
        setTimeout(() => {
          location.href = '/login'
        }, 3000)
        message = i18n.tc('notify.user-blocked')
        return
      }
      if (data.status === 'INVALID_EMAIL') {
        message = i18n.tc('notify.email-invalid')
      }
      if (data.message == 'Invalid email affiliate') {
        message = i18n.tc('notify.invalid-email')
      }
      if (data.status === 'USER_EXPIRED') {
        message = i18n.tc('notify.user-expired')
      }
      if (data.status === 'TRANSACTION_EXPIRED') {
        message = i18n.tc('notify.transaction-expired')
      }
      if (data.status === 'BALANCE_CHANGED') {
        message = i18n.tc('notify.balance-changed')
      }
      if (data.status === 'INVALID_TRANSACTION_ID') {
        message = i18n.tc('notify.invalid-transaction-id')
      }
      if (data.status === 'INVALID_VERIFICATION' && includes(config.url, 'reset-pass')) {
        return Promise.reject(error)
      }
      if (includes(config.url, '0/reset-pin')) {
        return Promise.reject(error)
      }
      if ((data.status === 'INVALID_VERIFICATION' || data.status === 'EXPIRED_VERIFICATION') && includes(config.url, 'user/change-phone')) {
        if (includes(data.message, 'New phone number verification code is incorrect')) {
          message = i18n.tc('notify.incorrect-new-phone')
        }
        if (includes(data.message, 'Old phone number verification code is incorrect')) {
          message = i18n.tc('notify.incorrect-old-phone')
        }
        if (includes(data.message, 'Old phone number verification code is expired')) {
          message = i18n.tc('notify.expired-old-phone')
        }
        if (includes(data.message, 'New phone number verification code is expired')) {
          message = i18n.tc('notify.expired-new-phone')
        }
        Message.error({ message, duration: 5000 })
        return Promise.reject(error)
      }
      if (
        data.status === 'INVALID_VERIFICATION' &&
        !includes(config.url, 'user/0/reset-wrong-code') &&
        !includes(config.url, 'settings/0/reset2FA') &&
        !includes(config.url, 'user/change-phone')
      ) {
        message = i18n.tc('notify.verify-fail')
      }
      if (data.status === 'INVALID_CAPTCHA') {
        message = i18n.tc('notify.captcha-invalid')
      }
      if (data.status === 'EXPIRED_VERIFICATION' && (includes(config.url, 'reset-pass') || includes(config.url, 'user/0/reset-wrong-code'))) {
        return Promise.reject(error)
      }
      if (data.status === 'EXPIRED_VERIFICATION' && includes(config.url, 'reset-pin')) {
        return Promise.reject(error)
      }
      if (data.status === 'EXPIRED_VERIFICATION' && (includes(config.url, 'updateApp2fa') || includes(config.url, 'changeAppDevice/verify'))) {
        return Promise.reject(error)
      }

      if (data.message === 'Invalid verification code' && includes(config.url, 'pin/update')) {
        message = i18n.tc('notify.verify-fail')
      }
      if (data.data === 'Old pin and new pin cannot be same.' && includes(config.url, 'pin/update')) {
        message = i18n.tc('notify.verify-fail3')
      }
      if (data.message === 'old pin not match' && includes(config.url, 'pin/update')) {
        message = i18n.tc('notify.verify-fail4')
      }
      if (data.message == 'New phone number same old phone number' && includes(config.url, 'user/change-phone/code')) {
        message = i18n.tc('popupChangeNumberPhone.errorNewPhone1')
      }
      if (data.message == 'An account already exists with this phone number' && includes(config.url, 'user/change-phone/code')) {
        message = i18n.tc('popupChangeNumberPhone.errorNewPhone2')
      }
      if (data.message == 'Module not enable!' && includes(config.url, 'transfer/lynk/info')) {
        message = i18n.tc('wallet.popup.errorGetLyn5')
      }
      if (data.message == 'Asset address not found!' && includes(config.url, 'transfer')) {
        message = i18n.tc('wallet.popup.errorGetLyn')
      }
      if (data.message == 'Asset address not found!' && includes(config.url, 'withdraw')) {
        message = i18n.tc('wallet.popup.errorGetLyn')
      }
      if (data.message == 'Currency not available!' && includes(config.url, 'transfer')) {
        message = i18n.tc('wallet.popup.errorGetLyn3')
      }
      if (data.message == 'Currency not available!' && includes(config.url, 'withdraw')) {
        message = i18n.tc('wallet.popup.errorGetLyn3')
      }
      if (data.message == 'Asset address not found!' && includes(config.url, 'validate')) {
        return
      }
      if (data.message == `This account isn't KYC verified!` && includes(config.url, 'transfer')) {
        message = i18n.tc('wallet.popup.errorTransferLyb')
      }
      if (data.status == 'INVALID_VERIFICATION' && includes(config.url, 'transfer')) {
        message = i18n.tc('wallet.popup.errorTransferLyb1')
      }
      if (data.status == 'EXPIRED_VERIFICATION' && includes(config.url, 'transfer')) {
        message = i18n.tc('wallet.popup.errorTransferLyb2')
      }
      if (data.status == 'INVALID_PIN' && includes(config.url, 'transfer')) {
        message = i18n.tc('wallet.popup.errorTransferLyb3')
      }
      if (data.status == 'USER_LOCKED' && includes(config.url, 'transfer')) {
        message = i18n.tc('wallet.popup.errorTransferLyb4')
      }
      if (data.status == 'INVALID_ASSET_ADDRESS' && includes(config.url, 'transfer')) {
        message = i18n.tc('wallet.popup.errorTransferLyb5')
      }
      if (data.status == 'INVALID_AMOUNT' && includes(config.url, 'transfer')) {
        message = i18n.tc('wallet.popup.errorTransferLyb6')
      }
      if (data.status == 'INVALID_FEE' && includes(config.url, 'transfer')) {
        message = i18n.tc('wallet.popup.errorTransferLyb8')
      }
      if (data.status == 'INVALID_EXCHANGE_RATE' && includes(config.url, 'transfer')) {
        message = i18n.tc('wallet.popup.errorTransferLyb9')
      }

      // withdraw
      if (data.status == 'AMOUNT_TOO_LOW' && includes(config.url, '/validate')) {
        message = i18n.tc('wallet.popup.amount-to-low')
      }
      if (data.message == `This account isn't KYC verified!` && includes(config.url, 'transfer')) {
        message = i18n.tc('wallet.popup.errorTransferLyb')
      }
      if (data.status == 'INVALID_VERIFICATION' && includes(config.url, 'withdraw/lynk')) {
        message = i18n.tc('wallet.popup.errorTransferLyb10')
      }
      if (data.status == 'INVALID_VERIFICATION' && includes(config.url, 'withdraw')) {
        message = i18n.tc('wallet.popup.errorTransferLyb1')
      }
      if (data.status == 'EXPIRED_VERIFICATION' && includes(config.url, 'withdraw')) {
        message = i18n.tc('wallet.popup.errorTransferLyb2')
      }
      if (data.status === 'EXPIRED_VERIFICATION') {
        message = i18n.tc('notify.code-expired')
      }
      if (data.status == 'INVALID_PIN' && includes(config.url, 'withdraw')) {
        message = i18n.tc('wallet.popup.errorTransferLyb3')
      }
      if (data.status == 'USER_LOCKED' && includes(config.url, 'withdraw')) {
        message = i18n.tc('wallet.popup.errorTransferLyb4')
      }
      if (data.status == 'INVALID_ASSET_ADDRESS' && includes(config.url, 'withdraw')) {
        message = i18n.tc('wallet.popup.errorTransferLyb5')
      }
      if (data.status == 'INVALID_AMOUNT' && includes(config.url, 'withdraw')) {
        message = i18n.tc('wallet.popup.errorTransferLyb6')
      }
      if (data.status == 'INVALID_FEE' && includes(config.url, 'withdraw')) {
        message = i18n.tc('wallet.popup.errorTransferLyb8')
      }
      if (data.status == 'INVALID_EXCHANGE_RATE' && includes(config.url, 'withdraw')) {
        message = i18n.tc('wallet.popup.errorTransferLyb9')
      }
      if (data.message == "To address must different your's address!" && includes(config.url, 'withdraw')) {
        message = i18n.tc('wallet.popup.errorTransferLyb11')
      }
      if (data.status == 'RECIPIENT_IS_INTERNAL_ADDRESS' && includes(config.url, 'withdraw')) {
        message = i18n.tc('wallet.popup.errorTransferLyb12')
      }

      if (data.message == 'old password not match' && includes(config.url, 'change-pass')) {
        message = i18n.tc('notify.oldPasswordError')
      }
      if (data.status == 'INVALID_PIN' && includes(config.url, 'check-pin')) {
        message = i18n.tc('notify.errorCheckPinCode')
      }
      if (data.status == 'USER_LOCKED' && includes(config.url, 'check-pin')) {
        message = i18n.tc('notify.errorPinCodeLock')
      }

      // Error Buy
      // const listStatusBuy = [
      //   'NFT_OWNER_NOT_EXISTS',
      //   'INVALID_INPUT_PARAMETER',
      //   'BALANCE_NOT_ENOUGH',
      //   'ITEM_QUANTITY_NOT_ENOUGH',
      //   'NFT_ITEM_IS_NOT_OFF_CHAIN',
      //   'INVALID_SERVICE_FEE',
      //   'INVALID_PERCENT_ROYALTIES_FEE',
      //   'INVALID_USD_EXCHANGE_RATE',
      //   'NFT_ACTIVITY_NOT_EXISTS',
      //   'INVALID_CURRENCY',
      //   'NFT_ITEM_IS_NOT_ON_CHAIN'
      // ]
      // if (includes(listStatusBuy, data.status) && includes(config.url, 'buy-nft')) {
      //   return Promise.reject(error)
      // }
      if (data.status == 'NFT_OWNER_NOT_EXISTS' && includes(config.url, 'buy-nft')) {
        message = i18n.tc('notify.owner-not-exists')
      }
      if (data.status == 'BALANCE_NOT_ENOUGH' && includes(config.url, 'buy-nft')) {
        message = i18n.tc('notify.balance-not-enough')
      }
      if (data.status == 'INVALID_INPUT_PARAMETER' && includes(config.url, 'buy-nft')) {
        message = i18n.tc('notify.invalid-input-parameter')
      }
      if (data.status == 'ITEM_QUANTITY_NOT_ENOUGH' && includes(config.url, 'buy-nft')) {
        message = i18n.tc('notify.quanity-not-enough')
      }
      if (data.status == 'NFT_ITEM_IS_NOT_OFF_CHAIN' && includes(config.url, 'buy-nft')) {
        message = i18n.tc('notify.item-not-off-chain')
      }
      if (data.status == 'INVALID_SERVICE_FEE' && includes(config.url, 'buy-nft')) {
        message = i18n.tc('notify.invalid-service-fee')
      }
      if (data.status == 'INVALID_PERCENT_ROYALTIES_FEE' && includes(config.url, 'buy-nft')) {
        message = i18n.tc('notify.invalid-royalties-fee')
      }
      if (data.status == 'INVALID_USD_EXCHANGE_RATE' && includes(config.url, 'buy-nft')) {
        message = i18n.tc('notify.invalid-usd-exchange-rate')
      }
      if (data.status == 'NFT_ACTIVITY_NOT_EXISTS' && includes(config.url, 'buy-nft')) {
        message = i18n.tc('notify.activity-not-exists')
      }
      if (data.status == 'INVALID_CURRENCY' && includes(config.url, 'buy-nft')) {
        message = i18n.tc('notify.invalid-currency')
      }
      if (data.status == 'NFT_ITEM_IS_NOT_ON_CHAIN' && includes(config.url, 'buy-nft')) {
        message = i18n.tc('notify.not-on-chain')
      }

      // Change Price
      if (data.status == 'LESS_MIN_PRICE' && includes(config.url, '/change-price')) {
        message = i18n.tc('notify.price-less')
      }
      if (data.status == 'GREATER_CURRENT_PRICE') {
        message = i18n.tc('notify.greater-current')
      }
      if (data.status == 'ITEM_IS_NOT_EXIST') {
        message = i18n.tc('notify.item-not-exist')
      }
      if (data.status == 'NOT_LISTED_ITEM') {
        message = i18n.tc('notify.not-listed')
      }
      if (data.status == 'NOT_HAVE_ITEM') {
        message = i18n.tc('notify.not-have')
      }

      //put on sale
      if (data.status == 'LESS_MIN_PRICE' && includes(config.url, 'item/listing')) {
        return Promise.reject(error)
      }
      if (data.status == 'MORE_OWN_QUANTITY' && includes(config.url, 'item/listing')) {
        message = i18n.tc('notify.more-own-quantity')
      }

      //pop up about market
      if (data.message == 'must be a well-formed email address') {
        message = i18n.tc('notify.email-incorrect')
      }

      //popup make offer
      if (data.status == 'LESS_MIN_PRICE' && includes(config.url, '/make-offer')) {
        // const amount = data.message.replace(/[^0-9]/g, '')
        // const _amount = formatNumber(amount)
        // message = i18n.t('notify.min-to-buy-crowdsale', { amount: _amount })
        // const format = data.data[0].currency
        // const _format = convertAmountDecimal(format)
        message = i18n.tc('notify.price-less1') + data.data[0].minPrice + ` ` + data.data[0].currency
        // .convertAmountDecimal(data.data[0].currency)
        // message = i18n.tc('notify.invalid-usd-exchange-rate')
      }
      if (data.status === 'DONT_ACCEPT_CURRENCY' && includes(config.url, '/make-offer')) {
        return Promise.reject(error)
      }

      //validate address
      if (data.status === 'WRONG_RECEIVE_ADDRESS') {
        message = i18n.tc('notify.wrong-receive-address')
      }

      if (data.status === 'ITEM_INACTIVE') {
        message = i18n.tc('notify.item-inactive')
      }
      if (data.status === 'REQUIRE_CAPTCHA') {
        message = i18n.tc('notify.user-not-exist')
      }
      if (data.status === 'USER_NOT_EXISTS') {
        message = i18n.tc('notify.user-not-exist')
      }

      // delete account list status
      const deleteAccountStatus = ['INVALID_BALANCE', 'EXPIRED_VERIFICATION', 'USER_LOCKED', 'OWNING_NFT', 'INVALID_VERIFICATION']
      if (includes(deleteAccountStatus, data.status) && (includes(config.url, 'user/delete') || includes(config.url, 'user/delete/validate'))) {
        return Promise.reject(error)
      }
      // handler error in delete account

      if (message) {
        Message.error({ message, duration: 5000 })
      }
    }
    if (!error.response || error.response.status >= 500) {
      // error.message = 'Không thể kết nối đến máy chủ'
      let message = ''
      message = i18n.tc('notify.500')
      Message.error({ message, duration: 5000 })
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

export default request
