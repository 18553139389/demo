import Database from '@lib/module/Database'
import sync from '@lib/module/Sync'
import _ from 'underscore'
import client from '@lib/Rest'
import server from '@lib/module/Server'

// initial state
const state = {
  all: []
}

// getters
const getters = {
  allProducts: state => state.all,
  getProductByUuid: state => uuid => _.find(state.all, item => item.uuid === uuid)
}

// actions
const actions = {
  GET_DATA_FROM_LOCAL ({commit, rootState}, cb) {
    if (rootState.env.currentDebug) {
      console.log('[CORE][PRODUCT] GET_DATA_FROM_LOCAL start')
    }
    let debug = rootState.env.currentDebug
    Database.getTable(rootState, rootState.database.dbTable.product, function (data) {
      Database.responseUpdate(rootState.database.dbTable.product, data, debug, function () {
        if (rootState.env.currentDebug) {
          console.log('[CORE][PRODUCT] sync to store data is', data.list)
        }
        commit('SYNC_DATA_TO_LOC', data.list)
        if (cb !== undefined) {
          cb(data)
        }
      }, function () {
        commit('COMMIT_FAIL_LOGIN')
        if (cb !== undefined) {
          cb(null)
        }
      })
    })
    if (debug) {
      console.log('[CORE][PRODUCT][API] GET_DATA_FROM_LOCAL finish')
    }
  },
	//数据走的是这里
  GET_DATA_FROM_CLOUD ({commit, rootState}, {request, needConcat, cb}) {
    let requestUrl = rootState.configs.api['product_api_endpoint'] + request
    let env = rootState.env.currentEnv
    let storeToken = rootState.env.envList[env].token
    sync.getDataFromCloudWithToken(rootState, requestUrl, storeToken, rootState.database.dbTable.product,
      (res) => {
				console.log(res,needConcat,'这是切换得到的数据')
        if (cb !== undefined) cb(res)
        if (needConcat === undefined || needConcat) {
          commit('SYNC_DATA_TO_LOC', res.data)
        } else {
          commit('SET_DATA_TO_LOC', res.data)
        }
      })
  },
  GET_HOMEPAGE_DATA_FROM_CLOUD ({commit, rootState}, {request, needConcat, cb}) {
    let requestUrl = rootState.configs.api['product_api_endpoint'] + '/show_home' + request
    let env = rootState.env.currentEnv
    let storeToken = rootState.env.envList[env].token
    let db = rootState.database.dbTable.product
    sync.getDataFromCloudWithToken(rootState, requestUrl, storeToken, db,
      (res) => {
				console.log(res, '这是底部的数据')
        if (cb !== undefined) cb(res)
        if (rootState.env.currentDebug) {
          console.log('[CORE][PRODUCT][GET_HOMEPAGE_DATA_FROM_CLOUD] data is ', res.data)
        }
        if (needConcat === undefined || needConcat) {
          commit('SYNC_DATA_TO_LOC', res.data)
					console.log('走第一步了')
        } else {
					console.log('走第二步了')
          commit('SET_DATA_TO_LOC', res.data)
        }
      })
  },
  GET_CMS_PRODUCT_DATA_FROM_CLOUD ({commit, rootState}, {request, needConcat, cb}) {
    let requestUrl = rootState.configs.api['product_api_endpoint'] + '/link_product' + request
    let env = rootState.env.currentEnv
    let storeToken = rootState.env.envList[env].token
    let db = rootState.database.dbTable.product
		console.log('走到这一步了吗')
    sync.getDataFromCloudWithToken(rootState, requestUrl, storeToken, db, (res) => {
				console.log(res,'这是产品的数据')
				console.log(needConcat)
//         if (cb !== undefined) cb(res)
//         if (rootState.env.currentDebug) {
//           console.log('[CORE][PRODUCT][GET_HOMEPAGE_DATA_FROM_CLOUD] data is ', res.data)
//         }
        if (needConcat === undefined || needConcat) {
					console.log('走第一步了')
          commit('SYNC_DATA_TO_LOC', res.data)
        } else if(!needConcat){
					console.log('走第二步了')
          commit('SET_DATA_TO_LOC', res.data)
        }
      })
  },
  GET_PRODUCT_BY_UUID_FROM_CLOUD ({commit, rootState}, {uuid, size, hasProductAdvDesc, cb, errorCb}) {
    let env = rootState.env.currentEnv
    let token = rootState.env.envList[env].token
    let setProductAdvDesc = (hasProductAdvDesc !== undefined) ? hasProductAdvDesc : false
    let requestUrl = rootState.configs.api['product_api_endpoint'] + '/' + uuid + '?only_one_photo=true&has_photo=true&currency=CNY&is_base64=false&size=' + size + '&has_product_adv_desc=' + setProductAdvDesc
    server.fetchRemote(function () {
      let endpoint = rootState.server.endpoint
      let apiUrl = endpoint + requestUrl
      client.get(apiUrl, token,
        
        (res) => {
          if (rootState.env.currentDebug) {
            console.log('[CORE][PRODUCT][GET_PRODUCT_BY_UUID_FROM_CLOUD] data is ', res)
            
          }
          return cb(res)
        },
        (error) => {
          if (errorCb !== undefined) {
            errorCb(error)

          }
        }
      )
    })
  }
}

// mutations
const mutations = {
  SYNC_DATA_TO_LOC (state, data) {
		console.log(state.all,data,'看看增加数据')
    _.map(data.data, function (object) {
      const findKey = _.findKey(state.all.data, item => item.id === object.id)
			console.log(findKey,'后边开始第一步')
      if (findKey === undefined) {
        state.all.data.push(object)
				console.log(state.all.data,'全部数据有多少')
      } else {
        state.all[findKey] = object
				console.log(state.all,object,'全部数据有多少第二个')
      }
    })
  },
  SET_DATA_TO_LOC (state, data) {
    state.all = data
		console.log(data,'产品列表数据的初始化')
  },
  decrementProductInventory (state, {id}) {
    const product = state.all.find(product => product.id === id)
    product.inventory--
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
