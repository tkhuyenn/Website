<template>
  <div class="home-page">
    <transition name="el-fade-in-linear">
      <!-- <base-page-loading /> -->
    </transition>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  @Component({
    components: {}
  })
  export default class Home extends Vue {
    created(): void {
      this.$router.push({ name: 'Wallet' })
    }
  }
</script>
<style lang="scss" scoped>
  .home-page {
    position: relative;
  }
</style>
