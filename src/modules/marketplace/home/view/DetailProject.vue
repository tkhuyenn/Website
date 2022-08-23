<template>
  <div class="wrap-detail" v-loading="isLoading">
    <detail-header :project="data.project" :product="data.product" :mediaList="data.mediaList" :isFavourite="isFavourite" @favourite="handleFavourite" />
    <detail-content :data="data" v-if="!isLoading" />
    <footer-market />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import DetailHeader from '../components/detail-project/DetailHeader.vue'
  import DetailContent from '../components/detail-project/DetailContent.vue'
  import FooterMarket from '../components/Footer.vue'
  import MarketRepository from '@/services/repositories/marketplace'
  import getRepository from '@/services'

  import { namespace } from 'vuex-class'
  const bcMarketHome = namespace('bcMarketPrimaryHome')

  const apiMarket: MarketRepository = getRepository('market')
  @Component({ components: { DetailHeader, DetailContent, FooterMarket } })
  export default class DetailProject extends Vue {
    @bcMarketHome.Action('setMetaData') setMetaData!: (list: Array<Array<Record<string, any>>>) => void
    data: Record<string, any> = {}
    isLoading = false
    isFavourite = false

    async created(): Promise<void> {
      await this.getMetaData()
      await this.init()
    }
    @Watch('$route.params.type') watchRouter(_new: string): void {
      if (_new) {
        this.init()
      }
    }

    @Watch('$route.params.id') watchRouterId(_new: string): void {
      if (_new) {
        this.init()
      }
    }

    async init(): Promise<void> {
      try {
        if (this.isLoading) {
          return
        }
        this.isLoading = true
        window.scrollTo(0, 0)
        const type = this.$route.params.type
        this.data = await apiMarket.getDetail(type, this.$route.params.id)
        if (type === 'project') {
          this.isFavourite = this.data.project.isFavourite
        } else {
          this.isFavourite = this.data.product.isFavourite
        }
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.log(error)
      }
    }
    async getMetaData(): Promise<void> {
      try {
        const api1 = apiMarket.getSystemparam({ type: 'BLOCK_META_DATA' })
        const api2 = apiMarket.getSystemparam({ type: 'PRODUCT_META_DATA' })
        const api3 = apiMarket.getSystemparam({ type: 'PROJECT_META_DATA' })
        const api4 = apiMarket.getSystemparam({ type: 'FEATURE' })
        const result = await Promise.all([api1, api2, api3, api4])
        this.setMetaData(result)
      } catch (error) {
        console.log(error)
      }
    }

    handleFavourite(): void {
      this.isFavourite = !this.isFavourite
    }
  }
</script>

<style scoped lang="scss">
  .wrap-detail {
    padding-top: 80px;
  }
</style>
