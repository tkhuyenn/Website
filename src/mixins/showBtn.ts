import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ShowBtnMixin extends Vue {
  [x: string]: any
  // check show text not for sale
  get isShowTextNotForSale(): boolean {
    const saleStatus = this.nftItem?.saleStatus
    const isOwner = this.nftItem?.isOwner
    const myOfferId = this.nftItem?.myOfferId
    const minListingPrice = this.nftItem?.minListingPrice
    if (!this.isBid && !this.isBuy) {
      return true
    }
    if (this.isBuy) {
      return (!this.nftItem?.saleType && this.nftItem?.isOwner === 'NO') || (saleStatus === 'ON_SALE' && isOwner === 'NO' && myOfferId === 0 && !minListingPrice)
    }
    if (this.isBid) {
      return !this.nftItem?.saleType && this.nftItem?.isOwner === 'NO'
    }
    return false
  }

  //check show button put on sale
  get showBtnPutOnSale(): boolean {
    const isOwner = this.nftItem?.isOwner
    const isOwnerOnSale = this.nftItem?.isOwnerOnSale
    const saleType = this.nftItem?.saleType
    const myQuantity = this.nftItem?.myQuantity
    if (this.nftItem?.saleType) {
      if (this.isBuy) {
        return this.isBuy && saleType === 'BUY' && isOwner === 'YES' && isOwnerOnSale === 'NO' && myQuantity
      }
    }
    return (this.isBuy || this.isBid) && isOwner === 'YES' && myQuantity
  }

  get classSecondaryPutOnSale(): boolean {
    const isOwner = this.nftItem?.isOwner
    const saleType = this.nftItem?.saleType
    const hasOffer = this.nftItem?.hasOffer
    const myQuantity = this.nftItem?.myQuantity
    return (this.isBuy || this.isBid) && isOwner === 'YES' && !saleType && hasOffer === 'YES' && myQuantity
  }

  //check show button + text + disable place a bid
  get showBtnPlaceABid(): boolean {
    const saleStatus = this.nftItem.saleStatus
    const isOwner = this.nftItem?.isOwner
    const saleType = this.nftItem.saleType
    const myOfferId = this.nftItem.myOfferId
    const endDate = this.nftItem.endDate
    const endDateTime = new Date(endDate).getTime()
    if (this.isBid) {
      return (
        (saleStatus === 'ON_AUCTION' && isOwner === 'NO' && !myOfferId && (!endDate || endDateTime > this.currentTime)) ||
        (saleType === 'BID' && saleStatus === 'NOT_FOR_SALE' && isOwner === 'NO')
      )
    }
    return false
  }

  get isShowTextNoBidYet(): boolean {
    const saleStatus = this.nftItem.saleStatus
    const numOfBids = this.nftItem.numOfBids
    const isOwner = this.nftItem?.isOwner
    if (this.isBid) {
      return saleStatus === 'ON_AUCTION' && numOfBids === 0 && isOwner === 'NO'
    }
    return false
  }

  get disablePlaceABid(): boolean {
    const saleStatus = this.nftItem.saleStatus
    const isOwner = this.nftItem?.isOwner
    const saleType = this.nftItem.saleType
    if (this.isBid) {
      return saleType === 'BID' && saleStatus === 'NOT_FOR_SALE' && isOwner === 'NO'
    }
    return false
  }

  //check show button + disable accept bid
  get showBtnAcceptBid(): boolean {
    const isOwner = this.nftItem?.isOwner
    const numOfBids = this.nftItem.numOfBids
    const saleType = this.nftItem.saleType
    const endDate = this.nftItem.endDate
    const startDate = this.nftItem.startDate
    const startDateTime = new Date(startDate).getTime()
    if (this.isBid) {
      return saleType === 'BID' && (!endDate || startDateTime <= this.currentTime) && isOwner === 'YES' && numOfBids
    }
    return false
  }

  get showBtnEditCancelBid(): boolean {
    const saleStatus = this.nftItem.saleStatus

    const myOfferId = this.nftItem.myOfferId
    if (this.isBid) {
      return saleStatus === 'ON_AUCTION' && myOfferId !== 0
    }
    return false
  }

  //check show button buy now
  get showBtnBuyNow(): boolean {
    if (this.isBuy) {
      const saleStatus = this.nftItem.saleStatus
      const isOwner = this.nftItem?.isOwner
      const isOwnerOnSale = this.nftItem?.isOwnerOnSale
      const totalOwnerOnSale = this.nftItem?.totalOwnerOnSale
      const minListingPrice = this.nftItem?.minListingPrice

      const case1 = saleStatus === 'ON_SALE' && isOwner === 'NO'
      const case2 = saleStatus === 'ON_SALE' && isOwner === 'YES' && isOwnerOnSale === 'NO'
      const case3 = saleStatus === 'ON_SALE' && isOwner === 'YES' && isOwnerOnSale === 'YES' && totalOwnerOnSale

      // minListingPrice có thể = 0
      return (case1 || case2 || case3) && minListingPrice !== null
    }
    return false
  }
  get classSecondaryBuyNow(): boolean {
    if (this.isBuy) {
      const saleStatus = this.nftItem.saleStatus
      const isOwner = this.nftItem?.isOwner
      const isOwnerOnSale = this.nftItem?.isOwnerOnSale
      const totalOwnerOnSale = this.nftItem?.totalOwnerOnSale
      const case2 = saleStatus === 'ON_SALE' && isOwner === 'YES' && isOwnerOnSale === 'NO'
      const case3 = saleStatus === 'ON_SALE' && isOwner === 'YES' && isOwnerOnSale === 'YES' && totalOwnerOnSale
      return case2 || case3
    }
    return false
  }

  //check show button remove on sale
  get showBtnRemoveOnSale(): boolean {
    if (this.nftItem?.saleType) {
      const saleType = this.nftItem.saleType
      const isOwner = this.nftItem?.isOwner
      const isOwnerOnSale = this.nftItem?.isOwnerOnSale
      // const saleStatus = this.nftItem.saleStatus
      if (saleType === 'BUY') {
        return this.isBuy && isOwner === 'YES' && isOwnerOnSale === 'YES'
      }
      if (saleType === 'BID') {
        return this.isBid && isOwner === 'YES'
      }
    }
    return false
  }

  get classSecondaryRemoveOnSale(): boolean {
    const saleType = this.nftItem.saleType
    const isOwner = this.nftItem?.isOwner
    const isOwnerOnSale = this.nftItem?.isOwnerOnSale
    const hasOffer = this.nftItem?.hasOffer
    const numOfBids = this.nftItem?.numOfBids
    const endDate = this.nftItem?.endDate
    const startDate = this.nftItem.startDate
    const startDateTime = new Date(startDate).getTime()
    return (
      (this.isBuy && saleType === 'BUY' && isOwner === 'YES' && isOwnerOnSale === 'YES' && hasOffer === 'YES') ||
      (this.isBid && saleType === 'BID' && isOwner === 'YES' && numOfBids && (!endDate || startDateTime <= this.currentTime))
    )
  }

  //check show button make offer
  get showBtnMakeOffer(): boolean {
    if ((this.isBuy || this.isBid) && this.isOffer) {
      const saleType = this.nftItem.saleType
      const isOwner = this.nftItem?.isOwner
      const totalSupply = this.nftItem?.totalSupply
      const myOfferId = this.nftItem?.myOfferId
      return (saleType === 'BUY' || !saleType) && totalSupply === 1 && isOwner === 'NO' && !myOfferId
    }
    return false
  }

  //check show button accept offer + disable button
  get showBtnAcceptOffer(): boolean {
    if (this.isBuy && this.isOffer) {
      const saleType = this.nftItem.saleType
      const isOwner = this.nftItem?.isOwner
      const hasOffer = this.nftItem?.hasOffer
      const totalSupply = this.nftItem?.totalSupply
      return (!saleType || saleType === 'BUY') && isOwner === 'YES' && hasOffer === 'YES' && totalSupply === 1
    }
    return false
  }

  get showBtnEditCancelOffer(): boolean {
    const saleStatus = this.nftItem.saleStatus
    const saleType = this.nftItem.saleType
    const myOfferId = this.nftItem.myOfferId
    if ((this.isBid || this.isBuy) && this.isOffer) {
      return (saleStatus === 'ON_SALE' && myOfferId !== 0) || (!saleType && myOfferId !== 0)
    }
    return false
  }
  get showBuyNowOption(): boolean {
    const saleStatus = this.nftItem.saleStatus
    const myOfferId = this.nftItem.myOfferId
    const minListingPrice = this.nftItem.minListingPrice
    if ((this.isBid || this.isBuy) && this.isOffer) {
      return saleStatus === 'ON_SALE' && myOfferId !== 0 && minListingPrice
    }
    return false
  }
}
