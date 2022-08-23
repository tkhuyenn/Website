<template>
  <el-collapse v-if="target && target.id" class="collapse collapse-detail" v-model="activeFeatures">
    <el-collapse-item class="collapse-item" :title="$t('market-detail.title-target')" name="1">
      <div class="detail-target">
        <h3 class="header-6 text-semibold text-title">
          {{ $t('market-detail.title-target') }}
        </h3>
        <div class="target-item target-above">
          <div class="be-flex item">
            <span class="body-small text-medium"> {{ $t('market-detail.irr') }}</span>
            <span class="body-small body-small-value">{{ getContent('targetInvestorIrr') }}</span>
          </div>
          <div class="be-flex item">
            <span class="body-small text-medium"> {{ $t('market-detail.equity') }}</span>
            <span class="body-small body-small-value">{{ getContent('targetEquityMultiple') }}</span>
          </div>
          <div class="be-flex item">
            <span class="body-small text-medium"> {{ $t('market-detail.avg') }}</span>
            <span class="body-small body-small-value">{{ getContent('targetAvgCashYield') }}</span>
          </div>
          <div class="be-flex item">
            <span class="body-small text-medium"> {{ $t('market-detail.min') }}</span>
            <span class="body-small body-small-value">{{ getContent('targetMinInvestment') }}</span>
          </div>
        </div>
        <div class="target-item target-below">
          <div class="be-flex item">
            <span class="body-small text-medium"> {{ $t('market-detail.hold') }}</span>
            <span class="body-small body-small-value">{{ getContent('targetHoldPeriod') }}</span>
          </div>
          <div class="be-flex item">
            <span class="body-small text-medium"> {{ $t('market-detail.year-1') }}</span>
            <span class="body-small body-small-value">{{ getContent('targetYearOneCoc') }}</span>
          </div>
          <div class="be-flex item">
            <span class="body-small text-medium"> {{ $t('market-detail.stabilized') }}</span>
            <span class="body-small body-small-value">{{ getContent('targetStabCoc') }}</span>
          </div>
          <div class="be-flex item">
            <span class="body-small text-medium"> {{ $t('market-detail.first-distribution') }}</span>
            <span class="body-small body-small-value">{{ getContent('targetFirstDistribution') }}</span>
          </div>
          <div class="be-flex item">
            <span class="body-small text-medium"> {{ $t('market-detail.frequency') }}</span>
            <span class="body-small body-small-value">{{ getContent('targetDistributionFrequency') }}</span>
          </div>
        </div>
        <!-- <button type="button" class="body-small text-semibold text-white is-none-border cursor btn-target">{{ $t('market-detail.apply') }}</button> -->
        <!-- <button type="button" class="body-small cursor btn-ask">{{ $t('market-detail.ask') }}</button> -->
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class DetailTarget extends Vue {
    @Prop({ required: true, type: Object, default: () => ({}) }) target!: Record<string, any>

    activeFeatures = ['1']

    getContent(key: string): string {
      if (this.target) {
        const language = window.localStorage.getItem('bc-lang')!
        // eslint-disable-next-line @typescript-eslint/ban-types
        const parseElm = JSON.parse(this.target[key]) as Object
        // eslint-disable-next-line no-prototype-builtins
        if (parseElm.hasOwnProperty(language)) {
          return parseElm[language]
        } else {
          return parseElm['default']
        }
      }
      return ''
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep.collapse {
    // .body-small{
    //   font-weight: 400;
    // }
    border-top: none;
    border-bottom: none;
    .collapse-item {
      // padding-bottom: 24px;
      // border-bottom: 1px solid #dbdbdb;
      color: #0A0B0D;
      .el-collapse-item__header {
        height: 32px;
        line-height: 32px;
        font-size: 24px;
        font-weight: 600;
        border-bottom: none;
        color: #0A0B0D  
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
  .detail-target {
    .body-small-value{
      font-weight: 400;
    }
    // padding: 0 24px 24px 24px;
    // box-shadow: 0px 1.2px 3.6px rgba(0, 0, 0, 0.1), 0px 6.4px 14.4px rgba(0, 0, 0, 0.13);
    border-radius: 8px;
    border: 1px solid #dbdbdb;
    overflow: hidden;
    .header-6{
      color: #0A0B0D;
    }

    .text-title {
      padding: 12px 24px;
      background: #f3f2f1;
      margin-bottom: 16px;
    }

    .target-item {
      padding: 0 24px;
      .item {
        justify-content: space-between;
        margin-bottom: 16px;
        color: var(--bc-text-market-primary-nft);
        span:first-child {
          color: var(--bc-text-discript);
        }
      }
    }
    .target-above {
      border-bottom: 1px solid #dbdbdb;
      margin-bottom: 16px;
    }
    .btn-target {
      width: 100%;
      padding: 12px 0;
      background: linear-gradient(10deg, #9d3ef2 40.29%, #3036f4 97.93%);
      border-radius: 4px;
      margin-top: 16px;
    }
    .btn-ask {
      width: 100%;
      padding: 12px 0;
      margin-top: 16px;
      border-radius: 4px;
      background: #fff;
      border: 1px solid #dbdbdb;
      &:hover {
        background: linear-gradient(10deg, #9d3ef2 40.29%, #3036f4 97.93%);
        color: #fff;
      }
    }
  }
</style>
