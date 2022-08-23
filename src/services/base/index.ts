import { BaseRepositoryInterface, DefaultRespositoryInterface } from './index.d'
import request from '@/plugins/request'

export abstract class BaseRepository implements BaseRepositoryInterface {
  prefix: string

  constructor(prefix: string) {
    this.prefix = prefix
  }
}

export abstract class DefaultRespository<T> implements DefaultRespositoryInterface<T> {
  prefix: string

  constructor(prefix: string) {
    this.prefix = prefix
  }

  async all(payload: Record<string, any>): Promise<Array<Record<string, T>>> {
    try {
      const result = await request.get(`${this.prefix}`, {
        params: payload
      })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async findById(id: string | number): Promise<T> {
    try {
      const result = await request.get(`${this.prefix}/${id}`)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
