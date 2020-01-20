const baseInfo = require("../../utils/util.js").baseInfo;
var uid = "";

Page({

  data: {
    userType: "", //0：客户端    1：运维
    oid: "" //订单id
  },

  onLoad: function(options) {
    let _this = this;
    uid = wx.getStorageSync("userinfo").uid;

    let info = options;

    console.log("接收信息:", info);

    if (info.type == "0") { //客户端

      _this.setData({
        userType: info.type,
        oid: info.oid
      });

    } else if (info.type == "1") { //运维

      _this.setData({
        userType: info.type,
        oid: info.oid
      });
    }

    _this.getData();
  },

  getData: function() {
    let _this = this;
    wx.request({
      url: baseInfo + "orderDetail",
      data: {
        oid: _this.data.oid //订单ID
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data.errorCode == "0") {
          var datas = res.data.body;
          console.log("--订单详情数据：:--", datas);

          _this.setData({
            infodata: datas.order
          });

        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg
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