<template>
  <div :id="id" class="list-product">
    <h3 class="header-5 mb-24 text-semibold text-title">
      {{ !isShowCompProduct ? $t('market-detail.title-list-product') : $t('market-detail.title-simi-product') }}
    </h3>
    <div class="be-flex tabs mb-24" v-if="!isShowCompProduct">
      <div v-for="(tab, index) in listType" :key="tab.id" :class="index === tabActive ? 'tab-active' : null" class="cursor body-base tab-item" @click="handleChangeType(index)">
        <span>{{ tab.value }}</span>
      </div>
    </div>

    <div v-if="listProducts.length" class="wrap-swiper">
      <swiper v-if="isShowCompProduct" class="swiper" :options="swiperOption" ref="swiperRef">
        <swiper-slide class="carousel-item cursor" v-for="item in listProducts" :key="item.id">
          <img :src="item.avatar" :alt="item.projectName" @click="handleClick(item.id)" />
          <div class="content" @click="handleClick(item.id)">
            <p class="body-large text-medium">{{ item.propertyName }}</p>
            <p class="text-medium body-small text-short-desc">{{ item.projectName }}</p>
            <div class="be-flex info">
              <div class="info-item">
                <base-icon icon="icon-bed" size="24" class="lh-default" />
                <span>{{ item.numOfBedroom }}</span>
              </div>
              <div class="line"></div>
              <div class="info-item">
                <base-icon icon="icon-shower" size="24" class="lh-default" />
                <span>{{ item.numOfBathroom }}</span>
              </div>
              <div class="line"></div>
              <div class="info-item">
                <base-icon icon="icon-area" size="24" class="lh-default" />
                <span>{{ item.numOfSquare | convertAmountDecimal('AREA') }} m2</span>
              </div>
            </div>
            <div class="price">
              <span class="header-5 text-semibold">{{ item.tokenAmount | convertAmountDecimal('USD') }} LYNK</span>
              <span class="body-small text-medium">~${{ item.price | convertAmountDecimal('USD') }}</span>
            </div>
          </div>
          <div class="on-sale uppercase">
            {{ $t(`market-detail.${item.propertyStatus}`) }}
          </div>
          <div class="favourite cursor" @click="handleFavourite(item)">
            <base-icon v-if="item.isFavourite" icon="icon-heart-active" class="d-iflex" size="32" />
            <base-icon v-else icon="icon-heart" class="d-iflex" size="32" />
          </div>
        </swiper-slide>
        <!-- <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div> -->
      </swiper>

      <swiper v-else class="swiper" :options="swiperOption1" ref="swiperRef">
        <swiper-slide class="carousel-item cursor" v-for="item in listProducts" :key="item.id">
          <img :src="item.avatar" :alt="item.projectName" @click="handleClick(item.id)" />
          <div class="content" @click="handleClick(item.id)">
            <p class="body-large text-medium">{{ item.propertyName }}</p>
            <p class="text-medium body-small text-short-desc">{{ item.projectName }}</p>
            <div class="be-flex info">
              <div class="info-item">
                <base-icon icon="icon-bed" size="24" class="lh-default" />
                <span>{{ item.numOfBedroom }}</span>
              </div>
              <div class="line"></div>
              <div class="info-item">
                <base-icon icon="icon-shower" size="24" class="lh-default" />
                <span>{{ item.numOfBathroom }}</span>
              </div>
              <div class="line"></div>
              <div class="info-item">
                <base-icon icon="icon-area" size="24" class="lh-default" />
                <span>{{ item.numOfSquare | convertAmountDecimal('AREA') }} m2</span>
              </div>
            </div>
            <div class="price">
              <span class="header-5 text-semibold">{{ item.tokenAmount | convertAmountDecimal('USD') }} LYNK</span>
              <span class="body-small text-medium">~${{ item.price | convertAmountDecimal('USD') }}</span>
            </div>
          </div>
          <div class="on-sale uppercase">
            {{ $t(`market-detail.${item.propertyStatus}`) }}
          </div>
          <div class="favourite cursor" @click="handleFavourite(item)">
            <base-icon v-if="item.isFavourite" icon="icon-heart-active" class="d-iflex" size="32" />
            <base-icon v-else icon="icon-heart" class="d-iflex" size="32" />
          </div>
        </swiper-slide>
        <!-- <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div> -->
      </swiper>
    </div>
    <empty-block v-else :show="true" class="empty" />

    <div v-if="listProducts.length > 2 && isShowCompProduct" class="btn-crousel cursor prev" @click="handleClickArrow('prev')">
      <base-icon icon="icon-prev" size="32" class="d-iflex" />
    </div>
    <div v-if="listProducts.length > 2 && isShowCompProduct" class="btn-crousel cursor next" @click="handleClickArrow('next')">
      <base-icon icon="icon-next" size="32" class="d-iflex" />
    </div>
    <div v-if="listProducts.length > 3 && !isShowCompProduct" class="btn-crousel cursor prev" @click="handleClickArrow('prev')">
      <base-icon icon="icon-prev" size="32" class="d-iflex" />
    </div>
    <div v-if="listProducts.length > 3 && !isShowCompProduct" class="btn-crousel cursor next" @click="handleClickArrow('next')">
      <base-icon icon="icon-next" size="32" class="d-iflex" />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import EmptyBlock from '@/components/base/empty/EmptyBlock.vue'
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import { SwiperOptions } from 'swiper'
  import 'swiper/swiper-bundle.css'
  import { namespace } from 'vuex-class'
  const bcAuth = namespace('beAuth')

  import MarketRepository from '@/services/repositories/marketplace'
  import getRepository from '@/services'
  import filter from 'lodash/filter'

  const apiMarket: MarketRepository = getRepository('market')

  @Component({ components: { Swiper, SwiperSlide, EmptyBlock } })
  export default class DetailListProduct extends Vue {
    @Prop({ required: true, type: Array, default: () => [] }) productList!: Array<Record<string, any>>
    @Prop({ required: true, type: Number, default: 0 }) id!: number
    @bcAuth.Getter('isLogin') isLogin!: boolean

    swiperOption: SwiperOptions = {
      slidesPerView: 2,
      spaceBetween: 24,
      loop: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }
    swiperOption1: SwiperOptions = {
      slidesPerView: 3,
      spaceBetween: 24,
      loop: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }

    tabs: Array<Record<string, any>> = [
      {
        id: 0,
        title: this.$t('market-detail.tab.villa')
      },
      {
        id: 1,
        title: this.$t('market-detail.tab.codotel')
      },
      {
        id: 2,
        title: this.$t('market-detail.tab.president')
      },
      {
        id: 3,
        title: this.$t('market-detail.tab.penthouse')
      }
    ]
    tabActive = 0
    listType: Array<Record<string, any>> = []
    listProducts: Array<Record<string, any>> = []

    get isShowCompProduct(): boolean {
      return this.$route.params.type === 'product'
    }

    mounted(): void {
      this.init()
    }

    async init(): Promise<void> {
      try {
        if (this.$route.params.type === 'project') {
          this.listType = await apiMarket.getSystemparam({ type: 'PROPERTY_TYPE' })
          await this.getProducts(this.listType[0].value)
        } else {
          this.listProducts = this.productList
        }
      } catch (error) {
        console.log(error)
      }
    }

    async getProducts(type: string): Promise<void> {
      try {
        const params = {
          projectIds: this.$route.params.id,
          productType: type,
          page: 1,
          limit: 1000
        }
        const result = await apiMarket.getProductList(params)
        this.listProducts = result.content || []
      } catch (error) {
        console.log(error)
      }
    }

    handleChangeType(index: number): void {
      this.tabActive = index
      this.getProducts(this.listType[index].value)
    }

    handleClick(id: number): void {
      const _id = id + ''
      this.$router.push({ name: 'DetailProjectPrimary', params: { type: 'product', id: _id } })
    }

    handleFavourite(item: Record<string, any>): void {
      if (!this.isLogin) {
        const message: any = this.$t('notify.must-login')
        this.$message.error({ message, duration: 5000 })
        const detail = {
          isBack: '1',
          type: this.$route.params.type! as string,
          id: this.$route.params.id! as string,
          name: this.$route.name as string
        }
        setTimeout(() => {
          this.$router.push({ name: 'login', query: { ...detail } })
        }, 1000)
        return
      }

      const data = {
        id: item.id,
        objectType: 'PRODUCT',
        isFavourite: item.isFavourite
      }
      apiMarket.handleFavourite(data).then(() => {
        const product = filter(this.listProducts, elm => elm.id === item.id)[0]
        product.isFavourite = !product.isFavourite
        this.$forceUpdate()
      })
    }

    handleClickArrow(type: 'prev' | 'next'): void {
      if (type === 'prev') {
        //@ts-ignore
        this.$refs['swiperRef']?.$swiper.slidePrev()
      } else {
        //@ts-ignore
        this.$refs['swiperRef']?.$swiper.slideNext()
      }
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep.list-product {
    position: relative;
    margin-top: 32px;
    width: 100%;
    margin-bottom: 80px;
    .tabs {
      .tab-item {
        width: 120px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        border: 1px solid #dbdbdb;
        margin-right: 16px;
        &:hover {
          background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
          color: #fff;
          border: none;
        }
      }
      .tab-active {
        font-weight: 600;
        color: #fff;
        background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
        border: none;
      }
    }
    .swiper {
      .carousel-item {
        border-radius: 8px;
        border: 1px solid #eee;
        position: relative;
        img {
          max-width: 437px;
          height: 320px;
          width: 100%;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
        .content {
          padding: 24px;
          p:first-child {
            margin-bottom: 8px;
          }
          .text-short-desc {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .body-small {
            color: var(--bc-text-discript);
            margin-bottom: 16px;
          }
          .info {
            align-items: center;
            margin-bottom: 16px;
            .info-item {
              display: flex;
              align-items: center;
              span:last-child {
                font-size: 16px;
                line-height: 24px;
                padding-left: 8px;
                color: #5b616e;
              }
            }
            .line {
              margin: 0 8px;
              width: 1px;
              height: 18px;
              background: var(--bc-text-market-primary);
              opacity: 0.7;
            }
          }
          .price {
            span:first-child {
              background: var(--bc-menu-active);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            span:last-child {
              color: var(--bc-text-discript);
              padding-left: 8px;
            }
          }
        }
        .on-sale {
          padding: 6px 16px;
          position: absolute;
          background: #0e0b23;
          opacity: 0.9;
          border-radius: 4px;
          color: #fff;
          top: 16px;
          left: 16px;
        }
        .favourite {
          display: inline-flex;
          position: absolute;
          top: 16px;
          right: 16px;
          line-height: 1;
        }
      }
    }
    .btn-crousel {
      top: 54%;
      z-index: 2;
      position: absolute;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
    }
    .prev {
      left: -29px;
    }
    .next {
      right: -29px;
    }
    .empty {
      text-align: center;
      .span-icon {
        font-size: 150px !important;
      }
      .empty-text {
        color: #8f8f8f;
      }
    }
  }
</style>
