<template>
  <div class="partners">
    <div class="main container-lang">
      <div class="stragetic" data-aos="fade-up" data-aos-duration="2000">
        <div class="content">
          <h1>{{ $t('landing-ido.partners-content') }}</h1>
          <div class="title">{{ $t('landing-ido.partners-strategic-title') }}</div>
        </div>
        <div class="br-img" style="text-align: center">
          <img class="mg-0" src="../../../assets/images/landing/br.png" alt="" />
        </div>
        <div class="logo-partner">
          <img class="mg-0" src="../../../assets/images/landing/partner1.png" alt="" @click="handleOpen('http://everland.vn/')" />
          <img src="../../../assets/images/landing/partner2.png" alt="" @click="handleOpen('http://crystalholidays.vn/')" />
          <img src="../../../assets/images/landing/partner3.png" alt="" @click="handleOpen('https://ztudium.com/')" />
          <img src="../../../assets/images/landing/partner4.png" alt="" />
        </div>
      </div>

      <div class="associate" data-aos="fade-up" data-aos-duration="2000">
        <div class="content">
          <h1>{{ $t('landing-ido.partners-content') }}</h1>
          <div class="title">{{ $t('landing-ido.partners-associate-title') }}</div>
        </div>
        <div class="br-img" style="text-align: center">
          <img src="../../../assets/images/landing/br.png" alt="" />
        </div>
        <div class="logo-asso">
          <!-- <img class="mg-0" src="../../../assets/images/landing/asso1.png" alt="" />
          <img src="../../../assets/images/landing/asso2.png" alt="" />
          <img src="../../../assets/images/landing/asso3.png" alt="" />
          <img src="../../../assets/images/landing/asso4.png" alt="" />
          <img src="../../../assets/images/landing/asso5.png" alt="" />
          <img src="../../../assets/images/landing/asso6.png" alt="" /> -->
          <!-- <img src="@/assets/images/landing/Group-partner1.png" alt="" />
          <img src="@/assets/images/landing/Group-partner2.png" alt="" />
          <img src="@/assets/images/landing/Group-partner3.png" alt="" /> -->
          <div class="flex align-center wrap-logo">
            <img
              src="../../../assets/images/landing/logo-landing/logo-transform.png"
              alt=""
              @click="handleOpen('https://transformgroup.com/?fbclid=IwAR3HhXCfgWQ9UlvGEXW2gUjSSalKF2Px3eQ_WWsOiFF4-M1qQ4pQlVjrbpk')"
            />
            <img src="../../../assets/images/landing/logo-landing/logo-intelligent.png" alt="" @click="handleOpen('https://www.intelligenthq.com')" />
            <img src="../../../assets/images/landing/logo-landing/logo-cities.png" alt="" @click="handleOpen('https://www.citiesabc.com')" />
            <img src="../../../assets/images/landing/logo-landing/logo-open.png" alt="" @click="handleOpen('https://www.openbusinesscouncil.org ')" />
          </div>
          <div class="flex align-center wrap-logo">
            <img src="../../../assets/images/landing/logo-landing/logo-hedgetink.png" alt="" @click="handleOpen('https://www.hedgethink.com')" />
            <img src="../../../assets/images/landing/logo-landing/logo-jacque.png" alt="" @click="handleOpen('https://jacquelaw.com/')" />
            <img src="../../../assets/images/landing/logo-landing/logo-fashion.png" alt="" @click="handleOpen('https://www.fashionabc.org')" />
            <img src="../../../assets/images/landing/logo-landing/logo-smartcities.png" alt="" @click="handleOpen('https://smartcitiesabc.com/')" />
          </div>
          <div class="flex align-center wrap-logo">
            <img src="../../../assets/images/landing/logo-landing/logo-wscf.png" alt="" @click="handleOpen('https://worldsmartcities.org/')" />
            <img src="../../../assets/images/landing/logo-landing/logo-coin.png" alt="" @click="handleOpen('https://coinagenda.com/')" />
            <img src="../../../assets/images/landing/logo-landing/logo-transform-pr.png" alt="" @click="handleOpen('https://transformgroup.com/')" />
            <img src="../../../assets/images/landing/logo-landing/logo-certik.png" alt="" @click="handleOpen('https://www.certik.com/projects/lynkey')" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LandingParner',

    methods: {
      handleOpen(url) {
        window.open(url, '_blank')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .partners {
    color: white;
    padding-bottom: 120px;
    scroll-margin-top: 190px;
    .content {
      text-align: center;
      h1 {
        font-weight: 400;
        font-size: 18px;
        line-height: 27px;
        margin-bottom: 12px;
      }
      .title {
        font-size: 36px;
        line-height: 44px;
        margin-bottom: 19px;
        font-family: archivo-expanded;
      }
    }
    .logo-partner {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 30px;

      img {
        object-fit: contain;
        cursor: pointer;
        @media (min-width: 768px) and (max-width: 1024px) {
          width: 20%;
        }
        @media (max-width: 767px) {
          width: 100%;
        }
      }
    }
    .associate {
      margin-top: 120px;
      .logo-asso {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-top: 30px;

        .wrap-logo {
          justify-content: space-around;
          margin-top: 20px;
          img {
            max-width: 274px;
            // height: 50px;
            object-fit: contain;
            width: 100%;
            cursor: pointer;
            // margin: 0 20px;
          }
        }
      }
    }
  }
  @media (max-width: 767px) {
    .partners {
      .main {
        padding-right: 0;
      }
      .content {
        text-align: start;
        margin-bottom: 30px !important;

        h1 {
          font-size: 14px;
          line-height: 22px;
          margin-bottom: 4px;
        }
        .title {
          font-size: 24px;
          line-height: 32px;
        }
      }
      .br-img {
        display: none;
      }
      .logo-partner {
        justify-content: flex-start !important;
        overflow: auto;
        img {
          width: 100%;
          margin-left: 30px;
          opacity: 0.8;
          height: 60px;
        }
      }
      .mg-0 {
        margin-left: 0 !important;
      }
      .associate {
        .logo-asso {
          justify-content: flex-start !important;
          overflow: auto;
          margin: 0 !important;
          flex-direction: row;

          .wrap-logo {
            margin-top: 0;
            img {
              width: auto;
              // margin-left: 30px;
              opacity: 0.8;
              height: 60px;
              // object-fit: cover;
              margin-right: 40px;
            }
          }
        }
      }
    }
  }
  ::-webkit-scrollbar {
    display: none;
  }
</style>
