<template>
  <div id="download-app-redirect"></div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import QrcodeVue from 'qrcode.vue'
  @Component({ components: { QrcodeVue } })
  export default class RedirectDownloadApp extends Vue {
    dataDownload: Record<string, any> = {}
    created() {
      window.location.href = `${process.env.VUE_APP_BASE_API}/main/api/v1/qr/redirect`
    }
  }
</script>
<style scoped lang="scss"></style>
