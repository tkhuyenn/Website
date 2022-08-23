<template>
  <div id="footer-market">
    <div class="body-footer">
      <div class="lynkey">
        <div class="img-lynkey">
          <img src="../../../../assets/images/market/OBJECTS.png" />
        </div>
        <p class="title-2 disabled-hover">{{ $t('market-home.footer.global') }}</p>
        <p class="title-2" style="margin-bottom: 40px">
          <a :href="urlSystem['system.token.terms']" target="_blank">{{ $t('market-home.footer.term') }}</a>
        </p>
        <div class="content-product">
          <div class="support">
            <p class="title-1">{{ $t('market-home.footer.products') }}</p>
            <p class="title-2">
              <a href="/wallet/lynk">{{ $t('market-home.footer.wallet') }}</a>
            </p>
            <p class="title-2">
              <a href="/marketplace/real-estate">{{ $t('market-home.footer.marketplace') }}</a>
            </p>
            <p class="title-2">{{ $t('market-home.footer.exchange') }}</p>
            <p class="title-2">{{ $t('market-home.footer.defi') }}</p>
          </div>

          <div class="support">
            <p class="title-1">{{ $t('market-home.footer.support') }}</p>
            <p class="title-2">{{ $t('market-home.footer.help-center') }}</p>
            <p class="title-2">{{ $t('market-home.footer.guides') }}</p>
            <p class="title-2">{{ $t('market-home.footer.document') }}</p>
            <p class="title-2">{{ $t('market-home.footer.contact-us') }}</p>
          </div>

          <div class="company">
            <p class="title-1">{{ $t('market-home.footer.company') }}</p>
            <p class="title-2">{{ $t('market-home.footer.about-us') }}</p>
            <p class="title-2">{{ $t('market-home.footer.partners') }}</p>
            <p class="title-2">{{ $t('market-home.footer.blog') }}</p>
            <p class="title-2">{{ $t('market-home.footer.press') }}</p>
          </div>

          <div class="community">
            <p class="title-1">{{ $t('market-home.footer.community') }}</p>
            <div class="list-icon-1">
              <a href="https://t.me/LynKeychat" target="_blank"><base-icon icon="tele" size="40" /></a>
              <a href="https://twitter.com/LynKey_" target="_blank"><base-icon icon="Twitter" size="40" /></a>
              <a href="https://www.facebook.com/LynKey-103648988780161" target="_blank"><base-icon icon="facebook" size="40" /></a>
              <a href="https://www.youtube.com/channel/UCH1a6zb0lnkt69rMLFdN4zg" target="_blank"><base-icon icon="youtube" size="40" /></a>
              <a href="https://www.linkedin.com/company/76635212" target="_blank"><base-icon icon="in" size="40" /></a>
              <a href="https://www.instagram.com/lynkey__/" target="_blank"><base-icon icon="insta" size="40" /></a>
              <!--            <a href="#"><base-icon icon="m" size="40" /></a>-->
              <!--            <a href="#"><base-icon icon="githup" size="40" /></a>-->
              <a href="https://www.reddit.com/r/LynKey_Global/" target="_blank"><base-icon icon="reddit" size="40" /></a>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="community">
        <p class="title-1">COMPANY</p>
        <div class="list-icon-1">
          <base-icon icon="tele" size="40" />
          <base-icon icon="Twitter" size="40" />
          <base-icon icon="facebook" size="40" />
          <base-icon icon="youtube" size="40" />
        </div>
        <div class="list-icon-2">
          <base-icon icon="in" size="40" />
          <base-icon icon="insta" size="40" />
          <base-icon icon="m" size="40" />
          <base-icon icon="githup" size="40" />
        </div>
      </div> -->
      <!-- <div class="product">
        <p class="title-1">PRODUCTS</p>
        <p class="title-2">Wallet</p>
        <p class="title-2">Marketplace</p>
        <p class="title-2">Exchange</p>
        <p class="title-2">DeFi</p>
      </div>
      <div class="support">
        <p class="title-1">SUPPORT</p>
        <p class="title-2">Help Center</p>
        <p class="title-2">Guides</p>
        <p class="title-2">Documentation</p>
        <p class="title-2">Contact Us</p>
      </div>
      <div class="company">
        <p class="title-1">COMPANY</p>
        <p class="title-2">About Us</p>
        <p class="title-2">Partners</p>
        <p class="title-2">Blog</p>
        <p class="title-2">Press</p>
      </div>
      <div class="community">
        <p class="title-1">COMPANY</p>
        <div class="list-icon-1">
          <base-icon icon="tele" size="40" />
          <base-icon icon="Twitter" size="40" />
          <base-icon icon="facebook" size="40" />
          <base-icon icon="youtube" size="40" />
        </div>
        <div class="list-icon-2">
          <base-icon icon="in" size="40" />
          <base-icon icon="insta" size="40" />
          <base-icon icon="m" size="40" />
          <base-icon icon="githup" size="40" />
        </div>
      </div> -->
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  const beBase = namespace('beBase')
  @Component
  export default class FooterProduct extends Vue {
    @beBase.State('urlSystem') urlSystem!: Record<string, any>
  }
</script>
<style scoped lang="scss">
  .a {
    text-decoration: none;
  }

  .content-product {
    display: flex;
    .list-icon-1,
    .list-icon-2 {
      display: flex;
      max-width: 230px;
      flex-wrap: wrap;
      a {
        margin-right: 16px;
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
    .product {
      margin-right: 75px;
      flex-shrink: 0;
    }
    .company {
      margin-right: 75px;
      flex-shrink: 0;
    }
    .support {
      margin-right: 75px;
      flex-shrink: 0;
    }
  }
  #footer-market {
    background: #0e0b23;
    display: flex;
    justify-content: center;
    padding-top: 40px;
    padding-left: 40px;
    padding-bottom: 40px;
    margin-bottom: 80px !important;
    .body-footer {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    .disabled-hover {
      cursor: inherit !important;
    }
    .title-2 {
      font-weight: normal;
      font-size: 14px;
      color: #ececec;
      margin-bottom: 8px;
      line-height: 24px;
      cursor: pointer;
      a {
        font-weight: normal;
        font-size: 14px;
        color: #ececec;
        margin-bottom: 8px;
        line-height: 24px;
        text-decoration: none;
        cursor: pointer;
      }
      &:last-of-type {
        margin-bottom: 0;
      }
      &:not(.disabled-hover):hover {
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        color: #ececec;
        cursor: pointer;
        font-family: Open Sans;
        background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .title-1 {
      font-family: Open Sans;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: #ececec;
      margin-bottom: 16px;
      cursor: pointer;
    }
    .lynkey {
      .img-lynkey {
        margin-bottom: 24px;
      }
    }
    .community {
      .span-icon {
        margin-right: 16px;
        cursor: pointer;
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
    @media screen and (max-width: 1400px) {
      .title-1 {
        font-size: 14px;
      }
    }
  }
</style>
