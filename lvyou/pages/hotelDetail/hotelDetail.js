// pages/xiugaimima/xiugaimima.js
// 请求方法
const HTTP = require("../../utils/http-list.js");
const http = new HTTP();

let gd = getApp().globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    current: 1,
    tabs: ['房型', '详情'],
    itemIndex: 0,
    activeNames: ['1'],
    str: '',
    str1: '',
    state: 0,
    btns: '',
    day1: '',
    day2: '',
    total: 0,
    list: {},
    id: '',
    ids: '',
    tit: '',
    lists: [],
    content: '',
    phone: '',
    lon: '',
    lat: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initDate();
    let id = options.id;
    let tit = options.tit;
    this.setData({
      id: id,
      tit: tit
    });
    this.init(id);
  },

  initDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    month = month > 9 ? month : '0' + month;
    day = day > 9 ? day : '0' + day;
    gd.startDate = year + '-' + month + '-' + day;

    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
    var year1 = date.getFullYear();
    var month1 = date.getMonth() + 1;
    var day1 = date.getDate();
    month1 = month1 > 9 ? month1 : '0' + month1;
    day1 = day1 > 9 ? day1 : '0' + day1;
    gd.endDate = year1 + '-' + month1 + '-' + day1;
    gd.total = 1;
  },

  replaceSpecialChar(url) {
    url = url.replace(/&quot;/g, '"');
    url = url.replace(/&amp;/g, '&');
    url = url.replace(/&lt;/g, '<');
    url = url.replace(/&gt;/g, '>');
    url = url.replace(/&nbsp;/g, ' ');
    url = url.replace(/&middot;/g,'·');
    url = url.replace(/&ldquo;/g, '“');
    url = url.replace(/&rdquo;/g, '”');
    url = url.replace(/&deg;/g, '°');
    console.log("转义字符", url);
    return url;
  },

  init(id) {
    http.showLoading().postD({
      cmd: "getHotelById",
      id: id
    }).then(res1 => {
      if (res1.data.result == 0) {
        console.log(res1);
        let text = this.replaceSpecialChar(res1.data.content);
        this.setData({
          list: res1.data,
          str: res1.data.introduction,
          content: text,
          phone: res1.data.phone,
          ids: res1.data.id,
          lon: res1.data.lon,
          lat: res1.data.lat
        });
        console.log(this.data.list);
        this.controls();
        wx.hideLoading();
      }
    });
  },

  goMap(e) {
    wx.navigateTo({
      url: '/pages/map/map?lon=' + this.data.lon + '&lat=' + this.data.lat + '&tit=' + this.data.tit
    })
  },

  change(e) {
    let item = e.currentTarget.dataset.index;
    this.setData({
      itemIndex: item
    });
  },

  goCall() {
    wx.makePhoneCall({
      phoneNumber: this.data.phone
    })
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },

  swiperChange(e) {
    this.setData({
      current: e.detail.current - 0 + 1
    })
  },

  controls() {
    let state = this.data.state;
    let str = this.replaceSpecialChar(this.data.str);
    if (str.length < 30) {
      this.setData({
        str1: str
      })
      return;
    }
    if (state == 0) {
      str = str.substring(0, 30) + '...';
      this.setData({
        str1: str,
        btns: "展开",
        state: 1
      })
    } else if (state == 1) {
      this.setData({
        str1: str,
        btns: "收起",
        state: 0
      })
    }
  },

  goDate() {
    wx.navigateTo({
      url: '/pages/date/date'
    })
  },

  goOrder(e) {
    let fang = e.currentTarget.dataset.fang;
    let type = e.currentTarget.dataset.type;
    let img = e.currentTarget.dataset.img;
    let total = e.currentTarget.dataset.total;
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/hotelPay/hotelPay?hotel=' + this.data.tit + '&fang=' + fang + '&type=' + type + '&img=' + img + '&total=' + total + '&id=' + id + '&ids=' + this.data.ids
    })
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
    var that = this;
    this.setData({
      day1: gd.startDate,
      day2: gd.endDate,
      total: gd.total
    });
    if (this.data.day1 == '' || this.data.day2 == '') {
      return;
    }
    http.showLoading().postD({
      cmd: "getHotelRoomList",
      id: this.data.id,
      startDate: this.data.day1,
      endDate: this.data.day2
    }).then(res1 => {
      console.log(res1);
      if (res1.data.result == 0) {
        if (res1.data.dataList) {
          for (let i = 0; i < res1.data.dataList.length;i++){
            res1.data.dataList[i].name = that.replaceSpecialChar(res1.data.dataList[i].name)
            res1.data.dataList[i].price = parseFloat(res1.data.dataList[i].price)
          }
          that.setData({
            lists: res1.data.dataList
          });
          wx.hideLoading();
          console.log('111')
        }
      }
    });
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