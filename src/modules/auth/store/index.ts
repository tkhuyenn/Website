import { Module } from 'vuex'
import beAuth from './auth'

const authStores: Record<string, Module<any, any>> = {
  beAuth
}

export default authStores
