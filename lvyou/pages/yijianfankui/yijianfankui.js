// pages/yijianfankui/yijianfankui.js
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
    val: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  sub(e) {
    console.log(e)
    this.setData({
      val: e.detail.value
    })
  },
  tiji() {
    let that = this
    if(this.data.val == ''){
      http.showToast("反馈内容不能为空")
      return
    }
    http.showLoading().postD({
      cmd: "saveAdvise",
      uid: gd.userId || "de8a58b195c5413e9792b41295c3e43c",
      content: this.data.val
    }).then(res => {
      if (res.data.result == 0) {
        http.showToast("提交成功")
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
        },800)
      }
    })
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