<template>
  <div class="main-about" id="docs">
    <div class="sack-k2-content container-lang">
      <div class="sack-k2-left">
        <div class="title-folder hiddenMobile">
          <img src="../../../assets/images/landing/gif-about.gif" alt="" />
        </div>
      </div>
      <div class="sack-k2-right" data-aos="fade-zoom-in" data-aos-duration="3000">
        <div class="title-folder-top">
          <span>{{ $t('landing-ido.about_about-us') }}</span>
        </div>
        <div class="title-folder-center">{{ $t('landing-ido.about_p1') }}</div>
        <div class="sack-k2-left hiddenPC">
          <div class="title-folder">
            <img src="../../../assets/images/landing/gif-about.gif" alt="" />
          </div>
        </div>
        <div class="title-folder-bottom">
          <p class="headding">{{ $t('landing-ido.about_title-folder-heading') }}</p>
          {{ $t('landing-ido.about_title-folder') }}
          <span class="read-more" @click="popupAboutUs = true">{{ $t('landing-ido.about_read-more') }}</span>
        </div>
        <div class="sack-btn">
          <a href="https://lynkey.com/media/LynKey-Presentation-Deck-Main.pdf" target="_blank" class="btn-lang btn-deck cursor">
            <img src="../../../assets/images/landing/icon-folder.png" class="icon-folder" alt="" /> <span class="title-doc">{{ $t('landing-ido.about_pitch-deck') }}</span>
            <img src="../../../assets/images/landing/fi_arrow-right.png" class="icon-right" alt="" />
          </a>
          <a href="https://lynkey.com/media/LynKey-White-Paper-Tokenomics-Main.pdf" target="_blank" class="btn-lang btn-deck cursor">
            <img src="../../../assets/images/landing/icon-folder.png" class="icon-folder" alt="" />
            <span class="title-doc">{{ $t('landing-ido.about_white-paper') }}</span>
            <img src="../../../assets/images/landing/fi_arrow-right.png" class="icon-right" alt="" />
          </a>
          <a href="https://lynkey.com/media/INFORMATION_RESOURCES_LYNKEY_GLOBAL_ACRA.pdf" target="_blank" class="btn-lang cursor">
            <img src="../../../assets/images/landing/icon-folder.png" class="icon-folder" alt="" />
            <span class="title-doc">{{ $t('landing-ido.about_legal') }}</span>

            <img src="../../../assets/images/landing/fi_arrow-right.png" class="icon-right" alt="" />
          </a>
        </div>
      </div>
    </div>
    <el-dialog title="" :visible.sync="popupAboutUs">
      <div class="dialog-visition" v-if="popupAboutUs == true">
        <p>{{ $t('landing-ido.about_p1') }}</p>
        <p>{{ $t('landing-ido.about_p2') }}</p>
        <p>
          {{ $t('landing-ido.about_p3') }}
        </p>
        <p>
          {{ $t('landing-ido.about_p4') }}
        </p>
        <p>
          {{ $t('landing-ido.about_p5') }}
        </p>
        <p>
          {{ $t('landing-ido.about_p6') }}
        </p>
        <p>
          {{ $t('landing-ido.about_p7') }}
        </p>
        <p>
          {{ $t('landing-ido.about_p8') }}
        </p>
        <p>{{ $t('landing-ido.about_p9') }}</p>
      </div></el-dialog
    >
  </div>
</template>

<script>
  export default {
    data() {
      return {
        popupAboutUs: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  // #docs {
  //   scroll-margin-top: 100px;
  // }
  .main-about {
    padding-top: 120px;
    scroll-margin-top: 20px;
    .sack-k2-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
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
        max-width: 708px;
        width: 100%;
        text-align: left;
        .title-folder-top {
          font-size: 18px;
          line-height: 27px;
          font-weight: 400;
        }
        .title-folder-center {
          font-size: 48px;
          line-height: 60px;
          margin-top: 12px;
          margin-bottom: 60px;
          font-family: archivo-expanded;
        }
        .title-folder-bottom {
          font-size: 18px;
          line-height: 27px;
          font-weight: 400;
          color: #ffffffcc;
          .headding {
            margin-bottom: 25px;
          }
          .read-more {
            color: #cc00cc;
            cursor: pointer;
          }
        }
      }
      .sack-btn {
        display: flex;
        align-items: center;
        margin-top: 60px;
        position: relative;
        z-index: 3;
        .btn-lang {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 14px;
          border: 1px solid #ffffff;
          border-radius: 24px;
          text-decoration: none;
          height: 48px;
          width: 200px;
          .title-doc {
            font-size: 14px;
            line-height: 21px;
            font-weight: 700;
            color: #fff;
          }
          .icon-right {
            margin-left: 11px;
          }
          .icon-folder {
            margin-right: 13px;
          }
        }
        .btn-deck {
          margin-right: 24px;
        }
      }
    }
    .hiddenPC {
      display: none;
    }
    .hiddenMobile {
      display: block;
    }
    .dialog-visition {
      p:first-child {
        font-size: 48px;
        line-height: 57.6px;
        font-weight: 600;
        margin-bottom: 56px;
      }
      p {
        margin-bottom: 20px;
        font-size: 18px;
        line-height: 27px;
        font-weight: 400;
        color: #fff;
      }
      p:last-child {
        margin-bottom: 0px;
      }
      @media (min-width: 740px) and (max-width: 1024px) {
        p:first-child {
          font-size: 32px !important;
          line-height: 57.6px;
          font-weight: 600;
          margin-bottom: 20px;
        }
      }
      @media (max-width: 739px) {
        p:first-child {
          font-size: 24px;
          line-height: 57.6px;
          font-weight: 600;
          margin-bottom: 20px;
        }
        p {
          margin-bottom: 15px;
          font-size: 16px;
          line-height: 27px;
          font-weight: 400;
          color: #fff;
        }
      }
    }
    @media (max-width: 1024px) {
      .hiddenPC {
        display: block;
      }
      .hiddenMobile {
        display: none;
      }
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
            margin-bottom: 4px;
          }
          .title-folder-center {
            font-size: 24px;
            line-height: 31px;
            margin-top: 0px;
            margin-bottom: 24px;
          }
          .title-folder-bottom {
            font-size: 14px;
            font-weight: 400;
            line-height: 21px;
            margin-bottom: 36px;
          }
        }
        .sack-btn {
          display: flex;
          align-items: center;
          flex-direction: column;
          margin-top: 36px;
          .btn-lang {
            width: 100%;
            padding: 12px 0px;
            height: 48px;
            .title-doc {
              font-size: 14px;
              width: 81px;
            }
            .icon-right {
              margin-left: 16px;
            }
          }
          .btn-deck {
            margin-right: unset;
            margin-bottom: 24px;
          }
        }
      }
    }
  }
</style>
