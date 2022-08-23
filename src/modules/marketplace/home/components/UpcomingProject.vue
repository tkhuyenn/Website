<template>
  <div id="coming-project">
    <div class="container">
      <div class="header-coming">
        <h2>{{ $t('market-home.upcoming.upcoming-project') }}</h2>
        <p class="content-coming">
          {{ language === 'en' ? JSON.parse(this.decriptionUpcoming.description).en : JSON.parse(this.decriptionUpcoming.description).vi }}
        </p>
        <div class="view-all">
          <a @click="detailListProject">{{ $t('market-home.upcoming.view-all') }} <base-icon icon="chevron-right" size="14" /></a>
        </div>
      </div>
      <div class="banner-coming">
        <div class="banner-coming-1">
          <div class="item-banner" v-for="(value, i) in dataProject1" :key="i">
            <img :src="value.avatar" />
            <div class="title-item">
              <p class="title-1">{{ value.projectName }}</p>
              <p class="title-2">{{ value.address }}{{ value.cityName ? `, ${value.cityName}` : '' }}</p>
            </div>
            <div class="description-cover"></div>
            <div class="description">
              <p class="title-des-1">{{ value.projectName }}</p>
              <p class="title-des-2">{{ value.address }}{{ value.cityName ? `, ${value.cityName}` : '' }}</p>
              <p class="content-des">{{ language === 'en' ? JSON.parse(value.shortDescription).en : JSON.parse(value.shortDescription).vi }}</p>
              <button>
                <p @click="handleClickProject(value.id)">{{ $t('market-home.upcoming.explore-more') }}</p>
              </button>
            </div>
            <div class="is-open">
              <p>{{ value.projectStatus !== 'Upcoming' ? $t('market-home.upcoming.on-sale') : $t('market-home.upcoming.upcoming') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import MarketRepository from '@/services/repositories/marketplace'
  import getRepository from '@/services'
  import request from '@/plugins/request'

  const api: MarketRepository = getRepository('market')
  @Component
  export default class UpcomingProject extends Vue {
    param: Record<string, any> = {
      search: null,
      projectType: null,
      nationalityCode: null,
      stateCode: null,
      cityCode: null,
      projectStatus: 'Upcoming',
      page: 1,
      limit: 6,
      sortBy: null,
      total: null,
      size: null,
      orderBy: 0
    }
    language = ''
    decriptionUpcoming = {}
    created() {
      this.init().then()
      if (localStorage.getItem('bc-lang')) {
        this.language = localStorage.getItem('bc-lang')?.toString() as string
      }
    }
    async init(): Promise<void> {
      const result = await api.getDataProjectList(this.param)
      if (result) {
        this.dataProject1 = result.content
      }
      const results = await request.get('/marketplace/api/v1/system-param/list?type=PROJECT_STATUS')
      if (Array.isArray(results.data.data)) {
        results.data.data.map(item => {
          if (item.value === 'Upcoming') {
            this.decriptionUpcoming = item
          }
        })
      }
    }
    dataProject1: Array<Record<string, any>> = []
    detailListProject(): void {
      this.$router.push({ path: '/marketPlace/real-estate/project-list?status=Upcoming' })
    }
    handleClickProject(id: number): void {
      this.$router.push({ name: 'DetailProjectPrimary', params: { type: 'project', id: id.toString() } })
    }
  }
</script>
<style scoped lang="scss">
  #coming-project {
    padding-top: 160px;
    background: #faf6f1;

    .header-coming {
      margin-bottom: 16px;
      position: relative;

      h2 {
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 48px;
        line-height: 64px;
        color: #0e0b23;
        margin-bottom: 16px;
      }

      .content-coming {
        max-width: 600px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        display: flex;
        align-items: center;
        color: #0e0b23;
        opacity: 0.7;
      }

      .view-all {
        position: absolute;
        bottom: 0;
        right: 0;
        cursor: pointer;

        a {
          font-family: Open Sans;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
          background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }

    .banner-coming-1 {
      display: flex;
      //justify-content: space-between;
      //margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .banner-coming-2 {
      display: flex;
      //justify-content: space-between;
    }
    .is-open {
      position: absolute;
      top: 16px;
      left: 16px;
      background: #0e0b23;
      opacity: 0.8;
      border-radius: 4px;
      padding: 6px 16px;

      p {
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        text-transform: uppercase;
        color: #ffffff;
      }
    }
    .item-banner {
      border-radius: 16px;
      overflow: hidden;
      position: relative;
      width: calc((100% / 3) - 16px);
      max-height: 320px;
      margin-right: 24px;
      margin-top: 24px;
      img {
        width: 100%;
        height: 100%;
      }

      .title-item {
        position: absolute;
        bottom: 24px;
        left: 24px;

        .title-1 {
          font-family: Open Sans;
          font-style: normal;
          font-weight: 600;
          font-size: 24px;
          line-height: 32px;
          color: #ffffff;
        }

        .title-2 {
          font-family: Open Sans;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 24px;
          color: #ffffff;
          opacity: 0.7;
        }
      }

      .description-cover {
        display: none;
        visibility: hidden;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
        opacity: 0.5;
      }

      .description {
        position: absolute;
        z-index: 100;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        display: none;
        visibility: hidden;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .title-des-1 {
          font-family: Open Sans;
          font-style: normal;
          font-weight: 600;
          font-size: 24px;
          line-height: 32px;
          color: #ffffff;
          margin-bottom: 4px;
        }

        .title-des-2 {
          font-family: Open Sans;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 24px;
          color: #ffffff;
          opacity: 0.7;
          margin-bottom: 24px;
        }

        .content-des {
          max-width: 318px;
          font-family: Open Sans;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 24px;
          text-align: center;
          color: #ffffff;
          opacity: 0.7;
          margin-bottom: 24px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        button {
          cursor: pointer;
          padding: 12px 24px;
          background: #ffffff;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          p {
            font-size: 16px;
            font-weight: 600;
            line-height: 24px;
            font-family: Open Sans;
            background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }

      &:hover {
        .title-item {
          display: none;
        }

        .description {
          display: flex;
          visibility: visible;
          animation: faded 1s forwards;
        }
        .description-cover {
          display: block;
          visibility: visible;
          animation: faded-cover 1s forwards;
        }
        .is-open {
          display: none;
        }
      }
      &:nth-of-type(3n) {
        margin-right: 0;
      }
    }
    @keyframes faded {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    @keyframes faded-cover {
      from {
        opacity: 0;
      }
      to {
        opacity: 0.5;
      }
    }
  }
</style>
