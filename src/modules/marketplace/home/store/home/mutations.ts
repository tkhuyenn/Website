import { MutationTree } from 'vuex'
import { IAuth } from '.'

const mutations: MutationTree<IAuth> = {
  SET_META_LIST: (state, metaList) => {
    state.blockMeta = metaList[0]
    state.productMeta = metaList[1]
    state.projectMeta = metaList[2]
    state.featureMeta = metaList[3]
  }
}
export default mutations
