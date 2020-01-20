const baseInfo = require("../../utils/util.js").baseInfo;
var uid = "";

var hospitalId = ""; //医院id

var nowPage = 1,
  totalPage = 1,
  endrefush = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contxt: "", //关键字
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
    
    hospitalId = options.hospitalId;
    console.log(hospitalId)

    _this.getData(_this.data.dateTime1, _this.data.dateTime2, _this.data.contxt, nowPage);
  },

  //获取页面数据
  getData: function(startDate, endDate, keyword, nowPage) {
    let _this = this;

    wx.request({
      url: baseInfo + "errorApplyRecord",
      data: {
        "uid": uid,
        "hospitalId": hospitalId,
        "startDate": startDate, //开始日期
        "endDate": endDate, //结束日期
        "keyword": keyword, //关键词（搜索时必传）
        "nowPage": nowPage
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data.errorCode == "0") {
          var datas = res.data.body;
          console.log("请求成功", datas);
          // return;

          totalPage = datas.totalPage;
          if (nowPage >= totalPage) {
            endrefush = "1";
          }

          if (!datas.errorApplyList) {
            datas.errorApplyList = []
          }

          if (nowPage == "1") {
            _this.setData({
              list: datas.errorApplyList
            })

          } else {
            let moreList = [];
            for (let i = 0; i < datas.errorApplyList.length; i++) {
              moreList.push(datas.errorApplyList[i])
            }
            console.log(moreList);

            _this.setData({
              list: moreList
            })
          }

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

    _this.getData(_this.data.dateTime1, _this.data.dateTime2, _this.data.contxt, nowPage);
  },

  //点击搜索关键字
  searchStr: function() {
    let _this = this;

    _this.getData(_this.data.dateTime1, _this.data.dateTime2, _this.data.contxt, nowPage);
  },

  //输入关键字
  inputtxt: function(e) {
    let _this = this;
    _this.setData({
      contxt: e.detail.value
    });

    _this.getData(_this.data.dateTime1, _this.data.dateTime2, _this.data.contxt, nowPage);
  },






  //点击列表 跳转到详情
  openrecordingdetial: function(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: "./recordingdetial?errorApplyId="+ id
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
    let _this = this;
    nowPage++;
    if (endrefush == "1") {
      wx.showToast({
        title: '没有更多了',
        icon: 'none',
        image: '',
        mask: true
      })
    } else {
      _this.getData(nowPage);
    }
    console.log(nowPage)
    console.log(totalPage)
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
      dateTime1: `${e.detail.value[0]}/${e.detail.value[1]}/${e.detail.value[2]}`,
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
      dateTime2: `${e.detail.value[0]}/${e.detail.value[1]}/${e.detail.value[2]}`,
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