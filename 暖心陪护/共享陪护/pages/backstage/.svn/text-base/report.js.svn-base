const baseInfo = require("../../utils/util.js").baseInfo;
var uid = "";

var hospitalId = ""; //医院id

// pages/backstage/report.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yiyuanName: "", //医院名称
    boxStatus: false, //医院弹框 false：默认关闭  true：打开弹框
    dateTime1: '', //开始日期
    dateTime2: '', //结束日期
    datePickerValue: ['', '', ''],
    datePickerValue2: ['', '', ''],
    datePickerIsShow: false,
    datePickerIsShow2: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    uid = wx.getStorageSync("userinfo").uid;

    console.log(options)

    hospitalId = options.hospitalId;

    _this.setData({
      yiyuanName: options.yiyuanName
    });

    _this.getData(_this.data.dateTime1, _this.data.dateTime2);
  },

  //获取数据
  getData: function(startDate, endDate) {
    let _this = this;

    wx.request({
      url: baseInfo + "tongjiTable",
      data: {
        "uid": uid,
        "hospitalId": hospitalId,
        "startDate": startDate, //开始日期
        "endDate": endDate //结束日期
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {

        if (res.data.errorCode == "0") {
          var datas = res.data.body;
          console.log("请求成功", datas);

          _this.setData({
            userinfo: datas,
            // yiyuanName: datas.hospitalName
          });

        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg
          })
        }
      }
    })
  },


  //点击搜索日期
  serachPack: function() {
    let _this = this;

    _this.getData(_this.data.dateTime1, _this.data.dateTime2);
  },


  //点击医院 弹出弹框列表
  getBoxmsk: function() {
    let _this = this;
    _this.setData({
      boxStatus: true
    });

    wx.request({
      url: baseInfo + "hospitalList",
      data: {
        "uid": uid
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data.errorCode == "0") {
          var datas = res.data.body;
          console.log("请求成功", datas);
          _this.setData({
            hospitalList: datas.hospitalList
          });

        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg
          })
        }
      }
    })

  },


  //点击弹框x  关闭弹框
  closeBox: function() {
    let _this = this;
    _this.setData({
      boxStatus: false
    });
  },


  //点击弹框列表 关闭弹框 覆盖数据
  clickYuan: function(e) {
    let _this = this;

    let i = e.currentTarget.dataset.yiid;
    let name = e.currentTarget.dataset.yiname;

    hospitalId = i;

    _this.setData({
      yiyuanName: name,
      boxStatus: false
    });

    _this.getData(_this.data.dateTime1, _this.data.dateTime2);
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

  },
  showDatePicker: function(e) {
    // this.data.datePicker.show(this);
    this.setData({
      datePickerIsShow: true,
    });
  },

  datePickerOnSureClick: function(e) {
    // console.log('datePickerOnSureClick');
    // console.log(e);
    this.setData({
      dateTime1: `${e.detail.value[0]}-${e.detail.value[1]}-${e.detail.value[2]}`,
      datePickerValue: e.detail.value,
      datePickerIsShow: false,
    });
  },

  datePickerOnCancelClick: function(event) {
    // console.log('datePickerOnCancelClick');
    // console.log(event);
    this.setData({
      datePickerIsShow: false,
    });
  },

  showDatePicker2: function(e) {
    // this.data.datePicker.show(this);
    this.setData({
      datePickerIsShow2: true,
    });
  },

  datePickerOnSureClick2: function(e) {
    // console.log('datePickerOnSureClick');
    // console.log(e);
    this.setData({
      dateTime2: `${e.detail.value[0]}-${e.detail.value[1]}-${e.detail.value[2]}`,
      datePickerValue2: e.detail.value,
      datePickerIsShow2: false,
    });
  },

  datePickerOnCancelClick2: function(event) {
    // console.log('datePickerOnCancelClick');
    // console.log(event);
    this.setData({
      datePickerIsShow2: false,
    });
  }
})