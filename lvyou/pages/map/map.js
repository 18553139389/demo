// pages/xiugaimima/xiugaimima.js
// 请求方法
const HTTP = require("../../utils/http-list.js");
const http = new HTTP();
var QQMapWX = require('../../lib/qqmap-wx-jssdk.min.js');

let gd = getApp().globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lon: '',
    lat: '',
    tit: '',
    markers: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this
    // 实例化API核心类
    var demo = new QQMapWX({
      key: 'OW6BZ-ZUZCF-2JYJ7-J5U4H-B7WSQ-BCF5K'
    });
    var lon = ''
    var lat = ''
    var markers = []
    // 调用接口
    demo.reverseGeocoder({
      location: {
        latitude: options.lat,
        longitude: options.lon
      },
      coord_type: 3, //baidu经纬度
      success: function(res) {
        lon = res.result.ad_info.location.lng;
        lat = res.result.ad_info.location.lat;
        markers = [{
          iconPath: "/images/map.png",
          longitude: lon,
          latitude: lat,
          id: "map",
          width: 20,
          height: 20,
          callout: {
            content: options.tit,
            color: '#ffffff',
            fontSize: 14,
            borderRadius: 4,
            borderColor: '#FF440D',
            bgColor: '#FF440D',
            padding: 4,
            display: 'ALWAYS',
            textAlign: 'center'
          }
        }]
        self.setData({
          markers: markers,
          lon: lon,
          lat: lat
        })
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
    });

    wx.setNavigationBarTitle({
      title: options.tit
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