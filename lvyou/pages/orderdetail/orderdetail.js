// pages/orderdetail/orderdetail.js
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
    id: "",
    list: [],
    show: false,
    bigImg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    http.showLoading().postD({
      cmd: "getOrderById",
      orderId: options.cid
    }).then(res => {
      if (res.data.result == 0) {
        wx.hideLoading();
        this.setData({
          id: options.cid,
          list: res.data
        })
        console.log(res.data)
      }
    })
  },
  quxiao(e) {
    wx.navigateTo({
      url: "/pages/tuikuanyuanyin/tuikuanyuanyin?id=" + e.target.dataset.id + "&type=1"
    })
  },
  ctk(e) {
    http.showLoading().postD({
      cmd: "saveRefundOrder",
      uid: gd.userId || "de8a58b195c5413e9792b41295c3e43c",
      orderId: e.target.dataset.id
    }).then(res => {
      if (res.data.result == 0) {
        http.showToast("已催款");
      }
    })
  },
  del(e) {
    wx.showModal({
      title: '删除',
      content: '确认删除此订单吗',
      success(res) {
        if (res.confirm) {
          http.showLoading().postD({
            cmd: "deleteOrder",
            id: e.target.dataset.id
          }).then(res => {
            if (res.data.result == 0) {
              wx.showToast("删除成功")
              wx.switchTab({
                url: "/pages/dingdanlist/dingdanlist"
              })
            }
          })
        } else if (res.cancel) {
  
        }
      }
    });
  },
  qutui(e) {
    wx.navigateTo({
      url: "/pages/tuikuanyuanyin/tuikuanyuanyin?id=" + e.target.dataset.id + "&type=2"
    })
  },
  kfp(e) {
    wx.navigateTo({
      url: "/pages/kaipiaoxinxi/kaipiaoxinxi?id=" + e.target.dataset.id
    })
  },
  qupay(e) {
    wx.navigateTo({
      url: `/pages/zhifufangshi/zhifufangshi?id=${e.currentTarget.dataset.id}&price=${e.currentTarget.dataset.money}`
    })
  },
  bigImg(e) {
    console.log(e.currentTarget.dataset.index)
    this.setData({
      show: true
    });
    let imgSrc = this.data.list.dataList[e.currentTarget.dataset.index].detailsList[0].qrImage
    this.setData({
      bigImg: imgSrc
    });
  },
  onClose() {
    this.setData({
      show: false
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