<template>
  <el-dialog
    :visible.sync="isOpen"
    :width="width"
    :append-to-body="appendBody"
    :close-on-press-escape="closePressEscape"
    :close-on-click-modal="closeClickModal"
    :top="top"
    @open="handleOpen"
    @close="handleClose"
    class="base-popup"
  >
    <div class="text-l text-grey-190 text-semibold title" slot="title">
      <slot name="title" />
    </div>
    <div class="popup-content be-scroll-custom">
      <slot />
    </div>
    <div v-if="isShowFooter" slot="footer" class="popup-footer">
      <slot name="footer" />
    </div>
  </el-dialog>
</template>
<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import findIndex from 'lodash/findIndex'

  const base = namespace('beBase')

  @Component
  export default class BasePopup extends Vue {
    @Prop({ required: true, type: String }) name!: string
    @Prop({ required: false, type: String, default: '600px' }) width!: string
    @Prop({ required: false, type: String, default: '5vh' }) top!: string
    @Prop({ required: false, type: Boolean, default: true }) isShowFooter!: boolean
    @Prop({ required: false, type: Boolean, default: true }) appendBody!: boolean
    @Prop({ required: false, type: Boolean, default: false }) closeClickModal!: boolean
    @Prop({ required: false, type: Boolean, default: true }) closePressEscape!: boolean
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
        console.log('submit')
      }
    })
    submit!: () => Promise<any>

    @base.State('popup') popup!: string[]
    @base.Action('setOpenPopup') setOpenPopup!: (data: { popupName: string; isOpen: boolean }) => void

    isLoading = false

    get isOpen(): boolean {
      return (
        findIndex(this.popup, value => {
          return value === this.name
        }) !== -1
      )
    }

    set isOpen(value: boolean) {
      this.setOpenPopup({
        isOpen: value,
        popupName: this.name
      })
    }

    handleOpen(): void {
      this.isLoading = false
      this.open()
    }

    handleClose(): void {
      this.close()
    }
  }
</script>
<style lang="scss" scoped>
  .popup-action {
    text-align: center;
  }
  .popup-content {
    max-height: 75vh;
    // min-height: 75px;
    overflow: auto;
    padding: 24px;
    padding-bottom: 0;
    @media screen and (max-height: 900px) {
      max-height: 70vh;
      // min-height: 75px;
    }
  }
  ::v-deep.base-popup {
    .el-dialog {
      &__header {
        .title {
          color: #0a0b0d;
        }
      }
    }
  }
</style>
