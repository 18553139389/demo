// pages/my/my.js
// 请求方法
const HTTP = require("../../utils/http-list.js");
const http = new HTTP();
//getApp()的数据
let gd = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  goqian() {
    wx.navigateTo({
      url: "/pages/wodeqianbao/wodeqianbao?num=" + this.data.list.balance + "&yj=" + this.data.list.deposit + "&flag=" + this.data.list.flag
    })
  },
  getPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.list.help
    });
  },
  goset() {
    wx.navigateTo({
      url: "/pages/gerenzhiliao/gerenzhiliao"
    })
  },
  goxiugai() {
    wx.navigateTo({
      url: "/pages/xiugai/xiugai"
    })
  },
  goqupiao() {
    wx.navigateTo({
      url: "/pages/qupiaorenlist/qupiaorenlist"
    })
  },
  goyjfk() {
    wx.navigateTo({
      url: "/pages/yijianfankui/yijianfankui"
    })
  },
  goback() {
    wx.removeStorageSync('uid')
    wx.reLaunch({
      url: "/pages/index/index"
    })
  },
  goscore() {
    wx.navigateTo({
      url: "/pages/jifengmingxi/jifengmingxi"
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
    http.showLoading().postD({
      cmd: "getUserInfo",
      uid: gd.userId,
    }).then(res => {
      wx.hideLoading();
      if (res.data.result == 0) {
        console.log(res)
        this.setData({
          list: res.data
        })
      }
      console.log(res)
    })
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