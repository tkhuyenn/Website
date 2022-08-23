<template>
  <el-container class="main-layout" :class="isLoading ? 'be-flex-center' : null">
    <transition name="el-fade-in-linear">
      <base-page-loading v-if="isLoading" />
    </transition>
    <!-- <el-aside v-if="!isLoading" class="sidebar-left" style="width: 80px">
      <main-sidebar />
    </el-aside> -->
    <div v-if="!isLoading && !getRouteLanding" class="main-content main-content--market">
      <div
        class="be-flex main-header"
        :class="isScroll ? 'header-scroll' : null"
        :style="$route.name !== 'MarketPlacePrimary' ? 'border-bottom: 1' + 'px solid #d2d0ce;' : null"
        style="height: 80px"
      >
        <div class="be-flex-item">
          <main-header :class="getClassMarket" :showIdo="false" />
        </div>
      </div>
      <div class="main-center" id="main-center" :style="$route.name === 'ListProduct' ? 'overflow-y:hidden' : null">
        <router-view />
      </div>
      <div v-if="showButton" class="scroll-top" @click="handleScrollToTop">
        <!--        <base-icon icon="icon-top" size="18" />-->
        <img src="../../../assets/images/market/back-to-top.png" />
      </div>
    </div>
    <div class="w-100 layout-lynkey" v-if="!isLoading && getRouteLanding">
      <router-view />
    </div>
  </el-container>
</template>
<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import MainSidebar from '../../sidebar/MainSidebar.vue'
  import MainHeader from '../../header/MainHeader.vue'
  import BasePageLoading from '../../page-loading/BasePageLoading.vue'
  import { namespace } from 'vuex-class'
  import getRepository from '@/services'
  import ParamsRepository from '@/services/repositories/params'
  const apiParams: ParamsRepository = getRepository('params')
  import firebase from '@/utils/firebase'

  const bcAuth = namespace('beAuth')
  const beBase = namespace('beBase')

  @Component({
    components: { MainSidebar, MainHeader, BasePageLoading }
  })
  export default class LayoutMarketplace extends Vue {
    @bcAuth.Action('getInfo') getInfo!: () => Promise<any>
    @bcAuth.Action('logout') logout!: () => Promise<any>
    @beBase.State('urlSystem') urlSystem!: Record<string, any>
    @bcAuth.Getter('isLogin') isLogin!: boolean
    @bcAuth.Action('setConfigModule') setConfigModule!: (data: Record<string, any>) => void

    // apiUser?: UserRepository
    isLoading = true
    selectLanguage = ''
    timing: any = null
    isScroll = false

    @Watch('$route.name') watchRoute(name: string): void {
      const elm = document.querySelector('[role="presentation"]') as HTMLElement
      if (name !== 'home') {
        elm!.style.display = 'none'
      } else {
        elm!.style.display = 'block'
      }
    }

    async mounted(): Promise<void> {
      try {
        this.isLoading = true
        this.selectLanguage = window.localStorage.getItem('bc-lang')!
        // await this.handleSignInFireBase()
        if (!this.isLogin) {
          setTimeout(() => {
            this.isLoading = false
            const elm = document.querySelector('.main-center')
            elm?.addEventListener('scroll', () => {
              if (elm.scrollTop) {
                this.isScroll = true
              } else {
                this.isScroll = false
              }
            })
          }, 500)
          const routeName = this.$route.name!
          setTimeout(() => {
            const elm = document.querySelector('[role="presentation"]') as HTMLElement
            if (routeName !== 'home') {
              elm!.style.display = 'none'
            } else {
              elm!.style.display = 'block'
              // const iframe = elm.querySelector('#_no-clickjacking-0')
              // //@ts-ignore
              // iframe!.style.zIndex = '10'
            }
          }, 1000)
        } else {
          await this.getInfo()
          const result = await apiParams.getConfigModule()
          await this.setConfigModule(result)

          setTimeout(() => {
            this.isLoading = false
            const elm = document.querySelector('.main-center')
            elm?.addEventListener('scroll', () => {
              if (elm.scrollTop) {
                this.isScroll = true
              } else {
                this.isScroll = false
              }
            })
          }, 500)
          const routeName = this.$route.name!
          setTimeout(() => {
            const elm = document.querySelector('[role="presentation"]') as HTMLElement
            if (routeName !== 'home') {
              elm!.style.display = 'none'
            } else {
              elm!.style.display = 'block'
            }
          }, 1000)
        }
      } catch (error: any) {
        this.isLoading = false
        let message: any = ''
        const { data } = error.response
        if (data.status === 'USER_LOCKED') {
          message = this.$t('notify.user-locked')
          this.$message.error({ message, duration: 5000 })
          this.logout().then(() => {
            this.$router.push({ name: 'login' })
          })
        }
        if (data.status === 'USER_BLOCKED') {
          message = this.$t('notify.user-blocked')
          this.$message.error({ message, duration: 5000 })
          this.logout().then(() => {
            this.$router.push({ name: 'login' })
          })
        }
      }
    }

    async handleSignInFireBase(): Promise<any> {
      try {
        const data = {
          password: this.$options.filters?.encryptPassword('#!@Firebase-web-client@!#')
        }
        const result = await apiParams.getTokenFirebase(data)
        await firebase.auth().signInWithCustomToken(result.authToken)
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    }

    // async mounted(): Promise<void> {
    //   const elm = document.querySelector('.main-center')
    //   console.log(elm)

    //   setTimeout(() => {
    //     elm?.addEventListener('scroll', () => {
    //       if (elm.scrollTop) {
    //         this.isScroll = true
    //       } else {
    //         this.isScroll = false
    //       }
    //     })
    //   }, 500)
    // }

    destroyed(): void {
      clearInterval(this.timing)
      // console.log('destroyed')
      // window.removeEventListener('scroll', this.handleScrollTop)
    }

    get getIcon(): string {
      return this.selectLanguage === 'vi' ? 'flag-vn' : 'flag-usa'
    }
    get getRouteLanding(): boolean {
      return this.$route.name === 'home' || this.$route.name === 'download-app-ido'
    }

    get getClassMarket(): string {
      if (this.$route.name === 'MarketPlacePrimary' && !this.isScroll) {
        return 'header-market'
      }
      return ''
    }

    handleChangeLanguage(lang: string): void {
      this.$i18n.locale = lang
      window.localStorage.setItem('bc-lang', lang)
      location.reload()
    }

    handleClickTerm(): void {
      window.open(`${this.urlSystem['system.token.terms']}`)
    }
    showButton = false
    async created() {
      window.addEventListener('scroll', this.handleScrollTop)
    }

    handleScrollTop() {
      this.isScroll = window.scrollY > 10
      this.showButton = window.scrollY > 1000
    }
    handleScrollToTop() {
      window.scroll(0, 0)
    }
  }
</script>
<style lang="scss" scoped>
  .scroll-top {
    cursor: pointer;
    position: fixed;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 58px;
    height: 58px;
    right: 60px;
    bottom: 104px;
    border: solid 1px transparent !important;
    z-index: 4;
    //opacity: 0.8;
    //background-image: linear-gradient(#ffffff 80%, #ffffff 80%), linear-gradient(to bottom right, #3626af, #824bc4, #b966d3);
    //background-origin: border-box;
    //background-clip: content-box, border-box;
    @media (max-width: 1200px) {
      right: 20px;
    }
  }
  .main-layout {
    position: relative;
    height: 100vh;
    background-color: #fff;
    color: var(--bc-text-market-primary);
    .sidebar-left {
      border-right: 1px solid #ccc;
      height: 100%;
      overflow: hidden;
      background-color: #e9e9e9;
      position: relative;
    }
    .main-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      .main-header {
        // border-bottom: 1px solid #d2d0ce;
        padding: 0px;
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 1000;
      }
      .main-center {
        padding: 0;
        background-color: #fff;
        display: block;
        flex: 1;
        flex-basis: auto;
        //overflow: auto;
      }
    }
    .sidebar-right {
      padding-top: 15px;
      border-left: 1px solid hsl(0deg 0% 100% / 10%);
      overflow: hidden;
    }
    ::v-deep.header-market {
      color: var(--bc-color-white) !important;
      .body {
        .content-left {
          .dropdown-menu {
            color: var(--bc-color-white) !important;
            font-size: 16px;
            line-height: 24px;
            .el-icon--right {
              color: var(--bc-color-white) !important;
            }
          }
        }
        .content-right {
          .router-header {
            .wrap {
              p {
                color: var(--bc-color-white) !important;
              }
            }
          }
          .line {
            display: block;
            height: 16px;
            border: 1px solid #fff;
          }
          .language {
            .el-input__inner {
              background: transparent;
              color: var(--bc-color-white);
            }
            .el-input__suffix {
              .el-select__caret {
                color: var(--bc-color-white);
              }
            }
          }
        }
      }
    }
  }
  .main-footer {
    border-top: 1px solid var(--bc-border-primary);
    padding: 0 24px;
  }
  .footer-right {
    span {
      cursor: pointer;
      color: var(--bc-theme-primary);
    }
    .suffix {
      .flag-usa {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 7px;
        display: block;
      }
      .flag-vn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 6px;
        display: block;
      }
    }
  }

  ::v-deep.main-content--market {
    .header-scroll {
      background-color: #fff;
      z-index: 3;
      border-bottom: 1px solid #d2d0ce;
      .logo-second {
        display: inline-flex !important;
      }
      .logo-main {
        display: none !important;
      }
      .header {
        .content-right {
          .icon-main {
            display: none;
          }
          .icon-second {
            display: inline-flex;
          }
        }
      }
    }
  }

  ::v-deep.layout-lynkey {
    .main-header {
      .select-language {
        .el-input {
          &__inner {
            color: #fff;
            background: transparent;
          }
          .el-input__suffix {
            &-inner {
              i {
                color: #fff;
              }
            }
          }
        }
      }
    }
    .header-scroll {
      .select-language {
        .el-input {
          &__inner {
            color: #000;
          }
          .el-input__suffix {
            &-inner {
              i {
                color: #000;
              }
            }
          }
        }
      }
    }
  }
</style>
