<template>
  <div class="fundraising container-lang" id="token-sale">
    <div class="token-sales">
      <div class="header fade-up" data-aos="fade-up" data-aos-duration="1000">
        <h4>{{ $t('landing-ido.fundraising') }}</h4>
        <h1>{{ $t('landing-ido.token-sales-header-title') }}</h1>
        <p>{{ $t('landing-ido.token-sales-header-paragraph') }}</p>
      </div>
      <div class="token-sales-table">
        <div class="generalization">
          <div class="m1">
            <div class="title">{{ $t('landing-ido.token-sales-table-title1') }}</div>
            <div class="detail">250M <span>Tokens</span></div>
          </div>
          <div class="m1">
            <div class="title">{{ $t('landing-ido.token-sales-table-title2') }}</div>
            <div class="detail">
              <img src="../../../assets/images/landing/bitcoin-logo.png" alt="" />
              <img src="../../../assets/images/landing/Cjdowner-Cryptocurrency-Flat-Ethereum-ETH 1.png" alt="" />
              <img src="../../../assets/images/landing/binance-coin-seeklogo.com 1.png" alt="" />
              <img src="../../../assets/images/landing/tether-seeklogo.com 1.png" alt="" />
              <img src="../../../assets/images/landing/dollar-logo.png" alt="" />
            </div>
          </div>
          <div class="m1">
            <div class="title">{{ $t('landing-ido.token-sales-table-hardcap') }}</div>
            <div class="detail">$17.5M</div>
          </div>
          <div class="m1">
            <div class="title">{{ $t('landing-ido.token-sales-table-softcap') }}</div>
            <div class="detail">$5M</div>
          </div>
        </div>
        <table id="token-sales">
          <tr>
            <th>{{ $t('landing-ido.token-sales-table-round') }}</th>
            <th>{{ $t('landing-ido.token-sales-table-timestart') }}</th>
            <th>{{ $t('landing-ido.token-sales-table-price') }}</th>
            <th>{{ $t('landing-ido.token-sales-table-quantity') }}</th>
            <th>{{ $t('landing-ido.token-sales-table-goal') }}</th>
            <th>{{ $t('landing-ido.token-sales-table-minbuy') }}</th>
            <th>{{ $t('landing-ido.token-sales-table-progress') }}</th>
            <th>{{ $t('landing-ido.token-sales-table-soldout') }}</th>
            <th>{{ $t('landing-ido.token-sales-table-backers') }}</th>
            <th>{{ $t('landing-ido.token-sales-table-status') }}</th>
          </tr>
          <tr>
            <td>{{ $t('landing-ido.token-sales-table-angelsale') }}</td>
            <td>{{ listRound && listRound[0].fromDate && listRound[0].fromDate.time | convertToStringDate }}</td>
            <td>$0.03</td>
            <td>50M (5%)</td>
            <td>$1.5M</td>
            <td>${{ listRound && listRound[0].minAmount | convertCurrency }}</td>
            <td>{{ (listRound && (listRound[0].percentageSold * 1000) / 10) | convertAmountDecimal('PERCENT') }}%</td>
            <td v-if="statusR1 !== 'Completed'"></td>
            <td v-else>
              {{ listRound && listRound[0].soldOutIn | convertMs }}
            </td>
            <td class="text-center" v-if="listRound && listRound[0].totalBacker">{{ listRound[0].totalBacker | formatNumber }}</td>
            <td class="text-center" v-else>{{ '' }}</td>
            <td class="checkStatus" :class="listRound && listRound[0].totalAvailable > 0 ? statusR1 : 'Completed'">
              {{ listRound && listRound[0].totalAvailable > 0 ? statusR1 : 'Completed' }}
            </td>
          </tr>
          <tr>
            <td>{{ $t('landing-ido.token-sales-table-privatesale') }}</td>
            <td>{{ listRound && listRound[1].fromDate && listRound[1].fromDate.time | convertToStringDate }}</td>
            <td>$0.05</td>
            <td>80M (8%)</td>
            <td>$4M</td>
            <td>${{ listRound && listRound[1].minAmount | convertCurrency }}</td>
            <td>{{ (listRound && (listRound[1].percentageSold * 1000) / 10) | convertAmountDecimal('PERCENT') }}%</td>
            <td v-if="statusR2 !== 'Completed'"></td>
            <td v-else>
              {{ listRound && listRound[1].soldOutIn | convertMs }}
            </td>
            <td class="text-center" v-if="listRound && listRound[1].totalBacker">{{ listRound[1].totalBacker | formatNumber }}</td>
            <td class="text-center" v-else>{{ '' }}</td>
            <td class="checkStatus" :class="listRound && listRound[1].totalAvailable > 0 ? statusR2 : 'Completed'">
              {{ listRound && listRound[1].totalAvailable > 0 ? statusR2 : 'Completed' }}
            </td>
          </tr>
          <tr>
            <td>{{ $t('landing-ido.token-sales-table-presale') }}</td>
            <td>{{ listRound && listRound[2].fromDate && listRound[2].fromDate.time | convertToStringDate }}</td>
            <td>$0.09</td>
            <td>100M (10%)</td>
            <td>$9M</td>
            <td>${{ listRound && listRound[2].minAmount | convertCurrency }}</td>
            <td>{{ (listRound && (listRound[2].percentageSold * 1000) / 10) | convertAmountDecimal('PERCENT') }}%</td>
            <td v-if="statusR3 !== 'Completed'"></td>
            <td v-else>
              {{ listRound && listRound[2].soldOutIn | convertMs }}
            </td>
            <td class="text-center" v-if="listRound && listRound[2].totalBacker">{{ listRound[2].totalBacker | formatNumber }}</td>
            <td class="text-center" v-else>{{ '' }}</td>
            <td class="checkStatus" :class="listRound && listRound[2].totalAvailable > 0 ? statusR3 : 'Completed'">
              {{ listRound && listRound[2].totalAvailable > 0 ? statusR3 : 'Completed' }}
            </td>
          </tr>
          <tr>
            <td>{{ $t('landing-ido.token-sales-table-ido') }}</td>
            <td>{{ listRound && listRound[3].fromDate && listRound[3].fromDate.time | convertToStringDate }}</td>
            <td>$0.15</td>
            <td>20M (2%)</td>
            <td>$3M</td>
            <td>${{ listRound && listRound[3].minAmount | convertCurrency }}</td>
            <td>{{ (listRound && (listRound[3].percentageSold * 1000) / 10) | convertAmountDecimal('PERCENT') }}%</td>
            <td v-if="statusR4 !== 'Completed'"></td>
            <td v-else>
              {{ listRound && listRound[3].soldOutIn | convertMs }}
            </td>
            <td class="text-center" v-if="listRound && listRound[3].totalBacker">{{ listRound[3].totalBacker | formatNumber }}</td>
            <td class="text-center" v-else>{{ '' }}</td>
            <td class="checkStatus" :class="listRound && listRound[3].totalAvailable > 0 ? statusR4 : 'Completed'">
              {{ listRound && listRound[3].totalAvailable > 0 ? statusR4 : 'Completed' }}
            </td>
          </tr>
        </table>
      </div>
      <div class="accept-mobile">
        <div class="accept-coin">
          <div class="title">{{ $t('landing-ido.token-sales-table-title2') }}</div>
          <div class="detail">
            <img src="../../../assets/images/landing/bitcoin-logo.png" alt="" />
            <img src="../../../assets/images/landing/Cjdowner-Cryptocurrency-Flat-Ethereum-ETH 1.png" alt="" />
            <img src="../../../assets/images/landing/binance-coin-seeklogo.com 1.png" alt="" />
            <img src="../../../assets/images/landing/tether-seeklogo.com 1.png" alt="" />
            <img src="../../../assets/images/landing/dollar-logo.png" alt="" />
          </div>
        </div>
        <div class="sack-token-sales">
          <div class="m1">
            <div class="title">{{ $t('landing-ido.token-sales-table-title1') }}</div>
            <div class="detail">250M <span>Tokens</span></div>
          </div>
          <div class="m1">
            <div class="title">{{ $t('landing-ido.token-sales-table-hardcap') }}</div>
            <div class="detail">$17.5M</div>
          </div>
          <div class="m1">
            <div class="title">{{ $t('landing-ido.token-sales-table-softcap') }}</div>
            <div class="detail">$5M</div>
          </div>
        </div>
      </div>
      <div class="token-mobile">
        <div class="token-mobile-one" v-for="(item, index) in tableData" :key="index">
          <div class="token-mobile-head">
            <span class="name-route">{{ item.name }}</span>
            <span class="status-token checkStatus" :class="item.totalAvailable > 0 ? item.status : 'Completed'">{{ item.totalAvailable > 0 ? item.status : 'Completed' }}</span>
          </div>
          <div class="token-mobile-content">
            <div class="sack-content">
              <div class="sack-content-k1">
                <span class="title">{{ $t('landing-ido.token-sales-table-timestart') }}</span>
                <span class="unit">{{ item.timeStart }}</span>
              </div>
              <div class="sack-content-k1">
                <span class="title">{{ $t('landing-ido.token-sales-table-price') }}</span>
                <span class="unit">{{ item.price }}</span>
              </div>
              <div class="sack-content-k1">
                <span class="title">{{ $t('landing-ido.token-sales-table-quantity') }}</span>
                <span class="unit">{{ item.quantity }}</span>
              </div>
              <div class="sack-content-k1">
                <span class="title">{{ $t('landing-ido.token-sales-table-goal') }}</span>
                <span class="unit">{{ item.goal }}</span>
              </div>
              <div class="sack-content-k1">
                <span class="title">{{ $t('landing-ido.token-sales-table-minbuy') }}</span>
                <span class="unit">{{ item.min }}</span>
              </div>
              <div class="sack-content-k1">
                <span class="title">{{ $t('landing-ido.token-sales-table-progress') }}</span>
                <span class="unit">{{ ((item.progress * 1000) / 10) | convertAmountDecimal('PERCENT') }}%</span>
              </div>
              <div class="sack-content-k1">
                <span class="title">{{ $t('landing-ido.token-sales-table-soldout') }}</span>
                <span class="unit" v-if="item.status !== 'Completed'"></span>
                <span class="unit" v-else>{{ item.soldOutIn | convertMs }}</span>
              </div>
              <div class="sack-content-k1">
                <span class="title">{{ $t('landing-ido.token-sales-table-backers') }}</span>
                <span class="unit" v-if="item.backer">{{ item.backer | formatNumber }}</span>
                <span class="unit" v-else>{{ '' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="fund-allocation">
      <div class="header" data-aos="fade-zoom-in" data-aos-duration="3000">
        <h4>{{ $t('landing-ido.fundraising') }}</h4>
        <h1 class="allocation">{{ $t('landing-ido.fund-allocation-header') }}</h1>
      </div>
      <div class="charts">
        <div class="chart investment-pool" data-aos="fade-up" data-aos-duration="1000">
          <div class="percent">
            <img src="../../../assets/images/landing/img-allocation1.png" class="img-collection" alt="" />
          </div>
          <div class="text">{{ $t('landing-ido.fund-allocation-charts-text1') }}</div>
          <div class="number">30%</div>
        </div>
        <div class="chart operation" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
          <div class="percent">
            <img src="../../../assets/images/landing/img-allocation2.png" class="img-collection" alt="" />
          </div>

          <div class="text">{{ $t('landing-ido.fund-allocation-charts-text2') }}</div>
          <div class="number">20%</div>
        </div>
        <div class="chart reserve" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="900">
          <div class="percent">
            <img src="../../../assets/images/landing/img-allocation3.png" class="img-collection" alt="" />
          </div>
          <div class="text">{{ $t('landing-ido.fund-allocation-charts-text3') }}</div>
          <div class="number">15%</div>
        </div>
        <div class="chart market" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="1300">
          <div class="percent">
            <img src="../../../assets/images/landing/img-allocation4.png" class="img-collection" alt="" />
          </div>
          <div class="text">{{ $t('landing-ido.fund-allocation-charts-text4') }}</div>
          <div class="number">15%</div>
        </div>
        <div class="chart technology" data-aos="fade-up" data-aos-duration="2500" data-aos-delay="1600">
          <div class="percent">
            <img src="../../../assets/images/landing/img-allocation5.png" class="img-collection" alt="" />
          </div>
          <div class="text">{{ $t('landing-ido.fund-allocation-charts-text5') }}</div>
          <div class="number">10%</div>
        </div>
        <div class="chart dex-cex" data-aos="fade-up" data-aos-duration="3000" data-aos-delay="2000">
          <div class="percent">
            <img src="../../../assets/images/landing/img-allocation6.png" class="img-collection" alt="" />
          </div>
          <div class="text">{{ $t('landing-ido.fund-allocation-charts-text6') }}</div>
          <div class="number">10%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import defaultProject from '@/utils/firebase'
  import forEach from 'lodash/forEach'
  export default {
    name: 'LandingFundRaising',
    data() {
      return {
        tableData: [
          {
            name: 'Angel sale',
            timeStart: 'Nov 25, 2021',
            price: '$0.03',
            quantity: '50M (5%)',
            goal: '$1.5M',
            min: '$10K',
            progress: '',
            soldOut: '',
            backer: '',
            status: '',
            totalAvailable: '',
            id: 0
          },
          {
            name: 'Private sale',
            timeStart: 'Dec 05, 2021',
            price: '$0.05',
            quantity: '80M (8%)',
            goal: '$4M ',
            min: '$10K',
            progress: '',
            soldOut: '',
            backer: '',
            status: '',
            totalAvailable: '',
            id: 1
          },
          {
            name: 'Pre-sale',
            timeStart: 'Jan 05, 2022',
            price: '$0.09',
            quantity: '100M (10%)',
            goal: '$9M',
            min: '$50',
            progress: '',
            soldOut: '',
            backer: '',
            status: '',
            totalAvailable: '',
            id: 2
          },
          {
            name: 'IDO',
            timeStart: 'Mar 01, 2022',
            price: '$0.15',
            quantity: '20M (2%) ',
            goal: '$3M ',
            min: '$50',
            progress: '',
            soldOut: '',
            backer: '',
            status: '',
            totalAvailable: '',
            id: 3
          }
        ],
        statusR1: null,
        statusR2: null,
        statusR3: '',
        statusR4: '',
        listRound: [],
        listener: null,
        refIdo: null,
        roundIdo: {}
      }
    },

    async created() {
      await this.handleTurnOnFirebase()
      await this.handleGetRoundIdo()
    },

    destroyed() {
      const leadsRef = defaultProject.database().ref('crowd-sales')
      leadsRef.off('value', this.listener)
      const refIdo = defaultProject.database().ref('crowd-sales-ido')
      refIdo.off('value', this.refIdo)
    },

    methods: {
      async handleTurnOnFirebase() {
        const leadsRef = defaultProject.database().ref('crowd-sales')
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let _this = this
        this.listener = leadsRef.on('value', function (snapshot) {
          _this.listRound = snapshot.val()
          _this.handleGetRoundIdo()
          _this.$forceUpdate()
          return Promise.resolve()
          // _this.checkColor()
        })
      },
      async handleGetRoundIdo() {
        const refIdo = defaultProject.database().ref('crowd-sales-ido')
        this.refIdo = refIdo.on('value', snapshot => {
          console.log('change')
          this.roundIdo = snapshot.val()
          this.listRound[3] = snapshot.val()
          this.handlePushContent()
          this.handleCheckStatus()
          this.$forceUpdate()
          // _this.checkColor()
        })
      },
      checkColor() {
        const checkStatus = document.querySelectorAll('.checkStatus')
        if (checkStatus) {
          checkStatus.forEach(item => {
            if (item.innerHTML == 'Completed') {
              item.classList.add('color-green')
            }
            if (item.innerHTML == 'Ongoing') {
              item.classList.add('color-blue')
            }
            if (item.innerHTML == 'Coming soon') {
              item.classList.add('color-orange')
            }
          })
        }
      },

      handlePushContent() {
        forEach(this.listRound, (round, index) => {
          this.tableData[index].timeStart = this.$options.filters?.convertToStringDate(round.fromDate.time)
          this.tableData[index].progress = round.percentageSold
          // this.tableData[index].soldOut = round.percentageSold;
          this.tableData[index].backer = round.totalBacker
          this.tableData[index].totalAvailable = round.totalAvailable
          this.tableData[index].soldOutIn = round.soldOutIn
        })
      },

      handleCheckStatus() {
        const timeNov = this.listRound[0].fromDate.time
        const timeNovEnd = this.listRound[0].toDate.time

        const timeDec = this.listRound[1].fromDate.time
        const timeDecEnd = this.listRound[1].toDate.time

        const timeJan = this.listRound[2].fromDate.time
        const timeJanEnd = this.listRound[2].toDate.time

        const timeMar = this.listRound[3].fromDate.time
        const timeMarEnd = this.listRound[3].toDate.time

        const today = Date.now()

        if (today > timeMarEnd) {
          this.statusR1 = 'Completed'
          this.statusR2 = 'Completed'
          this.statusR3 = 'Completed'
          this.statusR4 = 'Completed'
          this.tableData[0].status = 'Completed'
          this.tableData[1].status = 'Completed'
          this.tableData[2].status = 'Completed'
          this.tableData[3].status = 'Completed'
        }
        if (today < timeNov) {
          this.statusR1 = 'Coming soon'
          this.statusR2 = 'Upcoming'
          this.statusR3 = 'Upcoming'
          this.statusR4 = 'Upcoming'
          this.tableData[0].status = 'Coming soon'
          this.tableData[1].status = 'Upcoming'
          this.tableData[2].status = 'Upcoming'
          this.tableData[3].status = 'Upcoming'
        }
        if (today >= timeNov && today <= timeNovEnd) {
          this.statusR1 = 'Ongoing'
          this.statusR2 = 'Coming soon'
          this.statusR3 = 'Upcoming'
          this.statusR4 = 'Upcoming'
          this.tableData[0].status = 'Ongoing'
          this.tableData[1].status = 'Coming soon'
          this.tableData[2].status = 'Upcoming'
          this.tableData[3].status = 'Upcoming'
        }
        if (today >= timeDec && today <= timeDecEnd) {
          this.statusR1 = 'Completed'
          this.statusR2 = 'Ongoing'
          this.statusR3 = 'Coming soon'
          this.statusR4 = 'Upcoming'
          this.tableData[0].status = 'Completed'
          this.tableData[1].status = 'Ongoing'
          this.tableData[2].status = 'Coming soon'
          this.tableData[3].status = 'Upcoming'
        }
        if (today > timeDecEnd && today <= timeJanEnd) {
          this.statusR1 = 'Completed'
          this.statusR2 = 'Completed'
          this.tableData[0].status = 'Completed'
          this.tableData[1].status = 'Completed'
          if (today < timeJan) {
            this.statusR3 = 'Coming soon'
            this.statusR4 = 'Upcoming'
            this.tableData[2].status = 'Coming soon'
            this.tableData[3].status = 'Upcoming'
          } else {
            this.statusR3 = 'Ongoing'
            this.statusR4 = 'Coming soon'
            this.tableData[2].status = 'Ongoing'
            this.tableData[3].status = 'Coming soon'
          }
        }
        if (today > timeJanEnd && today <= timeMarEnd) {
          this.statusR1 = 'Completed'
          this.statusR2 = 'Completed'
          this.statusR3 = 'Completed'
          this.tableData[0].status = 'Completed'
          this.tableData[1].status = 'Completed'
          this.tableData[2].status = 'Completed'
          if (today < timeMar) {
            this.statusR4 = 'Coming soon'
            this.tableData[3].status = 'Coming soon'
          } else {
            this.statusR4 = 'Ongoing'
            this.tableData[3].status = 'Ongoing'
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .Completed {
    color: #12b76a;
  }
  .Ongoing {
    background: linear-gradient(26.57deg, #9c27b0 8.33%, #0ba5ec 91.67%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .Coming.soon {
    color: #f79009;
  }
  .fundraising {
    .fade-up {
      transform: translate3d(0, 50px, 0);
    }
    .header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 60px;
      p {
        opacity: 0.8;
        font-size: 20px;
        line-height: 30px;
        font-weight: 400;
      }
      h4 {
        font-size: 18px;
        line-height: 27px;
        font-weight: 400;
      }
      h1 {
        font-size: 36px;
        line-height: 44px;
        text-align: center;
        margin: 12px 0;
        font-family: archivo-expanded;
      }
    }
    .allocation {
      margin-bottom: 0;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 120px;
    color: white;
    ::v-deep.token-sales {
      width: 100%;
      .token-sales-table {
        display: flex;
        flex-direction: column;
        justify-content: center;
        justify-items: center;
        padding-top: 36px;
        background: #101828;
        box-shadow: 0px 4px 160px rgba(204, 0, 204, 0.24);

        #token-sales {
          width: 100%;
          tr {
            position: relative;
            th {
              font-weight: 700;
              font-size: 18px;
              line-height: 27px;
              text-align: left;
              width: 144px;
              padding: 48px 0 48px 48px;
              @media (max-width: 1440px) {
                padding: 48px 0 48px 30px;
              }
              &:first-child {
                width: 146px;
              }
              &:nth-child(2) {
                width: 160px;
              }
              &:nth-child(3) {
                width: 80px;
              }
              &:nth-child(4) {
                width: 150px;
              }
              &:nth-child(5) {
                width: 96px;
              }
              &:nth-child(6) {
                width: 120px;
              }
              &:nth-child(7) {
                width: 100px;
              }
              &:nth-child(8) {
                width: 190px;
              }
              &:nth-child(9) {
                width: 100px;
              }
              &:last-child {
                width: 220px;
              }
            }
            td {
              font-size: 18px;
              line-height: 27px;
              font-weight: 400;
              opacity: 0.8;
              padding: 48px 0 48px 48px;
              @media (max-width: 1440px) {
                padding: 48px 0 48px 30px;
              }
            }
            &::before {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, #ffffff 47.92%, rgba(255, 255, 255, 0) 100%);
              opacity: 0.3;
              width: 100%;
              height: 2px;
            }
            &:last-child:before {
              opacity: 0;
            }
          }
        }
        .generalization {
          max-width: 1270px;
          width: 90%;
          height: 90px;
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-around;
          align-items: center;
          padding-left: 140px;
          margin-bottom: 48px;
          position: relative;
          .m1 {
            height: 90px;
            .title {
              margin-bottom: 8px;
              font-size: 20px;
              line-height: 30px;
              font-weight: 400;
            }
            .detail {
              background: -webkit-linear-gradient(#9c27b0, #0ba5ec);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              font-size: 36px;
              font-weight: 700;
              line-height: 39px;
              span {
                font-size: 24px;
                line-height: 26px;
                font-weight: 700;
              }
              img {
                margin-right: 16px;
              }
            }
          }
          &::before {
            content: '';
            position: absolute;
            bottom: -40px;
            left: 0;
            background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, #ffffff 47.92%, rgba(255, 255, 255, 0) 100%);
            opacity: 0.3;
            width: 100%;
            height: 2px;
          }
        }
      }
    }
    .fund-allocation {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 120px;
      width: 100%;

      .charts {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        justify-content: space-between;
        width: 100%;
        grid-gap: 90px;
        @media (max-width: 1440px) {
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 24px;
        }
        @media (max-width: 768px) {
          grid-template-columns: repeat(2, 1fr);
        }
        .chart {
          max-width: 160px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          justify-self: center;
          .text {
            font-size: 16px;
            line-height: 24px;
            font-weight: 400;
          }
          .number {
            font-size: 30px;
            line-height: 38px;
            font-family: archivo-expanded;
          }
          .percent {
            position: relative;
            width: 160px;
            height: 160px;
            margin-bottom: 24px;
          }
        }
      }
    }
    .token-mobile {
      display: none;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .token-mobile-one {
        border-top: 1px solid;
        border-left: 1px solid;
        border-right: 1px solid;
        border-image-source: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%);
        border-image-slice: 1;
        padding: 24px;
        margin-right: 8px;
        width: 100%;
        min-width: 327px;
        .token-mobile-head {
          display: flex;
          justify-content: space-between;
          margin-bottom: 24px;
          .name-route {
            font-size: 18px;
            font-weight: 700;
            line-height: 27px;
          }
          .status-token {
          }
        }
        .sack-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 24px 0;
        }
        .sack-content-k1 {
          display: flex;
          flex-direction: column;
          .title {
            font-size: 12px;
            line-height: 150%;
            font-weight: 400;
            color: #d0d5dd;
          }
          .unit {
            font-size: 16px;
            line-height: 24px;
            font-weight: 600;
          }
        }
      }
    }
    .accept-mobile {
      max-width: 327px;
      width: 100%;
      background: #101828;
      padding: 24px;
      box-shadow: 0px 0px 24px rgba(204, 0, 204, 0.12);
      margin: 0 auto;
      margin-bottom: 36px;
      display: none;

      .accept-coin {
        margin-bottom: 45px;
        .title {
          font-size: 14px;
          line-height: 18px;
          font-weight: 400;
          opacity: 0.8;
          margin-bottom: 16px;
        }
        .detail {
          display: flex;
          justify-content: space-between;
          img {
            width: 36px;
            height: 36px;
          }
        }
      }
      .sack-token-sales {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
          font-size: 12px;
          line-height: 21px;
          font-weight: 400;
          opacity: 0.8;
          margin-bottom: 8px;
        }
        .detail {
          background: -webkit-linear-gradient(#9c27b0, #0ba5ec);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 20px;
          line-height: 22px;
          font-weight: 700;
          span {
            font-size: 14px;
            line-height: 15px;
            font-weight: 700;
          }
        }
      }
    }
    @media (max-width: 1200px) {
      .accept-mobile {
        display: block;
      }
      .token-mobile {
        display: flex;
      }
      .token-sales {
        .token-sales-table {
          display: none;
        }
      }
    }
    @media (max-width: 767px) {
      .fund-allocation {
        align-items: flex-start;
        padding-top: 65px;
        .charts {
          .chart {
            .text {
              font-size: 12px;
              line-height: 18px;
            }
            .number {
              font-size: 20px;
              line-height: 30px;
            }
            .percent {
              position: relative;
              width: 153px;
              height: 153px;
              margin-bottom: 16px;
            }
          }
        }
        .img-collection {
          width: 153px;
          height: 153px;
        }
      }

      .header {
        align-items: start;
        margin-bottom: 36px;
        h4 {
          font-size: 14px;
          line-height: 21px;
        }
        h1 {
          line-height: 32px;
          font-size: 24px;
          margin: 4px 0 12px 0;
        }
        p {
          font-size: 14px;
          line-height: 21px;
        }
      }
    }
  }
</style>
