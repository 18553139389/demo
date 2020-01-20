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
    bar: [],
    itemIndex: 0,
    list: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init();
  },

  init() {
    let that = this
    http.showLoading().postD({
      cmd: "getClassificationList"
    }).then(res => {
      if (res.data.result == 0) {
        let bar = res.data.dataList;
        http.postD({
          cmd: "getHotelListById",
          id: bar[0].id
        }).then(res1 => {
          if (res1.data.result == 0) {
            console.log(res1)
            that.setData({
              list: res1.data.dataList
            })
          }
        });
        this.setData({
          bar: bar
        })
        wx.hideLoading()
      }
    });
  },

  change(e) {
    let that = this;
    let item = e.currentTarget.dataset.index;
    this.setData({
      itemIndex: item
    });
    let bar = this.data.bar;
    http.showLoading().postD({
      cmd: "getHotelListById",
      id: bar[item].id
    }).then(res1 => {
      if (res1.data.result == 0) {
        that.setData({
          list: res1.data.dataList
        })
        wx.hideLoading()
      }
    });
  },

  goDetail(e) {
    let id = e.currentTarget.dataset.ind;
    let tit = e.currentTarget.dataset.tit;
    wx.navigateTo({
      url: '/pages/hotelDetail/hotelDetail?id='+id+'&tit='+tit
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