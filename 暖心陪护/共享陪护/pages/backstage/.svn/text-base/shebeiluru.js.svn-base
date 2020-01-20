const baseInfo = require("../../utils/util.js").baseInfo;
var uid = "";

// pages/backstage/shebeiluru.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceNum: "", //设备编号
    yiyuanName: "", //医院名称
    yiyuanId: "", //医院id
    keshiName: "", //科室名称
    keshiId: "", //科室id
    fanghao: "", //房号
    chuanghao: "", //床号
    boxStatus: false, //医院弹框 false：默认关闭  true：打开弹框
    boxStatusKshi: false, //科室弹框 false：默认关闭  true：打开弹框
    fanhao:'',
    chao:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    uid = wx.getStorageSync("userinfo").uid;
    console.log("设备录入"+options.info)
    _this.setData({
      deviceNum: options.info
    });
    //设备之前有的话，显示之前的
    _this.yuan_shebei()
  },

  //获取房号
  getfang: function(e) {
    let _this = this;
    _this.setData({
      fanghao: e.detail.value
    });
  },

  //获取床号
  getchuang: function(e) {
    let _this = this;
    _this.setData({
      chuanghao: e.detail.value
    });
  },

  //提交数据
  submitbtn: function() {
    let _this = this;

    wx.request({
      url: baseInfo + "deviceEntry",
      data: {
        "uid": uid,
        "deviceNum": _this.data.deviceNum, //设备编号
        "hospitalId": _this.data.yiyuanId, //医院ID
        "departId": _this.data.keshiId, //科室ID
        "roomNo": _this.data.fanghao, //房号
        "bedNo": _this.data.chuanghao //床号
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log("--入库成功--", res);
        if (res.data.errorCode == "0") {
          var datas = res.data.body;

          wx.navigateTo({
            url: "./backstage"
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


  //设备已经有医院和科室了的话，就修改
  yuan_shebei:function(){
    var that=this;
    wx.request({
      url: baseInfo + "deviceInfo",
      data: {
        "uid": uid,
        "deviceNum": that.data.deviceNum, //设备编号
        "type":'1'
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("--入库成功--", res);
        if (res.data.errorCode == "0") {
          var datas = res.data.body;
          if (datas.hospitalName){
            that.setData({
              yiyuanName: datas.hospitalName,
              keshiName: datas.departName,
              fanhao: datas.roomNo,
              chao: datas.bedNo
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


  //医院--点击弹框列表 关闭弹框 覆盖数据
  clickYuan: function(e) {
    let _this = this;

    let i = e.currentTarget.dataset.yiid;
    let name = e.currentTarget.dataset.yiname;

    _this.setData({
      yiyuanName: name,
      yiyuanId: i,
      boxStatus: false
    });

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
      boxStatus: false,
      boxStatusKshi: false
    });
  },


  //科室--点击弹框列表 关闭弹框 覆盖数据
  clickshi: function(e) {
    let _this = this;

    let i = e.currentTarget.dataset.keid;
    let name = e.currentTarget.dataset.kename;

    _this.setData({
      keshiName: name,
      keshiId: i,
      boxStatusKshi: false
    });

  },

  //点击科室 弹出弹框列表
  getBoxKshi: function() {
    let _this = this;
    _this.setData({
      boxStatusKshi: true
    });

    wx.request({
      url: baseInfo + "departList",
      data: {
        "uid": uid,
        "hospitalId": _this.data.yiyuanId
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
            departList: datas.departList
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