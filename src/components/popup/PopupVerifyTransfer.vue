<template>
  <base-popup name="popup-base-verify-transfer" class="popup-verify" width="480px" :open="handleOpen" :close="handleClose" :isShowFooter="false">
    <div slot="title">
      <span>{{ $t('popup.title.verification') }}</span>
    </div>
    <div class="content">
      <!-- <h3 class="text-2xl text-center text-semibold title-form">{{ getTittle }}</h3> -->
      <h3 v-if="type && type == 'APP'" class="text-2xl text-center text-semibold title-form">{{ $t('verified.titleContent') }}</h3>
      <h3 v-if="type && type == 'SMS'" class="text-2xl text-center text-semibold title-form">{{ $t('verified.titleContent2') }}</h3>
      <h3 v-if="type && type == 'EMAIL'" class="text-2xl text-center text-semibold title-form">{{ $t('verified.titleContent3') }}</h3>
      <div class="be-flex verify-code">
        <!-- <base-icon :icon="getIcon" size="80" /> -->
        <base-icon v-if="type && type == 'APP'" icon="verify-app" size="80" class="hide-mobile"></base-icon>
        <base-icon v-if="type && type == 'SMS'" icon="verify-phone" size="80" class="hide-mobile"></base-icon>
        <base-icon v-if="type && type == 'EMAIL'" icon="verify-email" size="80" class="hide-mobile"></base-icon>
        <div class="ml-1 w-100 input-code">
          <el-form :model="form" :rules="rules" ref="form-verify" @submit.prevent.native="handleSubmit">
            <el-form-item prop="code" :label="`${$t('verify.label')}`" class="no-require-label">
              <el-input type="text" v-model.trim="form.code" maxlength="6" :placeholder="`${$t('verify.placeholder')}`" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-button :loading="isLoading" :class="getDisableBtn ? 'btn--disabled' : null" class="btn w-100 is-none-border cursor btn-submit btn-theme" @click="handleSubmit"
        >{{ $t('verify.submit') }}
      </el-button>
      <div v-if="type != 'APP'" class="text-base be-flex jc-space-center mt-24 mb-24 text-grey-130 text-discript">
        {{ $t('verify.question') }} &nbsp;<span class="text-hyperlink text-semibold cursor" @click="handleResendCode"> {{ $t('verify.re-send') }} </span>
      </div>
    </div>
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins, Prop } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'

  import getRepository from '@/services'
  import WalletRepository from '@/services/repositories/wallet'
  import { SettingRepository } from '@/services/repositories/setting'
  import debounce from 'lodash/debounce'
  const api: SettingRepository = getRepository('setting')
  const apiLyn: WalletRepository = getRepository('wallet')
  @Component
  export default class PopupVerifyTransfer extends Mixins(PopupMixin) {
    @Prop() type!: any
    @Prop() data!: any
    @Prop({ required: true, type: String, default: 'TRANSFER' }) typeAction!: string
    @Prop() currency!: any
    @Prop() typeActive!: any
    form: Record<string, any> = {
      code: ''
    }
    isLoading = false
    success: any = 0
    rules: Record<string, any> = {
      code: [
        {
          required: true,
          message: this.$t('verify.wrong-code'),
          trigger: 'blur'
        }
      ]
    }
    get getDisableBtn(): boolean {
      return this.form.code.length !== 6
    }

    get getIcon(): string {
      const name = this.$route.name
      if (name === 'verify-phone') {
        return 'verify-phone'
      }
      if (name === 'verify-email') {
        return 'verify-email'
      }
      return 'verify-app'
    }

    // get getTittle(): string | any {
    //   const name = this.$route.name
    //   if (name === 'verify-phone') {
    //     return this.$t('verify.title-phone')
    //   }
    //   if (name === 'verify-email') {
    //     return this.$t('verify.title-email')
    //   }
    //   return this.$t('verify.title-app')
    // }
    // debounce chan doble click
    debounceFilter = debounce((nameAction: any) => {
      console.log('nameAction', nameAction)

      if (nameAction == 'handleResendCode') {
        this.resendCode()
      }
      if (nameAction == 'handleSubmit') {
        this.submit()
      }
    }, 400)
    handleResendCode(): void {
      this.debounceFilter('handleResendCode')
    }
    async resendCode(): Promise<void> {
      if (this.typeAction == 'WITHDRAW') {
        apiLyn.sendCodeWithdraw().then(() => {
          let message: any = this.$t('verified.resendCodeMess')
          this.$message.success(message)
        })
        // .catch(() => {
        //   let message: any = this.$t('notify.user-blocked-resend-code')
        //   this.$message.error(message)
        // })
      } else {
        apiLyn.verificatySendcode().then(() => {
          let message: any = this.$t('verified.resendCodeMess')
          this.$message.success(message)
        })
        // .catch(() => {
        //   let message: any = this.$t('notify.user-blocked-resend-code')
        //   this.$message.error(message)
        // })
      }
    }
    handleReset(): void {
      this.form = {
        code: ''
      }
      this.success = 0
    }
    handleClose(): void {
      if ((this.typeAction == 'TRANSFER' && this.success == 0) || (this.typeAction == 'WITHDRAW' && this.success == 0)) {
        this.$emit('callApi')
      }
      this.handleReset()
    }
    handleOpen(): void {
      console.log('type', this.typeAction)
    }
    handleSubmit(): void {
      this.debounceFilter('handleSubmit')
    }
    async submit(): Promise<void> {
      this.isLoading = true
      if (this.typeAction && this.typeAction === 'TRANSFER') {
        await apiLyn
          .verifyTransactionTransfer(this.typeAction, this.typeActive, { ...this.data, verificationCode: this.form.code })
          .then(() => {
            this.success = 1
            this.isLoading = false
            let message: any = this.$t('wallet.popup.successTransfer')
            this.$emit('close')
            this.$message.success(message)
            this.setOpenPopup({
              popupName: 'popup-base-verify-transfer',
              isOpen: false
            })
          })
          .catch(error => {
            this.isLoading = false
            if (error.response.data.status != 'INVALID_VERIFICATION' && error.response.data.status != 'EXPIRED_VERIFICATION') {
              this.setOpenPopup({
                popupName: 'popup-base-verify-transfer',
                isOpen: false
              })
            }
          })
      } else if (this.typeAction && this.typeAction === 'WITHDRAW') {
        await apiLyn
          .verifyTransaction(this.typeAction, this.typeActive, { ...this.data, verificationCode: this.form.code })
          .then(() => {
            this.success = 1
            this.isLoading = false
            let message: any = this.$t('withdraw.successWithdraw')
            this.$emit('close')
            this.$message.success(message)
            this.setOpenPopup({
              popupName: 'popup-base-verify-transfer',
              isOpen: false
            })
          })
          .catch(error => {
            this.isLoading = false
            if (error.response.data.status != 'INVALID_VERIFICATION' && error.response.data.status != 'EXPIRED_VERIFICATION') {
              this.setOpenPopup({
                popupName: 'popup-base-verify-transfer',
                isOpen: false
              })
            }
          })
      }
    }
  }
</script>

<style scoped lang="scss">
  .btn {
    padding: 12px 0 !important;
    font-size: 16px !important;
    line-height: 24px !important;
  }
  .title-form {
    color: #201f1e;
    margin-bottom: 3px;
    word-break: break-word;
  }
  .input-code {
    margin-top: 17px;
  }
  .btn-submit {
    margin-bottom: 24px;
  }
  .text-discript {
    margin-top: 0px !important;
  }
  .btn-theme {
    background: var(--bc-tab-active);
  }
  .btn-theme:hover {
    border: none;
    color: var(--bc-color-white);
    background: var(--bc-theme-primary-gradient-hover) !important;
  }
  @media screen and (max-width: 768px) {
    ::v-deep.popup-verify {
      .el-dialog {
        width: 335px !important;

        &__header {
          .title {
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
          }
        }
        &__body{
          .popup-content{
            .content{
              .title-form{
                font-weight: 600;
                font-size: 20px;
                line-height: 24px;
              }
              .verify-code{
                .hide-mobile{
                  display: none;
                }
                .input-code{
                  margin-left: 0 !important;
                  .el-form{
                    .el-form-item__label{
                      font-weight: 600;
                      font-size: 16px;
                      line-height: 150%;
                      color: #5B616E;
                    }
                  }
                }
              }
              .text-discript{
                display: flex;
                flex-direction: column;
                align-items: center;
              }
            }
          }
        }
      }
    }
  }
</style>
