// pages/index/index.js
// 请求方法
const HTTP = require("../../utils/http-list.js");
const http = new HTTP();
const citys = require('../../utils/city.js');
var lists = []
// 地图转换
const map = require("../../utils/map.js");
//getApp()的数据
let gd = getApp().globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    showBox: true,
    address: "",
    page: 1,
    adList: [],
    cateGoryList: [],
    show: false,
    multiIndex: [0, 0],
    multiArray: [
      ['北京', '安徽', "福建", "甘肃", "广东", "广西", "贵州", "海南", "河北", "河南", "黑龙江", "湖北", "湖南", "吉林", "江苏", "江西", "辽宁", "内蒙古", "宁夏", "青海", "山东", "山西", "陕西", "上海", "四川", "天津", "西藏", "新疆", "云南", "浙江", "重庆", "香港", "澳门", "台湾"],
      ['北京']
    ],
    objectMultiArray: citys.objectMultiArray,
    uid: '',
    loading: false,
    page: 1,
    totalPage: 1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this
    if (options.scene) {
      this.setData({
        uid: options.scene
      })
      wx.login({
        success: (res) => {
          // 查看是否授权
          wx.getSetting({
            success: (res2) => {
              if (res2.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  success: (res1) => {
                    http.showLoading().postD({
                      cmd: "authorizationUser",
                      code: res.code,
                      userInfo: res1,
                      uid: self.data.uid
                    }).then(response => {
                      if (response.data.result == 0) {
                        wx.hideLoading()
                        gd.userId = response.data.uid;
                        wx.setStorage({
                          key: "uid",
                          data: response.data.uid
                        })
                        self._getind()
                      } else if (response.data.result == 2){
                        http.showToast(res.data.resultNote);
                        wx.reLaunch({
                          url: "/pages/user/user"
                        })
                      }
                    })
                  }
                })
              }
            }
          })
        }
      })
    }else{
      if (wx.getStorageSync('uid')) {
        gd.userId = wx.getStorageSync('uid')
        this._getind()
      } else {
        wx.reLaunch({
          url: "/pages/user/user"
        })
      }
    }
  },

  bindMultiPickerChange: function(e) {
    console.log(e.detail.value)
    let that = this
    gd.city = lists[e.detail.value[1]]
    that.setData({
      "multiIndex[0]": e.detail.value[0],
      "multiIndex[1]": e.detail.value[1],
      address: lists[e.detail.value[1]]
    })
    console.log(this.data.address)
    this.onShow();
  },

  bindMultiPickerColumnChange: function(e) {
    let that = this
    switch (e.detail.column) {
      case 0:
        lists = []
        for (var i = 0; i < that.data.objectMultiArray.length; i++) {
          if (that.data.objectMultiArray[i].parid == that.data.objectMultiArray[e.detail.value].regid) {
            lists.push(that.data.objectMultiArray[i].regname)
          }
        }
        that.setData({
          "multiArray[1]": lists,
          "multiIndex[0]": e.detail.value,
          "multiIndex[1]": 0
        })
    }
  },

  hiddenBox() {
    // this.showBox=true
    this.setData({
      showBox: true
    })
  },
  goText(e) {
    // wx.navigateTo({
    //   url: "/pages/text/text"
    // })
    let item = e.currentTarget.dataset.item
    let id = e.currentTarget.dataset.id
    let url = e.currentTarget.dataset.url
    if (item == 1) {
      console.log(id)
      wx.navigateTo({
        url: "/pages/jingqudetail/jingqudetail?id=" + url
      })
    } else if (item == 2) {
      wx.navigateTo({
        url: "/pages/text/text?url=" + url
      })
    }
  },
  gosearch() {
    wx.navigateTo({
      url: "/pages/sousuo/sousuo"
    })
  },
  _getind() {
    http.showLoading().postD({
      cmd: "getHomeData",
      uid: gd.userId || "de8a58b195c5413e9792b41295c3e43c",
    }).then(res => {
      if (res.data.result == 0) {
        wx.hideLoading()
        this.setData({
          adList: res.data.adList,
          cateGoryList: res.data.cateGoryList
        })
      }
    })
  },
  _getData() {
    http.showLoading().postD({
      cmd: "getGoodsList",
      id: "",
      cityId: "",
      nowPage: 1,
      name: ""
    })
  },
  tolower(e) {
    this.setData({
      loading: true
    })
    var page = this.data.page;
    var totalPage = this.data.totalPage
    page++
    this.setData({			
      page: page
    })
    console.log(totalPage)
    console.log(page)
    //加载分页数据
    if(page<=totalPage){
      http.postD({
        cmd: "getGoodsList",
        uid: gd.userId,
        cityId: this.data.address, //城市id
        nowPage: page, //
      }).then(res => {
        console.log(res)
        if (res.data.result == 0) {
          var allArr = [];
          var initArr = this.data.list ? this.data.list : [];
          var newArr = res.data.dataList
          allArr = initArr.concat(newArr);
          this.setData({
            loading: false,
            list: allArr
          })
        }
      })
    }else{
      console.log('没有数据了')
      this.setData({
        loading: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  gocity() {
    this.setData({
      show: true
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this._getind()
    console.log(gd.city)
    if (gd.city == "") {
      wx.getLocation({
        success: (res) => {
          map.getAddress(res.latitude, res.longitude, (res) => {
            let city = res.result.address_component.city
            city = city.substr(0, city.indexOf('市'))
            this.setData({
              address: city
            })
            http.showLoading().postD({
              cmd: "getGoodsList",
              uid: gd.userId,
              cityId: this.data.address, //城市id
              nowPage: 1, //
            }).then(res => {
              console.log(res)
              if (res.data.result == 0) {
                wx.hideLoading();
                this.setData({
                  list: res.data.dataList ? res.data.dataList : [],
                  totalPage: res.data.totalPage
                })
              }
            })
          })
        }
      })
    } else {
      this.setData({
        address: gd.city
      })
      http.showLoading().postD({
        cmd: "getGoodsList",
        uid: gd.userId || "de8a58b195c5413e9792b41295c3e43c",
        cityId: this.data.address, //城市id
        nowPage: 1, //
      }).then(res => {
        console.log(res)
        if (res.data.result == 0) {
          wx.hideLoading();
          this.setData({
            list: res.data.dataList ? res.data.dataList : [],
            totalPage: res.data.totalPage
          })
        }
      })
    }
  },
  golist(e) {
    console.log(e);
    // return;
    wx.navigateTo({
      url: "/pages/xiangmuliebiao/xiangmuliebiao?id=" + e.currentTarget.dataset.id + "&type=1" + "&name=" + this.data.address
    })
  },
  gotoList(e) {
    console.log(id)
    let id = e.detail;
    wx.navigateTo({
      url: "/pages/jingqudetail/jingqudetail?id=" + id
    })
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