import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'
import { IBodyApiVerify } from '@/interface'
import axios from 'axios'
import DeviceDetector from 'device-detector-js'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

const VER_APP = process.env.VUE_APP_VERSION

export class AuthRepository extends BaseRepository {
  constructor() {
    super('api/v1/user')
  }

  async register(data: Record<string, any>, captcha: string): Promise<any> {
    try {
      const device = await this.getInfoDevice()
      const rs = await request.post(`${this.prefix}/register`, data, {
        headers: {
          'captcha-response': captcha,
          Device: device
        }
      })
      return Promise.resolve(rs.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }

  async getVisitorId(): Promise<string> {
    try {
      const fpPromise = FingerprintJS.load()
      const fp = await fpPromise
      const result = await fp.get()
      return Promise.resolve(result.visitorId)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async login(data: Record<string, any>): Promise<any> {
    try {
      const device = await this.getInfoDevice()

      delete request.defaults.headers.common['Authorization']
      // const result = await request.post(`${this.prefix}/login`, data)
      const result = await request.post(`${this.prefix}/login`, data, {
        headers: {
          Device: device
        }
      })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async logout(): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/logout`)
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async get2FA(data: Record<string, any>, captcha: string): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/get2FA`, {
        headers: {
          'captcha-response': captcha
        },
        params: { ...data }
      })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async validateUser(data: Record<string, any>, captcha: string): Promise<any> {
    try {
      const device = await this.getInfoDevice()
      delete request.defaults.headers.common['Authorization']
      const rs = await request.post(`${this.prefix}/validate`, data, {
        headers: {
          'captcha-response': captcha,
          Device: device
        }
      })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async resendCode(data: Record<string, any>, userId = 0): Promise<any> {
    try {
      const rs = await request.post(`${this.prefix}/${userId}/resendCode`, data)
      Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getInfoDevice(): Promise<string> {
    const deviceUuid = await this.getVisitorId()

    const deviceDetector = new DeviceDetector()

    const userAgent = window.navigator.userAgent
    const appName = 'LynKey Wallet'
    const appVersion = process.env.VUE_APP_VERSION

    const device = deviceDetector.parse(userAgent)

    const deviceType = device.device?.type
    const deviceOs = device.os?.name
    const deviceOsVersion = (device.os?.name as string) + ' ' + device.os?.version
    const deviceName = (device.client?.name as string) + ' ' + device.client?.version

    return `${appName}&space;${appVersion}&space;${VER_APP}&space;${deviceType}&space;${deviceOs}&space;${deviceName}&space;${deviceUuid}&space;${deviceOsVersion}`
  }

  async verifyCode(type: string | (string | null)[], data: IBodyApiVerify, userId = 0, header = false): Promise<any> {
    try {
      if (header) {
        const device = await this.getInfoDevice()

        const rs = await request.post(`${this.prefix}/${userId}/verify/${type}`, data, {
          headers: {
            Device: device
          }
        })
        return Promise.resolve(rs.data.data)
      } else {
        const rs = await request.post(`${this.prefix}/${userId}/verify/${type}`, data)
        return Promise.resolve(rs.data.data)
      }
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }

  async verifyPhone(data: IBodyApiVerify, header = false): Promise<any> {
    try {
      if (data.newPhone) {
        delete data.newPhone
      }
      if (header) {
        const device = await this.getInfoDevice()
        const rs = await request.post(`${this.prefix}/phone/verify`, data, {
          headers: {
            Device: device
          }
        })
        return Promise.resolve(rs.data.data)
      } else {
        const rs = await request.post(`${this.prefix}/phone/verify`, data)
        return Promise.resolve(rs.data.data)
      }
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }

  async forgetPassword(data: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/forget-pass`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async resetPassword(data: Record<string, any>, userId = 0, header = false): Promise<Array<Record<string, any>>> {
    try {
      if (header) {
        const device = await this.getInfoDevice()
        const result = await request.post(`${this.prefix}/${userId}/reset-pass`, data, {
          headers: {
            Device: device
          }
        })
        return Promise.resolve(result.data.data)
      } else {
        const result = await request.post(`${this.prefix}/${userId}/reset-pass`, data)
        return Promise.resolve(result.data.data)
      }
    } catch (error) {
      console.log(error)

      return Promise.reject(error)
    }
  }

  async changePassword(data: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/password`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async refreshToken(data: { email: string; refreshToken: string }): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/refresh-token`, data, {
        headers: {
          Authorization: ''
        }
      })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getInfo(): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/info`)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getInfoIp(): Promise<any> {
    try {
      console.log('vao day')

      const result = await axios.get(`http://ip-api.com/json`)
      return Promise.resolve(result.data.countryCode)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async updatePhoneUser(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(
        `api/v1/customers/settings/0/changePhone`,
        {},
        {
          params,
          headers: {
            Authorization: ''
          }
        }
      )
      return Promise.resolve(result.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async reset2FA(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(
        `api/v1/customers/settings/0/reset2FA`,
        {},
        {
          params,
          headers: {
            Authorization: ''
          }
        }
      )
      return Promise.resolve(result.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async unlockUser(body: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/0/reset-wrong-code`, body, {
        headers: {
          Authorization: ''
        }
      })
      return Promise.resolve(result.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async resetPinCode(body: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/0/reset-pin`, body, {
        headers: {
          Authorization: ''
        }
      })
      return Promise.resolve(result.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getNonce(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.get(`api/v1/account/nonce`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async loginExternalWallet(data: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`api/v1/account/login`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
