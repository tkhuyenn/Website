<template>
  <el-container class="main-layout" :class="isLoading ? 'be-flex-center' : null">
    <transition name="el-fade-in-linear">
      <base-page-loading v-if="isLoading" />
    </transition>
    <!-- <el-aside v-if="!isLoading" class="sidebar-left" style="width: 80px">
      <main-sidebar />
    </el-aside> -->
    <div v-if="!isLoading && !getRouteLanding" class="main-content main-content--market">
      <div class="be-flex main-header header-scroll" :style="$route.name !== 'MarketPlace' ? 'border-bottom: 1' + 'px solid #d2d0ce;' : null" style="height: 70px">
        <div class="be-flex-item">
          <main-header :class="getClassMarket" :showIdo="false" />
        </div>
      </div>
      <div class="main-center" id="main-center" :style="$route.name === 'ListProduct' ? 'overflow-y:hidden' : null">
        <router-view />
      </div>
      <div v-if="showButton" class="scroll-top" @click="handleScrollToTop">
        <!--        <base-icon icon="icon-top" size="18" />-->
        <img v-if="coinMain === 'LYNK'" src="../../../assets/images/market/back-to-top.png" />
        <div v-else class="back-to-top-clm">
          <base-icon icon="icon-arrow-up" />
        </div>
      </div>
    </div>
    <div class="w-100 layout-lynkey" v-if="!isLoading && getRouteLanding">
      <router-view />
    </div>

    <popup-payment-method />
    <popup-buy-nft />
    <popup-put-on-sale />
    <popup-fixed-price @success="handleSuccess" />
    <popup-open-for-bids @success="handleSuccess" />
    <popup-timed-auction @success="handleSuccess" />
    <popup-bid-nft />
    <popup-share />
    <!-- <PopupErrorOnSale /> -->
    <PopupMakeOffer />
    <PopupRemove />
    <popup-list-bid-offer @accept="handleAccept" />
    <popup-accept />
    <popup-notify-success />
    <div v-if="coinMain === 'CLM'">
      <PopupOpenMaketplace />
    </div>
  </el-container>
</template>
<script lang="ts">
  import { Component, Mixins, Watch } from 'vue-property-decorator'
  import MainSidebar from '../../sidebar/MainSidebar.vue'
  import MainHeader from '../../header/MainHeader.vue'
  import BasePageLoading from '../../page-loading/BasePageLoading.vue'
  import { namespace } from 'vuex-class'
  import getRepository from '@/services'
  import ParamsRepository from '@/services/repositories/params'
  import NftRepository from '@/services/repositories/nft'
  import PopupMixin from '@/mixins/popup'

  const apiParams: ParamsRepository = getRepository('params')
  const apiNft: NftRepository = getRepository('nft')

  const bcAuth = namespace('beAuth')
  const beBase = namespace('beBase')
  const bcNft = namespace('bcNft')

  import firebase from '@/utils/firebase'

  import PopupBuyNft from '@/modules/Nft/components/base/PopupBuyNft.vue'
  import PopupPaymentMethod from '@/modules/Nft/components/base/PopupPaymentMethod.vue'
  import PopupPutOnSale from '@/modules/Nft/components/base/PopupPutOnSale.vue'
  import PopupFixedPrice from '@/modules/Nft/components/base/PopupFixedPrice.vue'
  import PopupOpenForBids from '@/modules/Nft/components/base/PopupOpenForBids.vue'
  import PopupTimedAuction from '@/modules/Nft/components/base/PopupTImedAuction.vue'
  import PopupBidNft from '@/modules/Nft/components/base/PopupBidNft.vue'
  import PopupShare from '@/modules/Nft/components/base/PopupShare.vue'
  import PopupErrorOnSale from '@/modules/Nft/components/base/PopupErrorOnSale.vue'
  import PopupMakeOffer from '@/modules/Nft/components/base/PopupMakeOffer.vue'
  import PopupRemove from '@/modules/Nft/components/base/PopupRemove.vue'
  import PopupListBidOffer from '@/modules/Nft/components/base/PopupListBidOffer.vue'
  import PopupAccept from '@/modules/Nft/components/base/PopupAccept.vue'
  import PopupNotifySuccess from '@/modules/Nft/components/base/PopupNotifySuccess.vue'
  import PopupOpenMaketplace from '@/modules/Nft/components/base/PopupOpenMaketplace.vue'
  import EventBus from '@/utils/eventBus'
  import Cookies from 'js-cookie'

  @Component({
    components: {
      MainSidebar,
      MainHeader,
      BasePageLoading,
      PopupBuyNft,
      PopupPaymentMethod,
      PopupPutOnSale,
      PopupFixedPrice,
      PopupOpenForBids,
      PopupTimedAuction,
      PopupBidNft,
      PopupShare,
      PopupErrorOnSale,
      PopupMakeOffer,
      PopupRemove,
      PopupListBidOffer,
      PopupAccept,
      PopupNotifySuccess,
      PopupOpenMaketplace
    }
  })
  export default class LayoutMarketplace extends Mixins(PopupMixin) {
    @bcAuth.Action('getInfo') getInfo!: () => Promise<any>
    @bcAuth.Mutation('SET_INFO') setInfo!: (info: Record<string, any>) => Promise<any>
    @bcAuth.Mutation('SET_INFO_USER_NFT') setInfoUserNft!: (info: Record<string, any>) => Promise<any>
    @bcAuth.Action('logout') logout!: () => Promise<any>
    @beBase.State('urlSystem') urlSystem!: Record<string, any>
    @beBase.State('coinMain') coinMain!: string
    @bcAuth.Getter('isLogin') isLogin!: boolean
    @bcAuth.Action('setConfigModule') setConfigModule!: (data: Record<string, any>) => void
    @bcAuth.Action('setFeatureConfig') setFeatureConfig!: (data: Record<string, any>) => void
    @bcAuth.Action('setSystemParamsPublic') setSystemParamsPublic!: (data: Record<string, any>) => void
    @bcNft.Action('setListAssetNetwork') setListAssetNetwork!: (data: Record<string, any>) => void
    @bcNft.Action('setListNftAsset') setListNftAsset!: (data: Record<string, any>) => void
    @bcNft.Mutation('SET_STATUS_SCREEN') setStatusScreen!: (status: boolean) => void
    @bcNft.Mutation('SET_ITEM_OFFER_OR_BID') setItemOfferOrBid!: (item: Record<string, any>) => void
    @bcAuth.State('walletAddress') walletAddress!: string
    @bcAuth.State('user') user!: Record<string, any>
    @bcNft.Mutation('SET_TYPE_OF_ACTION') setTypeOfAction!: (type: string) => void
    @bcNft.Mutation('SET_STATUS_APPROVE_ACCOUNT') setStatusApproveAccount!: (status: string) => void
    @bcNft.Mutation('SET_IS_ALREADY_APPROVE') setStatusAlreadyApprove!: (status: boolean) => void
    @bcNft.Mutation('SET_LIST_EXCHANGE_RATE') setListExchangeRate!: (list: Array<Record<string, any>>) => void

    // apiUser?: UserRepository
    isLoading = true
    selectLanguage = ''
    timing: any = null
    isScroll = false

    typePopup = ''

    refAssetNetwork: any = null
    refNftAsset: any = null

    exchangeRateRef: any = null
    hasPassMarket = ''

    @Watch('$route.name') watchRoute(name: string): void {
      const elm = document.querySelector('[role="presentation"]') as HTMLElement
      if (name !== 'home') {
        elm!.style.display = 'none'
      } else {
        elm!.style.display = 'block'
      }
    }

    async mounted(): Promise<void> {
      try {
        this.isLoading = true
        this.selectLanguage = window.localStorage.getItem('bc-lang')!
        this.getPublicSystemParams()
        if (!this.isLogin) {
          if (this.walletAddress) {
            const info = await apiNft.getInfoExternalUser()
            this.setInfo(info.data)
            this.setInfoUserNft(info.data)
          }

          this.getFeatureConfig()
          this.isLoading = false
          const routeName = this.$route.name!

          setTimeout(() => {
            const elm = document.querySelector('[role="presentation"]') as HTMLElement
            if (elm) {
              if (routeName !== 'home') {
                elm!.style.display = 'none'
              } else {
                elm!.style.display = 'block'
              }
            }
          }, 1000)
        } else {
          await this.getInfo()
          const info = await apiNft.getMyProfileNft()
          this.setInfoUserNft(info)
          apiParams.getConfigModule().then(result => {
            this.setConfigModule(result)
          })
          this.getFeatureConfig()
          this.isLoading = false
          const routeName = this.$route.name!
          setTimeout(() => {
            const elm = document.querySelector('[role="presentation"]') as HTMLElement
            if (elm) {
              if (routeName !== 'home') {
                elm!.style.display = 'none'
              } else {
                elm!.style.display = 'block'
              }
            }
          }, 1000)
        }
        await this.handleSignInFireBase()
        this.handleGetAssetNetwork()
        this.handleGetNftAsset()
        this.handleGetListExchangeRate()
      } catch (error: any) {
        this.isLoading = false
        let message: any = ''
        const { data } = error.response
        if (data.status === 'USER_LOCKED') {
          message = this.$t('notify.user-locked')
          this.$message.error({ message, duration: 5000 })
          this.logout().then(() => {
            this.$router.push({ name: 'login' })
          })
        }
        if (data.status === 'USER_BLOCKED') {
          message = this.$t('notify.user-blocked')
          this.$message.error({ message, duration: 5000 })
          this.logout().then(() => {
            this.$router.push({ name: 'login' })
          })
        }
      }
    }

    destroyed(): void {
      clearInterval(this.timing)
      const exchangeRateRef = firebase.database().ref('exchange_rates')
      const refAssetNetwork = firebase.database().ref('asset_networks')
      const refNftAsset = firebase.database().ref('nft_assets')
      refAssetNetwork.off('value', this.refAssetNetwork)
      refNftAsset.off('value', this.refNftAsset)
      exchangeRateRef.off('value', this.exchangeRateRef)
    }

    get getIcon(): string {
      return this.selectLanguage === 'vi' ? 'flag-vn' : 'flag-usa'
    }
    get getRouteLanding(): boolean {
      return this.$route.name === 'home' || this.$route.name === 'download-app-ido'
    }

    get getClassMarket(): string {
      if (this.$route.name === 'MarketPlace' && !this.isScroll) {
        return 'header-market'
      }
      return ''
    }

    async getFeatureConfig(): Promise<void> {
      try {
        const result = await apiParams.getFeatureConfig()
        this.setFeatureConfig(result)
      } catch (error) {
        console.log(error)
      }
    }
    async getPublicSystemParams(): Promise<void> {
      try {
        const result = await apiParams.getPublicSystemParams()
        this.setSystemParamsPublic(result)
      } catch (error) {
        console.log(error)
      }
    }

    handleGetAssetNetwork(): void {
      const refAssetNetwork = firebase.database().ref('asset_networks')
      this.refAssetNetwork = refAssetNetwork.on('value', snapshot => {
        this.setListAssetNetwork(snapshot.val())
      })
    }
    handleGetNftAsset(): void {
      const refNftAsset = firebase.database().ref('nft_assets')
      this.refNftAsset = refNftAsset.on('value', snapshot => {
        this.setListNftAsset(snapshot.val())
      })
    }

    handleChangeLanguage(lang: string): void {
      this.$i18n.locale = lang
      window.localStorage.setItem('bc-lang', lang)
      location.reload()
    }

    handleClickTerm(): void {
      window.open(`${this.urlSystem['system.token.terms']}`)
    }
    showButton = false

    created(): void {
      // if (this.getMobileOperatingSystem() === 'Android' || this.getMobileOperatingSystem() === 'iOS') {
      //   this.$router.push({ name: 'download-app-ido' })
      //   return
      // }

      this.hasPassMarket = Cookies.get('hasPassMarket')

      if (!this.isLogin && !this.walletAddress && !this.hasPassMarket) {
        this.setOpenPopup({
          popupName: 'popup-open-maketplace',
          isOpen: true
        })
      }

      window.addEventListener('scroll', this.handleScrollTop)
      if (window.innerWidth > 1200) {
        this.setStatusScreen(true)
        return
      }
      this.setStatusScreen(false)
    }

    handleGetListExchangeRate(): void {
      const exchangeRateRef = firebase.database().ref('exchange_rates')

      this.exchangeRateRef = exchangeRateRef.on('value', snapshot => {
        this.setListExchangeRate(snapshot.val())
      })
    }

    getMobileOperatingSystem(): string {
      let userAgent = navigator.userAgent || navigator.vendor

      // Windows Phone must come first because its UA also contains "Android"
      if (/windows phone/i.test(userAgent)) {
        return 'Windows Phone'
      }

      if (/android/i.test(userAgent)) {
        return 'Android'
      }

      // iOS detection from: http://stackoverflow.com/a/9039885/177710
      if (/iPad|iPhone|iPod/.test(userAgent)) {
        return 'iOS'
      }

      return 'unknown'
    }

    handleScrollTop(): void {
      // this.isScroll = window.scrollY > 10
      this.showButton = window.scrollY > 1000
    }
    handleScrollToTop(): void {
      window.scroll(0, 0)
    }

    async handleSignInFireBase(): Promise<any> {
      try {
        const data = {
          password: this.$options.filters?.encryptPassword('#!@Firebase-web-client@!#')
        }
        const result = await apiParams.getTokenFirebase(data)
        await firebase.auth().signInWithCustomToken(result.authToken)
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    }

    handleSuccess(type: string): void {
      this.setTypeOfAction(type)
      this.setOpenPopup({
        popupName: 'popup-notify-success',
        isOpen: true
      })
    }

    handleAccept(item: Record<string, any>): void {
      this.setItemOfferOrBid(item)
      this.setOpenPopup({
        popupName: 'popup-accept-bid',
        isOpen: true
      })
    }
  }
</script>
<style lang="scss" scoped>
  .scroll-top {
    cursor: pointer;
    position: fixed;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 58px;
    height: 58px;
    right: 60px;
    bottom: 104px;
    border: solid 1px transparent !important;
    z-index: 4;
    @media (max-width: 1200px) {
      right: 20px;
    }
    //opacity: 0.8;
    //background-image: linear-gradient(#ffffff 80%, #ffffff 80%), linear-gradient(to bottom right, #3626af, #824bc4, #b966d3);
    //background-origin: border-box;
    //background-clip: content-box, border-box;

    .back-to-top-clm {
      align-items: center;
      display: flex;
      width: 53px;
      background: rgba(99, 199, 206, 0.5882352941176471);
      border-radius: 50%;
      height: 53px;
      justify-content: center;
    }
  }
  .main-layout {
    position: relative;
    height: 100vh;
    background-color: #fff;
    color: var(--bc-text-market-primary-nft);
    .sidebar-left {
      border-right: 1px solid #ccc;
      height: 100%;
      overflow: hidden;
      background-color: #e9e9e9;
      position: relative;
    }
    .main-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      .main-header {
        // border-bottom: 1px solid #d2d0ce;
        padding: 0px;
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 1000;
      }
      .main-center {
        padding: 0;
        background-color: #fff;
        display: block;
        flex: 1;
        flex-basis: auto;
        //overflow: auto;
      }
    }
    .sidebar-right {
      padding-top: 15px;
      border-left: 1px solid hsl(0deg 0% 100% / 10%);
      overflow: hidden;
    }
    // ::v-deep.header-market {
    //   color: var(--bc-color-white) !important;
    //   .body {
    //     .content-left {
    //       .dropdown-menu {
    //         color: var(--bc-color-white) !important;
    //         font-size: 16px;
    //         line-height: 24px;
    //         .el-icon--right {
    //           color: var(--bc-color-white) !important;
    //         }
    //       }
    //     }
    //     .content-right {
    //       .router-header {
    //         .wrap {
    //           p {
    //             color: var(--bc-color-white) !important;
    //           }
    //         }
    //       }
    //       .line {
    //         display: block;
    //         height: 16px;
    //         border: 1px solid #fff;
    //       }
    //       .language {
    //         .el-input__inner {
    //           background: transparent;
    //           color: var(--bc-color-white);
    //         }
    //         .el-input__suffix {
    //           .el-select__caret {
    //             color: var(--bc-color-white);
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
  }
  .main-footer {
    border-top: 1px solid var(--bc-border-primary);
    padding: 0 24px;
  }
  .footer-right {
    span {
      cursor: pointer;
      color: var(--bc-theme-primary);
    }
    .suffix {
      .flag-usa {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 7px;
        display: block;
      }
      .flag-vn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 6px;
        display: block;
      }
    }
  }

  ::v-deep.main-content--market {
    .header-scroll {
      background-color: #fff;
      z-index: 3;
      border-bottom: 1px solid #d2d0ce;
      .logo-second {
        display: inline-flex !important;
      }
      .logo-main {
        display: none !important;
      }
      .header {
        .content-right {
          .icon-main {
            display: none;
          }
          .icon-second {
            display: inline-flex;
          }
        }
      }
    }
  }

  // ::v-deep.layout-lynkey {
  //   .main-header {
  //     .select-language {
  //       .el-input {
  //         &__inner {
  //           color: #fff;
  //           background: transparent;
  //         }
  //         .el-input__suffix {
  //           &-inner {
  //             i {
  //               color: #fff;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  //   .header-scroll {
  //     .select-language {
  //       .el-input {
  //         &__inner {
  //           color: #000;
  //         }
  //         .el-input__suffix {
  //           &-inner {
  //             i {
  //               color: #000;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
</style>
