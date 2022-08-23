<template>
  <div id="detail-investment" class="detail-investment">
    <el-collapse class="collapse collapse-detail" v-model="activeDetail">
      <el-collapse-item class="collapse-item" title="Investment payback balance" name="1">
        <div class="investment-btn">
          <button class="active-btn">Traditional</button>
          <button>Airbnb</button>
        </div>
        <div class="table-investment">
          <el-table :data="tableData" style="width: 100%" row-key="id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
            <el-table-column prop="year" label="YEARS" width="400"> </el-table-column>
            <el-table-column prop="2021" label="2021" width="80"> </el-table-column>
            <el-table-column prop="2022" label="2022" width="80"> </el-table-column>
            <el-table-column prop="2023" label="2023" width="80"> </el-table-column>
            <el-table-column prop="2024" label="2024" width="80"> </el-table-column>
            <el-table-column prop="2025" label="2025" width="80"> </el-table-column>
            <el-table-column prop="2026" label="2026" width="80"> </el-table-column>
            <el-table-column prop="2027" label="2027" width="80"> </el-table-column>
            <el-table-column prop="2028" label="2028" width="80"> </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class DetailInvestment extends Vue {
    activeDetail = ['1']
    tableData: Array<Record<string, any>> = [
      {
        id: 1,
        year: 'Adjusted gross revenue',
        2021: '$24,000',
        2022: '$24,000',
        2023: '$24,000',
        2024: '$24,000',
        2025: '$24,000',
        children: [
          {
            id: 6,
            year: 'Gross Rental Revenue',
            2021: '$24,000',
            2022: '$24,000',
            2023: '$24,000',
            2024: '$24,000',
            2025: '$24,000'
          },
          {
            id: 7,
            year: 'Cleaning Fee Collected',
            2021: '$24,000',
            2022: '$24,000',
            2023: '$24,000',
            2024: '$24,000',
            2025: '$24,000'
          },
          {
            id: 8,
            year: 'Airbnb Hosting Fee',
            2021: '$24,000',
            2022: '$24,000',
            2023: '$24,000',
            2024: '$24,000',
            2025: '$24,000'
          }
        ]
      },
      {
        id: 2,
        year: 'Total expenses',
        2021: '$24,000',
        2022: '$24,000',
        2023: '$24,000',
        2024: '$24,000',
        2025: '$24,000',
        children: [
          {
            id: 9,
            year: 'Recurring Costs',
            2021: '$24,000',
            2022: '$24,000',
            2023: '$24,000',
            2024: '$24,000',
            2025: '$24,000'
          },
          {
            id: 10,
            year: 'Mortgage',
            2021: '$24,000',
            2022: '$24,000',
            2023: '$24,000',
            2024: '$24,000',
            2025: '$24,000'
          }
        ]
      },
      {
        id: 3,
        year: 'Cash Flow',
        2021: '$24,000',
        2022: '$24,000',
        2023: '$24,000',
        2024: '$24,000',
        2025: '$24,000'
      },
      {
        id: 4,
        year: 'Startup costs',
        2021: '$24,000',
        2022: '$24,000',
        2023: '$24,000',
        2024: '$24,000',
        2025: '$24,000'
      },
      {
        id: 4,
        year: 'Investment payback balance',
        2021: '$24,000',
        2022: '$24,000',
        2023: '$24,000',
        2024: '$24,000',
        2025: '$24,000'
      }
    ]
  }
</script>

<style lang="scss" scoped>
  ::v-deep.detail-investment {
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
  #detail-investment {
    .investment-btn {
      display: flex;
      margin-bottom: 24px;
      button:first-child {
        margin-right: 16px;
      }
      button {
        cursor: pointer;
        padding: 12px 35px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        display: flex;
        align-items: center;
        color: #0e0b23;
        border: 1px solid #dbdbdb;
        box-sizing: border-box;
        border-radius: 4px;
        background: #ffffff;
        &:hover {
          background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
          color: #ffffff;
        }
      }
      .active-btn {
        background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
        color: #ffffff;
      }
    }
  }
</style>
