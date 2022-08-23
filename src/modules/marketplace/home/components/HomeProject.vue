<template>
  <div class="home-project">
    <div class="container w-100 h-50">
      <div class="content">
        <p class="text-7xl" style="font-weight: 600; margin-bottom: 16px">{{ $t('market-home.project-sale') }}</p>
        <p class="text-base second-text">
          {{ description }}
        </p>
        <!-- <div class="view-all">
          <p @click="detailProject">{{ $t('market-home.upcoming.view-all') }} >></p>
        </div> -->
        <div class="view-all">
          <a @click="detailProject">{{ $t('market-home.upcoming.view-all') }} <base-icon icon="chevron-right" size="14" /></a>
        </div>
      </div>
      <div class="carousel" style="position: relative">
        <VueSlickCarousel v-if="listProduct.length" v-bind="settings" ref="carousel">
          <div class="carousel-item" v-for="item in listProduct" :key="item.id">
            <div class="cover-image" @click="handleDetail(item.id)" />
            <img :src="item.avatar" alt="" />
            <div class="content-slide">
              <div class="header-image header-5">{{ item.projectName }}</div>
              <div class="header-image2">
                <div class="address">{{ item.address }}, {{ item.cityName }}</div>
                <!-- <div class="description">{{ item.description }}</div> -->
              </div>
              <div class="description">
                <div>{{ item.description }}</div>
              </div>
            </div>
            <div class="button-image">
              <button style="border: none" @click="handleDetail(item.id)">
                <p>{{ $t('market-home.upcoming.explore-more') }}</p>
              </button>
            </div>
          </div>
        </VueSlickCarousel>
        <div class="btn-crousel cursor prev" @click="handleClickArrow('prev')">
          <base-icon icon="prev-btn" size="60" class="d-iflex" />
        </div>
        <div class="btn-crousel cursor next" @click="handleClickArrow('next')">
          <base-icon icon="next-btn" size="60" class="d-iflex" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import getRepository from '@/services'
  import MarketRepository from '@/services/repositories/marketplace'
  import EventBus from '@/utils/eventBus'
  import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

  const api: MarketRepository = getRepository('market')
  @Component({ components: { VueSlickCarousel } })
  export default class HomeBanner extends Vue {
    settings = {
      arrows: false,
      dots: false,
      focusOnSelect: true,
      infinite: true,
      slidesToShow: 2,
      speed: 500
    }
    items = [
      {
        text1: 'Marina Phu Yen',
        text2: 'Song Cau, Phu Yen 1',
        text3: 'Song Cau, Phu Yen 2',
        text4: 'Song Cau, Phu Yen 3',
        textButton: 'Default'
      },
      {
        text1: 'Marina Phu Yen 1',
        text2: 'Song Cau, Phu Yen 1',
        text3: 'Song Cau, Phu Yen 2',
        text4: 'Song Cau, Phu Yen 3',
        textButton: 'Default'
      },
      {
        text1: 'Marina Phu Yen 2',
        text2: 'Song Cau, Phu Yen 1',
        text3: 'Song Cau, Phu Yen 2',
        text4: 'Song Cau, Phu Yen 3',
        textButton: 'Default'
      },
      {
        text1: 'Marina Phu Yen 3',
        text2: 'Song Cau, Phu Yen 1',
        text3: 'Song Cau, Phu Yen 2',
        text4: 'Song Cau, Phu Yen 3',
        textButton: 'Default'
      }
    ]
    param: Record<string, any> = {
      projectStatus: 'On Sale',
      page: 1,
      limit: 1000,
      orderBy: 0,
      total: null
      // size: 10
    }
    description = ''
    listProduct: Record<string, any> = []
    async created(): Promise<void> {
      this.getDataProjectList()
      const result = await api.getSystemparam({ type: 'PROJECT_STATUS' })

      const a = window.localStorage.getItem('bc-lang')!
      const item = result.filter(item => item.value == 'On Sale')
      const b = item[0].description
      const c = JSON.parse(b)
      if (a == 'en') {
        this.description = c.en
      } else {
        this.description = c.vi
      }
    }
    handleClickArrow(type: 'prev' | 'next'): void {
      if (type === 'prev') {
        //@ts-ignore
        this.$refs['carousel']?.prev()
      } else {
        //@ts-ignore
        this.$refs['carousel']?.next()
      }
    }
    async getDataProjectList(): Promise<any> {
      const result = await api.getDataProjectList(this.param)
      if (result) {
        this.listProduct = result.content
        const a = window.localStorage.getItem('bc-lang')!
        for (let i = 0; i < this.listProduct.length; i++) {
          const a1 = this.listProduct[i].shortDescription
          const b = JSON.parse(a1)
          if (a == 'en') {
            this.listProduct[i].description = b.en
          } else {
            this.listProduct[i].description = b.vi
          }
        }
      }
    }
    handleDetail(id: string | number): void {
      EventBus.$emit('detailProject', id)
      this.$router.push({ name: 'DetailProjectPrimary', params: { type: 'project', id: id.toString() } })
    }
    destroyed(): void {
      EventBus.$off('detailProject')
    }
    detailProject(): void {
      // this.$router.push({ name: 'ProjectList',params: { status: 'On sale' } })
      this.$router.push({ path: '/marketPlace/real-estate/project-list?status=On Sale' })
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep .button {
    cursor: pointer;
    border: none !important;
  }
  ::v-deep.home-project {
    .slick-slide {
      padding: 0 12px 0 0;
      border-radius: 8px;
    }
  }
  .home-project {
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
      left: -85px;
      transform: translateY(-50%);
    }
    .next {
      top: 50%;
      right: -85px;
      transform: translateY(-50%);
    }
    .content-slide {
      position: absolute;
      bottom: 32px;
      left: 32px;
    }
  }
  .button {
    padding: 12px 24px;
    background: #ffffff;
    border-radius: 6px;
    border: none;
    cursor: pointer;
  }
  .description {
    width: 412px;
    //height: 48px;
    text-overflow: clip;
    overflow: hidden;
    word-break: break-word;
    font-size: 14px;
    line-height: 24px;
    font-weight: 500;
    opacity: 0.7;

    //position: absolute;
    //bottom: 32px;
    //left: 32px;
    color: #fff;
  }
  .cover-image {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 59.85%, rgba(0, 0, 0, 0.484375) 71.04%, #000000 100%);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
  .slick-slide img {
    display: block;
    width: 100%;
    height: 446px;
    object-fit: cover;
    border-radius: 8px;
  }
  button {
    cursor: pointer;
    padding: 12px 24px;
    background: #ffffff;
    border-radius: 6px;
    border: none;
    p {
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      font-family: Open Sans;
      background: linear-gradient(to right, #9d3ef2 100%, #3036f4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .home-project {
    .slick-next:before {
      background: url(../../../../assets/images/market/prev-btn.png);
      content: '→';
      color: red;
      background-color: red;
    }
    .slick-prev:before {
      content: '←';
    }
    .content {
      position: relative;
    }
    .view-all {
      position: absolute;
      bottom: 0;
      right: 0;
      margin-right: 12px;
      cursor: pointer;

      a {
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    background-color: var(--bc-bg-market);
    .header-image {
      //position: absolute;
      //bottom: 108px;
      //left: 32px;
      margin-bottom: 4px;
      color: #fff;
    }

    .button-image {
      position: absolute;
      bottom: 32px;
      right: 32px;
      border-radius: 6px;
      border: none;
      color: var(--bc-text-active-marketplace);
    }
    .header-image1 {
      //position: absolute;
      //bottom: 84px;
      //left: 32px;

      color: #fff;
    }
    .header-image2 {
      //position: absolute;
      //bottom: 84px;
      //left: 32px;
      margin-bottom: 4px;
      opacity: 0.7;
      color: #fff;
    }
    .second-text {
      word-break: break-word !important;
      width: 55%;
    }
    .carousel {
      margin-top: 40px;
    }
    .carousel-item {
      position: relative;
      display: flex !important;
      justify-content: center;
    }
  }
</style>
