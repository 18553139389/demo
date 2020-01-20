// pages/xiugaimima/xiugaimima.js
// 请求方法
const HTTP = require("../../utils/http-list.js");
const http = new HTTP();

let gd = getApp().globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lists: [],
    list: [],
    page: 1,
    totalPage: 0,
    show: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init();
  },

  init() {
    let nums = 0;
    http.postD({
      cmd: "getTimeZoneList"
    }).then(res1 => {
      if (res1.data.result == 0) {
        console.log(res1);
        if (res1.data.dataList) {
          let list = res1.data.dataList;
          for (let i = 0; i < list.length; i++) {
            list[i].state = 0
          }
          http.showLoading().postD({
            cmd: "getCouponList",
            uid: gd.userId,
            nowPage: this.data.page
          }).then(res2 => {
            console.log(res2);
            if (res2.data.result == 0) {
              if (res2.data.dataList) {
                for (let i = 0; i < list.length; i++) {
                  if (res2.data.zoneId == list[i].id) {
                    list[i].state = 1;
                    nums = i;
                    for (let j = 0; j < nums; j++) {
                      list[j].state = 0;
                    }
                    for (let k = nums + 1; k < list.length; k++) {
                      list[k].state = 2;
                    }
                  }
                }
                this.setData({
                  list: list,
                  lists: res2.data.dataList,
                  totalPage: res2.data.totalPage,
                  show: true
                });
                wx.hideLoading();
              }else{
                for (let i = 0; i < list.length; i++) {
                  if (res2.data.zoneId == list[i].id) {
                    list[i].state = 1;
                    nums = i;
                    for (let j = 0; j < nums; j++) {
                      list[j].state = 0;
                    }
                    for (let k = nums + 1; k < list.length; k++) {
                      list[k].state = 2;
                    }
                  }
                }
                this.setData({
                  list: list,
                  show: false
                })
                wx.hideLoading();
              }
            }
          });
        }
      }
    });
  },

  addList() {
    http.showLoading().postD({
      cmd: "getCouponList",
      uid: gd.userId,
      nowPage: this.data.page
    }).then(res1 => {
      if (res1.data.result == 0) {
        let lists = this.data.lists;
        for (let i = 0; i < res1.data.dataList.length; i++) {
          lists.push(res1.data.dataList[i])
        }
        this.setData({
          lists: lists
        })
        wx.hideLoading();
      }
    });
  },

  goCoupon(e) {
    let id = e.currentTarget.dataset.id;
    http.postD({
      cmd: "getCoupon",
      uid: gd.userId,
      id: id
    }).then(res2 => {
      if (res2.data.result == 0) {
        this.setData({
          page: 1
        })
        this.init();
      }
    });
  },

  scrollBootom() {
    let page = this.data.page;
    page++;
    if (page > this.data.totalPage) {
      return
    }
    this.setData({
      page: page
    });
    this.addList(this.data.state);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 
   * @param {*} event 
   * 倒计时
   */
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