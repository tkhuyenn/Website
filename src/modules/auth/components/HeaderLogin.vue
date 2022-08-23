<template>
  <div class="header-login be-flex align-center jc-space-between">
    <div class="header-login__left be-flex align-center cursor" @click="redirect">
      <!-- <base-icon v-if="coinMain === 'LYNK'" icon="logo-login-1" size="132" />
      <base-icon v-else icon="icon-clm" size="32" /> -->
      <!-- <img v-if="coinMain === 'LYNK'" src="../../../icons/png/logo.png" alt="" style="width: 8%" /> -->
      <img src="../../../icons/png/LOGO - CĐTT.png" style="color: #9900cc; display: inline-flex; width: 40px; height: 40px" />
      <!-- <img v-if="coinMain === 'LYNK'" src="@/assets/images/market/logo-purple.png" alt="" class="show-in-mobile" /> -->
      <!-- <img v-else src="../../../icons/png/logo-clm.png" alt="" style="width: 70%" /> -->
      <!-- <span class="title" :class="coinMain === 'CLM' ? 'title-clm' : null">{{ coinMain === 'LYNK' ? 'LYNKEY' : 'CLEVERME' }}</span> -->
      <span class="title" >CÔNG VINH</span>
    </div>
    <div class="header-login__right be-flex align-center">
      <!-- <div v-if="getShowRight" class="item cursor mr-24 is-disable-mobile" @click="handleClick">
        <span>{{ $t('login.guide') }}</span>
      </div>
      <div v-if="getShowRight" class="item cursor mr-24">
        <el-dropdown trigger="click" class="pl-2 login-page-header" @command="handleCommand">
          <span class="el-dropdown-link" style="color: #201f1e"> {{ $t('login.download') }}<i class="el-icon-arrow-down el-icon--right"></i> </span>

          <el-dropdown-menu slot="dropdown" class="header-downloadapp">
            <div class="dropdown-group pb-1">
              <div class="dropdown-group-title">Application for mobile devices</div>
              <el-dropdown-item command="chplay"><base-icon icon="chplay" style="font-size: 16px" /><span class="pl-1">Get the app on Google Play</span></el-dropdown-item>
              <el-dropdown-item command="appstore"><base-icon icon="appstore" style="font-size: 17px" /><span class="pl-1">Get the app on App Store</span></el-dropdown-item>
            </div>
            <div class="dropdown-group pb-1 pt-1" style="border-top: 1px solid #dbdbdb">
              <div class="dropdown-group-title">Applications for computers</div>
              <el-dropdown-item command="macos"><base-icon icon="macos" style="font-size: 18px" /><span class="pl-1">Download apps for macOS</span></el-dropdown-item>
              <el-dropdown-item command="window"><base-icon icon="window" style="font-size: 19px" /><span class="pl-1">Download apps for Windows</span></el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div> -->
      <div class="item cursor be-flex align-center">
        <base-icon icon="email" size="20" style="padding-right: 5px" />
        <span>congvinhclock@gmail.com</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  const beBase = namespace('beBase')

  @Component
  export default class HeaderLogin extends Vue {
    @beBase.State('coinMain') coinMain!: string
    @beBase.State('urlSystem') urlSystem!: Record<string, any>

    // emailLyn = 'support@linkkey.com'
    // emailClm = 'support@linkkey.com'

    get getShowRight(): boolean {
      return this.$route.name !== 'sign-up'
    }

    redirect(): void {
      this.$router.push({ name: 'home' })
    }

    handleClick(): void {
      window.open(`${this.urlSystem['system.token.support.url']}`)
    }

    handleCommand(command: string): void {
      if (command === 'chplay') {
        window.open(`${this.urlSystem['system.token.app.android.download']}`)
      } else {
        window.open(`${this.urlSystem['system.token.app.ios.download']}`)
      }
    }
  }
</script>

<style scoped lang="scss">
  .header-login {
    height: 70px;
    background-color: var(--bc-bg-white);
    padding: 0 40px;
    border-bottom: 1px solid #d2d0ce;

    &__left {
      .title {
        font-size: 18px;
        color: #af6535;
        font-weight: 700;
        margin-left: 8px;
      }
      .title-clm {
        color: var(--bc-amount-clm);
      }
    }
    &__right {
      .item {
        color: #201f1e;
      }
    }
  }

  .show-in-mobile {
    display: none;
  }
  @media (max-width: 600px) {
    .hide-in-mobile {
      display: none;
    }
    .show-in-mobile {
      display: block;
    }
    .header-login {
      padding: 0 20px;
    }
    .is-disable-mobile {
      display: none;
    }
    .mr-24 {
      margin-right: unset;
    }
  }
</style>
