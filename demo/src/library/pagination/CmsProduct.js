import Pagination from '../system/Pagination'

export default {
  pushData: 'product/GET_CMS_PRODUCT_DATA_FROM_CLOUD',
  getData: 'product/allProducts',
  type: 'home',
  size: wx.getSystemInfoSync().windowWidth,
  limit: 10,
  request: `?size=150&limit=10&only_one_photo=true&currency=CNY&has_photo=true&is_base64=false`,

  init ({store, id}) {
    console.log(9999999999999,id)
    Pagination.init(store, {
      type: this.type,
      request: id ? this.request + `&type=content_page&id=${id}` : this.request + '&type=homepage&device=mobile',
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
		console.log('加载数据开始111')
    Pagination.more(this.type, cb)
  },
  refresh (cb) {
    Pagination.refresh(this.type, cb)
  }
}
