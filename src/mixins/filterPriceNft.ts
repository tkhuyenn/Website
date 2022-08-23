import { Component, Vue } from 'vue-property-decorator'
import includes from 'lodash/includes'
import { namespace } from 'vuex-class'

const beBase = namespace('beBase')

@Component
export default class FilterPriceNFTMixin extends Vue {
  @beBase.State('coinMain') coinMain!: string
  isVisible = false
  price = ''
  valueRange = [0, 0]
  fromPrice = ''
  toPrice = ''
  isErrorFrom = false
  maxPrice = 5000000
  isVisibleMoreFilter = false
  filter: Record<string, any> = {}

  handleShowPopper(): void {
    this.isVisible = true
    this.isVisibleMoreFilter = false
  }

  handleFocusPrice(): void {
    this.isVisible = true
  }

  handleClearPrice(): void {
    this.filter.fromPrice = null
    this.filter.toPrice = null
    this.$emit('filter', this.filter)
    this.toPrice = ''
    this.fromPrice = ''
    this.$set(this.valueRange, 0, 0)
    this.$set(this.valueRange, 1, 0)
    //@ts-ignore
    this.$refs.rangeSlider.setValues()
    this.isErrorFrom = false
  }

  changeSlider(val: number[]): void {
    //@ts-ignore
    this.$refs['rangeSlider'].$refs['button1'].handleMouseLeave()
    //@ts-ignore
    this.$refs['rangeSlider'].$refs['button2'].handleMouseLeave()

    this.fromPrice = this.$options.filters?.numberWithCommas(val[0])
    this.toPrice = this.$options.filters?.numberWithCommas(val[1])
  }

  handleApply(): void {
    if (this.isErrorFrom) return
    this.isVisible = false
    this.filter.fromPrice = this.fromPrice ? +this.fromPrice.replaceAll(',', '') : null
    this.filter.toPrice = this.toPrice ? +this.toPrice.replaceAll(',', '') : null
    if (this.filter.fromPrice && this.filter.toPrice) {
      this.price =
        '$' + this.$options.filters?.numberWithCommas(this.fromPrice.replaceAll(',', '')) + ' - ' + '$' + this.$options.filters?.numberWithCommas(this.toPrice.replaceAll(',', ''))
    } else if (this.filter.fromPrice && !this.filter.toPrice) {
      this.price = '> $' + this.$options.filters?.numberWithCommas(this.fromPrice.replaceAll(',', ''))
    } else if (!this.filter.fromPrice && this.filter.toPrice) {
      this.price = '< $' + this.$options.filters?.numberWithCommas(this.toPrice.replaceAll(',', ''))
    } else {
      this.price = ''
    }

    this.$emit('filter', this.filter)
  }
  handleReset(): void {
    // this.isVisible = false
    this.isErrorFrom = false
    this.fromPrice = ''
    this.toPrice = ''
    this.price = ''
    this.filter.toPrice = null
    this.filter.fromPrice = null
    this.$emit('filter', this.filter)
    this.$set(this.valueRange, 0, 0)
    this.$set(this.valueRange, 1, 0)
    console.log('refs', this.$refs.rangeSlider)
    //@ts-ignore
    this.$refs.rangeSlider.setValues()
  }

  handleChangeFromPrice(val: string): void {
    const fromPrice = +val.replaceAll(',', '')
    let toPrice: any = null
    if (!this.toPrice || this.toPrice === '0') {
      toPrice = this.maxPrice
    } else {
      toPrice = +this.toPrice.replaceAll(',', '')
    }

    if (fromPrice > toPrice) {
      this.isErrorFrom = true
    } else {
      this.$set(this.valueRange, 0, +fromPrice)
      this.$set(this.valueRange, 1, +toPrice)
      //@ts-ignore
      this.$refs.rangeSlider.setValues()
      this.isErrorFrom = false
    }
  }

  handleChangeToPrice(val: string): void {
    const toPrice = +val.replaceAll(',', '')
    let fromPrice: any = null

    if (!this.fromPrice || this.fromPrice === '0') {
      fromPrice = 0
    } else {
      fromPrice = +this.fromPrice.replaceAll(',', '')
    }

    if (toPrice && toPrice < fromPrice) {
      this.isErrorFrom = true
    } else {
      this.$set(this.valueRange, 1, toPrice)
      this.$set(this.valueRange, 0, fromPrice)

      //@ts-ignore
      this.$refs.rangeSlider.setValues()
      this.isErrorFrom = false
    }
  }
  formatTooltip(val: number): number {
    if (val >= 1000) {
      return this.$options.filters?.formatNumber(val)
    }
    return val
  }

  onlyNumber(event: KeyboardEvent, type: string): void {
    const keyCode = event.keyCode ? event.keyCode : event.which
    //if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
    // 46 is dot
    if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
      event.preventDefault()
    }
    if (keyCode === 46 && includes(this[type], '.')) {
      event.preventDefault()
    }
  }

  numberFormat(event: FocusEvent): void {
    const _event: any = event
    let fnumber = _event.target.value
    if (fnumber.length > 0) {
      fnumber = fnumber.replaceAll(',', '')
      fnumber = this.$options.filters?.numberWithCommas(fnumber)
      _event.target.value = fnumber
    }
  }
}
