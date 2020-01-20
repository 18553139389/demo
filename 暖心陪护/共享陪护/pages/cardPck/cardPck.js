const baseInfo = require("../../utils/util.js").baseInfo;
var uid = "";
var info;
var ka_tz;
Page({

  /**totalPage
   * 页面的初始数据
   */
  data: {
    yajin: "", //设备押金（主要用于去支付页面）
    isYunwei: "", //是否运维：0-否，1-是   默认0   当运维进来会传入值 1
    pop: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1167339667,4079975854&fm=26&gp=0.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    uid = wx.getStorageSync("userinfo").uid;

    if (JSON.stringify(options) == '{}') { //为空：客户端进入
      _this.setData({
        isYunwei: '0'
      });
      console.log("当前用户：客户端");
    } else { //不为空：运维进入
      _this.setData({
        isYunwei: '1'
      });
      console.log("当前用户：运维");
    }

    _this.getData();
  },



  //获取页面数据
  getData: function(nowPage) {
    let _this = this;

    wx.request({
      url: baseInfo + "cardList",
      data: {
        "uid": uid, //用户ID
        "isYunwei": _this.data.isYunwei //是否运维：0-否，1-是
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log("--卡包数据:--", res);

        if (res.data.errorCode == "0") {
          var datas = res.data.body;

          _this.setData({
            balance: datas.balance,
            list: datas.cardList
          });

        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg
          })
        }
      }
    })
  },
  //扫码开锁-跳转-支付页面  时段卡
  openkaipay: function (e) {
    var _this=this;
    console.log(e)
   // var isHashospital = this.data.isHashospital;
    let userinfo = wx.getStorageSync("userinfo");
    var cardId = e.currentTarget.dataset.cardid;  //卡id
    var yajin = e.currentTarget.dataset.yajin; //设备押金
    _this.setData({
      cardId: cardId,
      yajin: yajin
    })
  
    wx.scanCode({
      success(res) {
        //截取二维码url中的设备编号
        let info = res.result.split("=")[1];
        console.log(info);
        _this.setData({
          deviceNum: info
        })
        console.log(_this.data.deviceNum)
        wx.request({
          url: baseInfo + "scanCode",
          method: "get",
          data: {
            "uid": userinfo.uid, //用户ID
            "deviceNum": info, //设备编号   
            "type":"0"//开锁是0        
          },
          dataType: "json",
          header: {
            'Content-Type': 'application/json',
          },
          success: function (datas) {
            console.log("扫码时判断设备：" + JSON.stringify(datas));
            if (datas.data.errorCode == "0") {
              if (datas.data.body.isOpen == "1") {
                wx.showToast({
                  icon: 'none',
                  title: '该设备正在使用中'
                })
              } else {
                //isCard代表是否从卡包页面跳转
                console.log("这个是余额" + _this.data.balance + "押金" + yajin)
                console.log(info)
                ka_tz=0;
                if (_this.data.isYunwei==0){
                  _this.opencompay();
                } else if (_this.data.isYunwei==1){
                   //直接跳转到开锁页面 运维
                  _this.yw_use()
                }
               
              }
            } else {
              wx.showToast({
                icon: 'none',
                title: datas.data.msg
              })
            }
          }
        })

      }
    })

  },


  //扫码开锁-小时还是天卡
  openkaipayor: function (e) {
    var _this = this;
    console.log(e)
    // var isHashospital = this.data.isHashospital;
    let userinfo = wx.getStorageSync("userinfo");
    var deviceNum = e.currentTarget.dataset.num; //设备编号
    var cardId = e.currentTarget.dataset.cardid;  //卡id
    var yajin = e.currentTarget.dataset.yajin; //设备押金
    _this.setData({
      cardId: cardId,
      deviceNum: deviceNum
    })
    console.log("这最初始押金" + cardId)
    wx.openBluetoothAdapter({
      success(res) {
        wx.scanCode({
          success(res) {
            //截取二维码url中的设备编号
             info = res.result.split("=")[1];
            console.log(info);
            wx.request({
              url: baseInfo + "scanCode",
              method: "get",
              data: {
                "uid": userinfo.uid, //用户ID
                "deviceNum": info, //设备编号   
                "type": "0"//开锁是0        
              },
              dataType: "json",
              header: {
                'Content-Type': 'application/json',
              },
              success: function (datas) {
                console.log("扫码时判断设备：" + JSON.stringify(datas));
                if (datas.data.errorCode == "0") {
                  if (deviceNum != null) {
                    if (deviceNum != info) {
                      wx.showToast({
                        icon: 'none',
                        title: '请使用卡对应的设备~'
                      })
                      return;
                    }
                  }
                  if (datas.data.body.isOpen == "1") {
                    wx.showToast({
                      icon: 'none',
                      title: '该设备正在使用中'
                    })
                  } else {
                    console.log("这个是else")
                    ka_tz=1;
                    console.log(_this.data.isYunwei);
                    if (_this.data.isYunwei == 0) {
                      _this.opencompay();
                    } else if (_this.data.isYunwei == 1) {
                      //直接跳转到开锁页面 运维
                      _this.yw_use()
                    }
                    //isCard代表是否从卡包页面跳转
                   
                  }
                } else {
                  wx.showToast({
                    icon: 'none',
                    title: datas.data.msg
                  })
                }
              }
            })

          }
        })
      },fail(res){

    }
    })

  },

//运维的卡包去使用接口
   yw_use:function(){
     var that=this;
     wx.request({
       url: baseInfo + "yunweiGoUse",
       data: {
         "uid": uid, //用户ID
         "cid": that.data.cardId, //订单ID
         "deviceNum": that.data.deviceNum, //设备编号
         "yajin": "0"
       },
       dataType: "json",
       header: {
         'content-type': 'application/json'
       },
       success: function (res) {
         console.log(res)
         console.log("--运维去使用：--", res, that.data.cardId);
         var datas=res.data.body;
         if (res.data.errorCode == "0") {
           //判断有没有满足条件
           wx.navigateTo({
             url: "../theLock/theLock?macAddr=" + datas.macAddr + '&isYunwei=' + that.data.isYunwei
           });

         } else {
           wx.showToast({
             icon: 'none',
             title: res.data.msg
           })
         }
       }
     })
   },



  //支付
  opencompay: function () {
    var that = this;
    if (ka_tz == 0) { //这个是时段卡 需要付钱
      wx.request({
        url: baseInfo + "goUse",
        data: {
          "uid": uid, //用户ID
          "cid": that.data.cardId, //订单ID
          "deviceNum": that.data.deviceNum, //设备编号
          "yajin": that.data.yajin
        },
        dataType: "json",
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          console.log("--支付成功：--", res, that.data.cardId);
          if (res.data.errorCode == "0") {
            //判断有没有满足条件
            wx.navigateTo({
              url: "../gouse/gouse?cardId=" + res.data.body.orderId + "&deviceNum=" + that.data.deviceNum + "&yajin=" + that.data.yajin + "&balance=" + that.data.balance + '&isYunwei=' + that.data.isYunwei
            });


          } else {
            wx.showToast({
              icon: 'none',
              title: res.data.msg
            })
          }
        }
      })
    } else {//小时卡天卡
        console.log(ka_tz);
      wx.request({
        url: baseInfo + "goUse",
        data: {
          "uid": uid, //用户ID
          "cid": that.data.cardId, //订单ID
          "deviceNum": that.data.deviceNum //设备编号
        },
        dataType: "json",
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          console.log("--支付成功：--", res);
          console.log(res.data.body.macAddr)
          if (res.data.errorCode == "0") {
            //判断有没有满足条件
            wx.navigateTo({
              url: "../theLock/theLock?macAddr=" + res.data.body.macAddr + '&isYunwei=' + that.data.isYunwei
            });
         


          } else {
            wx.showToast({
              icon: 'none',
              title: res.data.msg
            })
          }
        }
      })
      }

    

  },


//小时卡退押金
  tui:function(e){
    var that=this;
    var ordernum=e.currentTarget.dataset.ordernum;
    console.log(ordernum)
    wx.request({
      url: baseInfo + "refundYajin",
      data: {
        orderNum: ordernum
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log( res);
        if (res.data.errorCode == "0") {
          wx.showToast({
            icon: 'none',
            title: res.data.msg
          })
          _this.getData();
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg
          })
        }
      }
    })
  },


  //获取fromid
  gorRunnerLobby: function (e) {
    console.log(e);
    var that = this;
    // that.setData({
    //   fid: e.detail.formId
    // })
    this.formid(e.detail.formId)

  },

  formid: function (id) {
    var that = this;
    console.log(id)
    // console.log(that.data.fid)
    wx.request({
      url: baseInfo + "saveFormID",
      method: "get",
      data: {
        "uid": uid, //用户ID
        "formId": id //提交formid 用于推送
      },
      dataType: "json",
      header: {
        'Content-Type': 'application/json',
      },
      success: function (datas) {
        console.log(datas);
        if (datas.data.errorCode == "0") {


        } else {
          wx.showToast({
            icon: 'none',
            title: datas.resultNote
          })
        }
      }
    })
  },








  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})