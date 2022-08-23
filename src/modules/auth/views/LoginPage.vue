<template>
  <div class="bc-login">
    <header-login />
    <div class="form">
      <el-form class="form-item" v-if="$route.name === 'login'" :model="form" :rules="rules" ref="form-login">
        <div class="text-3xl text-semibold text-center mb-2 title-form">{{ $t('login.title-form') }}</div>
        <el-form-item prop="email">
          <el-input placeholder="Email" type="email" v-model="form.email" />
        </el-form-item>
        <el-form-item prop="password" class="input-password">
          <el-input class="input-password" :type="showPass == true ? 'text' : 'password'" :placeholder="$t('login.placeholder.password')" v-model="form.password" />
          <span class="icon-show-password" @click="showPass = !showPass">
            <base-icon :icon="showPass == true ? 'icon-eye-off' : 'icon-eye'" size="22" />
          </span>
        </el-form-item>
        <div class="be-flex jc-space-between w-100 mt-2">
          <el-checkbox v-model="remember"
            ><span class="text-base" style="color: #201f1e; font-weight: 400; margin-left: -2px">{{ $t('login.remember') }}</span></el-checkbox
          >
          <span @click="handleForgotPass" class="text-base text-hyperlink cursor" style="color: #af6535">{{ $t('login.forgot') }}</span>
        </div>
        <!-- <div class="captcha be-flex jc-space-center mt-2" v-if="urlSystem && urlSystem['api.auto.test'] !== '1'">
          <vue-recaptcha ref="recaptcha" :loadRecaptchaScript="true" :language="language" :sitekey="siteKey" @verify="verifyCaptcha" @expired="expiredCaptcha"></vue-recaptcha>
        </div> -->
        <el-button :loading="isLoading" :class="getDisableBtn ? 'btn--disabled' : null" class="btn w-100 is-none-border cursor btn-sign-in" @click="handleLogin"
          >{{ $t('login.title-form') }}
        </el-button>
        <!-- <button :class="getDisableBtn ? 'btn--disabled' : null" type="button" class="btn is-none-border w-100 cursor" @click="handleLogin">{{ $t('login.title-form') }}</button> -->
        <div class="text-base be-flex jc-space-center" style="color: #5b616e">
          {{ $t('login.question') }} &nbsp;<span @click="handleSignUp" class="text-hyperlink text-semibold cursor" style="color: #af6535"> {{ $t('login.sign-up') }} </span>
        </div>
      </el-form>
      <verify-page v-else class="form-item" ref="verify" />
    </div>
    <!-- <language :isReload="$route.name === 'login' ? true : false" @changeLanguage="handleChangeLanguage" /> -->
  </div>
</template>

<script lang="ts">
  import VueRecaptcha from 'vue-recaptcha'
  import HeaderLogin from '../components/HeaderLogin.vue'
  import Language from '../components/Language.vue'
  import VerifyPage from './Verify.vue'
  import getRepository from '@/services'
  import { AuthRepository } from '@/services/repositories/auth'
  import { Component, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const bcAuth = namespace('beAuth')
  const beBase = namespace('beBase')
  const bcMarketHome = namespace('bcMarketPrimaryHome')
  const apiAuth: AuthRepository = getRepository('auth')

  interface FormLogin {
    email: string
    password: string
  }

  @Component({ components: { VueRecaptcha, HeaderLogin, VerifyPage, Language } })
  export default class LoginPage extends Vue {
    @bcAuth.Action('login') login!: (data: Record<string, any>) => Promise<void>
    @beBase.State('siteKey') siteKey!: string
    @beBase.State('urlSystem') urlSystem!: Record<string, any>
    @bcMarketHome.State('backToPage') backToPage!: Record<string, any>
    showPass = false
    language = 'en'
    // siteKey = '6LcbbKAcAAAAAGS9BixBvH4okIBVNsY7lywPDleX'
    form: FormLogin = {
      email: '',
      password: ''
    }
    remember = false
    isVerifyCaptcha = false
    captcha = ''
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
      ],
      password: [
        {
          required: true,
          message: this.$t('login.wrong-password'),
          trigger: 'blur'
        }
      ]
    }
    created(): void {
      this.language = window.localStorage.getItem('bc-lang')!
    }

    get getDisableBtn(): boolean {
      if (this.urlSystem && this.urlSystem['api.auto.test'] !== '1') {
        return !(this.form.email && this.form.password && this.isVerifyCaptcha)
      }
      return !(this.form.email && this.form.password)
    }

    verifyCaptcha(captcha: string): void {
      this.captcha = captcha
      this.isVerifyCaptcha = true
    }
    expiredCaptcha(): void {
      this.isVerifyCaptcha = false
    }

    handleSignUp(): void {
      this.$router.push({ name: 'sign-up' })
    }
    handleForgotPass(): void {
      this.$router.push({ name: 'forgot-password' })
    }
    handleChangeLanguage(): void {
      //@ts-ignore
      this.$refs['verify']?.clearValidate()
    }

    /**
     * * Luồng login: validate => verify => home
     */

    handleLogin(): void {
      if (this.getDisableBtn) {
        return
      }
      this.$router.push({ name: 'home' })
      //@ts-ignore
      // this.$refs['form-login']?.validate(async valid => {
      //   if (valid) {
      //     try {
      //       let message: any = ''
      //       this.isLoading = true
      //       //get 2FA
      //       // const res = await apiAuth.get2FA({ email: this.form.email }, this.captcha)
      //       // const type = res
      //       const encodePass = this.$options.filters?.encryptPassword(this.form.password)

      //       const res = await apiAuth.validateUser({ ...this.form, password: encodePass }, this.captcha)
      //       const type = res
      //       const nameRoute = type.type === 'EMAIL' ? 'verify-email' : type.type === 'SMS' ? 'verify-phone' : 'verify-app'

      //       if (!res.emailVerified && !res.phoneVerified) {
      //         try {
      //           // await apiAuth.resendCode({ email: this.form.email })
      //           this.$router.push({ name: 'verify-email', query: { type: 'EMAIL', email: this.form.email, reason: 'SIGN_UP' } })
      //           message = this.$t('notify.send-code')
      //           this.$message.success({ message, duration: 5000 })
      //           return
      //         } catch (error) {
      //           console.log(error)
      //           // message = this.$t('notify.send-code-fail')
      //           // this.$message.error({ message, duration: 5000 })
      //         }
      //       }

      //       if (res.emailVerified && !res.phoneVerified) {
      //         if (res.skipVerifyPhone) {
      //           if (type.type === 'NONE') {
      //             this.login({ ...this.form, password: encodePass }).then(() => {
      //               // case click any button from  marketplace , but login yet
      //               if (this.$route.query.isBack === '1') {
      //                 const name = this.$route.query.name as string
      //                 const type = this.$route.query.type as string
      //                 const id = this.$route.query.id as string
      //                 this.$router.push({ name, params: { type, id } })
      //               } else if (this.$route.query.isBack === 'nft') {
      //                 const name = this.$route.query.name as string
      //                 const id = this.$route.query.id as string
      //                 this.$router.push({ name, params: { id } })
      //               } else {
      //                 this.$router.push({ name: 'Wallet' })
      //               }

      //               message = this.$t('notify.login-success')
      //               this.$message.success({ message, duration: 5000 })
      //             })
      //           } else {
      //             if (this.$route.query.isBack === 'nft') {
      //               this.$router.push({
      //                 name: nameRoute,
      //                 query: {
      //                   email: this.form.email,
      //                   pass: encodePass,
      //                   reason: 'REQUEST_LOGIN',
      //                   isBack: 'nft',
      //                   id: this.$route.query.id,
      //                   name: this.$route.query.name
      //                 }
      //               })
      //             } else {
      //               this.$router.push({ name: nameRoute, query: { type: type.type, email: this.form.email, pass: encodePass, reason: 'REQUEST_LOGIN' } })
      //             }
      //           }
      //         } else {
      //           this.$router.push({ name: 'verify-phone-number', query: { email: this.form.email } })
      //         }
      //         return
      //       }

      //       //send code
      //       if (res.emailVerified && res.phoneVerified && (type.type === 'EMAIL' || type.type === 'SMS')) {
      //         try {
      //           // case click any button from  marketplace , but login yet
      //           if (this.$route.query.isBack === '1') {
      //             this.$router.push({
      //               name: nameRoute,
      //               query: {
      //                 type: type.type,
      //                 email: this.form.email,
      //                 pass: encodePass,
      //                 reason: 'REQUEST_LOGIN',
      //                 isBack: '1',
      //                 id: this.$route.query.id,
      //                 name: this.$route.query.name,
      //                 marketType: this.$route.query.type
      //               }
      //             })
      //           } else if (this.$route.query.isBack === 'nft') {
      //             this.$router.push({
      //               name: nameRoute,
      //               query: {
      //                 email: this.form.email,
      //                 pass: encodePass,
      //                 reason: 'REQUEST_LOGIN',
      //                 isBack: 'nft',
      //                 id: this.$route.query.id,
      //                 name: this.$route.query.name
      //               }
      //             })
      //           } else {
      //             this.$router.push({ name: nameRoute, query: { type: type.type, email: this.form.email, pass: encodePass, reason: 'REQUEST_LOGIN' } })
      //           }
      //           message = this.$t('notify.send-code')
      //           this.$message.success({ message, duration: 5000 })
      //           return
      //         } catch (error) {
      //           console.log(error)
      //           // message = this.$t('notify.send-code-fail')
      //           // this.$message.error({ message, duration: 5000 })
      //         }
      //       }

      //       if (res.emailVerified && res.phoneVerified && type.type === 'APP') {
      //         // case click any button from  marketplace , but login yet
      //         if (this.$route.query.isBack === '1') {
      //           this.$router.push({
      //             name: nameRoute,
      //             query: {
      //               type: type.type,
      //               email: this.form.email,
      //               pass: encodePass,
      //               reason: 'REQUEST_LOGIN',
      //               isBack: '1',
      //               id: this.$route.query.id,
      //               name: this.$route.query.name,
      //               marketType: this.$route.query.type
      //             }
      //           })
      //         } else if (this.$route.query.isBack === 'nft') {
      //           this.$router.push({
      //             name: nameRoute,
      //             query: {
      //               email: this.form.email,
      //               pass: encodePass,
      //               reason: 'REQUEST_LOGIN',
      //               isBack: 'nft',
      //               id: this.$route.query.id,
      //               name: this.$route.query.name
      //             }
      //           })
      //         } else {
      //           this.$router.push({ name: nameRoute, query: { type: type.type, email: this.form.email, pass: encodePass, reason: 'REQUEST_LOGIN' } })
      //         }
      //         return
      //       }

      //       if (type.type === 'NONE') {
      //         this.login({ ...this.form, password: encodePass }).then(() => {
      //           // case click any button from  marketplace , but login yet
      //           if (this.$route.query.isBack === '1') {
      //             const name = this.$route.query.name as string
      //             const type = this.$route.query.type as string
      //             const id = this.$route.query.id as string
      //             this.$router.push({ name, params: { type, id } })
      //           } else if (this.$route.query.isBack === 'nft') {
      //             const name = this.$route.query.name as string
      //             const id = this.$route.query.id as string
      //             this.$router.push({ name, params: { id } })
      //           } else {
      //             this.$router.push({ name: 'Wallet' })
      //           }

      //           message = this.$t('notify.login-success')
      //           this.$message.success({ message, duration: 5000 })
      //         })
      //       }

      //       // this.isLoading = false
      //     } catch (error: any) {
      //       this.isLoading = false
      //       const { data } = error.response
      //       if (data.status === 'INVALID_CAPTCHA') {
      //         //@ts-ignore
      //         this.$refs['recaptcha'].reset()
      //         this.isVerifyCaptcha = false
      //       }
      //     }
      //   }
      // })
    }
    getMobileOperatingSystem(): string {
      let userAgent = navigator.userAgent || navigator.vendor

      // Windows Phone must come first because its UA also contains "Android"
      if (/windows phone/i.test(userAgent)) {
        return 'Windows Phone'
      }

      if (/android/i.test(userAgent)) {
        return 'Android'
      }

      // iOS detection from: http://stackoverflow.com/a/9039885/177710
      if (/iPad|iPhone|iPod/.test(userAgent)) {
        return 'iOS'
      }

      return 'unknown'
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
    .form {
      max-width: 512px;
      margin: 40px auto 0;
      box-shadow: 0px 0.6px 1.8px rgba(0, 0, 0, 0.1), 0px 3.2px 7.2px rgba(0, 0, 0, 0.13);
      border-radius: 8px;
      background-color: var(--bc-bg-white);

      .form-item {
        padding: 30px 24px;
        .title-form {
          color: #201f1e;
        }
      }

      .btn {
        padding: 12px 0 !important;
        font-size: 16px !important;
        line-height: 24px !important;
        margin: 24px 0 !important;
        background: #af6535;
      }
      .btn:hover {
        background: #af6535 !important;
      }

      .input-password {
        position: relative;
      }
      .icon-show-password {
        cursor: pointer;
        position: absolute;
        top: 3px;
        right: 14px;
        .span-icon {
          color: var(--bc-color-grey90);
        }
      }
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
            margin-bottom: 24px;
            font-weight: 600;
          }
        }

        .text-base {
          font-size: 14px;
        }
      }
    }
  }
</style>
