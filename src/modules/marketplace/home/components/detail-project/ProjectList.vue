<template>
  <div id="project-list">
    <div class="container">
      <div class="header-title">
        <h2>{{ $t('market-home.project-list.project') }}</h2>
      </div>
      <div class="search-project">
        <div style="position: relative">
          <input :placeholder="$t('market-home.project-list.search')" class="input-search" v-model="param.search" @keyup.enter="handleClickEnter()" />
          <div class="icon-search">
            <base-icon icon="icon-search" size="24" />
          </div>
        </div>
        <button class="search-btn" @click="handleInputSearch">{{ $t('market-home.project-list.search') }}</button>
      </div>
      <div class="filter-project">
        <div class="nav-filter">
          <div class="location">
            <el-dropdown trigger="click" @command="handleSort" :class="sortActive !== '' ? 'active-box' : null">
              <span v-if="sortActive === ''" class="el-dropdown-link"> {{ $t('market-home.project-list.location') }} <i class="el-icon-arrow-down el-icon--right"></i> </span>
              <span v-else class="el-dropdown-link">
                {{ renderLocation(sortActive) }}
                <span @click="handleClickCancel" style="margin-left: 21px; display: flex; align-items: center"><base-icon icon="icon-cancel" size="9" /></span>
              </span>
              <el-dropdown-menu slot="dropdown" class="dropdown-project-list">
                <el-dropdown-item v-for="(value, index) in sorts" :key="index" :class="sortActive === value.label ? 'active' : null" :command="value.code" :divided="value.divided"
                  ><span>{{ value.name }}</span>
                  <base-icon v-if="sortActive === value.code" icon="tick-color" size="16" />
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div>
            <el-dropdown trigger="click" @command="handleSort2" :class="sortActive2 !== '' ? 'active-box' : null">
              <span v-if="sortActive2 === ''" class="el-dropdown-link"> {{ $t('market-home.project-list.project-type') }} <i class="el-icon-arrow-down el-icon--right"></i> </span>
              <span v-else class="el-dropdown-link">
                {{ sortActive2 }}
                <span @click="handleClickCancel2" style="margin-left: 21px; display: flex; align-items: center"><base-icon icon="icon-cancel" size="9" /></span>
              </span>
              <el-dropdown-menu slot="dropdown" class="dropdown-project-list">
                <el-dropdown-item
                  v-for="(value, index) in sortProductType"
                  :key="index"
                  :class="sortActive2 === value.value ? 'active' : null"
                  :command="value.value"
                  :divided="value.divided"
                  ><span>{{ value.value }}</span>
                  <base-icon v-if="sortActive2 === value.value" icon="tick-color" size="16" />
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div>
            <el-dropdown trigger="click" @command="handleSort3" :class="sortActive3 !== '' ? 'active-box' : null">
              <span v-if="sortActive3 === ''" class="el-dropdown-link"> {{ $t('market-home.project-list.status') }} <i class="el-icon-arrow-down el-icon--right"></i> </span>
              <span v-else class="el-dropdown-link">
                {{ renderProjectStatus(sortActive3) }}
                <span @click="handleClickCancel3" style="margin-left: 21px; display: flex; align-items: center"><base-icon icon="icon-cancel" size="9" /></span>
              </span>
              <el-dropdown-menu slot="dropdown" class="dropdown-project-list">
                <el-dropdown-item
                  v-for="(value, index) in sortStatus"
                  :key="index"
                  :class="sortActive3 === value.value ? 'active' : null"
                  :command="value.value"
                  :divided="value.divided"
                  ><span>{{ $t(`${value.key}`) }}</span>
                  <base-icon v-if="sortActive3 === value.value" icon="tick-color" size="16" />
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <!--          <div class="setting">-->
          <!--            <base-icon icon="setting" size="15" />-->
          <!--            <div class="notification">3</div>-->
          <!--          </div>-->
        </div>
        <div style="display: flex; align-items: end; margin-bottom: 13px">
          <div class="information-filter">
            <div class="info">
              <p>
                <b style="font-weight: bold">{{ startElement }} - {{ endElement }}</b> {{ $t('market-home.project-list.of') }} <b style="font-weight: bold">{{ param.total }}</b>
                {{ $t('market-home.project-list.results') }}
              </p>
            </div>
            <div class="dot-filter"></div>
            <div class="sort-by">
              <el-dropdown trigger="click" @command="handleSort4">
                <span class="el-dropdown-link">
                  {{ $t('market-home.project-list.sort-by') }}:
                  <span class="text-sort-by" style="margin-left: 8px">{{
                    sortActive4 === 1 ? $t('market-home.project-list.lastest') : $t('market-home.project-list.default')
                  }}</span
                  ><i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="dropdown-project-list">
                  <el-dropdown-item
                    v-for="(value, index) in sortsByLatest"
                    :key="index"
                    :class="sortActive4 === value.command ? 'active' : null"
                    :command="value.command"
                    :divided="value.divided"
                    ><span>{{ value.label }}</span>
                    <base-icon v-if="sortActive4 === value.command" icon="tick-color" size="16" />
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
      <div v-if="dataProject1.length > 0" class="banner-coming">
        <div v-loading="isLoading" class="banner-coming-1">
          <div class="item-banner" v-for="(value, i) in dataProject1" :key="i">
            <img :src="value.avatar" style="cursor:pointer" @click="handleClickProject(value.id)" />
            <div class="title-item" @click="handleClickProject(value.id)">
              <p class="title-1">{{ value.projectName }}</p>
              <p class="title-2">{{ value.address }}{{ value.cityName ? `, ${value.cityName}` : '' }}</p>
            </div>
            <div class="description-cover"></div>
            <div class="description" style="cursor:pointer" @click="handleClickProject(value.id)">
              <p class="title-des-1">{{ value.projectName }}</p>
              <p class="title-des-2">{{ value.address }} {{ value.cityName ? `, ${value.cityName}` : '' }}</p>
              <p class="content-des">{{ language === 'en' ? JSON.parse(value.shortDescription).en : JSON.parse(value.shortDescription).vi }}</p>
              <button>
                <p @click="handleClickProject(value.id)">{{ $t('market-home.upcoming.explore-more') }}</p>
              </button>
            </div>
            <div class="is-open">
              <p>{{ renderProjectStatus(value.projectStatus) }}</p>
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: center; margin-bottom: 40px">
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="param.page"
            :page-size="param.limit"
            :total="param.total"
            :pager-count="5"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
      <div v-else class="banner-coming" style="height: 500px"></div>
    </div>
    <footer-market />
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import BaseIcon from '@/components/base/icon/BaseIcon.vue'
  import FooterMarket from '@/modules/marketplace/home/components/Footer.vue'
  import MarketRepository from '@/services/repositories/marketplace'
  import getRepository from '@/services'
  import { namespace } from 'vuex-class'
  import trim from 'lodash/trim'
  const beBase = namespace('beBase')
  const api: MarketRepository = getRepository('market')
  @Component({ components: { BaseIcon, FooterMarket } })
  export default class UpcomingProject extends Vue {
    @beBase.State('coinMain') coinMain!: string
    param: Record<string, any> = {
      search: null,
      projectType: null,
      nationalityCode: null,
      stateCode: null,
      cityCode: null,
      projectStatus: null,
      page: 1,
      limit: 9,
      orderBy: 0,
      total: 20,
      size: 10
    }
    isLoading = true
    paramStatus: Record<string, any> = {
      type: 'PROJECT_STATUS'
    }
    paramProductType: Record<string, any> = {
      type: 'PROJECT_TYPE'
    }
    startElement = 1
    endElement = 0
    language = ''
    created() {
      if (this.$route.query.status) {
        this.param = {
          ...this.param,
          projectStatus: this.$route.query.status.toString()
        }
        this.sortActive3 = this.$route.query.status.toString()
      }
      window.scrollTo(0, 0)
      this.init().then()
      if (localStorage.getItem('bc-lang')) {
        this.language = localStorage.getItem('bc-lang')?.toString() as string
      }
    }
    handleInputSearch(): void {
      this.init()
    }
    handleClickEnter(): void {
      this.init()
    }
    renderProjectStatus(status: string): string {
      switch (status) {
        case 'Upcoming':
          return this.$t('market-home.upcoming.upcoming').toString()

        case 'On Sale':
          return this.$t('market-home.upcoming.on-sale').toString()

        case 'Delivered':
          return this.$t('market-home.upcoming.delivered').toString()
        default:
          return this.$t('market-home.upcoming.upcoming').toString()
      }
    }
    renderProjectType(status: string): string {
      let arr = this.sortProductType.filter(item => {
        return item.value === status
      })
      return this.$t(`${arr[0].key}`).toString()
    }
    renderLocation(status: string): string {
      let arr = this.sorts.filter(item => {
        return item.code === status
      })
      return this.$t(`${arr[0].name}`).toString()
    }
    handleClickProject(id: number): void {
      this.$router.push({ name: 'DetailProjectPrimary', params: { type: 'project', id: id.toString() } })
    }

    async init(): Promise<void> {
      this.param = {
        ...this.param,
        search: trim(this.param.search)
      }
      const result = await api.getDataProjectList(this.param)
      if (result) {
        this.isLoading = false
        this.dataProject1 = result.content
        this.param.total = result.totalElements
        if (this.param.page === 1) {
          this.startElement = 1
        } else {
          this.startElement += this.param.limit
        }
        this.endElement = this.param.page * this.param.limit > this.param.total ? this.param.total : this.param.page * this.param.limit
      }
      if (this.sortStatus.length === 0 || this.sortProductType.length === 0) {
        const resultsStatus = await api.getParamSort(this.paramStatus)
        const resultsProductType = await api.getParamSort(this.paramProductType)
        if (resultsStatus) {
          this.isLoading = false
          this.sortStatus = resultsStatus
        }
        if (resultsProductType) {
          this.isLoading = false
          this.sortProductType = resultsProductType
        }
      }
      this.getLocation().then()
    }

    async getLocation(): Promise<void> {
      const result = await api.getCitySort({ code: this.coinMain === 'LYNK' ? 'VN' : 'USA' })
      this.isLoading = false
      this.sorts = result.content
    }

    handleSizeChange(val: number): void {
      console.log('size change')
    }

    handleCurrentChange(val: number): void {
      this.param = {
        ...this.param,
        page: val
      }
      this.init()
    }

    dataProject1: Array<Record<string, any>> = []
    sorts: Array<Record<string, any>> = []
    sortStatus: Array<Record<string, any>> = []
    sortProductType: Array<Record<string, any>> = []
    sortsByLatest: Array<Record<string, any>> = [
      {
        command: 0,
        label: this.$t('market-home.project-list.default'),
        divided: false,
        i18n: ''
      },
      {
        command: 1,
        label: this.$t('market-home.project-list.lastest'),
        divided: false,
        i18n: ''
      }
      // {
      //   command: 2,
      //   label: 'Acreage',
      //   divided: false,
      //   i18n: ''
      // }
    ]
    sortActive = ''
    sortActive2 = ''
    sortActive3 = ''
    sortActive4 = 0

    convertSendType(type: string): string {
      let type1 = type.replace(' ', '_').toLocaleUpperCase()
      return type1
    }
    handleSort(command: string): void {
      this.sortActive = command
      if (this.coinMain === 'LYNK') {
        this.param = {
          ...this.param,
          cityCode: this.convertSendType(command)
        }
      } else {
        this.param = {
          ...this.param,
          stateCode: this.convertSendType(command)
        }
      }

      this.init()
    }

    handleSort2(command: string): void {
      this.sortActive2 = command
      this.param = {
        ...this.param,
        projectType: command
      }
      this.init()
    }

    handleSort3(command: string): void {
      this.sortActive3 = command
      this.param = {
        ...this.param,
        projectStatus: command
      }
      this.init()
    }

    handleSort4(command: string): void {
      this.sortActive4 = Number(command) as number
      this.param = {
        ...this.param,
        orderBy: Number(command)
      }
      this.init()
    }

    handleClickCancel(e: any) {
      this.sortActive = ''
      if (this.coinMain === 'LYNK') {
        this.param = {
          ...this.param,
          cityCode: null
        }
      } else {
        this.param = {
          ...this.param,
          stateCode: null
        }
      }

      this.init()
    }

    handleClickCancel2() {
      this.sortActive2 = ''
      this.param = {
        ...this.param,
        projectType: null
      }
      this.init()
    }

    handleClickCancel3() {
      this.sortActive3 = ''
      this.param = {
        ...this.param,
        projectStatus: null
      }
      this.init()
    }
  }
</script>
<style scoped lang="scss">
  ::v-deep#project-list {
    .banner-coming {
      .el-icon-arrow-right:before {
        content: '\e6e0' !important;
      }
      .el-pagination .btn-next .el-icon,
      .el-pagination .btn-prev .el-icon {
        font-size: 14px !important;
      }
    }
  }
  #project-list {
    margin-top: 120px;
    .search-project {
      margin-bottom: 24px;
      display: flex;
      .icon-search {
        position: absolute;
        top: 8px;
        left: 10px;
      }
      .input-search {
        width: 388px;
        background: #ffffff;
        border: 1px solid #dbdbdb;
        border-radius: 6px;
        padding: 12px 0 12px 44px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color: #89909e;
        &:focus {
          border-color: var(--bc-input-focus-border);
        }
      }
      .search-btn {
        padding: 12px 53px;
        background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
        border-radius: 6px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        color: #ffffff;
        border: none;
        cursor: pointer;
        margin-left: 24px;
      }
    }
    .filter-project {
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      .nav-filter {
        display: flex;
        //margin-bottom: 24px;

        .location {
          position: relative;

          .icon-cancel {
            position: absolute;
            top: 0;
            left: 0;
          }
        }

        .name-project {
        }

        .setting {
          padding: 12px 16px;
          border: 1px solid #dbdbdb;
          border-radius: 8px;
          position: relative;

          .notification {
            background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
            border-radius: 50%;
            font-family: Open Sans;
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 24px;
            color: #ffffff;
            position: absolute;
            top: -10px;
            right: -10px;
            width: 24px;
            height: 24px;
            text-align: center;
          }
        }
      }

      .information-filter {
        display: flex;
        align-items: center;

        .dot-filter {
          width: 4px;
          height: 4px;
          background: #c4c4c4;
          border-radius: 50%;
          margin: 0 16px;
        }

        .sort-by {
          .text-sort-by {
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            line-height: 24px;
            font-family: Open Sans;
            background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }

        .info {
          color: #5b616e;
          font-family: Open Sans;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 24px;

          b {
            color: #0e0b23;
          }
        }
      }
    }

    .header-title {
      margin-bottom: 24px;

      h2 {
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 48px;
        line-height: 64px;
        display: flex;
        align-items: flex-end;
        color: #0e0b23;
      }
    }

    .header-coming {
      margin-bottom: 40px;
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
      margin-bottom: 24px;
      flex-wrap: wrap;

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
    }

    .item-banner {
      border-radius: 16px;
      overflow: hidden;
      position: relative;
      margin-top: 24px;
      width: calc((100% / 3) - 16px);
      max-height: 320px;
      margin-right: 24px;

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
          animation: faded 1s forwards;
          display: flex;
          visibility: visible;
        }

        .description-cover {
          animation: faded-cover 1s forwards;
          display: block;
          visibility: visible;
        }

        .is-open {
          display: none;
        }
      }

      //&:nth-of-type(){
      //
      //}
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
