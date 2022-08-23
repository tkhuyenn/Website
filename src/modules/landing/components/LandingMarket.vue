<template>
  <div class="marketplace" id="marketplace">
    <div class="container-lang marketplace-container">
      <div class="mrkt-image" data-aos="fade-right" data-aos-duration="2000">
        <img src="./../../../assets/images/landing/mk1 copy 1.png" alt="" />
      </div>
      <div class="mrkt-content" data-aos="fade-zoom-in" data-aos-duration="3000">
        <h1>{{ $t('landing-ido.market-title') }}</h1>
        <p>
          {{ $t('landing-ido.market-description') }}
        </p>
        <div @click="handleMaket" class="mrkt-btn button">
          <span>{{ $t('landing-ido.market-button') }}</span>
          <img src="./../../../assets/images/landing/fi_arrow-right.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LandingMarket',
    methods: {
      handleMaket() {
        this.$router.push({ name: 'MarketPlace' })
        // if (window.innerWidth < 1250) {
        //   this.$router.push({ name: 'download-app-ido' })
        //   if (this.getMobileOperatingSystem() === 'Android') {
        //     window.open('https://play.google.com/store/apps/details?id=vn.beedu.blockchain')
        //   }
        //   if (this.getMobileOperatingSystem() === 'iOS') {
        //     window.open('https://apps.apple.com/us/app/lynkey/id1591160349')
        //   }
        // } else {
        //   this.$router.push({ name: 'MarketPlace' })
        // }
      },
      getMobileOperatingSystem() {
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
    }
  }
</script>

<style lang="scss" scoped>
  .marketplace {
    // scroll-margin-top: 100px;
    padding-top: 156px;
  }
  .marketplace-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .mrkt-image {
      max-width: 708px;
      width: 100%;
      img {
        width: 100%;
      }
    }
    .mrkt-content {
      text-align: left;
      max-width: 588px;
      width: 100%;
    }
  }
  .mrkt-btn {
    width: 245px;
    text-decoration: none;
  }
  p {
    color: white;
    opacity: 0.8;
    margin: 36px 0;
    font-size: 20px;
    line-height: 30px;
    font-weight: 400;
  }
  h1 {
    color: white;
    font-size: 36px;
    line-height: 44px;
    font-family: archivo-expanded;
  }
  .button {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    background: linear-gradient(63.44deg, #9c27b0 16.72%, #0ba5ec 83.39%);
    border-radius: 24px;
    span {
      margin-right: 21px;
      color: white;
      font-size: 14px;
    }
  }

  @media (max-width: 1024px) {
    .marketplace {
      padding-top: 0px;
    }
    .marketplace-container {
      flex-direction: column;
      padding: 60px 24px 0 24px;
      .mrkt-content {
        margin-top: -10px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }

  @media (max-width: 767px) {
    h1 {
      font-size: 24px;
      line-height: 32px;
    }
    p {
      font-size: 14px;
      line-height: 21px;
      margin: 24px 0;
    }
  }
</style>
