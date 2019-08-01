export default {
  /* eslint-disable */
  createTable (db, tableName, debug) {
    let dataObj = {'_id': tableName}
    console.log('[CORE][Database][API] createTable', db)
    console.log('[CORE][Database][API] createTable', dataObj)
    wx.setStorage({
      key:tableName,
      data: {}
    })

    // db.get(dataObj['_id']).then(function (doc) {
    //   if (debug) {
    //     console.info('[CORE][Database][API] createTable done', tableName)
    //   }
    // }).then(function (response) {
    //   // handle response
    // }).catch(function (err) {
    //   dataObj.title = 'test'
    //   console.log('[CORE][Database][API] createTable 11111: ',db, dataObj)

      // db.put(dataObj).then(function (response) {
      //   if (debug) {
      //     console.info('[CORE][Database][API] createTable: ', tableName)
      //   }
      //   // handle response
      // }).catch(function (createErr) {
      //   console.log('[CORE][Database][API] createTable 2222: ',createErr)
      //
      //   if (debug) {
      //     console.error('[CORE][Database][API] createTable error:', tableName)
      //   }
      // })
    // })
  },
  getTable (rootState, tableName, successCallback, failCallback) {
    let self = this
    let debug = rootState.env.currentDebug
    if (debug) {
      console.info('[CORE][Database][API] getTable start', tableName )
    }
    let data = {}
    wx.getStorage({
      key: tableName,
      success: function(res) {
        data = res.data
        if (debug) {
          console.info('[CORE][Database][API] getTable from ' + tableName + ' local db: ', res )
        }
        if (data === undefined) {
          data = []
          if (debug) {
            console.info('[CORE][Database][API] getTable No ' + tableName)
            console.log('[CORE][Database][API]  No ' + tableName)
          }
          if (successCallback !== undefined) {
            successCallback(data)
          }
        } else {
          if (successCallback !== undefined) {
            successCallback(data)
          }
        }
      },
      fail: function (err) {
          if (debug) console.error('[CORE][Database][API] getTable: ' + tableName + ' it has error! ',  err)
          self.createTable(db, tableName, debug)
          if (failCallback !== undefined) failCallback(err)
      }
    })
    if (debug) {
      console.log('getTable '+ tableName +' - End ')
    }
  },
  updateTable (rootState, tableName, data, successCallback, failCallback) {
    let self = this
    let debug = rootState.env.currentDebug
		console.log('走这里了吗')
    if (successCallback !== undefined) {
      successCallback()
    }
		console.log('走这里了吗444')
  },
  removeTable (db, debug, tableName) {
    db.get(tableName).then(function (doc) {
      if (debug) {
        console.info('[CORE][Database][API] removeTable done', tableName )
      }
      return db.remove(doc)
    }).then(function (result) {
      // handle result
    }).catch(function (err) {
      if (debug) {
        console.error('[CORE][Database][API] removeTable Error '+ tableName, err )
      }
    })
  },
  tableCheck (rootState, tableName, callback) {
    let db = rootState.database.dbInstance
    let debug = rootState.env.currentDebug

    if (debug) {
      console.info('[CORE][Database][API] tableCheck start', tableName)
    }
    db.get(tableName).then(function (doc) {
      if (doc === undefined) {
        if (callback !== undefined) {
          callback()
        }
        if (debug) {
          console.info('[CORE][Database][API] tableCheck '+ tableName + ' not existing' )
        }
      } else {
        if (debug) {
          console.info('[CORE][Database][API] tableCheck '+ tableName + ':', doc)
        }
      }
    }).then(function (response) {
    }).catch(function (err) {
      if (debug) {
        console.error('[CORE][Database][API] tableCheck error :', err)
      }
      if (callback !== undefined) {
        callback()
      }
    })
    if (debug) {
      console.info('[CORE][Database][API] tableCheck finish', tableName)
    }
  },
  resetAllTable (db, allTables, debug, callback) {
    let promiseFlag = false;
    let self = this
    if(typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1){
      promiseFlag = true
    }
    if (promiseFlag){
      db.allDocs().then(function (result) {
        // Promise isn't supported by all browsers; you may want to use bluebird
        if (callback !== undefined) callback()
        return Promise.all(result.rows.map(function (row) {
          return db.remove(row.id, row.value.rev)
        }))
      }).then(function () {
        // done!
      }).catch(function (err) {
        // error!
        if (debug) console.log(err)
      })
    } else {
      $.each(allTables, function( index, table) {
        self.removeTable(db, debug, table)
      });
      db.viewCleanup().then(function (result) {
        // handle result
        if (debug) console.log(result)
        if (callback !== undefined) callback()
      }).catch(function (err) {
        if (debug) console.log(err)
      });
    }
  },
  initAllTable (rootState, callback) {
    let self = this



    console.log('xxxxxx', rootState.database.dbTable)

    if (!Object.prototype.forEach) {
      Object.defineProperty(Object.prototype, 'forEach', {
        value: function (callback, thisArg) {
          if (this == null) {
            throw new TypeError('Not an object');
          }
          thisArg = thisArg || window;
          for (var key in this) {
            if (this.hasOwnProperty(key)) {
              callback.call(thisArg, this[key], key, this);
            }
          }
        }
      });
    }


    rootState.database.dbTable.forEach(function (index, table) {
      console.log('xxxxxx', table); // the key (ex. sandwich)
      self.getTable(rootState, table)
    });

    // $.each(rootState.database.dbTable, function (index, table) {
    //   console.log('xxxxxx 1', table)
    //
    //   //   self.getTable(rootState, table)
    // //   // self.createTable(rootState.database.dbInstance, table, rootState.env.currentDebug)
    // })
    if (callback !== undefined) {
      callback()
    }
  },
  responseUpdate (table, data, debug, successCb, failCb) {
    if (data && !$.isEmptyObject(data)) {
      successCb()
      if (debug) { console.log('[CORE][' + table.toUpperCase() + '][API] load '+ table +' info', data) }
    } else {
      failCb()
      if (debug) { console.log('[CORE][' + table.toUpperCase() + '][API] fail in table: ' + table, data) }
    }
  }, function () {
    failCb()
    if (debug) { console.log('[CORE][' + table.toUpperCase() + '][API] fail in no data, table: ' + table) }
  }
}
