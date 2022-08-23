<template>
  <div class="member number-advisors-new" data-aos="fade-up" data-aos-duration="2000">
    <div class="container-lang">
      <div class="content">
        <div class="btn-swi swiper-button-prev1"></div>
        <div>
          <h1>{{ $t('landing-ido.advisors_meet-our-team') }}</h1>
          <div class="title">{{ $t('landing-ido.advisors_title') }}</div>
        </div>
        <div class="btn-swi swiper-button-next1"></div>
      </div>
      <div class="swiper1">
        <swiper class="board" :options="swiperOption">
          <swiper-slide class="board-member">
            <div style="cursor: pointer" @click="handleClickMember(17)">
              <div class="member-img">
                <img src="../../../assets/images/landing/team/Cindy.jpg" alt="" />
              </div>
              <div class="des-member">
                <div class="text-name">Cindy Tran</div>
                <div class="job-member">{{ $t('landing-ido.advisors_job-member6') }}</div>
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
            <div @click="handleClickMember(88)" style="cursor: pointer">
              <div class="member-img">
                <img src="../../../assets/images/landing/board3.png" alt="" />
              </div>
              <div class="des-member">
                <div class="text-name">David Tran</div>
                <div class="job-member">{{ $t('landing-ido.blockchain-advisor') }}</div>
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
            <div @click="handleClickMember(12)">
              <div class="member-img">
                <img src="../../../assets/images/landing/team/Thomas-Le.jpg" alt="" />
              </div>
              <div class="des-member">
                <div class="text-name">Thomas Le</div>
                <div class="job-member">{{ $t('landing-ido.advisors_job-member1') }}</div>
              </div>
              <div class="detail">
                <div class="view-detail">{{ $t('landing-ido.advisors_view-detail') }}</div>
                <div class="icon-detail">
                  <span>
                    <img src="./../../../assets/images/landing/fi_arrow-right.png" alt="" />
                  </span>
                </div>
              </div>
            </div>
          </swiper-slide>
          <!-- <swiper-slide class="board-member">
            <div @click="handleClickMember(89)">
              <div class="member-img">
                <img src="../../../assets/images/landing/team/peter.png" alt="" />
              </div>
              <div class="des-member">
                <div class="text-name">Peter Thai</div>
                <div class="job-member">{{ $t('landing-ido.board_member-position2') }}</div>
              </div>
              <div class="detail">
                <div class="view-detail">{{ $t('landing-ido.advisors_view-detail') }}</div>
                <div class="icon-detail">
                  <span>
                    <img src="./../../../assets/images/landing/fi_arrow-right.png" alt="" />
                  </span>
                </div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide class="board-member">
            <div style="cursor: pointer" @click="handleClickMember(5)">
              <div class="member-img">
                <img src="../../../assets/images/landing/executive2.png" alt="" />
              </div>
              <div class="des-member">
                <div class="text-name">Hilton Supra</div>
                <div class="job-member">{{ $t('landing-ido.executive_job-member1') }}</div>
              </div>
              <div class="detail">
                <div class="view-detail">{{ $t('landing-ido.executive_view-detail') }}</div>
                <div class="icon-detail">
                  <span>
                    <img src="./../../../assets/images/landing/fi_arrow-right.png" alt="" />
                  </span>
                </div>
              </div>
            </div>
          </swiper-slide> -->

          <swiper-slide class="board-member">
            <!-- <div @click="handleClickMember(13)"> -->
            <div>
              <div class="member-img">
                <img src="../../../assets/images/landing/team/Jason-Jaehyuk.png" alt="" />
              </div>
              <div class="des-member">
                <div class="text-name">Jaehyuk Jang</div>
                <div class="job-member">{{ $t('landing-ido.board_member-position1') }}</div>
              </div>
              <div class="detail">
                <div class="view-detail">{{ $t('landing-ido.advisors_view-detail') }}</div>
                <div class="icon-detail">
                  <span>
                    <img src="./../../../assets/images/landing/fi_arrow-right.png" alt="" />
                  </span>
                </div>
              </div>
            </div>
          </swiper-slide>

          <swiper-slide class="board-member">
            <div @click="handleClickMember(14)">
              <div class="member-img">
                <img src="../../../assets/images/landing/team/Charle-Hu.jpg" alt="" />
              </div>
              <div class="des-member">
                <div class="text-name">Yechuan Charlie Hu</div>
                <div class="job-member">{{ $t('landing-ido.advisors_job-member3') }}</div>
              </div>
              <div class="detail">
                <div class="view-detail">{{ $t('landing-ido.advisors_view-detail') }}</div>
                <div class="icon-detail">
                  <span>
                    <img src="./../../../assets/images/landing/fi_arrow-right.png" alt="" />
                  </span>
                </div>
              </div>
            </div>
          </swiper-slide>

          <swiper-slide class="board-member">
            <div @click="handleClickMember(15)">
              <div class="member-img">
                <img src="../../../assets/images/landing/team/Micheal-Sung.jpg" alt="" />
              </div>
              <div class="des-member">
                <div class="text-name">Michael Sung</div>
                <div class="job-member">{{ $t('landing-ido.advisors_job-member4') }}</div>
              </div>
              <div class="detail">
                <div class="view-detail">{{ $t('landing-ido.advisors_view-detail') }}</div>
                <div class="icon-detail">
                  <span>
                    <img src="./../../../assets/images/landing/fi_arrow-right.png" alt="" />
                  </span>
                </div>
              </div>
            </div>
          </swiper-slide>

          <!-- <swiper-slide class="board-member">
            <div @click="handleClickMember(13)">
              <div class="member-img">
                <img src="../../../assets/images/landing/team/Micheal-Turpin.jpg" alt="" />
              </div>
              <div class="des-member">
                <div class="text-name">Michael Terpin</div>
                <div class="job-member">Globe Events PR Crypto Community</div>
              </div>
              <div class="detail">
                <div class="view-detail">View Detail</div>
                <div class="icon-detail">
                  <span>
                    <img src="./../../../assets/images/landing/fi_arrow-right.png" alt="" />
                  </span>
                </div>
              </div>
            </div>
          </swiper-slide> -->

          <swiper-slide class="board-member">
            <div>
              <div class="member-img">
                <img src="../../../assets/images/landing/team/tuandinh.png" alt="" />
              </div>
              <div class="des-member">
                <div class="text-name">Tuan Dinh</div>
                <div class="job-member">{{ $t('landing-ido.advisors_job-member5') }}</div>
              </div>
              <div class="detail">
                <div class="view-detail">{{ $t('landing-ido.advisors_view-detail') }}</div>
                <div class="icon-detail">
                  <span>
                    <img src="./../../../assets/images/landing/fi_arrow-right.png" alt="" />
                  </span>
                </div>
              </div>
            </div>
          </swiper-slide>

          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <el-dialog title="" :visible.sync="dialogViewNumber">
          <div v-if="dialogViewNumber == true" class="dialog-team">
            <p>{{ detail.name }}</p>
            <p class="team-title">{{ detail.title }}</p>
            <p>{{ detail.desc }}</p>
          </div></el-dialog
        >
        <!-- <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
  // import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/swiper-bundle.css'
  import Vue from 'vue'
  import { Swiper as SwiperClass, Navigation } from 'swiper/swiper.esm'
  import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
  SwiperClass.use([Navigation])
  Vue.use(getAwesomeSwiper(SwiperClass))
  const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)

  // import 'swiper/css/swiper.css'
  export default {
    name: 'LandingAdivisors',
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
          },

          navigation: {
            nextEl: '.swiper-button-next1',
            prevEl: '.swiper-button-prev1'
          }
        },
        dialogViewNumber: false,
        detail: {},
        teamList: [
          {
            id: 5,
            name: 'Hilton Supra',
            title: this.$i18n.t('landing-ido.executive_list-title1'),
            desc: this.$i18n.t('landing-ido.executive_list-desc1')
          },
          {
            id: 10,
            name: 'Javed Khattak',
            title: this.$i18n.t('landing-ido.advisors_list-title1'),
            desc: this.$i18n.t('landing-ido.advisors_list-desc1')
          },
          {
            id: 11,
            name: 'Peter Kristensen',
            title: this.$i18n.t('landing-ido.advisors_list-title2'),
            desc: this.$i18n.t('landing-ido.advisors_list-desc2')
          },
          {
            id: 12,
            name: 'Thomas Le',
            title: this.$i18n.t('landing-ido.advisors_job-member1'),
            desc: this.$i18n.t('landing-ido.advisors_list-desc3')
          },
          /* {
            id: 28,
            name: 'Peter Thai',
            title: this.$i18n.t('landing-ido.board_list-title28'),
            desc: this.$i18n.t('landing-ido.board_list-desc28')
          },*/
          // {
          //   id: 13,
          //   name: 'Michael Terpin',
          //   title: this.$i18n.t('landing-ido.advisors_list-title4'),
          //   desc: this.$i18n.t('landing-ido.advisors_list-desc4')
          // },
          {
            id: 14,
            name: 'Yechuan Charlie Hu',
            title: this.$i18n.t('landing-ido.advisors_list-title5'),
            desc: this.$i18n.t('landing-ido.advisors_list-desc5')
          },
          {
            id: 15,
            name: 'Michael Sung',
            title: this.$i18n.t('landing-ido.advisors_list-title6'),
            desc: this.$i18n.t('landing-ido.advisors_list-desc6')
          },
          {
            id: 16,
            name: 'Nitin Kalra',
            title: this.$i18n.t('landing-ido.advisors_list-title7'),
            desc: this.$i18n.t('landing-ido.advisors_list-desc7')
          },
          {
            id: 17,
            name: 'Cindy Tran',
            title: this.$i18n.t('landing-ido.advisors_job-member6'),
            desc: this.$i18n.t('landing-ido.board_list-desc1')
          },
          {
            id: 88,
            name: 'David Tran',
            title: this.$i18n.t('landing-ido.blockchain-advisor'),
            desc: this.$i18n.t('landing-ido.board_list-desc4')
          },
          {
            id: 89,
            name: 'Peter Thai',
            title: this.$i18n.t('advisors_title-peter-thai'),
            desc: this.$i18n.t('advisors_desc-peter-thai')
          }
        ]
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
  .member {
    position: relative;
    padding-bottom: 120px;
    color: rgba(255, 255, 255, 1);
    .content {
      text-align: center;
      margin-bottom: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      .swiper-button-prev1 {
        margin-top: 0;
        position: relative;
        top: 0;
        left: 0;
        width: 72px;
        height: 72px;
        content: url(../../../assets/images/landing/swiper-prev.png);
        cursor: pointer;
      }
      .swiper-button-next1 {
        content: url(../../../assets/images/landing/swiper-next.png);
        margin-top: 0;
        position: relative;
        top: 0;
        left: 0;
        width: 72px;
        height: 72px;
        cursor: pointer;
      }
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
        // margin: 0 8px;
        cursor: pointer;
        .member-img {
          //   width: 100%;
          //   max-width: 342px;
          height: 342px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .des-member {
          margin: 24px 0;
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
            height: 48px;
          }
        }
        .detail {
          display: flex;
          height: 49px;
          align-items: center;
          border-bottom: 1px solid #ffffff24;
          padding-bottom: 24px;
          cursor: pointer;
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
  @media (max-width: 1000px) {
    .member .content {
      justify-content: center;
    }
  }
  @media (max-width: 767px) {
    .container-lang {
      padding-right: 0 !important;
    }
    .content {
      text-align: start !important;
      margin-bottom: 24px !important;
      justify-content: space-between !important;
      .btn-carousel {
        display: none !important;
      }
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
        .member-img {
          height: auto !important;
        }
        img {
          width: 100%;
        }
        .des-member {
          margin-top: 8px !important;
          height: 102px;
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
  @media (max-width: 1000px) {
    .btn-swi {
      display: none !important;
    }
  }
  @media (min-width: 300px) and (max-width: 430px) {
    .container-lang {
      padding-right: 0px !important;
    }
    .board {
      .board-member {
        .member-img {
          img {
            width: 154px !important;
            height: 154px !important;
          }
        }
      }
      .detail {
        width: 154px !important;
      }
    }
  }
</style>
