<template>
  <el-collapse v-if="target && target.length" class="collapse collapse-detail" v-model="activeFeatures">
    <el-collapse-item class="collapse-item" :title="$t('market-detail.title-payback')" name="1">
      <div class="be-flex tab">
        <div
          v-for="(item, index) in arrTab"
          :key="index"
          class="text-desc cursor nft-body-base tab-item"
          :class="item.value === tabActive ? 'tab-active' : null"
          @click="handleClickTab(item.value)"
        >
          {{ item.title }}
        </div>
      </div>
      <div class="detail-analytic be-scroll-custom">
        <!-- <h3 class="header-6 mb-24 text-semibold text-title uppercase">
          {{ $t('market-detail.title-analytic') }}
        </h3> -->

        <div class="content">
          <div class="be-flex header" :style="{ width: width }">
            <div class="body-small text-semibold text-left" style="width: 240px">Years</div>
            <div class="body-small text-semibold" v-for="(year, index) in numOfYear" :key="year">
              {{ firstYear.year + index }}
            </div>
          </div>
          <div class="be-flex item" :style="{ width: width }" v-for="item in arrEle" :key="item.value">
            <div class="text-medium item-child" :class="item.icon ? 'be-flex align-center body-base ' : 'text-desc body-small no-icon'">
              <base-icon v-if="item.show" icon="icon-arrow-down-fill" size="24" class="d-iflex" style="padding-right: 4px" />
              <span>{{ item.title }}</span>
            </div>
            <div class="be-flex-column item-child value" v-for="(year, index) in numOfYear" :key="index">
              <span class="body-small body-small-value">${{ listResult[index][item.value] | formatNumber }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import filter from 'lodash/filter'

  @Component
  export default class BalancePayback extends Vue {
    @Prop({ required: true, type: Array, default: () => [] }) target!: Array<Record<string, any>>

    activeFeatures = ['1']

    tabActive = 'TRADITIONAL'

    arrEle = [
      {
        title: 'Adjusted Gross Revenue',
        value: 'adjustedGrossRevenue',
        icon: true,
        show: true
      },
      {
        title: 'Gross Rental Revenue',
        value: 'grossRentalRevenue'
      },
      {
        title: 'Cleaning Fee Collected',
        value: 'cleaningFeeCollected'
      },
      {
        title: 'Vacancy',
        value: 'vacancy'
      },
      {
        title: 'Airbnb Hosting Fee',
        value: 'airbnbHostingFee'
      },
      {
        title: 'Total Expenses',
        value: 'totalExpenses',
        icon: true,
        show: true
      },
      {
        title: 'Recurring Costs',
        value: 'recurringCosts'
      },
      {
        title: 'Mortgage',
        value: 'mortgage'
      },
      {
        title: 'Cash Flow',
        value: 'cashFlow',
        icon: true
      },
      {
        title: 'Startup Costs',
        value: 'startupCost',
        icon: true
      },
      {
        title: 'Investment Payback Balance',
        value: 'balance',
        icon: true
      }
    ]

    arrTab: Array<Record<string, any>> = [
      {
        title: 'Traditional',
        value: 'TRADITIONAL'
      },
      {
        title: 'Airbnb',
        value: 'AIRBNB'
      }
    ]

    get listResult(): Array<Record<string, any>> {
      const result = filter(this.target, elm => elm.type === this.tabActive)[0]
      return result?.paybackBalances || []
    }

    get tabAirbnb(): Array<Record<string, any>> {
      if (this.target.length) {
        const tabAirbnb = filter(this.target, elm => elm.type === 'AIRBNB')[0]
        return tabAirbnb?.paybackBalances
      }
      return []
    }
    get tabTraditional(): Array<Record<string, any>> {
      if (this.target.length) {
        const tabTraditional = filter(this.target, elm => elm.type === 'TRADITIONAL')[0]
        return tabTraditional?.paybackBalances
      }
      return []
    }

    get numOfYear(): number {
      return this.tabAirbnb.length
    }

    get firstYear(): Record<string, any> {
      return this.tabAirbnb[0] || {}
    }

    get width(): string {
      return 240 + 48 + this.numOfYear * 80 + 'px'
    }

    handleClickTab(tab): void {
      this.tabActive = tab
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep.collapse {
    margin-top: 32px;
    border-top: none;
    border-bottom: none;
    .collapse-item {
      // padding-bottom: 24px;
      // border-bottom: 1px solid #dbdbdb;
      .el-collapse-item__header {
        height: 32px;
        line-height: 32px;
        font-size: 24px;
        font-weight: 600;
        border-bottom: none;
        color: #0a0b0d;
      }

      .el-collapse-item__wrap {
        // margin-top: 24px;
        border-bottom: none;
        .el-collapse-item__content {
          // max-height: 460px;
        }
      }
    }
  }
  .detail-analytic {
    // padding: 24px;
    // box-shadow: 0px 1.2px 3.6px rgba(0, 0, 0, 0.1), 0px 6.4px 14.4px rgba(0, 0, 0, 0.13);
    // border-radius: 8px;
    // margin-top: 48px;
    border-radius: 8px;
    border: 1px solid #dbdbdb;
    overflow: auto;
    .content {
      .body-small-value {
        font-weight: 400;
      }
      .header {
        color: #0a0b0d;
        height: 48px;
        background: #f3f2f1;
        padding: 0 24px;
        div {
          line-height: 48px;
          width: 80px;
          text-align: right;
          // padding-left: 24px;
        }
      }
      .item:nth-child(5) {
        .value {
          span {
            color: #cf202f;
          }
        }
      }
      .item:nth-child(6) {
        .value {
          span {
            color: #cf202f;
          }
        }
      }
      .item:nth-child(7) {
        .value {
          span {
            color: #cf202f;
          }
        }
      }
      .item:nth-child(8) {
        .value {
          span {
            color: #cf202f;
          }
        }
      }
      .item:nth-child(11) {
        .value {
          span {
            color: #cf202f;
          }
        }
      }
      .item:nth-child(12) {
        .value {
          span {
            color: #129961;
          }
        }
      }
      .item {
        height: 56px;
        align-items: center;
        border-bottom: 1px solid #dbdbdb;
        padding: 0 24px;
        color: var(--bc-text-market-primary-nft);

        .item-child {
          width: 80px;
          text-align: right;
          // padding-right: 24px;
        }
        .item-child:first-child {
          text-align: left;
          width: 240px;
          // padding-left: 24px;
          padding-right: 0;
        }
        .no-icon {
          padding-left: 28px;
        }
      }
      .item:last-child {
        border: none;
      }
      .text-discript {
        color: var(--bc-text-discript);
      }
      .text-total {
        background: linear-gradient(90deg, #51c1b0 0.08%, #4fc1b4 20.41%, #4bc1be 45.75%, #42c2cf 73.63%, #32c3e3 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }
  }
  .tab {
    margin-top: 8px;
    border-bottom: 1px solid #dbdbdb;
    margin-bottom: 24px;
    .tab-item {
      padding: 16px 12px;
      position: relative;
      &:hover {
        background: var(--bc-menu-active);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .tab-active {
      background: var(--bc-menu-active);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 600;
      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        background: var(--bc-theme-primary-gradient);
      }
    }
  }
  .body-small {
    font-size: 15px;
  }
</style>
