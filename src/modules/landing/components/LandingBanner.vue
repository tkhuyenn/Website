<template>
  <div class="banner">
    <div class="wrap-banner">
      <div class="video-wrp">
        <video class="bg-vid" autoplay loop muted preload="auto" playsinline>
          <source src="https://www.youtube.com/watch?v=79bHb1Vpjtc" />
        </video>
        <!-- <iframe
          width="100%"
          height="100%"
          ref="videoBackground"
          src="https://www.youtube.com/embed/NE0lPQjbsAk?autoplay=1&modestbranding=1&autohide=1&mute=1&controls=0&loop=1&showinfo=0&playlist=NE0lPQjbsAk"
          title="YouTube video player"
          frameborder="0"
          allowfullscreen="allowfullscreen"
          mozallowfullscreen="mozallowfullscreen"
          msallowfullscreen="msallowfullscreen"
          oallowfullscreen="oallowfullscreen"
          webkitallowfullscreen="webkitallowfullscreen"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; allowfullscreen;muted"
        ></iframe> -->
      </div>
      <div class="content-wrap container-lang">
        <div class="banner-title">{{ $t('landing-ido.banner_title') }}</div>
        <img src="../../../assets/images/landing/icon-play.png" class="content-img" @click="popupVideo = true" alt="" />
        <div class="banner-timeline">
          <div class="banner-timeline-left">
            <div v-if="isEndOn" class="banner-timeline--title">{{ getRoundNumber }} {{ $t('introduce.end-on') }}:</div>
            <div v-else class="banner-timeline--title">{{ getRoundNumber }} {{ $t('introduce.ready') }}:</div>
            <div class="be-flex timer">
              <div class="timer-item">
                <h3 class="text-40">{{ day }}</h3>
                <span class="small-title">{{ $t('time.day') }}</span>
              </div>
              <div class="timer-item">
                <h3 class="text-40">{{ hour }}</h3>
                <span class="small-title">{{ $t('time.hour') }}</span>
              </div>
              <div class="timer-item">
                <h3 class="text-40">{{ minute }}</h3>
                <span class="small-title">{{ $t('time.minute') }}</span>
              </div>
              <div class="timer-item">
                <h3 class="text-40">{{ second }}</h3>
                <span class="small-title">{{ $t('time.second') }}</span>
              </div>
            </div>
          </div>
          <div class="banner-timeline-right">
            <div class="be-flex jc-space-between progress-label">
              <div class="progress-top">
                <span class="text-sm">{{ roundCurrent && roundCurrent.totalSold | formatNumber }} </span> LYNK {{ $t('introduce.soid') }}
              </div>
              <div class="progress-top">
                <span class="text-sm">{{ roundCurrent && roundCurrent.totalAvailable | formatNumber }} </span> LYNK {{ $t('introduce.left') }}
              </div>
            </div>
            <el-progress :percentage="progressbar" color="#129961" :show-text="false" :stroke-width="12"></el-progress>
            <!-- <div class="be-flex description">
              <div class="desitem">
                <h3 class="text-l text-bold">{{ ((roundCurrent && roundCurrent.percentageSold * 1000) / 10) | convertAmountDecimal('PERCENT') }}%</h3>
                <span class="small-title">{{ $t('crowd-sale.funded') }}</span>
              </div>
              <div class="desitem desitem--border">
                <h3 class="text-l text-bold">${{ roundCurrent && (roundCurrent.totalSold * roundCurrent.price) | convertAmountDecimal('USD') }}</h3>
                <span class="small-title">{{ $t('crowd-sale.raised') }}</span>
              </div>
              <div class="desitem">
                <h3 class="text-l text-bold">{{ roundCurrent && roundCurrent.totalBacker | formatNumber }}</h3>
                <span class="small-title">{{ $t('crowd-sale.backers') }}</span>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="" :visible.sync="popupVideo">
      <div class="dialog-video">
        <video v-if="popupVideo === true" class="bg-vid" controls autoplay loop preload="auto" playsinline>
          <source src="https://www.youtube.com/watch?v=79bHb1Vpjtc" />
        </video>
        <!-- <iframe
          width="100%"
          height="100%"
          ref="videoBackground"
          src="https://www.youtube.com/embed/NE0lPQjbsAk?autoplay=1&modestbranding=1&autohide=1&mute=1&controls=0&loop=1&showinfo=0&playlist=NE0lPQjbsAk"
          title="YouTube video player"
          frameborder="0"
          allowfullscreen="allowfullscreen"
          mozallowfullscreen="mozallowfullscreen"
          msallowfullscreen="msallowfullscreen"
          oallowfullscreen="oallowfullscreen"
          webkitallowfullscreen="webkitallowfullscreen"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; allowfullscreen;muted"
        ></iframe> -->
      </div></el-dialog
    >
  </div>
</template>

<script>
  import firebase from '@/utils/firebase'
  import findIndex from 'lodash/findIndex'
  import forEach from 'lodash/forEach'
  import JSEncrypt from 'jsencrypt'
  import request from '@/plugins/request'
  import { mapGetters } from 'vuex'
  export default {
    name: 'LandingBanner',
    data() {
      return {
        popupVideo: false,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        listener: null,
        listRound: [],
        roundCurrent: {},
        isEndOn: false,
        progressbar: 0,
        timing: null,
        show: false
      }
    },
    async created() {
      // this.isLoading = true;
      // await this.handleSignInFireBase()
      // await this.handleTurnOnFirebase()
      this.show = true
      const lang = window.localStorage.getItem('bc-lang')
      if (!lang) {
        window.localStorage.setItem('bc-lang', 'en')
      } else {
        this.selectLanguage = lang
      }
    },
    destroyed() {
      // const leadsRef = firebase.database().ref('crowdsales_dashboard')
      const leadsRef = firebase.database().ref('crowd-sales')
      leadsRef.off('value', this.listener)
      clearInterval(this.timing)
    },
    computed: {
      ...mapGetters('beAuth', ['isLogin']),
      getRoundNumber() {
        return this.roundCurrent?.name
      },

      getIsEndRound() {
        const index = findIndex(this.listRound, elm => elm.id === this.roundCurrent.id)
        if (index === this.listRound.length - 1) {
          return true
        }
        return false
      }
    },
    methods: {
      // async handleSignInFireBase() {
      //   try {
      //     const data = {
      //       password: this.encryptPassword('#!@Firebase-web-client@!#')
      //     }
      //     const result = await this.getToken(data)
      //     await firebase.auth().signInWithCustomToken(result.authToken)
      //   } catch (error) {
      //     console.log(error)
      //   }
      // },
      // encryptPassword(pass) {
      //   const PUBLIC_KEY =
      //     'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCgw0IeOV0DZL1ZfzsSSbZDRu9XPPBkb4EVsFKYODFJnEEMdVK3IBhCyehoUbJFufIvdQD78LyfRo46fB5B6k+EsLC/4vofQiYyE/R13r+Fd+xufTXpxDKkj544LtfBfvsh/fYFx+vUH1/5XtuCplBX4cOsIdMni026zZv46clJswIDAQAB'
      //   const RSAEncrypt = new JSEncrypt()
      //   RSAEncrypt.setPublicKey(PUBLIC_KEY)
      //   return RSAEncrypt.encrypt(pass)
      // },
      // async getToken(data) {
      //   try {
      //     const result = await request.post('api/v1/firebase/auth', data)
      //     return Promise.resolve(result.data.data)
      //   } catch (error) {
      //     return Promise.reject(error)
      //   }
      // },

      async handleTurnOnFirebase() {
        // const leadsRef = firebase.database().ref('crowdsales_dashboard')
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        // let _this = this
        // this.listener = leadsRef.on('value', function (snapshot) {
        //   const response = snapshot.val()
        //   const totalInvestor = response.totalInvestor
        //   // const totalInvestor = filter(listCountry, elm => elm.numOfInvestor).reduce((previousValue, currentValue) => previousValue + currentValue.numOfInvestor, 0)
        //   _this.arrTotalInvestor = (new Array(7 + 1 - (totalInvestor + '').length).join('0') + totalInvestor).split('')
        //   _this.top3 = response.data.slice(0, 3)
        // })

        /*
         * firebase backup
         */
        const leadsRef = firebase.database().ref('crowd-sales')

        //eslint-disable-next-line @typescript-eslint/no-this-alias
        let _this = this
        this.listener = leadsRef.on('value', function (snapshot) {
          _this.listRound = snapshot.val()
          const roundActive = snapshot.val().filter(round => round.isActive)
          if (!roundActive.length) {
            _this.roundCurrent = null
            _this.isEndOn = false
            _this.handleGetRoundNext()
          } else {
            _this.roundCurrent = roundActive[0]
            _this.isEndOn = true
            _this.progressbar = _this.$options.filters.convertAmountDecimal((_this.roundCurrent.percentageSold * 1000) / 10, 'PERCENT') * 1
            _this.handleGetData()
          }
        })
      },

      handleGetRoundNext() {
        const leadsRef = firebase.database().ref('crowd-sales')
        leadsRef.off('value', this.listener)

        /**
         * Nếu response là round cuối
         * response là null <=> chưa vào round nào => lấy round 1
         */

        if (!this.roundCurrent) {
          const roundFirst = this.listRound[0]
          const roundLast = this.listRound[this.listRound.length - 1]

          const toDay = Date.now()
          const fromTimeRoundFirst = new Date(roundFirst.fromDate.time).getTime()
          const toTimeRoundLast = new Date(roundLast.toDate.time).getTime()

          // Nếu today > time roundLast
          if (toDay > toTimeRoundLast) {
            this.day = '00'
            this.hour = '00'
            this.minute = '00'
            this.second = '00'
            this.roundCurrent = roundLast
            this.isEndOn = true
            // this.isLoading = false;
          }
          // Nếu today < time roundFirst
          if (toDay < fromTimeRoundFirst) {
            this.roundCurrent = this.listRound[0]
            this.progressbar = this.$options.filters.convertAmountDecimal((this.roundCurrent.percentageSold * 1000) / 10, 'PERCENT') * 1
            this.handleGetData('from')
          }
          // Nếu fromTimeRoundFirst < today < toTimeRoundLast
          if (toDay > fromTimeRoundFirst && toDay < toTimeRoundLast) {
            forEach(this.listRound, round => {
              const fromTime = new Date(round.fromDate.time).getTime()
              if (toDay < fromTime) {
                this.roundCurrent = round
                return false
              }
            })

            this.isEndOn = false
            this.progressbar = this.$options.filters.convertAmountDecimal((this.roundCurrent.percentageSold * 1000) / 10, 'PERCENT') * 1
            this.handleGetData('from')
          }
        }
      },

      handleGetData(type = 'to') {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let _this = this
        this.countDownDate = type === 'to' ? new Date(this.roundCurrent.toDate.time).getTime() : new Date(this.roundCurrent.fromDate.time).getTime()

        this.timing = setInterval(function () {
          let now = new Date().getTime()

          let distance = _this.countDownDate - now

          //case ready start chạy hết time
          if (distance <= 0 && !_this.isEndOn) {
            _this.countDownDate = new Date(_this.roundCurrent.toDate.time).getTime()
            _this.handleTurnOnFirebase()
            _this.isEndOn = true
            // _this.isLoading = false;
          }

          //case chạy hết time end on và không phải round cuối
          if (distance <= 0 && _this.isEndOn && !_this.getIsEndRound) {
            // _this.isLoading = true;
            _this.handleTurnOnFirebase()
            _this.isEndOn = true
            // _this.isLoading = false;
            return
          }

          //case round cuối và hết hạn
          if (distance <= 0 && _this.isEndOn && _this.getIsEndRound) {
            clearInterval(_this.timing)
            const leadsRef = firebase.database().ref('crowd-sales')
            leadsRef.off('value', _this.listener)
            // EventBus.$emit('activeRound', false)
            // _this.setIsActiveRound(false)

            // _this.isLoading = false;
            return
          }

          _this.day = Math.floor(distance / (1000 * 60 * 60 * 24)) >= 10 ? Math.floor(distance / (1000 * 60 * 60 * 24)) : '0' + Math.floor(distance / (1000 * 60 * 60 * 24))
          _this.hour =
            Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) >= 10
              ? Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
              : '0' + Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          _this.minute =
            Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) >= 10
              ? Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
              : '0' + Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          _this.second = Math.floor((distance % (1000 * 60)) / 1000) >= 10 ? Math.floor((distance % (1000 * 60)) / 1000) : '0' + Math.floor((distance % (1000 * 60)) / 1000)
        }, 1000)
        // this.isLoading = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .banner {
    .wrap-banner {
      position: relative;
      .video-wrp {
        right: 0;
        bottom: 0;
        width: 100%;
        height: 870px;
        opacity: 0.5;
        .bg-vid {
          z-index: -1;
          width: 100%;
          object-fit: cover;
          height: 100%;
        }
      }
      .content-wrap {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        // @media (max-height: 800px) {
        //   top: 46%;
        // }
        .banner-title {
          font-family: archivo-expanded;
          font-size: 54px;
          line-height: 65px;
          font-weight: 700;
          max-width: 837px;
          width: 100%;
          color: #fff;
          transition: 0.5s;
          animation: fade-in 1s forwards 1 linear;
        }

        .content-img {
          margin-top: 52px;
          margin-bottom: 137px;
          // @media (max-height: 850px) {
          //   margin-top: 52px;
          //   margin-bottom: 90px;
          // }
          // @media (max-height: 800px) {
          //   margin-top: 42px !important;
          //   margin-bottom: 80px !important;
          // }
          // @media (max-height: 740px) {
          //   margin-top: 23px !important;
          //   margin-bottom: 51px !important;
          // }
        }
        .banner-timeline {
          width: 100%;
          padding: 36px 86px;
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          border: 1px solid;
          border-top: 1px solid;
          border-left: 1px solid;
          border-right: 1px solid;
          border-bottom: 1px solid;
          border-image-source: linear-gradient(91.13deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 52.6%, rgba(255, 255, 255, 0.3) 100%);
          border-image-slice: 1;
          // display: flex;
          justify-content: space-between;
          align-items: center;
          display: none;
          .banner-timeline-left {
            width: 100%;
            max-width: 491px;
            transform: translateX(-35px);
          }
          .banner-timeline-right {
            width: 100%;
            max-width: 592px;
            .progress-label {
              margin-bottom: 18px;
            }
          }
          &--title {
            text-align: center;
            margin-bottom: 16px;
            font-size: 18px;
            line-height: 27px;
            font-weight: 400;
            color: #e4e7ec;
            text-transform: uppercase;
          }

          .timer-item {
            flex: 1;
            text-align: center;
            position: relative;
            .text-40 {
              font-size: 48px;
              line-height: 60px;
              font-weight: 600;
            }
            .small-title {
              font-size: 18px;
              line-height: 150%;
              font-weight: 600;
            }
          }
          .timer-item:not(:last-child)::after {
            content: ':';
            position: absolute;
            font-size: 48px;
            top: -3px;
            right: -4px;
            line-height: 60px;
          }
        }
      }
    }
    @keyframes fade-in {
      from {
        transform: translateX(50px);
        opacity: 0;
        visibility: hidden;
      }
      to {
        transform: translateX(0);
        opacity: 1;
        visibility: visible;
      }
    }
    @media (max-width: 768px) {
      .wrap-banner {
        .video-wrp {
          height: 708px;
          // .bg-vid {
          //   height: 708px;
          // }
        }
        .content-wrap {
          // @media (max-height: 800px) {
          //   top: 50%;
          // }
          .banner-title {
            font-size: 30px;
            line-height: 38px;
          }
          .content-img {
            margin-top: 28px;
            margin-bottom: 56px;
            width: 60px;
            height: 60px;
            // @media (max-height: 850px) {
            //   margin-top: 28px;
            //   margin-bottom: 56px;
            // }
            // @media (max-height: 800px) {
            //   margin-top: 28px !important;
            //   margin-bottom: 56px !important;
            // }
            // @media (max-height: 740px) {
            //   margin-top: 28px !important;
            //   margin-bottom: 56px !important;
            // }
          }
          .banner-timeline {
            flex-direction: column;
            padding: 36px 36px 42px 36px;
            .banner-timeline-left {
              width: 100%;
              max-width: 491px;
              transform: unset;
            }
            .banner-timeline-right {
              width: 100%;
              max-width: 592px;
              .progress-label {
                margin-bottom: 18px;
                margin-top: 49px;
              }
            }
            &--title {
              font-size: 14px;
              line-height: 21px;
            }

            .timer-item {
              .text-40 {
                font-size: 24px;
                line-height: 32px;
              }
              .small-title {
                font-size: 14px;
                line-height: 21px;
              }
            }
            .timer-item:not(:last-child)::after {
              font-size: 24px;
              top: 0px;
              right: -4px;
              line-height: 32px;
            }
            .text-sm {
              font-size: 12px;
              line-height: 18px;
            }
          }
        }
      }
    }
  }
</style>
