<template>
  <div class="landing-footer">
    <div class="cover">
      <p class="text">Chăm sóc khách hàng</p>
      <p class="text">Liên hệ</p>
      <p class="text">Bản quyền</p>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  @Component
  export default class LandingFooter extends Vue {}
</script>

<style lang="scss" scoped>
  .landing-footer {
    background: #f5f5f5;

    .cover {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 20px 40px;

      .text {
        font-size: 16px;
        font-weight: 600;
        // line-height: 24px;
      }
    }
  }
</style>
