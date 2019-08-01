import Database from '@lib/module/Database'
import $ from '../../../../vendor/jquery/dist/jquery'

// initial state
const state = {
  all: [],
  install: false,
  queuePushToCloudTime: 30000, // 30s
  queueCoolDownTimer: 5000
}

// getters
const getters = {
  getQueue: state => state.all
}

// actions
const actions = {
  CHECK_QUEUE_IN_DATABASE ({ commit, rootState }) {
    if (rootState.env.currentDebug) {
      console.log('[CORE][Queue] CHECK_QUEUE_IN_DATABASE start')
    }
    Database.initAllTable(rootState, function () {
      if (rootState.env.currentDebug) {
        console.log('[CORE][DATABASE] init all table in local...')
      }
    })
    if (rootState.env.currentDebug) {
      console.log('[CORE][Queue] CHECK_QUEUE_IN_DATABASE finish')
    }
  },
  UNLOCK_ALL_QUEUE ({ commit, state, rootState }) {
    if (rootState.env.currentDebug) {
      console.log('[CORE][Queue] UNLOCK_ALL_QUEUE start')
    }
    let queueList = []
    if (state.all.length > 0) {
      $.each(state.all, function (key, value) {
        queueList[key].lock = false
      })
    }
    commit('COMMIT_UPDATE_QUEUE', queueList)
    if (rootState.env.currentDebug) {
      console.log('[CORE][Queue] UNLOCK_ALL_QUEUE finish')
    }
  }
}

// mutations
const mutations = {
  COMMIT_UPDATE_QUEUE: (state, queueList) => { state.all = queueList }
}

export default {
  strict: true,
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
