import Database from '@lib/module/Database'
import sync from '@lib/module/Sync'
import _ from '../../../vendor/underscore/underscore'

// initial state
const state = {
  all: []
}

// getters
const getters = {
  allCategory: state => state.all
}

// actions
const actions = {
  GET_DATA_FROM_LOCAL ({ commit, rootState }, cb) {
    if (rootState.env.currentDebug) {
      console.log('[CORE][CATEGORY] GET_DATA_FROM_LOCAL start')
    }
    let debug = rootState.env.currentDebug
    Database.getTable(rootState, rootState.database.dbTable.category, function (data) {
      Database.responseUpdate(rootState.database.dbTable.category, data, debug, function () {
        if (rootState.env.currentDebug) {
          console.log('[CORE][CATEGORY] sync to store data is', data.list)
        }
        commit('SYNC_CATEGORY_TO_LOC', data.list)
        if (cb !== undefined) { cb(data) }
      }, function () {
        commit('COMMIT_FAIL_LOGIN')
        if (cb !== undefined) { cb(null) }
      })
    })
    if (debug) {
      console.log('[CORE][CATEGORY][API] GET_DATA_FROM_LOCAL finish')
    }
  },
	//走的是这里初始化
  GET_DATA_FROM_CLOUD ({commit, rootState}, {request, needConcat, cb}) {
    let env = rootState.env.currentEnv
    let storeToken = rootState.env.envList[env].token
    let db = rootState.database.dbTable.category
    let companyUuid = rootState.env.envList[env].company_uuid
    let requestUrl = rootState.configs.api['category_api_endpoint'] + '/' + companyUuid + '/all' + request
    sync.getDataFromCloudWithToken(rootState, requestUrl, storeToken, db,
        (res) => {
					console.log('这里是category数据成功',res)
          if (cb !== undefined) cb(res)
          if (rootState.env.currentDebug) {
            console.log('[CORE][CATEGORY][GET_DATA_FROM_CLOUD] data is ', res.data)
          }
          if (needConcat === undefined || needConcat) {
            commit('SYNC_DATA_TO_LOC', res.data)
          } else {
            commit('SET_DATA_TO_LOC', res.data)
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
		console.log('数据添加进去了')
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
