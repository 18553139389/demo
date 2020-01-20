const baseInfo = require("../../utils/util.js").baseInfo;

var uid = "";
// pages/perCenter/perCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    integral: "", //积分（我的积分中用）
    qrcode: "" //小程序二维码路径（邀请好友中用）
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    uid = wx.getStorageSync("userinfo").uid;
    _this.getData();
  },

  //获取数据
  getData: function() {
    let _this = this;
    
    wx.request({
      url: baseInfo + "personalCenter",
      data: {
        "uid": uid
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data.errorCode == "0") {
          var datas = res.data.body;
          console.log("请求成功", datas);

          _this.setData({
            userinfo: datas,
            integral: datas.integral,
            qrcode: datas.qrcode
          });

        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg
          })
        }
      }
    })
  },

  //点击实名认证
  opencerti: function() {
    wx.navigateTo({
      url: "./certification"
    });
  },

  //点击邀请好友
  openinvite: function() {
    let _this = this;
    wx.navigateTo({
      url: "./invite?qrcode=" + _this.data.qrcode
    });
  },

  //点击用户指南
  openguide: function() {
    wx.navigateTo({
      url: "./guide"
    });
  },

  //点击故障申报
  openmalfunction: function() {
    wx.scanCode({
      success(res) {
        //截取二维码url中的设备编号
        let info = res.result.split("=")[1];
        wx.navigateTo({
          url: "./malfunction?deviceId=" + info
        });
      }
    })
  },

  //点击我的积分
  openintegral: function() {
    let _this = this;
    wx.navigateTo({
      url: "./integral?integral=" + _this.data.integral
    });
  },

  //点击个人信息
  openreninfo: function() {
    wx.navigateTo({
      url: "./perInformation"
    });
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