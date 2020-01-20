const baseInfo = require("../../utils/util.js").baseInfo;
var uid = "";

// pages/wallet/recharge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moneyNum: "" //金额数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    uid = wx.getStorageSync("userinfo").uid;
  },





  clickrecharge: function() {
    wx.showLoading({
      title: '加载中...',
    })

    let _this = this;
    let moneyNum = Number(_this.data.moneyNum);
    if (moneyNum > 0) {
      wx.request({
        url: baseInfo + "recharge",
        data: {
          "uid": uid,
          "money": _this.data.moneyNum
        },
        dataType: "json",
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          console.log("请求成功", res);
          wx.hideLoading();
          if (res.data.errorCode == "0") {
             var datas = res.data.body;

            // _this.setData({
            //   balance: datas.balance
            // });
            wx.requestPayment({
              timeStamp: datas.timeStamp,
              nonceStr: datas.nonceStr,
              package: datas.package,
              signType: datas.signType,
              paySign: datas.paySign,
              success(res_pay) { 
                //发起支付成功
                console.log("支付成功："+res_pay);
                wx.navigateBack({
                  delta: 1
                })
              },
              fail(res_pay) {
                //发起支付失败
                console.log("发起支付失败："+res_pay);
               }
            })
            /** 
            wx.showToast({
              icon: 'none',
              title: res.data.msg
            })

            setTimeout(function() {
              wx.navigateTo({
                url: "./wallet"
              });
            }, 1000);
            */
          } else {
            wx.showToast({
              icon: 'none',
              title: res.data.msg
            })
          }
        }
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: "请先输入金额"
      })
    }
  },


  //获取输入的金额数字
  getmoney: function(e) {
    var _this = this;
    var reg = /^[0-9]*$/;
    if (e.detail.value == 0) {
      wx.showToast({
        title: '请输入大于0的金额',
        icon: "none",
        duration: 2000
      })
    } else if (!reg.test(e.detail.value)) {
      wx.showToast({
        title: '请输入数字',
        icon: "none",
        duration: 2000
      })
    }else{
      _this.setData({
        moneyNum: e.detail.value
      });
    }
    
    console.log(_this.data.moneyNum);
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