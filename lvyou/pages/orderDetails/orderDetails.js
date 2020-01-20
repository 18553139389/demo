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
    list: {},
    lon: '',
    lat: '',
    tit: '',
    call: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id
    this.init(id);
  },

  init(id) {
    http.showLoading().postD({
      cmd: "getHorderById",
      id: id
    }).then(res1 => {
      console.log(res1);
      if (res1.data.result == 0) {
        this.setData({
          list: res1.data,
          lon: res1.data.lon,
          lat: res1.data.lat,
          tit: res1.data.hotelName,
          call: res1.data.hotelPhone
        });
        wx.hideLoading();
      }
    });
  },

  change(e) {
    let item = e.currentTarget.dataset.index;
    this.setData({
      itemIndex: item
    });
  },

  goMap(e) {
    wx.navigateTo({
      url: '/pages/map/map?lon='+this.data.lon+'&lat='+this.data.lat+'&tit='+this.data.tit
    })
  },

  goCall() {
    wx.makePhoneCall({
      phoneNumber: this.data.call
    })
  },

  goList() {

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