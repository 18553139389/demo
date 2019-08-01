// pages/xiangmuliebiao/xiangmuliebiao.js
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
    list: [],
    searchList: [],
    currentVal: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(options)
    let data={
      cmd:"getGoodsList",
      nowPage:1,
      uid: gd.userId,
    }
    if(options.type==1){
      data.cityId=options.name
    }else{
      data.name=options.name
    }
    if (options.id){
      data.id = options.id
    }
    http.showLoading().postD(data).then(res=>{
      console.log(res)
      if(res.data.result==0){
        wx.hideLoading();
        if (res.data.dataList){
          this.setData({
            list: res.data.dataList
          })
        }
      }
    })
  },
  gotoList(e){
    console.log(id)
    let id=e.detail;
    wx.navigateTo({url:"/pages/jingqudetail/jingqudetail?id="+id})
  },
  onSearch(e) {
    if (this.data.currentVal == "") {
      http.showToast("请输入搜索内容");
      return;
    }
    if (!wx.getStorageSync("search")) {
      wx.setStorageSync("search", []);
    }
    let store = wx.getStorageSync("search");
    if (store.indexOf(this.data.currentVal) == -1) {
      store.push(this.data.currentVal);
    }
    wx.setStorageSync("search", store)
  },
  setSearch(e) {
    this.setData({
      currentVal: e.detail
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