const baseInfo = require("../../utils/util.js").baseInfo;
var uid = "";

var nowPage = 1,
  totalPage = 1,
  endrefush = 0;

// pages/wallet/details.js
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
    
    _this.getData(nowPage);
  },

  //获取页面数据
  getData: function(nowPage) {
    let _this = this;

    wx.request({
      url: baseInfo + "moneyMingxiList",
      data: {
        "uid": uid,
        "isYunwei": 0, //是否运维：0-否，1-是
        "nowPage": nowPage
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data.errorCode == "0") {
          var datas = res.data.body;
          console.log("--交易明细列表:--", datas);

          totalPage = datas.totalPage;
          if (nowPage >= totalPage) {
            endrefush = "1";
          }

          if (!datas.moneyMingxiList) {
            datas.moneyMingxiList = [];
          }

          if (nowPage == "1") {
            _this.setData({
              list: datas.moneyMingxiList
            })

          } else {
            let moreList = [];
            for (let i = 0; i < datas.moneyMingxiList.length; i++) {
              moreList.push(datas.moneyMingxiList[i])
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