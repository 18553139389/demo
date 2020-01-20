// pages/xiugaimima/xiugaimima.js
// 请求方法
const HTTP = require("../../utils/http-list.js");
const http = new HTTP();

let gd = getApp().globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    show: true,
    id: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      id: options.id
    })
    this.init();
  },

  init() {
    http.showLoading().postD({
      cmd: "getUserCouponList",
      uid: gd.userId,
      hotelId: this.data.id
    }).then(res1 => {
      if (res1.data.result == 0) {
        if (res1.data.dataList) {
          this.setData({
            list: res1.data.dataList,
            show: true
          })
          wx.hideLoading();
        } else {
          this.setData({
            show: false
          })
          wx.hideLoading();
        }
      }
    });
  },

  use(e) {
    let id = e.currentTarget.dataset.id;
    let price = e.currentTarget.dataset.price;
    gd.couponId = id;
    gd.amount = price;
    wx.navigateBack({
      delta: 1
    })
  },

  no() {
    gd.couponId = '';
    gd.amount = 0;
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 
   * @param {*} event 
   * 倒计时
   */
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