const baseInfo = require("../../utils/util.js").baseInfo;

var uid = "";
// pages/perCenter/perInformation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: "", //手机号
    gender: "", //性别 0：未知、1：男、2：女
    age: "", //年龄
    address: "", //居住地
    userinfo: {}, //个人信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    uid = wx.getStorageSync("userinfo").uid;

    wx.request({
      url: baseInfo + "userInfo",
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
          console.log("--个人信息:--", datas);

          _this.setData({
            userinfo: datas,
            phoneNum: datas.phoneNum
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

  //点击更改手机号
  openeditPhone: function() {
    let _this = this;
    wx.navigateTo({
      url: "./editPhone?phoneNum=" + _this.data.phoneNum
    });
  },


  //获取性别
  getgender: function(e) {
    var _this = this;
    _this.setData({
      gender: e.detail.value
    });
    console.log(e.detail.value);
  },

  //获取年龄
  getage: function(e) {
    var _this = this;
    _this.setData({
      age: e.detail.value
    });
    console.log(e.detail.value);
  },

  //获取年龄居住地
  getaddress: function(e) {
    var _this = this;
    _this.setData({
      address: e.detail.value
    });
    console.log(e.detail.value);
  },

  //保存数据
  submit: function() {
    let _this = this;
    wx.request({
      url: baseInfo + "saveUserInfo",
      data: {
        "uid": uid,
        "gender": _this.data.gender,
        "age": _this.data.age,
        "address": _this.data.address
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data.errorCode == "0") {
          var datas = res.data.msg;
          console.log("--保存成功:--", res);
          wx.showToast({
            icon: 'none',
            title: datas
          })

          setTimeout(function() {
            wx.navigateTo({
              url: "./perCenter"
            });
          }, 1500);

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