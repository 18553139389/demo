import Pagination from '../system/Pagination'

export default {
	pushData: 'page/SEARCH_BY_KEYWORD_FROM_CLOUD',
	getData: 'page/getSearchResult',
	type: 'search',
	size: (wx.getSystemInfoSync().windowWidth !== undefined) ? wx.getSystemInfoSync().windowWidth : 300,
	limit: 10,
	request: `?limit=10&only_one_photo=true&currency=CNY&has_photo=true&is_base64=false`,
	store: {},
	init({
		store,
		type
	}) {
		this.store = store
		this.type = (type === '' || type === undefined) ? this.type : type
		Pagination.init(store, {
			type: this.type,
			request: this.request + '&size=' + this.size,
			pushData: this.pushData,
			getData: this.getData
		})
	},
	loadInitData(store, {
		keyword,
		page,
		timeout,
		needConcat,
		forceLoad,
		cb
	}) {
		console.log('loadInitData')
		let self = this
		this.store.dispatch(this.pushData, {
			keyword: keyword,
			request: this.request + '&size=' + this.size + '&page=' + page,
			needConcat,
			forceLoad,
			cb: function(response) {
				console.log(response, '后续会发生什么呢')
				if (cb !== undefined) cb(response.data)
				if (response.data.length > 0) {
					self.store.commit('page/INIT_PAGE_NUMBER_BY_TYPE', {
						type: self.type
					})
					Pagination.increasePage(self.type)
				}
			}
		})
	},
	getPage() {
		let pagination = this.store.getters['page/getPaginationCount']
		return pagination[this.type].page
	},
	more(store, keyword, cb, page) {
		if (keyword === undefined || keyword === null || keyword === '') return false
		let self = this
		let request = this.request + '&size=' + this.size
		request += `&page=${this.getPage()}`
		this.store.dispatch(this.pushData, {
			keyword: keyword,
			page,
			request,
			needConcat: true,
			forceLoad: false,
			cb: function(res) {
				store.commit('page/SET_NEW_SEARCH', false)
				// if (cb !== undefined) cb(res.data)
				if (res.data.data.length > 0) {
					Pagination.increasePage(store, self.type)
				}
			}
		})
		return true
	},
	refresh(cb) {
		Pagination.refresh(this.type, cb)
	}
}
