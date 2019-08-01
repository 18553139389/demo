// pages/kaipiaoxinxi/kaipiaoxinxi.js
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
    radio:"1",
    mes:{
    },
    id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id:options.id
    })
  },
  onChange(e){
    console.log(e)
    this.setData({
      radio:e.detail
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  setval(e){
    console.log(e)
    let key=`mes.${e.currentTarget.dataset.name}`
    this.setData({
      [key]:e.detail
    })
  },
  sub(){
    if(Object.keys(this.data.mes).length!=6){
      http.showToast("请填写详细信息");
      return;
    }
    let data=this.data.mes;
    data.cmd="saveInvoice";
    data.uid=gd.userId || "de8a58b195c5413e9792b41295c3e43c";
    data.orderId=this.data.id;
    data.type=this.data.radio-0
    http.showLoading().postD(data).then(res=>{
      if(res.data.result==0){
        http.showToast("上传成功")
        setTimeout(() =>{
          wx.navigateBack({
            delta: 1
          })
        },500)
      }
    })
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