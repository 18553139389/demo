// pages/backstage/recordingdetial.js
const baseInfo = require("../../utils/util.js").baseInfo;
const upload = require("../../utils/util.js").upload;
var uid = "";

var errorApplyId = ""; //故障申报ID 638d30849a874635852d86b662f623c2

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    uid = wx.getStorageSync("userinfo").uid;
    errorApplyId = options.errorApplyId;
    _this.getData();
  },
  //获取数据
  getData: function () {
    let _this = this;
    wx.request({
      url: baseInfo + "errorApplyDetail",
      data: {
        "errorApplyId": errorApplyId
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.errorCode == "0") {
          let datas = res.data.body;
          console.log("请求成功", datas);

          _this.setData({
            detail: datas
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