<template>
  <el-collapse v-if="target && target.valuationAnalytics.length" class="collapse collapse-detail" v-model="activeFeatures">
    <el-collapse-item class="collapse-item" :title="$t('market-detail.title-analytic')" name="1">
      <div class="detail-analytic">
        <!-- <h3 class="header-6 mb-24 text-semibold text-title uppercase">
          {{ $t('market-detail.title-analytic') }}
        </h3> -->
        <div class="content">
          <div class="be-flex header">
            <div></div>
            <div class="body-small text-semibold">Airbnb</div>
            <div class="body-small text-semibold">Traditional</div>
          </div>
          <div class="be-flex item">
            <div class="body-small text-medium text-discript item-child">Rental Income</div>
            <div class="be-flex-column item-child">
              <span class="body-small">${{ tabAirbnb.rentalIncome | formatNumber }}</span>
              <!-- <span class="body-small text-discript">$164.90/night</span> -->
            </div>
            <div class="be-flex-column item-child">
              <span class="body-small">${{ tabTraditional.rentalIncome | formatNumber }}</span>
              <!-- <span class="body-small text-discript">$164.90/night</span> -->
            </div>
          </div>
          <div class="be-flex item">
            <div class="body-small text-medium text-discript item-child">Expenses</div>
            <div class="be-flex-column item-child">
              <span class="body-small">${{ tabAirbnb.expenses | formatNumber }}</span>
            </div>
            <div class="be-flex-column item-child">
              <span class="body-small">${{ tabTraditional.expenses | formatNumber }}</span>
            </div>
          </div>
          <div class="be-flex item">
            <div class="body-small text-medium text-discript item-child">Cash Flow</div>
            <div class="be-flex-column item-child">
              <span class="body-small">${{ tabAirbnb.cashFlow | formatNumber }}</span>
            </div>
            <div class="be-flex-column item-child">
              <span class="body-small">${{ tabTraditional.cashFlow | formatNumber }}</span>
            </div>
          </div>
          <div class="be-flex item">
            <div class="body-small text-medium text-discript item-child">Cash on Cash</div>
            <div class="be-flex-column item-child">
              <span class="body-small amount-decrease">{{ tabAirbnb.cashOnCash | convertAmountDecimal('PERCENT') }}%</span>
            </div>
            <div class="be-flex-column item-child">
              <span class="body-small amount-increase">{{ tabTraditional.cashOnCash | convertAmountDecimal('PERCENT') }}%</span>
            </div>
          </div>
          <div class="be-flex item">
            <div class="body-small text-medium text-discript item-child">Cap Rate</div>
            <div class="be-flex-column item-child">
              <span class="body-small">{{ tabAirbnb.capRate | convertAmountDecimal('PERCENT') }}%</span>
            </div>
            <div class="be-flex-column item-child">
              <span class="body-small">{{ tabTraditional.capRate | convertAmountDecimal('PERCENT') }}%</span>
            </div>
          </div>
          <div class="be-flex item">
            <div class="body-small text-medium text-discript item-child">10 Years Payback Balance</div>
            <div class="be-flex-column item-child">
              <span class="body-small">${{ tabAirbnb.paybackBalance | formatNumber }}</span>
            </div>
            <div class="be-flex-column item-child">
              <span class="body-small">${{ tabTraditional.paybackBalance | formatNumber }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts">
  import { filter } from 'lodash'
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class DetailAnalytic extends Vue {
    @Prop({ required: true, type: Object, default: () => ({}) }) target!: Record<string, any>

    get tabAirbnb(): Record<string, any> {
      if (this.target && this.target?.valuationAnalytics) {
        const tabAirbnb = filter(this.target?.valuationAnalytics, elm => elm.type === 'AIRBNB')[0]
        return tabAirbnb
      }
      return {}
    }
    get tabTraditional(): Record<string, any> {
      if (this.target && this.target?.valuationAnalytics) {
        const tabTraditional = filter(this.target?.valuationAnalytics, elm => elm.type === 'TRADITIONAL')[0]
        return tabTraditional
      }
      return {}
    }

    activeFeatures = ['1']
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
          max-height: 460px;
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
        color: #0a0b0d;
        background: #f3f2f1;
        div {
          line-height: 48px;
          width: 33.3333%;
          text-align: right;
          padding-right: 16px;
        }
      }
      .item {
        height: 64px;
        align-items: center;
        border-bottom: 1px solid #dbdbdb;
        color: var(--bc-text-market-primary-nft);
        .item-child {
          width: 30%;
          text-align: right;
          padding-right: 16px;
        }
        .item-child:first-child {
          text-align: left;
          padding-left: 24px;
          padding-right: 0;
          width: 40%;
        }
      }
      .item:last-child {
        border: none;
      }
      .text-discript {
        color: var(--bc-text-discript);
      }
    }
  }
</style>
