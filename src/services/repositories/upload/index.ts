import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'

export default class UploadRepository extends BaseRepository {
  constructor() {
    super('file/api/v1/user')
  }

  //   async uploadFile(params: Record<string, any>): Promise<any> {
  //     try {
  //       const result = await request.post(`${this.prefix}/upload`, params)
  //       return Promise.resolve(result.data.data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  async uploadFile(data: Record<string, any>): Promise<any> {
    try {
      // delete request.defaults.headers.common['Authorization']
      const result = await request.post(`${this.prefix}/upload`, data.data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: data.progress
      })
      return result.data.data
    } catch (error) {
      console.log(error)
    }
  }
  async updateAvatar(data: Record<string, any>): Promise<any> {
    try {
      console.log('data: ', data)
      const result = await request.post(`${this.prefix}/upload`, data)
      return result.data.data
    } catch (error) {
      console.log(error)
    }
  }
}
