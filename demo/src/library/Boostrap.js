import utli from '@lib/Utli'

export default {
  init (store, {preProcess, successCb}) {
    let debug = store.getters['env/getDebug']
		console.log('输出debug')
		console.log(debug)
    // window.addEventListener('resize', this.handleResize)
		//微信小程序窗口变化API
		// wx.onWindowResize(this.handleResize)
    // this.handleResize()
    if (debug) { console.log('[CORE][Bootstrap] INIT start') }
    store.dispatch('database/INIT').then(() => {
      store.dispatch('server/SET_ENDPOINT').then(() => {
        store.dispatch('server/GET_DATA_FROM_LOCAL')
        store.dispatch('queue/CHECK_QUEUE_IN_DATABASE').then(() => {
          preProcess()
          store.dispatch('queue/UNLOCK_ALL_QUEUE')
          store.dispatch('server/VALIDATION_CHECK').then(() => {
            successCb()
            store.commit('server/COMMIT_SET_SERVER_READY', true)
          })
        })
      })
    })
    if (debug) {
      console.log('[CORE][Bootstrap] INIT end')
    }
  },
//   handleResize () {
//     this.$store.commit('page/SET_WINDOWS_SIZE', {
//       width: wx.getSystemInfoSync().windowWidth,
//       height: wx.getSystemInfoSync().windowHeight
//     })
//   },
  runMobileApp (ons, store) {
    // ons.disableAutoStatusBarFill()
    window.handleOpenURL = function (url) {
      if (url.indexOf('ibiz://' > -1)) {
        let result = utli.getURLParameters(url)
        store.dispatch('system/SET_APP_VAR', result)
      }
    }
  }
}
