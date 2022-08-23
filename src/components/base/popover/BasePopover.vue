<template>
  <div class="">
    <el-popover :disabled="disabled" ref="popover" :placement="placement" :title="title" :width="width" :trigger="trigger" :popper-class="popperClass" :offset="30">
      <div slot="reference" class="flex align-center custom-text">
        <span class="title-popover" v-if="text" @click="handleClickRefText">{{ text }}</span>
        <slot v-else name="text" />
        <slot name="icon" v-if="useIcon">
          <base-icon class="icon-select" icon="select-down" size="12"></base-icon>
        </slot>
      </div>
      <slot />
    </el-popover>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import EventBus from '@/utils/eventBus'
  @Component({ components: {} })
  export default class BasePopover extends Vue {
    @Prop({ required: false, type: Boolean, default: true }) useIcon!: boolean
    @Prop({ required: false, type: Boolean, default: false }) disabled!: boolean
    @Prop({ required: false, type: String, default: '' }) title!: string
    @Prop({ required: false, type: Number, default: 200 }) width!: number
    @Prop({ required: false, type: String, default: '' }) text!: string
    @Prop({ required: false, type: String, default: 'hover' }) trigger!: string
    @Prop({ required: false, type: String, default: '' }) popperClass!: string
    @Prop({ required: false, type: String, default: 'bottom-end' }) placement!: number
    close(): void {
      if (this.$refs.popover) {
        //@ts-ignore
        this.$refs.popover.doClose()
      }
    }
    mounted() {
      EventBus.$on('close-all-popover', () => {
        this.close()
      })
    }

    handleClickRefText(): void {
      this.$emit('clickText')
    }
  }
</script>
<style lang="scss" scoped>
  .icon-select {
    margin-left: 4px;
    padding-bottom: 2px;
  }
  ::v-deep .custom-text {
    cursor: pointer;
    svg {
    }
    &:hover {
      span {
        color: white;
      }
      svg {
        opacity: 1;
        cursor: pointer;
      }
    }
  }
</style>
