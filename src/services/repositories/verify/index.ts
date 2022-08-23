import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'
import { IBodyApiVerify } from '@/interface'

export class VerifyRepository extends BaseRepository {
  constructor() {
    super('api/v1/fa')
  }

  async sendCodeVerify(type: string | (string | null)[], data: IBodyApiVerify): Promise<any> {
    try {
      const rs = await request.post(`/${type}/verifyCode`, data)
      console.log(rs)
    } catch (error) {
      console.log(error)
    }
  }
}
