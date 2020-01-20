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
    tabs: ['全部', '未入住', '已入住', '已退款'],
    itemIndex: 0,
    list: [],
    page: 1,
    totalPage: 0,
    state: 0,
    show: true,
    text1: 0,
    text2: 0,
    text3: 0,
    text4: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    gd.items = 0;
    gd.status = 0;
    this.init();
  },

  change(e) {
    let item = e.currentTarget.dataset.index;
    if (this.data.itemIndex == item) {
      return;
    }
    this.setData({
      itemIndex: item
    });
    if (item == 0) {
      this.setData({
        state: 0
      })
    } else if (item == 1) {
      this.setData({
        state: 5
      })
    } else if (item == 2) {
      this.setData({
        state: 3
      })
    } else if (item == 3) {
      this.setData({
        state: 4
      })
    }
    this.init(this.data.state)
  },

  goDetail(e) {
    gd.items = this.data.itemIndex;
    gd.status = this.data.state;
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/orderDetails/orderDetails?id='+id
    })
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
    this.setData({
      itemIndex: gd.items,
    })
    this.init(gd.status);
  },

  init(state) {
    // this.setData({
    //   list: []
    // });
    if (state) {
      http.showLoading().postD({
        cmd: "getHorderList",
        uid: gd.userId,
        nowPage: this.data.page,
        status: state
      }).then(res1 => {
        console.log(res1);
        if (res1.data.result == 0) {
          wx.hideLoading();
          if (res1.data.dataList) {
            this.setData({
              list: res1.data.dataList,
              totalPage: res1.data.totalPage,
              show: true,
              text1: res1.data.number1,
              text2: res1.data.number2,
              text3: res1.data.number3,
              text4: res1.data.number4
            })
          } else {
            wx.hideLoading();
            this.setData({
              show: false
            })
          }
        }
      });
    } else {
      http.showLoading().postD({
        cmd: "getHorderList",
        uid: gd.userId,
        nowPage: this.data.page
      }).then(res1 => {
        console.log(res1);
        if (res1.data.result == 0) {
          wx.hideLoading();
          if (res1.data.dataList) {
            this.setData({
              list: res1.data.dataList,
              totalPage: res1.data.totalPage,
              show: true,
              text1: res1.data.number1,
              text2: res1.data.number2,
              text3: res1.data.number3,
              text4: res1.data.number4
            })
          } else {
            wx.hideLoading();
            this.setData({
              show: false
            })
          }
        }
      });
    }
  },

  addList(state) {
    if (state) {
      http.showLoading().postD({
        cmd: "getHorderList",
        uid: gd.userId,
        nowPage: this.data.page,
        status: state
      }).then(res1 => {
        console.log(res1);
        if (res1.data.result == 0) {
          let list = this.data.list;
          for (let i = 0; i < res1.data.dataList.length; i++) {
            list.push(res1.data.dataList[i])
          }
          this.setData({
            list: list
          })
          wx.hideLoading();
        }
      });
    } else {
      http.showLoading().postD({
        cmd: "getHorderList",
        uid: gd.userId,
        nowPage: this.data.page
      }).then(res1 => {
        console.log(res1);
        if (res1.data.result == 0) {
          let list = this.data.list;
          for (let i = 0; i < res1.data.dataList.length; i++) {
            list.push(res1.data.dataList[i])
          }
          this.setData({
            list: list
          });
          wx.hideLoading();
        }
      });
    }
  },

  scrollBootom() {
    let page = this.data.page;
    page++;
    console.log(page)
    if (page > this.data.totalPage) {
      return
    }
    this.setData({
      page: page
    });
    this.addList(this.data.state);
  },

  goBack() {
    wx.switchTab({
      url: '/pages/my/my'
    })
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