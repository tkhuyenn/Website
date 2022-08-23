<template>
  <div class="wrap-download-app">
    <HeaderLogin />
    <!-- <div class="main-header" :class="isScroll ? 'header-scroll' : null">
      <MainHeader class="header-website" />
    </div> -->
    <div v-if="coinMain === 'LYNK'" class="download back-blue">
      <!-- <div class="back-linear" style="color: #fff">1211111</div> -->
      <div class="content">
        <div class="content-right">
          <div class="title-desktop title-1">
            <div class="title-folder">
              <div class="title-folder-center title-download">Explore LynKey Marketplace</div>
              <div class="title-des">
                Start the day with coffee,
                <p>End the day with NFTs</p>
              </div>
              <div class="line"></div>
            </div>
          </div>
          <div class="btn-download">
            <div>
              <a :href="urlSystem['system.token.app.ios.download']" target="_blank" class="btn-download-style">
                <img src="../../assets/image/appstore.png" alt="" />
              </a>
            </div>
            <div style="margin-top: 24px">
              <a :href="urlSystem['system.token.app.android.download']" target="_blank" class="btn-download-style">
                <img src="../../assets/image/chplay.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="coinMain === 'CLM'" class="download1">
      <div class="content-right1">
        <div class="title-desktop title-1">
          <div class="title-folder">
            <div class="title-folder-center style-down1">Explore Marketplace</div>
            <div class="title-des1">Start the day with coffee, End the day with NFTs</div>
          </div>
        </div>
        <div class="btn-download">
          <div>
            <a :href="urlSystem['system.token.app.ios.download']" target="_blank" class="btn-download-style">
              <img src="../../assets/image/App Store - eng.png" alt="" />
            </a>
          </div>
          <div style="margin-top: 24px">
            <a :href="urlSystem['system.token.app.android.download']" target="_blank" class="btn-download-style">
              <img src="../../assets/image/Google Play - eng.png" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import HeaderLogin from '@/modules/auth/components/HeaderLogin.vue'
  const bcAuth = namespace('beAuth')
  const beBase = namespace('beBase')

  @Component({ components: { HeaderLogin } })
  export default class DownloadApp extends Vue {
    @bcAuth.Getter('isLogin') isLogin!: boolean
    @bcAuth.Action('logout') logout!: () => Promise<any>
    @beBase.State('urlSystem') urlSystem!: Record<string, any>
    @beBase.State('coinMain') coinMain!: string

    mounted(): void {
      window.scrollTo(0, 0)
      if (this.isLogin) {
        this.logout()
      }
    }
    
  }
</script>

<style lang="scss" scoped>
  .wrap-download-app {
    overflow: hidden;
    height: 100vh;
  }
  // .back-linear {
  //   background: url('../../assets/images/landing/back-pink.png');
  //   background-repeat: no-repeat;
  //   background-position-y: center;
  //   background-position-x: right;
  // }
  .back-blue {
    background: url('../../assets/images/landing/back-blue-left.png');
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: left;
    // position: relative;
    // @media (max-width: 1366px) {
    //   background: url('../../assets/images/landing/back-blue-small.png');
    //   background-position-y: 750px;
    //   background-repeat: no-repeat;
    //   background-position-x: left;
    // }
    // @media (min-width: 740px) and (max-width: 1024px) {
    //   background-position-y: 500px;
    // }
  }
  .download {
    // margin-top: 70px;
    height: calc(100vh - 70px);
    background-color: #101828;
    // background-repeat: no-repeat;
    // background-size: cover;
    // position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    padding-top: 40px;
    display: flex;
    justify-content: center;
    position: relative;
    .back-linear {
      position: absolute;
      background: url('../../assets/images/landing/back-pink.png');
      background-repeat: no-repeat;
      background-position-y: center;
      background-position-x: right;
      top: 100px;
      right: 100px;
    }
    .content {
      border-bottom: 1px solid;
      border-top: 1px solid;
      border-left: 1px solid;
      border-right: 1px solid;
      border-image-source: linear-gradient(91.13deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 52.6%, rgba(255, 255, 255, 0.3) 100%);
      border-image-slice: 1;

      width: 327px;
      height: 391px;
      padding: 36px;
      background: rgba(0, 0, 0, 0.6);
      .title-folder {
        position: relative;
        .title-download {
          font-size: 24px;
          line-height: 32px;
          color: #fff;
        }
        .title-des {
          color: #fff;
          margin-top: 24px;
          font-size: 14px;
          line-height: 21px;
          font-weight: 400;
          margin-bottom: 24px;
          opacity: 0.8;
        }
        .line {
          margin: 0 auto;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 51.04%, rgba(255, 255, 255, 0) 100%);
          width: 255px;
          height: 1px;
          margin-bottom: 24px;
        }
      }
      .style-down {
        color: #151718;
        font-size: 24px;
        line-height: 28.8px;
        font-weight: 600;
      }
    }
  }
   .content-right {
    text-align: center;
  }
  .download1 {
    // margin-top: 70px;
    height: calc(100vh - 70px);
    background: #F6F8FC;
    background-repeat: no-repeat;
    background-size: cover;
    // position: fixed;
    color: #151718;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    padding-top: 40px;
    .title-des1 {
      color: #151718;
      margin-top: 12px;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 40px;
      width: 200px;
      flex-wrap: wrap;
      display: inline-block;
      line-height: 1.5;
    }
    .style-down1 {
      color: #3FBDBC;
      font-weight: 600;
      font-size: 32px;
      line-height: 40px;
    }
  }
</style>
