<template>
  <el-collapse v-if="target && target.length" class="collapse collapse-detail" v-model="activeFeatures">
    <el-collapse-item class="collapse-item" :title="$t('market-detail.title-mothly')" name="1">
      <div class="detail-analytic">
        <!-- <h3 class="header-6 mb-24 text-semibold text-title uppercase">
          {{ $t('market-detail.title-analytic') }}
        </h3> -->
        <div class="content">
          <div class="be-flex header">
            <div class="body-small text-semibold text-left">Expenses</div>
            <div class="body-small text-semibold">Airbnb</div>
            <div class="body-small text-semibold">Traditional</div>
          </div>
          <div class="be-flex item">
            <div class="body-small text-medium text-discript item-child">Insurance</div>
            <div class="be-flex-column item-child">
              <span class="body-small">${{ tabAirbnb.insurance | formatNumber }}</span>
            </div>
            <div class="be-flex-column item-child">
              <span class="body-small">${{ tabTraditional.insurance | formatNumber }}</span>
            </div>
          </div>
          <div class="be-flex item">
            <div class="body-small text-medium text-discript item-child">Utilities</div>
            <div class="be-flex-column item-child">
              <span class="body-small">${{ tabAirbnb.utilities | formatNumber }}</span>
            </div>
            <div class="be-flex-column item-child">
              <span class="body-small">${{ tabTraditional.utilities | formatNumber }}</span>
            </div>
          </div>
          <div class="be-flex item">
            <div class="body-small text-medium text-discript item-child">Prop. Management</div>
            <div class="be-flex-column item-child">
              <span class="body-small">${{ tabAirbnb.management | formatNumber }}</span>
            </div>
            <div class="be-flex-column item-child">
              <span class="body-small">${{ tabTraditional.management | formatNumber }}</span>
            </div>
          </div>
          <div class="be-flex item">
            <div class="body-small text-medium text-discript item-child">Prop. Maintenance</div>
            <div class="be-flex-column item-child">
              <span class="body-small">${{ tabAirbnb.maintenance | formatNumber }}</span>
            </div>
            <div class="be-flex-column item-child">
              <span class="body-small">${{ tabTraditional.maintenance | formatNumber }}</span>
            </div>
          </div>
          <div class="be-flex item">
            <div class="body-small text-medium text-discript item-child">Prop. Tax</div>
            <div class="be-flex-column item-child">
              <span class="body-small">${{ tabAirbnb.tax | formatNumber }}</span>
            </div>
            <div class="be-flex-column item-child">
              <span class="body-small">${{ tabTraditional.tax | formatNumber }}</span>
            </div>
          </div>
          <div class="be-flex item">
            <div class="body-small text-medium text-discript item-child">HOA Dues</div>
            <div class="be-flex-column item-child">
              <span class="body-small">${{ tabAirbnb.hoaDues | formatNumber }}</span>
            </div>
            <div class="be-flex-column item-child">
              <span class="body-small">${{ tabTraditional.hoaDues | formatNumber }}</span>
            </div>
          </div>
          <div class="be-flex item">
            <div class="body-small text-medium text-discript item-child">Rental Income Taxes</div>
            <div class="be-flex-column item-child">
              <span class="body-small">${{ tabAirbnb.rentalIncomeTax | formatNumber }}</span>
            </div>
            <div class="be-flex-column item-child">
              <span class="body-small">${{ tabTraditional.rentalIncomeTax | formatNumber }}</span>
            </div>
          </div>
          <div class="be-flex item">
            <div class="body-small text-medium text-discript item-child">Cleaning Fees</div>
            <div class="be-flex-column item-child">
              <span class="body-small">${{ tabAirbnb.cleaningFee | formatNumber }}</span>
            </div>
            <div class="be-flex-column item-child">
              <span class="body-small">${{ tabTraditional.cleaningFee | formatNumber }}</span>
            </div>
          </div>

          <div class="be-flex item">
            <div class="body-small text-medium text-discript item-child">Total</div>
            <div class="be-flex-column item-child">
              <span class="nft-header5 text-medium text-total">${{ totalAirbnb | formatNumber }}</span>
            </div>
            <div class="be-flex-column item-child">
              <span class="nft-header5 text-medium text-total">${{ totalTraditional | formatNumber }}</span>
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
  export default class MonthlyExpense extends Vue {
    @Prop({ required: true, type: Array, default: () => [] }) target!: Array<Record<string, any>>

    activeFeatures = ['1']

    get tabAirbnb(): Record<string, any> {
      if (this.target.length) {
        const tabAirbnb = filter(this.target, elm => elm.type === 'AIRBNB')[0]
        return tabAirbnb
      }
      return {}
    }
    get tabTraditional(): Record<string, any> {
      if (this.target.length) {
        const tabTraditional = filter(this.target, elm => elm.type === 'TRADITIONAL')[0]
        return tabTraditional
      }
      return {}
    }

    get totalAirbnb(): number {
      return (
        this.tabAirbnb.cleaningFee +
        this.tabAirbnb.hoaDues +
        this.tabAirbnb.insurance +
        this.tabAirbnb.maintenance +
        this.tabAirbnb.management +
        this.tabAirbnb.rentalIncomeTax +
        this.tabAirbnb.tax +
        this.tabAirbnb.utilities
      )
    }
    get totalTraditional(): number {
      return (
        this.tabTraditional.cleaningFee +
        this.tabTraditional.hoaDues +
        this.tabTraditional.insurance +
        this.tabTraditional.maintenance +
        this.tabTraditional.management +
        this.tabTraditional.rentalIncomeTax +
        this.tabTraditional.tax +
        this.tabTraditional.utilities
      )
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
        margin-top: 24px;
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
    overflow: hidden;
    .content {
      .header {
        height: 48px;
        background: #f3f2f1;
        padding: 0 24px;
        color: #0a0b0d;
        .text-left {
        }
        div {
          line-height: 48px;
          width: 33.3333%;
          text-align: right;
          // padding-left: 24px;
        }
      }
      .item {
        height: 56px;
        align-items: center;
        border-bottom: 1px solid #dbdbdb;
        padding: 0 24px;
        color: var(--bc-text-market-primary-nft);
        .item-child {
          width: 33.3333%;
          text-align: right;
          // padding-right: 24px;
        }
        .item-child:first-child {
          text-align: left;
          // padding-left: 24px;
          padding-right: 0;
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
</style>
