import Database from '@lib/module/Database'

// initial state
const state = {
  endpoint: null,
  ready: false,
  all: {
    serverUpdateTime: 50000, // 50s
    serverHeartbeatTime: 300000 // 5 minutes
  }
}

// getters
const getters = {
  getEndpoint: state => state.endpoint,
  getServerReady: state => state.ready
}

// actions
const actions = {
  SET_ENDPOINT ({ commit, rootState }, address) {
    let debug = rootState.env.currentDebug
    let systemEnv = process.env.NODE_ENV
    let serverList = rootState.env.envList
    let endpoint = serverList[systemEnv].serverUrl
    if (debug) {
      console.log('[CORE][SERVER] SET_ENDPOINT start- endpoint is', endpoint)
    }
    if (address) {
      commit('COMMIT_SET_ENDPOINT', address)
    } else {
      commit('COMMIT_SET_ENDPOINT', endpoint)
    }
    if (debug) {
      console.log('[CORE][SERVER] SET_ENDPOINT finish')
    }
  },
  GET_DATA_FROM_LOCAL ({ commit, rootState }, cb) {
    if (rootState.env.currentDebug) {
      console.log('[CORE][SERVER] GET_DATA_FROM_LOCAL start')
    }
    let debug = rootState.env.currentDebug
    Database.getTable(rootState, rootState.database.dbTable.server, function (data) {
      // Database.responseUpdate(rootState.database.dbTable.server, data, debug, function () {
      //   if (rootState.env.currentDebug) {
      //     console.log('[CORE][SERVER] sync to store data is', data)
      //   }
      //   if (cb !== undefined) { cb(data) }
      //   commit('SYNC_SERVER', data)
      // }, function () {
      //   if (cb !== undefined) { cb(null) }
      // })
    })
    if (debug) {
      console.log('[CORE][SERVER][API] GET_DATA_FROM_LOCAL finish')
    }
  },
  VALIDATION_CHECK ({ commit, rootState }) {
    let debug = rootState.env.currentDebug
    if (debug) {
      console.log('[CORE][SERVER] SYSTEM_VALIDATION_CHECK start')
    }
    if (debug) {
      console.log('[CORE][SERVER] SYSTEM_VALIDATION_CHECK finish')
    }
  }
}

// mutations
const mutations = {
  SYNC_SERVER (state, data) {
    state.all = data
  },
  COMMIT_SET_ENDPOINT (state, endpoint) {
    state.endpoint = endpoint
  },
  COMMIT_SET_SERVER_READY (state, ready) {
		console.log("这是server服务的日志")
    state.ready = ready
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
