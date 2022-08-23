import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'

export class affiliateRepository extends BaseRepository {
  constructor() {
    super('api/v1/affiliate')
  }

  async getDataAffiliate(): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}`)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async sendInvite(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/invite`, params)
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getListTransactionAffiliate(userId: string, params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/bonus-programs/histories/${userId}`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
