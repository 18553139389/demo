// pages/dingdansousuo/dingdansousuo.js
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
    searchList:[],
    currentVal:"",
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onSearch(e){
    if(this.data.currentVal==""){
      http.showToast("请输入搜索内容");
      return;
    }
    http.showLoading().postD({
      cmd: "getOrderListByParam",
      uid: gd.userId,
      param: this.data.currentVal
    }).then(res => {
      if (res.data.result == 0) {
        wx.hideLoading()
        if (res.data.dataList){
          this.setData({
            searchList: res.data.dataList,
            show: false
          })
        }else{
          this.setData({
            show: true
          })
        }
      }
    })
  },
  setSearch(e){
    // console.log(e)
    this.setData({
      currentVal:e.detail
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