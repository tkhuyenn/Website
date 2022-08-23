import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'
import forEach from 'lodash/forEach'

export default class NftRepositoryV2 extends BaseRepository {
  constructor() {
    super('nft/api/v2')
  }

  async getListAcceptPayment(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/accept-payment-currencies`, { params })
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
  async buyNft(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/buy-nft`, { ...params })
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

  async fixedPrice(data: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/item/listing`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async removeFromSale(data: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/item/unlisting`, data)
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
  async postAcceptOffer(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/item/accept-offer`, { ...params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async saveChangePrice(idItem: string | number, params: Record<string, any>): Promise<any> {
    try {
      const result = await request.put(`${this.prefix}/item/${idItem}/change-price`, params)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async validateAddress(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/validate/address`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async transferNft(data: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/item/transfer`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getListAccount(params: Record<string, any>): Promise<any> {
    try {
      const objKey = Object.keys(params)
      forEach(objKey, key => {
        console.log(params[key])

        if (params[key] === 'null' || params[key] === 'undefined') {
          delete params[key]
        }
      })

      const result = await request.get(`${this.prefix}/account/search`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async confirmTransaction(data: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/activity/transaction/confirm`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
