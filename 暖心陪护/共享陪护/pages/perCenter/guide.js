const baseInfo = require("../../utils/util.js").baseInfo;
var uid = "";

// pages/perCenter/guide.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    uid = wx.getStorageSync("userinfo").uid;
    
    _this.getData();
  },

  //获取数据
  getData: function() {
    let _this = this;

    wx.request({
      url: baseInfo + "userGuideList",
      data: {},
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data.errorCode == "0") {
          var datas = res.data.body;
          console.log("--用户指南列表:--", datas);

          _this.setData({
            info: datas.userGuideList
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


  //点击列表进去详情
  openguideDetail: function(e) {
    let _this = this;
    var content = e.currentTarget.dataset.cons;
    console.log("详情内容："+content);
    wx.setStorageSync('content', content)
    wx.navigateTo({
      url: "./guideDetail"
    });
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