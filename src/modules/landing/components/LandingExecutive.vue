<template>
  <div class="member excecutive-new" data-aos="fade-up" data-aos-duration="2000">
    <div class="container-lang">
      <div class="content">
        <div class="btn-swi swiper-button-prev"></div>
        <div>
          <h1>{{ $t('landing-ido.executive_meet-our-team') }}</h1>
          <div class="title">{{ $t('landing-ido.executive_title') }}</div>
        </div>
        <div class="btn-swi swiper-button-next"></div>
      </div>
      <swiper class="board" :options="swiperOption">
        <!-- <swiper-slide class="board-member">
          <div style="cursor: pointer" @click="handleClickMember(6)">
            <div class="member-img">
              <img src="../../../assets/images/landing/executive3.png" alt="" />
            </div>
            <div class="des-member">
              <div class="text-name">Asad Sultan</div>
              <div class="job-member">{{ $t('landing-ido.executive_job-member2') }}</div>
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
        <!-- <swiper-slide class="board-member">
          <div style="cursor: pointer" @click="handleClickMember(7)">
            <div class="member-img">
              <img src="../../../assets/images/landing/team/Jaehyuk-Jang.jpeg" alt="" />
            </div>
            <div class="des-member">
              <div class="text-name">Tony Hua</div>
              <div class="job-member">{{ $t('landing-ido.executive_job-member3') }}</div>
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
          <div style="cursor: pointer" @click="handleClickMember(7)">
            <div class="member-img">
              <img src="../../../assets/images/landing/team/tonyhua.png" alt="" />
            </div>
            <div class="des-member">
              <div class="text-name">Tuan Hua</div>
              <div class="job-member">{{ $t('landing-ido.executive_job-member3') }}</div>
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
        </swiper-slide>
        <!-- <swiper-slide class="board-member">
          <div style="cursor: pointer" @click="handleClickMember(8)">
            <div class="member-img">
              <img src="../../../assets/images/landing/executive1.png" alt="" />
            </div>
            <div class="des-member">
              <div class="text-name">Jonathan Gowen</div>
              <div class="job-member">{{ $t('landing-ido.executive_job-member4') }}</div>
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
          <div style="cursor: pointer" @click="handleClickMember(9)">
            <div class="member-img">
              <img src="../../../assets/images/landing/team/Sonesh.jpg" alt="" />
            </div>
            <div class="des-member">
              <div class="text-name">Sonesh Sira</div>
              <div class="job-member">{{ $t('landing-ido.executive_job-member5') }}</div>
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
        </swiper-slide>
        <swiper-slide class="board-member">
          <div @click="handleClickMember(10)">
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
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <el-dialog title="" :visible.sync="dialogViewNumber">
      <div v-if="dialogViewNumber === true" class="dialog-team">
        <p>{{ detail.name }}</p>
        <p class="team-title">{{ detail.title }}</p>
        <p>{{ detail.desc }}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import 'swiper/swiper-bundle.css'
  import Vue from 'vue'
  import { Swiper as SwiperClass, Navigation } from 'swiper/swiper.esm'
  import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
  SwiperClass.use([Navigation])
  Vue.use(getAwesomeSwiper(SwiperClass))
  const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)

  // import 'swiper/css/swiper.css'
  export default {
    name: 'LandingExecutive',
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
          // loop: true,
          // touchRatio: 0,
          // responsive: [
          //   breakpoint: 786
          // ],
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
              // touchRatio: 0
            },
            786: {
              slidesPerView: 2.5,
              spaceBetween: 20,
              grabCursor: true
              // touchRatio: 0
            },
            1000: {
              slidesPerView: 2.5,
              spaceBetween: 24
              // touchRatio: 0
            },
            1300: {
              slidesPerView: 4,
              spaceBetween: 24
              // touchRatio: 1
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
          // pagination: {teamList
          //   el: '.swiper-pagination',
          //   clickable: true
          // },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        dialogViewNumber: false,
        detail: {},
        teamList: [
          {
            id: 6,
            name: 'Asad Sultan',
            title: this.$i18n.t('landing-ido.executive_list-title2'),
            desc: this.$i18n.t('landing-ido.executive_list-desc2')
          },
          {
            id: 7,
            name: 'Tony Hua',
            title: this.$i18n.t('landing-ido.executive_list-title3'),
            desc: this.$i18n.t('landing-ido.executive_list-desc3')
          },
          {
            id: 9,
            name: 'Sonesh Sira',
            title: this.$i18n.t('landing-ido.executive_list-title5'),
            desc: this.$i18n.t('landing-ido.executive_list-desc5')
          },
          {
            id: 10,
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
    padding-top: 120px;
    padding-bottom: 120px;
    color: rgba(255, 255, 255, 1);
    .content {
      text-align: center;
      margin-bottom: 60px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .swiper-button-prev {
        margin-top: 0;
        position: relative;
        top: 0;
        left: 0;
        width: 72px;
        height: 72px;
        content: url(../../../assets/images/landing/swiper-prev.png);
      }
      .swiper-button-next {
        content: url(../../../assets/images/landing/swiper-next.png);
        position: relative;
        top: 0;
        right: 0;
        width: 72px;
        height: 72px;
        margin-top: 0;
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
        display: flex;
        flex: 1 1 0%;
        flex-direction: column;
        .member-img {
          height: 342px;
          // width: 100%;
          // max-width: 342px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .des-member {
          margin: 24px 0 24px 0;
          flex: 1 1 0%;
          .text-name {
            font-size: 24px;
            line-height: 32px;
            margin-bottom: 12px;
            font-family: archivo-expanded;
            @media (max-width: 450px) {
              // height: 68px;
              font-size: 18px;
            }
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
          // margin-top: 8px !important;
          margin: 8px 0 0px 0 !important;
          height: 102px;
          .text-name {
            margin-bottom: 0px !important;
            font-size: 18px !important;
            line-height: 27px !important;
          }
          .job-member {
            font-size: 12px !important;
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
            height: 154px;
          }
        }
      }
      .detail {
        width: 154px !important;
      }
    }
  }
</style>
