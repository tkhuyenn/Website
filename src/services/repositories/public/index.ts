import { BaseRepository } from '@/services/base'
import request from '@/plugins/request'

export default class PublicRepository extends BaseRepository {
  constructor() {
    super('main/api/v1')
  }
  async getDownloadInfo(): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/public/system-params`, {})
      return Promise.resolve(rs.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
  async getBonusParams(): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/bonus-programs/description`)
      return Promise.resolve(rs.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
}
