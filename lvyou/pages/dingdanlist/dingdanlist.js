// pages/dingdanlist/dingdanlist.js
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
    topList: [{
      name: "未使用",
      id: 2
    }, {
      name: "未付款",
      id: 1
    }, {
      name: "已完成",
      id: 3
    }, {
      name: "退款",
      id: 4
    }, {
      name: "全部",
      id: 0
    }, ],
    contentList: [],
    // 滚动页码记录,切换页码归1
    page: [],
    // 记录当前索引
    ind: 0,
    // 总页码
    totalPage: [],
    text1: 0,
    text2: 0,
    text3: 0,
    text4: 0,
    text5: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._loadData(0)
  },

  /**
   * 
   * @param {切换} event 
   */
  changeList(event) {
    const cid = this.data.topList[event.detail.index - 0].id;
    gd.state = event.detail.index - 0
    this.setData({
      ind: event.detail.index - 0
    })
    console.log(this.data.contentList[this.data.ind])
    // if (this.data.contentList[this.data.ind]) {
    //   return;
    // }
    console.log(event.detail.index)
    this._loadData(event.detail.index - 0)
  },
  /**
   * 根据index加载列表并做缓存
   */
  _loadData(ind, page = 1, callback) {
    let data = {
      cmd: "getOrderList",
      uid: gd.userId || "de8a58b195c5413e9792b41295c3e43c",
      nowPage: page
    };
    if (this.data.topList[ind].id != 0) {
      // data.status = this.data.ind
      data.status = this.data.topList[ind].id;
    }

    http.showLoading().postD(data).then((res) => {
      console.log(res)
      this.setData({
        text1: res.data.number2,
        text2: res.data.number1,
        text3: res.data.number3,
        text4: res.data.number4,
        text5: res.data.number5,
      })
      let setData = "contentList[" + ind + "]";
      let pages = "page[" + ind + "]";
      let totalp = "totalPage[" + ind + "]";
      if (res.data.result == 0) {
        //订单添加角标数量
        // if (res.data.number == 0) {
        //   wx.removeTabBarBadge({
        //     index: 1
        //   })
        // } else {
        //   gd.num = res.data.number
        //   wx.setTabBarBadge({
        //     index: 1,
        //     text: gd.num
        //   })
        // }
        if (callback) {
          callback(res)
          wx.hideLoading();
          return;
        }
        if (!res.data.dataList) {
          this.setData({
            [setData]: [],
            [pages]: page,
            [totalp]: 0
          })
        } else {
          this.setData({
            [setData]: res.data.dataList,
            [pages]: page,
            [totalp]: res.data.totalPage
          })
        }
        wx.hideLoading();
      }

    })
  },
  qutui(e) {
    wx.navigateTo({
      url: "/pages/tuikuanyuanyin/tuikuanyuanyin?id=" + e.target.dataset.id + "&type=2"
    })
  },
  kfp(e) {
    wx.navigateTo({
      url: "/pages/kaipiaoxinxi/kaipiaoxinxi?id=" + e.target.dataset.id
    })
  },
  goserach() {
    wx.navigateTo({
      url: "/pages/dingdansousuo/dingdansousuo"
    })
  },
  qupay(e) {
    wx.navigateTo({
      url: `/pages/zhifufangshi/zhifufangshi?id=${e.currentTarget.dataset.id}&price=${e.currentTarget.dataset.money}`
    })
  },
  del(e) {
    let that = this
    wx.showModal({
      title: '删除',
      content: '确认删除此订单吗',
      success(res) {
        if (res.confirm) {
          http.showLoading().postD({
            cmd: "deleteOrder",
            id: e.target.dataset.id
          }).then(res => {
            if (res.data.result == 0) {
              http.showToast("删除成功")
              console.log(that.data.ind)
              that.data.contentList[0] = null;
              that.data.contentList[1] = null;
              that.data.contentList[2] = null;
              that.data.contentList[3] = null;
              that.data.contentList[4] = null;
              if (that.data.ind == 0) {
                that._loadData(0);
              } else if (that.data.ind == 1) {
                that._loadData(1)
              } else if (that.data.ind == 2) {
                that._loadData(2)
              } else if (that.data.ind == 3) {
                that._loadData(3)
              } else if (that.data.ind == 4) {
                that._loadData(4)
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  scrollBootom() {
    let ind = this.data.ind - 0;
    let totalP = this.data.totalPage[ind] - 0;
    let currentP = (this.data.page[ind] - 0)
    if (totalP <= currentP) {
      return;
    }
    let setData = "contentList[" + ind + "]";
    let pages = "page[" + ind + "]";
    this._loadData(this.data.ind, currentP + 1, (res) => {
      let list = this.data.contentList[ind].concat(res.data.dataList);
      this.setData({
        [setData]: list,
        [pages]: currentP + 1
      })
    })
  },

  /**
   * 跳转详情
   */
  godetail(event) {
    let cid = event.currentTarget.dataset.cid;
    let money = event.currentTarget.dataset.money;
    wx.navigateTo({
      url: "/pages/orderdetail/orderdetail?cid=" + cid
    })
  },
  gopingjia(event) {
    let ind = event.currentTarget.dataset.ind;
    let mes = this.data.contentList[this.data.ind - 0][ind - 0];
    let name = mes.name;
    let img = mes.image;
    let cid = mes.id
    wx.navigateTo({
      url: "/pages/pingjia/pingjia?cid=" + cid + "&img=" + img + "&name=" + name
    })
  },
  quxiao(e) {
    wx.navigateTo({
      url: "/pages/tuikuanyuanyin/tuikuanyuanyin?id=" + e.target.dataset.id + "&type=1"
    })
  },
  queren(event) {
    let cid = event.currentTarget.dataset.cid;
    http.showLoading("确认订单中").postD({
      cmd: "confirmOrder",
      id: cid
    }).then((res) => {
      if (res.data.result == 0) {
        wx.showModal({
          title: "成功",
          content: "确认订单成功",
          showCancel: false,
          success: (res) => {
            if (res.confirm) {
              this.data.contentList[0] = null;
              this.data.contentList[2] = null;
              if (this.data.ind == 0) {
                this._loadData(0);
              } else {
                this._loadData(2)
              }
            }
          }
        })
        wx.hideLoading();
      } else {
        wx.showToast({
          title: res.data.resultNote,
          icon: "none"
        })
      }
    })
  },
  ctk(e) {
    let that = this
    http.showLoading().postD({
      cmd: "saveRefundOrder",
      uid: gd.userId || "de8a58b195c5413e9792b41295c3e43c",
      orderId: e.target.dataset.id
    }).then(res => {
      if (res.data.result == 0) {
        http.showToast("已催款");
        setTimeout(() => {
          that._loadData(that.data.ind)
        }, 1000)
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
    // if (gd.ispay) {
    //   this.data.contentList[0] = null;
    //   this.data.contentList[3] = null;
    //   gd.ispay = false;
    //   this._loadData(3)
    // } else if (gd.ispj) {
    //   this.data.contentList[0] = null;
    //   this.data.contentList[4] = null;
    //   gd.ispj = false;
    //   this._loadData(4)
    // } else {
    //   this._loadData(0)
    // }

    if (gd.state == null) {
      console.log(gd.state)
      this._loadData(0)
    } else {
      console.log(gd.state)
      this._loadData(gd.state)
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