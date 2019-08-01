/**
 * 查询分页模版，复制后，只需要更改下面参数，同时需要复制新的 src/store/modules/Category.js
 * pushData: 'category/GET_DATA_FROM_CLOUD'
 * getData: 'category/allCategory'
 * type: 'category'
 * size: 10
 * limit: 10
 * request: '?size=100'
 */
import Pagination from '../system/Pagination'

export default {
  pushData: 'category/GET_DATA_FROM_CLOUD',
  getData: 'category/allCategory',
  type: 'category',
  size: 100,
  limit: 10,
  request: '?size=300',

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
