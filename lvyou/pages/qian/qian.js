// pages/qian/qian.js
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
    id: "",
    // 提现全部金额
    money: 0,
    getmoney: '',
    price: '',
    flag: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      id: options.id,
      price: options.price,
      flag: options.flag
    })
    if (options.id == 1) {
      wx.setNavigationBarTitle({
        title: '提现'
      })
      http.showLoading().postD({
        cmd: "getUserInfo",
        uid: gd.userId || "de8a58b195c5413e9792b41295c3e43c",
      }).then(res => {
        if (res.data.result == 0) {
          wx.hideLoading();
          this.setData({
            money: parseFloat(res.data.balance)
          })
        }
      })
    } else if (options.id == 2) {
      wx.setNavigationBarTitle({
        title: '退押金'
      })
    } else if (options.id == 3) {
      wx.setNavigationBarTitle({
        title: '充值'
      })
    }
  },
  tixian() {
    this.setData({
      getmoney: this.data.money
    })
  },
  setmoney(e) {
    console.log(e)
    this.setData({
      getmoney: e.detail.value
    })
  },
  ok() {
    if (this.data.id == 1) {
      http.showLoading().postD({
        cmd: "tiXian",
        uid: gd.userId || "de8a58b195c5413e9792b41295c3e43c",
        type: this.data.id - 0,
        money: this.data.getmoney - 0
      }).then(res => {
        if (res.data.result == 0) {
          wx.hideLoading();
          console.log(res)
          http.showToast("提现成功");
          setTimeout(() => {
            http.postD({
              cmd: "getUserInfo",
              uid: gd.userId || "de8a58b195c5413e9792b41295c3e43c",
            }).then(res => {
              if (res.data.result == 0) {
                wx.navigateTo({
                  url: '/pages/success/success?type=1'
                })
              }
            })
          }, 1000)
        } else {
          http.showToast(res.data.resultNote);
        }
      })
    } else {
      if (this.data.getmoney <= 0) {
        http.showToast("充值金额必须大于0元");
        return false
      }
      http.showLoading().postD({
        cmd: "chongZhi",
        uid: gd.userId || "de8a58b195c5413e9792b41295c3e43c",
        money: this.data.getmoney - 0 //金额
      }).then(response => {
        console.log(response)
        wx.requestPayment({
          timeStamp: response.data.timeStamp,
          nonceStr: response.data.nonceStr,
          package: response.data.packages,
          signType: 'MD5',
          paySign: response.data.paySign,
          success(res) {
            wx.hideLoading()
            wx.navigateBack({
              delta: 1
            })
          },
          fail(res) {
            wx.hideLoading()
            wx.showToast({
              title: '充值失败',
              icon: 'none',
            })
            wx.navigateBack({
              delta: 1
            })
          }
        })
      })
    }
  },

  backMoney() {
    http.showLoading().postD({
      cmd: "tiXian",
      uid: gd.userId || "de8a58b195c5413e9792b41295c3e43c",
      type: this.data.id - 0,
      money: this.data.price
    }).then(res => {
      if (res.data.result == 0) {
        wx.hideLoading();
        http.showToast("申请退款成功");
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/success/success?type=2'
          })
        }, 1000)
      } else {
        http.showToast(res.data.resultNote);
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