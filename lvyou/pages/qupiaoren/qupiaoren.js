// pages/qupiaoren/qupiaoren.js
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
    radio:['0'],
    people:[],
    startX: 0,
    delBtnWidth: "15%",
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    http.showLoading().postD({
      cmd: "getCollectorList",
      uid: gd.userId || "de8a58b195c5413e9792b41295c3e43c",
    }).then(res => {
      console.log(res)
      if (res.data.result == 0) {
        wx.hideLoading();
        if (res.data.dataList) {
          for (let i = 0; i < res.data.dataList.length;i++){
            res.data.dataList[i].state = 0
          }
          this.setData({
            show: false,
            people: res.data.dataList
          })
          console.log(this.data.people)
        } else if (res.data.dataList == undefined) {
          self.setData({
            show: true
          })
        }
      }
    })
  },
  touchS: function (e) {
    console.log("touchS" + e);
    //判断是否只有一个触摸点
    if (e.touches.length == 1) {
      this.setData({
        //记录触摸起始位置的X坐标
        startX: e.touches[0].clientX
      });
    }
  },
  //触摸时触发，手指在屏幕上每移动一次，触发一次
  touchM: function (e) {
    console.log("touchM:" + e);
    var that = this
    if (e.touches.length == 1) {
      //记录触摸点位置的X坐标
      var moveX = e.touches[0].clientX;
      //计算手指起始点的X坐标与当前触摸点的X坐标的差值
      var disX = that.data.startX - moveX;
      //delBtnWidth 为右侧按钮区域的宽度
      var delBtnWidth = that.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "px";
        if (disX >= 50) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-50px";
        }
      }
      //获取手指触摸的是哪一个item
      var index = e.currentTarget.dataset.index;
      var list = that.data.people;
      //将拼接好的样式设置到当前item中
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        people: list
      });
    }
  },
  touchE: function (e) {
    console.log("touchE" + e);
    var that = this
    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX;
      var delBtnWidth = that.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > 25 ? "left:-" + delBtnWidth : "left:0px";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = that.data.people;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      that.setData({
        people: list
      });
    }
  },
  slide(e) {
    var that = this;
    var index = e.currentTarget.dataset.ind;
    var state = e.currentTarget.dataset.state;
    var delBtnWidth = that.data.delBtnWidth;
    var txtStyle = "left:-" + delBtnWidth;
    var list = that.data.people;
    //将拼接好的样式设置到当前item中
    if(state == 0){
      list[index].txtStyle = txtStyle;
      list[index].state = 1;
    }else{
      list[index].txtStyle = "left:0px";
      list[index].state = 0;
    }
    //更新列表的状态
    this.setData({
      people: list
    });
  },
  del(e){
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.ind;
    var that = this
    wx.showModal({
      title: '删除',
      content: '确认删除此取票人吗',
      success(res) {
        if (res.confirm) {
          http.showLoading().postD({
            cmd: "deleteCollector",
            uid: gd.userId,
            id: id
          }).then(res => {
            console.log(res)
            if (res.data.result == 0) {
              wx.hideLoading();
              http.showToast("删除成功");
              let list = that.data.people;
              list.splice(index,1);
              let piao = wx.getStorageSync('piao')
              for (let i = 0; i < piao.length; i++){
                if (id == piao[i].id){
                  piao.splice(i,1);
                }
              }
              wx.setStorageSync('piao', piao)
        
              if(list.length == 0){
                that.setData({
                  show: true
                })
              }
              //更新列表的状态
              that.setData({
                people: list
              });
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onChange(e){
    this.setData({
      radio:e.detail
    })
    console.log(this.data.radio)
  },
  ok(){
    let people = []
    for (var i = 0; i < this.data.radio.length; i++){
      people.push(this.data.people[this.data.radio[i]])
    }
    // gd.piao=people
    wx.setStorageSync('piao', people)
    console.log(gd.piao)
    wx.navigateBack({
      delta:1
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