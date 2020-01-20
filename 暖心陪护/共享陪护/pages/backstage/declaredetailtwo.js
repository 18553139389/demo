// pages/backstage/declaredetailtwo.js
const baseInfo = require("../../utils/util.js").baseInfo;
const upload = require("../../utils/util.js").upload;
var uid = "";

var errorApplyId = ""; //故障申报ID 638d30849a874635852d86b662f623c2

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgup: "", //上传图片地址
    jiancha: "2", //维修结果 1-未修好，2-已修好 (如果是未修好的就不用传了)
    txtCont: "", //文本框内容
    imgsr: ["../../image/20.png"], //上传图片路径
    pics: []
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    uid = wx.getStorageSync("userinfo").uid;
    errorApplyId = options.errorApplyId;
    _this.getData();
  },

  //提交结果
  submitbtn: function () {
    let _this = this;
    let arrStr = _this.data.imgup.join("|");
    console.log(errorApplyId, _this.data.jiancha, _this.data.txtCont, arrStr)
    wx.request({
      url: baseInfo + "submitResult",
      data: {
        uid: uid, //用户ID
        errorApplyId: errorApplyId, //故障申报ID
        jcResult: '', //检查结果：0-故障，1-正常 (如果是未修好的就不用传了)
        wxResult: _this.data.jiancha, //维修结果：1-未修好，2-已修好
        wxInfo: _this.data.txtCont, //维修信息
        wxImages: arrStr //维修图片（多个用"|"隔开）
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("请求成功", res);
        if (res.data.errorCode == "0") {
          var datas = res.data.msg;

          wx.showToast({
            icon: 'none',
            title: datas
          })

          setTimeout(function () {
            wx.navigateTo({
              url: "./backstage"
            });
          }, 1000);

        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg
          })
        }
      }
    })
  },


  //检查结果
  radioChange: function (e) {
    let _this = this;
    _this.setData({
      jiancha: e.detail.value
    });
  },


  //获取数据
  getData: function () {
    let _this = this;
    wx.request({
      url: baseInfo + "errorApplyDetail",
      data: {
        "errorApplyId": errorApplyId
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.errorCode == "0") {
          let datas = res.data.body;
          console.log("请求成功", datas);

          _this.setData({
            detail: datas
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

  //获取文本框内容
  gettxtinfo: function (e) {
    let _this = this;

    _this.setData({
      txtCont: e.detail.value
    })

    console.log(_this.data.txtCont);
  },


  //多张图片上传
  uploadimga: function (data) {
    let _this = this;
    console.log("data:")
    console.log(data)

    wx.showLoading({
      title: 'loading',
    })
    let a = 0;
    let arr = [];
    for (let i = 0; i < data.path.length; i++) {
      wx.uploadFile({
        url: data.url,
        filePath: data.path[i],
        name: 'file', //这里根据自己的实际情况改
        formData: null, //这里是上传图片时一起上传的数据
        success: (resp) => {

          let back = JSON.parse(resp.data);

          let srca = back.body.url;

          arr.push(srca);

          console.log(arr)
          // _this.data.imgsr[i] = srca;
          // console.log(_this.data.imgsr);
          // console.log(data.path);

          // return;
          _this.setData({
            imgup: arr
          })
        },
        fail: (res) => { },

      });

      if (i + 1 == data.path.length) {
        wx.hideLoading()
      }

    }

  },

  //图片上传
  // http://jzshywl.com/api/addimgs
  uploadimg: function () { //这里触发图片上传的方法
    let _this = this;
    let pics = _this.data.pics;
    _this.uploadimga({
      url: upload, //这里是你图片上传的接口
      path: pics //这里是选取的图片的地址数组
    });
  },

  //选择图片
  chooseimage: function (e) {
    let _this = this;
    let pics = _this.data.pics;
    wx.chooseImage({
      count: 3, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // var imgsrc = res.tempFilePaths;
        // pics = pics.concat(imgsrc);

        // // console.log(pics);

        // _this.setData({
        //   pics: pics
        // });

        console.log(res.tempFilePaths)
        _this.data.imgsr.unshift(res.tempFilePaths[0])
        console.log(_this.data.imgsr)
        if (_this.data.imgsr.length >= 4) {
          console.log("啥时候走这个")
          _this.data.imgsr.pop();
          console.log(_this.data.imgsr)
        }
        pics.push(res.tempFilePaths[0])
        console.log(pics);

        _this.setData({
          pics: pics,
          imgsr: _this.data.imgsr

        });
        _this.uploadimg();
      },

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