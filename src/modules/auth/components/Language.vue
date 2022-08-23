<template>
  <div class="text-center mt-2 language">
    <el-select v-model="selectLanguage" @change="handleChangeLanguage" popper-class="select-language-dropdown" class="select-language">
      <el-option :label="`${$t('login.en')}`" value="en">
        <template>
          <div class="be-flex flag">
            <base-icon icon="flag-usa" size="14" style="margin-right: 4px" />
            <span class="lang">{{ $t('login.en') }}</span>
          </div>
        </template>
      </el-option>
      <el-option :label="`${$t('login.vi')}`" value="vi">
        <template>
          <div class="be-flex flag">
            <base-icon icon="flag-vn" size="19" style="margin-right: 4px; margin-left: -2px" />
            <span class="lang" style="margin-left: 1px">{{ $t('login.vi') }}</span>
          </div>
        </template>
      </el-option>
      <div class="suffix" slot="prefix">
        <base-icon v-if="getIcon === 'flag-usa'" class="flag-usa" :icon="getIcon" size="14" />
        <base-icon v-else class="flag-vn" :icon="getIcon" size="19" />
      </div>
    </el-select>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class Language extends Vue {
    @Prop({ required: false, type: Boolean, default: false }) isReload!: boolean
    selectLanguage = ''

    created(): void {
      this.selectLanguage = window.localStorage.getItem('bc-lang')!
    }

    get getIcon(): string {
      return this.selectLanguage === 'vi' ? 'flag-vn' : 'flag-usa'
    }

    handleChangeLanguage(lang: string): void {
      this.$i18n.locale = lang
      window.localStorage.setItem('bc-lang', lang)
      location.reload()
      // if (this.isReload) {
      //   location.reload()
      // } else {
      //   this.$emit('changeLanguage')
      // }
      // this.$forceUpdate()
    }
  }
</script>

<style scoped lang="scss">
  .language {
    .suffix {
      .flag-usa {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 7px;
        display: block;
      }
      .flag-vn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 6px;
        display: block;
      }
    }
  }
</style>
