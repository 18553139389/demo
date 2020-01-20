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
    time: 4
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that= this
    let timer = setInterval(function(){
      let time = that.data.time;
      time--;
      that.setData({
        time: time
      });
      if(that.data.time == 0){
        clearInterval(timer);
        wx.switchTab({
          url: '/pages/index/index'
        });
      }
    },1000)
  },

  goIndex() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 
   * @param {*} event 
   * 倒计时
   */
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