import { ActionTree } from 'vuex'
import { ISBase } from '.'

const actions: ActionTree<ISBase, unknown> = {
  setOpenPopup({ commit }, data: { popupName: string; isOpen: string }) {
    commit('SET_OPEN_POPUP', data)
  },
  setOpenDrawer({ commit }, data: { drawerName: string; isOpen: string }) {
    commit('SET_OPEN_DRAWER', data)
  },
  setSystemParams({ commit }, data) {
    commit('SET_SYSTEM_PARAMS', data)
  }
}

export default actions
