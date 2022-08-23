import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'
import { IBodyApiCreateLogLogin } from '@/interface'

export class ActivityRepository extends BaseRepository {
  constructor() {
    super('log/api/v1/activity')
  }

  async getListActivity(params?: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(this.prefix, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async createLogLogin(data: IBodyApiCreateLogLogin): Promise<void> {
    try {
      return request.post(this.prefix, data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async deleteActivity(id: number): Promise<void> {
    try {
      return request.delete(`${this.prefix}/${id}`)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async deleteAllActivity(): Promise<void> {
    try {
      return request.delete(`${this.prefix}/logout-all/WEB`)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  // async getChangePrice(params?: Record<string, any>): Promise<any> {
  //   try {
  //     const rs = await request.get(`${this.prefix}/{currency}/info?listingId={myListingId}`, { params })
  //     return Promise.resolve(rs.data.data)
  //   } catch (error) {
  //     return Promise.reject(error)
  //   }
  // }
  
}
