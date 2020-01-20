const baseInfo = require("../../utils/util.js").baseInfo;
var uid = "";
var hospitalId = ""; //医院id

var nowPage = 1,
  totalPage = 1,
  endrefush = 0;
var moreList = [];
// pages/backstage/shebeicount.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    departSyl: "", //当前设备使用率
    contxt: "", //关键字
    boxStatus: false, //医院弹框 false：默认关闭  true：打开弹框
    hospitalName: "", //默认医院名称
    tabid: "", //tab 当前选中   科室id
    tabList: [] //tab列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    uid = wx.getStorageSync("userinfo").uid;
    
    hospitalId = options.hospitalId;
    _this.setData({
      hospitalName: options.hospitalName
    });

    console.log("--获取url参数--", options);

    //获取科室
    _this.getTabar();

  },

  //切换科室
  clickTab: function(e) {
    var _this = this;
    var i = e.currentTarget.dataset.tab; //获取自定义的 data-tab 值

    _this.setData({
      tabid: i
    });
    console.log(i);
    nowPage = 1;
    endrefush = 0;
    _this.setData({
      list:[]
    })
    moreList = [];
    _this.getDataList(_this.data.tabid, _this.data.contxt, nowPage);

  },

  //2.0 获取科室数据
  getTabar: function(e) {
    let _this = this;

    wx.request({
      url: baseInfo + "departList",
      data: {
        "uid": uid,
        "hospitalId": hospitalId
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data.errorCode == "0") {
          var datas = res.data.body;
          console.log("--科室数据：--", res);
          _this.setData({
            departList: datas.departList,
            tabid: datas.departList[0].id
          });
          moreList = [];
          _this.getDataList(_this.data.tabid, _this.data.contxt, nowPage);

        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg
          })
        }
      }
    })

  },

  //点击弹框列表 关闭弹框 覆盖数据
  clickYuan: function(e) {
    let _this = this;

    let i = e.currentTarget.dataset.yiid;
    let name = e.currentTarget.dataset.yiname;

    hospitalId = i; //覆盖医院数据

    _this.setData({
      hospitalName: name,
      boxStatus: false
    });

    _this.getTabar(); //切换医院后 重新获取数据
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
          console.log("--医院弹框数据:--", datas);
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
      boxStatus: false
    });
  },

  //3.0 获取列表数据
  getDataList: function(departId, keyword, nowPage) {
    let _this = this;

    wx.request({
      url: baseInfo + "deviceTongji",
      data: {
        "uid": uid,
        "hospitalId": hospitalId,
        "departId": departId, //科室ID
        "keyword": keyword, //关键词（搜索时必传）
        "nowPage": nowPage
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log("设备使用率："+JSON.stringify(res));
        if (res.data.errorCode == "0") {
          var datas = res.data.body;
          console.log("--列表数据--", datas);
          _this.setData({
            departSyl: datas.departSyl
          })

       

          if (!datas.errorApplyList) {
            datas.errorApplyList = []
          }

          // if (nowPage == "1") {
          //   // _this.setData({
          //   //   list: datas.deviceList
          //   // })

          // } else { }
          
            for (let i = 0; i < datas.deviceList.length; i++) {
              moreList.push(datas.deviceList[i])
            }
            console.log(moreList);

            _this.setData({
              list: moreList
            })
          console.log(_this.data.list)
            totalPage = datas.totalPage;
            if (nowPage >= totalPage) {
              endrefush = "1";
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
    nowPage = 1;
    endrefush = 0;
    _this.setData({
      list: []
    })
    moreList = [];
    _this.getDataList(_this.data.tabid, _this.data.contxt, nowPage);
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
    //  _this.getData(nowPage);
      _this.getDataList(_this.data.tabid, _this.data.contxt, nowPage);
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