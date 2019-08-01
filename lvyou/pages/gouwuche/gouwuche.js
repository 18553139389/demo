// pages/gouwuche/gouwuche.js
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
    list: [],
    showScroll: true,
    resultlist: [],
    checklist: [],
    checkTotal: false,
    // 一个字符
    s: "0123456789",
    // 测试数据
    test: [],
    result: [],
    total: 0,
    idTotal: [],
    cart: false
  },
  onClose() {
    this.setData({
      show: false
    });
  },

  onSelect(event) {
    console.log(event.detail);
  },
  getconfirm(e) {
    this.setData({
      showScroll: !this.data.showScroll
    })
  },
  onChange(e) {
    console.log(e)
    let key = `checklist[${e.currentTarget.dataset.i - 0}]`
    let keylist = `resultlist[${e.currentTarget.dataset.i - 0}]`
    let m = this.data.s.slice(0, this.data.test[e.currentTarget.dataset.i - 0].cartList.length).split("");
    if (!e.detail) {
      this.setData({
        [keylist]: e.detail
      })
    } else {
      this.setData({
        [keylist]: m
      })
    }

    this.setData({
      [key]: e.detail
    })
    this._quanxuan();
    this._getTotal();
  },
  onChangelist(e) {
    // return;
    let key = `resultlist[${e.currentTarget.dataset.i - 0}]`
    let data = {
      [key]: e.detail
    }
    if (e.detail.length == this.data.test[e.currentTarget.dataset.i - 0].cartList.length) {
      let key2 = `checklist[${e.currentTarget.dataset.i - 0}]`
      data[key2] = true
    } else {
      let key2 = `checklist[${e.currentTarget.dataset.i - 0}]`
      data[key2] = false
    }

    this.setData(data)
    this._quanxuan();
    this._getTotal();
    // if(this.data.){}
  },
  _quanxuan() {
    // this.data.
    if (this.data.test.length == this.data.checklist.length) {
      let m = true;
      let ind = 0;
      this.data.checklist.forEach((item, index) => {
        // console.log(item,ind,index)
        // console.log(ind!=index)
        // if(ind!=index){
        //   console.log(ind,index)
        //   m=false;
        //   ind++
        //   return;
        // }
        if (item == false) {
          m = false;
          return;
        }
        // if( || item=="null"){

        // }
      })
      this.setData({
        checkTotal: m
      })

    }

  },
  onChangeTotal(e) {
    this.setData({
      checkTotal: e.detail
    })
    this.data.test.forEach((item, index) => {
      let k = `checklist[${index}]`
      this.setData({
        [k]: e.detail
      })
      if (e.detail) {
        item.cartList.forEach((item1, index1) => {
          let key = `resultlist[${index}][${index1}]`
          this.setData({
            [key]: index1 + ""
          })
        })
        this._getTotal();
      } else {
        item.cartList.forEach((item1, index1) => {
          let key = `resultlist[${index}][${index1}]`
          this.setData({
            [key]: false
          })
        })
        this.setData({
          total: 0
        })
      }

    })
    // this.setData({
    //   checklist:true,
    //   resultlist:true,
    //   checkTotal:true
    // })
  },
  del(e) {
    console.log(e)
    http.showLoading().postD({
      cmd: "deleteCart",
      uid: gd.userId || "de8a58b195c5413e9792b41295c3e43c",
      id: e.currentTarget.dataset.id
    }).then(res => {
      console.log(res)
      if (res.data.result == 0) {
        this.setData({
          resultlist: [],
          checklist: [],
          checkTotal: false
        })
        this._getData();
      }
    })
  },
  noop(e) {
    console.log(e)
  },
  _getData() {
    http.showLoading().postD({
      cmd: "getCartList",
      uid: gd.userId || "de8a58b195c5413e9792b41295c3e43c"
    }).then(res => {
      if (res.data.result == 0) {
        wx.hideLoading();
        this.setData({
          test: res.data.dataList ? res.data.dataList : []
        })
        console.log(this.data.test)
        this.data.test.forEach((item, index) => {
          let k = `checklist[${index}]`
          this.setData({
            [k]: false
          })
        })
        console.log(this.data.test)
      }
    })
  },
  _getqpr() {
    http.showLoading().postD({
      cmd: "getCartCollectors",
      uid: gd.userId || "de8a58b195c5413e9792b41295c3e43c"
    }).then(res => {
      if (res.data.result == 0) {
        console.log(res)
        if (res.data.dataList) {
          this.setData({
            list: res.data.dataList
          })
        }else{
          this.setData({
            cart: true
          })
        }
      }
    })
  },
  onChangePeople(e) {
    console.log(e)
    this.setData({
      result: e.detail - 0
    })
    http.showLoading().postD({
      cmd: "getCartList",
      uid: gd.userId || "de8a58b195c5413e9792b41295c3e43c",
      ids: [this.data.list[e.detail - 0].id] //取票人id
    }).then(res => {
      if (res.data.result == 0) {
        wx.hideLoading();
        this.setData({
          test: res.data.dataList,
          resultlist: [],
          checklist: [],
          checkTotal: false,
          total: 0
        })
      }
    })
  },
  _getTotal() {
    let total = 0;
    let id = [];
    let collect = []
    let collect1 = []
    console.log(this.data.list.length)
    for (let i = 0; i < this.data.list.length; i++) {
      collect.push({
        name: this.data.list[i].name,
        id: this.data.list[i].id,
        cartList: []
      })
    }
    console.log(collect)
    console.log(collect.length)
    console.log(this.data.resultlist)
    this.data.resultlist.forEach((item, index) => {
      console.log(item)
      if (item) {
        item.forEach((item1) => {
          if (typeof item1 == "string") {
            total += parseFloat(this.data.test[index].cartList[item1 - 0].price) * this.data.test[index].cartList[item1 - 0].number;
            for (let j = 0; j < collect.length; j++) {
              if (this.data.test[index].cartList[item1 - 0].collectorName == collect[j].name) {
                collect[j].cartList.push(this.data.test[index].cartList[item1 - 0].id)
              }
            }
            // id.push(this.data.test[index].cartList[item1 - 0].id);
          }
        })
      } else {
        total += 0
      }
    })
    for(let i=0;i<collect.length;i++){
      collect1.push({
        id: collect[i].id,
        cartList: collect[i].cartList
      })
    }
    console.log(collect1)
    this.setData({
      total: total.toFixed(2),
      idTotal: collect1
    })
  },
  ok() {
    if (this.data.total <= 0) {
      return;
    }
    console.log(this.data.idTotal)
    http.showLoading().postD({
      cmd: "saveOrder",
      uid: gd.userId || "de8a58b195c5413e9792b41295c3e43c",
      collectors: this.data.idTotal //购物车
    }).then(res => {
      if (res.data.result == 0) {
        wx.hideLoading();
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
      }else{
        http.showToast(res.data.resultNote);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.setData({
      list: []
    })
    this._getData()
    this._getqpr();
    // http.showLoading().postD({
    //   cmd:"getCartList",
    //   uid:gd.userId || "de8a58b195c5413e9792b41295c3e43c"
    // }).then(res=>{
    //   if(res.data.result==0){
    //     wx.hideLoading();
    //     this.setData({
    //       test:res.data.dataList
    //     })
    //     this.data.test.forEach((item,index)=>{
    //       let k=`checklist[${index}]`
    //       this.setData({
    //         [k]:false
    //       })
    //     })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      resultlist: [],
      checklist: [],
      checkTotal: false,
      total: 0
    })
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