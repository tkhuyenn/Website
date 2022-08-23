<template>
  <div :id="id" class="detail-block">
    <h3 class="header-5 mb-24 text-semibold text-title">
      {{ $t('market-detail.title-block') }}
    </h3>
    <div class="be-flex wrap-block">
      <div v-for="item in blockList" :key="item.id" class="block-item">
        <img :src="item.avatar" :alt="item.avatar" />
        <div class="content">
          <h4 class="body-large text-medium">{{ item.blockName }}</h4>
          <div class="be-flex item" v-for="blockItem in item.blockMetaData" :key="blockItem.id">
            <span class="title body-small">{{ getName(blockItem.metaName) }}</span>
            <span class="value">{{ blockItem.metaValue }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import filter from 'lodash/filter'
  import { namespace } from 'vuex-class'
  const bcMarketHome = namespace('bcMarketPrimaryHome')
  @Component
  export default class DetailBlock extends Vue {
    @Prop({ required: true, type: Number, default: 0 }) id!: number
    @Prop({ required: true, type: Array, default: () => [] }) blockList!: Array<Record<string, any>>
    @bcMarketHome.State('blockMeta') blockMeta!: Array<Record<string, any>>

    getName(name: string): any {
      const language = window.localStorage.getItem('bc-lang')!
      if (this.blockList.length) {
        const elm = filter(this.blockMeta, meta => {
          return meta.value === name
        })[0]
        const parseElm = JSON.parse(elm.description)
        return parseElm[language]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .detail-block {
    margin-top: 32px;
    padding-bottom: 32px;
    border-bottom: 1px solid #dbdbdb;
    .wrap-block {
      flex-wrap: wrap;
      .block-item {
        box-shadow: 0px 1.2px 3.6px rgba(0, 0, 0, 0.1), 0px 6.4px 14.4px rgba(0, 0, 0, 0.13);
        border-radius: 8px;
        width: calc(1 / 3 * 100% - (1 - 1 / 3) * 24px);
        margin: 24px 24px 0 0;

        img {
          width: 100%;
          height: auto;
        }
        .content {
          padding: 24px;
          h4 {
            margin-bottom: 16px;
          }
          .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
            .title {
              color: var(--bc-text-discript);
            }
            .value {
              font-weight: 600;
            }
          }
          .item:last-child {
            margin-bottom: 0;
          }
        }
      }
      .block-item:nth-child(-n + 3) {
        margin-top: 0;
      }
      .block-item:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
</style>
