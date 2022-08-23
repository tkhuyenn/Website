<template>
  <div class="bc-verify">
    <header-login />
    <div class="content" v-if="isLoading">
      <div class="be-flex jc-space-center verify-code">
        <base-icon v-if="isSuccess" icon="icon-unlock-succsess" size="80" />
        <base-icon v-else icon="icon-unlock-failed" size="80" />
      </div>
      <div class="text-3xl text-bold text-center mb-24 title">
        <span v-if="isSuccess">{{ $t('verify.title-unlock-succsess') }}</span>
        <span v-else>{{ $t('verify.title-unlock-failed') }}</span>
      </div>
      <div class="text-base text-center mb-24 des">
        <span v-if="isSuccess">{{ $t('verify.des-unlock-succsess') }}</span>
        <span v-else>{{ $t('verify.des-unlock-failed') }} {{ urlSystem['system.token.support_email'] }}</span>
      </div>
      <el-button class="btn w-100 is-none-border cursor" @click="handleSubmit">{{ $t('verify.continue') }} </el-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import getRepository from '@/services'
  import HeaderLogin from '../components/HeaderLogin.vue'

  import { namespace } from 'vuex-class'
  import { AuthRepository } from '@/services/repositories/auth'

  const apiAuth: AuthRepository = getRepository('auth')
  const beBase = namespace('beBase')
  const bcAuth = namespace('beAuth')

  @Component({ components: { HeaderLogin } })
  export default class UnlockUser extends Vue {
    @beBase.State('urlSystem') urlSystem!: Record<string, any>
    @bcAuth.Getter('isLogin') isLogin!: boolean
    @bcAuth.Action('logout') logout!: () => Promise<void>

    isLoading = false
    isSuccess = true

    created(): void {
      const params = this.$route.query
      apiAuth
        .unlockUser({ ...params, verificationCode: this.$route.query.code, type: 'EMAIL' })
        .then(() => {
          this.isSuccess = true
          this.isLoading = true
          if (this.isLogin) {
            this.logout()
          }
        })
        .catch((error: any) => {
          this.isLoading = false
          const { data } = error.response
          if (this.isLogin) {
            this.logout()
          }
          if (data.statusCode === 400 && data.status === 'BAD_REQUEST') {
            this.$router.push({ name: 'login' })
          }
          this.isSuccess = false
          setTimeout(() => {
            this.isLoading = true
          }, 500)
        })
    }

    handleSubmit(): void {
      this.$router.push({ name: 'login' })
    }
  }
</script>

<style scoped lang="scss">
  .bc-verify {
    background-color: #f6f8fc;
    height: 100vh;
    .content {
      width: 512px;
      margin: 40px auto 0;
      padding: 30px 24px;
      box-shadow: 0 0.6px 1.8px rgba(0, 0, 0, 0.1), 0 3.2px 7.2px rgba(0, 0, 0, 0.13);
      border-radius: 8px;
      background-color: var(--bc-bg-white);

      .des {
        padding: 0 14px;
      }
    }
  }
  .btn {
    padding: 12px 0 !important;
    font-size: 16px !important;
    line-height: 24px !important;
  }
  .title-form {
    color: #201f1e;
    margin-bottom: 3px;
  }
  .input-code {
    margin-top: 17px;
  }
</style>
