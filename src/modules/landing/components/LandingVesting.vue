<template>
  <div class="vesting">
    <div class="back-purple" data-aos="fade-up" data-aos-duration="3000">
      <div class="vesting_header">
        <p>{{ $t('landing-ido.vesting-head') }}</p>
        <h4 class="vesting_header-title">{{ $t('landing-ido.vesting-schedule') }}</h4>
        <span class="vesting_header-text">{{ $t('landing-ido.vesting-text') }}</span>
      </div>

      <div class="sack-k2-content hidden-pc">
        <div class="sack-k2-left">
          <div class="product-style">
            <div class="box-product">
              <div class="content-box-product">
                <div class="title-box-product">{{ $t('landing-ido.vesting-title-angelsale') }}</div>
                <div class="desc-box-product">{{ $t('landing-ido.vesting-desc-product') }}</div>
                <div class="sub_product">{{ $t('landing-ido.vesting-sub-product-locked') }}</div>
                <div class="detail_product">
                  <div class="detail_item">
                    <p>{{ $t('landing-ido.vesting-item-vesting-time') }}</p>
                    <span>16</span>
                  </div>
                  <div class="detail_item">
                    <p>{{ $t('landing-ido.vesting-item-monthly-release') }}</p>
                    <span>5%</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- <img src="../../../assets/image/product1.png" alt="" /> -->
          </div>
          <div class="product-style">
            <div class="box-product2">
              <div class="content-box-product">
                <div class="title-box-product">{{ $t('landing-ido.vesting-title-privatesale') }}</div>
                <div class="desc-box-product">{{ $t('landing-ido.vesting-desc-product') }}</div>
                <div class="sub_product">{{ $t('landing-ido.vesting-sub-product-locked') }}</div>
                <div class="detail_product">
                  <div class="detail_item">
                    <p>{{ $t('landing-ido.vesting-item-vesting-time') }}</p>
                    <span>14</span>
                  </div>
                  <div class="detail_item">
                    <p>{{ $t('landing-ido.vesting-item-monthly-release') }}</p>
                    <span>5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="product-style">
            <div class="box-product3">
              <div class="content-box-product">
                <div class="title-box-product">{{ $t('landing-ido.vesting-title-presale') }}</div>
                <div class="desc-box-product">{{ $t('landing-ido.vesting-desc-product') }}</div>
                <div class="sub_product">{{ $t('landing-ido.vesting-sub-product-locked') }}</div>
                <div class="detail_product">
                  <div class="detail_item">
                    <p>{{ $t('landing-ido.vesting-item-vesting-time') }}</p>
                    <span>12</span>
                  </div>
                  <div class="detail_item">
                    <p>{{ $t('landing-ido.vesting-item-monthly-release') }}</p>
                    <span>5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="product-style">
            <div class="box-product4">
              <div class="content-box-product">
                <div class="title-box-product">{{ $t('landing-ido.vesting-title-ido') }}</div>
                <div class="desc-box-product">{{ $t('landing-ido.vesting-desc-product') }}</div>
                <div class="sub_product">{{ $t('landing-ido.vesting-sub-product-available') }}</div>
                <div class="detail_product">
                  <div class="detail_item">
                    <p>{{ $t('landing-ido.vesting-item-vesting-time') }}</p>
                    <span>0</span>
                  </div>
                  <div class="detail_item">
                    <p>{{ $t('landing-ido.vesting-item-monthly-release') }}</p>
                    <span>Floating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="product-style">
            <div class="box-product4">
              <div class="content-box-product">
                <div class="title-box-product">{{ $t('landing-ido.vesting-title-ecosystem') }}</div>
                <div class="desc-box-product">{{ $t('landing-ido.vesting-desc-product') }}</div>
                <div class="sub_product">{{ $t('landing-ido.vesting-sub-product-linear') }}</div>
                <div class="detail_product">
                  <div class="detail_item">
                    <p>{{ $t('landing-ido.vesting-item-vesting-time') }}</p>
                    <span>36</span>
                  </div>
                  <div class="detail_item">
                    <p>{{ $t('landing-ido.vesting-item-monthly-release') }}</p>
                    <span>2.78%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="product-style">
            <div class="box-product4">
              <div class="content-box-product">
                <div class="title-box-product">{{ $t('landing-ido.vesting-title-reserve') }}</div>
                <div class="desc-box-product">{{ $t('landing-ido.vesting-desc-product') }}</div>
                <div class="sub_product">{{ $t('landing-ido.vesting-sub-product-linear') }}</div>
                <div class="detail_product">
                  <div class="detail_item">
                    <p>{{ $t('landing-ido.vesting-item-vesting-time') }}</p>
                    <span>36</span>
                  </div>
                  <div class="detail_item">
                    <p>{{ $t('landing-ido.vesting-item-monthly-release') }}</p>
                    <span>2.78%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="product-style">
            <div class="box-product4">
              <div class="content-box-product">
                <div class="title-box-product">{{ $t('landing-ido.vesting-title-farming') }}</div>
                <div class="desc-box-product">{{ $t('landing-ido.vesting-desc-product') }}</div>
                <div class="sub_product">{{ $t('landing-ido.vesting-sub-product-locked') }}</div>
                <div class="detail_product">
                  <div class="detail_item">
                    <p>{{ $t('landing-ido.vesting-item-vesting-time') }}</p>
                    <span>36</span>
                  </div>
                  <div class="detail_item">
                    <p>{{ $t('landing-ido.vesting-item-monthly-release') }}</p>
                    <span>2.78%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="product-style">
            <div class="box-product4">
              <div class="content-box-product">
                <div class="title-box-product">{{ $t('landing-ido.vesting-title-advisor') }}</div>
                <div class="desc-box-product">{{ $t('landing-ido.vesting-desc-product') }}</div>
                <div class="sub_product">{{ $t('landing-ido.vesting-sub-product-locked') }}</div>
                <div class="detail_product">
                  <div class="detail_item">
                    <p>{{ $t('landing-ido.vesting-item-vesting-time') }}</p>
                    <span>36</span>
                  </div>
                  <div class="detail_item">
                    <p>{{ $t('landing-ido.vesting-item-monthly-release') }}</p>
                    <span>2.78%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="product-style">
            <div class="box-product4">
              <div class="content-box-product">
                <div class="title-box-product">{{ $t('landing-ido.vesting-title-team') }}</div>
                <div class="desc-box-product">{{ $t('landing-ido.vesting-desc-product') }}</div>
                <div class="sub_product">{{ $t('landing-ido.vesting-sub-product-locked') }}</div>
                <div class="detail_product">
                  <div class="detail_item">
                    <p>{{ $t('landing-ido.vesting-item-vesting-time') }}</p>
                    <span>36</span>
                  </div>
                  <div class="detail_item">
                    <p>{{ $t('landing-ido.vesting-item-monthly-release') }}</p>
                    <span>2.78%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div>
          <img class="circle" src="../../../assets/images/landing/circle.png" alt="" />
        </div> -->
    </div>
    <div class="container-lang">
      <div class="tbl-content hidden-mobile" data-aos="fade-up" data-aos-duration="3000">
        <img class="table" src="../../../assets/images/landing/tb.png" alt="" />
        <img src="../../../assets/images/landing/circle1.png" alt="" class="circle1" />
        <img src="../../../assets/images/landing/circle2.png" alt="" class="circle2" />
      </div>

      <div class="about_us">
        <div class="">
          <div class="us">
            <div class="about_img">
              <img src="../../../assets/images/landing/chart.png" alt="" />
            </div>
            <div class="about">
              <div class="about_text fade-up-vesting" data-aos="fade-up" data-aos-duration="3000">
                <p>{{ $t('landing-ido.vesting-head') }}</p>
                <h3>{{ $t('landing-ido.vesting-about-us-title') }}</h3>
                <span> {{ $t('landing-ido.vesting-about-us-desc') }} </span>
              </div>
              <div class="list_text hidden-mobile" data-aos="fade-zoom-in" data-aos-duration="3000">
                <div class="item">
                  <div class="dot"></div>
                  <div class="content">{{ $t('landing-ido.vesting-title-team') }}</div>
                </div>
                <div class="item">
                  <div id="one" class="dot"></div>
                  <div class="content">{{ $t('landing-ido.vesting-title-advisor') }}</div>
                </div>
                <div class="item">
                  <div id="two" class="dot"></div>
                  <div class="content">{{ $t('landing-ido.vesting-title-farming') }}</div>
                </div>
                <div class="item">
                  <div id="three" class="dot"></div>
                  <div class="content">{{ $t('landing-ido.vesting-title-reserve') }}</div>
                </div>
                <div class="item">
                  <div id="four" class="dot"></div>
                  <div class="content">{{ $t('landing-ido.vesting-title-ecosystem') }}</div>
                </div>
                <div class="item">
                  <div id="five" class="dot"></div>
                  <div class="content">{{ $t('landing-ido.vesting-title-ido') }}</div>
                </div>
                <div class="item">
                  <div id="six" class="dot"></div>
                  <div class="content">{{ $t('landing-ido.vesting-title-presale') }}</div>
                </div>
                <div class="item">
                  <div id="seven" class="dot"></div>
                  <div class="content">{{ $t('landing-ido.vesting-title-privatesale') }}</div>
                </div>
                <div class="item">
                  <div id="eight" class="dot"></div>
                  <div class="content">{{ $t('landing-ido.vesting-title-angelsale') }}</div>
                </div>
              </div>
            </div>
            <div class="list_text hidden-pc">
              <div class="dot_left">
                <div class="item">
                  <div class="dot"></div>
                  <div class="content">{{ $t('landing-ido.vesting-title-team') }}</div>
                </div>
                <div class="item">
                  <div id="one" class="dot"></div>
                  <div class="content">{{ $t('landing-ido.vesting-title-advisor') }}</div>
                </div>
                <div class="item">
                  <div id="two" class="dot"></div>
                  <div class="content">{{ $t('landing-ido.vesting-title-farming') }}</div>
                </div>
                <div class="item">
                  <div id="three" class="dot"></div>
                  <div class="content">{{ $t('landing-ido.vesting-title-reserve') }}</div>
                </div>
                <div class="item">
                  <div id="four" class="dot"></div>
                  <div class="content">{{ $t('landing-ido.vesting-title-ecosystem') }}</div>
                </div>
              </div>
              <div class="dot_right">
                <div class="item">
                  <div id="five" class="dot"></div>
                  <div class="content">{{ $t('landing-ido.vesting-title-ido') }}</div>
                </div>
                <div class="item">
                  <div id="six" class="dot"></div>
                  <div class="content">{{ $t('landing-ido.vesting-title-presale') }}</div>
                </div>
                <div class="item">
                  <div id="seven" class="dot"></div>
                  <div class="content">{{ $t('landing-ido.vesting-title-privatesale') }}</div>
                </div>
                <div class="item">
                  <div id="eight" class="dot"></div>
                  <div class="content">{{ $t('landing-ido.vesting-title-angelsale') }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="collection">
        <div class="collection_content" data-aos="fade-zoom-in" data-aos-duration="3000">
          <p>NFTs</p>
          <h4 class="collection_header-title">{{ $t('landing-ido.vesting-collection-nft') }}</h4>
          <span class="collection_header-text">{{ $t('landing-ido.vesting-collection-text') }}</span>
        </div>
        <div class="collection_img">
          <!-- <iframe src="https://embed.lottiefiles.com/animation/3738"></iframe> -->

          <!-- <lottie-player
            src="https://assets9.lottiefiles.com/datafiles/njmaE1GfhBLP2KZ/data.json"
            background="transparent"
            speed="1"
            style="width: 100%; height: 100%"
            loop
            autoplay
          ></lottie-player> -->
          <img src="../../../assets/images/landing/animation.gif" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LandingVesting'
  }
</script>

<style lang="scss" scoped>
  .hidden-pc {
    display: none;
  }

  .vesting {
    background: url('../../../assets/images/landing/back-pink.png');
    background-repeat: no-repeat;
    background-position-y: 350px;
    background-position-x: right;
    @media (max-width: 1880px) {
      background-position-y: 20px;
    }
    @media (max-width: 767px) {
      background-position-y: 0px;
    }

    .vesting_header {
      text-align: center;
      padding-bottom: 60px;
      margin-top: 120px;
      padding-left: 24px;
      padding-right: 24px;
      p {
        font-size: 18px;
        line-height: 27px;
        color: #fff;
        font-weight: 400;
      }
      .vesting_header-title {
        color: #fff;
        //font-family: Archivo Expanded;
        font-size: 36px;
        line-height: 44px;
        padding: 12px 0;
        font-family: archivo-expanded;
      }
      .vesting_header-text {
        font-size: 20px;
        line-height: 30px;
        color: rgba(255, 255, 255, 0.8);
      }
    }
    .sack-k2-content {
      display: none;
      align-items: center;
      justify-content: space-between;
      color: #fff;
      flex-direction: row-reverse;
      .sack-k2-left {
        //max-width: 708px;
        display: none;
        width: 100%;
        overflow: auto;
        grid-gap: 24px;
        .product-style {
          display: flex;
        }
        .box-product,
        .box-product2,
        .box-product3,
        .box-product4 {
          background: linear-gradient(180deg, rgba(171, 71, 188, 0.8) 0%, rgba(156, 39, 176, 0) 100%);
          backdrop-filter: blur(200px);
          max-width: 342px;
          position: relative;
          overflow: hidden;
          height: 100%;

          border: none;
          //border-image-source: linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 100%);
          //border-image-slice: 1;
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
            font-size: 12px;
            line-height: 18px;
            letter-spacing: 0.4px;
            padding-top: 24px;

            color: #d0d5dd;
          }
          .sub_product {
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
            height: 48px;
          }
          .detail_product {
            display: flex;
            justify-content: space-between;
            padding-top: 24px;
            .detail_item {
              margin-bottom: 24px;
              p {
                font-size: 12px;
                line-height: 18px;
                color: #d0d5dd;
              }
              span {
                color: #fff;
                font-size: 16px;
                line-height: 24px;
                font-weight: 600;
              }
            }
          }
        }
      }
    }
    @media (max-width: 1024px) {
      .hidden-pc {
        display: block;
      }
      .hidden-mobile {
        display: none;
      }
      .vesting_header {
        text-align: center;
        padding-bottom: 48px;
      }
      .sack-k2-content {
        flex-direction: column-reverse;
        padding-left: 24px;
        .sack-k2-left {
          display: flex;
          width: 100%;
          overflow: auto;
          grid-gap: 24px;
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
              font-size: 12px;
              line-height: 18px;
              padding-top: 24px;

              color: #d0d5dd;
            }
          }
        }
        .sack-k2-left::-webkit-scrollbar {
          display: none;
        }
      }
    }
    @media (max-width: 767px) {
      .hidden-pc {
        display: block;
      }
      .hidden-mobile {
        display: none;
      }
      .vesting_header {
        text-align: left;
        padding-bottom: 48px;
        p {
          font-size: 14px;
          line-height: 21px;
          padding-bottom: 4px;
        }
        .vesting_header-title {
          font-size: 24px;
          line-height: 32px;
          padding: 0 0 24px 0;
        }
        .vesting_header-text {
          font-size: 14px;
          line-height: 21px;
          color: rgba(255, 255, 255, 0.8);
        }
      }
      .sack-k2-content {
        flex-direction: column-reverse;
        padding-left: 24px;
        .sack-k2-left {
          display: flex;
          width: 100%;
          overflow: auto;
          grid-gap: unset;
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
              font-size: 12px;
              line-height: 18px;
              padding-top: 24px;

              color: #d0d5dd;
            }
          }
          .product-style {
            margin-right: 24px;
          }
        }
        .product-style {
          margin-right: 24px;
        }
        .sack-k2-left::-webkit-scrollbar {
          display: none;
        }
      }
    }
    .fade-up-vesting {
      transform: translate3d(0, 45px, 0);
    }
    .container-lang {
      position: relative;

      .about_us {
        //background-color: #faa227;
        width: 100%;
        padding-top: 120px;

        .us {
          display: flex;
          justify-content: space-between;
          width: 100%;

          .about {
            display: flex;
            flex-direction: column;
            width: 40%;
            margin-left: 50px;
            position: inherit;
            z-index: 3;

            .about_text {
              align-items: center;

              p {
                font-size: 18px;
                line-height: 150%;
                letter-spacing: 0.05em;

                color: #fff;
                padding-bottom: 12px;
              }
              h3 {
                font-size: 36px;
                line-height: 44px;
                color: #fff;
                padding-bottom: 12px;
                font-family: archivo-expanded;
              }
              span {
                font-size: 18px;
                line-height: 150%;
                color: rgba(255, 255, 255, 0.8);
                padding-bottom: 60px;
              }
            }
            .list_text {
              display: flex;
              flex-direction: column;
              padding-top: 60px;
              .item {
                display: flex;
                align-items: center;
                padding-bottom: 16px;
                .dot {
                  content: '';
                  width: 12px;
                  height: 12px;
                  background: #48d2b4;
                  border-radius: 50%;
                  margin-right: 24px;
                }
                #one {
                  background: #41b20e;
                }
                #two {
                  background: #dfc011;
                }
                #three {
                  background: #c80084;
                }
                #four {
                  background: #ad01cf;
                }
                #five {
                  background: #3e00b5;
                }
                #six {
                  background: #3459f7;
                }
                #seven {
                  background: #53dff8;
                }
                #eight {
                  background: #257177;
                }
                .content {
                  color: #fff;
                  font-weight: 400;
                  font-size: 18px;
                  line-height: 27px;
                }
              }
            }
          }
          .hidden-pc {
            display: none;
          }
          .about_img {
            align-items: center;

            //width: 54%;
            position: relative;
            img {
              width: 100%;
            }
          }
        }
      }
      .collection {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        padding: 15px 0;

        .collection_content {
          //width: 40%;
          // padding-top: 320px;
          padding: 15px 0;
          p {
            font-size: 18px;
            font-weight: 400;
            line-height: 27px;
            padding-bottom: 12px;
            color: #fff;
          }
          .collection_header-title {
            font-size: 36px;
            line-height: 44px;
            padding-bottom: 60px;
            font-family: archivo-expanded;
            color: #fff;
          }
          .collection_header-text {
            font-size: 18px;
            line-height: 150%;
            color: rgba(255, 255, 255, 0.8);
          }
        }
        .collection_img {
          max-width: 830px;
          width: 100%;
          max-height: 624px;
          height: 100%;
          img {
            width: 100%;
            max-height: 640px;
          }
        }
      }

      .tbl-content {
        //border: 1px solid rgba(255,255,255,0.3);

        .table {
          width: 100%;
          // height: 800px;
          //position: absolute;
          position: relative;
          z-index: 100;
        }
        .circle1 {
          position: absolute;
          z-index: 1;
          top: 300px;
          left: -116px;
        }
        .circle2 {
          position: absolute;
          z-index: 1;
          top: 27%;
          right: -134px;
        }
      }

      //tablet
      @media (max-width: 1024px) {
        .collection {
          flex-direction: column;
        }
        .hidden-mobile {
          display: none;
        }

        .about_us {
          .us {
            flex-wrap: wrap;
            .about {
              width: 100%;
              margin-left: 0;
              text-align: center;
              margin-bottom: 36px;
              .about_text {
                width: 100%;
                order: 1;
                padding-bottom: 12px;
                p {
                }
                h3 {
                  font-size: 36px;
                  line-height: 43.2px;
                  padding-bottom: 12px;
                }
                span {
                  font-size: 16px;
                  line-height: 24px;
                  color: rgba(255, 255, 255, 0.8);
                }
              }
              .list_text {
                order: 2;
              }
              .hidden-mobile {
                display: none;
              }
            }
            .hidden-pc {
              display: flex;
            }
            .list_text {
              display: flex;
              //flex-direction: column;
              padding-top: 60px;
              order: 3;
              justify-content: space-between;
              width: 100%;
              .dot_left {
                //margin-right: 24px;
              }
              .item {
                display: flex;
                align-items: center;
                padding-bottom: 16px;
                .dot {
                  content: '';
                  width: 12px;
                  height: 12px;
                  background: #48d2b4;
                  border-radius: 50%;
                  margin-right: 24px;
                }
                #one {
                  background: #41b20e;
                }
                #two {
                  background: #dfc011;
                }
                #three {
                  background: #c80084;
                }
                #four {
                  background: #ad01cf;
                }
                #five {
                  background: #3e00b5;
                }
                #six {
                  background: #3459f7;
                }
                #seven {
                  background: #53dff8;
                }
                #eight {
                  background: #257177;
                }
                .content {
                  color: #fff;
                  font-weight: 400;
                  font-size: 14px;
                  line-height: 21px;
                }
              }
            }
            .about_img {
              width: 100%;
              text-align: center;
              order: 1;
            }
          }
        }
        .collection {
          display: flex;
          align-items: center;
          width: 100%;
          flex-wrap: wrap;

          .collection_content {
            width: 100%;
            text-align: center;
            padding-top: 104px;
            padding-bottom: 36px;
          }
          .collection_img {
            width: 100%;
            // padding-top: 36px;
            img {
              width: 100%;
            }
          }
        }

        //mobile
        @media (max-width: 767px) {
          .hidden-mobile {
            display: none;
          }
          .hidden-pc {
            display: block;
          }

          .about_us {
            .us {
              width: 100%;
              .about {
                width: 100%;
                margin-left: 0;
                text-align: left;
                .about_text {
                  width: 100%;
                  order: 1;
                  padding-bottom: 0px;
                  p {
                    font-size: 14px;
                    line-height: 21px;
                    font-weight: 400;
                    padding-bottom: 4px;
                  }
                  h3 {
                    font-size: 24px;
                    line-height: 32px;
                    padding-bottom: 12px;
                  }

                  span {
                    font-size: 14px;
                    line-height: 21px;
                    color: rgba(255, 255, 255, 0.8);
                    padding-bottom: 0px;
                  }
                }
                .list_text {
                  //display: none;
                  order: 2;
                }
                .hidden-mobile {
                  display: none;
                }
              }
              .list_text {
                display: flex;
                //flex-direction: column;
                padding-top: 60px;
                order: 3;
                justify-content: space-between;
                width: 100%;
                .dot_left {
                  // margin-right: 24px;
                }
                .item {
                  display: flex;
                  align-items: center;
                  padding-bottom: 16px;
                  .dot {
                    content: '';
                    width: 12px;
                    height: 12px;
                    background: #48d2b4;
                    border-radius: 50%;
                    margin-right: 24px;
                  }
                  #one {
                    background: #41b20e;
                  }
                  #two {
                    background: #dfc011;
                  }
                  #three {
                    background: #c80084;
                  }
                  #four {
                    background: #ad01cf;
                  }
                  #five {
                    background: #3e00b5;
                  }
                  #six {
                    background: #3459f7;
                  }
                  #seven {
                    background: #53dff8;
                  }
                  #eight {
                    background: #257177;
                  }
                  .content {
                    color: #fff;
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 21px;
                  }
                }
              }
              .hidden-pc {
                display: flex;
              }
              .about_img {
                width: 100%;
                text-align: center;
                order: 1;
              }
            }
          }
          .collection {
            .collection_content {
              width: 100%;
              text-align: left;
              padding-top: 104px;

              p {
                font-size: 14px;
                line-height: 21px;
                padding-bottom: 4px;
              }
              .collection_header-title {
                padding-bottom: 24px;
                font-size: 24px;
                line-height: 32px;
              }
              .collection_header-text {
                font-size: 14px;
              }
            }
            .collection_img {
              width: 100%;
              // padding-top: 36px;

              img {
                // width: 328px;
                // max-height: 247px;
              }
            }
          }
        }
        .circle {
          position: absolute;
          left: -19%;
          top: 279px;
        }
      }
    }
  }
</style>
