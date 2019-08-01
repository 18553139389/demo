// pages/success/success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type1: false,
    type2: false,
    type3: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type == 0){
      this.setData({
        type1: true
      })
    } else if (options.type == 1){
      this.setData({
        type2: true
      })
    } else if (options.type == 2) {
      this.setData({
        type3: true
      })
    }
  },

  goList() {
    wx.reLaunch({
      url: "/pages/dingdanlist/dingdanlist",
    })
  },

  goCenter() {
    wx.reLaunch({
      url: "/pages/my/my",
    })
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