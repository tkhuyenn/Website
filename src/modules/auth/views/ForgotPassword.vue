<template>
  <div class="bc-login">
    <header-login />
    <div class="form">
      <el-form class="form-item" :model="form" :rules="rules" ref="form-signup" @submit.prevent.native="handleConfirm">
        <div class="text-3xl text-semibold text-center mb-1 title-form">{{ $t('forgot.title-form') }}</div>
        <div class="text-base be-flex jc-space-center">
          {{ $t('forgot.desciption') }}
        </div>
        <!-- <div class="text-base be-flex jc-space-center">
          <span>{{ $t('forgot.description1') }} </span>
          <span class="support-email-screen">{{ urlSystem['system.token.support_email'] }}</span>
        </div>
        <div class="text-base be-flex jc-space-center">
          <span class="support-email-responsive">{{ urlSystem['system.token.support_email'] }}</span>
        </div> -->

        <div class="label-box">
          <label for="">Email</label>
        </div>
        <el-form-item prop="email">
          <el-input :placeholder="$t('forgot.email')" v-model="form.email" />
        </el-form-item>
        <el-button :loading="isLoading" :class="getDisableBtn ? 'btn--disabled' : null" class="btn w-100 is-none-border cursor mb-24" @click="handleConfirm">
          {{ $t('forgot.submit') }}
        </el-button>
        <!-- <button :class="getDisableBtn ? 'btn--disabled' : null" type="button" class="btn is-none-border w-100 cursor mb-24" @click="handleConfirm">
          {{ $t('forgot.submit') }}
        </button> -->
        <div class="text-base be-flex jc-space-center" style="margin-bottom: 8px">
          {{ $t('login.question') }} &nbsp;<span @click="handleSignUp" class="text-hyperlink text-semibold cursor" style="color: #af6535"> {{ $t('login.sign-up') }} </span>
        </div>
        <div class="text-base be-flex jc-space-center">
          {{ $t('signup.have-account') }} &nbsp;<span @click="handleLoginForm" class="text-hyperlink text-semibold cursor" style="color: #af6535">{{ $t('signup.sign-in') }} </span>
        </div>
      </el-form>
      <!-- <verify-page v-else class="form-item" /> -->
    </div>
    <!-- <language @changeLanguage="handleChangeLanguage" /> -->
  </div>
</template>

<script lang="ts">
  import VueRecaptcha from 'vue-recaptcha'
  import HeaderLogin from '../components/HeaderLogin.vue'
  import Language from '../components/Language.vue'

  import VerifyPage from './Verify.vue'
  import getRepository from '@/services'
  import { AuthRepository } from '@/services/repositories/auth'
  import { VerifyRepository } from '@/services/repositories/verify'
  import { Component, Vue } from 'vue-property-decorator'

  const apiVerify: VerifyRepository = getRepository('verify')
  const apiAuth: AuthRepository = getRepository('auth')

  import { namespace } from 'vuex-class'

  const beBase = namespace('beBase')

  interface FormLogin {
    email: string
    password: string
  }

  @Component({ components: { VueRecaptcha, HeaderLogin, VerifyPage, Language } })
  export default class LoginPage extends Vue {
    @beBase.State('urlSystem') urlSystem!: Record<string, any>

    language = 'en'
    form: FormLogin = {
      email: '',
      password: ''
    }
    remember = false
    selectLanguage = ''
    isVerifyCaptcha = false
    isLoading = false
    optionLanguage: Array<Record<string, any>> = [
      {
        id: 1,
        lang: 'en'
      },
      {
        id: 2,
        lang: 'vi'
      }
    ]

    rules: Record<string, any> = {
      email: [
        {
          required: true,
          message: this.$t('login.wrong-email'),
          trigger: 'blur'
        },
        { type: 'email', message: this.$t('login.wrong-email-type'), trigger: 'blur' }
      ]
    }

    get getDisableBtn(): boolean {
      return !this.form.email
    }

    created(): void {
      this.language = window.localStorage.getItem('bc-lang')!
      this.selectLanguage = this.language
    }

    handleChangeLanguage(): void {
      //@ts-ignore
      this.$refs['form-signup']?.resetFields()
    }

    verifyCaptcha(): void {
      this.isVerifyCaptcha = true
    }
    handleSignUp(): void {
      this.$router.push({ name: 'sign-up' })
    }
    handleLoginForm(): void {
      this.$router.push({ name: 'login' })
    }
    handleConfirm(): void {
      if (this.getDisableBtn) return
      //@ts-ignore
      this.$refs['form-signup']?.validate(async valid => {
        if (valid) {
          try {
            let message: any = ''
            this.isLoading = true
            const email = this.form.email
            await apiAuth.resendCode({ email, type: 'EMAIL', reason: 'FORGOT_PASSWORD' })
            // await apiAuth.forgetPassword({ email })
            this.$router.push({ name: 'verify-email', query: { type: 'EMAIL', email, reason: 'FORGET_PASSWORD' } })
            this.isLoading = false
            message = this.$t('notify.send-code')
            this.$message.success({ message, duration: 5000 })
          } catch (error) {
            // let message: any = ''
            // message = this.$t('notify.send-code-fail')
            // this.$message.error({ message, duration: 5000 })
            this.isLoading = false
          }
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  .bc-login {
    background-color: #f6f8fc;
    min-height: 100vh;
    @media screen and (max-height: 700px) {
      padding-bottom: 20px;
      height: auto;
    }
    .textButton {
      font-size: 16px;
      padding-top: 1px;
    }
    .form {
      max-width: 512px;
      margin: 40px auto 0;
      box-shadow: 0px 0.6px 1.8px rgba(0, 0, 0, 0.1), 0px 3.2px 7.2px rgba(0, 0, 0, 0.13);
      border-radius: 8px;
      background-color: var(--bc-bg-white);
      @media (max-width: 600px) {
        margin-right: 20px;
        margin-left: 20px;
      }
      .title-form {
        color: #0a0b0d;
      }

      .form-item {
        padding: 30px 24px;
      }

      .support-email-screen {
        display: none;
      }

      .btn {
        padding: 12px 0 !important;
        font-size: 16px !important;
        line-height: 24px !important;
        margin-bottom: 32px !important;
        background: #af6535;
      }
      .btn:hover {
        background: #af6535 !important;
      }
    }
    .label-box {
      margin-top: 24px;
      margin-bottom: 8px;
      color: var(--bc-table-text-color);
      font-weight: 400;
      font-size: 14px;
    }
  }
  @media screen and (max-width: 768px) {
    .bc-login {
      .form {
        width: 90%;
        margin: 20px auto 0;
        box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);
        border-radius: 4px;
        max-width: 512px;

        .form-item {
          padding: 20px 20px;

          .title-form {
            font-size: 20px;
            color: #0a0b0d;
            line-height: normal;
            margin-bottom: 24px !important;
            font-weight: 600;
          }
        }

        .label-box {
          margin-top: 24px;
          margin-bottom: 8px;
          color: #0a0b0d;
          font-weight: 400;
          font-size: 14px;
        }
        .text-base {
          font-size: 14px;
          color: #5b616e;
          text-align: center;
          display: block;
          line-height: 20px;
        }

        .support-email-screen {
          display: inline-block;
          color: black;
        }

        .support-email-responsive {
          display: none;
        }
      }
    }
  }
</style>
