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
    chooseA:true
  },
  submit(e){
    if(e.detail.value.phone=="" || e.detail.value.password==""){
      http.showToast("请填写完整信息");
      return;
    }
    if (!/^1[\d]{10}$/.test(e.detail.value.phone)) {
      http.showToast("请输入正确的手机号");
      return;
    }
    if (!/^[\w_-]{6,16}$/.test(e.detail.value.password)) {
      http.showToast("请输入正确的密码格式");
      return;
    }
    http.postD({
      cmd:"userLogin",
      phone:e.detail.value.phone,//用户手机号
			password:e.detail.value.password//密码
    }).then(res=>{
      console.log(res)
      if(res.data.result==0){
        gd.userId = res.data.uid;
        wx.setStorage({
          key: "uid",
          data: res.data.uid
        })
        wx.switchTab({url:"/pages/index/index"})
      } else if (res.data.result == 2){
        http.showToast(res.data.resultNote);
      } else if (res.data.result == 1) {
        http.showToast(res.data.resultNote);
      }
    })
  },
  gozc(){
    wx.navigateTo({
      url:"/pages/zhuce/zhuce"
    })
  },
  gowj(){
    wx.navigateTo({
      url:"/pages/xiugaimima/xiugaimima?id=1"
    })
  },
  goBack(){
    wx.navigateBack({
      delta: 1
    })
  },
  goLogin(){
    wx.login({
      success: (res) => {
        // 查看是否授权
        wx.getSetting({
          success: (res2) => {
            if (res2.authSetting['scope.userLocation']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.getUserInfo({
                success: (res1) => {
                  http.showLoading().postD({
                    cmd: "authorizationUser",
                    code: res.code,
                    userInfo: res1
                  }).then(response => {
                    console.log(response)
                    if (response.data.result == 0){
                      wx.hideLoading()
                      gd.userId = response.data.uid;
                      wx.setStorage({
                        key: "uid",
                        data: response.data.uid
                      })
                      wx.switchTab({
                        url: "/pages/index/index"
                      })
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
    // if (wx.getStorageSync('uid')){
    //   wx.switchTab({ url: "/pages/index/index" })
    // }
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