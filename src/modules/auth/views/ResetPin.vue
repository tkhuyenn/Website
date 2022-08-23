<template>
  <div class="bc-login">
    <header-login />
    <div class="form">
      <el-form class="form-item" :model="form" :rules="rules" ref="form-login">
        <div class="text-3xl text-semibold text-center mb-2 title-form">{{ $t('resetPin.title') }}</div>
        <div class="label-box">
          <label for="">{{ $t('label.pin') }}</label>
        </div>
        <el-form-item prop="pin" class="input-password">
          <el-input :type="showPass == true ? 'text' : 'password'" style="border-clor: red" :placeholder="$t('placeholder.pin')" maxlength="4" v-model="form.pin" />
          <!-- <el-input :placeholder="$t('placeholder.password')" type="password" v-model="form.password" /> -->
          <span class="icon-show-password" @click="showPass = !showPass">
            <base-icon :icon="showPass == true ? 'icon-eye-off' : 'icon-eye'" size="22" />
          </span>
        </el-form-item>
        <div class="label-box">
          <label for="">{{ $t('label.repin') }}</label>
        </div>
        <el-form-item prop="repin" class="input-password2">
          <el-input class="input-password" :type="showPass2 == true ? 'text' : 'password'" :placeholder="$t('placeholder.repin')" v-model="form.repin" maxlength="4" />
          <!-- <el-input class="input-password" type="password" :placeholder="$t('placeholder.repassword')" v-model="form.repassword" /> -->
          <span class="icon-show-password2" @click="showPass2 = !showPass2">
            <base-icon :icon="showPass2 == true ? 'icon-eye-off' : 'icon-eye'" size="22" />
          </span>
          <span class="small-err" v-if="!isMatchPassword">{{ $t('validate.password-correct') }}</span>
        </el-form-item>
        <el-button :loading="isLoading" :class="getDisableBtn ? 'btn--disabled' : null" class="btn w-100 is-none-border cursor" @click="handleResetPass"
          >{{ $t('resetPin.submit') }}
        </el-button>
        <!-- <button :class="getDisableBtn ? 'btn--disabled' : null" type="button" class="btn is-none-border w-100 cursor" @click="handleResetPass">{{ $t('resetPass.submit') }}</button> -->
      </el-form>
    </div>
    <!-- <language :isReload="false" @changeLanguage="handleChangeLanguage" /> -->
  </div>
</template>

<script lang="ts">
  import VueRecaptcha from 'vue-recaptcha'
  import HeaderLogin from '../components/HeaderLogin.vue'
  import Language from '../components/Language.vue'
  import { namespace } from 'vuex-class'

  import getRepository from '@/services'
  import { AuthRepository } from '@/services/repositories/auth'

  import { Component, Vue, Watch } from 'vue-property-decorator'
  import trim from 'lodash/trim'
  const apiAuth: AuthRepository = getRepository('auth')

  interface FormLogin {
    pin: string
    repin: string
  }
  const bcAuth = namespace('beAuth')

  @Component({ components: { VueRecaptcha, HeaderLogin, Language } })
  export default class ResetPin extends Vue {
    @bcAuth.Getter('isLogin') isLogin!: boolean
    @bcAuth.Action('logout') logout!: () => Promise<void>
    isMatchPassword = true
    showPass = false
    showPass2 = false
    language = 'en'
    form: FormLogin = {
      repin: '',
      pin: ''
    }
    isLoading = false
    visible = false
    visibleRe = false
    validate: Record<string, boolean> = {
      length: false,
      number: false,
      uppercase: false,
      lowercase: false,
      specialCharacter: false
    }
    validateRepassword: Record<string, boolean> = {
      length: false,
      number: false,
      uppercase: false,
      lowercase: false,
      specialCharacter: false
    }
    selectLanguage = ''

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
      pin: [
        {
          required: true,
          message: this.$t('resetPin.wrong-pin'),
          trigger: 'blur'
        }
      ],
      repin: [
        {
          required: true,
          message: this.$t('resetPin.wrong-re-pin'),
          trigger: 'blur'
        }
      ]
    }

    // }
    @Watch('form.repin') watchRePassword(pass: string): void {
      //@ts-ignore
      this.$refs['form-login']?.fields.find(f => f.prop == 'repin').clearValidate()
      if (this.form.pin && this.form.repin) {
        this.isMatchPassword = !(this.form.pin !== this.form.repin)
      } else {
        this.isMatchPassword = true
      }
    }

    get getDisableBtn(): boolean {
      return !(this.form.pin && trim(this.form.pin) === this.form.repin && trim(this.form.repin))
    }

    created(): void {
      this.language = window.localStorage.getItem('bc-lang')!
      this.selectLanguage = this.language
    }

    handleChangeLanguage(): void {
      //@ts-ignore
      this.$refs['form-login']?.resetFields()
    }
    handleResetPass(): void {
      if (this.getDisableBtn) {
        return
      }
      //@ts-ignore
      this.$refs['form-login']?.validate(async valid => {
        if (valid) {
          let message: any = ''
          this.isLoading = true
          const data = {
            email: this.$route.query.email,
            verificationCode: this.$route.query.code,
            pin: this.$options.filters?.encryptPassword(this.form.pin),
            pinConfirm: this.$options.filters?.encryptPassword(this.form.repin)
          }
          apiAuth
            .resetPinCode(data)
            .then(() => {
              message = this.$t('notify.reset-pin-success')
              this.$message.success({ message, duration: 5000 })
              if (this.isLogin) {
                this.logout().then(() => {
                  this.$router.push({ name: 'login' })
                })
              } else {
                this.$router.push({ name: 'login' })
              }
              this.isLoading = false
            })
            .catch((error: any) => {
              let message: any = ''
              const { data } = error.response

              if (data.status === 'EXPIRED_VERIFICATION' || data.status === 'INVALID_VERIFICATION') {
                message = this.$t('notify.reset-pin-timeout')
                this.$message.error({ message, duration: 5000 })
              } else {
                message = this.$t('notify.reset-pin-not-match')
                this.$message.error({ message, duration: 5000 })
              }

              this.isLoading = false
            })
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  .bc-login {
    background-color: #f6f8fc;
    height: 100vh;
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
    .form {
      width: 512px;
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
    .label-box {
      margin-bottom: 8px;
      color: var(--bc-table-text-color);
      font-weight: 400;
      font-size: 14px;
    }
    .input-password,
    .input-password2 {
      position: relative;
    }
    .icon-show-password,
    .icon-show-password2 {
      cursor: pointer;
      position: absolute;
      top: 3px;
      right: 14px;
      .span-icon {
        color: var(--bc-color-grey90);
      }
    }
  }
</style>
