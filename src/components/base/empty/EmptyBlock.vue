<template>
  <div class="empty-block" style="padding-top: 22px" v-if="show">
    <base-icon v-if="coinMain === 'CLM'" icon="no-data" size="100" />
    <base-icon v-else icon="icon-no-data" size="100" />
    <p v-if="coinMain === 'CLM'" class="empty-text">{{ $t('notify.no-data') }}</p>
    <p v-else class="empty-text">{{ $t('notify_coming-soon') }}</p>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const beBase = namespace('beBase')
  @Component
  export default class EmptyBlock extends Vue {
    @Prop({ required: false, type: Boolean, default: true }) show!: boolean
    @Prop({ type: String, default: '' }) emptyText!: string

    @beBase.State('coinMain') coinMain!: string
  }
</script>
