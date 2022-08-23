import { MutationTree } from 'vuex'
import { ISBase } from '.'
import filter from 'lodash/filter'
import union from 'lodash/union'

const mutations: MutationTree<ISBase> = {
  SET_OPEN_POPUP: (state, data: { popupName: string; isOpen: boolean }) => {
    if (data.isOpen) {
      state.popup = union(state.popup, [data.popupName])
    } else {
      state.popup = filter(state.popup, value => {
        return value !== data.popupName
      })
    }
  },
  SET_OPEN_DRAWER: (state, data: { drawerName: string; isOpen: boolean }) => {
    if (data.isOpen) {
      state.drawer = union(state.drawer, [data.drawerName])
    } else {
      state.drawer = filter(state.drawer, value => {
        return value !== data.drawerName
      })
    }
  },
  SET_SYSTEM_PARAMS: (state, data) => {
    state.urlSystem = { ...data }
  },
  SET_STATUS_SCREEN: (state, payload) => {
    state.isDesktop = payload
  }
}
export default mutations
