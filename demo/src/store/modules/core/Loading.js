// initial state
const state = {
  visible: false
}

// getters
const getters = {
  getVisible: state => state.visible
}

// actions
const actions = {
  UPDATE_LOADING_VISIBLE ({ commit }, visible) {
    commit('COMMIT_UPDATE_LOADING_VISIBLE', visible)
  }
}

// mutations
const mutations = {
  COMMIT_UPDATE_LOADING_VISIBLE: (state, visible) => { state.visible = visible }
}

export default {
  strict: true,
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
