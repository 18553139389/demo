import Pagination from '../system/Pagination'

export default {
  pushData: 'consignee/GET_DATA_FROM_CLOUD',
  getData: 'consignee/getData',
  type: 'consignee',
  size: 100,
  limit: 10,
  request: `?limit=10`,

  init ({store}) {
    Pagination.init(store, {
      type: this.type,
      request: this.request,
      pushData: this.pushData,
      getData: this.getData
    })
  },
  loadInitData ({timeout, needConcat, forceLoad, cb}) {
    Pagination.loadInitData({
      type: this.type,
      timeout,
      needConcat,
      forceLoad,
      cb
    })
  },
  more (cb) {
    Pagination.more(this.type, cb)
  },
  refresh (cb) {
    Pagination.refresh(this.type, cb)
  }
}
