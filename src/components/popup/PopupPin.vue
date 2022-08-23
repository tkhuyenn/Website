<template>
  <base-popup name="popup-base-pin" class="popup-verify" width="480px" :isShowFooter="false">
    <div slot="title">
      <span>{{ $t('popup.title.verification') }}</span>
    </div>
    <div class="content">
      <h3 class="text-2xl text-center text-semibold title-form">{{ getTittle }}</h3>
      <div class="be-flex verify-code">
        <base-icon :icon="getIcon" size="80" />
        <div class="ml-1 w-100 input-code">
          <el-form :model="form" :rules="rules" ref="form-verify">
            <el-form-item prop="code" :label="`${$t('verify.label')}`" class="no-require-label">
              <el-input type="text" v-model.trim="form.code" maxlength="6" :placeholder="`${$t('verify.placeholder')}`" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-button :loading="isLoading" :class="getDisableBtn ? 'btn--disabled' : null" class="btn w-100 is-none-border cursor btn-theme" @click="handleSubmit"
        >{{ $t('verify.submit') }}
      </el-button>
      <div v-if="$route.name !== 'verify-app'" class="text-base be-flex jc-space-center mt-24 mb-24 text-grey-130">
        {{ $t('verify.question') }} &nbsp;<span class="text-hyperlink text-semibold cursor" @click="handleResendCode"> {{ $t('verify.re-send') }} </span>
      </div>
    </div>
  </base-popup>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class PopupVerifyPin extends Vue {
    form: Record<string, any> = {
      code: ''
    }
    isLoading = false
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
      return 'verify-app'
    }

    get getTittle(): string | any {
      return this.$t('verify.title-pin')
    }

    handleResendCode(): void {
      console.log('a')
    }
    handleSubmit(): void {
      console.log('a')
    }
    handleOpen(): void {
      console.log('open')
    }
    handleClose(): void {
      console.log('close')
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
      }
    }
  }

</style>
