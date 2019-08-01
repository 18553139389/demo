import Database from '@lib/module/Database'
import sync from '@lib/module/Sync'
import client from '@lib/Rest'
import _ from 'underscore'

// initial state
const state = {
  all: [],
  classifiedOrder: [],
  tempOrder: null
}

// getters
const getters = {
  allOrderHistory: state => state.all,
  getClassifiedOrder: state => state.classifiedOrder,
  getTempOrder: state => state.tempOrder
}

// actions
const actions = {
  GET_DATA_FROM_LOCAL ({ commit, rootState }, cb) {
    if (rootState.env.currentDebug) {
      console.log('[CORE][ORDER_HISTORY] GET_DATA_FROM_LOCAL start')
    }
    let debug = rootState.env.currentDebug
    Database.getTable(rootState, rootState.database.dbTable.orderHistory, function (data) {
      Database.responseUpdate(rootState.database.dbTable.orderHistory, data, debug, function () {
        if (rootState.env.currentDebug) {
          console.log('[CORE][ORDER_HISTORY] sync to store data is', data.list)
        }
        commit('SYNC_ORDER_HISTORY_TO_LOC', data.list)
        if (cb !== undefined) { cb(data) }
      }, function () {
        commit('COMMIT_FAIL_LOGIN')
        if (cb !== undefined) { cb(null) }
      })
    })
    if (debug) {
      console.log('[CORE][ORDER_HISTORY][API] GET_DATA_FROM_LOCAL finish')
    }
  },
  GET_DATA_FROM_CLOUD  ({ commit, rootState, state }, {cb, page, limit, statusStr = ''}) {
		console.log('进入订单计划')
    let requestUrl = rootState.configs.api['order_api_endpoint'] + '/history?currency=CNY' + `&page=${page++}&limit=${limit}${statusStr}`
    sync.getDataFromCloud(rootState, requestUrl, rootState.database.dbTable.orderHistory, function (res) {
			console.log('看看订单出来了吗',res)
      commit('SYNC_ORDER_HISTORY_TO_LOC', res.data)
      commit('ORDER_CLASSIFICATION', state.all)
      cb && cb(res)
    })
  },
  CHANGE_CLOUD_STATUS_BY_UUID ({commit, rootState}, {uuid, cb}) {
    commit('CHANGE_STATUS_BY_UUID', uuid)
    let api = rootState.config.api['order_api_endpoint']
    let endpoint = rootState.server.endpoint
    // let token = store.getters['account/getCustomerToken']
    let token = rootState.account.all.token
    let apiurl = endpoint + api + uuid + '/edit'
    client.get(apiurl, token, cb)
  },
  REFUND_ORDER ({commit, rootState}, {order_no, cb}) {
    let api = rootState.config.api['order_api_endpoint']
    let endpoint = rootState.server.endpoint
    let token = rootState.account.all.token
    let apiurl = endpoint + api + '/refund'
    client.post(apiurl, token, JSON.stringify({order_no}), cb)
  }
}

// mutations
const mutations = {
  COMMIT_TEMP_ORDER (state, data) {
    state.tempOrder = data
  },
  SYNC_ORDER_HISTORY_TO_LOC (state, data) {
		console.log(data,'开始添加数据')
		console.log(state.all,'所有的数据')
    state.all = state.all.concat(data.data)
  },
  CLEAR_ALL (state) {
    state.all = []
    state.classifiedOrder = []
  },
  ORDER_CLASSIFICATION (state, data) {
    let all = JSON.parse(JSON.stringify(state.all))
    let orders = [
      {
        title: '全部',
        data: all
      },
      {
        title: '待付款',
        data: []
      },
      {
        title: '未发货',
        data: []
      },
      {
        title: '已发货',
        data: []
      },
      {
        title: '已完成',
        data: []
      }
    ]
    _.each(all, item => {
      switch (item.orderStatus) {
        case 0:
          orders[1].data.push(item)
          break
        case 1:
          orders[2].data.push(item)
          break
        case 5:
          orders[2].data.push(item)
          break
        case 4:
          orders[3].data.push(item)
          break
        case 10:
          orders[4].data.push(item)
          break
      }
    })
    state.classifiedOrder = orders
		console.log(orders,'这是列表的头部选择')
  },
  CHANGE_STATUS_BY_UUID (state, uuid) {
    state.all.length > 0 && state.all.forEach(item => {
      if (item.uuid === uuid) {
        item.orderStatus = 10
      }
    })
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
