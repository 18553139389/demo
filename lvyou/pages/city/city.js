// pages/city/city.js
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
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getind();
  },
  gotoindex(e){
    console.log(e.target)
    let city=e.target.dataset.city;
    gd.city=city;
    console.log(city);
    wx.switchTab({
      url:"/pages/index/index"
    })
  },
  _getind() {
    http.showLoading().postD({
      cmd: "getHomeData",
      uid: gd.userId || "de8a58b195c5413e9792b41295c3e43c",
    }).then(res => {
      console.log(res)
      if (res.data.result == 0) {
        wx.hideLoading();
        this.setData({
          list:res.data.cityList
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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