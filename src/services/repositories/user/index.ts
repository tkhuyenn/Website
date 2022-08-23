import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'

export default class UserRepository extends BaseRepository {
  constructor() {
    super('/api/v1/user')
  }

  async getInfo(): Promise<any> {
    try {
      // delete request.defaults.headers.common['Authorization']
      const result = await request.get(`${this.prefix}/info`)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
