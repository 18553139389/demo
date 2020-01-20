// pages/xiugaimima/xiugaimima.js
// 请求方法
const HTTP = require("../../utils/http-list.js");
const http = new HTTP();
var WxParse = require('../../wxParse/wxParse.js');

let gd = getApp().globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: '',
    phone: '',
    num: '',
    bed: '',
    coupon: '',
    list: {},
    total: 0,
    oldTotal: 0,
    content: '',
    id: '',
    ids: '',
    time: '',
    show: false,
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2019, 10, 1).getTime(),
    currentDate: new Date().getTime()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    gd.couponId = '';
    gd.amount = 0;
    var total = 0;
    let obj = {
      hotel: options.hotel,
      type: options.type,
      img: options.img,
      total: options.total,
      fang: options.fang,
      startDate: gd.startDate,
      endDate: gd.endDate,
      all: gd.total
    }
    http.showLoading().postD({
      cmd: "getNotice"
    }).then(res1 => {
      if (res1.data.result == 0) {
        // let cont = this.replaceSpecialChar(res1.data.content)
        that.setData({
          content: res1.data.content
        })
        WxParse.wxParse('article', 'html', that.data.content, that, 5);
        console.log(this.data.content)
        wx.hideLoading();
      }
    });
    total = options.total * gd.total;
    this.setData({
      list: obj,
      total: total,
      oldTotal: total,
      ids: options.ids,
      id: options.id
    })
  },

  replaceSpecialChar(url) {
    url = url.replace(/&quot;/g, '"');
    url = url.replace(/&amp;/g, '&');
    url = url.replace(/&lt;/g, '<');
    url = url.replace(/&gt;/g, '>');
    url = url.replace(/&nbsp;/g, ' ');
    url = url.replace(/&middot;/g, '·');
    url = url.replace(/&ldquo;/g, '“');
    url = url.replace(/&rdquo;/g, '”');
    console.log("转义字符", url);
    return url;
  },

  change(e) {
    let item = e.currentTarget.dataset.index;
    this.setData({
      itemIndex: item
    });
  },

  goDetail() {
    wx.navigateTo({
      url: '/pages/hotelDetail/hotelDetail'
    })
  },

  goTime() {
    this.setData({
      show: true
    })
  },

  goCoupon() {
    wx.navigateTo({
      url: '/pages/couponList/couponList?id=' + this.data.ids
    })
  },

  formatDate(now) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1 > 9 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1);
    var date = now.getDate() > 9 ? now.getDate() : '0' + now.getDate();
    var hour = now.getHours() > 9 ? now.getHours() : '0' + now.getHours();
    var minute = now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute;
  },

  getAll(begin, end) { // 开始日期和结束日期
    if (!begin || !end) { // 去除空的可能性
      return false;
    }
    // 在时间Date的原型中定义一个format方法
    Date.prototype.format = function() {
      var s = ""; // 定义一个字符串，目的，要时间格式按照我们的要求拼接
      var month = this.getMonth() + 1 > 9 ? this.getMonth() + 1 : '0' + (this.getMonth() + 1);
      var day = this.getDate() > 9 ? this.getDate() : '0' + this.getDate();
      s += this.getFullYear() + "-";
      s += month + "-";
      s += day;
      return s; // 得到的格式如 "2018-11-20" 
    }
    var ab = begin.split('-'); // 把日期参数分割，注意，如果以'/'连接，则分割'/'
    var ae = end.split('-');
    var db = new Date();
    db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]); // 返回符合UTC的时间格式
    var de = new Date();
    de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
    var unixDb = db.getTime();
    var unixDe = de.getTime();
    var arr = [];
    for (var k = unixDb; k <= unixDe;) {
      arr.push(new Date(parseInt(k)).format());
      k = k + 24 * 60 * 60 * 1000;
    }
    return arr; // 返回两个日期之间的所有日期数组。
  },

  onInput(event) {
    console.log(event)
    let d = new Date(event.detail);
    console.log(this.formatDate(d));
    this.setData({
      show: false,
      time: this.formatDate(d)
    });
  },

  onCancel() {
    this.setData({
      show: false
    });
  },

  goUser(e) {
    console.log(e)
    this.setData({
      user: e.detail.value
    })
  },

  goPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  goCar(e) {
    this.setData({
      num: e.detail.value
    })
  },

  goBed(e) {
    this.setData({
      bed: e.detail.value
    })
  },

  goSuc() {
    var self = this;
    if (this.data.user == "" || this.data.phone == "" || this.data.time == '') {
      wx.showToast({
        title: "请输入完整信息",
        icon: "none"
      })
      return;
    }

    if (!/^1[\d]{10}$/.test(this.data.phone)) {
      http.showToast("请输入正确的手机号");
      return;
    }

    if (this.data.total == 0) {
      http.showToast("价格错误");
      return;
    }

    let arr1 = this.getAll(gd.startDate, gd.endDate);
    arr1.pop();
    let arr2 = arr1.join(',');
    http.showLoading().postD({
      cmd: "saveHorder",
      roomDatilsId: this.data.id,
      name: this.data.user,
      phone: this.data.phone,
      uid: gd.userId,
      time: this.data.time,
      carTimes: this.data.num,
      startDate: gd.startDate,
      endDate: gd.endDate,
      times: arr2,
      userCouponId: gd.couponId,
      remarks: this.data.bed
    }).then(res1 => {
      console.log(res1);
      if (res1.data.result == 0) {
        wx.requestPayment({
          timeStamp: res1.data.timeStamp,
          nonceStr: res1.data.nonceStr,
          package: res1.data.packages,
          signType: 'MD5',
          paySign: res1.data.paySign,
          success(res2) {
            wx.hideLoading()
            wx.redirectTo({
              url: "/pages/hotelSuc/hotelSuc",
            })
          },
          fail(res2) {
            wx.hideLoading()
            wx.showToast({
              title: '支付失败',
              icon: 'none',
            })
            // wx.switchTab({
            //   url: '/pages/index/index'
            // })
          }
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 
   * @param {*} event 
   * 倒计时
   */
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (gd.amount) {
      let amount = '-' + gd.amount + '￥'
      this.setData({
        coupon: amount
      })

      let total = this.data.total - gd.amount;
      if (total <= 0) {
        total = 0
      }
      this.setData({
        total: total.toFixed(2)
      })
    } else {
      this.setData({
        coupon: '',
        total: this.data.oldTotal
      })
    }
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