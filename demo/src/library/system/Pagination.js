export default {
  setting: [],
  store: {},
  refreshPage (store, {type, cb}) {
    this.store = store
    store.commit('page/INIT_PAGE_NUMBER_BY_TYPE', {
      type
    })
    let page = 1
    cb(page)
  },
  loadMorePage (store, {type, cb}) {
		console.log('走完这里了吗')
    this.store = store
    let paginationCount = store.getters['page/getPaginationCount']
    if (paginationCount[type] === undefined) {
      store.commit('page/INIT_PAGE_NUMBER_BY_TYPE', {
        type
      })
    }
    let page = paginationCount[type].page
    cb(page)
		console.log(page,'走完这里了吗22222')
  },
  increasePage (store,type) {
    store.commit('page/ADD_PAGE_NUMBER_BY_TYPE', {
      type
    })
  },
  // 创建实例
  init (store, {type, request, pushData, getData}) {
		console.log('Pagination init 开始')
    this.store = store
    this.setting[type] = {
      request, pushData, getData
    }
		console.log('Pagination init 结333333333333束')
  },
  loadInitData ({type, timeout, needConcat, forceLoad, cb}) {
    let setting = this.setting[type]
    let allData = this.store.getters[setting.getData]
		console.log('loadInitData 开1111111111111111始')
    if (needConcat !== undefined) {
      needConcat = true
    }
    if (forceLoad === undefined) {
      forceLoad = false
    }
    console.log('loadInitData', allData, '0000000000999')
    if (allData.length === 0 && !forceLoad) {
      this.store.commit('page/INIT_PAGE_NUMBER_BY_TYPE', {
        type
      })
      if (timeout === undefined || timeout === 0) {
        this.requestLoadDataFromCloud(this.store, {
          type,
          page: 1,
          needConcat: false,
          cb
        })
      } else {
        setTimeout(function () {
          this.requestLoadDataFromCloud(this.store, {
            type,
            page: 1,
            needConcat: false,
            cb
          })
        }.bind(this), timeout)
      }
			console.log('走了 if')
    } else {
      this.store.commit('page/INIT_PAGE_NUMBER_BY_TYPE', {
        type
      })
      setTimeout(function () {
				console.log('走到这里了requestLoadDataFromCloud')
        this.requestLoadDataFromCloud(this.store, {
          type,
          page: 1,
          needConcat: false,
          cb
        })
      }.bind(this), timeout)
			console.log('category初始化数据')
			console.log('走了 else')
    }
  },
  requestLoadDataFromCloud (store, {type, page, needConcat, cb}) {
		console.log('requestLoadDataFromCloud')
    this.loadDataByPage(store, {
      type,
      page,
      needConcat,
      cb
    })
    store.commit('page/ADD_PAGE_NUMBER_BY_TYPE', {
      type
    })
  },
  loadDataByPage (store, {type, page, needConcat, cb}) {
		console.log('loadDataByPage',type)
    let setting = this.setting[type]
		console.log(setting,'setting')
    let request = setting.request
    if (page !== undefined) {
      request += `&page=${page}`
    }
    if (needConcat === undefined) {
      needConcat = true
    }
		console.log(setting.pushData,'这是需要的参数')
    if (cb !== undefined) {
      store.dispatch(setting.pushData, {
        request,
        cb,
        needConcat
      })
    } else {
      store.dispatch(setting.pushData, {
        request,
        cb,
        needConcat
      })
    }
  },
  more (type, cb) {
		console.log('下拉加载有数据了吗',type)
    let store = this.store
    let self = this
    this.loadMorePage(store, {
      type,
      cb: function (page) {
        self.loadDataByPage(store, {
          type,
          page,
          needConcat: true,
          cb:
            (res) => {
							console.log(res,'这里有数据那就搞定了')
              // cb(res.data)
              if (res.data.data.length > 0) {
								console.log('最关键的一步')
                self.increasePage(store,type)
              }
            }
        })
      }
    })
  },
  refresh (type, cb) {
    let store = this.store
    let self = this
    this.refreshPage(store, {
      type,
      cb: function (page) {
        self.loadDataByPage(store, {
          type,
          page,
          needConcat: true,
          cb:
            (response) => {
              cb(response.data)
              self.increasePage(type)
            }
        })
      }
    })
  }
}
