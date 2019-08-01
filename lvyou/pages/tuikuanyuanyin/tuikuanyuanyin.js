// pages/tuikuanyuanyin/tuikuanyuanyin.js
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
    radio:0,
    params:"",
    content:"",
    list:[]
  },
  onClick(e){
    this.setData({
      radio:e.currentTarget.dataset.name
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let data={}
    if(options.type==1){
      data.cmd="getCancelList"
    }else{
      data.cmd="getRefundList"
    }
    http.showLoading().postD(data).then(res=>{
      console.log(res)
      if(res.data.result==0){
        wx.hideLoading();
        this.setData({
          list:res.data.dataList
        })
      }
    })
    this.setData({
      params:options
    })
  },
  getc(e){
    this.setData({
      content:e.detail.value
    })
  },
  ok(){
    let data={}
    if(this.data.params.type==1){
      data.cmd="cancelOrder";
      data.uid=gd.userId || "de8a58b195c5413e9792b41295c3e43c";
      data.id=this.data.params.id
      data.cancelId=this.data.list[this.data.radio].id;
      data.content=this.data.content;
    }else{
      data.cmd="refundOrder";
      data.uid=gd.userId || "de8a58b195c5413e9792b41295c3e43c";
      data.id=this.data.params.id
      data.refundId=this.data.list[this.data.radio].id;
      data.content=this.data.content;
    }
    http.showLoading().postD(data).then(res=>{
      console.log(res)  
      if(res.data.result==0){
        wx.showToast("取消订单成功");
        wx.switchTab({
          url:"/pages/dingdanlist/dingdanlist"
        })
      }
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