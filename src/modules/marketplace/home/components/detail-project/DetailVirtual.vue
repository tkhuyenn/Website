<template>
  <div v-if="mediaList && mediaList.virtual && mediaList.virtual.length" :id="id" class="detail-map">
    <el-collapse class="collapse collapse-detail" v-model="activeDetail">
      <el-collapse-item class="collapse-item" :title="$t('market-detail.title-virual')" name="1">
        <div v-for="item in mediaList.virtual" :key="item.id" class="virtual-item">
          <iframe :src="item.mediaUrl" width="100%" height="460" allowvr="" allowfullscreen="allowfullscreen" loading="lazy"></iframe>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class DetailVirtual extends Vue {
    @Prop({ required: true, type: Object, default: () => ({}) }) mediaList!: Record<string, any>
    @Prop({ required: false, type: Number, default: 0 }) id!: number
    activeDetail = ['1']
  }
</script>

<style lang="scss" scoped>
  ::v-deep.detail-map {
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
        }

        .el-collapse-item__wrap {
          margin-top: 24px;
          border-bottom: none;
          .el-collapse-item__content {
            .virtual-item {
              max-height: 460px;
            }
          }
        }
      }
    }
  }
</style>
