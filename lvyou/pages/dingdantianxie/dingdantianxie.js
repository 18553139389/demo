// pages/dingdantianxie/dingdantianxie.js
// 请求方法
const HTTP = require("../../utils/http-list.js");
const http = new HTTP();

//getApp()的数据
let gd = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    // 选中取票人信息
    people: [],
    username: "",
    phone: "",
    icd: "",
    tao: "",
    total: "",
    id: '',
    price: '',
    tip: '',
    radio: '2'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for (let i = 0; i < gd.tao.length; i++) {
      if (gd.tao[i].cateName == '儿童票') {
        this.setData({
          tip: gd.tao[i].content
        })
      }
    }
    for(let i=0;i<gd.tao.length;i++){
      gd.tao[i]['num'] = 1
    }
    console.log(gd.tao)
    this.setData({
      tao: gd.tao,
      id: options.id,
      price: options.price
    })
    this._getTotal();
  },
  goTip() {
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: this.data.tip,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  changes(event) {
    console.log(event.detail)
    this.setData({
      radio: event.detail
    });
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  getmes(e) {
    let i = e.currentTarget.dataset.i;
    let k;
    if (i == 1) {
      k = `username`
    } else if (i == 2) {
      k = `phone`
    } else {
      k = `icd`
    }
    this.setData({
      [k]: e.detail
    })
  },
  onChange(e) {
    console.log(e)
    let k = 'tao[' + e.currentTarget.dataset.ind + '].num'
    this.setData({
      [k]: e.detail
    })
    console.log(gd.tao)
    this._getTotal();
  },
  _getTotal() {
    let total = 0;
    for (var i = 0; i < gd.tao.length; i++) {
      if (gd.tao[i].num > 0) {
        total += gd.tao[i].num * gd.tao[i].price
      }
    }
    total = this.data.people.length * total
    // gd.tao.forEach((item, index) => {
    //   let num = item.num ? item.num : 0
    //   console.log(parseFloat(item.price) * num)
    //   total = this.data.people.length * ((total - 0) + (parseFloat(item.price) * (num - 0)));
    //   console.log(this.data.people.length)
    //   console.log(total)
    // })
    this.setData({
      total: total
    })
  },
  add() {
    if (this.data.username == "" || this.data.phone == "" || this.data.icd == "") {
      http.showToast("请输入取票人完整信息")
      return
    }

    if (!/^1[\d]{10}$/.test(this.data.phone)) {
      http.showToast("请输入正确的手机号")
      return
    }

    if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.data.icd)) {
      http.showToast("身份证号不合法")
      return
    }

    let newPeople = {
      name: this.data.username,
      phone: this.data.phone,
      idCard: this.data.icd
    }

    http.showLoading().postD({
      cmd: "addCollector",
      uid: gd.userId,
      name: this.data.username, 
      phone: this.data.phone, 
      idCard: this.data.icd 
    }).then(res => {
      if (res.data.result == 0) {
        wx.hideLoading();
        let people = this.data.people;
        newPeople.id = res.data.id
        people.push(newPeople);
        for (var i = 0; i < people.length; i++) {
          people[i].idCard = people[i].idCard.substr(0, 10) + "****" + people[i].idCard.substr(14)
        }
        this.setData({
          people: people,
          username: "",
          phone: "",
          icd: ""
        })
        this._getTotal()
      }else{
        wx.hideLoading();
        http.showToast(res.data.resultNote);
      }
    })
  },
  golist() {
    wx.navigateTo({
      url: "/pages/qupiaoren/qupiaoren"
    })
  },
  showBox() {
    console.log(1)
    this.setData({
      show: true
    })
  },
  gocar() {
    if (this.data.people[0]) {
      var qupiaoid = [];
      this.data.people.forEach((item, index) => {
        qupiaoid.push(item.id);
      })
    } else {
      http.showToast("请选择取票人")
      return;
    }

    let piao = [];
    this.data.tao.forEach((item, index) => {
      if (item.num != 0 && item.num != undefined) {
        let m = {
          skuCateId: item.id,
          number: item.num
        }
        piao.push(m)
      }
    })
    for (var i = 0; i < piao.length; i++) {
      if (piao[i].number == 0) {
        piao.splice(i, 1)
      }
    }
    let that = this;
    http.showLoading("提交数据中").postD({
      cmd: "editCart",
      uid: gd.userId || "de8a58b195c5413e9792b41295c3e43c", //
      cartList: piao,
      collectorIds: qupiaoid, //
      time: gd.time + " 00:00:00",
      flag: that.data.radio
    }).then(res => {
      if (res.data.result == 0) {
        wx.hideLoading();
        http.showToast("加入购物车成功");
      }else{
        wx.hideLoading();
        http.showToast(res.data.resultNote);
      }
    })
  },
  buy() {
    if (this.data.people[0]) {
      var qupiaoid = [];
      this.data.people.forEach((item, index) => {
        qupiaoid.push(item.id);
      })
    } else {
      http.showToast("请选择取票人")
      return;
    }
    let piao = [];
    this.data.tao.forEach((item, index) => {
      if(item.num != 0 && item.num != undefined){
        let m = {
          skuCateId: item.id,
          number: item.num 
        }
        piao.push(m)
      }
    })
    for (var i = 0; i < piao.length; i++) {
      if (piao[i].number == 0) {
        piao.splice(i, 1)
      }
    }
    let that = this;
    http.showLoading("提交数据中").postD({
      cmd: "saveOrder",
      uid: gd.userId || "de8a58b195c5413e9792b41295c3e43c", //
      skuCateList: piao,
      collectorIds: qupiaoid,
      orderMoney: this.data.total,
      endTime: gd.time + " 00:00:00",
      flag: that.data.radio
    }).then(res => {
      console.log(res)
      if (res.data.result == 0) {
        wx.hideLoading()
        // if (res.data.type == 1) {
        //   http.showToast("请交纳押金")
        // } else {
        //   wx.navigateTo({
        //     url: "/pages/zhifufangshi/zhifufangshi?id=" + res.data.orderId + "&price=" + this.data.total
        //   })
        // }
        wx.navigateTo({
          url: "/pages/zhifufangshi/zhifufangshi?id=" + res.data.orderId + "&price=" + this.data.total
        })
      } else {
        wx.hideLoading()
        http.showToast(res.data.resultNote);
      }
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
    console.log(gd.piao)
    if (wx.getStorageSync('piao')) {
      this.data.people = [];
      let people = this.data.people;
      people = wx.getStorageSync('piao')
      console.log(people)
      for (var i = 0; i < people.length; i++) {
        people[i].idCard = people[i].idCard.substr(0, 10) + "****" + people[i].idCard.substr(14)
      }
      this.setData({
        people: people
      })
      this._getTotal()
    } else {
      if (!this.data.people[0]) {
        http.showToast("请添加取票人")
      }
    }
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