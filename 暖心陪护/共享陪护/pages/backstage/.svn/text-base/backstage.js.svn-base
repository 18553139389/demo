// pages/backstage/backstage.js
const baseInfo = require("../../utils/util.js").baseInfo;
var uid = "";
var yiyuanId = ""; //医院id

Page({

  /**
   * 页面的初始数据
   */
  data: {
    yiyuanName: "", //医院名称
    userinfo: [], //个人信息
    boxStatus: false //医院弹框 false：默认关闭  true：打开弹框
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    uid = wx.getStorageSync("userinfo").uid;

    _this.getData();
  },

  //获取数据
  getData: function() {
    let _this = this;

    wx.request({
      url: baseInfo + "yunweiIndex",
      data: {
        "uid": uid,
        "hospitalId": yiyuanId
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data.errorCode == "0") {
          var datas = res.data.body;
          console.log("请求成功", datas);

          yiyuanId = datas.hospitalId;

          _this.setData({
            userinfo: datas,
            yiyuanName: datas.hospitalName
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

  //扫码代开-跳转-支付页面
  openkaipay: function() {
    let userinfo = wx.getStorageSync("userinfo");
    console.log("走了一遍")
        wx.scanCode({
          success(res) {
            console.log("这是成功之后 调数据之前")
            //截取二维码url中的设备编号
            let info = res.result.split("=")[1];
            console.log(info);
            wx.request({
              url: baseInfo + "scanCode",
              method: "get",
              data: {
                "uid": userinfo.uid, //用户ID
                "deviceNum": info, //设备编号
                "type":'0'//开锁是0  ，关锁是1         
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
                    console.log("跳转之前typeSataus")
                    wx.navigateTo({
                      url: "../pay/scanCodePay?deviceNum=" + info + "&typeSataus=1"
                    });
                    console.log("跳转后")
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

  //跳转-我的卡包-运维
  opencardPck: function() {
    wx.navigateTo({
      url: "../cardPck/cardPck?type=1"
    });
  },

  //跳转-设备统计
  openshebeicount: function() {
    let _this = this;
    wx.navigateTo({
      url: "./shebeicount?hospitalId=" + yiyuanId + "&hospitalName=" + _this.data.yiyuanName
    });
  },

  //跳转-统计报表
  openreport: function() {
    let _this = this;
    wx.navigateTo({
      url: "./report?hospitalId=" + yiyuanId + "&yiyuanName=" + _this.data.yiyuanName
    });
  },

  //扫码-跳转-调试维修
  opendebugging: function() {
    wx.openBluetoothAdapter({
      success(res) {
    wx.scanCode({
      success(res) {
        console.log(res)
        //截取二维码url中的设备编号
        let info = res.result.split("=")[1];
        console.log("设备编号"+info)
        wx.navigateTo({
          url: "./debugging?info=" + info
        });
      }
    })
      },
      fail(res) {
        console.log("当前蓝牙状态：" + res.errCode);
        if (res.errCode == '10001') {
          wx.showModal({
            title: '提示',
            content: '请先打开手机蓝牙~~',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    })
  },

  //跳转-设备录入
  openshebeiluru: function() {
    wx.scanCode({
      success(res) {
        //截取二维码url中的设备编号
        let info = res.result.split("=")[1];
        console.log("设备编号" + info)
        wx.navigateTo({
          url: "./shebeiluru?info=" + info
        });
      }
    })
  },

  //跳转-交易流水
  opentransactionwater: function() {
    wx.navigateTo({
      url: "./transactionwater"
    });
  },

  //跳转-调试记录
  opendebuggingJilu: function() {
    wx.navigateTo({
      url: "./debuggingJilu?hospitalId=" + yiyuanId
    });
  },

  //跳转-故障记录
  openrecording: function() {
    wx.navigateTo({
      url: "./recording?hospitalId=" + yiyuanId
    });
  },

  //跳转-故障申报
  opendeclare: function() {
    wx.navigateTo({
      url: "./declare?hospitalId=" + yiyuanId,
    });
  },

  //跳转-运维订单管理
  openOrder: function() {
    wx.navigateTo({
      url: "../order/backstageorder?hospitalId=" + yiyuanId
    });
  },

  //点击弹框列表 关闭弹框 覆盖数据
  clickYuan: function(e) {
    let _this = this;

    let i = e.currentTarget.dataset.yiid;
    let name = e.currentTarget.dataset.yiname;

    yiyuanId = i;

    _this.setData({
      yiyuanName: name,
      boxStatus: false
    });

    _this.getData();
  },

  //点击医院 弹出弹框列表
  getBoxmsk: function() {
    let _this = this;
    _this.setData({
      boxStatus: true
    });

    wx.request({
      url: baseInfo + "hospitalList",
      data: {
        "uid": uid
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data.errorCode == "0") {
          var datas = res.data.body;
          console.log("请求成功", datas);
          _this.setData({
            hospitalList: datas.hospitalList
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

  //点击弹框x  关闭弹框
  closeBox: function() {
    let _this = this;
    _this.setData({
      boxStatus: false
    });
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