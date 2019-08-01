// pages/xiugaimima/xiugaimima.js
// 请求方法
const HTTP = require("../../utils/http-list.js");
const http = new HTTP();
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
    code: "",
    newPassword: "",
    okpassword: "",
    // 记录当前页面什么专题状态
    status: 0
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
        this.setData({
          code: res.data.code
        })
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
  setphone(e) {
    // console.log(e)
    this.setData({
      phone: e.detail
    })
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    if (options.id == 1) {
      wx.setNavigationBarTitle({
        title: "忘记密码"
      })
      this.setData({
        status: options.id
      })
    } else if (options.id == 2) {
      wx.setNavigationBarTitle({
        title: '修改登录密码',
      })
    } else {
      wx.setNavigationBarTitle({
        title: "修改支付密码"
      })
    }
    this.setData({
      status: options.id
    })
  },
  submitBox(e) {
    console.log(e)
    let val = e.detail.value;
    if (!/^[\d]{11}$/.test(val.phone)) {
      http.showToast("请输入正确的手机号码");
      return;
    }
    if (val.code != this.data.code) {
      http.showToast("请输入正确的验证码");
      return;
    }
    if (!/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{6,20}$/) {
      http.showToast("请输入正确的密码");
      return;
    }
    if (val.newpassword !== val.okpassword) {
      http.showToast("两次密码输入不一致");
      return;
    }
    let data;
    console.log(this.data.status)
    if (this.data.status == 1) {
      data = {
        cmd: "forgetPassWord",
        phone: val.phone,
        password: val.newpassword
      }
    } else if (this.data.status == 2) {
      data = {
        cmd: "editPassword",
        uid: gd.userId || "de8a58b195c5413e9792b41295c3e43c",
        type: 1,
        password: val.code
      }
    } else if (this.data.status == 3) {
      data = {
        cmd: "editPassword",
        uid: gd.userId || "de8a58b195c5413e9792b41295c3e43c",
        type: 2,
        password: val.code
      }
    }
    http.postD(data).then(res => {
      console.log(res)
      if (res.data.result == 0) {
        http.showToast("修改成功");
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
        },300)
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