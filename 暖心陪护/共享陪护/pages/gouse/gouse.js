// pages/gouse/gouse.js
const baseInfo = require("../../utils/util.js").baseInfo;
var uid = "";
var isYunwei;//判断是否是运维 0普通用户 1运维
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payStatus: false, //选择支付方式后 才能去支付
    payMethod:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options.deviceNum);
    uid = wx.getStorageSync("userinfo").uid;
    isYunwei = options.isYunwei;
    that.setData({
      cardId:options.cardId,
      deviceNum: options.deviceNum,
      yajin: options.yajin,
      balance: options.balance,
      isYunwei: isYunwei
    })
    //这个是生成订单
  //  that.order_list();
  },


  //跳转-支付成功页面
  opencompay: function () {
    let _this = this;
    wx.showLoading({
      title: '加载中',
    })
    if (_this.data.payStatus) {
      wx.request({
        url: baseInfo + "goUsePay",
        data: {
          "uid": uid, //用户ID
          "orderId": _this.data.cardId, //订单ID
          "payMoney": _this.data.yajin, //实付金额
          "payMethod": _this.data.payMethod //支付方式：0-余额支付，1-微信支付
        },
        dataType: "json",
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log("--支付成功：--", res);
          if (res.data.errorCode == "0") {
            let datas = res.data.body;
            console.log('支付页面获取到的设备mac:' + datas.macAddr);
            if (_this.data.payMethod == '1') { //微信支付
              wx.requestPayment({
                timeStamp: datas.timeStamp,
                nonceStr: datas.nonceStr,
                package: datas.package,
                signType: datas.signType,
                paySign: datas.paySign,
                success(res_pay) {
                  //发起支付成功
                  console.log("支付成功：" + res_pay);
                  //关闭加载框
                  wx.hideLoading();
                  setTimeout(function () {
                    wx.navigateTo({
                      url: "../theLock/theLock?departId=" + datas.departId + "&macAddr=" + datas.macAddr + '&isYunwei=' + isYunwei
                    });
                  }, 1000);
                },
                fail(res_pay) {
                  //关闭加载框
                  wx.hideLoading();
                  //发起支付失败
                  console.log("发起支付失败：" + res_pay);
                }
              })
            } else {//余额支付
              wx.hideLoading();
              wx.showToast({
                icon: 'none',
                title: res.data.msg,
                duration: 2000
              })
              wx.navigateTo({
                url: "../theLock/theLock?departId=" + datas.departId + "&macAddr=" + datas.macAddr + '&isYunwei=' + isYunwei
              });
            }

          } else {
            wx.showToast({
              icon: 'none',
              title: res.data.msg
            })
          }
        }
      })


    } else {
      wx.showToast({
        icon: 'none',
        title: "请选择支付方式"
      })
    }


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

//选择支付方式
  radioChange: function (e) {
    let _this = this;
    _this.setData({
      payStatus: true,
      payMethod: e.detail.value
    });
    console.log('支付方式为：', e.detail.value)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})