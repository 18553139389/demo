import database from '@lib/module/Database'
import client from '@lib/Rest'
import server from '@lib/module/Server'

export default {
  syncAll(store, callback) {
    let isLogin = store.getters['account/isLogin']
    if (isLogin) {
      if (callback !== undefined) {
        callback()
      }
    }
  },
  getDataFromCloud(rootState, requestUrl, tableName, callback, overWriteResponse, errorCb) {
    let debug = rootState.env.currentDebug
    server.fetchRemote(function () {
      let endpoint = rootState.server.endpoint
      let apiUrl = endpoint + requestUrl
			let account = rootState.account.all.data //加了data
			console.log('qingqiukaishilema')
      wx.request({
        url: apiUrl,
        method: 'GET',
        header: {
          'Authorization': account.token,
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          let data = res.data
          let localDb = {}
          localDb.list = data
          if (overWriteResponse !== undefined) {
            res = overWriteResponse(res)
            if (debug) {
              console.log('[CORE][getDataFromCloud][overWriteResponse] ' + tableName + ' new response: ', res)
            }
          }
          console.log("进入get请求",res)
					if (callback !== undefined) {
						callback(res)
					}
//           database.updateTable(rootState, tableName, localDb, function (res) {
//             if (callback !== undefined) {
//               callback(res)
//             }
//           }, function () {
//             if (debug) {
//               console.log('[CORE][getDataFromCloud] ' + tableName + 'update from cloud fail !!!!')
//             }
//           })
        }
      })
      // client.get(apiUrl, account.token, function (response) {
      //   let data = response.data
      //   if (debug) {
      //     console.log('[CORE][getDataFromCloud] success - get ' + tableName + 'list')
      //   }
      //   let localDb = {}
      //   localDb.list = data
      //   if (debug) {
      //     console.log('[CORE][getDataFromCloud] ' + tableName + ' list is: ', data)
      //   }
      //   if (overWriteResponse !== undefined) {
      //     response = overWriteResponse(response)
      //     if (debug) {
      //       console.log('[CORE][getDataFromCloud][overWriteResponse] ' + tableName + ' new response: ', response)
      //     }
      //   }
      //   database.updateTable(rootState, tableName, localDb, function () {
      //     if (callback !== undefined) {
      //       callback(response)
      //     }
      //   }, function () {
      //     if (debug) {
      //       console.log('[CORE][getDataFromCloud] ' + tableName + 'update from cloud fail !!!!')
      //     }
      //   })
      // }, errorCb)
    })
  },
  //走的是这里的方法
  getDataFromCloudWithToken(rootState, requestUrl, token, tableName, callback, overWriteResponse) {
    let debug = rootState.env.currentDebug
    server.fetchRemote(function () {
      console.log('server开始了奥')
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
          console.log('sync接口成功了', res)
          let data = res.data
          if (debug) {
            console.log('[CORE][getDataFromCloud] success - get ' + tableName + 'list')
          }
          let localDb = {}
          localDb.list = data
          if (callback !== undefined) {
            callback(res)
          }
          if (overWriteResponse !== undefined) {
            res = overWriteResponse(res)
            if (debug) {
              console.log('[CORE][getDataFromCloud][overWriteResponse] ' + tableName + ' new response: ', res)
            }
          }
        }
      })
      //       client.get(apiUrl, token,
      //           (response) => {
      //             let data = response.data
      //             if (debug) { console.log('[CORE][getDataFromCloud] success - get ' + tableName + 'list') }
      //             let localDb = {}
      //             localDb.list = data
      //             if (debug) {
      //               console.log('[CORE][getDataFromCloud] ' + tableName + ' list is: ', data)
      //             }
      //             if (overWriteResponse !== undefined) {
      //               response = overWriteResponse(response)
      //               if (debug) {
      //                 console.log('[CORE][getDataFromCloud][overWriteResponse] ' + tableName + ' new response: ', response)
      //               }
      //             }
      //             database.updateTable(rootState, tableName, localDb, function () {
      //               if (callback !== undefined) {
      //                 callback(response)
      //               }
      //             }, function () {
      //               if (debug) {
      //                 console.log('[CORE][getDataFromCloud] ' + tableName + 'update from cloud fail !!!!')
      //               }
      //             })
      //           }
      //       )
    })
  },
  postDataToCloud(rootState, requestUrl, data, successCb, failCb) {
    let debug = rootState.env.currentDebug
    let endpoint = rootState.server.all.endpoint
    let apiUrl = endpoint + requestUrl
    let account = rootState.account.all
    client.post(apiUrl, account.branch_token, data, function (response) {
      if (debug) {
        console.log('[CORE][postDataToCloud] success - post ', data)
      }
      if (response.code === 200) {
        if (successCb !== undefined) successCb(response)
      } else {
        if (failCb !== undefined) failCb()
      }
      if (debug) {
        console.log('[CORE][postDataToCloud] success - post response:', response)
      }
    }, function () {
      if (debug) {
        console.log('[CORE][postDataToCloud] fail - post ', requestUrl)
      }
      if (failCb !== undefined) failCb()
    })
  }
}
