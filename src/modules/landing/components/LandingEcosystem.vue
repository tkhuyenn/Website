<template>
  <div class="main-ecosystem" id="eco-system">
    <div class="sack-k2-content container-lang">
      <div class="sack-k2-left" data-aos="zoom-in" data-aos-duration="1000">
        <div class="title-folder">
          <img src="../../../assets/images/landing/img-ecosystem.png" alt="" />
        </div>
      </div>
      <div class="sack-k2-right" data-aos="fade-zoom-in" data-aos-duration="3000" data-aos-delay="300">
        <div class="title-folder-top">
          <span>{{ $t('eco-system.eco-system') }}</span>
        </div>
        <div class="title-folder-center">
          {{ $t('eco-system.title') }}
        </div>
        <div class="title-folder-bottom">
          {{ $t('eco-system.discript') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  .main-ecosystem {
    .sack-k2-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 120px 24px 0 24px;
      color: #fff;
      .sack-k2-left {
        max-width: 687px;
        width: 100%;
        margin-right: 20px;
        img {
          max-width: 100%;
        }
      }
      .sack-k2-right {
        max-width: 585px;
        width: 100%;
        text-align: left;
        .title-folder-top {
          font-size: 18px;
          line-height: 27px;
          font-weight: 400;
        }
        .title-folder-center {
          font-size: 36px;
          line-height: 44px;
          font-weight: 600;
          margin-top: 12px;
          margin-bottom: 60px;
          font-family: archivo-expanded;
        }
        .title-folder-bottom {
          font-size: 20px;
          line-height: 30px;
          font-weight: 400;
          color: #ffffffcc;
        }
      }
    }
    @media (max-width: 1024px) {
      .sack-k2-content {
        flex-direction: column-reverse;
        .sack-k2-left {
          margin-right: unset;
        }
        .sack-k2-right {
          text-align: center;
          .title-folder-bottom {
            margin-bottom: 48px;
          }
        }
      }
    }
    @media (max-width: 767px) {
      .sack-k2-content {
        .sack-k2-right {
          text-align: left;
          .title-folder-top {
            font-size: 14px;
            line-height: 21px;
          }
          .title-folder-center {
            font-size: 24px;
            line-height: 31px;
            margin-top: 4px;
            margin-bottom: 24px;
          }
          .title-folder-bottom {
            font-size: 14px;
            font-weight: 400;
            line-height: 21px;
          }
        }
      }
    }
  }
</style>
