<template>
  <div class="detail-trans">
    <div class="be-flex tabs">
      <div class="body-base tab-item" :class="tabActive === 0 ? 'tab-active' : null" @click="tabActive = 0">
        <span class="">{{ $t('market-detail.trans') }} (20)</span>
      </div>
      <div class="body-base tab-item" :class="tabActive === 1 ? 'tab-active' : null" @click="tabActive = 1">
        <span class="">{{ $t('market-detail.investor') }} (12)</span>
      </div>
    </div>
    <div class="content">
      <div v-for="item in 10" :key="item" class="be-flex jc-space-between tran-item">
        <div class="be-flex-column left">
          <span class="body-base">0ert56...112wo9</span>
          <span class="body-small text-mediunm">10/01/2022</span>
        </div>
        <div class="be-flex-column right">
          <span class="body-base text-semibold">120,000,000 LYNK</span>
          <span class="body-small text-mediunm">~$120,000,000</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class DetailTrans extends Vue {
    tabActive = 0
  }
</script>

<style lang="scss" scoped>
  .detail-trans {
    // padding: 24px;
    box-shadow: 0px 1.2px 3.6px rgba(0, 0, 0, 0.1), 0px 6.4px 14.4px rgba(0, 0, 0, 0.13);
    border-radius: 8px;
    margin-top: 48px;
    .tabs {
      border-bottom: 1px solid #dbdbdb;
      .tab-item {
        width: 50%;
        text-align: center;
        color: var(--bc-text-discript);
        padding: 16px 0;
        cursor: pointer;
      }
      .tab-active {
        font-weight: 600;
        background: var(--bc-menu-active);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        //border-bottom: 2px solid var(--bc-tab-active);
        border-bottom: 2px solid #0151fc;
      }
    }
    .content {
      max-height: 608px;
      overflow-y: auto;
      padding: 24px;
      .tran-item {
        padding: 16px 0;
        border-bottom: 1px solid #dbdbdb;

        .left,
        .right {
          span:last-child {
            color: var(--bc-text-discript);
          }
        }
      }
      .tran-item:last-child {
        border: none;
        padding-bottom: 0;
      }
      .tran-item:first-child {
        padding-top: 0;
      }
    }
  }
</style>
