const baseInfo = require("../../utils/util.js").baseInfo;
var uid = "";

var hospitalId = ""; //医院id

var nowPage = 1,
  totalPage = 1,
  endrefush = 0;

// pages/backstage/debuggingJilu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contxt: "" //关键字
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    uid = wx.getStorageSync("userinfo").uid;
    
    hospitalId = options.hospitalId;
    console.log(hospitalId)
    _this.getData(_this.data.contxt, nowPage);
  },


  //获取页面数据
  getData: function(contxt, nowPage) {
    let _this = this;

    wx.request({
      url: baseInfo + "debugRecordList",
      data: {
        "uid": uid,
        "hospitalId": hospitalId, //医院ID
        "keyword": contxt, //关键词
        "nowPage": nowPage //当前页数
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data.errorCode == "0") {
          var datas = res.data.body;
          console.log("请求成功", datas);

          totalPage = datas.totalPage;
          if (nowPage >= totalPage) {
            endrefush = "1";
          }

          if (!datas.debugRecordList) {
            datas.debugRecordList = [];
          }

          if (nowPage == "1") {
            _this.setData({
              list: datas.debugRecordList
            })

          } else {
            let moreList = [];
            for (let i = 0; i < datas.debugRecordList.length; i++) {
              moreList.push(datas.debugRecordList[i])
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




  //获取关键字
  getInput: function(e) {
    let _this = this;
    _this.setData({
      contxt: e.detail.value
    });
  },

  //点击搜索
  searchbtn: function() {
    let _this = this;
    _this.getData(_this.data.contxt, nowPage);
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
      _this.getData(_this.data.contxt, nowPage);
    }
    console.log(nowPage)
    console.log(totalPage)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})