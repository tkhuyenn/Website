<template>
  <div class="menu-landing-page">
    <!-- <div class="contract-container" v-if="showContract">
      <div class="sack-coin">
        <div class="title" @click="handleOpenTab">
          {{ $t('landing-ido.menu-title') }}: <span class="is-pc"> 0xef952363C1d990A2fa58F8b379A9fa33bad1dfd1</span> <span class="is-mobile">0xef9...1dfd1</span>
        </div>
        <div class="title" @click="handleOpenTabUniswap">
          <img src="../../../assets/images/landing/logo-uniswap.png" style="width: 24px" alt="" />
          <p class="is-pc">Uniswap:</p>
          <span class="is-pc" style="margin-left: 6px"> https://info.uniswap.org/#/pools/0x9275e26bfb23b18bebb07bff45e85110f60963e9 </span>
          <span class="is-mobile" style="margin-left: 3px">info.uniswap.org/#/pools/0x927...963e9</span>
        </div>
      </div>
      <div class="btn-close" @click="handleContract"><img src="../../../assets/images/landing/close-contract.png" alt="" /></div>
    </div> -->
    <div class="menu-container">
      <div class="menu-logo">
        <a class="navbar-brand" href="#">
          <img src="../../../icons/png/LOGO - CĐTT.png" alt="Logo" class="style-logo style-logo--scroll" />
        </a>
        <span class="title" style="color: black; text-decoration: none">CÔNG VINH</span>
      </div>

      <div class="menu-mobile">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
      </div>
      <div class="be-flex search-input">
        <el-form>
          <el-form-item class="mb-0">
            <el-input v-model="search" class="input-search" :placeholder="$t('placeholder.search-property')">
              <span slot="prefix" class="prefix-search">
                <base-icon icon="icon-search" class="d-iflex" size="24" />
              </span>
            </el-input>
          </el-form-item>
        </el-form>

        <button type="button" class="header-6 text-semibold text-white is-none-border cursor btn-market-search" @click="handleSearchProject">
          {{ $t('market-home.form.search') }}
        </button>
      </div>
      <ul class="sack-item" :class="{ 'sack-item-no-contract': !showContract }">
        <!-- <li class="menu-item li-item" @click="handleClick('ecosystem')">
          <div class="menu-link">
            {{ $t('landing-ido.menu_ecosystem') }}
            <i class="sack-menu-effect"></i>
          </div>
        </li> -->
        <!-- <li class="menu-item li-item" @click="handleClick('product')">
          <div class="menu-link">
            {{ $t('landing-ido.menu-product') }}
            <i class="sack-menu-effect"></i>
          </div>
        </li> -->
        <!-- <li class="menu-item li-item" @click="handleClick('marketplace')">
          <div class="menu-link">
            <span>{{ $t('landing-ido.menu-marketplace') }}</span>
            <i class="sack-menu-effect"></i>
          </div>
        </li> -->
        <!-- <li class="menu-item li-item" @click="handleClick('exchange')">
          <div class="menu-link">
            {{ $t('landing-ido.menu-exchange') }}
            <i class="sack-menu-effect"></i>
          </div>
        </li> -->
        <!-- <li class="menu-item li-item" @click="handleClick('token')">
          <div class="menu-link">
            {{ $t('landing-ido.menu-token') }}
            <i class="sack-menu-effect"></i>
          </div>
        </li> -->
        <li class="menu-item li-item" @click="handleClick('roadmap')">
          <div class="menu-link">
            <base-icon icon="noti"></base-icon>
            Thông báo
            <i class="sack-menu-effect"></i>
          </div>
        </li>
        <li class="menu-item li-item" @click="handleClick('docs')">
          <div class="menu-link">
            <base-icon icon="order"></base-icon>
            Giỏ hàng
            <i class="sack-menu-effect"></i>
          </div>
        </li>

        <!-- <li class="menu-item li-item" @click="handleClick('team')">
          <div class="menu-link">
            {{ $t('landing-ido.menu-team') }}
            <i class="sack-menu-effect"></i>
          </div>
        </li> -->
        <router-link v-if="!isLogin" :to="{ name: 'login' }" tag="li" class="btn-login"> {{ $t('landing-ido.btn-login') }}</router-link>
        <router-link v-else :to="{ name: 'WalletLyn' }" tag="li" class="btn-login btn-wallet">{{ $t('landing-ido.btn-wallet') }}</router-link>
        <a class="btn-login btn-download-app hide-on-mobile" @click="clickDownApp"> {{ $t('landing-ido.btn-download-app') }}</a>

        <!-- <li class="menu-item network">
          <div class="social_list">
            <div class="social_iem">
              <div>
                <img src="../assets/images/facebook.svg" alt="" />
              </div>
            </div>
            <div class="social_iem">
              <div>
                <img src="../assets/images/linkin.svg" alt="" />
              </div>
            </div>
            <div class="social_iem">
              <div>
                <img src="../assets/images/youtube.svg" alt="" />
              </div>
            </div>
          </div>
        </li> -->
        <!-- <li class="menu-item lang1">
          <div class="language-select-wraper">
            <el-select v-model="selectLanguage" @change="handleChangeLanguage" placeholder="Choose a language" class="select-language" popper-class="select-language-dropdown">
              <el-option :label="`${$t('language.en')}`" value="en">
                <template>
                  <div class="be-flex flag">
                    <img src="../assets/images/us-flag.svg" alt="" size="14" style="margin-right: 6px; width: 19px; height: 19px; margin-top: 1px" />
                    <span class="lang">{{ $t('language.en') }}</span>
                  </div>
                </template>
              </el-option>
              <el-option :label="`${$t('language.vi')}`" value="vi">
                <template>
                  <div class="be-flex flag">
                    <img
                      src="../assets/images/vn-flag.svg"
                      alt=""
                      size="19"
                      style="width: 22px; height: 22px; margin-right: 4px; margin-left: -2px; filter: brightness(1.1) contrast(1.3)"
                    />
                    <span class="langs" style="">{{ $t('language.vi') }}</span>
                  </div>
                </template>
              </el-option>
              <div class="suffix" slot="prefix">
                <img src="../assets/images/us-flag.svg" style="margin-right: 8px; margin-left: 0px; margin-top: 10px" v-if="getIcon === 'us-flag'" alt="" />
                <img
                  src="../assets/images/vn-flag.svg"
                  style="margin-right: 8px; margin-left: 0px; width: 24px; height: 23px; margin-top: 8px; filter: brightness(1.1) contrast(1.3)"
                  v-else
                  class="vn-flag"
                  alt=""
                />
              </div>
            </el-select>
          </div>
        </li>
        <li class="menu-item nav__mobile-item lang2">
          <div class="language2 language-select-wraper">
            <el-select v-model="selectLanguage" @click="handleChangeLanguage" placeholder="Choose a language" class="select-language" popper-class="select-language-dropdown">
              <el-option :label="`${$t('language.en-mobile')}`" value="en">
                <template>
                  <div class="be-flex flag" style="justify-content: unset">
                    <img src="../assets/images/us-flag.svg" alt="" size="14" style="margin-right: 6px; width: 19px; height: 19px; margin-top: 1px" />
                    <span class="lang">{{ $t('language.en-mobile') }}</span>
                  </div>
                </template>
              </el-option>
              <el-option :label="`${$t('language.vi-mobile')}`" value="vi">
                <template>
                  <div class="be-flex flag" style="justify-content: unset">
                    <img src="../assets/images/vn-flag.svg" alt="" size="19" style="width: 22px; height: 22px; margin-right: 4px; margin-left: -2px" />
                    <span class="langs" style="">{{ $t('language.vi-mobile') }}</span>
                  </div>
                </template>
              </el-option>
              <div class="suffix" slot="prefix">
                <img src="../assets/images/us-flag.svg" style="margin-right: 8px; margin-left: 0px; margin-top: 10px" v-if="getIcon === 'us-flag'" alt="" />
                <img src="../assets/images/vn-flag.svg" style="margin-right: 8px; margin-left: 0px; width: 24px; height: 23px; margin-top: 8px" v-else class="vn-flag" alt="" />
              </div>
            </el-select>
          </div>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import smoothscroll from 'smoothscroll-polyfill'
  smoothscroll.polyfill()
  export default {
    data() {
      return {
        selectLanguage: 'EN',
        isAbout: false,
        tabActive: '',
        showContract: true
      }
    },

    methods: {
      handleClick(name) {
        this.$emit('click', name)
        if (name == 'marketplace') {
          this.$router.push({ name: 'MarketPlace' })
          // if (window.innerWidth < 1250) {
          //   if (this.getMobileOperatingSystem() === 'Android') {
          //     window.open('https://play.google.com/store/apps/details?id=vn.beedu.blockchain')
          //   }
          //   if (this.getMobileOperatingSystem() === 'iOS') {
          //     window.open('https://apps.apple.com/us/app/lynkey/id1591160349')
          //   }
          // } else {
          //   this.$router.push({ name: 'MarketPlace' })
          // }
        } else {
          this.$emit('click', name)
        }
      },
      handleContract() {
        this.showContract = false
        this.$emit('hidden-contract')
      },
      //   changeActive(item) {
      //     const sackItem = document.querySelector('.sack-item')
      //     if (window.innerWidth < 1023) {
      //       sackItem.style.transform = 'translateX(100%)'
      //     }
      //     if (item == 0) {
      //       this.tabActive = 0
      //     }
      //     if (item == 1) {
      //       this.tabActive = 1
      //     }
      //     if (item == 2) {
      //       this.tabActive = 2
      //     }
      //     if (item == 3) {
      //       this.tabActive = 3
      //     }
      //     if (item == 4) {
      //       this.tabActive = 4
      //     }
      //     if (item == 5) {
      //       this.tabActive = 5
      //     }
      //   },

      handleChangeLanguage(lang) {
        this.$i18n.locale = lang
        window.localStorage.setItem('bc-lang', lang)
      },
      clickDownApp() {
        if (this.getMobileOperatingSystem() === 'Android') {
          window.open('https://play.google.com/store/apps/details?id=vn.beedu.blockchain')
        }
        if (this.getMobileOperatingSystem() === 'iOS') {
          window.open('https://apps.apple.com/us/app/lynkey/id1591160349')
        }
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
      },
      handleOpenTab() {
        window.open(`https://etherscan.io/address/0xef952363c1d990a2fa58f8b379a9fa33bad1dfd1`, '_blank')
      },
      handleOpenTabUniswap() {
        window.open(`https://info.uniswap.org/#/pools/0x9275e26bfb23b18bebb07bff45e85110f60963e9`, '_blank')
      }
    },
    computed: {
      ...mapGetters('beAuth', ['isLogin']),
      getIcon() {
        return this.selectLanguage === 'vi' ? 'vn-flag' : 'us-flag'
      }
    },
    created() {
      this.isAbout = this.$route.name === 'About'
    },
    mounted() {
      const lang = window.localStorage.getItem('bc-lang')
      const menuLink = document.querySelectorAll('.menu-link')
      const menuMobile = document.querySelector('.menu-mobile')
      const sackItem = document.querySelector('.sack-item')
      if (!lang) {
        window.localStorage.setItem('bc-lang', 'vi')
      }
      this.selectLanguage = window.localStorage.getItem('bc-lang')

      menuLink.forEach(element => {
        element.addEventListener('click', function () {
          if (window.innerWidth < 1023) {
            sackItem.classList.toggle('active')
            menuMobile.classList.toggle('change')
            menuLink.forEach(aLink => {
              aLink.classList.remove('active')
            })
          }
        })
      }),
        document.addEventListener('click', function (e) {
          if (!sackItem.contains(e.target) && !menuMobile.contains(e.target)) {
            sackItem.classList.remove('active')
            menuMobile.classList.remove('change')
          }
        })

      menuMobile.addEventListener('click', function () {
        sackItem.classList.toggle('active')
        menuMobile.classList.toggle('change')
      })
    }
  }
</script>

<style lang="scss" scoped>
  .menu-landing-page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    max-width: 1903px;
    width: 100%;
    // max-width: calc(100vw - 17px);
    z-index: 999;
    transition: 0.3s linear;
    background: #f5f5f5;
    backdrop-filter: blur(48px);
    ::v-deep.search-input {
      .input-search {
        width: 400px;
        margin-right: 24px;
        .el-input__inner {
          height: 48px;
          padding-left: 44px;
          font-size: 16px;
          color: var(--bc-text-market-primary);
        }
        .el-input__prefix {
          left: 12px;
          top: 12px;
        }
      }
      .btn-market-search {
        width: 160px;
        padding: 12px 24px;
        border-radius: 6px;
        background: #af6535;
        &:hover {
          border: none;
          color: var(--bc-color-white);
          background: #af6535 !important;
        }
      }
    }

    ::v-deep.wrap-select {
      background-color: var(--bc-bg-white);
      border-radius: 16px;
      padding: 40px;
      width: fit-content;
      margin-top: 64px;

      .form-select {
        margin-top: 32px;
        .el-form-item {
          margin-bottom: 0;
          height: 54px;
          &__content {
            line-height: 1;
            .el-input {
              &__inner {
                max-width: 160px;
                width: 100%;
              }
              &__suffix {
                top: -31px;
              }
              &__icon {
                line-height: 1;
              }
            }
          }
        }
        .line {
          margin: 0 40px;
          width: 1px;
          height: 40px;
          background: #0e0b23;
          opacity: 0.2;
        }
      }
    }
    @media (max-width: 1280px) {
      max-width: 100%;
    }
    .menu-logo {
      display: flex;
      flex-direction: row;
    }
    .menu-logo img {
      height: 54px;
    }
    .menu-container {
      max-width: 1488px;
      padding: 0 24px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 10px;
      padding-bottom: 10px;
      @media (max-width: 1280px) {
        justify-content: unset;
      }
    }
    .sack-item {
      display: flex;
      align-content: center;
      list-style: none;
      .menu-item {
        padding: 0 21px;
        display: flex;
        align-items: center;
        cursor: pointer;
      }
      .menu-item:last-child {
        padding-right: 0;
      }
      .menu-link {
        text-decoration: none;
        font-size: 14px;
        line-height: 21px;
        font-weight: 600;
        position: relative;
        padding-bottom: 16px;
        margin-top: 16px;
        color: black;
      }
    }
    .menu-item:hover .menu-link {
      color: black;
    }
    .contract-container {
      display: flex;
      align-items: center;
      // line-height: 50px;
      justify-content: space-between;
      color: #d0d5dd;
      padding: 0 20px;
      height: 84px;
      background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
      transition: 0.5s;
      font-family: archivo-expanded;
      .title {
        font-size: 16px;
        line-height: 30px;
      }
      .title:last-child {
        margin-top: 4px;
        line-height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          margin-right: 4px;
        }
      }
      .sack-coin {
        margin: 0 auto;
      }
      .is-pc {
        display: inline-block;
      }
      .is-mobile {
        display: none;
      }
      @media (max-width: 1280px) {
        .title {
          font-size: 16px;
        }
      }
      @media (max-width: 1000px) {
        .title {
          font-size: 12px;
        }
      }
      @media (max-width: 850px) {
        font-size: 14px;

        .is-pc {
          display: none;
        }
        .is-mobile {
          display: inline-block;
        }
      }
      @media (max-width: 767px) {
        height: 50px;
        .sack-coin {
          margin: unset;
        }
        font-size: 13px;
        line-height: unset;

        .title:first-child {
          display: none;
        }
      }
      @media (max-width: 370px) {
        font-size: 14px;
        line-height: 20px;
      }
      .title {
        margin: 0 auto;
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
  }

  .btn-login {
    padding: 10px 48px;
    border: 1px solid black;
    filter: drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.05));
    border-radius: 48px;
    // margin-left: 80px;
    color: black;
    cursor: pointer;
    display: flex;
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
    align-items: center;
    @media (min-width: 1281px) and (max-width: 1400px) {
      margin-left: 20px;
    }

    // .btn-link {
    //   text-decoration: none;
    //   font-size: 16px;
    //   line-height: 24px;
    //   font-weight: 600;
    //   color: #fff;
    //   text-decoration: none;
    //   display: flex;
    //   align-items: center;
    // }
  }
  .li-item-wallet {
    margin-left: 80px;
  }

  .be-flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .language-select-wraper {
    width: 93px;
    select-language {
      input {
        background: none;
        border: none;
      }
      .suffix {
        .us-flag {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 7px;
          display: block;
        }
        .vn-flag {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 6px;
          display: block;
        }
      }
    }
  }
  .title {
    margin-top: 13px;
    margin-left: 15px;
    font-size: 20px;
    color: black;
    font-weight: 600;
    font-family: cursive;
  }
  .el-input__suffix {
    right: 10px;
    background: transparent;
  }
  .el-input--prefix .el-input__inner {
    padding-left: 50px;
  }

  .language-select-wraper .el-input--prefix .el-input__inner {
    padding-left: 70px;
    font-size: 24px;
    font-weight: 600;
    line-height: 28px;
    padding-top: 30px;
    padding-bottom: 30px;
    background: transparent;
    color: #fff;
    width: 256px;
  }
  .el-select .el-input .el-select__caret {
    color: #c0c4cc;
    font-size: 26px !important;
    transition: transform 0.3s;
    transform: rotateZ(180deg);
    cursor: pointer;
    margin-right: 43px !important;
    margin-top: -9px !important;
  }
  .el-select .el-input .el-select__caret.is-reverse {
    transform: rotateZ(0);
    margin-top: 10px !important;
  }
  .sack-menu-effect {
    position: absolute;
    width: 0%;
    height: 2px;
    z-index: 1;
    background: black;
    bottom: 0;
    left: 0;
    transition: width ease 0.3s;
    display: inline-block;
  }

  .select-language-dropdown {
    .el-select-dropdown__item {
      font-family: 'fontSF400';
    }
  }
  .menu-item :hover .sack-menu-effect {
    width: 100%;
  }
  .menu-mobile {
    display: none;
  }

  .change .bar1 {
    -webkit-transform: rotate(-45deg) translate(-2px, 6px);
    transform: rotate(-45deg) translate(-2px, 6px);
  }

  .change .bar2 {
    opacity: 0;
  }

  .change .bar3 {
    -webkit-transform: rotate(45deg) translate(-3px, -7px);
    transform: rotate(45deg) translate(-3px, -7px);
  }
  .bar1,
  .bar2,
  .bar3 {
    background: #fff;
    border-radius: 99px;
    margin: 4.5px 0;
    transition: 0.4s;
    width: 24px;
    height: 2px;
  }
  .icon-close {
    display: none;
  }
  .menu-item.network {
    display: none !important;
  }
  .menu-item.lang1 {
    padding-right: 0 !important;
  }
  .menu-item.lang2 {
    display: none !important;
  }

  @media screen and (max-width: 1280px) {
    .menu-logo {
      margin: 0 auto;
    }
    .menu-mobile {
      display: block;
    }
    .menu-item.network {
      display: flex !important;
    }
    .menu-item.lang1 {
      display: none !important;
    }
    .menu-item.lang2 {
      display: flex !important;
    }
    .network {
      margin-top: 61px;
      margin-bottom: 48px;
      @media screen and (max-height: 650px) {
        margin-top: -4px;
        margin-bottom: 20px;
      }
    }
    .icon-close {
      text-align: right;
      display: block;
      margin-right: 24px;
      margin-top: 20px;
    }
    .menu-landing-page {
      padding-top: 0px;
      padding-bottom: 0px;

      .sack-item {
        flex-direction: column;
        position: fixed;
        top: 144px;
        // top: 60px;
        background: rgba(0, 0, 0, 0.6);
        -webkit-backdrop-filter: blur(48px);
        backdrop-filter: blur(48px);
        right: 0;
        bottom: 0;
        width: 230px;
        height: 100vh;
        transition: 0.5s ease;
        z-index: 100000;
        transform: translateX(100%);
        .menu-item {
          padding: 0 35px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          // margin-right: 53%;
          .menu-link {
            font-weight: 600;
            font-size: 14px;
            line-height: 21px;
            padding-bottom: 0;
            // margin-top: 36px;
            margin-top: 0;
            padding: 10px 0;
            width: 100%;
            text-align: right;
            color: #fff;
          }
        }
        .menu-item:first-child {
          margin-top: 26px;
        }
        @media screen and (max-width: 767px) {
          top: 110px;
        }
      }
      .sack-item-no-contract {
        top: 60px;
      }
      .sack-item.active {
        transform: translateX(0);
      }
      .btn-login {
        border: 1px solid #ffffff;
        border-radius: 48px;
        margin-left: AUTO;
        width: 151px;
        height: 41px;
        display: flex;
        justify-content: center;
        margin-right: 35px;
        margin-top: 141px;
        text-decoration: none;
        font-size: 14px;
        line-height: 21px;
        @media (max-height: 700px) {
          margin-top: 50px;
        }

        // .btn-link {
        //   color: #fff;
        //   text-decoration: none;
        //   font-size: 14px;
        //   line-height: 21px;
        // }
      }
      .btn-wallet {
        width: 180px;
      }
      .btn-wallet,
      .btn-login {
        display: none !important;
      }
      .btn-download-app {
        width: 160px;
        padding: 10px 0;
        text-align: center;
        margin-top: 75px;
        @media (max-height: 600px) {
          margin-top: 13px;
        }
      }
      .hide-on-mobile {
        display: block !important;
      }
      .menu-logo img {
        height: 48px;
      }
      .sack-menu-effect {
        display: none !important;
      }
      .menu-container {
        height: 60px;
      }
    }

    .social_list {
      display: flex;
      justify-content: flex-start;
      padding-top: 2.5rem;

      .social_iem {
        margin: -5px 6px;
        position: static;
        width: 44px;
        height: 42px;
        left: 0px;
        top: 0px;
        border: 1px solid #e6e6e6;
        box-sizing: border-box;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          margin-top: 2.5px;
        }
      }
      .social_iem:first-child {
        margin-left: 0;
      }
    }
    .language2 .select-language {
      min-width: 147px !important;
    }
  }
  .hide-on-mobile {
    display: none;
  }
  @media (max-width: 768px) {
    .menu-landing-page {
      .menu-logo img {
        height: 40px;
      }
    }
  }
</style>
