<template>
  <div class="banner-home be-flex align-center">
    <div class="container text-white">
      <div class="wrap-text">
        <p class="header-1">{{ $t('market-home.intro-1') }}</p>
        <p class="header-1">{{ $t('market-home.intro-2') }}</p>
        <p class="header-small">{{ $t('market-home.intro-3') }}</p>
      </div>
      <div class="wrap-select text-market-primary">
        <!-- <p class="header-5 text-semibold">
          {{ $t('market-home.select') }}
        </p> -->
        <div class="be-flex search-input">
          <el-form>
            <el-form-item class="mb-0">
              <el-input v-model="form.search" class="input-search" :placeholder="$t('placeholder.search-property')">
                <span slot="prefix" class="prefix-search">
                  <base-icon icon="icon-search" class="d-iflex" size="24" />
                </span>
              </el-input>
            </el-form-item>
          </el-form>

          <button type="button" class="header-6 text-semibold text-white is-none-border cursor btn-market-search" @click="handleSearchProject">
            {{ $t('market-home.form.search') }}
          </button>
        </div>

        <el-form class="be-flex align-center form-market form-select">
          <el-form-item :label="$t('market-home.form.project')" class="be-flex-item">
            <el-select v-model="form.projectIds" class="none-border-form-item" popper-class="popper-select-project">
              <div v-infinite-scroll="loadMoreProject" infinite-scroll-delay="500">
                <el-option :label="$t('market-home.form.all')" :value="null" />
                <el-option v-for="item in listProject" :key="item.id" :label="item.projectName" :value="item.id" />
              </div>
            </el-select>
          </el-form-item>
          <div class="line"></div>
          <el-form-item :label="$t('market-home.form.type')" class="be-flex-item">
            <el-select v-model="form.productType" class="none-border-form-item">
              <el-option :label="$t('market-home.form.all')" :value="null" />
              <el-option v-for="item in listType" :key="item.id" :label="item.value" :value="item.value" />
            </el-select>
          </el-form-item>
          <div class="line"></div>
          <el-form-item :label="$t('market-home.form.price')" class="be-flex-item">
            <el-select
              v-model="price"
              @change="handleChangePrice"
              class="none-border-form-item"
              :popper-class="language === 'vi' ? 'market-price-popper market-price-popper--vi' : 'market-price-popper'"
            >
              <el-option v-for="item in listPrice" :key="item.id" :label="$t(`market-detail.${item.key}`)" :value="item.value" />
            </el-select>
          </el-form-item>
          <div class="line"></div>
          <el-form-item :label="$t('market-home.form.area')" class="be-flex-item">
            <el-select
              v-model="area"
              @change="handleChangeArea"
              class="none-border-form-item"
              :popper-class="language === 'vi' ? 'market-price-popper market-price-popper--vi' : 'market-price-popper'"
            >
              <el-option v-for="item in listArea" :key="item.id" :label="$t(`market-detail.${item.key}`)" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import MarketRepository from '@/services/repositories/marketplace'
  import getRepository from '@/services'
  import EventBus from '@/utils/eventBus'

  const apiMarket: MarketRepository = getRepository('market')

  @Component
  export default class HomeBanner extends Vue {
    form: Record<string, any> = {
      projectIds: null,
      productType: null,
      fromPriceUsd: 50000,
      toPriceUsd: 500000,
      fromArea: null,
      toArea: 30,
      search: '',
      price: ''
    }
    param: Record<string, any> = {
      page: 1,
      limit: 10
    }

    price = '$50k - $500k'
    area = 'Below 30m2'
    totalPage = 0
    language = ''
    objPrice: Record<string, any> = {
      'Below $50k': {
        fromPriceUsd: 0,
        toPriceUsd: 50000
      },
      '$50k - $500k': {
        fromPriceUsd: 50000,
        toPriceUsd: 500000
      },
      '$500k - $1M': {
        fromPriceUsd: 500000,
        toPriceUsd: 1000000
      },
      '$1M - $3M': {
        fromPriceUsd: 1000000,
        toPriceUsd: 3000000
      },
      '$3M - $5M': {
        fromPriceUsd: 3000000,
        toPriceUsd: 5000000
      },
      '$5M - $8M': {
        fromPriceUsd: 5000000,
        toPriceUsd: 8000000
      },
      '$8M - $10M': {
        fromPriceUsd: 8000000,
        toPriceUsd: 10000000
      },
      'Above $10M': {
        fromPriceUsd: 10000000,
        toPriceUsd: null
      }
    }
    objArea: Record<string, any> = {
      'Below 30m2': {
        fromArea: null,
        toArea: 30
      },
      '30m2 to 50m2': {
        fromArea: 30,
        toArea: 50
      },
      '50m2 to 80m2': {
        fromArea: 50,
        toArea: 80
      },
      '80m2 to 100m2': {
        fromArea: 80,
        toArea: 100
      },
      '100m2 to 150m2': {
        fromArea: 100,
        toArea: 150
      },
      '150m2 to 300m2': {
        fromArea: 150,
        toArea: 300
      },
      '300m2 to 500m2': {
        fromArea: 300,
        toArea: 500
      },
      'Above 500m2': {
        fromArea: 500,
        toArea: null
      }
    }

    listProject: Array<Record<string, any>> = []
    listType: Array<Record<string, any>> = []
    listPrice: Array<Record<string, any>> = []
    listArea: Array<Record<string, any>> = []

    created(): void {
      this.init()
      this.language = window.localStorage.getItem('bc-lang')!
    }

    async init(): Promise<void> {
      try {
        const result = await apiMarket.getDataProjectList(this.param)
        this.listType = await apiMarket.getSystemparam({ type: 'PROPERTY_TYPE' })
        this.listPrice = await apiMarket.getSystemparam({ type: 'PRICE_RANGE' })
        this.listArea = await apiMarket.getSystemparam({ type: 'AREA_RANGE' })
        this.listProject = result.content
        this.totalPage = result.totalPages
      } catch (error) {
        console.log(error)
      }
    }

    async loadMoreProject(): Promise<void> {
      try {
        if (this.param.page === this.totalPage) {
          return
        }
        this.param.page += 1
        const result = await apiMarket.getDataProjectList(this.param)
        this.listProject = [...this.listProject, ...result.content]
      } catch (error) {
        console.log(error)
      }
    }

    handleChangePrice(_price: string): void {
      this.form = Object.assign(this.form, this.objPrice[_price])
      console.log(this.price)
      if (this.price == 'Below $50k') {
        this.form.price = 'price_range.below_50k'
      } else if (this.price == '$50k - $500k') {
        this.form.price = 'price_range.50k_to_500k'
      } else if (this.price == '$500k - $1M') {
        this.form.price = 'price_range.500k_to_1m'
      } else if (this.price == '$1M - $3M') {
        this.form.price = 'price_range.1m_to_3m'
      } else if (this.price == '$3M - $5M') {
        this.form.price = 'price_range.3m_to_5m'
      } else if (this.price == '$5M - $8M') {
        this.form.price = 'price_range.5m_to_8m'
      } else if (this.price == '$8M - $10M') {
        this.form.price = 'price_range.8m_to_10m'
      } else if (this.price == 'Above $10M') {
        this.form.price = 'price_range.above_10m'
      }
    }
    handleChangeArea(_area: string): void {
      this.form = Object.assign(this.form, this.objArea[_area])
      console.log('area', _area)
      if (this.area == 'Below 30m2') {
        this.form.area = 'area_range.below_30'
      } else if (this.area == '30m2 to 50m2') {
        this.form.area = 'area_range.below_30_to_50'
      } else if (this.area == '50m2 to 80m2') {
        this.form.area = 'area_range.50_to_80'
      } else if (this.area == '80m2 to 100m2') {
        this.form.area = 'area_range.80_to_100'
      } else if (this.area == '100m2 to 150m2') {
        this.form.area = 'area_range.100_to_150'
      } else if (this.area == '150m2 to 300m2') {
        this.form.area = 'area_range.150_to_300'
      } else if (this.area == '300m2 to 500m2') {
        this.form.area = 'area_range.300_to_500'
      } else if (this.area == 'Above 500m2') {
        this.form.area = 'area_range.above_500'
      }
    }

    handleSearchProject(): void {
      this.handleChangePrice(this.price)
      this.handleChangeArea(this.area)
      this.$router.push({ name: 'ListProduct', query: { ...this.form } })
      //  EventBus.$emit('searchPrice')
    }
    //  destroyed(): void {
    //   EventBus.$off('searchPrice')
    // }
  }
</script>

<style lang="scss" scoped>
  .banner-home {
    background-image: url('../../../../assets/images/market/banner-home.png');
    background-repeat: no-repeat;
    // background-attachment: fixed;
    background-size: cover;
    background-color: var(--bc-bg-market);
    background-position: bottom center;
    padding-top: 200px;
    /* height: auto; */
    padding-bottom: 169px;
    //height: 100vh;

    .container {
      .wrap-text {
        .header-1 {
          font-weight: 700;
        }
        .header-1:first-child {
          margin-bottom: 8px;
        }
        .header-small {
          margin-top: 16px;
          font-weight: 300;
          font-size: 38px;
          line-height: 48px;
        }
      }
      ::v-deep.search-input {
        .input-search {
          width: 699px;
          margin-right: 24px;
          .el-input__inner {
            height: 48px;
            padding-left: 44px;
            font-size: 16px;
            color: var(--bc-text-market-primary);
          }
          .el-input__prefix {
            left: 12px;
            top: 12px;
          }
        }
        .btn-market-search {
          width: 160px;
          padding: 12px 24px;
          border-radius: 6px;
          background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
          &:hover {
            border: none;
            color: var(--bc-color-white);
            background: var(--bc-theme-primary-gradient-hover) !important;
          }
        }
      }

      ::v-deep.wrap-select {
        background-color: var(--bc-bg-white);
        border-radius: 16px;
        padding: 40px;
        width: fit-content;
        margin-top: 64px;

        .form-select {
          margin-top: 32px;
          .el-form-item {
            margin-bottom: 0;
            height: 54px;
            &__content {
              line-height: 1;
              .el-input {
                &__inner {
                  max-width: 160px;
                  width: 100%;
                }
                &__suffix {
                  top: -31px;
                }
                &__icon {
                  line-height: 1;
                }
              }
            }
          }
          .line {
            margin: 0 40px;
            width: 1px;
            height: 40px;
            background: #0e0b23;
            opacity: 0.2;
          }
        }
      }
    }
  }
</style>
