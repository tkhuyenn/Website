<template>
  <div class="base-table be-flex-column">
    <slot name="header" :filters="filters" :events="handleChangeFilter" />
    <slot name="summary" />
    <el-table
      ref="table"
      class="base-custom-table be-flex-item"
      v-loading="isLoading"
      :tree-props="treeProps"
      :row-key="rowKey"
      :empty-text="emptyText"
      :data="data"
      :lazy="lazy"
      :load="load"
      :border="border"
      :summary-method="summaryMethod"
      :cell-class-name="cellClassName"
      :row-class-name="rowClassName"
      :show-summary="showSummary"
      :sum-text="sumText"
      :max-height="maxHeight"
      :show-header="showTableHeader"
      :default-expand-all="defaultExpandAll"
      :class="{ 'table-with-summary': showSummary }"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
      @expand-change="handleExpandChange"
    >
      <div slot="append">
        <slot name="append" />
      </div>
      <div slot="empty">
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
  import EmptyBlock from '@/components/base/empty/EmptyBlock.vue'

  @Component({ components: { BasePagination, EmptyBlock } })
  export default class BaseTreeTable extends Vue {
    @Prop({ required: true, type: Array }) data!: Array<Record<string, any>>
    @Prop({ required: false, type: Boolean, default: false }) showPagination!: boolean
    @Prop({ required: false, type: Boolean, default: false }) showAppend!: boolean
    @Prop({ required: false, type: Boolean, default: false }) border!: boolean

    @Prop({ required: false, type: String, default: '' }) paginationInfo!: string
    @Prop({ required: false, type: Boolean, default: false }) isLoading!: boolean
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

    @Prop({
      required: false,
      type: Object,
      default: () => {
        return {}
      }
    })
    treeProps!: Record<string, any>
    @Prop({ required: false, type: String, default: 'id' }) rowKey!: string
    @Prop({ required: false, type: Boolean, default: false }) lazy!: boolean
    @Prop({
      required: false,
      type: Function,
      default: () => {
        return []
      }
    })
    load!: () => any[]

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
    @Prop({
      required: false,
      type: Function,
      default: () => {
        return []
      }
    })
    cellClassName!: (params: { row: any; column: any; rowIndex: any; columnIndex: any }) => any
    @Prop({
      required: false,
      type: Function,
      default: () => {
        return []
      }
    })
    rowClassName!: (params: Record<string, any>) => any

    @Prop({ required: false, type: String || Number, default: 'auto' }) maxHeight!: string | number
    @Prop({ required: false, type: Boolean, default: true }) showTableHeader!: boolean
    @Prop({ required: false, type: Boolean, default: false }) defaultExpandAll!: boolean
    get emptyTable(): boolean {
      return this.data.length < 1
    }
    handleChangeFilter(filters: Record<string, any>): void {
      console.log('base table', filters)

      this.$emit('filterChange', filters)
    }

    handleSizeChange(val: number): void {
      this.clearSelection()
      this.$emit('sizeChange', val)
    }

    handleCurrentChange(val: number): void {
      this.clearSelection()
      this.$emit('currentChange', val)
    }

    handleSelectionChange(val: Array<Record<string, any>>): void {
      this.$emit('selectionChange', val)
    }

    clearSelection(): void {
      if (this.$refs.table) {
        //@ts-ignore
        this.$refs.table.clearSelection()
      }
    }

    openExpand(row: Record<string, any>): void {
      if (this.$refs.table) {
        // @ts-ignore
        this.$refs.table.toggleRowExpansion(row)
      }
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    handleRowClick(row: Record<string, any>, column: any, event: any): void {
      //@ts-ignore
      // this.$refs.table.toggleRowExpansion(row)
      // this.$emit('rowClick', {
      //   row: row,
      //   column: column,
      //   event: event
      // })
    }

    handleExpandChange(row: Record<string, any>, expandedRows: Record<string, any>): void {
      this.$emit('expand-change', {
        row: row,
        expandedRows: expandedRows
      })
    }
  }
</script>
<style lang="scss" scoped>
  .base-table {
  }
</style>
