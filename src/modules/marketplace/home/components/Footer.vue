<template>
  <div id="footer-market">
    <div class="container">
      <div class="body-footer">
        <div class="item-footer lynkey">
          <div class="img-lynkey">
            <img src="../../../../assets/images/market/OBJECTS.png" />
          </div>
          <p class="title-2 disabled-hover">{{ $t('market-home.footer.global') }}</p>
          <p class="title-2">
            <a :href="urlSystem['system.token.terms']" target="_blank">{{ $t('market-home.footer.term') }}</a>
          </p>
        </div>
        <div class="item-footer product">
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
        <div class="item-footer support">
          <p class="title-1">{{ $t('market-home.footer.support') }}</p>
          <p class="title-2">{{ $t('market-home.footer.help-center') }}</p>
          <p class="title-2">{{ $t('market-home.footer.guides') }}</p>
          <p class="title-2">{{ $t('market-home.footer.document') }}</p>
          <p class="title-2">{{ $t('market-home.footer.contact-us') }}</p>
        </div>
        <div class="item-footer company">
          <p class="title-1">{{ $t('market-home.footer.company') }}</p>
          <p class="title-2">{{ $t('market-home.footer.about-us') }}</p>
          <p class="title-2">{{ $t('market-home.footer.partners') }}</p>
          <p class="title-2">{{ $t('market-home.footer.blog') }}</p>
          <p class="title-2">{{ $t('market-home.footer.press') }}</p>
        </div>
        <div class="item-footer community">
          <div style="width: 100%">
            <p class="title-1">{{ $t('market-home.footer.community') }}</p>
          </div>
          <div class="list-icon-1">
            <a href="https://t.me/LynKeychat" target="_blank"><base-icon icon="tele" size="40" /></a>
            <a href="https://twitter.com/LynKey_" target="_blank"><base-icon icon="Twitter" size="40" /></a>
            <a href="https://www.facebook.com/LynKey-103648988780161" target="_blank"><base-icon icon="facebook" size="40" /></a>
            <a href="https://www.youtube.com/channel/UCH1a6zb0lnkt69rMLFdN4zg" target="_blank"><base-icon icon="youtube" size="40" /></a>
          </div>
          <div class="list-icon-2">
            <a href="https://www.linkedin.com/company/76635212" target="_blank"><base-icon icon="in" size="40" /></a>
            <a href="https://www.instagram.com/lynkey__/" target="_blank"><base-icon icon="insta" size="40" /></a>
            <!--            <a href="#"><base-icon icon="m" size="40" /></a>-->
            <!--            <a href="#"><base-icon icon="githup" size="40" /></a>-->
            <a href="https://www.reddit.com/r/LynKey_Global/" target="_blank"><base-icon icon="reddit" size="40" /></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  const beBase = namespace('beBase')
  const bcNft = namespace('bcNft')
  @Component
  export default class FooterMarket extends Vue {
    @beBase.State('urlSystem') urlSystem!: Record<string, any>
    @bcNft.State('isDesktop') isDesktop!: boolean
  }
</script>
<style scoped lang="scss">
  #footer-market {
    background: #0e0b23;
    display: flex;
    justify-content: center;
    padding: 80px 0;
    .body-footer {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .item-footer:first-of-type {
        width: calc((100% / 5) + 150px);
      }

      .item-footer {
        width: calc((100% / 5) - 64px);

        a {
          text-decoration: none;
          margin-right: 16px;
          &:last-of-type {
            margin-right: 0;
          }
        }
        .list-icon-2,
        .list-icon-1 {
          display: flex;
        }
      }
      @media screen and (min-width: 1366px) and (max-width: 1440px) {
        .item-footer {
          width: calc((100% / 5) - 48px);
        }
      }
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
    .disabled-hover {
      cursor: inherit;
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
  }
</style>
