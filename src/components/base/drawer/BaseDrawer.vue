<template>
  <el-drawer :visible.sync="isOpen" :direction="direction" :size="size" @open="handleOpen" @close="handleClose" class="base-drawer">
    <div class="title" slot="title">
      <span class="cursor arrow" @click="handleClickArrow"><i class="el-dialog__close el-icon el-icon-close"></i></span>
      <span class="nft-header5 text-semibold">{{ title }}</span>
      <span class="cursor nft-body-small" @click="handleReset">Reset</span>
    </div>
    <div class="content">
      <slot />
    </div>
    <div class="footer" slot="footer">
      <slot name="footer" />
    </div>
  </el-drawer>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import findIndex from 'lodash/findIndex'
  const base = namespace('beBase')
  @Component
  export default class BaseDrawer extends Vue {
    @Prop({ required: true, type: String }) name!: string
    @Prop({ required: false, type: String, default: '' }) title!: string
    @Prop({ required: false, type: String, default: 'ltr' }) direction!: string
    @Prop({ required: false, type: String, default: '30%' }) size!: string

    @Prop({
      required: false,
      type: Function,
      default: () => {
        console.log('open')
      }
    })
    open!: () => void
    @Prop({
      required: false,
      type: Function,
      default: () => {
        console.log('close')
      }
    })
    close!: () => void

    @Prop({
      required: false,
      type: Function,
      default: () => {
        console.log('reset')
      }
    })
    reset!: () => void

    @base.State('drawer') drawer!: string[]
    @base.Action('setOpenDrawer') setOpenDrawer!: (data: { drawerName: string; isOpen: boolean }) => void

    get isOpen(): boolean {
      return (
        findIndex(this.drawer, value => {
          return value === this.name
        }) !== -1
      )
    }

    set isOpen(value: boolean) {
      this.setOpenDrawer({
        isOpen: value,
        drawerName: this.name
      })
    }

    handleOpen(): void {
      this.open()
    }

    handleClose(): void {
      this.close()
    }

    handleReset(): void {
      this.reset()
    }

    handleClickArrow(): void {
      this.setOpenDrawer({
        isOpen: false,
        drawerName: this.name
      })
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep.base-drawer {
    color: var(--bc-text-market-primary-nft);
    .el-drawer__header {
      color: var(--bc-text-market-primary-nft);
      margin-bottom: 26px;
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .arrow {
          font-size: 19px;
        }
      }

      .el-drawer__close-btn {
        display: none;
      }
    }
    .el-drawer__body {
      color: var(--bc-text-market-primary-nft);
      padding: 0 20px;
    }
  }
</style>
