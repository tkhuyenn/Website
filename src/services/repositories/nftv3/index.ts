import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'
import forEach from 'lodash/forEach'

export default class NftRepositoryV3 extends BaseRepository {
  constructor() {
    super('nft/api/v3')
  }

  async fixedPrice(data: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/item/listing`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async postAcceptOffer(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/item/accept-offer`, { ...params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async postAcceptBid(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/bid/accept`, { ...params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async placeABid(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/place-a-bid`, params)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getMakeOffer(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/make-offer`, params)
      return Promise.resolve(result.data.data.content)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async buyNft(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/buy-nft`, { ...params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
