<template>
  <div :id="id" class="detail-attach">
    <el-collapse class="collapse collapse-detail" v-model="activeDetail">
      <el-collapse-item class="collapse-item" :title="$t('market-detail.title-attachment')" name="1">
        <div class="be-flex content">
          <div v-for="item in attachmentList" :key="item.id" class="be-flex align-center project-attach">
            <icon-file :type="item.fileType" />
            <div class="info">
              <div class="header-6 text-semibold title text-overflow-1">{{ item.attachmentName }}</div>
              <div class="be-flex align-center">
                <span class="body-small text-medium data">{{ item.fileSize | bytesToSize }}</span>
                <span class="dot"></span>
                <div class="be-flex align-center download" @click="handleDownload(item.fileUrl)">
                  <base-icon icon="icon-download" size="24" class="lh-default" />
                  <span class="body-small text-medium">{{ $t('market-detail.download') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import IconFile from './IconFile.vue'
  @Component({ components: { IconFile } })
  export default class DetailAttachment extends Vue {
    @Prop({ required: true, type: Array, default: () => [] }) attachmentList!: Record<string, any>[]
    @Prop({ required: false, type: Number, default: 0 }) id!: number
    activeDetail: string[] = ['1']

    handleDownload(url: string): void {
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep.detail-attach {
    .collapse {
      margin-top: 32px;
      border-top: none;
      border-bottom: none;
      .collapse-item {
        padding-bottom: 11px;
        border-bottom: 1px solid #dbdbdb;
        .el-collapse-item__header {
          height: 32px;
          line-height: 32px;
          font-size: 24px;
          font-weight: 600;
          border-bottom: none;
        }

        .el-collapse-item__wrap {
          margin-top: 24px;
          border-bottom: none;
          .el-collapse-item__content {
            .content {
              flex-wrap: wrap;
              .project-attach {
                width: 33.333%;
                margin-bottom: 10px;
                .info {
                  margin-left: 16px;
                  .title {
                    margin-bottom: 4px;
                  }
                  .data {
                    color: var(--bc-text-discript);
                  }
                  .dot {
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background: #c4c4c4;
                    margin: 0 8px;
                  }
                  .download {
                    cursor: pointer;
                    span {
                      color: var(--bc-text-hyperlink);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
