<template>
  <div :id="id" class="detail-floor">
    <el-collapse class="collapse collapse-detail" v-model="activeDetail">
      <el-collapse-item class="collapse-item" :title="$t('market-detail.title-floor')" name="1">
        <div v-for="(item, index) in floorPlanList" :key="item.id" class="floor-item">
          <div class="be-flex align-center jc-space-between cursor floor-header" @click="handleShow(index)">
            <div class="be-flex align-center left">
              <base-icon v-if="objShow[index]" icon="icon-minus" size="24" class="lh-default" />
              <base-icon v-else icon="icon-plus" size="24" class="lh-default" />
              <span class="header-6 text-semibold">{{ item.floorPlanName }}</span>
            </div>
            <div class="be-flex right">
              <div class="item">{{ item.numOfSquare | convertAmountDecimal('AREA') }} m2</div>
              <div class="item">{{ item.numOfBedroom }} {{ $t('market-detail.bedroom') }}</div>
              <div class="item">{{ item.numOfBathroom }} {{ $t('market-detail.bathroom') }}</div>
            </div>
          </div>
          <div class="text-center floor-content" v-if="objShow[index]">
            <h3 v-if="item.description" class="body-base" style="text-align: left; padding: 0 16px 12px 23px">
              {{ getDescription(item.description) }}
            </h3>
            <img :src="item.imageUrl" alt="" />
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
  import forEach from 'lodash/forEach'
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class DetailFloor extends Vue {
    @Prop({ required: true, type: Array, default: () => [] }) floorPlanList!: Array<Record<string, any>>
    @Prop({ required: false, type: Number, default: 0 }) id!: number
    activeDetail = ['1']
    show = true
    objShow = {}

    getDescription(des: any): string {
      const language = window.localStorage.getItem('bc-lang')!
      if (des) {
        const objDesc = JSON.parse(des)
        if (language === 'vi') {
          return objDesc.vi
        }
        return objDesc.en
      }
      return ''
    }

    mounted(): void {
      forEach(this.floorPlanList, (elm, index) => {
        this.objShow[index] = true
      })
      this.$forceUpdate()
    }
    handleShow(index: number): void {
      this.objShow[index] = !this.objShow[index]
      this.$forceUpdate()
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep.detail-floor {
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
            .floor-item {
              border: 1px solid #dbdbdb;
              border-radius: 8px;
              overflow: hidden;
              margin-top: 24px;
              .floor-header {
                background-color: #f3f2f1;
                padding: 12px 16px;
                color: var(--bc-text-discript);
                .left {
                  span:last-child {
                    padding-left: 8px;
                  }
                }
                .right {
                  .item {
                    font-size: 14px;
                    line-height: 24px;
                    font-weight: 500;
                    margin-right: 16px;
                  }
                  .item:last-child {
                    margin-right: 0;
                  }
                }
              }
              .floor-content {
                padding: 26px 0;
                img {
                  max-width: 668px;
                  width: 100%;
                  max-height: 469px;
                  height: 100%;
                }
              }
            }
            .floor-item:first-child {
              margin-top: 0;
            }
          }
        }
      }
    }
  }
</style>
