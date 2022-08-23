import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'

export default class CrowdSaleRepository extends BaseRepository {
  constructor() {
    super('main/api/v1')
  }

  async getCrowdSaleTransaction(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/crowdsales-transactions`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getListRoundCrowdsale(): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/crowdsales`)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getListTransactionAffiliate(params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/bonus-programs/histories`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getMyReferral(params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`/api/v1/affiliate/my-referrals`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getExchangeRates(): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/exchange-rates`)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
