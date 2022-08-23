<template>
  <div v-if="project.id" :id="id" class="detail-map">
    <el-collapse class="collapse collapse-detail" v-model="activeDetail">
      <el-collapse-item class="collapse-item" :title="$t('market-detail.title-map')" name="1">
        <iframe :src="project.googleMapUrl" width="100%" height="460" style="border: 0" allowfullscreen=""></iframe>
        <!-- <iframe src="https://my.matterport.com/show/?m=JGPnGQ6hosj&amp;play=1" width="100%" height="auto" allowvr="" allowfullscreen="allowfullscreen"></iframe> -->
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class DetailMap extends Vue {
    @Prop({ required: true, type: Object, default: () => ({}) }) project!: Record<string, any>
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
            max-height: 460px;
          }
        }
      }
    }
  }
</style>
