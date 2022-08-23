<template>
  <div class="bc-login">
    <header-login />
    <div class="form">
      <el-form class="form-item" :model="form" :rules="rules" ref="form-phone">
        <div class="text-3xl text-semibold text-center mb-2 title-form">{{ $t('verify.phone-title') }}</div>

        <el-form-item prop="country">
          <div class="be-flex label" slot="label">{{ $t('label.country') }}</div>
          <!-- <el-select v-model="form.country" class="w-100" clearable @change="handleSelectCountry">
            <el-option v-for="(country, index) in listCountry" :key="index" :label="country.name" :value="country.name" />
          </el-select> -->
          <el-select v-model="form.country" filterable reserve-keyword remote :remote-method="remoteCountry" clearable @change="handleSelectCountry">
            <el-option v-for="(country, index) in listCountry" :key="index" :label="country.name" :value="country.name" />
          </el-select>
        </el-form-item>

        <el-form-item prop="phone">
          <div class="be-flex label" slot="label">{{ $t('label.phone-number') }}</div>

          <el-input type="number" :placeholder="$t('placeholder.phone-number')" v-model="form.phone">
            <template style="cursor: pointer" slot="prepend"
              ><span style="color: #5b616e">{{ phoneDefault }}</span></template
            >
          </el-input>
        </el-form-item>
        <el-button :loading="isLoading" :class="getDisableBtn ? 'btn--disabled' : null" class="btn w-100 is-none-border cursor" @click="handleVerify"
          >{{ $t('verify.continue') }}
        </el-button>
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
  import countryJson from '@/utils/country/index.json'

  import getRepository from '@/services'
  import { AuthRepository } from '@/services/repositories/auth'

  import { Component, Vue, Watch } from 'vue-property-decorator'

  import trim from 'lodash/trim'
  import filter from 'lodash/filter'
  import includes from 'lodash/includes'

  const apiAuth: AuthRepository = getRepository('auth')

  const bcAuth = namespace('beAuth')
  const beBase = namespace('beBase')

  interface IListCountry {
    name: string
    dial_code: string
    code: string
  }
  @Component({ components: { VueRecaptcha, HeaderLogin, Language } })
  export default class VerifyPhone extends Vue {
    @bcAuth.Mutation('SET_USER_INFO') setUserInfo!: (data: Record<string, any>) => void
    @beBase.State('urlSystem') urlSystem!: Record<string, any>
    @bcAuth.Action('setToken') setToken!: (data: Record<string, any>) => Promise<void>
    isLoading = false
    listCountry: IListCountry[] = countryJson
    language = ''
    selectLanguage = ''
    phoneDefault = '+84'
    form: Record<string, any> = {
      country: '',
      phone: ''
    }

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
      country: [
        {
          required: true,
          message: this.$t('validate.wrong-country'),
          trigger: 'change'
        }
      ],
      phone: [
        {
          required: true,
          message: this.$t('validate.phone-number'),
          trigger: 'blur'
        }
      ]
    }

    get getDisableBtn(): boolean {
      return !(this.form.country && this.form.phone)
    }

    created(): void {
      this.language = window.localStorage.getItem('bc-lang')!
      this.selectLanguage = this.language
      const currentCountry = filter(this.listCountry, country => country.code === 'VN')[0]
      this.form.country = currentCountry.name
    }

    handleSelectCountry(country: string): void {
      this.phoneDefault = filter(this.listCountry, item => item.name === country)[0].dial_code
    }

    handleChangeLanguage(): void {
      //@ts-ignore
      this.$refs['form-phone']?.resetFields()
    }
    handleVerify(): void {
      if (this.getDisableBtn) {
        return
      }
      //@ts-ignore
      this.$refs['form-phone']?.validate(async valid => {
        if (valid) {
          const email = this.$route.query.email
          const data = {
            ...this.form,
            countryCode: this.phoneDefault,
            email
          }
          apiAuth
            .verifyPhone(data, true)
            .then(res => {
              if (includes(this.urlSystem['code.phone.verify.require'], this.phoneDefault)) {
                this.$router.push({
                  name: 'verify-phone',
                  query: { email, reason: 'VERIFY-SMS', type: 'SMS', country: this.form.country, phone: this.form.phone, countryCode: this.phoneDefault }
                })
              } else {
                this.setToken(res)
                this.setUserInfo(res)
                this.$router.push({ name: 'Wallet' })
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
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

    //search country
    @Watch('form.country')
    clearCountry(value: any) {
      if (!value) {
        this.listCountry = countryJson
      }
    }
    remoteCountry(query: string): void {
      if (query) {
        this.listCountry = filter(
          countryJson,
          country => trim(country.code).toUpperCase().includes(query.toUpperCase()) || trim(country.name).toUpperCase().includes(query.toUpperCase())
        )
        // if (currentCountry.length > 0) {
        //   this.listCountry = currentCountry
        // }
      } else if (!query) {
        this.listCountry = countryJson
      }
    }
  }
</script>

<style scoped lang="scss">
  .bc-login {
    background-color: #f6f8fc;
    min-height: 100vh;
    .el-select {
      width: 100%;
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
