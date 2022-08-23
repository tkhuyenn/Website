import { ActionTree } from 'vuex'
import { IAuth } from '.'

const actions: ActionTree<IAuth, unknown> = {
  setMetaData({ commit }, metaList: Array<Array<Record<string, any>>>) {
    commit('SET_META_LIST', metaList)
  }
}

export default actions
