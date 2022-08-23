import JSEncrypt from 'jsencrypt'
import includes from 'lodash/includes'
import i18n from '@/utils/language'

export function formatNumber(value: number | string): string {
  if (!value) return '0'
  // const val = (value / 1).toFixed(0).replace('.', ',')
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function numberWithCommas(value: string): string {
  if (!value) return '0'
  if (includes(value, '.')) {
    const afterDot = value.substr(value.indexOf('.'))
    const beforeDot = value.substring(0, value.indexOf('.'))
    const _beforeDot = +beforeDot
    const temp = _beforeDot.toLocaleString().replaceAll('.', ',')
    return temp + afterDot
  }
  const _value = +value
  // return _value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
  return _value.toLocaleString('en-US')
}

export function abbreviateNumber(number: number, toFix = 1): string {
  const SI_SYMBOL = ['', 'K', 'M', 'B', 'T', 'P', 'E']

  if (!number) return '0'
  // what tier? (determines SI symbol)
  const tier = (Math.log10(Math.abs(number)) / 3) | 0

  // get suffix and determine scale
  const suffix = SI_SYMBOL[tier]
  const scale = Math.pow(10, tier * 3)

  // scale the number
  const scaled = number / scale

  // format number and add suffix
  return scaled.toFixed(toFix) + suffix
}

export function roundingNumber(value: number): number | string {
  if (!value) return 0
  return value.toFixed(2)
}

export function roundingNumberWithoutDot(value: number, minimumFractionDigits = 0): number | string {
  if (!value) return 0
  const _value = +value.toFixed(minimumFractionDigits)
  return _value.toLocaleString('en-US', { minimumFractionDigits })
}

export function convertAmountDecimal(amount: string | number, currency: string, isRoundedDown = false, isAddNameCurrency = false): string {
  const objConvert = {
    LYNK: 2,
    CLM: 2,
    USD: 2,
    USDC: 2,
    USDT: 2,
    BNB: 5,
    ETH: 8,
    BTC: 8,
    BUSD: 2,
    PERCENT: 2,
    AREA: 2
  }

  if (!amount) {
    if (currency === 'PERCENT') {
      return '0'
    }
    amount = 0 // case amount = null | ''
    if (isAddNameCurrency) {
      return amount.toLocaleString('en-US', { minimumFractionDigits: objConvert[currency] }) + ' ' + currency
    }
    return amount.toLocaleString('en-US', { minimumFractionDigits: objConvert[currency] })
  }

  if (amount >= 100 && currency === 'PERCENT') {
    return '100'
  }

  amount = amount.toString()
  if (includes(amount, '.')) {
    if (isAddNameCurrency) {
      const number = +toFixedNumber(+amount, objConvert[currency])
      return number.toLocaleString('en-US', { minimumFractionDigits: objConvert[currency] }) + ' ' + currency
    }

    const number = +toFixedNumber(+amount, objConvert[currency])
    return number.toLocaleString('en-US', { minimumFractionDigits: objConvert[currency] })
  }
  const _value = +amount
  if (isAddNameCurrency) {
    return _value.toLocaleString('en-US', { minimumFractionDigits: objConvert[currency] }) + ' ' + currency
  } else {
    return _value.toLocaleString('en-US', { minimumFractionDigits: objConvert[currency] })
  }
}

export function toFixedNumber(number: number, precision: number): string {
  const shift = function (number, exponent) {
    const numArray = ('' + number).split('e')
    return +(numArray[0] + 'e' + (numArray[1] ? +numArray[1] + exponent : exponent))
  }
  return shift(Math.round(shift(number, +precision)), -precision) + ''
}

export function truncateToDecimals(num: number, dec: string): string {
  const objConvert = {
    LYNK: 2,
    CLM: 2,
    USD: 2,
    USDC: 2,
    USDT: 2,
    BNB: 5,
    ETH: 8,
    BTC: 8,
    BUSD: 2
  }
  const calcDec = Math.pow(10, objConvert[dec])
  return Number((Math.trunc(num * calcDec) / calcDec).toFixed(objConvert[dec])).toLocaleString('en-US', { minimumFractionDigits: objConvert[dec] })
}

export function formatMMDDYY(value: string | number): any {
  if (!value) {
    return ''
  }
  const date = new Date(value)
  return (
    (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
    '/' +
    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
    '/' +
    date.getFullYear() +
    ' ' +
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
    ':' +
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
    ':' +
    (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  )
}
export function formatMMDDYYWithoutHours(value: string | number): any {
  if (!value) {
    return ''
  }
  const date = new Date(value)
  return (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '/' + date.getFullYear()
}

export function encryptPassword(pass: string): string | boolean {
  const PUBLIC_KEY =
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCgw0IeOV0DZL1ZfzsSSbZDRu9XPPBkb4EVsFKYODFJnEEMdVK3IBhCyehoUbJFufIvdQD78LyfRo46fB5B6k+EsLC/4vofQiYyE/R13r+Fd+xufTXpxDKkj544LtfBfvsh/fYFx+vUH1/5XtuCplBX4cOsIdMni026zZv46clJswIDAQAB'
  const RSAEncrypt = new JSEncrypt()
  RSAEncrypt.setPublicKey(PUBLIC_KEY)
  return RSAEncrypt.encrypt(pass)
}

export function timeAgo(time: string | number): string | undefined {
  if (time && time !== '') {
    const thisTime = new Date(time).getTime()
    const now = new Date().getTime()
    const elapsed = now - thisTime

    const msPerMinute = 60 * 1000
    const msPerHour = msPerMinute * 60
    const msPerDay = msPerHour * 24
    const msPerMonth = msPerDay * 30
    const msPerYear = msPerDay * 365

    if (elapsed < 1000) {
      return i18n.tc('time.just-now')
    } else if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + i18n.tc('time.second-ago')
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + i18n.tc('time.minute-ago')
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + i18n.tc('time.hours-ago')
    } else if (elapsed < msPerMonth) {
      const day = Math.round(elapsed / msPerDay)
      if (day < 7) {
        return day + i18n.tc('time.day-ago')
      } else {
        return Math.round(day / 7) + i18n.tc('time.week-ago')
      }
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + i18n.tc('time.month-ago')
    } else {
      return Math.round(elapsed / msPerYear) + i18n.tc('time.year-ago')
    }
  }
}

export function formatTransactionCode(code: string | null, begin = 10, last = 10): string {
  if (!code) return ''
  const before = code.substring(0, begin)
  const after = code.substring(code.length - last)
  return before + '...' + after
}

export function convertCurrency(amount) {
  if (!amount) return 0
  //@ts-ignore
  return Math.abs(amount) > 999 ? Math.sign(amount) * (Math.abs(amount) / 1000).toFixed(1) + 'k' : Math.sign(amount) * Math.abs(amount)
}

export function bytesToSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'
  const i = Math.floor(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
}

export function convertMs(ms) {
  if (!ms) return ''
  const days = Math.floor(ms / (24 * 60 * 60 * 1000))
  const daysms = ms % (24 * 60 * 60 * 1000)
  const hours = Math.floor(daysms / (60 * 60 * 1000))
  const hoursms = ms % (60 * 60 * 1000)
  const minutes = Math.floor(hoursms / (60 * 1000))
  const minutesms = ms % (60 * 1000)
  const sec = Math.floor(minutesms / 1000)

  if (days >= 1) {
    const textDay = days < 2 ? ' day ' : ' days '
    const textHour = hours < 2 ? ' hour ' : ' hours '
    if (hours) {
      return days + textDay + hours + textHour
    }
    return days + textDay
  }
  if (hours >= 1) {
    const textMinutes = minutes < 2 ? ' minute ' : ' minutes '
    const textHour = hours < 2 ? ' hour ' : ' hours '
    if (minutes) {
      return hours + textHour + minutes + textMinutes
    }
    return hours + textHour
  }
  if (minutes >= 1) {
    const textMinutes = minutes < 2 ? ' minute ' : ' minutes '
    const textSec = sec < 2 ? ' second ' : ' seconds '
    if (sec) {
      return minutes + textMinutes + sec + textSec
    }
    return minutes + textMinutes
  }

  return sec + ' seconds'
}

export function convertToStringDate(time: number): string {
  if (!time) return ''
  const dateString = new Date(time).toDateString()
  const _dateArr = dateString.split(' ')
  return _dateArr[1] + ' ' + _dateArr[2] + ', ' + _dateArr[3]
}

export function getDecimalsToken(token: string): number {
  const tokenList = {
    USDT: 6,
    USDC: 6,
    BNB: 18,
    BUSD: 18,
    CLM: 8,
    LYNK: 8,
    ETH: 18
  }
  return tokenList[token]
}
export function convertTextLowerCase(string: string): string {
  return string ? string.toLocaleLowerCase() : ''
}

export function roundUpNumberCurrency(number: number, currency: string): string {
  const objConvert = {
    LYNK: 100,
    CLM: 100,
    USD: 100,
    USDC: 100,
    USDT: 100,
    BNB: 100000,
    ETH: 100000000,
    BTC: 100000000,
    BUSD: 100
  }

  number = number = Math.ceil(number * objConvert[currency]) / objConvert[currency]
  return formatNumber(number)
}
