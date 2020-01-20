const baseInfo = require("../../utils/util.js").baseInfo;
const upload = require("../../utils/util.js").upload;
var uid = "";
var deviceId_ = ""; //扫码获取的 设备ID
var device_Id = ""; //扫码获取的 设备ID
// pages/perCenter/malfunction.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgup: "", //上传图片地址
    txtCont: "", //文本框内容
    boxbj: false, //false：默认关闭弹框  true：打开弹框
    imgsr: ["../../image/20.png"], //上传图片路径
    pics: []
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    uid = wx.getStorageSync("userinfo").uid;
    
    deviceId_ = options.deviceId;
    console.log("url传入的设备id:", options.deviceId);

    _this.getData();
  },

  //点击提交 弹出弹框
  openBox: function() {
    let _this = this;
    var arrStr;
    console.log(_this.data.imgup)
    if (_this.data.imgup != ''){
       arrStr = _this.data.imgup.join("|");
      console.log("走了这个")
      console.log(arrStr)
    }else{
      console.log("走了else")
       arrStr ='';  
    }
    console.log(arrStr)
    if (arrStr == ''){
      wx.showToast({
        title: '请上传故障设备图片',
        icon: "none",
        duration: 2000
      })

    } else if (typeof (_this.data.txtCont) == 'undefined' || _this.data.txtCont==""){
      wx.showToast({
        title: '请输入具体故障',
        icon: "none",
        duration: 2000
      })
    }else{
      wx.request({
        url: baseInfo + "saveErrorApply",
        data: {
          "uid": uid,
          "deviceId": deviceId_, //设备ID
          "content": _this.data.txtCont, //申报内容
          "sbImages": arrStr, //申报图片（多个用"|"隔开）
          "laveEle": _this.data.info.laveEle
        },
        dataType: "json",
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.errorCode == "0") {
            var datas = res.data.msg;

            wx.showToast({
              icon: 'none',
              title: datas
            })

            _this.setData({
              boxbj: true
            });
            // setTimeout(function() {
            //   wx.navigateTo({
            //     url: "./perCenter"
            //   });
            // }, 1000);


          } else {
            wx.showToast({
              icon: 'none',
              title: res.data.msg
            })
          }
        }
      })
    }
    



  },

  //点击弹框确认 跳转到个人中心
  openBack: function() {
    wx.redirectTo({
      url: "./perCenter"
    });
  },


  //获取数据
  getData: function() {
    let _this = this;

    wx.request({
      url: baseInfo + "errorApply",
      data: {
        "uid": uid,
        "deviceId": deviceId_
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data.errorCode == "0") {
          var datas = res.data.body;
          console.log("--故障申报信息：--", datas);
          device_Id=datas.macAddr;
          _this.setData({
            info: datas
          });
          // //获取设备电量
          // wx.showLoading({
          //   title: '设备连接中',
          // })
          // _this.initLinkBluetooth();
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg
          })
        }
      }
    })
  },

  //多张图片上传
  uploadimga: function(data) {
    let _this = this;
    // console.log("data:")
    // console.log(data)

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
          //  imgsr: data.path,
            imgup: arr
          })
        },
        fail: (res) => {},

      });

      if (i + 1 == data.path.length) {
        wx.hideLoading()
      }

    }

  },

  //图片上传
  // http://jzshywl.com/api/addimgs
  uploadimg: function() { //这里触发图片上传的方法
    let _this = this;
    let pics = _this.data.pics;
    _this.uploadimga({
      url: upload, //这里是你图片上传的接口
      path: pics //这里是选取的图片的地址数组
    });
  },

  //选择图片
  chooseimage: function(e) {
    let _this = this;
    let pics = _this.data.pics;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
       // var imgsrc = res.tempFilePaths;
      //  pics = pics.concat(imgsrc);


        console.log(res.tempFilePaths)
        _this.data.imgsr.unshift(res.tempFilePaths[0])
        console.log(_this.data.imgsr)
        if (_this.data.imgsr.length >= 4) {
          console.log("啥时候走这个")
          _this.data.imgsr.pop();
          //  console.log(_this.data.imgsr.pop())
          console.log(_this.data.imgsr)
        }
        pics.push(res.tempFilePaths[0])
        console.log(pics);

        _this.setData({
          pics: pics,
          imgsr: _this.data.imgsr

        });




        // console.log(pics);

        // _this.setData({
        //   pics: pics
        // });
        _this.uploadimg();
      },

    })
  },


  //获取文本框内容
  gettxtinfo: function(e) {
    let _this = this;

    _this.setData({
      txtCont: e.detail.value
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