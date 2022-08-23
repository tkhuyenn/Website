<template>
  <div class="wrap-collapse">
    <el-collapse v-if="metaDataList.length" class="collapse collapse-detail" v-model="activeDetail">
      <el-collapse-item class="collapse-item" :title="$t('market-detail.title-add')" name="1">
        <div v-for="item in metaDataList" :key="item.id" class="content-item">
          <span class="d-ib title">{{ getName(item.metaName) }}</span>
          <!-- <span class="value" v-if="item.metaName === 'Lot size' || item.metaName === 'Apartment size'">{{ item.metaValue | convertAmountDecimal('AREA') }} m2</span> -->
          <span class="value">{{ item.metaValue }}</span>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-collapse v-if="getFeatureListExist.length" class="collapse collapse-detail" v-model="activeFeatures">
      <el-collapse-item class="collapse-item" :title="$t('market-detail.title-feature')" name="1">
        <div v-for="item in getFeatureListExist" :key="item.id" class="content-features">
          <base-icon icon="icon-checked-clm" size="20" />
          <span class="value">{{ getNameFeature(item.featureName) }}</span>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
  import filter from 'lodash/filter'
  import { Component, Prop, Vue } from 'vue-property-decorator'

  import { namespace } from 'vuex-class'
  const bcMarketHome = namespace('bcMarketPrimaryHome')

  @Component
  export default class DetailAndFeatures extends Vue {
    @Prop({ required: true, type: Array, default: () => [] }) featureList!: Array<Record<string, any>>
    @Prop({ required: true, type: Array, default: () => [] }) metaDataList!: Array<Record<string, any>>

    @bcMarketHome.State('projectMeta') projectMeta!: Array<Record<string, any>>
    @bcMarketHome.State('projectMeta') productMeta!: Array<Record<string, any>>
    @bcMarketHome.State('featureMeta') featureMeta!: Array<Record<string, any>>

    activeDetail = ['1']
    activeFeatures = ['1']

    get getFeatureListExist(): Array<Record<string, any>> {
      const arr = filter(this.featureList, feature => feature.featureValue === 'YES')
      return arr
    }

    get isShowCompProduct(): boolean {
      return this.$route.params.type === 'product'
    }

    getName(name: string): any {
      const language = window.localStorage.getItem('bc-lang')!
      if (this.metaDataList.length) {
        if (this.isShowCompProduct) {
          const elm = filter(this.productMeta, meta => {
            return meta.value === name
          })[0]
          const parseElm = JSON.parse(elm.description)
          return parseElm[language]
        } else {
          const elm = filter(this.projectMeta, meta => {
            return meta.value === name
          })[0]
          const parseElm = JSON.parse(elm.description)
          return parseElm[language]
        }
      }
    }
    getNameFeature(name: string): any {
      const language = window.localStorage.getItem('bc-lang')!

      if (this.featureList.length) {
        const elm = filter(this.featureMeta, meta => {
          return meta.value === name
        })[0]
        const parseElm = JSON.parse(elm.description)
        return parseElm[language]
      }
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep.wrap-collapse {
    .collapse {
      margin-top: 32px;
      border-top: none;
      border-bottom: none;
      .collapse-item {
        padding-bottom: 24px;
        border-bottom: 1px solid #dbdbdb;
        .el-collapse-item__header {
          height: 32px;
          line-height: 32px;
          font-size: 24px;
          font-weight: 600;
          border-bottom: none;
          color: #0e0b23;
          // .el-collapse-item__arrow {
          //   transform: rotate(90deg);
          // }
          // .el-collapse-item__arrow.is-active {
          //   transform: rotate(270deg);
          // }
        }

        .el-collapse-item__wrap {
          margin-top: 24px;
          border-bottom: none;
          .el-collapse-item__content {
            padding-bottom: 0;
            display: flex;
            flex-wrap: wrap;
            .content-item {
              width: 33.333%;
              display: flex;
              align-items: center;
              margin-bottom: 8px;
              .title {
                width: 160px;
                margin-right: 80px;
                font-size: 14px;
                line-height: 24px;
                color: var(--bc-text-discript);
              }
              .value {
                font-size: 16px;
                line-height: 24px;
                font-weight: 600;
                color: var(--bc-text-market-primary);
              }
            }
            .content-features {
              width: 33.333%;
              display: flex;
              align-items: center;
              .value {
                padding-left: 8px;
                font-size: 16px;
                line-height: 24px;
                color: var(--bc-text-market-primary);
              }
            }
          }
        }
      }
    }
  }
</style>
