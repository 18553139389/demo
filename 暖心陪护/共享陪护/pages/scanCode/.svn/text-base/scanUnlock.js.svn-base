const baseInfo = require("../../utils/util.js").baseInfo;
var uid = "";

Page({

  data: {
    deviceNum: "" //输入的设备编号
  },

  onLoad: function(options) {
    let _this = this;
    console.log(wx.getStorageSync("userinfo"))
    uid = wx.getStorageSync("userinfo").uid;
  },


  //点击下一步
  submit: function() {
    let _this = this;

    if (_this.data.deviceNum.length > 0) {
      wx.request({
        url: baseInfo + "payInfoPage",
        method: "get",
        data: {
          "uid": uid, //用户ID
          "deviceNum": _this.data.deviceNum //设备编号           
        },
        dataType: "json",
        header: {
          'Content-Type': 'application/json',
        },
        success: function (datas) {
          console.log(datas);
          if (datas.data.errorCode=="0"){
            _this.panduanSeBei();//判断该设备状态
          }else{//根据设备编号找不到该设备
            wx.showToast({
              icon: 'none',
              title: datas.data.msg
            })
          }
          
        }})


     
    } else {
      wx.showToast({
        icon: 'none',
        title: "请输入正确的设备编号"
      })
    }
  },
  //判断设备状态
  panduanSeBei:function(){
    let _this = this;
    console.log("设备状态")
    wx.request({
      url: baseInfo + "scanCode",
      method: "get",
      data: {
        "uid": uid, //用户ID
        "deviceNum": _this.data.deviceNum, //设备编号 
        "type":"0"      //type 0 是开锁    
      },
      dataType: "json",
      header: {
        'Content-Type': 'application/json',
      },
      success: function (datas) {
        console.log("扫码时判断设备：" + JSON.stringify(datas));
        if (datas.data.errorCode == "0") {
          if (datas.data.body.isOpen == "1") {
            wx.showToast({
              icon: 'none',
              title: '该设备正在使用中'
            })
          } else {
            wx.navigateTo({
              url: "../pay/scanCodePay?deviceNum=" + _this.data.deviceNum + "&typeSataus=0"
            });
          }
        } else {
          wx.showToast({
            icon: 'none',
            title: datas.data.msg
          })
        }
      }
    })
  },

  //获取输入的设备编号
  getinput: function(e) {
    var _this = this;
    _this.setData({
      deviceNum: e.detail.value
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