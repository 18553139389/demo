// pages/wodeqianbao/wodeqianbao.js
const HTTP = require("../../utils/http-list.js");
const http = new HTTP();
//getApp()的数据
let gd = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:"",
    yj:"",
    flag: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      money:options.num,
      yj:options.yj!=="undefined"?options.yj:0,
      flag: options.flag
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  goyj(){
    wx.navigateTo({
      url: "/pages/qian/qian?id=2" + '&price=' + this.data.yj + '&flag=' + this.data.flag
    })
  },
  tixian(){
    wx.navigateTo({
      url:"/pages/qian/qian?id=1"
    })
  },
  chongzhi(){
    wx.navigateTo({
      url:"/pages/qian/qian?id=3"
    })
  },
  gomx(){
    wx.navigateTo({
      url:"/pages/jiaoyimingxi/jiaoyimingxi"
    })
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