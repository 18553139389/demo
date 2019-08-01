// pages/xiugaishouji/xiugaishouji.js
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
    // 倒计时显示
    time: "获取验证码",
    // 是否可点击获取验证码按钮
    clickCode: true,
    // 手机号
    phone: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      phone: this.data.phone//用户手机号
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
  setphone(e){
    console.log(e)
    this.setData({
      phone:e.detail
    })
  },
  xiugai(e){
    console.log(e)
    http.showLoading().postD({
      cmd:"editUserInfo",
      uid:gd.userId || "de8a58b195c5413e9792b41295c3e43c",
      phone:this.data.phone
    }).then(res=>{
      if(res.data.result==0){
        wx.hideLoading()
        wx.showToast({
          title:"修改成功",
          icon:"none",
          mask:true
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 300)
      }else{
        wx.hideLoading()
        wx.showToast({
          title: res.data.resultNote,
          icon: "none",
          mask: true
        })
      }
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