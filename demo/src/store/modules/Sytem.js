// initial state
const state = {
  keyboardArea: null,
  appVar: null,
  netWorkError: false
}

// getters
const getters = {
  getKeyboardArea: (state) => state.keyboardArea,
  getAppVar: (state) => state.appVar,
  isNetWorkError: state => state.netWorkError
}

// actions
const actions = {
  FIND_KEYBOARD_AREA: function ({ commit }, keyboardArea) { commit('COMMIT_KEYBOARD_AREA', keyboardArea) },
  SET_APP_VAR: function ({ commit }, appVar) { commit('COMMIT_SET_APP_VAR', appVar) },
  RESET_APP_VAR: function ({ commit }) { commit('COMMIT_RESET_APP_VAR') }
}

// mutations
const mutations = {
  COMMIT_KEYBOARD_AREA: (state, keyboardArea) => {
    state.keyboardArea = keyboardArea
  },
  COMMIT_SET_APP_VAR: (state, appVar) => {
    state.appVar = appVar
  },
  COMMIT_RESET_APP_VAR: (state) => {
    state.appVar = null
  },
  COMMIT_NET_WORK_ERROR: (state, bool) => {
    state.netWorkError = bool
  }
}

export default {
  strict: true,
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
