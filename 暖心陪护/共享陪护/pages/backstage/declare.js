const baseInfo = require("../../utils/util.js").baseInfo;
var uid = "";

var hospitalId = ""; //医院id
var errorApplyId = ""; //故障申报id

var nowPage = 1,
  totalPage = 1,
  endrefush = 0;

// pages/backstage/declare.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    uid = wx.getStorageSync("userinfo").uid;
    
    hospitalId = options.hospitalId;
    console.log(hospitalId)
    _this.getData(nowPage);

  },

  //获取页面数据
  getData: function(nowPage) {
    let _this = this;

    wx.request({
      url: baseInfo + "errorApplyList",
      data: {
        "uid": uid,
        "hospitalId": hospitalId,
        "nowPage": nowPage
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(uid,hospitalId,)
        if (res.data.errorCode == "0") {
          var datas = res.data.body;
          console.log("请求成功", datas);

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

  //跳转到详情
  opendeclaredetailone: function(e) {
    let _this = this;
    let i = e.currentTarget.dataset.id;
    let wxresult = e.currentTarget.dataset.wxresult;
    console.log(i);
    if (wxresult == "0") { //未处理
      wx.navigateTo({
        url: "./declaredetailone?errorApplyId=" + i
      });
    } else if (wxresult == "1") { //未修好
      wx.navigateTo({
        url: "./declaredetailtwo?errorApplyId=" + i
      });
    } else if (wxresult == "2") { //已修好

    }

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

  }
})