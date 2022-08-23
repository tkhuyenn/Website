<template>
  <div v-if="mediaList && mediaList.videos && mediaList.videos.length" :id="id" ref="video" class="detail-video">
    <el-collapse class="collapse collapse-detail" v-model="activeDetail">
      <el-collapse-item class="collapse-item" title="Video" name="1">
        <iframe
          v-for="item in mediaList.videos"
          :key="item.id"
          width="100%"
          height="424"
          :src="item.mediaUrl"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class DetailVideo extends Vue {
    @Prop({ required: true, type: Object, default: () => ({}) }) mediaList!: Record<string, any>
    @Prop({ required: false, type: Number, default: 0 }) id!: number
    activeDetail = ['1']
  }
</script>

<style lang="scss" scoped>
  ::v-deep.detail-video {
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
            max-height: 424px;
          }
        }
      }
    }
  }
</style>
