<template>
  <div class="container-lang">
    <div class="tokenomics" data-aos="zoom-in" data-aos-duration="2000">
      <div class="token-chart isPc">
        <img src="../../../assets/images/landing/NBcharts-PIE.png" alt="" />
      </div>
      <div class="about">
        <div class="fade-up1" data-aos="fade-up" data-aos-duration="3000">
          <h3 class="about-head">{{ $t('landing-ido.tokenomics-head') }}</h3>
          <h1 class="about-title">{{ $t('landing-ido.tokenomics-title') }}</h1>
          <div class="about-des">
            <p class="title-module">{{ $t('landing-ido.tokenomics-desc') }}</p>
          </div>
        </div>
        <div class="token-chart isMobile">
          <img src="../../../assets/images/landing/NBcharts-PIE.png" alt="" />
        </div>
        <div class="change-padding-mobile" :class="getMobileOperatingSystem() === 'iOS' ? 'change-padding-mobile-iphone' : null">
          <p v-for="(item, id) in tokenAllocation" :key="id" style="cursor: pointer" @click="handleOpenTab(item.code)">
            {{ item.name }}<span class="isCodePC">:</span> <span class="code isCodePC"> {{ item.code }}</span
            ><span class="code code-mobile isCodeMobile">{{ item.codeMobile }}</span>
          </p>
        </div>
        <div class="stats fade-up2" data-aos="fade-down" data-aos-duration="3000">
          <div class="standard">
            <p class="stats-title">{{ $t('landing-ido.tokenomics-stats-standard') }}</p>
            <h1 class="stats-des">ERC-20</h1>
            <p class="stats-title isHiddenPc" style="margin-top: 8px; cursor: pointer" @click="handleOpenContract">Smart Contract</p>
          </div>
          <div class="total">
            <p class="stats-title">{{ $t('landing-ido.tokenomics-stats-total') }}</p>
            <h1 class="stats-des">1B <span>LYNK</span></h1>
            <p class="stats-title isHiddenPc" style="margin-top: 8px; color: #2e89ff; cursor: pointer" @click="handleOpenContract">0x234...sdf34</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LandingTokenomics',
    data() {
      return {
        tokenAllocation: [
          {
            id: 1,
            name: this.$i18n.t('landing-ido.tokenomics-allocation-crowdsale'),
            code: '0x07188d46b305b8183f0c7fa204a7bcbb6c2e59e9',
            codeMobile: '0x071...e59e9   '
          },
          {
            id: 2,
            name: this.$i18n.t('landing-ido.tokenomics-allocation-ecosystem'),
            code: '0x9968c39f7d8ea29648203a6043ca1eef51c4e509',
            codeMobile: '0x996...4e509   '
          },
          {
            id: 3,
            name: this.$i18n.t('landing-ido.tokenomics-allocation-staking'),
            code: '0xfee25971dc356ace41ff004fd2c8661a5b87c177',
            codeMobile: '0xfee...7c177   '
          },
          {
            id: 4,
            name: this.$i18n.t('landing-ido.tokenomics-allocation-reserve'),
            code: '0x261f04b695361672210d6f02ad0dc0a371bb4b1c',
            codeMobile: '0x261...b4b1c   '
          },
          {
            id: 5,
            name: this.$i18n.t('landing-ido.tokenomics-allocation-team'),
            code: '0x4eac98e2f866830440b7e5fa4e3e78ce0a8516d9',
            codeMobile: '0x4ea...516d9   '
          },
          {
            id: 6,
            name: this.$i18n.t('landing-ido.tokenomics-allocation-partner'),
            code: '0x611a909ab6218046872a0438e29f80d067a42d42',
            codeMobile: '0x611...42d42   '
          } 
        ]
      }
    },
    methods: {
      handleOpenTab(code) {
        console.log('code', code)
        window.open(`https://etherscan.io/address/${code}`, '_blank')
      },
      handleOpenContract() {
        window.open(`https://etherscan.io/address/0xef952363c1d990a2fa58f8b379a9fa33bad1dfd1`, '_blank')
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
  h1 {
    font-family: archivo-expanded;
  }

  .tokenomics {
    padding-top: 156px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .token-chart {
      max-width: 703px;
      width: 100%;
      img {
        width: 100%;
      }
    }

    .about {
      color: white;
      max-width: 600px;
      width: 100%;
      margin-left: 20px;
      text-align: left;
      &-head {
        font-size: 18px;
        line-height: 150%;
        font-weight: 400;
        margin-bottom: 12px;
      }
      &-title {
        font-size: 36px;
        line-height: 44px;
        margin-bottom: 24px;
        font-weight: 600;
      }
      &-des {
        font-size: 20px;
        line-height: 30px;
        font-weight: 400;
        margin-bottom: 60px;
        opacity: 0.8;
      }
      .fade-up1 {
        transform: translate3d(0, 20px, 0);
      }
      .fade-up2 {
        transform: translate3d(0, -20px, 0);
      }
      p {
        font-size: 20px;
        line-height: 30px;
        font-weight: 600;
        margin-bottom: 8px;
        display: flex;
        span {
          font-weight: 400;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
      .code {
        color: #2e89ff;
        // width: 90px;
      }
      .title-module {
        margin-bottom: 32px;
        display: block;
      }
      .isHiddenPc {
        display: none;
      }
    }
    .stats {
      color: white;
      display: flex;
      align-items: center;
      margin-top: 60px;
      &-title {
        font-size: 20px;
        line-height: 30px;
        font-weight: 400;
        opacity: 0.8;
        margin-bottom: 8px;
      }
      &-des {
        font-size: 36px;
        font-weight: 600;
        background: -webkit-linear-gradient(#9c27b0, #0ba5ec);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .standard {
        margin-right: 106px;
      }
      .total {
        span {
          font-size: 20px;
        }
      }
    }
    span.isCodePC:first-child {
      margin-left: 0px;
    }
    .isCodePC {
      margin-left: 8px;
    }
    .isPc,
    .isCodePC {
      display: block;
    }
    .isMobile,
    .isCodeMobile {
      display: none;
    }

    @media (max-width: 1024px) {
      flex-direction: column-reverse;
      padding-top: 80px;
      .token-chart {
        margin-bottom: 24px;
      }
      .about {
        margin-left: 0;
        text-align: center;
      }
      .isPc {
        display: none;
      }
      .isMobile {
        display: block;
      }
      .stats {
        margin-top: 28px;
        justify-content: space-between;
      }
    }
    @media (max-width: 767px) {
      .code-mobile {
        width: 90px;
        max-width: 100%;
        text-align: left;
      }

      .change-padding-mobile {
        padding-right: 14px;
      }
      .change-padding-mobile-iphone {
        padding-right: 19px;
      }
      .about {
        text-align: left;
        &-head {
          font-size: 14px;
          line-height: 150%;
          margin-bottom: 4px;
        }
        &-title {
          font-size: 24px;
          line-height: 32px;
          margin-bottom: 24px;
        }
        &-des {
          font-size: 14px;
          line-height: 21px;
          margin-bottom: 24px;
          opacity: 0.8;
        }
        p {
          font-size: 14px;
          line-height: 22px;
          font-weight: 700;
          margin-bottom: 8px;
          display: flex;
          color: #ffffffcc;

          span {
            font-weight: 400;
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
        p {
          justify-content: space-between;
        }
        .isHiddenPc {
          display: block;
        }
      }
      .stats {
        &-title {
          font-size: 12px;
          line-height: 18px;
        }
        &-des {
          font-size: 20px;
          line-height: 30px;
        }
      }
      .isCodePC {
        display: none;
      }
      .isCodeMobile {
        display: block;
      }
    }
  }
</style>
