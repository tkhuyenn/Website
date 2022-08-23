<template>
  <div class="project-down">
    <div class="container" style="display: flex">
      <div class="beach-wrap-left">
        <div class="beach-left">
          <a class="project-text header-2">{{ title }}</a>
          <div class="text-down" style="font-size: 16px">
            {{ description }}
          </div>
          <div class="button-image">
            <!-- <el-button>text button</el-button> -->
            <button @click="handleViewProduct">
              <p>{{ $t('market-home.upcoming.explore-more') }}</p>
            </button>
          </div>
          <div class="arrows">
            <img src="../../../../icons/png/arrow-backward.png" alt="" @click="handleBack" />
            <span class="dots">
              <div v-for="item in length" :key="item" :class="item == isActive ? 'dot active' : 'dot'" @click="gotoItem(item)"></div>
            </span>
            <img src="../../../../icons/png/arrow.right.png" alt="" @click="handleRight" />
          </div>
        </div>
      </div>
      <div class="column1">
        <div class="image1 img-fluid"><img style="width: 322px; height: 670px; object-fit: cover; border-radius: 8px" :src="urlImage1" alt="" /></div>
        <div class="image2 img-fluid"><img style="width: 628px; height: 670px; object-fit: cover; border-radius: 8px" :src="urlImage2" alt="" /></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import getRepository from '@/services'
  import EventBus from '@/utils/eventBus'
  import MarketRepository from '@/services/repositories/marketplace'

  const api: MarketRepository = getRepository('market')
  @Component({ components: {} })
  export default class HomeBanner extends Vue {
    isActive = 1

    urlImage1 = 'https://via.placeholder.com/352x699.png'
    urlImage2 = 'https://via.placeholder.com/628x670.png'
    // https://via.placeholder.com/352x699.png
    // https://via.placeholder.com/628x670.png
    title = ''
    description = ''
    gotoItem(index: number): void {
      this.isActive = index
      this.index = this.isActive - 1
      this.getData()
    }
    param = {
      type: 'PROPERTY_TYPE'
    }
    length = 0
    created() {
      this.getData()
    }
    index = 0
    projectName = ''

    async getData(): Promise<any> {
      const result = await api.getSystemparam(this.param)
      if (result) {
        this.length = result.length

        const a = result[this.index].description
        this.projectName = result[this.index].value
        const media = JSON.parse(a)

        this.urlImage1 = media.media[0].url
        this.urlImage2 = media.media[1].url
        this.title = result[this.index].value

        const lang = window.localStorage.getItem('bc-lang')!
        if (lang == 'en') {
          this.description = media.description.en
        } else {
          this.description = media.description.vi
          console.log(media.description.vi)
        }
        // this.description = media.description
      }
    }
    handleBack(): void {
      if (this.isActive === 1) {
        this.isActive = this.length
      } else {
        this.isActive = this.isActive - 1
      }
      this.index = this.isActive - 1
      this.getData()
    }
    handleRight(): void {
      if (this.isActive === this.length) {
        this.isActive = 1
      } else {
        this.isActive = this.isActive + 1
      }
      this.index = this.isActive - 1
      this.getData()
    }
    form: Record<string, any> = {
      productType: null
    }
    handleViewProduct(): void {
      this.form.productType = this.projectName
      EventBus.$emit('viewProduct', this.projectName)
      this.$router.push({ name: 'ListProduct', query: { ...this.form } })
    }
  }
</script>

<style lang="scss" scoped>
  button {
    cursor: pointer;
    padding: 12px 24px;
    background: #ffffff;
    border-radius: 6px;
    border: none;
    p {
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      font-family: Open Sans;
      background: linear-gradient(to right, #9d3ef2 100%, #3036f4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .project-down {
    background-image: url('../../../../assets/images/market/Background-frame.png');
    display: flex;
    justify-content: space-between;
    margin-top: 160px;
    background-size: cover;
    .button-image {
      margin-top: 40px;
      border-radius: 6px;
    }
    // background-color: #7338b8;
    * {
      box-sizing: border-box;
    }
    .beach-wrap-left {
      // width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: left;
      color: #fff;
    }
    .beach-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 437px;
      text-align: left;
    }
    .image1 {
      transform: translateY(-102px);
    }
    .image2 {
      float: right;
    }
    .column {
      text-align: center;
      float: left;
      width: 45%;
      padding: 10px;
      color: #fff;
      position: relative;
    }
    .column1 {
      text-align: center;
      width: 55%;
      padding: 10px;
      color: #fff;
      position: relative;
      padding: 65px 90px 65px 0;
      display: flex;
    }
    .row:after {
      content: '';
      display: table;
      clear: both;
    }
    .arrows {
      cursor: pointer;
      display: flex;
      align-items: center;
      margin-top: 87px;
    }
    .dots {
      display: flex;
      margin: 0 15px;
    }
    .dot {
      width: 6px;
      height: 6px;
      border: solid 1px rgb(105, 98, 98);
      border-radius: 50%;
      background: #ccc;
      margin: 0 16px;
    }
    .dot.active {
      width: 6px;
      height: 6px;
      border: solid 1px #fff;
      position: relative;
    }
    .active::before {
      position: absolute;
      content: '';
      width: 12px;
      height: 12px;
      border-radius: 50%;
      left: -5px;
      border: 1px solid #fff;
      top: -5px;
    }
    .image1.img-fluid {
      margin-right: 24px;
    }
  }
</style>
