import client from '@lib/Rest'

const state = {
  all: [],
  needUpdate: true,
  defaultId: null,
  isfromOrder: false,
  selectConsignee: null, // 用在订单退回来的时候,
  transport: null,
  paymentType: null
}

// getters
const getters = {
  getPaymentType: state => state.paymentType,
  getTransport: state => state.transport,
  getAll: state => state.all,
  getConsignees: state => state.all,
  getDefaultId: state => state.defaultId,
  getNeedUpdate: state => state.needUpdate,
  getDefaultConsignee: state => {
    if (!state.selectConsignee) {
      let defaultConsignee = state.all.find(item => item.id === state.defaultId)
      return defaultConsignee
    } else {
      return state.selectConsignee
    }
  },
  getFromType: (state) => {
    return state.isfromOrder // 来自哪里
  }
}

// // actions
const actions = {
  GET_DATA_FROM_CLOUD ({state, commit, rootState}, cb) {
    let requestUrl = rootState.config.api['consignee']
    let endpoint = rootState.server.endpoint
    let apiUrl = endpoint + requestUrl
    let account = rootState.account.all
    client.get(apiUrl, account.token, (response) => {
      if (response.code === 200) {
        console.log(response.data)
        commit('COMMIT_CONSIGNEES', response.data)
        commit('CHANGE_DEFAULT_ID')
      }
      cb && cb()
    }, () => {
    })
  },
  UPDATE_IS_DEFAULT ({state, commit, rootState}, id) {
    let requestUrl = rootState.config.api['consignee']
    let endpoint = rootState.server.endpoint
    let apiUrl = endpoint + requestUrl + '/update'
    let account = rootState.account.all
    let consignee = state.all.find(item => item.id === id)
    consignee.consignee_id = consignee.id
    console.log('consignee: ', consignee)
    let data = JSON.stringify(consignee)
    client.post(apiUrl, account.token, data, (response) => {
      if (response.code === 200) {
        commit('CHANGE_DEFAULT_ID', id)
      }
      // cb && cb()
    }, () => {})
  },
  SET_DEFAULT_CONSIGNEE ({state, commit, rootState}, id) {
    let requestUrl = rootState.config.api['consignee']
    let endpoint = rootState.server.endpoint
    let apiUrl = endpoint + requestUrl + '/default/' + id
    let account = rootState.account.all
    client.get(apiUrl, account.token, (response) => {
      if (response.code === 200) {
        console.log('transport', response.data)
      }
    }, () => {
    })
  },
  GET_TRANSPORT_FROM_CLOUD ({state, commit, rootState}, cb) {
    let requestUrl = rootState.config.api['transport']
    let endpoint = rootState.server.endpoint
    let apiUrl = endpoint + requestUrl + '/all'
    let env = rootState.env.currentEnv
    let token = rootState.env.envList[env].token
    client.get(apiUrl, token, (response) => {
      if (response.code === 200) {
        console.log('transport', response.data)
        commit('COMMIT_TRANSPORT', response.data)
      }
      cb && cb()
    }, () => {
    })
  },
  GET_PAYMENT_FROM_CLOUD ({state, commit, rootState}, cb) {
    let requestUrl = rootState.config.api['payment_gateway']
    let endpoint = rootState.server.endpoint
    let apiUrl = endpoint + requestUrl + '/all'
    let env = rootState.env.currentEnv
    let token = rootState.env.envList[env].token
    client.get(apiUrl, token, (response) => {
      if (response.code === 200) {
        console.log('payment_type: ', response.data)
        commit('COMMIT_PAYMENT_TYPE', response.data)
      }
      cb && cb()
    }, () => {
    })
  }
}

// mutations
const mutations = {
  COMMIT_PAYMENT_TYPE (state, data) {
    state.paymentType = data
  },
  COMMIT_TRANSPORT (state, data) {
    state.transport = data
  },
  COMMIT_FROM_TYPE (state, type) { // 修改是否来自订单
    state.isfromOrder = type
  },
  COMMIT_SET_SELECT_CONSIGNEE (state, consignee) {
    state.selectConsignee = consignee
  },
  COMMIT_CONSIGNEES (state, all) {
    state.all = all
  },
  CHANGE_UPDATED (state, bool) {
    state.needUpdate = bool
  },
  CHANGE_DEFAULT_ID (state, id) {
    if (!!id && id !== '') {
      state.defaultId = id
      return
    }
    const item = state.all.find(item => !!item.is_default)
    id = !!item && id !== '' ? item.id : state.all[0].id
    state.defaultId = id
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
