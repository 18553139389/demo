const baseInfo = require("../../utils/util.js").baseInfo;
var uid = "";

// pages/perCenter/invite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcode: "" //传入的邀请二维码
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    uid = wx.getStorageSync("userinfo").uid;
     _this.setData({
       qrcode: options.qrcode
     })
    wx.request({
      url: baseInfo + "personalCenter",
      data: {
        "uid": uid
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.errorCode == "0") {
          var datas = res.data.body;
          console.log("请求成功", datas);
          _this.setData({
           // qrcode: datas.userIcon,
            info:datas
          });

        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg
          })
        }
      }
    })




    
    console.log(options.qrcode);
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
    var url = "pages/perCenter/invite"
    return {
      title: '皓帮安装邀请有礼',
      imageUrl: 'http://www.haobangzz.com/haobang/userfiles/img/share.jpg',
      path: url + '?pid=' + uid,
      success: function () {
        // wx.clearStorageSync();
        // wx.setStorageSync('pid', app.globalData.uid)
        // console.log(url + '?pid=' + app.globalData.uid )
      }
    }
  }
})