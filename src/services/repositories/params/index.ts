import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'

export default class ParamsRepository extends BaseRepository {
  constructor() {
    super('api/v1/district-params')
  }

  async getTypeReject(params?: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }

  async getPramsHeader(): Promise<any> {
    try {
      const rs = await request.get(`main/api/v1/public/system-params`)
      return Promise.resolve(rs.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
  async getConfigModule(): Promise<any> {
    try {
      const rs = await request.get(`/api/v1/module/config`)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
  async getTokenFirebase(data: Record<string, any>): Promise<any> {
    try {
      const rs = await request.post(`/api/v1/firebase/auth`, data)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
  async getFeatureConfig(): Promise<any> {
    try {
      const rs = await request.get(`/nft/api/v1/feature-config`)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
  async getPublicSystemParams(): Promise<any> {
    try {
      const rs = await request.get(`/nft/api/v1/system-param/list?type=PUBLIC`)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
}
