<template>
  <div class="wrap-media" @click="handleClickMedia">
    <div v-if="url" class="content-media">
      <img v-if="isShow" :src="url" alt="" class="d-block" :style="{ 'border-radius': radius + 'px' }" />
      <video ref="video" v-else :src="url" playsinline :autoplay="autoplay" loop muted></video>
    </div>
    <div v-else class="empty" :style="{ 'border-radius': radius + 'px' }">
      <base-icon icon="icon-no-image" :size="size + ''" class="d-iflex" />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class BcMedia extends Vue {
    @Prop({ required: false, type: String, default: '' }) url!: string
    @Prop({ required: false, type: String, default: 'IMAGE' }) mediaType!: string
    @Prop({ required: false, type: Number, default: 24 }) size!: number
    @Prop({ required: false, type: Number, default: 0 }) radius!: number
    @Prop({ required: false, type: Boolean, default: true }) autoplay!: boolean
    @Prop({ required: false, type: Boolean, default: true }) isShow!: boolean

    handleClickMedia(): void {
      // if (this.isShow) {
      //   this.$emit('click')
      // }
      this.$emit('click')
    }

    handleActionVideo(status: string): void {
      const video = this.$refs['video'] as HTMLMediaElement
      if (video) {
        if (status === 'play') {
          video.play()
        } else {
          video.pause()
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .wrap-media {
    width: 100%;
    height: 100%;
    .content-media {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .empty {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #dbdbdb;
    }
  }
</style>
