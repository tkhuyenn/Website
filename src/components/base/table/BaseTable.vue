<template>
  <div class="base-table be-flex-column">
    <slot name="header" :filters="filters" :events="handleChangeFilter" :class="tableClass" />
    <el-table
      ref="table"
      v-loading="isLoading"
      class="base-custom-table be-flex-item"
      :empty-text="emptyText"
      :data="data"
      :row-class-name="tableRowClassName"
      :summary-method="summaryMethod"
      :show-summary="showSummary"
      :sum-text="sumText"
      @select="handleSelectionChange"
      @select-all="handleSelectionAll"
      @row-click="handleRowClick"
      :show-header="true"
    >
      <div slot="append">
        <slot name="append" />
      </div>
      <div v-if="showEmpty" slot="empty">
        <empty-block :show="emptyTable" :emptyText="emptyText" />
      </div>
      <slot />
    </el-table>
    <base-pagination v-if="showPagination" :table="table" :info="paginationInfo" @sizeChange="handleSizeChange" @currentChange="handleCurrentChange" />
  </div>
</template>
<script lang="ts">
  import { PaginationInterface } from '@/interface'
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import BasePagination from '../pagination/BasePagination.vue'
  import forEach from 'lodash/forEach'
  import EmptyBlock from '@/components/base/empty/EmptyBlock.vue'
  @Component({ components: { BasePagination, EmptyBlock } })
  export default class BaseTable extends Vue {
    $refs!: {
      table: HTMLFormElement
    }

    @Prop({ required: true, type: Array }) data!: Array<Record<string, any>>
    @Prop({ required: false, type: Boolean, default: true }) showPagination!: boolean
    @Prop({ required: false, type: Boolean, default: false }) showAppend!: boolean
    @Prop({ required: false, type: Boolean, default: true }) showEmpty!: boolean
    @Prop({ required: false, type: Boolean, default: false }) isLoading!: boolean
    @Prop({ required: false, type: String, default: '' }) paginationInfo!: string
    @Prop({
      required: false,
      type: Object,
      default: () => {
        return {}
      }
    })
    filters!: Record<string, any>

    @Prop({
      required: false,
      type: Object,
      default: () => {
        return {}
      }
    })
    table!: PaginationInterface

    @Prop({ required: false, type: String, default: '' }) tableClass!: string

    @Prop({ required: false, type: String, default: 'Không có dữ liệu' }) emptyText!: string

    @Prop({ required: false, type: Boolean, default: false }) showSummary!: boolean
    @Prop({ required: false, type: String, default: 'Tổng' }) sumText!: boolean
    @Prop({
      required: false,
      type: Function,
      default: () => {
        return []
      }
    })
    summaryMethod!: (param: { columns: any; data: any }) => any[]

    get emptyTable(): boolean {
      return this.data.length < 1
    }
    rowSelected: Array<number> = []
    handleChangeFilter(filters: Record<string, any>): void {
      this.$emit('filterChange', filters)
    }

    handleSizeChange(val: number): void {
      this.clearSelection()
      this.table.limit = val
      this.table.page = 1
      this.$emit('sizeChange', val)
    }

    handleCurrentChange(val: number): void {
      this.clearSelection()
      this.table.page = val
      this.$emit('currentChange', val)
    }

    handleSelectionChange(val: Array<Record<string, any>>, row: Record<string, any>): void {
      // forEach(this.data, (elm, index) => {
      //   if (elm.id == o.id) {
      //     if (this.rowSelected.indexOf(index) == -1) {
      //       this.rowSelected.push(index)
      //     } else {
      //       this.rowSelected.splice(this.rowSelected.indexOf(index), 1)
      //     }
      //   }
      // })
      this.$emit('selectionChange', val, row)
    }

    handleSelectionAll(val: Array<Record<string, any>>): void {
      if (val.length) {
        forEach(val, (elm, index) => {
          this.rowSelected.push(index)
        })
      } else {
        this.rowSelected = []
      }

      this.$emit('selectionChange', val)
    }

    clearSelection(): void {
      if (this.$refs.table) {
        //@ts-ignore
        this.$refs.table.clearSelection()
      }
    }

    updateSelection(value: Array<Record<string, any>>): void {
      this.$refs.table.selection.push(...value)
    }

    getSelection(): Array<Record<string, any>> {
      return this.$refs.table.selection
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    handleRowClick(row: Record<string, any>, column: any, event: any): void {
      this.$emit('rowClick', {
        row: row,
        column: column,
        event: event
      })
    }

    tableRowClassName(rowTable: Record<string, any>): any {
      const { row } = rowTable
      return this.$refs.table?.selection?.find((element: Record<string, any>) => element.id == row.id) ? 'selected-row' : ''
      // let color = ''
      // this.rowSelected.forEach(r => {
      //   if (rowIndex === r) {
      //     color = 'selected-row'
      //   }
      // })
      // return color
    }
  }
</script>
<style lang="scss" scoped></style>
