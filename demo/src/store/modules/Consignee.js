import Database from '@lib/module/Database'
import sync from '@lib/module/Sync'
import _ from '../../../vendor/underscore/underscore'

// initial state
const state = {
  all: []
}

// getters
const getters = {
  getData: state => state.all,
  getDefaultConsignee: state => _.find(state.all, item => item.is_default)
}

// actions
const actions = {
  GET_DATA_FROM_LOCAL ({ commit, rootState }, cb) {
    if (rootState.env.currentDebug) {
      console.log('[CORE][CONSIGNEE] GET_DATA_FROM_LOCAL start')
    }
    let debug = rootState.env.currentDebug
    Database.getTable(rootState, rootState.database.dbTable.consignee, function (data) {
      Database.responseUpdate(rootState.database.dbTable.consignee, data, debug, function () {
        if (rootState.env.currentDebug) {
          console.log('[CORE][CONSIGNEE] sync to store data is', data.list)
        }
        commit('SET_DATA_TO_LOC', data.list)
        if (cb !== undefined) { cb(data) }
      }, function () {
        if (cb !== undefined) { cb(null) }
      })
    })
    if (debug) {
      console.log('[CORE][COUPON][API] GET_DATA_FROM_LOCAL finish')
    }
  },
  GET_DATA_FROM_CLOUD ({commit, rootState}, {request, needConcat, cb}) {
    let db = rootState.database.dbTable.consignee
    let requestUrl = rootState.configs.api['consignee_api_endpoint'] + request
    sync.getDataFromCloud(rootState, requestUrl, db,
        (response) => {
          if (cb !== undefined) cb(response)
          if (rootState.env.currentDebug) {
            console.log('[CORE][COUPON][GET_DATA_FROM_CLOUD] data is ', response.data)
          }
          if (needConcat === undefined || needConcat) {
            commit('SYNC_DATA_TO_LOC', response.data)
          } else {
            commit('SET_DATA_TO_LOC', response.data)
          }
        })
  }
}

// mutations
const mutations = {
  SYNC_DATA_TO_LOC (state, data) {
    _.map(data, function (object) {
      const findKey = _.findKey(state.all, item => item.id === object.id)
      if (findKey === undefined) {
        state.all.push(object)
      } else {
        state.all[findKey] = object
      }
    })
  },
  SET_DATA_TO_LOC (state, data) {
    state.all = data
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
