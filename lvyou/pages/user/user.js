// pages/login/login.js
const HTTP = require("../../utils/http-list.js");
const http = new HTTP();
//getApp()的数据
let gd = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 权限
    chooseA: true
  },
  getOrder() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  goLogin() {
    wx.login({
      success: (res) => {
        // 查看是否授权
        wx.getSetting({
          success: (res2) => {
            console.log(res2)
            if (res2.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.getUserInfo({
                success: (res1) => {
                  http.showLoading("登录中").postD({
                    cmd: "authorizationUser",
                    code: res.code,
                    userInfo: res1
                  }).then(response => {
                    if (response.data.result == 0) {
                      wx.hideLoading()
                      gd.userId = response.data.uid;
                      wx.setStorage({
                        key: "uid",
                        data: response.data.uid
                      })
                      wx.switchTab({
                        url: "/pages/index/index"
                      })
                    } else if (response.data.result == 2){
                      http.showToast(response.data.resultNote);
                    }
                  })
                }
              })
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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