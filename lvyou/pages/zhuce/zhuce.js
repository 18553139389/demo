// pages/xiugaimima/xiugaimima.js
// 请求方法
const HTTP = require("../../utils/http-list.js");
const http = new HTTP();

let gd = getApp().globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 倒计时显示
    time: "获取验证码",
    // 是否可点击获取验证码按钮
    clickCode: true,
    // 手机号
    phone: "",
    canIuse: true,
    code: "123456",
    userInfo: "",
    choice: true,
    uid: ''
  },
  /**
   * 获取验证码
   */
  getcode() {
    // 是否可点击
    if (!this.data.clickCode) {
      return;
    }
    // 是否手机正确
    if (this.data.phone.length < 11) {
      wx.showToast({
        title: "请输入正确的手机号码",
        icon: "none"
      })
      return;
    }
    wx.showToast({
      title: "正在获取验证码",
      icon: "none",
      mask: true
    })

    // 请求
    http.postD({
      cmd: "sendSms",
      phone: this.data.phone //用户手机号
    }).then((res) => {
      if (res.data.result == 0) {
        console.log(res)
        this.timeout(60)
      } else {
        wx.showToast({
          title: "发送失败，请重新发送",
          icon: "none",
          mask: true
        })
      }
    })
  },
  bindGetUserInfo(e) {
    this._getUseInfo()
  },
  // 获取信息
  _getUseInfo() {
    wx.login({
      success: (res) => {
        // 查看是否授权
        wx.getSetting({
          success: (res2) => {
            if (res2.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.getUserInfo({
                success: (res1) => {
                  this.setData({
                    code: res.code,
                    userInfo: res1,
                    canIuse:false
                  })
                }
              })
            }
          }
        })
      }
    })
  },
  getPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  submit(e) {
    if(this.data.choice){
      let val = e.detail.value;
      if (val.code == "" || val.password == "" || val.password1 == "" || val.phone == "") {
        wx.showToast({
          title: "请输入完整信息",
          icon: "none"
        })
        return;
      }
      if (!/^1[\d]{10}$/.test(val.phone)) {
        http.showToast("请输入正确的手机号");
        return;
      }
      if (!/^[\w_-]{6,16}$/.test(val.password)) {
        http.showToast("请输入正确的密码格式");
        return;
      }
      // if (val.password !== val.password1) {
      //   http.showToast("两次密码输入不一致");
      //   return;
      // }
      http.showLoading().postD({
        cmd: 'register',
        phone: val.phone, //用户手机号
        password: val.password, //密码
        parentPhone: val.yao, //邀请码
        code: this.data.code, //
        type: 2,
        userInfo: this.data.userInfo //
      }).then(res => {
        console.log(res);
        if (res.data.result == 0) {
          wx.hideLoading()
          http.showToast("注册成功");
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 300)
        } else {
          http.showToast(res.data.resultNote);
        }
        // if(){}
      })
    }else{
      let val = e.detail.value;
      if (val.code == "" || val.password == "" || val.password1 == "" || val.phone == "") {
        wx.showToast({
          title: "请输入完整信息",
          icon: "none"
        })
        return;
      }
      if (!/^1[\d]{10}$/.test(val.phone)) {
        http.showToast("请输入正确的手机号");
        return;
      }
      if (!/^[\w_-]{6,16}$/.test(val.password)) {
        http.showToast("请输入正确的密码格式");
        return;
      }
      http.showLoading().postD({
        cmd: 'register',
        phone: val.phone, //用户手机号
        password: val.password, //密码
        uid: this.data.uid,
        code: this.data.code, //
        type: 1,
        userInfo: this.data.userInfo //
      }).then(res => {
        console.log(res);
        if (res.data.result == 0) {
          wx.hideLoading()
          http.showToast("注册成功");
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 300)
        } else {
          http.showToast(res.data.resultNote);
        }
        // if(){}
      })
    }
  },
  gologin() {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(options.scene){
      this.setData({
        choice: false,
        uid: options.scene
      })
    }
    this._getUseInfo()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 
   * @param {*} event 
   * 倒计时
   */
  timeout(time) {
    const text = "S"
    let si = setInterval(() => {
      time--;
      if (time <= 0) {
        this.setData({
          time: "获取验证码",
          clickCode: true
        })
        clearInterval(si);
        return;
      }
      const t = time < 10 ? `0${time}` : time;
      this.setData({
        time: `${t}${text}`,
        clickCode: false
      })
    }, 1000)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  onClickLeft() {
    console.log(1)
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