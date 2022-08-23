<template>
  <div :id="id" class="detail-investor">
    <el-collapse class="collapse collapse-detail" v-model="activeDetail">
      <el-collapse-item class="collapse-item" :title="$t('market-detail.title-investor')" name="1">
        <div class="be-flex content">
          <img :src="investor.avatar" alt="" />
          <div class="content-text">
            <p class="header-6 text-semibold">{{ investor.investorName }}</p>
            <p id="text-description-investor" class="body-small text-medium" :class="showClass ? 'hide-text' : null" style="line-height: 24px" v-html="textDescription"></p>
            <div v-if="numOfLine > 4" style="margin-top: 16px" :class="!showClass ? 'text-rotate' : null" @click="showClass = !showClass">
              <div class="be-flex align-center">
                <span class="body-small text-hyperlink cursor text-medium">{{ showClass ? $t('market-detail.read-more') : $t('market-detail.hide-more') }}</span>
                <base-icon icon="icon-down" class="icon-rotate" style="padding-left: 4px" />
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class DetailInvestor extends Vue {
    @Prop({ required: true, type: Object, default: () => ({}) }) investor!: Record<string, any>
    @Prop({ required: true, type: Number, default: 0 }) id!: number
    activeDetail: string[] = ['1']
    numOfLine = 1
    showClass = false
    textDescription = ''

    mounted(): void {
      setTimeout(() => {
        this.handleLineBreak()
      }, 300)
    }

    handleLineBreak(): void {
      const language = window.localStorage.getItem('bc-lang')!
      if (this.investor.description) {
        const objDesc = JSON.parse(this.investor.description)
        this.textDescription = objDesc[language].replace(/\\n/g, '<br>')

        setTimeout(() => {
          let el = document.getElementById('text-description-investor') as HTMLElement
          let divHeight = el.offsetHeight
          let lineHeight = parseInt(el.style.lineHeight)
          let lines = divHeight / lineHeight
          if (lines > 4) {
            this.showClass = true
            this.numOfLine = lines
          }
        }, 1000)
      }
    }

    checkLengthText(): void {
      let el = document.getElementById('text-description-investor') as HTMLElement
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

<style lang="scss" scoped>
  ::v-deep.detail-investor {
    .collapse {
      margin-top: 32px;
      border-top: none;
      border-bottom: none;
      .collapse-item {
        padding-bottom: 24px;
        border-bottom: 1px solid #dbdbdb;
        .el-collapse-item__header {
          height: 32px;
          line-height: 32px;
          font-size: 24px;
          font-weight: 600;
          border-bottom: none;
        }

        .el-collapse-item__wrap {
          margin-top: 24px;
          border-bottom: none;
          .el-collapse-item__content {
            .content {
              img {
                max-width: 207px;
                max-height: 140px;
                width: 100%;
                object-fit: cover;
              }
              .content-text {
                margin-left: 24px;
                p {
                  color: var(--bc-text-market-primary);
                }
                //p:last-child {
                //  margin-top: 8px;
                //  color: var(--bc-text-discript);
                //}
                p.text-medium {
                  margin-top: 8px;
                  color: var(--bc-text-discript);
                }
                .read-more {
                  cursor: pointer;
                  margin-top: 8px;
                  font-family: Open Sans;
                  font-style: normal;
                  font-weight: 500;
                  font-size: 14px;
                  line-height: 24px;
                  display: flex;
                  align-items: center;
                  color: #0151fc;
                  span {
                    margin-left: 8px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .text-rotate {
    .icon-rotate {
      transform: rotate(180deg);
      padding-right: 4px;
    }
  }
  .hide-text {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
