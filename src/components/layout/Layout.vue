<template>
  <el-container class="main-layout" :class="isLoading ? 'be-flex-center' : null">
    <transition name="el-fade-in-linear">
      <base-page-loading v-if="isLoading" />
    </transition>
    <!-- <el-aside v-if="!isLoading" class="sidebar-left" style="width: 80px">
      <main-sidebar />
    </el-aside> -->
    <el-container v-if="!isLoading" class="main-content">
      <el-header class="be-flex main-header" style="height: 70px">
        <div class="be-flex-item">
          <main-header />
        </div>
      </el-header>
      <el-main class="main-center">
        <router-view />
      </el-main>
      <el-footer class="be-flex align-center jc-space-between main-footer">
        <div class="footer-left">
          <span class="d-ib mr-24 cursor text-hyperlink" @click="handleClickTerm">{{ $t('footer.terms') }}</span>
          <span style="color: #5b616e">{{ urlSystem['system.token.company.address'] }}</span>
        </div>

        <div v-if="contractAddress" class="footer-right">
          Smart Contract (ERC-20):
          <span class="text-hyperlink" @click="handleOpenTab">{{ contractAddress | formatTransactionCode(5, 5) }}</span>
          <!-- <el-select v-model="selectLanguage" @change="handleChangeLanguage" class="select-language" popper-class="select-language-dropdown">
            <el-option :label="`${$t('login.en')}`" value="en">
              <template>
                <div class="be-flex flag">
                  <base-icon icon="flag-usa" size="14" style="margin-right: 4px" />
                  <span class="lang">{{ $t('login.en') }}</span>
                </div>
              </template>
            </el-option>
            <el-option :label="`${$t('login.vi')}`" value="vi">
              <template>
                <div class="be-flex flag">
                  <base-icon icon="flag-vn" size="19" style="margin-right: 4px; margin-left: -2px" />
                  <span class="lang" style="margin-left: 1px">{{ $t('login.vi') }}</span>
                </div>
              </template>
            </el-option>
            <div class="suffix" slot="prefix">
              <base-icon v-if="getIcon === 'flag-usa'" class="flag-usa" :icon="getIcon" size="14" />
              <base-icon v-else class="flag-vn" :icon="getIcon" size="19" />
            </div>
          </el-select> -->
          <!-- <span>{{ $t('footer.help') }}</span> -->
        </div>
      </el-footer>
    </el-container>
  </el-container>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import MainSidebar from '../sidebar/MainSidebar.vue'
  import MainHeader from '../header/MainHeader.vue'
  import BasePageLoading from '../page-loading/BasePageLoading.vue'
  import { namespace } from 'vuex-class'
  import EventBus from '@/utils/eventBus'
  import getRepository from '@/services'
  import ParamsRepository from '@/services/repositories/params'
  import NftRepository from '@/services/repositories/nft'

  const apiParams: ParamsRepository = getRepository('params')
  const apiNft: NftRepository = getRepository('nft')

  import firebase from '@/utils/firebase'
  import { filter } from 'lodash'

  const bcAuth = namespace('beAuth')
  const beBase = namespace('beBase')

  @Component({
    components: { MainSidebar, MainHeader, BasePageLoading }
  })
  export default class Layout extends Vue {
    @bcAuth.Action('getInfo') getInfo!: () => Promise<any>
    @bcAuth.Action('logout') logout!: () => Promise<any>
    @beBase.State('urlSystem') urlSystem!: Record<string, any>
    @beBase.State('coinMain') coinMain!: string
    @bcAuth.Action('setConfigModule') setConfigModule!: (data: Record<string, any>) => void
    @bcAuth.State('walletAddress') walletAddress!: string
    @bcAuth.Mutation('SET_INFO') setInfo!: (info: Record<string, any>) => Promise<any>
    // @bcWallet.Mutation('SET_STATUS_SCREEN') setStatusScreen!: (status: boolean) => void
    @beBase.Mutation('SET_STATUS_SCREEN') setStatusScreen!: (status: boolean) => void
    // apiUser?: UserRepository
    isLoading = false
    selectLanguage = ''
    timing: any = null

    refAssetNetwork: any = null
    listAssetNetwork: Array<Record<string, any>> = []

    async created(): Promise<void> {
      try {
        this.isLoading = true
        this.selectLanguage = window.localStorage.getItem('bc-lang')!
        if (this.walletAddress) {
          const info = await apiNft.getInfoExternalUser()
          this.setInfo(info.data)
        } else {
          await this.getInfo()
        }
        const result = await apiParams.getConfigModule()
        this.setConfigModule(result)
        await this.handleSignInFireBase()
        await this.handleGetAssetNetwork()
        this.timing = setInterval(() => {
          this.handleSignInFireBase()
        }, 3600000)
        setTimeout(() => {
          this.isLoading = false
        }, 500)
        if (window.innerWidth > 1200) {
          this.setStatusScreen(true)
        } else {
          this.setStatusScreen(false)
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

    mounted(): void {
      setTimeout(() => {
        this.hideChatBox()
      }, 1000)
    }

    destroyed(): void {
      clearInterval(this.timing)
      const refAssetNetwork = firebase.database().ref('asset_networks')
      refAssetNetwork.off('value', this.refAssetNetwork)
    }

    get getIcon(): string {
      return this.selectLanguage === 'vi' ? 'flag-vn' : 'flag-usa'
    }

    get contractAddress(): string {
      if (this.listAssetNetwork.length) {
        const tokenLynk = filter(this.listAssetNetwork, token => token.currency === this.coinMain)[0]
        return tokenLynk.contractAddress
      }
      return ''
    }

    handleOpenTab(): void {
      window.open(`https://etherscan.io/address/${this.contractAddress}`, '_blank')
    }

    hideChatBox(): void {
      const routeName = this.$route.name!
      const elm = document.querySelector('[role="presentation"]') as HTMLElement
      if (elm) {
        if (routeName !== 'home') {
          elm!.style.display = 'none'
        } else {
          elm!.style.display = 'block'
        }
      } else {
        this.hideChatBox()
      }
    }

    async handleGetAssetNetwork(): Promise<void> {
      try {
        const refAssetNetwork = firebase.database().ref('asset_networks')
        this.refAssetNetwork = refAssetNetwork.on('value', snapshot => {
          this.listAssetNetwork = snapshot.val()
        })
        return Promise.resolve()
      } catch (error) {
        return Promise.reject()
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

    handleChangeLanguage(lang: string): void {
      this.$i18n.locale = lang
      window.localStorage.setItem('bc-lang', lang)
      EventBus.$emit('changeLang', lang)
      location.reload()
    }

    handleClickTerm(): void {
      window.open(`${this.urlSystem['system.token.terms']}`)
    }
  }
</script>
<style lang="scss" scoped>
  .main-layout {
    position: relative;
    height: 100vh;
    .sidebar-left {
      border-right: 1px solid #ccc;
      height: 100%;
      overflow: hidden;
      background-color: #e9e9e9;
      position: relative;
    }
    .main-content {
      .main-header {
        border-bottom: 1px solid #d2d0ce;
        padding: 0px;
      }
      .main-center {
        overflow-x: hidden;
        overflow-y: scroll;
        padding: 24px 24px 0 24px;
        background-color: #f6f8fc;
      }
    }
    .sidebar-right {
      padding-top: 15px;
      border-left: 1px solid hsl(0deg 0% 100% / 10%);
      overflow: hidden;
    }
  }
  .show-player {
    .sidebar-left {
      height: calc(100vh - 90px);
    }
    .main-content {
      height: calc(100vh - 90px);
    }
    .sidebar-right {
      height: calc(100vh - 90px);
    }
  }
  .main-footer {
    border-top: 1px solid var(--bc-border-primary);
    padding: 0 24px;
  }
  .footer-right {
    // margin-right: 67px;
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
  @media screen and (max-width: 768px) {
    .main-layout {
      .main-content {
        .main-center {
          padding: 20px 20px 0 20px;
        }
      }
    }
  }
</style>
