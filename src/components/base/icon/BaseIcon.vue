<template>
  <span class="span-icon" :style="{ 'font-size': size + 'px' }">
    <svg :class="svgClass" aria-hidden="true">
      <use :xlink:href="name"></use>
    </svg>
  </span>
</template>
<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class BaseIcon extends Vue {
    @Prop({ required: false, type: String, default: 'logo' }) icon!: string
    @Prop({ required: false, type: String, default: '' }) className!: string
    @Prop({ required: false, type: String, default: '16' }) size!: string

    // iconComponent: any = null

    get name(): string {
      const icon = this.icon
      return icon ? `#icon-${icon}` : ''
    }

    get svgClass(): string {
      const className = this.className
      return className ? `svg-icon ${className}` : 'svg-icon'
    }
  }
</script>
<style lang="scss" scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .stroke-icon .svg-icon {
    stroke: currentColor;
  }
</style>
