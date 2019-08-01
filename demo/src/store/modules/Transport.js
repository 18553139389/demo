import client from '@lib/Rest'

const state = {
  all: []
}

// getters
const getters = {
  getAll: state => state.all
}

// // actions
const actions = {
  GET_DATA_FROM_CLOUD ({state, commit, rootState}, cb) {
    let requestUrl = rootState.configs.api['transport']
    let endpoint = rootState.server.endpoint
    let apiUrl = endpoint + requestUrl + '/all?currency=CNY'
    let env = rootState.env.currentEnv
    let token = rootState.env.envList[env].token
    wx.request({
			url: apiUrl, 
			method: 'GET',
			header: {
				'Authorization': token,
				'content-type': 'application/json' // 默认值
			},
			success(res) {
        console.log('打印transport', res.data)
			  if (res.data.code === 200) {
          commit('COMMIT_TRANSPORT', res.data.data)
        }
        cb && cb()
			},
		});
    // client.get(apiUrl, token, (response) => {
    //   if (response.code === 200) {
    //     console.log('transport', response.data)
    //     commit('COMMIT_TRANSPORT', response.data)
    //   }
    //   cb && cb()
    // }, () => {
    // })
  }
}

// mutations
const mutations = {
  COMMIT_TRANSPORT (state, data) {
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
