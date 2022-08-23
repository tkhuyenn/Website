import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'
import forEach from 'lodash/forEach'
import axios from 'axios'

export default class NftRepository extends BaseRepository {
  constructor() {
    super('nft/api/v1')
  }

  async getListCategory(): Promise<Array<Record<string, any>>> {
    try {
      const result = await request.get(`${this.prefix}/category/list`)
      return result.data.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getListCategoryFilter(): Promise<Array<Record<string, any>>> {
    try {
      const result = await request.get(`${this.prefix}/category/filter`)
      return result.data.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getListDetailCategory(params: Record<string, any>): Promise<any> {
    try {
      const objKey = Object.keys(params)
      forEach(objKey, key => {
        console.log(params[key])

        if (params[key] === 'null' || params[key] === 'undefined') {
          delete params[key]
        }
      })

      const result = await request.get(`${this.prefix}/category/detail`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getDetailCollection(id: string): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/collection/${id}/detail`)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getDetailMyprofile(id: string): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/accountId/${id}/list-item`)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getDetailNftItem(id: string | number): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/item/${id}/detail`)
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

  async getItemRelated(id: string): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/item/${id}/related`)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getListItemInCollection(params: Record<string, any>): Promise<any> {
    try {
      const objKey = Object.keys(params)
      forEach(objKey, key => {
        if (params[key] === 'null' || params[key] === 'undefined') {
          delete params[key]
        }
      })

      if (params.isVerified && params.isVerified === 'all') {
        delete params.isVerified
      }
      if (params.statusSale && params.statusSale === 'all') {
        delete params.statusSale
      }
      delete params.type

      const result = await request.get(`${this.prefix}/item/list`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getListDataProfileNft(accountId: string | number, params: Record<string, any>): Promise<any> {
    try {
      let result: Record<string, any> = {}
      const objKey = Object.keys(params)
      console.log(objKey)
      console.log(params)
      forEach(objKey, key => {
        if (params[key] === '' || params[key] === 'null'|| params[key]==='undefined' || params[key]==='NaN') {
          delete params[key]
        }
      })
      if (params.listType && params.listType === 'Collections') {
        result = await request.get(`${this.prefix}/account/${accountId}/list-collection`, { params: { ...params, listCollectionType: params.listItemType, listItemType: null } })
      } else {
        result = await request.get(`${this.prefix}/account/${accountId}/list-item`, { params })
      }
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getListCollection(params: Record<string, any>): Promise<any> {
    try {
      if (params.categoryId === -1) {
        delete params.categoryId
      }
      const result = await request.get(`${this.prefix}/collection/list`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getListSlideBanner(params?: Record<string, any>): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/home/list-remarkable`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getListActivity(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/activity/list`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getListActivityProfileNft(accountId: number, params: Record<string, any>): Promise<any> {
    try {
      const objKey = Object.keys(params)
      forEach(objKey, key => {
        if (params[key] === '') {
          delete params[key]
        }
      })
      const result = await request.get(`${this.prefix}/activities/${accountId}`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getCollectionAccount(accountId: number | string, params: Record<string, any>): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/account/${accountId}/list-collection`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async favouriteItem(data: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/activity/favourite`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getListOwners(id: string, params: Record<string, any>, getcontent = false): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/item/${id}/owners`, { params })
      if(getcontent === true) {
        return Promise.resolve(result.data.data)
      }
      return Promise.resolve(result.data.data.content)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async buyNft(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/buy-nft`, { ...params })
      return Promise.resolve(result.data.data.content)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getLynkeyInfo(currency: string, params?: Record<string, any>): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/activity/${currency}/info`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getMyProfileNft(): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/account/my-info`)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getUserprofile(id: string): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/account/${id}/info`)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getHotNft(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/home/list-hot-item`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getUnique(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/home/list-unique`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getListFollow(accountId: string | number, params: Record<string, any>): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/account/${accountId}/follows`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async actionFollow(data: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/follow`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async updateSocialInfo(data?: Record<string, any>): Promise<any> {
    try {
      const result = await request.put(`${this.prefix}/account/update-social-info`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async updateNftProfile(data?: Record<string, any>): Promise<any> {
    try {
      const result = await request.put(`${this.prefix}/account/update-nft-profile`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getDetailProperty(type: string, id: string): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/${type}/detail/${id}`)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getChangePrice(currency: string, itemId: number): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/activity/${currency}/info?itemId=${itemId}`)
      return Promise.resolve(rs.data.data)
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
  async externalLogin(data: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/account/external/login`, data)
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
  async placeABid(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/place-a-bid`, params)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getAcceptBidOffer(itemId: string | number, params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/item/${itemId}/list-offer`, { params })
      return Promise.resolve(rs.data.data)
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
  async postTimedAuction(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/item/listing`, { ...params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async postOpenForBids(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/item/listing`, { ...params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async postContactMarketplace(data: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/contact/email`, { ...data })
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
  async getInfoExternalUser(): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/account/my-info`)
      return Promise.resolve(result.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async validateAddress(params: Record<string, any>): Promise<any> {
    try {
      console.log('........................a')
      const result = await request.get(`${this.prefix}/validate/address`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async handleCancelBid(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/bid/cancel`, { ...params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async handleCancelOffer(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/cancel-offer`, { ...params })
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
  async getAbiContract(params: Record<string, any>, type: 'ETH' | 'BNB' | ''): Promise<any> {
    try {
      let result: Record<string, any> = {}
      if (type === 'ETH') {
        result = await axios.get(`https://api-ropsten.etherscan.io/api`, { params })
      } else {
        result = await axios.get(`https://api-testnet.bscscan.com/api`, { params })
      }
      return Promise.resolve(result.data.result)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async validateApprove(data: Record<string, any>, params: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/account/approve`, data, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
