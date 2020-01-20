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
    username: "",
    phone: "",
    icd: "",
    list: [],
    ids: '',
    type: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    this.setData({
      type: options.type
    });
    if(options.type == 1){
      wx.setNavigationBarTitle({
        title: '旅客修改'
      })
      this.setData({
        ids: options.id
      })
      http.postD({
        cmd: "getCollectorList",
        uid: gd.userId,
      }).then(res => {
        if (res.data.result == 0) {
          if (res.data.dataList) {
            for (let i = 0; i < res.data.dataList.length; i++) {
              if (options.id == res.data.dataList[i].id) {
                self.setData({
                  username: res.data.dataList[i].name,
                  phone: res.data.dataList[i].phone,
                  icd: res.data.dataList[i].idCard
                })
              }
            }
          }
        }
      })
    }else{
      wx.setNavigationBarTitle({
        title: '添加旅客'
      })
    }
  },
  add() {
    if (this.data.username == "" || this.data.phone == "" || this.data.icd == "") {
      http.showToast("请输入取票人完整信息")
      return
    }

    if (!/^1[\d]{10}$/.test(this.data.phone)) {
      http.showToast("请输入正确的手机号")
      return
    }

    if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.data.icd)) {
      http.showToast("身份证号不合法")
      return
    }

    if(this.data.type == 1){
      http.postD({
        cmd: "editCollector",
        id: this.data.ids,
        name: this.data.username,
        phone: this.data.phone,
        idCard: this.data.icd
      }).then(res => {
        console.log(res)
        if (res.data.result == 0) {
          http.showToast("修改成功")
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 400)
        } else {
          http.showToast(res.data.resultNote)
        }
      })
    } else if (this.data.type == 2){
      let newPeople = {
        name: this.data.username,
        phone: this.data.phone,
        idCard: this.data.icd
      }

      http.showLoading().postD({
        cmd: "addCollector",
        uid: gd.userId,
        name: this.data.username,
        phone: this.data.phone,
        idCard: this.data.icd
      }).then(res => {
        if (res.data.result == 0) {
          http.showToast("添加成功")
          wx.hideLoading();
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 400)
        } else {
          wx.hideLoading();
          http.showToast(res.data.resultNote);
        }
      })
    }
  },
  getmes(e) {
    let i = e.currentTarget.dataset.i;
    let k;
    if (i == 1) {
      k = `username`
    } else if (i == 2) {
      k = `phone`
    } else {
      k = `icd`
    }
    this.setData({
      [k]: e.detail
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
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