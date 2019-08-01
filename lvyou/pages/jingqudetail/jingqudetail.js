// pages/jingqudetail/jingqudetail.js
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
    show1:false,
    show2:false,
    dataList:[],
    current:1,
    image: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    http.showLoading().postD({
      cmd: "getGoodsById",
		  id:options.id,
      uid: gd.userId
    }).then(res=>{
      if(res.data.result==0){
        wx.hideLoading();
        console.log(res)
        this.setData({
          dataList:res.data,
          image: res.data.image
        })
      }
    })
  },
  swiperChange(e){
    this.setData({
      current:e.detail.current-0+1
    })
  },
  golist(e){
    console.log(e)
    gd.tao=this.data.dataList.skuList[e.currentTarget.dataset.ind-0].skuCateList;
    let name = e.currentTarget.dataset.name
    wx.navigateTo({
      url:"/pages/xuanzemenpiao/xuanzemenpiao?img=" + this.data.image + '&name=' + name
    })
  },
  onClose(){
    this.setData({
      show1:false,
      show2:false
    })
  },
  showTip(e){
    let i=e.currentTarget.dataset.i
    let k=`show${i}`
    this.setData({
      [k]:true
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