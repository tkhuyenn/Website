<template>
  <div class="media">
    <div class="main container-lang" data-aos="fade-up" data-aos-duration="2000">
      <div class="content">
        <div class="btn-swi swiper-button-prev3"></div>
        <div>
          <h1>{{ $t('landing-ido.media-content') }}</h1>
          <div class="title">{{ $t('landing-ido.media-content-title') }}</div>
        </div>
        <div class="btn-swi swiper-button-next3"></div>
      </div>
      <swiper class="news" :options="swiperOption">
        <swiper-slide v-for="post in listPost" :key="post.id" class="new">
          <div class="img-new" @click="handleClickView(post.url)">
            <img :src="post.background" alt="" />
          </div>
          <div class="des-new" @click="handleClickView(post.url)">
            <p class="text-overflow-2">{{ post.title }}</p>
          </div>
          <div class="view-more" @click="handleClickView(post.url)">
            <p class="view-text">{{ $t('landing-ido.media-view-text') }}</p>
            <div class="icon-view">
              <span>
                <img src="./../../../assets/images/landing/fi_arrow-right-pink.png" alt="" />
              </span>
            </div>
          </div>
        </swiper-slide>
        <!-- <swiper-slide class="new">
          <div class="img-new">
            <img src="../../../assets/images/landing/new2.png" alt="" />
          </div>
          <div class="des-new">
            <p>LynKey: Leveraging With Crypto To Find Timesharing Solutions In Vietnam</p>
          </div>
          <div class="view-more">
            <p class="view-text">View More</p>
            <div class="icon-view">
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="new">
          <div class="img-new">
            <img src="../../../assets/images/landing/new3.png" alt="" />
          </div>
          <div class="des-new">
            <p>LynKey: Leveraging With Crypto To Find Timesharing Solutions In Vietnam</p>
          </div>
          <div class="view-more">
            <p class="view-text">View More</p>
            <div class="icon-view">
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="new">
          <div class="img-new">
            <img src="../../../assets/images/landing/new1.png" alt="" />
          </div>
          <div class="des-new">
            <p>LynKey: Leveraging With Crypto To Find Timesharing Solutions In Vietnam</p>
          </div>
          <div class="view-more">
            <p class="view-text">View More</p>
            <div class="icon-view">
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </swiper-slide> -->
      </swiper>
    </div>
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

  import defaultProject from '@/utils/firebase'

  export default {
    name: 'NewsAndVideo',
    title: 'Loop mode with multiple slides per group',
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        swiperOption: {
          // slidesPerView: 3,
          // spaceBetween: 24,
          // loop: true,
          breakpoints: {
            300: {
              slidesPerView: 1.5,
              spaceBetween: 16
            },
            375: {
              slidesPerView: 1.43,
              spaceBetween: 24,
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
              slidesPerView: 3,
              spaceBetween: 24
            },
            1400: {
              slidesPerView: 3,
              spaceBetween: 24
            },
            1770: {
              slidesPerView: 3,
              spaceBetween: 24
            }
          },
          navigation: {
            nextEl: '.swiper-button-next3',
            prevEl: '.swiper-button-prev3'
          }
        },
        listPost: []
      }
    },

    mounted() {
      this.getMyStory()
      // await this.checktNewVideo();
    },

    methods: {
      getMyStory() {
        defaultProject
          .firestore()
          // .collection('lynkey-news')
          .collection('lynkey-news-test')
          .get()
          .then(querySnapshot => {
            // console.log("querySnapshot", querySnapshot);
            // this.listPost = querySnapshot.data().sort(function (a, b) {
            //   return a.id - b.id;
            // });

            querySnapshot.forEach(doc => {
              this.listPost.push(doc.data())
            })
            //   const posts = Post.data();

            this.listPost.sort((a, b) => b.id - a.id)

            // });
          })
          .catch(() => {
            this.getMyStory()
          })
      },
      handleClickView(url) {
        window.open(url, '_blank')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .media {
    padding-bottom: 120px;
    position: relative;
    color: #fff;
    scroll-margin-top: 210px;
    &::before {
      content: '';
      position: absolute;
      background: #ab47bc;
      width: 600px;
      height: 600px;
      left: -300px;
      top: 15%;
      border-radius: 50%;
      filter: blur(168px);
    }
    .content {
      text-align: center;
      margin-bottom: 64px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .swiper-button-prev3 {
        position: relative;
        top: 0;
        left: 0;
        width: 72px;
        height: 72px;
        margin-top: 0;
        content: url(../../../assets/images/landing/swiper-prev.png);
        cursor: pointer;
      }
      .swiper-button-next3 {
        content: url(../../../assets/images/landing/swiper-next.png);
        position: relative;
        top: 0;
        left: 0;
        width: 72px;
        height: 72px;
        margin-top: 0;
        cursor: pointer;
      }
      .btn-carousel {
        font-size: 20px;
        border: 1px solid;
        border-radius: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        width: 50px;
        cursor: pointer;
        opacity: 0.8;
        :active {
          color: violet;
        }
      }
      h1 {
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
    .news {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      overflow: hidden;
      .new {
        cursor: pointer;
        background: rgb(38, 38, 46);
        // height: 450px;
        .img-new {
          img {
            object-fit: cover;
            width: 100%;
            // height: 240px;
          }
        }
        .des-new {
          font-size: 20px;
          line-height: 30px;
          margin: 36px 36px 24px 36px;
          height: 60px;
          font-family: archivo-expanded;
        }
        .view-more {
          display: flex;
          margin: 0 0 0 36px;
          margin-bottom: 24px !important;
          .view-text {
            font-size: 16px;
            line-height: 24px;
            margin-right: 29px;
            color: rgba(156, 39, 176, 1);
          }
          .icon-view {
            // margin-top: 4px;
            color: rgba(186, 104, 200, 1);
            font-size: 15px;
          }
        }
      }
    }
  }
  @media (max-width: 767px) {
    .container-lang {
      padding-right: 0 !important;
    }
    .media {
      &::before {
        content: '';
        position: absolute;
        background: #ab47bc;
        width: 400px;
        height: 400px;
        left: -200px;
        top: 32%;
        border-radius: 50%;
        filter: blur(132px);
        display: none;
      }
      .content {
        text-align: start;
        margin-bottom: 36px !important;
        justify-content: space-between !important;
        h1 {
          font-size: 14px !important;
          line-height: 21px !important;
          margin-bottom: 4px;
        }
        .title {
          font-size: 24px !important;
          line-height: 32px !important;
        }
        .btn-carousel {
          display: none !important;
        }
      }
    }
    .news {
      .new {
        // height: 311px !important;
        .img-new {
          img {
            max-width: 400px !important;
            height: 200px;
            width: 100%;
            object-fit: initial !important;
          }
        }
        .des-new {
          font-size: 14px !important;
          margin: 0 5px;
          margin: 24px 24px 17px 24px !important;
        }
        .view-more {
          margin: 0 0 0 24px !important;
          .view-text {
            margin-right: 16px !important;
            font-size: 14px !important;
            line-height: 21px !important ;
          }
          .icon-view {
            img {
              font-size: 14px !important;
            }
          }
        }
      }
    }
  }
  @media (max-width: 1000px) {
    .media .content {
      justify-content: center;
    }
    .btn-swi {
      display: none !important;
    }
  }

  @media (max-width: 420px) {
    .news {
      .new {
      }
      .img-new {
        img {
          max-width: 240px !important;
          width: 100%;
          height: 160px !important;
        }
      }
    }
  }
</style>
