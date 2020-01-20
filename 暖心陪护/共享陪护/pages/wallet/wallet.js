const baseInfo = require("../../utils/util.js").baseInfo;
var uid = "";

// pages/wallet/wallet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance: "", //账户余额
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function(options) {
    var _this = this;
    uid = wx.getStorageSync("userinfo").uid;
    
    wx.request({
      url: baseInfo + "myWallet",
      data: {
        "uid": uid
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log("请求成功", res);
        if (res.data.errorCode == "0") {
          var datas = res.data.body;

          _this.setData({
            balance: datas.balance
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


  //点击充值
  openrecharge: function() {
    wx.navigateTo({
      url: "./recharge"
    });
  },

  //点击提现
  openwithdraw: function() {
    let _this = this;
    wx.navigateTo({
      url: "./withdraw?balance=" + _this.data.balance
    });
  },

  //点击交易明细
  opendetails: function() {
    wx.navigateTo({
      url: "./details"
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