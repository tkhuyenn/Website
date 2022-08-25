<template>
  <div class="content-detail">abc</div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const beBase = namespace('beBase')
  const beAuth = namespace('beAuth')
  @Component({})
  export default class ProductDetail extends Vue {}
</script>

<style lang="scss" scoped>
  ::v-deep.content-detail {
    .click {
      cursor: pointer;
    }
    padding-top: 16px;
    .table {
      margin-top: 40px;
      .el-table__header-wrapper {
        .el-table__header {
          .date {
            padding-right: 33px;
          }
        }
      }
      .el-table__body-wrapper {
        .el-table__row {
          cursor: initial;
          td {
            .cell {
              color: var(--bc-text-market-primary-nft);
              .content {
                color: var(--bc-text-market-primary-nft);
              }
            }
            .avatar {
              position: relative;
              margin-right: 8px;
              height: 36px;
              width: 36px;
              border-radius: 50%;
              img {
                width: 36px;
                height: 36px;
                border-radius: 100% !important;
                display: block;
                object-fit: cover;
              }
              .new-circle {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #129961;
                border: 1px solid #ffffff;
                position: absolute;
                right: 2px;
                top: 0px;
              }
              .item-verifed {
                position: absolute;
                bottom: 0;
                right: 0;
                height: 16px;
              }
              .wrap-media {
                .empty {
                  border-radius: 50% !important;
                }
              }
            }
            .text-cap {
              text-transform: capitalize;
            }
          }
        }
      }
      .base-pagination {
        padding: 20px 0 40px;
        .info {
          color: var(--bc-text-discript);
        }
      }
    }
    .isPc {
      display: block;
    }
    .isMobile {
      display: none;
    }
    @media (max-width: 1200px) {
      .isPc {
        display: none;
      }
      .isMobile {
        display: block;
      }
      .avatar {
        position: relative;
        margin-right: 12px;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        img {
          width: 40px;
          height: 40px;
          border-radius: 100% !important;
          display: block;
          object-fit: cover;
        }
        .new-circle {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #129961;
          border: 1px solid #ffffff;
          position: absolute;
          right: 2px;
          top: 0px;
        }
        .item-verifed {
          position: absolute;
          bottom: 13px;
          right: 0;
          height: 16px;
        }
        .wrap-media {
          .empty {
            border-radius: 50% !important;
          }
        }
      }
      .item-acti {
        margin-top: 12px;
      }
      .content-detail-acti {
        margin-top: 16px;
      }
      .detail-nft .tab {
        max-width: 630px;
        margin: 0 auto;
      }
      .btn-more {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 8px;
        margin-bottom: 40px;
        max-width: 630px;
        margin: 0 auto;
        .el-button {
          width: 89% !important;
          height: 48px;
        }
      }
    }
  }
</style>
