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
    user: '',
    phone: '',
    num: '',
    nums: '',
    date: '',
    show: false,
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    currentDate: new Date().getTime()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  goUser(e) {
    this.setData({
      user: e.detail.value
    })
  },

  goPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  goCar(e) {
    this.setData({
      num: e.detail.value
    })
  },

  goDate() {
    this.setData({
      show: true
    })
  },

  goNum(e) {
    this.setData({
      nums: e.detail.value
    })
  },

  goSubmit() {
    var self = this;
    if (this.data.user == "" || this.data.phone == "" || this.data.num == '' || this.data.date == '') {
      wx.showToast({
        title: "请输入完整信息",
        icon: "none"
      })
      return;
    }

    if (!/^1[\d]{10}$/.test(this.data.phone)) {
      http.showToast("请输入正确的手机号");
      return;
    }

    if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.data.num)) {
      http.showToast("请输入有效的身份证");
      return;
    }

    http.showLoading().postD({
      cmd: "saveHotelUser",
      phone: this.data.phone,
      name: this.data.user,
      idCard: this.data.num,
      endDate: this.data.date,
      number: 0
    }).then(res1 => {
      wx.hideLoading();
      if (res1.data.result == 0) {
        wx.showToast({
          title: '报名成功',
          icon: 'none',
          duration: 3000
        })
      }else{
        http.showToast(res1.data.resultNote);
      }
    });
  },

  formatDate(now) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1 > 9 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1);
    var date = now.getDate() > 9 ? now.getDate() : '0' + now.getDate();
    var hour = now.getHours() > 9 ? now.getHours() : '0' + now.getHours();
    var minute = now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute;
  },

  onInput(event) {
    console.log(event)
    let d = new Date(event.detail);
    console.log(this.formatDate(d));
    this.setData({
      show: false,
      date: this.formatDate(d)
    });
  },

  onCancel() {
    this.setData({
      show: false
    });
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