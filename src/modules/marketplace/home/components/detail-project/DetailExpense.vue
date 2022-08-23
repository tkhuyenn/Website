<template>
  <el-collapse v-if="target && target.id" class="collapse collapse-detail" v-model="activeFeatures">
    <el-collapse-item class="collapse-item" :title="$t('market-detail.title-expence')" name="1">
      <div class="detail-analytic">
        <!-- <h3 class="header-6 mb-24 text-semibold text-title uppercase">
          {{ $t('market-detail.title-analytic') }}
        </h3> -->
        <div class="content">
          <div class="be-flex header">
            <div class="body-small text-semibold">Expenses</div>
            <!-- <div class="body-small text-semibold">AIRBNB</div>
            <div class="body-small text-semibold">TRADITIONAL</div> -->
          </div>
          <div class="be-flex item">
            <div class="body-small text-medium text-discript item-child">Inspections</div>
            <div class="be-flex-column item-child">
              <span class="body-small body-small-value">${{ target.expenseInspections | formatNumber }}</span>
            </div>
          </div>
          <div class="be-flex item">
            <div class="body-small text-medium text-discript item-child">Total Repair Costs</div>
            <div class="be-flex-column item-child">
              <span class="body-small body-small-value">${{ target.expenseRepair | formatNumber }}</span>
            </div>
          </div>
          <div class="be-flex item">
            <div class="body-small text-medium text-discript item-child">Furniture & Appliances</div>
            <div class="be-flex-column item-child">
              <span class="body-small body-small-value">${{ target.expenseFurniture | formatNumber }}</span>
            </div>
          </div>
          <div class="be-flex item">
            <div class="body-small text-medium text-discript item-child">Closing Costs</div>
            <div class="be-flex-column item-child">
              <span class="body-small body-small-value">${{ target.expenseClosing | formatNumber }}</span>
            </div>
          </div>
          <div class="be-flex item">
            <div class="body-small text-medium text-discript item-child">Total</div>
            <div class="be-flex-column item-child">
              <span class="nft-header5 text-medium text-total">${{ getTotal | formatNumber }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class DetailExpense extends Vue {
    @Prop({ required: true, type: Object, default: () => ({}) }) target!: Record<string, any>

    activeFeatures = ['1']

    get getTotal(): number {
      return this.target.expenseRepair + this.target.expenseInspections + this.target.expenseFurniture + this.target.expenseClosing
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
      .body-small-value{
        font-weight: 400;
      }
      .header {
        height: 48px;
        color: #0a0b0d;
        background: #f3f2f1;
        div {
          line-height: 48px;
          width: 33.3333%;
          //   text-align: right;
          padding-left: 24px;
        }
      }
      .item {
        height: 56px;
        align-items: center;
        border-bottom: 1px solid #dbdbdb;
        color: var(--bc-text-market-primary-nft);
        .item-child {
          flex: 1;
          text-align: right;
          padding-right: 24px;
        }
        .item-child:first-child {
          text-align: left;
          padding-left: 24px;
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
