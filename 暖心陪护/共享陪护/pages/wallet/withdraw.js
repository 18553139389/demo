const baseInfo = require("../../utils/util.js").baseInfo;
var uid = "";

// pages/wallet/withdraw.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value_data: "", //全部提现赋值
    balance: "", //url传入的余额
    moneyNum: "" //金额数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    uid = wx.getStorageSync("userinfo").uid;
    
    _this.setData({
      balance: options.balance
    });

    console.log("--传入的余额：--", options.balance);

  },



  //提交数据
  submit: function() {
    let _this = this;

    wx.request({
      url: baseInfo + "applyWithdraw",
      data: {
        "uid": uid,
        "money": _this.data.moneyNum
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data.errorCode == "0") {
          var datas = res.data.msg;
          console.log("--提现成功:--", datas);

          wx.showToast({
            icon: 'none',
            title: datas
          })

          setTimeout(function () {
            wx.navigateTo({
              url: "./wallet"
            });
          }, 1000);

        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg
          })
        }
      }
    })
  },

  //点击全部提现
  btntixian: function() {
    let _this = this;
    _this.setData({
      value_data: _this.data.balance,
      moneyNum: _this.data.balance
    });
  },


  //获取输入的金额数字
  getmoney: function(e) {
    var _this = this;
  //  var reg = new RegExp("^[0-9]*$");
    var reg =/^[0-9]*$/;
  //  console.log(reg(e.detail.value))
    if (e.detail.value == 0){
      wx.showToast({
        title: '请输入大于0的金额',
        icon: "none",
        duration: 2000
      })
    } else if (!reg.test(e.detail.value)){
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