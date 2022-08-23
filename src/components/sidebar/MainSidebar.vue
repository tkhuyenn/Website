<template>
  <div class="main-side-bar be-flex-column align-center">
    <!-- <router-link :to="{ name: 'Wallet' }" class="style_router_home router_center router-home" exact> -->
    <span class="style_router_home router_center router-home cursor" @click="handleRedirectHome('CrowdSale')">
      <div class="sack_avatar logo-home">
        <!-- <base-icon icon="logo-lienviet" style="font-size: 40px; display: block; height: 40px" class="style_avatar_home" /> -->
        <base-icon v-if="coinMain === 'LYNK'" icon="logo-login" size="32" />
        <base-icon v-else icon="icon-clm" size="32" />
        <p>{{ $t('leftMenu.home') }}</p>
      </div>
    </span>
    <router-link v-if="moduleConfig.Crowdsale" :to="{ name: 'CrowdSale' }" class="router_center">
      <div class="sack_avatar" @click="handleRedirectHome('CrowdSale')">
        <base-icon icon="menu-sale" size="32" />
        <p>{{ $t('leftMenu.crowdsale') }}</p>
      </div>
    </router-link>
    <!-- <router-link :to="{ name: 'exchange' }" class="router_center" exact>
      <div class="sack_avatar">
        <base-icon icon="menu-exchange" size="32" />
        <p>{{ $t('leftMenu.exchange') }}</p>
      </div>
    </router-link> -->
    <router-link :to="{ name: 'Wallet' }" class="router_center">
      <div class="sack_avatar" @click="handleRedirectHome('Wallet')">
        <base-icon icon="menu-wallet" size="32" />
        <p>{{ $t('leftMenu.wallet') }}</p>
      </div>
    </router-link>
    <router-link :to="{ name: 'affiliate' }" class="router_center" exact>
      <div class="sack_avatar" @click="handleRedirectHome('affiliate')">
        <base-icon icon="menu-gift" size="32" />
        <p>{{ $t('leftMenu.affiliate') }}</p>
      </div>
    </router-link>
    <!-- <router-link :to="{ name: 'report' }" class="router_center" exact>
      <div class="sack_avatar">
        <base-icon icon="menu-report" size="32" />
        <p>{{ $t('leftMenu.report') }}</p>
      </div>
    </router-link> -->
    <router-link :to="{ name: 'Profile' }" class="router_center router_setting">
      <div class="sack_avatar" @click="handleRedirectHome('Profile')">
        <base-icon icon="menu-setting" size="32" />
        <p>{{ $t('leftMenu.setting') }}</p>
      </div>
    </router-link>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  const beBase = namespace('beBase')
  const beAuth = namespace('beAuth')

  @Component({ components: {} })
  export default class MainSidebar extends Vue {
    @beBase.State('coinMain') coinMain!: string
    @beAuth.State('moduleConfig') moduleConfig!: Record<string, any>

    isOpenPopup = false
    isOpenPopupContract = false
    searchModule = ''
    moduleContract = [
      {
        id: 4,
        name: 'Fee',
        routerName: 'contract',
        icon: 'icon-hop-dong',
        title: 'Thu phí'
      },
      {
        id: 5,
        name: 'Brief',
        routerName: 'pending',
        icon: 'icon-ho-so',
        title: 'Hồ sơ'
      },
      {
        id: 6,
        name: 'Lapse',
        routerName: 'lapse',
        icon: 'contractLaspe',
        title: 'Mất hiệu lực'
      }
    ]
    moreModules = [
      {
        id: 1,
        name: 'Program',
        routerName: 'programOrigin',
        icon: 'program',
        title: 'CTTĐ'
      },
      {
        id: 2,
        name: 'Employee',
        routerName: 'employee',
        icon: 'icon-KH',
        title: 'Nhân sự'
      },
      {
        id: 3,
        name: 'Product',
        routerName: 'productePage',
        icon: 'product',
        title: 'Sản phẩm'
      },
      // {
      //   id: 4,
      //   name: 'Deal',
      //   routerName: 'deals',
      //   icon: 'icon-luong',
      //   title: 'Cơ hội'
      // }
      {
        id: 5,
        name: 'Offer',
        routerName: 'offerOrigin',
        icon: 'menu-offer',
        title: 'CTƯĐ'
      }
    ]

    handleRedirectHome(name: string): void {
      if (this.$route.name === name) {
        window.location.reload()
      } else {
        this.$router.push({ name }).catch()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .main-side-bar {
    position: relative;
    background: #ffffff;
    height: 100vh;
    width: 80px;
    .style_router_home {
      margin: 0px 10px 10px 10px;
      .style_avatar_home {
        color: #ef7524;
        text-align: center;
      }
    }
    .setting {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 38px;
      color: #6b6b6b;
    }

    .style_avatar {
      text-align: center;
      line-height: 1;
      font-size: 32px;
    }
    .router_center {
      text-align: center;
      width: 100%;
      height: 80px;
      color: #6b6b6b;
      .sack_avatar {
        padding: 12px 0;
        p {
          font-size: 10px;
          margin-top: 1px;
          color: var(--bc-text-primary);
          font-weight: 400;
          line-height: 12px;
        }
        &:hover {
          background: var(--bc-color-grey20);
          color: var(--bc-theme-primary);
          p {
            color: var(--bc-theme-primary) !important;
          }
        }
      }
    }
    .router_setting {
      // position: absolute;
      // bottom: 0;
      // margin-top: calc(100vh - 600px);
    }
    .filter_avatar {
      opacity: 0.65;
    }
  }
  a {
    text-decoration: none;
  }
  .router-link-exact-active,
  .router-link-active {
    background: #e9e9e9;
    width: 80px;
    .sack_avatar {
      color: var(--bc-theme-primary);
      p {
        color: var(--bc-theme-primary) !important;
        font-weight: 600 !important;
      }
    }
    .child-item {
      color: #f07525;
      background: #e9e9e9;
    }
  }
  .router-home {
    margin-bottom: 0 !important;
    .logo-home {
      padding-top: 0 !important ;
      height: 100%;
      .style_avatar_hom {
        font-size: 40px;
        display: block;
      }
      p {
        margin-top: 6px !important;
      }
    }
  }
  .style_special {
    margin-left: 11px;
  }
  .button-add {
    background: #f3f3f3;
    &:hover {
      background: #e9e9e9;
      color: #f07525;
    }
    &:focus {
      border: none;
      color: #6b6b6b !important;
    }
  }
  .module {
    list-style-type: none;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    &-item {
      color: #65676b;
      text-align: center;
      height: 68px;
      cursor: pointer;
      flex-basis: 32%;
      &:hover {
        color: #0078d4;
        background: #e9e9e9;
      }
      &.menu-active {
        color: #0078d4;
        background: #e9e9e9;
      }
    }
    .child-item {
      height: 100%;
    }
  }

  .module-item {
    margin: 1px;
  }
</style>
