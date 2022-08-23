<template>
  <div class="trading" id="exchange">
    <div class="container-lang trading-container">
      <div class="trading-content" data-aos="fade-right" data-aos-duration="2000">
        <h1>{{$t('landing-ido.exchange_lyn-ex')}}</h1>
        <p>
          {{$t('landing-ido.exchange_p')}}
        </p>
        <div class="contract-container">
          <div class="title" @click="handleOpenTabUniswap">
            <div class="wrap1"><img src="../../../assets/images/landing/logo-uniswap.png" alt="" style="width: 24px" /> {{$t('landing-ido.exchange_uniswap')}}:</div>
            <span class="is-pc"> https://info.uniswap.org/#/pools/0x927...963e9 </span>
            <div class="is-mobile">info.uniswap.org/#/pools/0x927...963e9</div>
          </div>
        </div>
        <div class="trading-btn button">
          <span>{{$t('landing-ido.exchange_go-ex')}}</span>
          <img src="../../../assets/images/landing/fi_arrow-right.png" alt="" />
        </div>
      </div>
      <div class="trading-image" data-aos="fade-left" data-aos-duration="2000">
        <img src="../../../assets/images/landing/mk1 copy 2.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LandingExchange',
    methods: {
      handleOpenTabUniswap() {
        window.open(`https://info.uniswap.org/#/pools/0x9275e26bfb23b18bebb07bff45e85110f60963e9`, '_blank')
      }
    }
  }
</script>

<style lang="scss" scoped>
  #exchange {
    scroll-margin-top: 100px;
  }
  .contract-container {
    display: flex;
    align-items: center;
    // line-height: 50px;
    justify-content: space-between;
    color: #d0d5dd;
    transition: 0.5s;
    font-family: archivo-expanded;
    .title {
      font-size: 16px;
      line-height: 30px;
    }
    .wrap1 {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .title:last-child {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        margin-right: 4px;
      }
    }

    .is-pc {
      display: inline-block;
      margin-left: 4px;
      color: #2e89ff;
    }
    .is-mobile {
      display: none;
      color: #2e89ff;
    }
    @media (max-width: 850px) {
      font-size: 14px;
      .title {
        font-size: 14px;
        line-height: 30px;
      }
    }
    @media (max-width: 767px) {
      font-size: 14px;
      line-height: unset;
      .is-pc {
        display: none;
      }
      .is-mobile {
        display: inline-block;
      }
    }
    @media (max-width: 500px) {
      .title {
        display: flex;
        flex-direction: column;
        align-items: flex-start !important;
        justify-content: center;
      }
    }
    @media (max-width: 370px) {
      font-size: 14px;
      line-height: 20px;
    }
    .title {
      cursor: pointer;
      @media (max-width: 767px) {
        margin: unset;
      }
    }
    span {
      color: #fff;
      text-decoration: underline;
      cursor: pointer;
    }
    .btn-close {
      @media (max-width: 767px) {
        img {
          width: 10px;
        }
      }
    }
  }
  .trading-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .trading-image {
      max-width: 708px;
      width: 100%;
      img {
        width: 100%;
      }
    }
    .trading-content {
      text-align: left;
      max-width: 588px;
      width: 100%;
    }
  }
  .trading-btn {
    width: 218px;
  }

  .trading {
    padding-top: 72px;
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
    // display: flex;
    display: none;
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
    .trading {
      padding-top: 60px;
    }
    .trading-container {
      flex-direction: column-reverse;
      .trading-content {
        margin-top: 24px;
        text-align: center;
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
