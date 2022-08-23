<template>
  <div :id="id" class="detail-infomation">
    <div v-if="project.description" class="detail-des">
      <h3 class="header-5 text-semibold text-title">
        {{ $t('market-detail.des-title') }}
      </h3>
      <p class="body-base" id="text-description" style="line-height: 24px" :class="showClass ? 'hide-text' : null" v-html="textDescription">
        <!-- {{ textDescription }} -->
      </p>
      <div v-if="numOfLine > 4" style="margin-top: 16px" :class="!showClass ? 'text-rotate' : null" @click="showClass = !showClass">
        <div class="be-flex align-center">
          <span class="body-small text-hyperlink cursor text-medium">{{ showClass ? $t('market-detail.read-more') : $t('market-detail.hide-more') }}</span>
          <base-icon v-if="coinMain === 'LYNK'" icon="icon-down" class="icon-rotate" style="padding-left: 4px" />
          <base-icon v-else icon="icon-down-clm" class="icon-rotate" style="padding-left: 4px" />
        </div>
      </div>
    </div>
    <detail-and-features :feature-list="featureList" :metaDataList="metaDataList" />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import DetailAndFeatures from '@/components/collapse/DetailAndFeatures.vue'

  import { namespace } from 'vuex-class'
  const beBase = namespace('beBase')

  @Component({ components: { DetailAndFeatures } })
  export default class DetailInfomation extends Vue {
    @Prop({ required: true, type: Object, default: () => ({}) }) project!: Record<string, any>
    @Prop({ required: true, type: Array, default: () => [] }) featureList!: Array<Record<string, any>>
    @Prop({ required: true, type: Array, default: () => [] }) metaDataList!: Array<Record<string, any>>
    @Prop({ required: false, type: Number, default: 0 }) id!: number

    @beBase.State('coinMain') coinMain!: string

    showClass = false
    numOfLine = 1
    readMore = this.$t('market-detail.read')
    textDescription = ''
    mounted(): void {
      this.handleLineBreak()
      this.checkLengthText()
    }

    handleLineBreak(): void {
      const language = window.localStorage.getItem('bc-lang')!
      if (this.project.description) {
        const objDesc = JSON.parse(this.project.description)
        this.textDescription = objDesc[language].replace(/\\n/g, '<br>')
      }
    }

    checkLengthText(): void {
      let el = document.querySelector('.detail-infomation #text-description') as HTMLElement

      let divHeight = el.offsetHeight
      let lineHeight = parseInt(el.style.lineHeight)
      let lines = divHeight / lineHeight
      if (lines > 4) {
        this.showClass = true
        this.numOfLine = lines
      }
    }
  }
</script>

<style scoped lang="scss">
  .detail-infomation {
    .detail-des {
      padding-bottom: 32px;
      // margin-bottom: 32px;
      border-bottom: 1px solid #dbdbdb;
      .text-title {
        margin-bottom: 16px;
      }
    }
  }
  .hide-text {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .text-rotate {
    .icon-rotate {
      transform: rotate(180deg);
      padding-right: 4px;
    }
  }
</style>
