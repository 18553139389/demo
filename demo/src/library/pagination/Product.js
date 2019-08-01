import Pagination from '../system/Pagination'

export default {
  pushData: 'product/GET_DATA_FROM_CLOUD',
  getData: 'product/allProducts',
  type: 'all_product',
  size: wx.getSystemInfoSync().windowWidth,
  limit: 10,
  request: `?size=150&limit=10&only_one_photo=true&currency=CNY&has_photo=true&is_base64=false`,

  init ({store, type, category}) {
    this.type = (type === '' || type === undefined) ? this.type : type
    let request = (category === '' || category === undefined) ? this.request : this.request + '&category=' + category
    Pagination.init(store, {
      type: this.type,
      request,
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
      cb: function () {
        cb()
      }
    })
  },
  more (cb) {
    Pagination.more(this.type, cb)
  },
  refresh (cb) {
    Pagination.refresh(this.type, cb)
  }
}
