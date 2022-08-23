import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'

export class mainRepository extends BaseRepository {
  constructor() {
    super('/main/api/v1/user')
  }

  async getAddressWallet(params?: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/asset/my-wallets`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getNetwork(): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/asset-network`)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
