<template>
  <div class="container be-flex detail-content">
    <div class="detail-content__left" :class="!isShowCompProduct ? 'w-100' : null">
      <div class="header" v-if="isShowCompProduct">
        <span class="body-base location">{{ data.product.address }}, {{ data.product.cityName }}</span>
        <h2 class="header-2 text-semibold mb-24">{{ data.product.propertyName }}</h2>
        <div class="be-flex ju-between">
          <div class="be-flex info">
            <div class="info-item">
              <base-icon icon="icon-bed" size="24" class="lh-default" />
              <span>{{ data.product.numOfBedroom }}</span>
            </div>
            <div class="line"></div>
            <div class="info-item">
              <base-icon icon="icon-shower" size="24" class="lh-default" />
              <span>{{ data.product.numOfBathroom }}</span>
            </div>
            <div class="line"></div>
            <div class="info-item">
              <base-icon icon="icon-area" size="24" class="lh-default" />
              <span>{{ data.product.numOfSquare | convertAmountDecimal('AREA') }} m2</span>
            </div>
            <div class="line"></div>
            <div class="info-item">
              <base-icon icon="icon-dollar" size="24" class="lh-default" />
              <span>{{ data.product.tokenAmount | convertAmountDecimal('USD') }} LYNK</span>
            </div>
          </div>
          <div class="property-id">
            <p>
              {{ $t('market-detail.property_id') }}: <b>{{ data.product.propertyCode }}</b>
            </p>
          </div>
        </div>
      </div>
      <div v-if="!isShowCompProduct && data.project" class="be-flex tabs-menu">
        <div v-for="tab in tabs" :key="tab.id" :class="tab.id === tabActive ? 'tab-active' : null" class="cursor body-base tab-item" @click="handleClickTab(tab.id)">
          <span>{{ tab.title }}</span>
        </div>
      </div>
      <div v-else class="be-flex tabs-menu">
        <div v-for="tab in tabsProduct" :key="tab.id" :class="tab.id === tabActive ? 'tab-active' : null" class="cursor body-base tab-item" @click="handleClickTab(tab.id)">
          <span>{{ tab.title }}</span>
        </div>
      </div>
      <detail-infomation v-if="!isShowCompProduct && data.project" :project="data.project" :feature-list="data.featureList" :metaDataList="data.metaDataList" :id="1" />
      <detail-infomation v-if="isShowCompProduct && data.product" :project="data.product" :feature-list="data.featureList" :metaDataList="data.metaDataList" :id="1" />

      <detail-block v-if="!isShowCompProduct && data.blockList.length" :id="2" :blockList="data.blockList" />

      <detail-investor v-if="!isShowCompProduct && data.investor && data.investor.id" :investor="data.investor" :id="3" />

      <detail-attachment v-if="data.attachmentList.length" :attachmentList="data.attachmentList" :id="4" />

      <detail-floor v-if="isShowCompProduct && data.floorPlanList.length" :floorPlanList="data.floorPlanList" :id="3" />

      <detail-video :mediaList="data.mediaList" :id="5" />

      <detail-virtual :mediaList="data.mediaList" :id="6" />

      <detail-map v-if="!isShowCompProduct" :project="data.project" :id="7" />
      <detail-map v-else :project="data.product" :id="7" />

      <detail-project-info v-if="isShowCompProduct" :propertyProject="data.propertyProject" :id="9" />

      <detail-expenses v-if="isShowCompProduct" :id="10" />

      <detail-investment v-if="isShowCompProduct" />

      <detail-list-product v-if="!isShowCompProduct" :productList="data.productList" :id="9" />
      <detail-list-product v-else :productList="data.similarList" :id="9" />
    </div>
    <div class="detail-content__right">
      <detail-target :target="data && data.target" />
      <detail-trans />
      <detail-analytic />
      <monthly-expense />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import DetailInfomation from './DetailInfomation.vue'
  import DetailBlock from './DetailBlock.vue'
  import DetailInvestor from './DetailInvestor.vue'
  import DetailAttachment from './DetailAttachment.vue'
  import DetailVideo from './DetailVideo.vue'
  import DetailMap from './DetailMap.vue'
  import DetailVirtual from './DetailVirtual.vue'
  import DetailListProduct from './DetailListProduct.vue'
  import DetailTarget from './DetailTarget.vue'
  import DetailTrans from './DetailTrans.vue'
  import DetailFloor from './DetailFloor.vue'
  import DetailProjectInfo from './DetailProjectInfo.vue'
  import DetailAnalytic from './DetailAnalytic.vue'
  import DetailExpenses from '@/modules/marketplace/home/components/detail-project/DetailExpenses.vue'
  import DetailInvestment from '@/modules/marketplace/home/components/detail-project/DetailInvestment.vue'
  import MonthlyExpense from '@/modules/marketplace/home/components/detail-project/MonthlyExpense.vue'

  @Component({
    components: {
      DetailInfomation,
      DetailFloor,
      DetailProjectInfo,
      DetailBlock,
      DetailInvestor,
      DetailAttachment,
      DetailVideo,
      DetailMap,
      DetailVirtual,
      DetailListProduct,
      DetailTarget,
      DetailTrans,
      DetailAnalytic,
      DetailExpenses,
      DetailInvestment,
      MonthlyExpense
    }
  })
  export default class DetailContent extends Vue {
    @Prop({ required: true, type: Object, default: () => ({}) }) data!: Record<string, any>

    tabs: Array<Record<string, any>> = [
      {
        id: 0,
        title: this.$t('market-detail.tab.des')
      },
      {
        id: 1,
        title: this.$t('market-detail.tab.detail')
      },
      {
        id: 2,
        title: this.$t('market-detail.tab.features')
      },
      {
        id: 3,
        title: this.$t('market-detail.tab.investor')
      },
      {
        id: 4,
        title: this.$t('market-detail.tab.attachment')
      },
      {
        id: 5,
        title: this.$t('market-detail.tab.video')
      },
      {
        id: 6,
        title: this.$t('market-detail.tab.virual')
      },
      {
        id: 7,
        title: this.$t('market-detail.tab.map')
      },
      {
        id: 9,
        title: this.$t('market-detail.tab.product')
      }
    ]
    tabsProduct: Array<Record<string, any>> = [
      {
        id: 0,
        title: this.$t('market-detail.tab.des')
      },
      {
        id: 1,
        title: this.$t('market-detail.tab.detail')
      },
      {
        id: 2,
        title: this.$t('market-detail.tab.features')
      },
      {
        id: 4,
        title: this.$t('market-detail.tab.attachment')
      },
      {
        id: 3,
        title: this.$t('market-detail.tab.floor')
      },
      {
        id: 5,
        title: this.$t('market-detail.tab.video')
      },
      {
        id: 6,
        title: this.$t('market-detail.tab.virual')
      },
      {
        id: 7,
        title: this.$t('market-detail.tab.map')
      },
      {
        id: 9,
        title: this.$t('market-detail.tab.project-info')
      }
      // {
      //   id: 10,
      //   title: this.$t('market-detail.tab.expenses')
      // }
    ]
    tabActive = 0
    handleClickTab(id: number): void {
      console.log(id)
      if (id !== undefined) {
        let ids: string = id.toString()
        setTimeout(() => {
          if (document.getElementById(ids)) {
            const yOffset = -80
            const element = document.getElementById(ids)
            if (element) {
              const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
              window.scrollTo({ top: y, behavior: 'smooth' })
            }
          }
        }, 300)
      }
    }
    get isShowCompProduct(): boolean {
      return this.$route.params.type === 'product'
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep.detail-content {
    justify-content: space-between;

    &__left {
      width: 66.1%;

      .header {
        .location {
          color: var(--bc-text-discript3);
          opacity: 0.7;
        }

        .info {
          align-items: center;
          margin-bottom: 32px;

          .info-item {
            display: flex;
            align-items: center;

            span:last-child {
              font-size: 16px;
              line-height: 24px;
              padding-left: 8px;
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
      }

      .tabs-menu {
        border-bottom: 1px solid #dbdbdb;
        margin-bottom: 24px;

        .tab-item {
          padding: 16px 0;
          color: var(--bc-text-color-tab-item);

          &:hover {
            background: var(--bc-menu-active);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }

        .tab-item:not(:last-child) {
          margin-right: 16px;
        }

        .tab-active {
          font-weight: 600;
          background: var(--bc-menu-active);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          border-bottom: 2px solid var(--bc-tab-active);
        }
      }

      .collapse-detail {
        .collapse-item {
          padding-bottom: 32px;
          .el-collapse-item__wrap {
            .el-collapse-item__content {
              padding-bottom: 0;
            }
          }
        }
      }
    }

    &__right {
      width: 30.955%;
    }
    .ju-between {
      justify-content: space-between;
    }
    .property-id {
      font-family: Open Sans;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      color: #5b616e;

      b {
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        text-align: right;
        color: #0e0b23;
      }
    }
  }
</style>
