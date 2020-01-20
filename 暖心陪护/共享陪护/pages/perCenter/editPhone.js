const baseInfo = require("../../utils/util.js").baseInfo;
var uid = "";

function countdown(_this) {
  var second = _this.data.second;

  if (second == 0) {
    _this.setData({
      tips: '获取验证码',
      second: 5
    });
    return;

  } else {
    _this.setData({
      second: second,
      tips: '重新获取(' + second + ')'
    })
  }

  var time = setTimeout(function() {
    _this.setData({
      second: second - 1
    });
    countdown(_this);
  }, 1000);

}

// pages/perCenter/editPhone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips: "获取验证码",
    second: 5, //验证码倒计时
    phoneInfo: '', //手机号
    yanmaInfo: '' //验证码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    uid = wx.getStorageSync("userinfo").uid;
  },

  //提交绑定
  submit: function() {
    let _this = this;

    if (_this.data.phoneInfo.length < 11) {
      wx.showToast({
        icon: 'none',
        title: "请输入正确的手机号"
      })
      return;
    }

    if (_this.data.yanmaInfo.length < 4) {
      wx.showToast({
        icon: 'none',
        title: "请输入正确的验证码"
      })
      return;
    }

    wx.request({
      url: baseInfo + "bindPhoneNumber",
      data: {
        "uid": uid, //商户ID
        "phoneNum": _this.data.phoneInfo, //用户手机号
        "code": _this.data.yanmaInfo, //验证码
        "type": 1 //类型（0-绑定手机号，1-修改绑定手机号）
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log("--修改手机号成功:--", res);
        if (res.data.errorCode == "0") {
          var datas = res.data.body;

          wx.showToast({
            icon: 'none',
            title: res.data.msg
          })

          setTimeout(function() {
            wx.navigateTo({
              url: "./perCenter"
            });
          }, 800);

        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg
          })
        }
      }
    })
  },

  //用户点击获取验证码
  sendcode: function(e) {
    let _this = this;
    if (_this.data.phoneInfo.length < 11) {
      wx.showToast({
        icon: 'none',
        title: "请输入手机号"
      })
      return;
    }

    countdown(_this); //调用倒计时函数

    console.log(_this.data.second);

    if (_this.data.second < 5) {
      return
    } else {
      wx.request({
        url: baseInfo + "sendSmsCode",
        data: {
          "phoneNum": _this.data.phoneInfo
        },
        dataType: "json",
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          console.log("--获取验证码成功:--", res);
          if (res.data.errorCode == "0") {
            var datas = res.data.body;

            // _this.setData({
            //   // yanmaInfo: datas.code
            // });

          } else {
            wx.showToast({
              icon: 'none',
              title: res.data.msg
            })
          }
        }
      })
    }
  },


  //获取输入的手机号
  getphone: function(e) {
    var _this = this;
    _this.setData({
      phoneInfo: e.detail.value
    });
    // console.log(_this.data.phoneInfo);
  },

  //获取输入的验证码
  getyanma: function(e) {
    var _this = this;
    _this.setData({
      yanmaInfo: e.detail.value
    });
    // console.log(_this.data.yanmaInfo);
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