// pages/sousuo/sousuo.js
// 请求方法
const HTTP = require("../../utils/http-list.js");
const http = new HTTP();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList:[],
    currentVal:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onSearch(e){
    if(this.data.currentVal==""){
      http.showToast("请输入搜索内容");
      return;
    }
    if(!wx.getStorageSync("search")){
      wx.setStorageSync("search",[]);
    }
    let store=wx.getStorageSync("search");
    console.log(store.indexOf(this.data.currentVal) == -1)
    if(store.indexOf(this.data.currentVal)==-1){
      store.push(this.data.currentVal);
    }
    this._goList(this.data.currentVal,()=>{
      wx.setStorageSync("search", store)
    });
    
    
  },
  setSearch(e){
    // console.log(e)
    this.setData({
      currentVal:e.detail
    })
  },
  clearList(){
    if (wx.getStorageSync("search")){
      wx.setStorageSync('search',[]);
      this.setData({
        searchList:[]
      })
    }
  },
  gotoList(e){
    let t=e.currentTarget.dataset.t;
    this._goList(t)
  },
  _goList(name,callback){
    wx.navigateTo({
      url:"/pages/xiangmuliebiao/xiangmuliebiao?name="+name,
      success:callback
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
    let store = wx.getStorageSync("search") ? wx.getStorageSync("search") : [];
    this.setData({
      searchList: store
    })
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