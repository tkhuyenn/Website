import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'

export class SettingRepository extends BaseRepository {
  constructor() {
    super('api/v1/user')
  }
  async CreateDataKyc(data: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/settings/kyc-insert`, data)
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getProfile(): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/get-profile`)
      return Promise.resolve(result.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async updateProfileAvatar(data?: Record<string, any>): Promise<any> {
    try {
      const result = await request.put(`${this.prefix}/update-profile/avatar`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async updateProfile(data?: Record<string, any>): Promise<any> {
    try {
      const result = await request.put(`${this.prefix}/update-profile`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  // ----------------nftProfile---------------

  // async updateNftProfile(data?: Record<string, any>): Promise<any> {
  //   try {
  //     const result = await request.put(`${this.prefix}/account/update-nft-profile`, data)
  //     return Promise.resolve(result.data.data)
  //   } catch (error) {
  //     return Promise.reject(error)
  //   }
  // }

  async checkStatusKyc(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/settings/kyc`, {
        params
      })
      return Promise.resolve(result.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async changePhone(data?: Record<string, any>, params?: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/change-phone/code`, data, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async changePhoneVerification(data?: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/change-phone`, data)
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
  async genCode(data?: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/settings/gen-code`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async get2fa(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/get2FA`, {
        params
      })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async change2fa(data?: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/change2faType`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async changeAppDevice(data?: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/changeAppDevice`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async changeAppDeviceVerify(data?: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/changeAppDevice/verify`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async onPin(data?: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/settings/pin/change-status`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async pinVerify(data?: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/settings/pin/verify`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async insertPin(data?: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/settings/pin/insert`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async changePin(data?: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/settings/pin/update`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async resendCode(data?: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/0/resendCode`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async changePassword(data?: Record<string, any>, userId = 0): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/${userId}/change-pass`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async change2faApp(data?: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/updateApp2fa`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async limitDetails(): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/setting/limit-details`)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getDetailKyc(source: string): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/settings/kyc-requests/${source}`)
      return Promise.resolve(result.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async updateKyc(params: Record<string, any>): Promise<Array<Record<string, any>>> {
    try {
      const result = await request.post(`${this.prefix}/settings/kyc-requests/update`, params)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async updateKycReject(data: Record<string, any>): Promise<Array<Record<string, any>>> {
    try {
      const result = await request.put(`${this.prefix}/settings/kyc-requests/update`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async checkPinCode(pin: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/check-pin`, pin)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async showTabSocial(): Promise<any> {
    try {
      const result = await request.get(`nft/api/v1/account/my-info`)
      return Promise.resolve(result.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async validateAccount(): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/delete/validate`)
      return Promise.resolve(result.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async deleteAccount(data: Record<string, any>): Promise<any> {
    try {
      const result = await request.delete(`${this.prefix}/delete`, { data })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async forceDeleteAccount(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.delete(`${this.prefix}/delete/confirm`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
