import client from '@lib/Rest'
import _ from '../../../vendor/underscore/underscore'

const state = {
	all: []
}

// getters
const getters = {
	getAll: state => state.all,
	getDefaultMethod: state => _.find(state.all, item => item.is_default)
}

// // actions
const actions = {
	GET_DATA_FROM_CLOUD({
		state,
		commit,
		rootState
	}, cb) {
		console.log(rootState.configs)
		let requestUrl = rootState.configs.api['payment_gateway']
		let endpoint = rootState.server.endpoint
		let apiUrl = endpoint + requestUrl + '/all'
		let env = rootState.env.currentEnv
		let token = rootState.env.envList[env].token
		console.log(rootState.env.envList)
		console.log(rootState.server.endpoint)
		console.log(token)
		wx.request({
			url: apiUrl, 
			method: 'GET',
			header: {
				'Authorization': token,
				'content-type': 'application/json' // 默认值
			},
			success(res) {
				console.log(res,'这里面是什么东西')
				if (res.data.code === 200) {
					commit('COMMIT_PAYMENT_TYPE', res.data.data)
					console.log('接口获取成功')
				}
				// cb && cb()
			},
			fail() {
				if (token) {
					this.$store.commit('system/COMMIT_NET_WORK_ERROR', true)
				}
				if (errorCallBack !== undefined) {
					errorCallBack()
				}
			}
		})
// 		client.get(apiUrl, token, function(response) {
// 			console.log('00000000')
// 			if (response.code === 200) {
// 				commit('COMMIT_PAYMENT_TYPE', response.data)
// 				console.log('接口获取成功')
// 			}
// 			cb && cb()
// 		}, function() {
// 			console.log('接口获取失败')
// 		},function(res) {
// 			console.log(res +'失败')
// 		})
		console.log('666999')
	}
}

// mutations
const mutations = {
	COMMIT_PAYMENT_TYPE(state, data) {
		console.log('打印看看有东西吗啊啊啊payment: ', data)
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
