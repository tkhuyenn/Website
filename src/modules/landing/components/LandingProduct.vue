<template>
  <div class="main-product" id="product">
    <div class="sack-k2-content container-lang">
      <div class="sack-k2-left">
        <div class="product-style" data-aos="fade-up" data-aos-duration="1000">
          <div class="box-product">
            <div class="img-product">
              <img src="../../../assets/images/landing/product1.png" alt="" />
            </div>
            <div class="content-box-product">
              <div class="title-box-product">{{ $t('landing-ido.title-product-wallet') }}</div>
              <div class="desc-box-product">{{ $t('landing-ido.desc-box-product1') }}</div>
            </div>
          </div>
          <!-- <img src="../../../assets/image/product1.png" alt="" /> -->
        </div>
        <div class="product-style" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="500">
          <div class="box-product2">
            <div class="img-product">
              <img src="../../../assets/images/landing/product2.png" alt="" />
            </div>
            <div class="content-box-product">
              <div class="title-box-product">{{ $t('landing-ido.title-product-nft') }}</div>
              <div class="desc-box-product">{{ $t('landing-ido.desc-box-product2') }}</div>
            </div>
          </div>
        </div>
        <div class="product-style" data-aos="fade-up" data-aos-duration="2500" data-aos-delay="1000">
          <div class="box-product3">
            <div class="img-product">
              <img src="../../../assets/images/landing/product3.png" alt="" />
            </div>
            <div class="content-box-product">
              <div class="title-box-product">{{ $t('landing-ido.title-product-trading') }}</div>
              <div class="desc-box-product">{{ $t('landing-ido.desc-box-product3') }}</div>
            </div>
          </div>
        </div>
        <div class="product-style" data-aos="fade-up" data-aos-duration="3000" data-aos-delay="2000">
          <div class="box-product4">
            <div class="img-product">
              <img src="../../../assets/images/landing/product4.png" class="img-product4" alt="" />
            </div>
            <div class="content-box-product">
              <div class="title-box-product">{{ $t('landing-ido.title-product-earning') }}</div>
              <div class="desc-box-product">{{ $t('landing-ido.desc-box-product4') }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="sack-k2-right" data-aos="fade-zoom-in" data-aos-duration="3000">
        <div class="title-folder-top">
          <span>{{ $t('landing-ido.title-folder-products') }}</span>
        </div>
        <div class="title-folder-center">{{ $t('landing-ido.title-folder-desc1') }}</div>
        <div class="title-folder-bottom">{{ $t('landing-ido.title-folder-desc2') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  // #product {
  //   scroll-margin-top: 120px;
  // }
  .main-product {
    .sack-k2-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;
      flex-direction: row-reverse;
      padding-top: 120px;

      .sack-k2-left {
        max-width: 708px;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 24px;
        .product-style {
          display: flex;
        }
        .box-product,
        .box-product2,
        .box-product3,
        .box-product4 {
          background: #101828;
          max-width: 342px;
          position: relative;
          overflow: hidden;
          height: 100%;
          border-top: 1px solid;
          border-left: 1px solid;
          border-right: 1px solid;
          border-image-slice: 1;
          border: 1px solid;
          border-image-source: linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 100%);
          border-image-slice: 1;

          .img-product {
            padding-top: 36px;
            text-align: center;
          }
          .content-box-product {
            margin-top: 36px;
            padding: 0 24px;
          }
          .title-box-product {
            font-size: 24px;
            line-height: 32px;
            font-weight: 600;
            color: #fff;
          }
          .desc-box-product {
            font-size: 18px;
            line-height: 24px;
            letter-spacing: 0.4px;
            padding-top: 12px;
            padding-bottom: 36px;
            color: #ffffffcc;
          }
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
          font-family: archivo-expanded;
          font-size: 36px;
          line-height: 44px;
          font-weight: 600;
          margin-top: 12px;
          margin-bottom: 60px;
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
        .sack-k2-right {
          text-align: center;
          .title-folder-bottom {
            margin-bottom: 48px;
          }
        }
      }
    }
    @media (max-width: 767px) {
      .container-lang {
        padding-right: 0;
      }
      .sack-k2-content {
        flex-direction: column-reverse;
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
            margin-bottom: 48px;
            line-height: 21px;
          }
        }
        .sack-k2-left {
          display: flex;
          width: 100%;
          overflow-y: hidden;
          overflow-x: scroll;
          grid-gap: unset;
          // pointer-events: none;
          .box-product,
          .box-product2,
          .box-product3,
          .box-product4 {
            width: 240px;
            .img-product {
              padding-top: 24px;
            }
            .content-box-product {
              margin-top: 26px;
            }
            .title-box-product {
              font-size: 18px;
              line-height: 27px;
            }
            .desc-box-product {
              font-size: 14px;
              line-height: 21px;
              padding-top: 12px;
              padding-bottom: 30px;
              color: #ffffffcc;
            }
          }
          .product-style {
            margin-right: 24px;
          }
          .img-product4 {
            width: 182px;
            height: 177px;
          }
        }
        .sack-k2-left::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }
</style>
