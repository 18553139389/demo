// pages/qupiaoren/qupiaoren.js
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
    radio:['0'],
    people:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http.showLoading().postD({
      cmd:"getCollectorList",
		  uid:gd.userId || "de8a58b195c5413e9792b41295c3e43c",
    }).then(res=>{
      console.log(res)
      if(res.data.result==0){
        wx.hideLoading();
        if (res.data.dataList){
          this.setData({
            people: res.data.dataList
          })
        }
      }
    })
  },
  onChange(e){
    this.setData({
      radio:e.detail
    })
    console.log(this.data.radio)
  },
  ok(){
    let people = []
    for (var i = 0; i < this.data.radio.length; i++){
      people.push(this.data.people[this.data.radio[i]])
    }
    gd.piao=people
    console.log(gd.piao)
    wx.navigateBack({
      delta:1
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