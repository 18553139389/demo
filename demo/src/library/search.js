import _ from 'underscore'
import SearchPagination from '@lib/pagination/Search'

export default {
  store: {},
  initSearch (store) {
    this.store = store
    SearchPagination.init({
      store
    })
  },
  findResultByKeyword (store, router, keyword, cb, page) {
    if (_.isEmpty(this.store)) {
      this.initSearch(store)
    }
		console.log('执行到这里search')
    if (keyword !== '') {
      store.commit('page/SET_NEW_SEARCH', true)
      store.commit('page/INIT_PAGE_NUMBER_BY_TYPE', {
        type: 'search'
      })
			console.log('执行到这里search第一步')
      SearchPagination.loadInitData(store,{
        keyword: keyword,
        page,
        needConcat: false,
        forceLoad: true
      })
			console.log('执行到这里search第二步')
      store.commit('page/SYNC_KEYWORD_TO_LOC', keyword)
      // router.push('../search/main')
    }
    if (cb !== undefined) cb()
  }
}
