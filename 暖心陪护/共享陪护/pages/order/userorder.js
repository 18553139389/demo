const baseInfo = require("../../utils/util.js").baseInfo;
var uid = "";

var nowPage = 1,
  totalPage = 1,
  endrefush = 0;

Page({


  data: {
    contxt: "", //关键字
    tab_index: 0 //tab默认index 类型：0-使用中，1-已完成
  },


  onLoad: function(options) {
    let _this = this;
    uid = wx.getStorageSync("userinfo").uid;

    _this.getData(0, _this.data.contxt, nowPage);
  },

  // 1.0 tab切换
  clickTabar: function(e) {
    var _this = this;
    var i = e.currentTarget.dataset.tab; //获取自定义的 data-tab 值

    //重新赋值
    _this.setData({
      tab_index: i
    });

    _this.getData(i, _this.data.contxt, nowPage);

  },

  //点击进入 详情页面
  openDetial: function(e) {
    let _this = this;
    let oid = e.currentTarget.dataset.oid;
    wx.navigateTo({
      url: "./orderdetail?type=0&oid=" + oid
    });
  },

  //扫码关锁
  opensaoma: function () {
    var _this = this;
    wx.openBluetoothAdapter({
      success(res) {
        //成功
          wx.scanCode({
            success(res) {
              //截取二维码url中的设备编号
              let info = res.result.split("=")[1];
              console.log(info)
              wx.request({
                url: baseInfo + "scanCode",
                method: "get",
                data: {
                  "uid":uid, //用户ID
                  "deviceNum": info, //设备编号   
                  "type": "1"
                },
                dataType: "json",
                header: {
                  'Content-Type': 'application/json',
                },
                success: function (datas) {
                  console.log("扫码时判断设备：" + JSON.stringify(datas));
                  if (datas.data.errorCode == "0") {
                    if (datas.data.body.isCurrentUse == "1") {
                      wx.navigateTo({
                        url: "../scanCode/scanLock?deviceNum=" + info
                      });
                    } else {
                      wx.showToast({
                        icon: 'none',
                        title: '暂无与该设备匹配的订单'
                      })
                    }
                  } else {
                    wx.showToast({
                      icon: 'none',
                      title: datas.resultNote
                    })
                  }
                }
              })
            }
          })

      },
      fail(res) {
        console.log("当前蓝牙状态：" + res.errCode);
        if (res.errCode == '10001') {
          wx.showModal({
            title: '提示',
            content: '请先打开手机蓝牙~~',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    })

  },
  //获取页面数据
  getData: function(tab_index, keyword, nowPage) {
    let _this = this;

    wx.request({
      url: baseInfo + "orderList",
      data: {
        "uid": uid, //用户ID
        "type": tab_index, //类型：0-使用中，1-已完成
        "keyword": keyword, //关键词（搜索订单时用）
        "isYunwei": 0, //是否运维：0-否，1-是
        // "hospitalId": "", //医院ID（是运维时必传）
        "nowPage": nowPage //当前页数（10个每页）
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

          if (!datas.orderList) {
            datas.orderList = [];
          }

          if (nowPage == "1") {
            _this.setData({
              list: datas.orderList
            })

          } else {
            let moreList = [];
            for (let i = 0; i < datas.orderList.length; i++) {
              moreList.push(datas.orderList[i])
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

  //搜索
  searchBtn: function() {
    let _this = this;

    _this.getData(_this.data.tab_index, _this.data.contxt, nowPage);
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
      _this.getData(_this.data.tab_index, _this.data.contxt, nowPage);
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