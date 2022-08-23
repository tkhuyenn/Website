<template>
  <div class="member board-member-new" id="teams" data-aos="fade-up" data-aos-duration="2000">
    <div class="container-lang">
      <div class="content">
        <h1>{{ $t('landing-ido.board_meet-our-team') }}</h1>
        <div class="title">{{ $t('landing-ido.board_title') }}</div>
      </div>
      <swiper class="board" :options="swiperOption">
        <!-- <swiper-slide class="board-member">
          <div style="cursor: pointer" @click="handleClickMember(1)">
            <div class="member-img">
              <img src="../../../assets/images/landing/board1.png" alt="" />
            </div>
            <div class="des-member">
              <div class="text-name">Cindy Tran</div>
              <div class="job-member">{{ $t('landing-ido.board_member-position1') }}</div>
            </div>
            <div class="detail">
              <div class="view-detail">{{ $t('landing-ido.board_view-detail') }}</div>
              <div class="icon-detail">
                <span>
                  <img src="./../../../assets/images/landing/fi_arrow-right.png" alt="" />
                </span>
              </div>
            </div>
          </div>
        </swiper-slide> -->
        <swiper-slide class="board-member">
          <div @click="handleClickMember(2)" style="cursor: pointer">
            <div class="member-img">
              <img src="../../../assets/images/landing/board2.png" alt="" />
            </div>
            <div class="des-member">
              <div class="text-name">Dinis Guarda</div>
              <div class="job-member">{{ $t('landing-ido.board_member-position2') }}</div>
            </div>
            <div class="detail">
              <div class="view-detail">{{ $t('landing-ido.board_view-detail') }}</div>
              <div class="icon-detail">
                <span>
                  <img src="./../../../assets/images/landing/fi_arrow-right.png" alt="" />
                </span>
              </div>
            </div>
          </div>
        </swiper-slide>
        <!-- <swiper-slide class="board-member">
          <div @click="handleClickMember(4)" style="cursor: pointer">
            <div class="member-img">
              <img src="../../../assets/images/landing/board3.png" alt="" />
            </div>
            <div class="des-member">
              <div class="text-name">David Tran</div>
              <div class="job-member">{{ $t('landing-ido.board_member-position3') }}</div>
            </div>
            <div class="detail">
              <div class="view-detail">{{ $t('landing-ido.board_view-detail') }}</div>
              <div class="icon-detail">
                <span>
                  <img src="./../../../assets/images/landing/fi_arrow-right.png" alt="" />
                </span>
              </div>
            </div>
          </div>
        </swiper-slide> -->
        <swiper-slide class="board-member">
          <div @click="handleClickMember(3)" style="cursor: pointer">
            <div class="member-img">
              <img src="../../../assets/images/landing/board4.png" alt="" />
            </div>
            <div class="des-member">
              <div class="text-name">Henry Bui</div>
              <div class="job-member">{{ $t('landing-ido.board_member-position4') }}</div>
            </div>
            <div class="detail">
              <div class="view-detail">{{ $t('landing-ido.board_view-detail') }}</div>
              <div class="icon-detail">
                <span>
                  <img src="./../../../assets/images/landing/fi_arrow-right.png" alt="" />
                </span>
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="board-member">
          <div style="cursor: pointer" @click="handleClickMember(1)">
            <div class="member-img">
              <img src="../../../assets/images/landing/executive2.png" alt="" />
            </div>
            <div class="des-member">
              <div class="text-name">Hilton Supra</div>
              <div class="job-member">{{$t('landing-ido.board_member-position1')}}</div>
            </div>
            <div class="detail">
              <div class="view-detail">{{$t('landing-ido.board_view-detail')}}</div>
              <div class="icon-detail">
                <span>
                  <img src="./../../../assets/images/landing/fi_arrow-right.png" alt="" />
                </span>
              </div>
            </div>
          </div>
        </swiper-slide>
        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      </swiper>
    </div>
    <el-dialog title="" :visible.sync="dialogViewNumber">
      <div v-if="dialogViewNumber === true" class="dialog-team">
        <p>{{ detail.name }}</p>
        <p class="team-title">{{ detail.title }}</p>
        <p>{{ detail.desc }}</p>
      </div></el-dialog
    >
  </div>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/swiper-bundle.css'

  // import 'swiper/css/swiper.css'
  export default {
    name: 'LandingBoard',
    title: 'Loop mode with multiple slides per group',
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        swiperOption: {
          slidesPerView: 4,
          spaceBetween: 24,
          breakpoints: {
            280: {
              slidesPerView: 2,
              spaceBetween: 16,
              grabCursor: true
            },
            320: {
              slidesPerView: 2,
              spaceBetween: 16,
              grabCursor: true
            },
            375: {
              slidesPerView: 2.3,
              spaceBetween: 35,
              grabCursor: true
            },
            400: {
              slidesPerView: 2.3,
              spaceBetween: 9,
              grabCursor: true
            },
            640: {
              slidesPerView: 2.5,
              spaceBetween: 16,
              grabCursor: true
            },
            786: {
              slidesPerView: 2.5,
              spaceBetween: 20,
              // centeredSlides: true,
              grabCursor: true
            },
            1000: {
              slidesPerView: 2.5,
              spaceBetween: 24
            },
            1300: {
              slidesPerView: 4,
              spaceBetween: 24
            },
            1400: {
              slidesPerView: 4,
              spaceBetween: 24
            },
            1770: {
              slidesPerView: 4,
              spaceBetween: 24
            }
          }
          // navigation: {
          //   nextEl: '.swiper-button-next',
          //   prevEl: '.swiper-button-prev'
          // }
        },
        detail: {},
        teamList: [
          {
            id: 1,
            name: 'Hilton Supra',
            title: this.$i18n.t('landing-ido.executive_list-title1'),
            desc: this.$i18n.t('landing-ido.executive_list-desc1')
          },
          {
            id: 2,
            name: 'Dinis Guarda',
            title: this.$i18n.t('landing-ido.board_list-title2'),
            desc: this.$i18n.t('landing-ido.board_list-desc2')
          },
          {
            id: 3,
            name: 'Henry Bui',
            title: this.$i18n.t('landing-ido.board_list-title3'),
            desc: this.$i18n.t('landing-ido.board_list-desc3')
          },
          {
            id: 4,
            name: 'David Tran',
            title: this.$i18n.t('landing-ido.board_list-title4'),
            desc: this.$i18n.t('landing-ido.board_list-desc4')
          }
        ],
        dialogViewNumber: false
      }
    },
    methods: {
      handleClickMember(id) {
        this.detail = this.teamList.filter(item => item.id === id)[0]
        this.dialogViewNumber = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  // #teams {
  // scroll-margin-top: 90px;
  // }
  .board-member-new {
    padding-top: 240px;
    margin-top: -120px;
    scroll-margin-top: 70px;
  }
  .member {
    position: relative;
    color: rgba(255, 255, 255, 1);
    .content {
      text-align: center;
      margin-bottom: 60px;
      h1 {
        font-weight: 400;
        font-size: 18px;
        line-height: 27px;
        margin-bottom: 12px;
      }
      .title {
        font-size: 36px;
        line-height: 44px;
        font-family: archivo-expanded;
      }
    }
    .board {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      overflow: hidden;
      .board-member {
        display: flex;
        flex: 1 1 0%;
        flex-direction: column;
        .member-img {
          // width: 100%;
          // max-width: 342px;
          img {
            width: 100%;
            // max-width: 342px;
            // object-fit: cover;
          }
        }
        .des-member {
          margin: 24px 0;
          flex: 1 1 0%;

          .text-name {
            font-size: 24px;
            line-height: 32px;
            margin-bottom: 12px;
            font-family: archivo-expanded;
          }
          .job-member {
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            @media (max-width: 1366px) {
              // height: 48px;
            }
          }
        }
        .detail {
          display: flex;
          height: 49px;
          align-items: center;
          /* margin-bottom: 24px; */
          border-bottom: 1px solid #ffffff24;
          cursor: pointer;
          padding-bottom: 24px;
          .view-detail {
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            margin-right: 24px;
          }
          .icon-detail {
            margin-top: 4px;
            :hover {
              cursor: pointer;
            }
            :active {
              color: blue;
            }
          }
        }
      }
    }
  }
  @media (max-width: 767px) {
    .container-lang {
      padding-right: 0 !important;
    }
    .content {
      text-align: start !important;
      margin-bottom: 24px !important;
      h1 {
        font-size: 14px !important;
        margin-bottom: 4px !important;
      }
      .title {
        font-size: 24px !important;
        font-weight: 700 !important;
      }
    }
    .board {
      // grid-template-columns: 1fr 1fr !important;
      .board-member {
        img {
          width: 100%;
        }
        .des-member {
          margin-top: 8px !important;
          // height: 102px;
          margin-bottom: 0px !important;
          .text-name {
            margin-bottom: 0px !important;
            font-size: 18px !important;
            line-height: 27px !important;
          }
          .job-member {
            font-size: 12px !important;
            // height: 72px;
            line-height: 18px !important;
          }
        }
      }
      .detail {
        .view-detail {
          font-size: 14px !important;
          margin-right: 16px !important;
        }
      }
    }
  }
  @media (min-width: 320px) and (max-width: 430px) {
    .board {
      .board-member {
        .member-img {
          img {
            width: 154px !important;
            height: 154px;
          }
        }
        .des-member {
          height: 102px;
        }
      }
      .detail {
        width: 154px !important;
      }
    }
  }
</style>
