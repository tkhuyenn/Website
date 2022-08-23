<template>
  <div id="download-app">
    <div class="container">
      <div class="download-app">
        <div class="img-download">
          <img src="../../../../assets/images/market/iphonex_mockup_white-1.png" />
        </div>
        <div class="content-download">
          <div class="title-header">
            <p class="title1">{{ $t('market-home.download-app.get-app') }}</p>
            <p class="title2">{{ $t('market-home.download-app.download-on-mobile') }}</p>
            <p class="title3">{{ $t('market-home.download-app.mobile-device') }}</p>
          </div>
          <div class="QR-code">
            <div class="store-download">
              <div class="app-store">
                <a :href="urlSystem['system.token.app.ios.download']" target="_blank">
                  <img src="../../../../assets/images/market/app-store.png" />
                </a>
              </div>
              <div>
                <a :href="urlSystem['system.token.app.android.download']" target="_blank">
                  <img src="../../../../assets/images/market/google-play.png" />
                </a>
              </div>
            </div>
            <div class="QR">
              <!--              <img src="../../../../assets/images/market/QR.png" />-->
              <qrcode-vue :value="urlSystem['system.token.app.download']" size="160" level="H"></qrcode-vue>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import QrcodeVue from 'qrcode.vue'
  import { namespace } from 'vuex-class'
  const beBase = namespace('beBase')
  @Component({ components: { QrcodeVue } })
  export default class DownloadApp extends Vue {
    @beBase.State('urlSystem') urlSystem!: Record<string, any>
  }
</script>
<style scoped lang="scss">
  #download-app {
    background: #faf6f1;
    padding-top: 160px;
    padding-bottom: 80px;

    .download-app {
      background-image: url('../../../../assets/images/market/Background-download-app.jpg');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      border-radius: 32px;
      overflow: hidden;
      display: flex;
      align-items: center;
      .img-download {
        margin-bottom: -10px;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .content-download {
        .title-header {
          .title1,
          .title3 {
            font-family: Open Sans;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 24px;
            text-align: center;
            color: #ffffff;
            opacity: 0.7;
          }

          .title2 {
            max-width: 580px;
            font-family: Open Sans;
            font-style: normal;
            font-weight: 600;
            font-size: 48px;
            line-height: 64px;
            text-align: center;
            color: #ffffff;
            margin-bottom: 8px;
          }
        }

        .QR-code {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 80px;
          padding: 0 40px;
          .store-download {
            .app-store {
              margin-bottom: 40px;
            }
            img {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
</style>
