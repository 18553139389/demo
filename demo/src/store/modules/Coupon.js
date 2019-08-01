import Database from '@lib/module/Database'
import sync from '@lib/module/Sync'
// import client from '@lib/Rest'
// import moment from 'moment'
import _ from '../../../vendor/underscore/underscore'

// initial state
const state = {
  all: [
    // {spendAmount: 20, freeCredit: 5, is_use: false, created: '2018-07-14 13:00:07', expired: '2018-08-13 13:00:07', id: '4'},
    // {spendAmount: 200, freeCredit: 100, is_use: false, created: '2018-07-14 13:00:07', expired: '2018-08-13 13:00:07', id: '1'},
    // {spendAmount: 300, freeCredit: 150, is_use: false, created: '2018-07-14 13:00:07', expired: '2018-08-13 13:00:07', id: '2'},
    // {spendAmount: 500, freeCredit: 300, is_use: false, created: '2017-07-14 13:00:07', expired: '2017-08-13 13:00:07', id: '3'}
  ]
  // couponInUse: {}
}

// getters
const getters = {
  getCouponInUse: state => state.all.find(item => item.is_use) || {},
  getCouponData: state => state.all,
  // usedCoupon (state, getters) { // 已经使用的优惠券
  //   return getters.getCouponData.filter((item) => item.is_use)
  // },
  // unusedCoupon (state, getters) { // 未使用的优惠券
  //   return getters.getCouponData.filter((item) => !item.is_use)
  // },
  expiredCoupon (state, getters) { // 过期的优惠券
    return state.all.filter((item) => !moment().isBefore(item.expired))
  },
  canUseCoupon (state, getters) { // 可以用的优惠券
    return state.all.filter((item) => {
      let bool1 = moment().isBefore(item.expired)
      let bool2 = !_.isUndefined(item.active) ? item.active : true
      return bool1 && bool2
    })
  },
  canUseCouponNumber (state, getters) {
    let coupons = getters.canUseCoupon
    return coupons.length
  },
  canNotUseCoupon (state, getters) { // 不可以使用的 &&未过期的 优惠券
    return state.all.filter(item => ((moment().isBefore(item.expired)) && (!_.isUndefined(item.active) ? !item.active : false)))
  }
}

// actions
const actions = {
  GET_DATA_FROM_LOCAL ({ commit, rootState }, cb) {
    if (rootState.env.currentDebug) {
      console.log('[CORE][COUPON] GET_DATA_FROM_LOCAL start')
    }
    let debug = rootState.env.currentDebug
    Database.getTable(rootState, rootState.database.dbTable.coupon, function (data) {
      Database.responseUpdate(rootState.database.dbTable.coupon, data, debug, function () {
        if (rootState.env.currentDebug) {
          console.log('[CORE][COUPON] sync to store data is', data.list)
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
  GET_DATA_FROM_CLOUD ({commit, rootState, rootGetters}, {request, needConcat, cb}) {
    let token = rootGetters['account/getCustomerToken']
    let db = rootState.database.dbTable.coupon
    let requestUrl = rootState.configs.api['coupon_api_endpoint'] + request
    sync.getDataFromCloudWithToken(rootState, requestUrl, token, db,
        (response) => {
          if (cb !== undefined) cb(response)
          if (rootState.env.currentDebug) {
            console.log('[CORE][COUPON][GET_DATA_FROM_CLOUD] data is ', response.data)
          }
          let result = _.filter(response.data, item => !!item)
          if (needConcat === undefined || needConcat) {
            commit('SYNC_DATA_TO_LOC', result)
          } else {
            commit('SET_DATA_TO_LOC', result)
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
  },
  // SYNC_COUPON_TO_LOC (state, data) {
  //   let coupons = data
  //   coupons = _.filter(coupons, item => !!item.coupon_attributes)
  //   _.each(coupons, item => {
  //     item.coupon_attributes.amount = parseFloat(item.coupon_attributes.amount)
  //     item.coupon_attributes.spend_amount = parseFloat(item.coupon_attributes.spend_amount)
  //   })
  //   state.all = coupons
  //   console.log('coupons: ', coupons)
  //   // console.log('bool: ', !_.isUndefined(false) ? false : true)
  // },
  SET_COUPON_IN_USE (state, id) {
    _.each(state.all, item => {
      if (item.id === id) {
        item.is_use = true
      } else {
        item.is_use = false
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
