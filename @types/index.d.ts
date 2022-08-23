import Vue from 'vue'
declare module 'vue/types/vue' {}
declare global {
  interface Window {
    ethereum: any
    BinanceChain: any
    [x: string]: any
  }
}
