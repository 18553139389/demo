// pages/xuanzemenpiao/xuanzemenpiao.js
const HTTP = require("../../utils/http-list.js");
const http = new HTTP();
//getApp()的数据
let gd = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectBox:0,
    dayStyle: [
      // { month: 'current', day: new Date().getDate(), color: 'white', background: '#AAD4F5' },
      { month: 'current', day: new Date().getDate(), color: 'white', background: '#BF931C' }
    ],
    nowData:"2019-03",
    chooseDate:"",
    datalist:[],
    id: '',
    price: 0,
    image: '',
    name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(gd)

    let date=new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth();
    let day=date.getDate()<10?'0'+date.getDate():date.getDate();
    this.setData({
      nowData:`${year}-${month}`,
      chooseDate: `${year}-${month}-${day}`,
      datalist:gd.tao,
      id: gd.tao[0].id,
      price: gd.tao[0].price,
      image: options.img,
      name: options.name
    })
    console.log(this.data.datalist)
    console.log(this.data.id)
  },
  //给点击的日期设置一个背景颜色
  dayClick: function (event) {
    let choose = event.detail;
    let chooseYear=choose.year;
    let chooseMonth=choose.month<10?"0"+choose.month:choose.month;
    let chooseDay=choose.day<10?"0"+choose.day:choose.day
    let date=new Date();
    let year=date.getFullYear();
    let month=date.getMonth()+1;
    let day=date.getDate();
    if (event.detail.year == year && event.detail.month == month && event.detail.day<day){
      http.showToast("请选择正确的日期")
      return;
    }
    let changeDay = `dayStyle[0].day`;
    let changeBg = `dayStyle[0].background`;
    this.setData({
      [changeDay]: chooseDay,
      [changeBg]: "#BF931C",
      chooseDate: `${chooseYear}-${chooseMonth}-${chooseDay}`
    })
  },
  prev(event){
    let choose = event.detail;
    let chooseYear = choose.currentYear;
    let chooseMonth = choose.currentMonth < 10 ? "0" + choose.currentMonth : choose.currentMonth;
    let chooseDay = this.data.dayStyle[0].day;
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (event.detail.currentYear == year && event.detail.currentMonth == month && chooseDay < day) {
      chooseDay = day < 10 ? "0" +day : day;
    }
    let changeDay = `dayStyle[0].day`;
    let changeBg = `dayStyle[0].background`;
    this.setData({
      [changeDay]: "",
      [changeBg]: "#BF931C",
      chooseDate: ""
    })
  },
  next: function (event) {
    let choose = event.detail;
    let chooseYear = choose.currentYear;
    let chooseMonth = choose.currentMonth < 10 ? "0" + choose.currentMonth : choose.currentMonth;
    let chooseDay = this.data.dayStyle[0].day;
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (event.detail.currentYear == year && event.detail.currentMonth == month) {
      chooseDay = day < 10 ? "0" + day : day;
    }
    let changeDay = `dayStyle[0].day`;
    let changeBg = `dayStyle[0].background`;
    this.setData({
      [changeDay]: "",
      [changeBg]: "#BF931C",
      chooseDate: ""
    })
    // this.setData({
    //   chooseDate: `${chooseYear}-${chooseMonth}-${chooseDay}`
    // })
  },
  getchange(e){
    this.setData({
      selectBox:e.detail.value,
      id: gd.tao[e.detail.value].id,
      price: gd.tao[e.detail.value].price
    })
    console.log(this.data.id)
  },
  gonext(){
    gd.time=this.data.chooseDate;
    wx.navigateTo({
      url:"/pages/dingdantianxie/dingdantianxie?id=" + this.data.id + "&price=" + this.data.price
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})