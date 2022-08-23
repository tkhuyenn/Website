<template>
  <div class="base-pagination">
    <div class="be-flex align-center">
      <div class="info">
        {{ $t('paging.show') }}
        {{ (table.total == 0 ? 0 : (table.page - 1) * table.limit + 1) | formatNumber }}
        -
        {{ (table.page * table.limit > table.total ? table.total : table.page * table.limit) | formatNumber }}
        /
        {{ table.total | formatNumber }} {{ info }}
      </div>
      <div v-if="this.sizeChangeCustom" class="be-flex-item text-right">
        <el-pagination
          :current-page="table.page"
          :page-sizes="arrPageSize"
          :page-size="table.limit"
          :total="table.total"
          :pager-count="5"
          class="custom-pagination"
          popper-class="select-pagination"
          background
          layout="sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <div v-else class="be-flex-item text-right">
        <el-pagination
          :current-page="table.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="table.limit"
          :total="table.total"
          :pager-count="5"
          class="custom-pagination"
          popper-class="select-pagination"
          background
          layout="sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { PaginationInterface } from '@/interface'
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component({ components: {} })
  export default class BasePagination extends Vue {
    @Prop({ required: true, type: Object }) table!: PaginationInterface
    @Prop({ required: true, type: String }) info!: string
    @Prop({ required: false, type: Array, default: () => [12, 24, 48, 96] }) arrPageSize!: number[]
    @Prop({ required: false, type: Boolean, default: false }) sizeChangeCustom!: boolean
    handleSizeChange(val: number): void {
      this.$emit('sizeChange', val)
    }

    handleCurrentChange(val: number): void {
      this.$emit('currentChange', val)
    }
  }
</script>
<style lang="scss" scoped></style>
