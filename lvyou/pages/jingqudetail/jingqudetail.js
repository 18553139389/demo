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
        res.data.url1 = this.replaceSpecialChar(res.data.url1)
        res.data.url2 = this.replaceSpecialChar(res.data.url2)
        this.setData({
          dataList:res.data,
          image: res.data.image
        })
      }
    })
  },
  replaceSpecialChar(url) {
    url = url.replace(/&quot;/g, '"');
    url = url.replace(/&amp;/g, '&');
    url = url.replace(/&lt;/g, '<');
    url = url.replace(/&gt;/g, '>');
    url = url.replace(/&nbsp;/g, ' ');
    url = url.replace(/&middot;/g, '·');
    url = url.replace(/&ldquo;/g, '“');
    url = url.replace(/&rdquo;/g, '”');
    url = url.replace(/&deg;/g, '°');
    url = url.replace(/&mdash;/g, '~');
    console.log("转义字符", url);
    return url;
  },
  swiperChange(e){
    this.setData({
      current:e.detail.current-0+1
    })
  },
  golist(e){
    console.log(e)
    gd.tao=this.data.dataList.skuList[e.currentTarget.dataset.ind-0].skuCateList;
    console.log(gd.tao)
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