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
    currentVal: "",
    page: 1,
    totalPage: 1,
    datas: {},
    show: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let data = {
      cmd: "getGoodsList",
      nowPage: 1,
      uid: gd.userId,
    }
    if (options.type == 1) {
      data.cityId = options.name
    } else {
      data.name = options.name
    }
    if (options.id) {
      data.id = options.id
    }
    this.setData({
      datas: data
    });
    http.showLoading().postD(data).then(res => {
      console.log(res)
      if (res.data.result == 0) {
        wx.hideLoading();
        if (res.data.dataList) {
          this.setData({
            list: res.data.dataList,
            totalPage: res.data.totalPage,
            show: true
          })
        } else {
          this.setData({
            show: false
          })
        }
      }
    })
  },

  tolower() {
    var page = this.data.page;
    var totalPage = this.data.totalPage
    page++
    this.setData({
      page: page
    });
    console.log(this.data.page)
    let obj = this.data.datas;
    obj.nowPage = this.data.page
    this.setData({
      datas: obj
    });
    //加载分页数据
    if (page <= totalPage) {
      http.showLoading().postD(this.data.datas).then(res => {
        console.log(res)
        if (res.data.result == 0) {
          wx.hideLoading();
          if (res.data.dataList) {
            let list = this.data.list;
            for (let i = 0; i < res.data.dataList.length; i++) {
              list.push(res.data.dataList[i])
            }
            this.setData({
              list: list,
              show: true
            })
          }
        }
      })
    }
  },

  gotoList(e) {
    console.log(id)
    let id = e.detail;
    wx.navigateTo({
      url: "/pages/jingqudetail/jingqudetail?id=" + id
    })
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
  onReady: function() {

  },

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