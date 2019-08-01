// pages/jifengmingxi/jifengmingxi.js
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
    page: 1,
    scoreList: [],
    allList: [],
    totalPage: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setDatas(this.data.page, (res) =>{
      this.setData({
        scoreList: res.data.dataList,
        totalPage: res.data.totalPage
      })
    })
  },

  setDatas(page, callback) {
    http.showLoading().postD({
      cmd: "getPointsList",
      uid: gd.userId,
      nowPage: page
    }).then(res => {
      if (res.data.result == 0) {
        wx.hideLoading()
        if (callback) {
          callback(res)
          return
        }
      }
    })
  },

  scrollBootom() {
    let allList = this.data.scoreList
    let pages = this.data.page + 1
    this.setData({
      page: pages
    })
    if (pages >= this.data.totalPage) {
      return
    }
    this.setDatas(pages, (res) => {
      let allLists = allList.concat(res.data.dataList)
      this.setData({
        scoreList: allLists
      })
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