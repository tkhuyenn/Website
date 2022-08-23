<template>
  <div :id="id">
    <div id="detail-expenses" class="detail-expenses">
      <el-collapse class="collapse collapse-detail" v-model="activeDetail">
        <el-collapse-item class="collapse-item" title="Expenses" name="1">
          <div class="list-table">
            <div class="table-1">
              <el-table :data="tableData" border show-summary :summary-method="getSummaries" style="width: 100%">
                <el-table-column prop="id" label="ONE TIME STARTUP COSTS" width="260"> </el-table-column>
                <el-table-column prop="price" label="" width="140" align="right">
                  <template slot-scope="scope">
                    <div class="box-paid">
                      <div class="dolar">$</div>
                      <div style="display: flex; align-items: center; padding-left: 8px">
                        <p class="text-paid fw-400 fs-16">{{ scope.row.price }}</p>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="table-2">
              <el-table :data="tableData2" border show-summary :summary-method="getSummaries" style="width: 100%">
                <el-table-column prop="monthly" label="MONTHLY EXPENSES" width="160" align="left">
                  <template slot-scope="scope">
                    <p>{{ scope.row.monthly }}</p>
                    <p v-if="scope.row.monthly2">{{ scope.row.monthly2 }}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="traditional" label="TRADITIONAL" width="160" align="left">
                  <template slot-scope="scope">
                    <div class="box-paid">
                      <div class="dolar">$</div>
                      <div style="display: flex; align-items: center; padding-left: 8px">
                        <p class="text-paid fw-400 fs-16">{{ scope.row.traditional }}</p>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="atrbnb" label="AIRBNB" width="160" align="left">
                  <template slot-scope="scope">
                    <div class="box-paid">
                      <div class="dolar">$</div>
                      <div style="display: flex; align-items: center; padding-left: 8px">
                        <p class="text-paid fw-400 fs-16">{{ scope.row.atrbnb }}</p>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class DetailExpenses extends Vue {
    @Prop({ required: true, type: Number, default: 0 }) id!: number
    activeDetail = ['1']
    tableData: Array<Record<string, any>> = [
      {
        id: 'Inspections',
        price: 500
      },
      {
        id: 'Total repair costs',
        price: 500
      },
      {
        id: 'Furniture & appliances',
        price: 500
      },
      {
        id: 'Closing costs',
        price: 500
      }
    ]
    tableData2: Array<Record<string, any>> = [
      {
        monthly: 'Insurance',
        traditional: 500,
        atrbnb: 500
      },
      {
        monthly: 'Utilities',
        traditional: 500,
        atrbnb: 500
      },
      {
        monthly: 'Prop. ',
        monthly2: 'management',
        traditional: 500,
        atrbnb: 500
      },
      {
        monthly: 'Prop.',
        monthly2: 'maintenance',
        traditional: 500,
        atrbnb: 500
      },
      {
        monthly: 'Prop.',
        monthly2: 'tax',
        traditional: 500,
        atrbnb: 500
      },
      {
        monthly: 'HOA dues',
        traditional: 500,
        atrbnb: 500
      },
      {
        monthly: 'Rental income ',
        monthly2: 'taxes',
        traditional: 500,
        atrbnb: 500
      },
      {
        monthly: 'Cleaning fees',
        traditional: 500,
        atrbnb: 500
      }
    ]

    getSummaries(param) {
      const { columns, data } = param
      const sums: string[] = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = 'Total'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] =
            '$ ' +
            values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep.detail-expenses {
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
          color: #0a0b0d;

          .el-collapse-item__arrow {
            transform: rotate(90deg);
          }

          .el-collapse-item__arrow.is-active {
            transform: rotate(270deg);
          }
        }

        .el-collapse-item__wrap {
          margin-top: 24px;
          border-bottom: none;
        }
      }
    }
  }

  #detail-expenses {
    .table-1,
    .table-2 {
      //filter: drop-shadow(0px 1.2px 3.6px rgba(0, 0, 0, 0.1)) drop-shadow(0px 6.4px 14.4px rgba(0, 0, 0, 0.13));
    }
    .list-table {
      display: flex;
      justify-content: space-between;
    }
    .box-paid {
      display: flex;
      background: #ffffff;
      border: 1px solid #dbdbdb;
      border-radius: 4px;
      height: 36px;
      width: 124px;
      .dolar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        background: #f3f2f1;
      }
    }
  }
</style>
