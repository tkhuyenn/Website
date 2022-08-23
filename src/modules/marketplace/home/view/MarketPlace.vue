<template>
  <div class="wrap-home">
    <home-banner />
    <home-project />
    <home-project-down />
    <upcoming-project />
    <download-app />
    <footer-market />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import HomeBanner from '../components/HomeBanner.vue'
  import HomeProject from '../components/HomeProject.vue'
  import HomeProjectDown from '../components/HomeProjectDown.vue'
  import UpcomingProject from '@/modules/marketplace/home/components/UpcomingProject.vue'
  import DownloadApp from '@/modules/marketplace/home/components/DownloadApp.vue'
  import FooterMarket from '@/modules/marketplace/home/components/Footer.vue'
  @Component({ components: { HomeBanner, UpcomingProject, DownloadApp, HomeProject, HomeProjectDown, FooterMarket } })
  export default class MarketPlace extends Vue {}
</script>

<style lang="scss" scoped>
  .wrap-home {
    //height: 100vh;
    overflow: hidden;
    background-color: var(--bc-bg-market);
  }
</style>
