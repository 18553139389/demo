// pages/zhifufangshi/zhifufangshi.js
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
    radio: "2",
    id: "",
    price: "",
    type: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      id: options.id,
      price: options.price
    })
  },
  goBack() {
    wx.showModal({
      title: '提示',
      content: '您还没有完成支付，确定返回吗',
      cancelText: '返回',
      confirmText: '继续支付',
      confirmColor: 'red',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },
  onClick(e) {
    let name = e.currentTarget.dataset.name;
    this.setData({
      radio: name
    })
    console.log(this.data.radio)
  },
  goPay(e) {
    var radio = this.data.radio
    var id = this.data.id
    var self = this
    console.log(id, gd.userId)
    if (radio == 1) {
      http.showLoading().postD({
        cmd: "payOrder",
        id: id,
        type: 2,
        uid: gd.userId,
      }).then(res => {
        if (res.data.result == 0) {
          wx.hideLoading();
          self.setData({
            type: 1
          })
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000
          })
          wx.redirectTo({
            url: "/pages/success/success?type=0",
          })
        } else {
          console.log(res)
          wx.showToast({
            title: res.data.resultNote,
            icon: 'none',
            duration: 2000
          })
        }
      })
    } else if (radio == 2) {
      wx.login({
        success: (res) => {
          console.log(res)
          // 查看是否授权
          wx.getSetting({
            success: (res2) => {
              console.log(res2)
              if (res2.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  success: (res1) => {
                    console.log(e)
                    console.log(res1)
                    http.showLoading().postD({
                      cmd: "payOrder",
                      id: id,
                      type: 1,
                      uid: gd.userId,
                      code: res.code,
                      userInfo: res1.userInfo
                    }).then(response => {
                      console.log(response)
                      if (response.data.result == 0) {
                        wx.requestPayment({
                          timeStamp: response.data.timeStamp,
                          nonceStr: response.data.nonceStr,
                          package: response.data.packages,
                          signType: 'MD5',
                          paySign: response.data.paySign,
                          success(res) {
                            wx.hideLoading()
                            self.setData({
                              type: 1
                            })
                            wx.redirectTo({
                              url: "/pages/success/success?type=0",
                            })
                          },
                          fail(res) {
                            wx.hideLoading()
                            self.setData({
                              type: 1
                            })
                            wx.showToast({
                              title: '支付失败',
                              icon: 'none',
                            })
                            wx.switchTab({
                              url: '/pages/index/index'
                            })
                          }
                        })
                      } else {
                        wx.hideLoading()
                        wx.showToast({
                          title: response.data.resultNote,
                          icon: 'none',
                          duration: 2000
                        })
                      }
                    })
                  }
                })
              }
            }
          })
        }
      })
    }
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