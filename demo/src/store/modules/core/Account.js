import Database from '@lib/module/Database'
import client from '@lib/Rest'
import UUID from '@lib/UUID'


// initial state
const state = {
	all: {
		storeLogin: false,
		deviceId: ''
	},
	selectConsignee: {}
}

// getters
const getters = {
	// getBonus: state => state.bonus,
	getStore: state => state.store,
	getSiteUuid: state => state.site_uuid,
	getCompanyUuid: state => state.company_uuid,
	getToken: state => state.token,
	getCustomerToken: state => state.all.data.token,
	getCustmerUuid: state => state.all.data.uuid,
	getAccountData: state => state.all.data,
	getDeviceId: state => state.all.deviceId,
	isLogin(state) {
		let result = false
		if (state.all.storeLogin && state.all.storeLogin !== '') {
			result = true
		}
		return result
	},
	getProductList(state) {
		return state.productlist
	},
	selectConsignee(state) {
		return state.selectConsignee
	}
}

// actions
const actions = {
	GET_DATA_INTEGRAL_CLOUD({
		commit,
		getters,
		rootState
	}, {
		cb
	}) {
		let account = getters.getAccountData
		let requestUrl = rootState.configs.api['customer_api_endpoint'] + '/integral/history'
		let endpoint = rootState.server.endpoint
		let apiUrl = endpoint + requestUrl
		client.get(apiUrl, account.token,
			(response) => {
				let data = response
				console.log(data, "GET_DATA_INTEGRAL_CLOUD的data")
				// state.bonus = data
				// if (cb !== undefined) cb()
				cb(data)
			})
	},
	GET_DATA_FROM_CLOUD({
		commit,
		getters,
		rootState
	}, {
		cb,
		failCb
	}) {
		let account = getters.getAccountData
		let requestUrl = rootState.configs.api['customer_api_endpoint'] + '/member_card/' + account.member_id
		let endpoint = rootState.server.endpoint
		let apiUrl = endpoint + requestUrl
		wx.request({
			url: apiUrl,
			method: 'GET',
			header: {
				'Authorization': token,
				'content-type': 'application/json' // 默认值
			},
			success(res) {
				let data = res.data.data
				console.log("init成功了", res)
				data.storeLogin = true
				Database.updateTable(rootState, rootState.database.dbTable.system, data, function(response) {
					commit('COMMIT_SYNC_ACCOUNT', data)
					if (cb !== undefined) cb()
				})
			},
			fail() {
				if (failCb !== undefined) failCb()
			}
		})
		//     client.get(apiUrl, account.token,
		//       (response) => {
		//         let data = response.data
		//         data.storeLogin = true
		//         Database.updateTable(rootState, rootState.database.dbTable.system, data, function (response) {
		//           commit('COMMIT_SYNC_ACCOUNT', data)
		//           if (cb !== undefined) cb()
		//         })
		//       },
		//       () => {
		//         if (failCb !== undefined) failCb()
		//       })

	},
	GET_ACCOUNT({
		commit,
		rootState
	}, cb) {
		if (rootState.env.currentDebug) {
			console.log('[CORE][ACCOUNT] GET_ACCOUNT start')
		}
		let debug = rootState.env.currentDebug
		Database.getTable(rootState, rootState.database.dbTable.system, function(data) {
			console.log('[CORE][ACCOUNT] GET_ACCOUNT start', data)
			console.log('[CORE][ACCOUNT] GET_ACCOUNT start 111 ', !$.isEmptyObject(data))

			if (data && !$.isEmptyObject(data)) {
				if (data.deviceId === undefined || data.deviceId === '') {
					data.deviceId = UUID.generate()
				}
				commit('COMMIT_SYNC_ACCOUNT', data)
				if (cb !== undefined) cb(data)
				if (debug) {
					console.log('[CORE][ACCOUNT][API] load account info via GET_ACCOUNT', data)
				}
			} else {
				commit('COMMIT_FAIL_LOGIN')
				if (debug) {
					console.log('[CORE][ACCOUNT][API] fail in GET_ACCOUNT table: ' + rootState.database.dbTable.system, data)
				}
			}
		}, function() {
			commit('COMMIT_FAIL_LOGIN')
			if (cb !== undefined) cb(null)
			if (debug) {
				console.log('[CORE][ACCOUNT][API] fail in GET_ACCOUNT no data, table: ' + rootState.database.dbTable.system)
			}
		})
		if (debug) {
			console.log('[CORE][ACCOUNT][API] GET_ACCOUNT finish')
		}
	},
	CHECK_LOGIN({
		commit,
		rootState
	}, data) {
		let env = rootState.env.currentEnv
		let url = rootState.env.envList[env].serverUrl + rootState.config.api['store_login'] + '/login'
		client.post(url, data, function(response) {
			if (response.code === 200) {
				commit('COMMIT_SYNC_ACCOUNT', response)
			} else {
				commit('COMMIT_FAIL_LOGIN')
			}
		}, function() {
			commit('COMMIT_FAIL_LOGIN')
		})
	},
	LOGIN_SUCCESS({
		commit,
		rootState
	}, data) {
		if (rootState.env.currentDebug) {
			console.log('[CORE][ACCOUNT] LOGIN_SUCCESS start')
			console.log('[CORE][ACCOUNT] LOGIN_SUCCESS data is: ', data)
		}
		commit('COMMIT_SUCCESS_LOGIN')
		Database.updateTable(rootState, rootState.database.dbTable.system, data, function(response) {
			commit('COMMIT_SYNC_ACCOUNT', data)
		})
		if (rootState.env.currentDebug) {
			console.log('[CORE][ACCOUNT] LOGIN_SUCCESS finish')
		}
	},
	FAIL_LOAD_DATA({
		commit,
		rootState
	}, data) {
		if (rootState.env.currentDebug) {
			console.log('[CORE][ACCOUNT] FAIL_LOAD_DATA data is: ', data)
		}
		commit('FAIL_LOAD_DATA')
		commit('COMMIT_SYNC_ACCOUNT', data)
		// Database.updateTable(rootState, rootState.database.dbTable.system, data, function (response) {
		//
		// })
		if (rootState.env.currentDebug) {
			console.log('[CORE][ACCOUNT] FAIL_LOAD_DATA finish')
		}
	},
	RESET({commit,rootState}) {
		console.log(state.all.data,'88888')
		if (state.all.data.deviceId === undefined || state.all.data.deviceId === '' || state.all.data.deviceId === null) {
			state.all.data.deviceId = UUID.generate()
		}
		if (state.all.data.mobile && state.all.data.mobile.indexOf('_') === 0) {
			let data = JSON.stringify({
				'uuid': state.all.data.uuid,
				'deviceId': state.all.data.deviceId
			})
			let env = rootState.env.currentEnv
			let url = rootState.env.envList[env].serverUrl + rootState.configs.api['customer_api_endpoint'] +'/binding_micro_letter'
			// client.post(url, state.all.data.token, data, (s) => {}, (e) => {})
			wx.request({
				url: url,
				method: 'POST',
				data: data,
				header: {
					'Authorization': state.all.data.token,
					'content-type': 'application/json' // 默认值
				},
				success(res) {},
				fail() {}
			})
		}
		let accountReset = {}
		accountReset = {
			storeLogin: false,
			deviceId: state.all.data.deviceId
		}
		if (rootState.env.currentDebug) {
			console.log('[CORE][ACCOUNT] RESET start')
			console.log('[CORE][ACCOUNT] RESET data is: ', accountReset)
		}
		Database.updateTable(rootState, rootState.database.dbTable.system, accountReset, function(response) {
			console.log(accountReset,'重置数据')
			commit('COMMIT_SYNC_ACCOUNT', accountReset)
		})
		if (rootState.env.currentDebug) {
			console.log('[CORE][ACCOUNT] RESET finish')
		}
	},
	SAVE_ACCOUNT({
		commit,
		rootState
	}, {
		account,
		cb
	}) {
		account.storeLogin = true
		Database.updateTable(rootState, rootState.database.dbTable.system, account, function(data) {
			commit('COMMIT_SYNC_ACCOUNT', account)
			console.log("登陆成功存数据", account)
			if (cb !== undefined) cb()
		})
	}
}

// mutations
const mutations = {
	COMMET_SET_SELECTED_CONSIGNEE: (state, selectConsignee) => {
		state.selectConsignee = selectConsignee
	},
	COMMIT_SYNC_ACCOUNT: (state, account) => {
		state.all = account
	},
	COMMIT_FAIL_LOGIN: (state) => {
		state.all.storeLogin = false
	},
	FAIL_LOAD_DATA: (state, data) => {
		state.all.member_bonus.point = '--'
	},
	COMMIT_SUCCESS_LOGIN: (state) => {
		state.all.storeLogin = true
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
