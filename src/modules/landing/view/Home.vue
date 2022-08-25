<template>
  <div class="home-lang be-home-scroll">
    <LandingMenu @click="handleClick" @hidden-contract="handlecontract" />
    <!-- <landing-banner class="banner-pri" :class="{ 'banner-change': changeContract }" /> -->
    <div class="back-asset">
      <Home style="margin-top: 40px" />
    </div>
    <div class="back-asset">
      <!-- <landing-ecosystem ref="ecosystem" />
      <landing-product ref="product" />
      <LandingMarket ref="marketplace" />
      <LandingExchange ref="exchange" /> -->
    </div>
    <!-- <LandingTokenomics ref="token" />
    <LandingFundRaising v-if="show" /> -->
    <!-- <div class="back-blue"> -->
    <!-- <LangdingVesting /> -->
    <!-- </div> -->
    <!-- <LandingRoadMap ref="roadmap" />
    <landing-about ref="docs" />
    <LandingBoard ref="team" />
    <LandingExecutive />
    <LandingAdvisors />
    <LandingAmbassador />
    <LandingPartners ref="partner" />
    <LandingMedia v-if="show" ref="media" />
    <LandingFAQ ref="faqs" /> -->
    <landing-footer class="footer" />

    <div id="backtop" @click="toTop" v-show="scY > 300">
      <div class="icon-backtop">
        <img src="../../../assets/images/landing/backTop.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
  import LandingBanner from '../components/LandingBanner.vue'
  import LandingEcosystem from '../components/LandingEcosystem.vue'
  import LandingProduct from '../components/LandingProduct.vue'
  import LandingAbout from '../components/LandingAbout.vue'
  import LandingFAQ from '../components/LandingFAQ.vue'
  import LandingFooter from '../components/LandingFooter.vue'
  import LandingMedia from '../components/LandingMedia.vue'
  import LandingPartners from '../components/LandingPartners.vue'
  import LandingExecutive from '../components/LandingExecutive.vue'
  import LandingBoard from '../components/LandingBoard.vue'
  import Home from '../components/Home.vue'
  import LandingMarket from '../components/LandingMarket.vue'
  import LangdingVesting from '../components/LandingVesting.vue'
  import LandingTokenomics from '../components/LandingTokenomics.vue'
  import LandingFundRaising from '../components/LandingFundRaising.vue'
  import LandingRoadMap from '../components/LandingRoadMap.vue'
  import LandingAdvisors from '../components/LandingAdvisors.vue'
  import LandingMenu from '../components/LandingMenu.vue'
  import LandingExchange from '../components/LandingExchange.vue'
  import LandingAmbassador from '../components/LandingAmbassador.vue'
  import firebase from '@/utils/firebase'
  import JSEncrypt from 'jsencrypt'
  import request from '@/plugins/request'
  import AOS from 'aos'
  import 'aos/dist/aos.css'

  export default {
    name: 'HomeLanding',
    components: {
      // LandingBanner,
      // LandingEcosystem,
      // LandingProduct,
      // LangdingVesting,
      // LandingBoard,
      Home,
      // LandingAdvisors,
      // LandingPartners,
      // LandingMedia,
      // LandingExecutive,
      // LandingAbout,
      // LandingFAQ,
      LandingFooter,
      // LandingMarket,
      // LandingTokenomics,
      // LandingFundRaising,
      // LandingRoadMap,
      LandingMenu
      // LandingExchange,
      // LandingAmbassador
    },
    data() {
      return {
        scTimer: 0,
        scY: 0,
        show: false,
        changeContract: false
      }
    },
    methods: {
      handleClick(name) {
        this.$refs[`${name}`].$el.scrollIntoView({ behavior: 'smooth' })
      },
      handleScroll: function () {
        if (this.scTimer) return
        this.scTimer = setTimeout(() => {
          this.scY = window.scrollY
          clearTimeout(this.scTimer)
          this.scTimer = 0
        }, 100)
      },
      toTop: function () {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      },
      async handleSignInFireBase() {
        try {
          const data = {
            password: this.encryptPassword('#!@Firebase-web-client@!#')
          }
          const result = await this.getToken(data)
          await firebase.auth().signInWithCustomToken(result.authToken)
        } catch (error) {
          console.log(error)
        }
      },
      encryptPassword(pass) {
        const PUBLIC_KEY =
          'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCgw0IeOV0DZL1ZfzsSSbZDRu9XPPBkb4EVsFKYODFJnEEMdVK3IBhCyehoUbJFufIvdQD78LyfRo46fB5B6k+EsLC/4vofQiYyE/R13r+Fd+xufTXpxDKkj544LtfBfvsh/fYFx+vUH1/5XtuCplBX4cOsIdMni026zZv46clJswIDAQAB'
        const RSAEncrypt = new JSEncrypt()
        RSAEncrypt.setPublicKey(PUBLIC_KEY)
        return RSAEncrypt.encrypt(pass)
      },
      async getToken(data) {
        try {
          const result = await request.post('api/v1/firebase/auth', data)
          return Promise.resolve(result.data.data)
        } catch (error) {
          return Promise.reject(error)
        }
      },
      handlecontract() {
        this.changeContract = true
      }
    },
    async created() {
      await this.handleSignInFireBase()
      this.show = true
      AOS.init()
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
      const query = this.$route.query.id
      this.$nextTick(() => {
        if (query) {
          setTimeout(() => {
            this.$refs[`${query}`].$el.scrollIntoView({ behavior: 'smooth' })
          }, 3000)
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  @font-face {
    font-family: archivo-expanded;
    src: url('../../../assets/font/ArchivoExpanded-SemiBold.otf');
  }
  .home-lang {
    * {
      font-family: 'Archivo', sans-serif;
      scroll-behavior: smooth;
    }
    background: #101828;
    overflow: hidden;
    max-width: 1903px;
    width: 100%;
    .banner-pri {
      margin-top: 98px;
      // margin-top: 96px;
      @media (max-width: 1330px) {
        margin-top: 60px;
      }
    }
    .banner-change {
      margin-top: 96px;
      @media (max-width: 1330px) {
        margin-top: 60px;
      }
    }
    .back-linear {
      background: url('../../../assets/images/landing/back-purple.png');
      background-repeat: no-repeat;
      background-position-y: center;
      background-position-x: right;
    }
    .back-asset {
      background: #fff;
      background-repeat: no-repeat;
      padding-bottom: 20px;
      // background-position-y: bottom;
      // background-position-x: right;
    }
    .back-blue {
      background: url('../../../assets/images/landing/back-blue-left.png');
      background-repeat: no-repeat;
      background-position-y: 900px;
      background-position-x: left;
      position: relative;
      @media (max-width: 1366px) {
        background: url('../../../assets/images/landing/back-blue-small.png');
        background-position-y: 750px;
        background-repeat: no-repeat;
        background-position-x: left;
      }
      @media (min-width: 740px) and (max-width: 1024px) {
        background-position-y: 500px;
      }
    }
  }
  #backtop {
    position: fixed;
    bottom: 100px;
    right: 14px;
    height: auto;
    z-index: 900;
    cursor: pointer;
  }
</style>
