import client from '@lib/Rest'
import _ from 'underscore'
import sync from '@lib/module/Sync'

const state = {
	homepage: [],
	contentPage: null,
	window: {
		width: 0,
		height: 0
	},
	searchResult: {
		data: [],
		loading: false,
		newSearch: false,
		inputKeywords: null,
		total: 0,
		success: false
	},
	paginationCount: [],
	redirect: {
		page: null,
		data: {
			product: null
		}
	},
	slowdown: false
}

// getters
const getters = {
	getPaginationCount: state => state.paginationCount,
	isPageClean: state => !state.redirect.page,
	getPage: state => state.redirect.page,
	getProduct: state => state.redirect.data.product,
	getSearchResult: state => state.searchResult.data,
	getSearchLoading: state => state.searchResult.loading,
	getSearchResultTotal: state => state.searchResult.total,
	isNewSearch: state => state.searchResult.newSearch,
	getKeyword: state => state.searchResult.inputKeywords,
	isSearchSuccess: state => state.searchResult.success,
	getHomepageData: state => state.homepage,
	getContentPageData: state => state.contentPage,
	getWindowsSize: state => state.window,
	ifSlowdown: state => state.slowdown
}

// // actions
const actions = {
	GET_HOME_DATA_FROM_CLOUD({
		commit,
		rootState
	}, {
		request,
		cb
	}) {
		let requestUrl = rootState.configs.api['home_api_endpoint'] + (request !== '' ? request : '')
		let env = rootState.env.currentEnv
		let storeToken = rootState.env.envList[env].token
		sync.getDataFromCloudWithToken(rootState, requestUrl, storeToken, rootState.database.dbTable.homepage,
			(response) => {
				if (cb !== undefined) cb(response)
				if (rootState.env.currentDebug) {
					console.log('[CORE][PRODUCT][GET_DATA_FROM_CLOUD] data is ', response.data)
				}
				commit('SET_HOMEPAGE_TO_LOC', response.data)
			})
	},
	//这是首页数据接口调用
	GET_CONTENT_PAGE_DATA_FROM_CLOUD({
		commit,
		rootState
	}, {
		request,
		cb
	}) {
		console.log('开始初始化页面数据')
		let requestUrl = rootState.configs.api['content_page_api_endpoint'] + (request !== '' ? request : '')
		let env = rootState.env.currentEnv
		let storeToken = rootState.env.envList[env].token
		console.log(requestUrl)
		console.log(env)
		console.log(storeToken)
		sync.getDataFromCloudWithToken(rootState, requestUrl, storeToken, rootState.database.dbTable.contentPage,
			(res) => {
				console.log(rootState.database.dbTable.contentPage)
				if (cb !== undefined) cb(res)
				if (rootState.env.currentDebug) {
					console.log('[CORE][PRODUCT][GET_DATA_FROM_CLOUD] data is ', res.data)
				}
				console.log('SET_CONTENT_PAGE_TO_LOC', res.data)
				commit('SET_CONTENT_PAGE_TO_LOC', res.data)
				console.log('到底数据出来了吗', res.data)
			})
	},
	SEARCH_BY_KEYWORD_FROM_CLOUD({commit,rootState}, {keyword,request,needConcat,cb,errorCb}) {
		commit('RESET_SEARCH_TO_LOC')
		let env = rootState.env.currentEnv
		let token = rootState.env.envList[env].token
		let requestUrl = rootState.configs.api['product_api_endpoint'] + '/search' + request
		let endpoint = rootState.server.endpoint
		let apiUrl = endpoint + requestUrl
		commit('SET_SEARCH_LOADING', true)
		console.log(token,keyword,'数据为什么是空')
		wx.request({
			url: apiUrl,
			method: 'POST',
			data: JSON.stringify({
				keyword
			}),
			header: {
				'Authorization': token,
				'content-type': 'application/json' // 默认值
			},
			success(res) {
				console.log(res, '这是搜索列表的数据')
				console.log(needConcat)
				commit('SET_SEARCH_LOADING', false)
				if (res.data.code === 200) {
// 					res.data = _.map(res.data, function(result) {
// 						result.productAttributeFormat = _.groupBy(result.product_attribute_types, 'required')
// 						return result
// 					})
					if (needConcat === undefined || needConcat) {
						commit('SYNC_SEARCH_DATA_TO_LOC', res)
					} else {
						commit('SET_SEARCH_DATA_TO_LOC', res)
					}
					commit('SYNC_KEYWORD_TO_LOC', keyword)
				} else {
					commit('RESET_SEARCH_TO_LOC')
					commit('SET_SEARCH_FAIL')
				}
				
				console.log('数据第一步')
				if (cb !== undefined) {
					console.log('123')
					cb(res)
				}
				console.log('数据第二步')
			},
			fail() {
				commit('SET_SEARCH_LOADING', false)
				if (errorCb !== undefined) {
					errorCb(error)
					commit('SET_SEARCH_FAIL')
				}
			}
		})
	}
}

// mutations
const mutations = {
	INIT_PAGE_NUMBER_BY_TYPE(state, {
		type
	}) {
		state.paginationCount[type] = {
			page: 1
		}
		console.log('INIT_PAGE_NUMBER_BY_TYPE 开始')
	},
	ADD_PAGE_NUMBER_BY_TYPE(state, {
		type
	}) {
		state.paginationCount[type].page++
		console.log('页面增加了+1')
	},
	SET_WINDOWS_SIZE(state, {
		width,
		height
	}) {
		state.window.width = width
		state.window.height = height
	},
	SET_SEARCH_LOADING(state, status) {
		state.searchResult.loading = status
	},
	RESET_SEARCH_TO_LOC(state) {
		// state.searchResult.inputKeywords = null
		state.searchResult.success = false
	},
	SET_SEARCH_FAIL(state) {
		state.searchResult.success = 'FAIL'
	},
	SYNC_KEYWORD_TO_LOC(state, keyword) {
		state.searchResult.inputKeywords = keyword
	},
	SYNC_SEARCH_DATA_TO_LOC(state, response) {
		console.log('原来是走到这里了啊',response)
		_.map(response.data.data, function(object) {
			console.log(object)
			const findKey = _.findKey(state.searchResult.data, item => item.id === object.id)
			console.log(findKey)
			console.log(state.searchResult)
			if (findKey === undefined) {
				state.searchResult.data.data.push(object)
			} else {
				state.searchResult.data.data[findKey] = object
			}
		})
		console.log(state.searchResult.data);
		state.searchResult.total = response.data.totalItemCount
		state.searchResult.success = true
	},
	RESET_SEARCH_DATA(state) {
		state.searchResult.data = []
		state.searchResult.total = 0
		state.searchResult.success = false
	},
	SET_NEW_SEARCH(state, value) {
		state.searchResult.newSearch = value
		console.log(state,'这里没有执行吗')
	},
	SET_SEARCH_DATA_TO_LOC(state, result) {
		console.log(result,'看看是这里不？')
		state.searchResult.data = result.data
		state.searchResult.total = result.data.totalItemCount
		state.searchResult.success = true
	},
	COMMIT_REDIRECT(state, {
		page,
		product
	}) {
		state.redirect.page = page
		state.redirect.data.product = product
	},
	CLEAR_REDIRECT(state) {
		state.redirect.page = null
		state.redirect.data.product = null
	},
	SET_HOMEPAGE_TO_LOC(state, homepage) {
		state.homepage = homepage
	},
	SET_CONTENT_PAGE_TO_LOC(state, contentPage) {
		state.contentPage = contentPage
		console.log(state.contentPage, '这是赋值给首页的数据')
	},
	SET_SLOWDOWN(state, bool) {
		state.slowdown = bool
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
