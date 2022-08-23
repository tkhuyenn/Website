<template>
  <div class="detail-header" :style="isShowCompProduct ? 'margin-top:24px' : null">
    <div class="container be-flex align-center jc-space-between breadcrumb">
      <el-breadcrumb separator-class="el-icon-d-arrow-right">
        <el-breadcrumb-item :to="{ name: 'MarketPlacePrimary' }" class="body-base">Marketplace</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'MarketPlacePrimary' }" class="body-base">{{ $t('leftMenu.real-estate') }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="isShowCompProduct" :to="{ name: 'DetailProjectPrimary', params: { type: 'project', id: product.projectId } }" class="body-base">{{
          product.projectName
        }}</el-breadcrumb-item>
        <el-breadcrumb-item v-else class="body-base">{{ project.projectName }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="isShowCompProduct" class="body-base">{{ product.propertyName }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="title__right" v-if="isShowCompProduct">
        <!-- <div class="be-flex align-center cursor btn-title">
          <base-icon icon="icon-share" size="28" class="d-iflex" />
          <span class="body-base d-ib text">Share</span>
        </div> -->
        <div class="be-flex align-center cursor btn-title" :class="isFavourite ? 'btn-title--active' : null" @click="handleFavorite">
          <base-icon v-if="isFavourite" icon="icon-favourite-active" size="28" class="d-iflex" />
          <base-icon v-else icon="icon-favourite" size="28" class="d-iflex" />
          <p class="body-base d-ib text">Favorite</p>
        </div>
      </div>
    </div>
    <div class="container be-flex align-center jc-space-between title" v-if="!isShowCompProduct">
      <div class="title__left">
        <p class="header-2 text-semibold mb-8">{{ project.projectName }}</p>
        <p class="body-base" v-if="project.address || project.cityName">{{ project.address }}{{ project.address ? ', ' : '' }} {{ project.cityName }}</p>
      </div>
      <div class="title__right">
        <!-- <div class="be-flex align-center cursor btn-title">
          <base-icon icon="icon-share" size="28" class="d-iflex" />
          <span class="body-base d-ib text">Share</span>
        </div> -->
        <div class="be-flex align-center cursor btn-title" :class="isFavourite ? 'btn-title--active' : null" @click="handleFavorite">
          <base-icon v-if="isFavourite" icon="icon-favourite-active" size="28" class="d-iflex" />
          <base-icon v-else icon="icon-favourite" size="28" class="d-iflex" />
          <p class="body-base d-ib text">Favorite</p>
        </div>
      </div>
    </div>
    <div class="image-carousel" v-if="isShowCarousel">
      <VueSlickCarousel v-bind="settings" ref="carousel">
        <div class="item" v-for="item in mediaList.images" :key="item.id">
          <img :src="item.mediaUrl" :alt="item.mediaUrl" />
        </div>
      </VueSlickCarousel>
      <div class="btn-crousel cursor prev" @click="handleClickArrow('prev', 'carousel')">
        <base-icon icon="icon-prev" size="32" class="d-iflex" />
      </div>
      <div class="btn-crousel cursor next" @click="handleClickArrow('next', 'carousel')">
        <base-icon icon="icon-next" size="32" class="d-iflex" />
      </div>
    </div>

    <iframe v-if="tabActive === 'virtual'" :src="mediaList.virtual[0].mediaUrl" width="100%" height="352" allowvr="" allowfullscreen="allowfullscreen" loading="lazy"></iframe>

    <iframe v-if="tabActive === 'map'" :src="product.googleMapUrl" width="100%" height="352" style="border: 0" allowfullscreen=""></iframe>

    <iframe
      v-if="tabActive === 'video'"
      width="100%"
      height="352"
      :src="mediaList.videos[0].mediaUrl"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>

    <div v-if="isShowCompProduct" class="be-flex align-center slide-bottom">
      <div class="be-flex jc-space-between container">
        <div class="image-slide">
          <VueSlickCarousel v-bind="settingsNav" v-if="isShowCarouselBottom" ref="carousel-bottom">
            <div class="item cursor" v-for="item in mediaList.images" :key="item.id" @click="handleClickNav(item.id)">
              <img :src="item.mediaUrl" :alt="item.mediaUrl" />
            </div>
          </VueSlickCarousel>
          <div v-if="isShowCarouselBottom" class="btn-crousel-bottom cursor prev" @click="handleClickArrow('prev', 'carousel-bottom')">
            <base-icon icon="icon-arrow-left" size="24" class="d-iflex" />
          </div>
          <div v-if="isShowCarouselBottom" class="btn-crousel-bottom cursor next" @click="handleClickArrow('next', 'carousel-bottom')">
            <base-icon icon="icon-arrow-white" size="24" class="d-iflex" />
          </div>
        </div>
        <div class="categories">
          <div class="cate-item" @click="tabActive = 'virtual'" v-if="mediaList.virtual.length && mediaList.virtual[0].mediaUrl">
            <base-icon class="d-iflex" icon="icon-rotate-3d" size="32" />
            <p class="text-xs text-white">{{ $t('market-detail.3d-view') }}</p>
          </div>
          <div class="cate-item" @click="tabActive = 'video'" v-if="mediaList.videos.length && mediaList.videos[0].mediaUrl">
            <base-icon class="d-iflex" icon="icon-video" size="32" />
            <p class="text-xs text-white">{{ $t('market-detail.video') }}</p>
          </div>
          <div class="cate-item" @click="tabActive = 'map'" v-if="product.googleMapUrl">
            <base-icon class="d-iflex" icon="icon-map" size="32" />
            <p class="text-xs text-white">{{ $t('market-detail.map') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
  import MarketRepository from '@/services/repositories/marketplace'
  import getRepository from '@/services'
  import { namespace } from 'vuex-class'
  import findIndex from 'lodash/findIndex'
  const bcAuth = namespace('beAuth')
  const apiMarket: MarketRepository = getRepository('market')

  @Component({ components: { VueSlickCarousel } })
  export default class DetailHeader extends Vue {
    @Prop({ required: true, type: Object, default: () => ({}) }) project!: Record<string, any>
    @Prop({ required: true, type: Object, default: () => ({}) }) product!: Record<string, any>
    @Prop({ required: true, type: Object, default: () => ({}) }) mediaList!: Record<string, any>
    @Prop({ required: true, type: Boolean, default: false }) isFavourite!: boolean

    @bcAuth.Getter('isLogin') isLogin!: boolean

    tabActive = 'image'

    settings: Record<string, any> = {
      dots: false,
      infinite: true,
      centerMode: true,
      centerPadding: '30px',
      slidesToShow: 2,
      slidesToScroll: 1,
      variableWidth: true,
      speed: 1000
    }

    settingsNav: Record<string, any> = {
      dots: false,
      infinite: true,
      centerMode: true,
      arrows: false,
      centerPadding: '10px',
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true
    }

    get isShowCompProduct(): boolean {
      return this.$route.params.type === 'product'
    }

    get isShowCarousel(): boolean {
      return this.mediaList && this.mediaList.images && this.mediaList.images.length && this.tabActive === 'image'
    }
    get isShowCarouselBottom(): boolean {
      return this.mediaList && this.mediaList.images && this.mediaList.images.length
    }

    //method
    handleClickArrow(type: 'prev' | 'next', value: string): void {
      if (type === 'prev') {
        //@ts-ignore
        this.$refs[`${value}`]?.prev()
      } else {
        //@ts-ignore
        this.$refs[`${value}`]?.next()
      }
    }

    handleClickNav(id: number): void {
      this.tabActive = 'image'
      const index = findIndex(this.mediaList.images, (item: Record<string, any>) => item.id === id)
      //@ts-ignore
      this.$refs['carousel']?.goTo(index)
    }

    handleFavorite(): void {
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
      const objectType = this.$route.params.type.toUpperCase()
      const data = {
        id: this.$route.params.id!,
        objectType,
        isFavourite: this.isFavourite
      }
      apiMarket.handleFavourite(data).then(() => {
        this.$emit('favourite')
      })
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep.detail-header {
    margin: 40px 0;

    .breadcrumb {
      margin-bottom: 24px;
      .is-link {
        color: var(--bc-text-hyperlink) !important;
        font-weight: 400 !important;
      }
      .el-breadcrumb__inner {
        color: #5b616e;
      }
      .el-breadcrumb__separator {
        color: #1c1c1e;
      }
    }

    .title {
      margin-bottom: 24px;
      &__left {
        span {
          opacity: 0.7;
        }
      }
      &__right {
        display: flex;

        .btn-title {
          padding: 8px 16px;
          height: 40px;
          border: 1px solid #dbdbdb;
          border-radius: 4px;
          &:hover {
            border-color: var(--bc-btn-default-border-hover);
          }
        }
        .btn-title:first-child {
          // margin-right: 24px;
        }
        .btn-title--active {
          p {
            background: var(--bc-btn-default-text-hover);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0px 0px #00000000;
          }
        }
      }
    }

    .image-carousel {
      position: relative;
      overflow: hidden;
      .slick-slide {
        margin-right: 4px;
      }
      img {
        max-width: 572px;
        width: 100%;
        height: 352px;
      }

      .btn-crousel {
        position: absolute;
        width: 58px;
        height: 58px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .prev {
        top: 50%;
        left: 40px;
        transform: translateY(-50%);
      }
      .next {
        top: 50%;
        right: 40px;
        transform: translateY(-50%);
      }
    }
    .slide-bottom {
      height: 100px;
      background-color: #0e0b23;
      .container {
        max-width: 1400px;
        .image-slide {
          padding-right: 28px;
          padding-left: 20px;
          overflow: hidden;
          position: relative;
          .slick-list {
            .slick-slide {
              margin-right: 2px;
              max-width: 120px;
              width: 100% !important;
              height: 80px;
            }
            img {
              width: 120px;
              height: 80px;
              object-fit: cover;
            }
          }
          .btn-crousel-bottom {
            position: absolute;
            width: fit-content;
            top: 50%;
            height: 24px;
            transform: translateY(-50%);
          }
          .next {
            right: 2px;
          }
          .prev {
            left: -3px;
          }
        }
        .categories {
          display: flex;
          .cate-item {
            width: 80px;
            height: 80px;
            background: rgba(255, 255, 255, 0.1);
            margin-right: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            cursor: pointer;
          }
          .cate-item:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
</style>
