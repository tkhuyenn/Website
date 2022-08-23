<template>
  <div class="bc-login">
    <header-login />
    <div class="form">
      <el-form class="form-item" :model="form" :rules="rules" ref="form-signup">
        <div class="text-3xl text-semibold text-center mb-2 title-form">{{ $t('signup.title-form') }}</div>
        <el-row class="flex_line be-flex respon-name">
          <el-col class="be-flex-item" style="margin-right: 16px">
            <div class="label-box">
              <label for="">{{ $t('signup.first-name') }} <span class="required">*</span></label>
            </div>
            <el-form-item prop="firstName">
              <el-input :placeholder="$t('signup.first-name')" v-model="form.firstName" />
            </el-form-item>
          </el-col>
          <!-- <button class="btn-default mr-15 text-regular" @click="testSendTransaction">Send ETH</button> -->
          <el-col class="be-flex-item">
            <div class="label-box">
              <label for="">{{ $t('signup.last-name') }} <span class="required">*</span></label>
            </div>
            <el-form-item prop="lastName">
              <el-input :placeholder="$t('signup.last-name')" v-model="form.lastName" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="label-box">
          <label for="">{{ $t('signup.email') }} <span class="required">*</span></label>
        </div>
        <el-form-item prop="email">
          <el-input :placeholder="$t('signup.email')" v-model="form.email" />
        </el-form-item>
        <div class="label-box">
          <label for="">{{ $t('signup.password') }} <span class="required">*</span></label>
        </div>
        <el-form-item prop="password" class="input-password">
          <el-popover v-if="isDesktop" placement="bottom" width="auto" trigger="manual" v-model="visible" popper-class="popper-validate-password">
            <template>
              <div class="check-password">
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validate.length" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.length') }}</span>
                </div>
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validate.lowercase" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.lowercase') }}</span>
                </div>
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validate.uppercase" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.uppercase') }}</span>
                </div>
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validate.number" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.number') }}</span>
                </div>
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validate.specialCharacter" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.specialCharacter') }}</span>
                </div>
              </div>
            </template>
            <el-input
              :type="showPass == true ? 'text' : 'password'"
              slot="reference"
              :placeholder="$t('signup.password')"
              v-model="form.password"
              @focus="visible = true"
              @blur="visible = false"
            />
          </el-popover>
          <el-popover v-else placement="right" width="auto" trigger="manual" v-model="visible" popper-class="popper-validate-password">
            <template>
              <div class="check-password">
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validate.length" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.length') }}</span>
                </div>
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validate.lowercase" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.lowercase') }}</span>
                </div>
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validate.uppercase" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.uppercase') }}</span>
                </div>
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validate.number" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.number') }}</span>
                </div>
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validate.specialCharacter" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.specialCharacter') }}</span>
                </div>
              </div>
            </template>
            <el-input
              :type="showPass == true ? 'text' : 'password'"
              slot="reference"
              :placeholder="$t('signup.password')"
              v-model="form.password"
              @focus="visible = true"
              @blur="visible = false"
            />
          </el-popover>

          <span class="icon-show-password" @click="showPass = !showPass">
            <base-icon :icon="showPass == true ? 'icon-eye-off' : 'icon-eye'" size="22" />
          </span>
          <!-- <small v-if="form.checkPassWord" class="error"> {{ $t('signup.checkpass') }}</small> -->
          <!-- <small class="error"> {{ form }} aaaa</small> -->
          <!-- <a> {{ form.checkPassword }} </a> -->
        </el-form-item>
        <!-- <div class="label-box">
          <label for="">{{ $t('signup.ref') }}</label>
        </div>
        <el-form-item>
          <el-input :placeholder="$t('signup.ref')" v-model="form.referrerCode" />
        </el-form-item> -->
        <!-- <div class="be-flex jc-space-between w-100 mt-2">
          <el-checkbox v-model="form.confirm"></el-checkbox>
          <span class="text-base terms" style="margin-left: 8px; color: #201f1e">
            {{ $t('signup.terms') }}&nbsp;<el-button @click="handleViewAgree" class="textButton" type="text"> {{ $t('signup.user-agreement') }} </el-button> {{ $t('signup.and')
            }}<el-button @click="handleViewPolicy" class="textButton" type="text" style="margin-left: 0"> &nbsp;{{ $t('signup.privacy-policy') }} </el-button></span
          >
        </div> -->
        <!-- <div v-if="urlSystem && urlSystem['api.auto.test'] !== '1'" class="captcha be-flex jc-space-center mt-2">
          <vue-recaptcha ref="recaptcha" :loadRecaptchaScript="true" :language="language" :sitekey="siteKey" @verify="verifyCaptcha" @expired="expiredCaptcha"></vue-recaptcha>
        </div> -->
        <el-button :loading="isLoading" :class="getDisableBtn ? 'btn--disabled' : null" class="btn w-100 is-none-border cursor" @click="handleSignUp"
          >{{ $t('signup.title-form') }}
        </el-button>
        <!-- <button :class="getDisableBtn ? 'btn--disabled' : null" type="button" class="btn is-none-border w-100 cursor" @click="handleSignUp">{{ $t('signup.title-form') }}</button> -->
        <div class="text-base be-flex jc-space-center account" style="text-align: center">
          {{ $t('signup.have-account') }} &nbsp;<span @click="handleLoginForm" class="text-hyperlink text-semibold cursor" style="color: #af6535">{{ $t('signup.sign-in') }} </span>
        </div>
      </el-form>

      <!-- <verify-page v-else class="form-item" /> -->
    </div>
    <!-- <language :isReload="true" style="background: #f6f8fc" /> -->
  </div>
</template>

<script lang="ts">
  import VueRecaptcha from 'vue-recaptcha'
  import HeaderLogin from '../components/HeaderLogin.vue'
  import Language from '../components/Language.vue'

  import trim from 'lodash/trim'

  import VerifyPage from './Verify.vue'
  import getRepository from '@/services'
  import { AuthRepository } from '@/services/repositories/auth'
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const beBase = namespace('beBase')

  interface FormLogin {
    email: string
    password: string
    lastName: string
    firstName: string
    confirm: boolean
    referrerCode: string
    checkPassWord: boolean
  }

  const apiAuth: AuthRepository = getRepository('auth')

  @Component({ components: { VueRecaptcha, HeaderLogin, VerifyPage, Language } })
  export default class LoginPage extends Vue {
    @beBase.State('siteKey') siteKey!: string
    @beBase.State('urlSystem') urlSystem!: Record<string, any>
    @beBase.State('isDesktop') isDesktop!: boolean

    showPass = false
    language = 'en'
    // siteKey = '6LcbbKAcAAAAAGS9BixBvH4okIBVNsY7lywPDleX'
    form: FormLogin = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirm: false,
      referrerCode: '',
      checkPassWord: false
    }
    isLoading = false
    visible = false
    captcha = ''
    remember = false
    selectLanguage = ''
    isVerifyCaptcha = false
    validate: Record<string, boolean> = {
      length: false,
      number: false,
      uppercase: false,
      lowercase: false,
      specialCharacter: false
    }

    regLow = /(?=.*[a-z])/g
    regUp = /(?=.*[A-Z])/g
    regNumber = /(?=.*[0-9])/g
    regSpecial = /(?=.*[!@#$%^&*()_=+{}:;"'/?><.,-])/g

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
      lastName: [
        {
          required: true,
          message: this.$t('signup.lastname'),
          trigger: 'blur'
        },
        {
          pattern: /^.{2,}$/,
          message: this.$t('signup.lastnameLength'),
          trigger: 'blur'
        }
      ],
      firstName: [
        {
          required: true,
          message: this.$t('signup.firstname'),
          trigger: 'blur'
        },
        {
          pattern: /^.{2,}$/,
          message: this.$t('signup.firstnameLength'),
          trigger: 'blur'
        }
      ],
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
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          message: this.$t('signup.checkpass'),
          trigger: 'blur'
        }
      ]
      // password: [
      //   {
      //     required: true,
      //     message: this.$t('login.wrong-password'),
      //     trigger: 'blur'
      //   }
      // ]
    }

    @Watch('form.password') watchPassword(pass: string): void {
      // console.log('length', pass.length >= 8)
      // console.log('number', this.regNumber.test(pass))
      // console.log('regLow', this.regLow.test(pass))
      // console.log('regUp', this.regUp.test(pass))
      // console.log('regSpecial', this.regSpecial.test(pass))

      this.validate.length = pass.length >= 8
      this.validate.number = this.regNumber.test(pass)
      this.validate.uppercase = this.regUp.test(pass)
      this.validate.lowercase = this.regLow.test(pass)
      this.validate.specialCharacter = this.regSpecial.test(pass)

      if (
        this.validate.length == false ||
        this.validate.number == false ||
        this.validate.uppercase == false ||
        this.validate.lowercase == false ||
        this.validate.specialCharacter == false
      ) {
        console.log('1')
        this.form.checkPassWord = true
      } else {
        console.log('2')
        // this.$refs.withdraw.clearValidate()
        // @ts-ignore
        this.$refs['form-signup']?.clearValidate()
        this.form.checkPassWord = false
      }
    }

    get getDisableBtn(): boolean {
      const isValidatePass = Object.values(this.validate).every(item => item)
      if (this.urlSystem && this.urlSystem['api.auto.test'] !== '1') {
        return !(this.form.email && this.form.password && this.form.firstName && this.form.lastName && isValidatePass)
      }
      return !(this.form.email && this.form.password && this.form.firstName && this.form.lastName && isValidatePass)
    }

    created(): void {
      this.language = window.localStorage.getItem('bc-lang')!
      this.selectLanguage = this.language
    }

    onlyString(event: FocusEvent, type: string): void {
      const _event: any = event
      let string = _event.target.value
      this.form[type] = string.replace(/[^a-zA-Z]/g, '')
    }

    handleChangeLanguage(lang: string): void {
      this.$i18n.locale = lang
      window.localStorage.setItem('bc-lang', lang)
      location.reload()
    }

    verifyCaptcha(responsive: string): void {
      this.isVerifyCaptcha = true
      this.captcha = responsive
    }

    expiredCaptcha(): void {
      this.isVerifyCaptcha = false
    }

    handleLoginForm(): void {
      this.$router.push({ name: 'login' })
    }
    mounted(): void {
      if (this.$route.name == 'sign-up-ref') {
        console.log('â', this.$route.path.split('/')[3])
        const refCode = this.$route.path.split('/')[3]
        this.form.referrerCode = refCode
      } else {
        const refCode = this.$route.query.referrerCode as string
        this.form.referrerCode = refCode
      }

      // let path = this.$route.fullPath.substr(this.$route.fullPath.length - 5)
    }
    handleSignUp(): void {
      if (this.getDisableBtn) {
        return
      }
      //@ts-ignore
      this.$refs['form-signup']?.validate(async valid => {
        if (valid) {
          try {
            let message: any = ''
            let countryCode = ''
            this.isLoading = true
            const encodePass = this.$options.filters?.encryptPassword(this.form.password)

            // countryCode = await apiAuth.getInfoIp()
            await apiAuth.register({ ...this.form, password: encodePass, firstName: trim(this.form.firstName), lastName: trim(this.form.lastName) }, this.captcha)

            this.$router.push({ name: 'verify-email', query: { type: 'EMAIL', email: this.form.email, pass: encodePass, reason: 'SIGN_UP' } })
            this.isLoading = false
            message = this.$t('notify.register-success')
            this.$message.success({ message, duration: 5000 })
          } catch (error: any) {
            this.isLoading = false
            const { data } = error.response
            console.log(data)

            if (data.status === 'INVALID_CAPTCHA') {
              //@ts-ignore
              this.$refs['recaptcha'].reset()
              this.isVerifyCaptcha = false
            }
          }
        }
      })
    }

    handleViewAgree(): void {
      if (this.urlSystem['user.agreement'] === '#') {
        return
      }
      window.open(this.urlSystem['user.agreement'], '_blank')
    }

    handleViewPolicy(): void {
      if (this.urlSystem['privacy.policy'] === '#') {
        return
      }
      window.open(this.urlSystem['privacy.policy'], '_blank')
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
    .error {
      color: var(--bc-status-error);

      font-size: 12px;
      line-height: 1;
      padding-top: 4px;
      position: absolute;
      top: 100%;
      left: 0;
      margin-bottom: 3px;
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
        .respon-name {
          flex-direction: column;
        }
      }
      .form-item {
        padding: 30px 24px;
        .title-form {
          color: #201f1e;
        }
        @media screen and (max-width: 1400px) {
          padding: 24px;
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
    }
    .label-box {
      margin-bottom: 8px;
      label {
        color: var(--bc-table-text-color);
        font-weight: 400;
        font-size: 14px;
        .required {
          color: var(--bc-required);
        }
      }
    }
  }
  .check-password {
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
  @media screen and (max-width: 768px) {
    .bc-login {
      overflow: auto;
      max-height: 626px;
      height: 100%;
      .form {
        width: 90%;
        margin: 20px auto 0;
        box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);
        border-radius: 4px;
        max-width: 512px;
        // height: 626px;

        .form-item {
          padding: 20px;

          .title-form {
            font-size: 20px;
            color: #0a0b0d;
            font-weight: 600;
            line-height: 24px;
            margin-bottom: 24px;
          }
        }

        .text-base {
          font-size: 14px;
          color: #5b616e;
          // text-align: center;
          display: block;
        }

        .account {
          text-align: center;
        }
        .terms {
          color: #0a0b0d !important;
        }

        .textButton {
          font-size: 14px;
        }
      }
    }
    // ::v-deep.label-box > label {
    //   color: red !important;
    // }

    ::v-deep.bc-login .label-box > label {
      color: #0a0b0d;
    }
  }
</style>
