const baseInfo = require("../../utils/util.js").baseInfo;
var uid = "";

var orderId = ""; //订单号
var balance = ""; //余额
var payMoney = ""; //实付金额
var payFlag = "";  //计费类型：0-时段计费，1-小时计费，2-按天计费
var isSuffice="";//判断是否在时段内 0否 1是
var typeSataus;  //这个是判断是否是运维 0是普通用户 1是运维
Page({

  data: {
    payStatus: false, //选择支付方式后 才能去支付
    payMethod: "" //支付方式：0-余额支付，1-微信支付
  },

  onLoad: function(options) {
    let _this = this;
    uid = wx.getStorageSync("userinfo").uid;
    isSuffice = options.isSuffice;
    orderId = options.orderId;
    balance = options.balance;
    payMoney = options.payMoney;
    payFlag = options.payType;
    typeSataus = options.typeSataus;
    _this.setData({
      balance: balance,
      payMoney: payMoney,
      typeSataus: typeSataus //是否是运维
    });

    console.log("下单传入的数据：", options);
  },

  //跳转-支付成功页面
  opencompay: function() {
    let _this = this;
    wx.showLoading({
      title: '加载中',
    })
    if (_this.data.payStatus) {
        if (isSuffice=='0'){
          //不在时段内支付
          wx.request({
            url: baseInfo + "buyCardPay",
            data: {
              "uid": uid, //用户ID
              "orderId": orderId, //订单ID
              "payMoney": payMoney, //实付金额
              "payMethod": _this.data.payMethod //支付方式：0-余额支付，1-微信支付
            },
            dataType: "json",
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log("--支付成功：--", res);
              if (res.data.errorCode == "0") {
                let datas = res.data.body;
                if (_this.data.payMethod == '1') { //微信支付
                  wx.requestPayment({
                    timeStamp: datas.timeStamp,
                    nonceStr: datas.nonceStr,
                    package: datas.package,
                    signType: datas.signType,
                    paySign: datas.paySign,
                    success(res_pay) {
                      //发起支付成功
                      console.log("支付成功：" + res_pay);
                      //关闭加载框
                      wx.hideLoading();
                      setTimeout(function () {
                        wx.redirectTo({
                          url: "./completePay?departId=" + datas.departId + '&orderId=' + orderId + '&typeSataus=' + typeSataus
                        });
                      }, 1000);
                    },
                    fail(res_pay) {
                      //关闭加载框
                      wx.hideLoading();
                      //发起支付失败
                      console.log("发起支付失败：" + res_pay);
                    }
                  })
                } else {//余额支付
                  wx.hideLoading();
                  wx.showToast({
                    icon: 'success',
                    title: res.data.msg,
                    duration: 2000
                  })
                  wx.redirectTo({
                    url: "./completePay?departId=" + datas.departId + '&typeSataus=' + typeSataus + '&orderId=' + orderId
                  });
                }


                // setTimeout(function() {
                //   wx.navigateTo({
                //     url: "./completePay"
                //   });
                // }, 1000);

              } else {
                wx.showToast({
                  icon: 'none',
                  title: res.data.msg
                })
              }
            }
          })
        }else{
          wx.request({
            url: baseInfo + "orderPay",
            data: {
              "uid": uid, //用户ID
              "orderId": orderId, //订单ID
              "payMoney": payMoney, //实付金额
              "payMethod": _this.data.payMethod //支付方式：0-余额支付，1-微信支付
            },
            dataType: "json",
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log("--支付成功：--", res);
              if (res.data.errorCode == "0") {
                let datas = res.data.body;
                console.log('支付页面获取到的设备mac:' + datas.macAddr);
                if (_this.data.payMethod == '1') { //微信支付
                  wx.requestPayment({
                    timeStamp: datas.timeStamp,
                    nonceStr: datas.nonceStr,
                    package: datas.package,
                    signType: datas.signType,
                    paySign: datas.paySign,
                    success(res_pay) {
                      //发起支付成功
                      console.log("支付成功：" + res_pay);
                      //关闭加载框
                      wx.hideLoading();
                      setTimeout(function () {
                        wx.redirectTo({
                          url: "./completePay?departId=" + datas.departId + "&macAddr=" + datas.macAddr + '&typeSataus=' + typeSataus + '&orderId=' + orderId
                        });
                      }, 1000);
                    },
                    fail(res_pay) {
                      //关闭加载框
                      wx.hideLoading();
                      //发起支付失败
                      console.log("发起支付失败：" + res_pay);
                    }
                  })
                } else {//余额支付
                  wx.hideLoading();
                  wx.showToast({
                    icon: 'success',
                    title: res.data.msg,
                    duration: 2000
                  })
                  wx.redirectTo({
                    url: "./completePay?departId=" + datas.departId + "&macAddr=" + datas.macAddr + '&typeSataus=' + typeSataus + '&orderId=' + orderId
                  });
                }


                // setTimeout(function() {
                //   wx.navigateTo({
                //     url: "./completePay"
                //   });
                // }, 1000);

              } else {
                wx.showToast({
                  icon: 'none',
                  title: res.data.msg
                })
              }
            }
          })
        }
        
     
    } else {
      wx.showToast({
        icon: 'none',
        title: "请选择支付方式"
      })
    }


  },

  //选择支付方式
  radioChange: function(e) {
    let _this = this;
    _this.setData({
      payStatus: true,
      payMethod: e.detail.value
    });
    console.log('支付方式为：', e.detail.value)
  },




  //获取fromid
  gorRunnerLobby: function (e) {
    console.log(e);
    var that = this;
    // that.setData({
    //   fid: e.detail.formId
    // })
    this.formid(e.detail.formId)

  },

  formid: function (id) {
    var that = this;
    console.log(id)
    // console.log(that.data.fid)
    wx.request({
      url: baseInfo + "saveFormID",
      method: "get",
      data: {
        "uid": uid, //用户ID
        "formId": id //提交formid 用于推送
      },
      dataType: "json",
      header: {
        'Content-Type': 'application/json',
      },
      success: function (datas) {
        console.log(datas);
        if (datas.data.errorCode == "0") {


        } else {
          wx.showToast({
            icon: 'none',
            title: datas.resultNote
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