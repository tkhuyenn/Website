import request from '@/plugins/request'
import { AuthRepository } from '@/services/repositories/auth/index'
import getRepository from '@/services'
import { ActionTree } from 'vuex'
import { IAuth } from '.'
import Cookies from 'js-cookie'
import trim from 'lodash/trim'
import Moralis from 'moralis'
const authRes: AuthRepository = getRepository('auth')

const serverUrl = process.env.VUE_APP_KEY_SERVER_URL_MORALIS || ''
const appId = process.env.VUE_APP_KEY_APPID_MORALIS || ''

Moralis.start({ serverUrl, appId })

const actions: ActionTree<IAuth, unknown> = {
  async login({ commit, state }, data: { username: string; password: string }) {
    try {
      const result = await authRes.login(data)
      commit('SET_USER_INFO', result)
      request.defaults.headers.common['Authorization'] = `Bearer ${result.accessToken}`
      Cookies.set('access_token', result.accessToken, { expires: 1 })
      Cookies.set('type_login', 'WEB', { expires: 1 })

      await Moralis.User.logOut()
      commit('SET_WALLET_ADDRESS', '')
      // document.cookie = `access_token=${result.accessToken}; path=/; expires=1`
      // Cookies.set('refresh_token', result.refreshToken)
      // await apiActivity.createLogLogin({ sourceType: 'WEB' })
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async refreshToken({ commit, state }) {
    try {
      const data = {
        email: state.user.username,
        refreshToken: state.refresh_token
      }
      const result = await authRes.refreshToken(data)
      if (!result.accessToken || trim(result.accessToken) === '') {
        return Promise.reject({
          err: 401,
          msg: 'err'
        })
      }
      commit('SET_TOKEN', result)
      request.defaults.headers.common['Authorization'] = `Bearer ${result.accessToken}`
      Cookies.set('access_token', result.accessToken)
      Cookies.set('refresh_token', result.refreshToken)
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async logout({ commit }, status = true) {
    try {
      if (status) {
        await authRes.logout()
      }
      commit('LOG_OUT')
      Cookies.remove('access_token')
      Cookies.remove('refresh_token')
      request.defaults.headers.common['Authorization'] = ''

      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async getInfo({ commit }) {
    try {
      const result = await authRes.getInfo()
      commit('SET_INFO', result)
    } catch (error: any) {
      console.log('loi r', error.response)
      return Promise.reject(error)
    }
    // authRes
    //   .getInfo()
    //   .then(res => {
    //     commit('SET_INFO', res)
    //   })
    //   .catch(error => {
    //     console.log('loi r', error.response)
    //     return error
    //     // return Promise.reject(error)
    //   })
  },

  setToken({ commit }, data) {
    commit('SET_TOKEN', data)
    request.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`
    Cookies.set('access_token', data.accessToken, { expires: 1 })
    Cookies.set('refresh_token', data.refreshToken)
    Cookies.set('type_login', 'WEB', { expires: 1 })
  },

  async setConfigModule({ commit }, data) {
    commit('SET_CONFIG_MODULE', data)
  },
  async setFeatureConfig({ commit }, data) {
    commit('SET_FEATURE_CONFIG', data)
  },
  async setSystemParamsPublic({ commit }, data) {
    commit('SET_SYSTEM_PARAMS_PUBLIC', data)
  },

  setTokenExternalLogin({ commit }, data) {
    commit('SET_INFO_EXTERNAL_LOGIN', data)
    request.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`
    Cookies.set('access_token', data.accessToken)
    Cookies.set('type_login', 'EXTERNAL')
  },
  setTokenExternalLoginMobile({ commit }, data) {
    commit('SET_INFO_EXTERNAL_LOGIN', data)
    request.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`
    Cookies.set('access_token', data.accessToken, { expires: 1 })
    Cookies.set('type_login', 'EXTERNAL', { expires: 1 })
  }
}

export default actions
