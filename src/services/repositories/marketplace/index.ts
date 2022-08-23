import { BaseRepository } from '@/services/base'
import request from '@/plugins/request'

export default class MarketRepository extends BaseRepository {
  constructor() {
    super('marketplace/api/v1')
  }

  async getProductList(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/product/list`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getParamSort(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/system-param/list`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getCitySort(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/city/list`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getDataProjectList(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/project/list`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getDetail(type: string, id: number | string): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/${type}/detail/${id}`)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getSystemparam(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/system-param/list`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getDataProjectOnSale(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/product/list`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async handleFavourite(data: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/favourite`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  
 
}
