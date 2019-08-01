// pages/gerenzhiliao/gerenzhiliao.js
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
    show: false,
    actions: [{
        name: '选项',
        id: "1111111"
      },
      {
        name: "职业者",
        id: "22222222"
      }
    ],
    icon: "",
    mes: "",
    selAction: "",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    http.showLoading().postD({
      cmd: "getLableList"
    }).then(res => {
      if (res.data.result == 0) {
        console.log(res)
        this.setData({
          actions: res.data.dataList
        })
      }
    })

    http.showLoading().postD({
      cmd: "getUserInfo",
      uid: gd.userId || "de8a58b195c5413e9792b41295c3e43c"
    }).then(res => {
      wx.hideLoading();
      if (res.data.result == 0) {
        this.setData({
          mes: res.data
        })
        console.log(res)
      }
    })
  },
  gophone() {
    wx.navigateTo({
      url: "/pages/xiugaishouji/xiugaishouji"
    })
  },
  getList() {
    this.setData({
      show: true
    })
  },
  upimg() {
    if (this.data.set == 2) {
      return;
    }
    wx.chooseImage({
      count: 1,
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: "https://xcx.huandugj.com/tourism/api/addimg",
          filePath: tempFilePaths[0],
          name: "file",
          formData: {
            uid: "de8a58b195c5413e9792b41295c3e43c"
          },
          success: (res) => {
            console.log(res)
            let icon = JSON.parse(res.data).object;
            console.log(icon)
            this.setData({
              "mes.icon": icon
            })
            console.log(this.data.mes.icon)
          }
        })
      }
    })
  },
  _setData() {
    let icon = this.data.mes.icon;
    let phone = this.data.mes.phone;
    let nickName = this.data.mes.nickName;
    let sex = this.data.mes.sex;
    let age = this.data.mes.age;
    let realName = this.data.mes.realName;
    let lableId = this.data.selAction.id ? this.data.selAction.id : ''
    if (age.length > 2 || age <= 0) {
      http.showToast("请输入1~99的数字")
      return
    }
    http.showLoading("正在修改").postD({
      cmd: "editUserInfo",
      uid: gd.userId || "de8a58b195c5413e9792b41295c3e43c",
      icon: icon, //
      phone: phone, //
      nickName: nickName, //
      sex: sex, //性别(1：男，0：女)
      age: age,
      realName: realName,
      lableId: lableId
    }).then((res) => {
      if (res.data.result == 0) {
        wx.hideLoading();
        wx.showToast({
          title: "修改成功",
          icon: "none",
          mask: true
        })
      }
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  onSelect(e) {
    this.setData({
      selAction: e.detail,
      show: false,
      "mes.lableName": e.detail.name
    })
  },
  setmes(e) {
    console.log(e)
    let key = `mes.${e.currentTarget.dataset.name}`
    this.setData({
      [key]: e.detail
    })
  },
  settel(e) {
    console.log(e)
    let key = `mes.${e.currentTarget.dataset.parentPhone}`
    this.setData({
      [key]: e.detail
    })
  },
  onChange(e) {
    console.log(e)
    this.setData({
      'mes.sex': e.detail
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  save() {
    this._setData();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function() {
    // http.showLoading().postD({
    //   cmd: "getUserInfo",
    //   uid: gd.userId || "de8a58b195c5413e9792b41295c3e43c"
    // }).then(res => {
    //   wx.hideLoading();
    //   if (res.data.result == 0) {
    //     this.setData({
    //       mes: res.data
    //     })
    //     console.log(res)
    //   }
    // })
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