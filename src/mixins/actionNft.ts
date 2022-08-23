import NftRepositoryV2 from '@/services/repositories/nftv2'
import { Component, Mixins } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import OnChainMixin from './onchain'

const base = namespace('beBase')
const bcAuth = namespace('beAuth')
const bcNft = namespace('bcNft')

import getRepository from '@/services/index'
import NftRepository from '@/services/repositories/nft'
const apiNft: NftRepository = getRepository('nft')
const apiNftv2: NftRepositoryV2 = getRepository('nftv2')

@Component
export default class ActionNftMixin extends Mixins(OnChainMixin) {
  @bcAuth.Getter('isBuy') isBuy!: boolean
  @bcAuth.Getter('isBid') isBid!: boolean
  @bcAuth.Getter('isOffer') isOffer!: boolean
  @bcAuth.Getter('isExternalWallet') isExternalWallet!: boolean
  @bcAuth.Getter('isExternalWalletMobile') isExternalWalletMobile!: boolean

  @bcNft.Mutation('SET_TYPE_ACTION') setTypeAction!: (type: string) => void
  @bcNft.Mutation('SET_ITEM_OFFER_OR_BID') setItemOfferOrBid!: (item: Record<string, any>) => void
  @bcNft.Mutation('SET_IS_BTN_OFFER') setIsBtnOffer!: (status: boolean) => void
  @bcNft.Mutation('SET_LIST_ACCOUNT') setListAccount!: (list: Array<Record<string, any>>) => void
  @bcNft.Mutation('SET_TYPE_POPUP') setTypePopup!: (type: string) => void
  @bcNft.Mutation('SET_CURRENCY_SELECT_BUY') setCurrencySelectBuy!: (currency: string) => void
  @bcNft.Mutation('SET_TOKEN_NEED_GET_BALANCE') setTokenNeedGetBalance!: (currency: string) => void
  @bcNft.Action('setlistCurrencies') setlistCurrencies!: (list) => void
  @bcNft.Action('setListCurrenciesBuy') setListCurrenciesBuy!: (list) => void

  @bcNft.Action('setInfoNft') setInfoNft!: (nft: Record<string, any>) => void
  @bcNft.Action('setEditOffer') setEditOffer!: (setEditOffer) => void

  isLoadingBuy = false
  isLoadingBid = false
  isLoadingOffer = false
  isEditOffer = false
  listCurrencies = []
  typePopup = 'OWNER'

  async buyNow(nftItem: Record<string, any>, walletAddress: string, contractAddress: string): Promise<void> {
    try {
      if (!this.isLogin) {
        if (this.isExternalWallet) {
          this.setTypeAction('buy')
          this.setInfoNft(nftItem)
          if (walletAddress) {
            this.isLoadingBuy = true
            await this.actionWhenLogged(nftItem, contractAddress, 'buy')
            this.isLoadingBuy = false
          } else {
            if ((this.isExternalWalletMobile && !this.isDesktop) || this.isDesktop) {
              this.setOpenPopup({
                popupName: 'popup-payment-method',
                isOpen: true
              })
            } else {
              this.redirectLogin(nftItem)
            }
          }
        } else {
          this.redirectLogin(nftItem)
        }
      } else {
        await this.getLynkeyInfo(nftItem, 'buy')
        this.setOpenPopup({
          popupName: 'popup-buy-nft',
          isOpen: true
        })
      }
    } catch (error) {
      console.log('>>> / file: actionNft.ts / line 70 / error', error)
      this.isLoadingBuy = false
    }
  }
  async placeBid(nftItem: Record<string, any>, contractAddress: string): Promise<void> {
    try {
      this.isEditOffer = false
      this.setEditOffer(this.isEditOffer)
      if (!this.isLogin) {
        if (this.isExternalWallet) {
          this.setTypeAction('bid')
          this.setInfoNft(nftItem)
          if (this.walletAddress) {
            this.isLoadingBid = true
            await this.actionWhenLogged(nftItem, contractAddress, 'bid')
            this.isLoadingBid = false
          } else {
            if ((this.isExternalWalletMobile && !this.isDesktop) || this.isDesktop) {
              this.setOpenPopup({
                popupName: 'popup-payment-method',
                isOpen: true
              })
            } else {
              this.redirectLogin(nftItem)
            }
          }
        } else {
          this.redirectLogin(nftItem)
        }
      } else {
        await this.getLynkeyInfo(nftItem, 'bid')
        this.setOpenPopup({
          popupName: 'popup-place-bid',
          isOpen: true
        })
        // await this.getPopupBid()
      }
    } catch (error) {
      this.isLoadingBid = false
    }
  }
  async getLynkeyInfo(nftItem: Record<string, any>, type?: string, owners?: Array<Record<string, any>>, ownerId?: number): Promise<void> {
    try {
      console.log(type)

      const params = {
        listingId: nftItem?.minListingId,
        itemId: type === 'offer' ? nftItem.id : null,
        ownerId: type === 'offer' ? ownerId : null
      }
      const currency = type === 'buy' ? this.currencySelectBuy : this.tokenNeedGetBalance
      const result = await apiNft.getLynkeyInfo(currency, params)
      this.setInfoActivity(result)
      this.setInfoNft({ ...nftItem, idOwnerOffer: owners ? owners[0].ownerId : null })

      return Promise.resolve()
    } catch (error) {
      const message = this.$t('notify.error-info') as string
      this.$message.error({ message, duration: 5000 })
      return Promise.reject()
    }
  }

  async removeSale(nftItem: Record<string, any>): Promise<void> {
    this.setInfoNft(nftItem)
    this.setOpenPopup({
      popupName: 'popup-remove',
      isOpen: true
    })
  }

  async putOnSale(nftItem: Record<string, any>): Promise<void> {
    // if (nftItem.myQuantity == 0) {
    //   this.setOpenPopup({
    //     popupName: 'popup-error-on-sale',
    //     isOpen: true
    //   })
    // } else {
    this.setInfoNft(nftItem)
    if (this.isBuy && this.isBid) {
      this.setOpenPopup({
        popupName: 'popup-put-on-sale',
        isOpen: true
      })
    }
    if (this.isBuy && !this.isBid) {
      const params = {
        itemId: nftItem.id
      }
      this.listCurrencies = await apiNftv2.getListAcceptPayment(params)
      this.setlistCurrencies(this.listCurrencies)
      this.setListCurrenciesBuy(this.listCurrencies)
      this.setOpenPopup({
        popupName: 'popup-fixed-price',
        isOpen: true
      })
    }
    // }
  }
  async makeOffer(nftItem: Record<string, any>, owners: Array<Record<string, any>>, contractAddress: string): Promise<void> {
    try {
      if (!this.isLogin) {
        if (this.isExternalWallet) {
          this.isEditOffer = false
          this.setEditOffer(this.isEditOffer)
          this.setTypeAction('offer')
          this.setInfoNft({ ...nftItem, idOwnerOffer: owners[0].ownerId })
          if (this.walletAddress) {
            this.isLoadingOffer = true
            await this.actionWhenLogged(nftItem, contractAddress, 'offer', owners[0].ownerId)
            this.isLoadingOffer = false
          } else {
            if ((this.isExternalWalletMobile && !this.isDesktop) || this.isDesktop) {
              this.setOpenPopup({
                popupName: 'popup-payment-method',
                isOpen: true
              })
            } else {
              this.redirectLogin(nftItem)
            }
          }
        } else {
          this.redirectLogin(nftItem)
        }
      } else {
        if (nftItem.totalSupply > 1 && nftItem.numOfOwners > 1) {
          this.typePopup = 'MAKE_OFFER'
          this.setOpenPopup({
            popupName: 'popup-list-owner',
            isOpen: true
          })
        } else {
          this.isEditOffer = false
          this.setEditOffer(this.isEditOffer)
          await this.getLynkeyInfo(nftItem, 'offer', owners, owners[0].ownerId)
          this.setOpenPopup({
            popupName: 'popup-make-offer',
            isOpen: true
          })
        }
      }
    } catch (error) {
      this.isLoadingOffer = false
    }
  }
  async handleEditOffer(nftItem: Record<string, any>, owners: Array<Record<string, any>>, contractAddress: string): Promise<void> {
    try {
      if (!this.isLogin) {
        if (this.isExternalWallet) {
          this.isEditOffer = true
          this.setEditOffer(this.isEditOffer)
          this.setTypeAction('offer')
          this.setInfoNft({ ...nftItem, idOwnerOffer: owners[0].ownerId })
          if (this.walletAddress) {
            this.isLoadingOffer = true
            await this.actionWhenLogged(nftItem, contractAddress, 'offer', owners[0].ownerId)
            this.isLoadingOffer = false
          } else {
            if ((this.isExternalWalletMobile && !this.isDesktop) || this.isDesktop) {
              this.setOpenPopup({
                popupName: 'popup-payment-method',
                isOpen: true
              })
            } else {
              this.redirectLogin(nftItem)
            }
          }
        } else {
          this.redirectLogin(nftItem)
        }
      } else {
        if (nftItem.totalSupply > 1 && nftItem.numOfOwners > 1) {
          this.setOpenPopup({
            popupName: 'popup-list-owner',
            isOpen: true
          })
        } else {
          this.isEditOffer = true
          this.setEditOffer(this.isEditOffer)
          await this.getLynkeyInfo(nftItem, 'offer', owners, owners[0].ownerId)
          this.setOpenPopup({
            popupName: 'popup-make-offer',
            isOpen: true
          })
        }
      }
    } catch (error) {
      this.isLoadingOffer = false
    }
  }
  async handleAcceptBid(nftItem: Record<string, any>): Promise<void> {
    // this.titleOffer = false
    this.setInfoNft(nftItem)
    this.setTypePopup('bid')
    try {
      const query = {
        transactionType: 'BID',
        status: 'SUCCESS',
        page: 1,
        limit: 20
      }
      const result = await apiNft.getAcceptBidOffer(nftItem?.id, query)
      // this.infoLynkey = result || []
      if (result.totalElements > 1) {
        this.setListAccount(result.content)
        this.setIsBtnOffer(false)
        this.setOpenPopup({
          popupName: 'popup-list-bid-offer',
          isOpen: true
        })
      }
      if (result.totalElements == 1) {
        this.setItemOfferOrBid(result.content[0])
        this.setOpenPopup({
          popupName: 'popup-accept-bid',
          isOpen: true
        })
      }
      if (result.totalElements === 1 && this.$route.query.openBid === '1') {
        this.setListAccount(result.content)
        this.setOpenPopup({
          popupName: 'popup-list-bid-offer',
          isOpen: true
        })
        this.setOpenPopup({
          popupName: 'popup-accept-bid',
          isOpen: false
        })
      }
      // console.log('result total', result.totalElements)
      // if(result)

      return Promise.resolve()
    } catch (error) {
      const message = this.$t('notify.error-info') as string
      this.$message.error({ message, duration: 5000 })
      return Promise.reject()
    }
    // this.setOpenPopup({
    //   popupName: 'popup-accept-bid',
    //   isOpen: true
    // })
  }

  async handleAcceptOffer(nftItem: Record<string, any>): Promise<void> {
    this.setTypePopup('offer')
    try {
      this.setInfoNft(nftItem)
      const query = {
        transactionType: 'OFFER',
        status: 'SUCCESS',
        page: 1,
        limit: 20
      }
      const result = await apiNft.getAcceptBidOffer(nftItem?.id, query)
      // this.infoLynkey = result || []
      if (result.totalElements > 1) {
        this.setListAccount(result.content)
        this.setIsBtnOffer(true)
        this.setOpenPopup({
          popupName: 'popup-list-bid-offer',
          isOpen: true
        })
      }
      if (result.totalElements == 1) {
        this.setItemOfferOrBid(result.content[0])
        this.setOpenPopup({
          popupName: 'popup-accept-bid',
          isOpen: true
        })
      }
      if (result.totalElements === 1 && this.$route.query.openOffer === '1') {
        this.setListAccount(result.content)
        this.setOpenPopup({
          popupName: 'popup-list-bid-offer',
          isOpen: true
        })
        this.setOpenPopup({
          popupName: 'popup-accept-bid',
          isOpen: false
        })
      }
      // if(result)

      return Promise.resolve()
    } catch (error) {
      const message = this.$t('notify.error-info') as string
      this.$message.error({ message, duration: 5000 })
      return Promise.reject()
    }
  }
  async handleEditBid(nftItem: Record<string, any>, contractAddress: string): Promise<void> {
    try {
      if (!this.isLogin) {
        if (this.isExternalWallet) {
          this.isEditOffer = true
          this.setEditOffer(this.isEditOffer)
          this.setTypeAction('bid')
          this.setInfoNft(nftItem)
          if (this.walletAddress) {
            this.isLoadingBid = true
            await this.actionWhenLogged(nftItem, contractAddress, 'bid')
            this.isLoadingBid = false
          } else {
            if ((this.isExternalWalletMobile && !this.isDesktop) || this.isDesktop) {
              this.setOpenPopup({
                popupName: 'popup-payment-method',
                isOpen: true
              })
            } else {
              this.redirectLogin(nftItem)
            }
          }
        } else {
          this.redirectLogin(nftItem)
        }
      } else {
        await this.getLynkeyInfo(nftItem, 'bid')
        this.setInfoNft(nftItem)
        this.isEditOffer = true
        this.setEditOffer(this.isEditOffer)
        this.setOpenPopup({
          popupName: 'popup-place-bid',
          isOpen: true
        })
      }
    } catch (error) {
      this.isLoadingBid = false
    }
  }

  redirectLogin(nftItem: Record<string, any>): void {
    const message: any = this.$t('notify.must-login')
    this.$message.error({ message, duration: 5000 })
    const detail = {
      isBack: 'nft',
      id: nftItem.id! as string,
      name: 'DetailNftItem'
    }
    setTimeout(() => {
      this.$router.push({ name: 'login', query: { ...detail } })
    }, 1000)
    return
  }
}
