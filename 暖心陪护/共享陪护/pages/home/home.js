let app = getApp();
let wechat = require("../../utils/wechat");
const baseInfo = require("../../utils/util.js").baseInfo;
var userinfo;
var uid;
function countdown(_this) {
  var second = _this.data.second;

  if (second == 0) {
    _this.setData({
      tips: '获取验证码',
      second: 5
    });
    return;

  } else {
    _this.setData({
      second: second,
      tips: '重新获取(' + second + ')'
    })
  }

  var time = setTimeout(function () {
    _this.setData({
      second: second - 1
    });
    countdown(_this);
  }, 1000);

}
var pid = ''; //邀请人ID
Page({
  /**
   * 页面的初始数据
   */
  data: {
    kk: false, //首次登陆弹框
    tips: "获取验证码",
    second: 5, //验证码倒计时
    phoneInfo: '', //手机号
    yanmaInfo: '', //验证码
    loginBox: false, //登录弹框 未登录弹出  登录隐藏 
    movies: [],
    hospitalName: '',  //医院名称
    icon: '',          //医院图标
    kefuTel: '',       //医院客服电话
    isHashospital: 0, //当前位置是否有医院,
    code:"", //登录code
    isphone:false//是否绑定手机号
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.createMap();
    let _this = this;
    pid = options.pid;
    // wx.removeStorageSync('userinfo'); 
    userinfo = wx.getStorageSync("userinfo");
    wx.request({
      url: baseInfo + "index",
      method: "get",
      data: {
        "uid": userinfo.uid, //用户ID
        "lngAndLat": "" //用户经纬度信息
      },
      dataType: "json",
      header: {
        "Content-Type": "application/json"
      },
      success(res) {
        let datas = res.data.body;
        let movies = [];
        // console.log(datas.bannerList)
        // if (res.data.errorCode === "0") {
        //   datas.bannerList.forEach(function (item, index) {
        //     let m = { url: item.image, content: item.content };
        //     movies.push(m);
        //   })
        // }
        _this.setData({
          movies: movies
        })

      }
    })
    console.log(JSON.stringify(userinfo))
    if (userinfo.uid) {
      if (userinfo.isNew == "0") { //新用户
        _this.setData({
          loginBox: true,
          kk:true
        });
      } else if (userinfo.isNew == "1") { //老用户
        _this.setData({
          kk: true
        })
        if (userinfo.isYunwei == "0") { //非运维直接显示首页
          _this.setData({
            loginBox: false,

          });
          //获取用户经纬度
          _this.getUserLocation();
          //_this.createMap();
        } else if (userinfo.isYunwei == "1") { //运维进入运维模块
          _this.setData({
            loginBox: false
          });
          wx.reLaunch({
            url: "../backstage/backstage"
          });
        }
      }
    } else {
      //授权登录
      _this.onGotUserInfo();
    }


    wx.openBluetoothAdapter({
      success(res) {

      },
      fail(res) {
        if (res.errCode == '10001') {
          wx.showToast({
            title: '请先打开手机蓝牙~~',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
    _this.banb();
    
  },

  banb: function () {
    var that = this;
    wx.getSystemInfo({
      success(res) {
        that.setData({
          wxbanb: res.version
        })
        console.log("手机型号" + res.model)
        console.log("微信版本号" + res.version)
        console.log("客户端平台" + res.platform)
        console.log("操作系统版本" + res.system)
        console.log("客户端基础库版本" + res.SDKVersion)
        that.versionCompare('6.5.7', res.version)
      }
    })
  },

  versionCompare: function (ver1, ver2) { //版本比较
    var version1pre = parseFloat(ver1)
    var version2pre = parseFloat(ver2)
    var version1next = parseInt(ver1.replace(version1pre + ".", ""))
    var version2next = parseInt(ver2.replace(version2pre + ".", ""))
    if (version1pre > version2pre) {
      wx.showToast({
        title: '当前微信版本号过低',
        icon: "none",
        duration: 2000
      })
    } else {
      console.log("版本号挺高")
    }
  },


  // 登录
  onGotUserInfo: function (e) {
    let _this = this;
    wx.login({
      success: function (res) {
        console.log("登陆操作：", res);
        let code = res.code;
        _this.setData({
          code:code
        })
        if (code != null && code != "") {
          wx.getUserInfo({
            withCredentials: true,
            success: function (res_user) {
              // wx.get
              console.log("授权需要的信息" + code, res_user, pid);
              wx.request({
                url: baseInfo + "loginByWeixin",
                method: "post",
                data: {
                  "code": code, //调用微信接口获取登录凭证（code）进而换取用户登录态信息
                  "userInfo": res_user, //用户微信信息
                  "pid": pid //上级用户ID（邀请时必传）
                },
                dataType: "json",
                header: {
                  'Content-Type': 'application/json',
                },
                success: function (data_) {
                  console.log(data_,"data__")
                  // wx.showToast({
                  //   icon: "none",
                  //   title: "授权成功"
                  // });

                  if (data_.data.errorCode == "0") {
                    let datas = data_.data.body;
                    //uid: ""   //用户ID
                    //isNew: ""//0-新用户，1-老用户
                    //isYunwei: ""//是否运维:0-否，1-是
                    //status: ""//用户状态：0-禁用  1-可用

                    if (datas.isNew == '0') { //新用户需要绑定手机号
                      _this.setData({
                        kk: true,
                        loginBox: true,
                        isphone:false
                      });
                    } else if (datas.isNew == '1') { //老用户直接登陆进入
                      _this.setData({
                        kk: true,
                        loginBox: false,
                        isphone:true
                      });
                    }

                    wx.removeStorageSync('userinfo');
                    wx.setStorageSync("userinfo", datas);
                    let userinfo = wx.getStorageSync("userinfo");
                    // uid:"44f25f7d8541473b9a6f6be5817a2c28", 用户ID
                    // isNew:0,  0-新用户，1-老用户
                    // isYunwei:"0", 是否运维:0-否，1-是
                    // status:"1" 用户状态：0-禁用  1-可用
                    console.log("判断是否登陆");
                    // return;
                    if (JSON.stringify(userinfo).length > 4) {
                      console.log("执行");
                      _this.setData({
                        kk: true,
                      })
                      console.log('是否运维：' + userinfo.isYunwei);
                      if (userinfo.isNew == "0") { //新用户
                        _this.setData({
                          loginBox: true,
                          kk: true,
                        });
                      } else if (userinfo.isNew == "1") { //老用户
                        if (userinfo.isYunwei == "0") { //非运维直接显示首页
                          _this.setData({
                            loginBox: false,
                            kk: true,
                          });
                        } else if (userinfo.isYunwei == "1") { //运维进入运维模块
                          _this.setData({
                            loginBox: false,
                            kk: true,
                          });
                          wx.reLaunch({
                            url: "../backstage/backstage"
                          });
                        }
                      }


                    }
                    //_this.onLoad();
                    //获取用户经纬度
                    _this.getUserLocation();
                    // _this.createMap();
                  } else {
                    // wx.showToast({
                    //   icon: 'none',
                    //   title: data.data.msg
                    // })
                  }
                }
              })

            },
            fail: function () { },
            complete: function (res) {


            }
          })
        } else {

        }
      }
    })
  },
  createMap(e) {
    wx.showLoading({
      title: '加载中',
    })
    let mapCtx = wx.createMapContext('mapbox');
    // console.log()
    setTimeout(() => {
      mapCtx.moveToLocation();
    }, 1000);
    setTimeout(() => {
      this.getAddress(mapCtx);
    }, 2000);
  },
  getAddress(mapCtx) {
    let _this=this;
    wechat.getCenterLocation(mapCtx)
      .then(d => {
        let { latitude, longitude } = d;
        let userinfo = wx.getStorageSync("userinfo");
        console.log("当前位置纬度", latitude, "当前位置经度", longitude);
        wx.request({
          url: baseInfo + "index",
          method: "get",
          data: {
            "uid": userinfo.uid, //用户ID
            "lngAndLat": longitude + "," + latitude //用户经纬度信息           
          },
          dataType: "json",
          header: {
            'Content-Type': 'application/json',
          },
          success: function (datas) {
            if (datas.data.errorCode == "0") {
              //  _this.setData({
              //    movies: {}
              //  })
              if (datas.data.isYunwei == '1') {
                wx.reLaunch({
                  url: "../backstage/backstage"
                });
              }
              var bannerList = [];
              if (datas.data.body.bannerList) {
                for (var i = 0; i < datas.data.body.bannerList.length; i++) {
                  var banner = { 'url': datas.data.body.bannerList[i].image, 'content': datas.data.body.bannerList[i].content };
                  bannerList.push(banner);
                }
              }
              console.log(datas)
              if (datas.data.body.isHashospital == '1') {
                _this.setData({
                  icon: datas.data.body.icon,
                  hospitalName: datas.data.body.hospitalName,
                  kefuTel: datas.data.body.kefuTel,
                  movies: bannerList,
                  isHashospital: 1
                })
                
              } else {//若当前位置找不到医院
                _this.setData({
                  //  movies: bannerList,
                  isHashospital: 0
                })
              }
              wx.hideLoading()
            }
          },
          fail: function () {
            wx.showToast({
              title: '服务器请求失败',
              icon: "none",
              duration: 2000
            })
          }
        })
      })
      .then(d => {
        console.log("当前地址", d.data.result.address);
      })
      .catch(e => {

      })
  },
  //获取用户位置
  getUserLocation: function () {
    console.log("获取用户经纬度")
    let _this = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        var speed = res.speed;
        var accuracy = res.accuracy;
        console.log('用户经纬度：' + latitude + '----' + longitude);
        let userinfo = wx.getStorageSync("userinfo");
        console.log('用户标识' + userinfo.uid);
        wx.request({
          url: baseInfo + "index",
          method: "get",
          data: {
            "uid": userinfo.uid, //用户ID
            "lngAndLat": longitude + "," + latitude //用户经纬度信息           
          },
          dataType: "json",
          header: {
            'Content-Type': 'application/json',
          },
          success: function (datas) {
            if (datas.data.errorCode == "0") {
              //  _this.setData({
              //    movies: {}
              //  })
              if (datas.data.isYunwei == '1') {
                wx.reLaunch({
                  url: "../backstage/backstage"
                });
              }
              var bannerList = [];
              if (datas.data.body.bannerList) {
                for (var i = 0; i < datas.data.body.bannerList.length; i++) {
                  var banner = { 'url': datas.data.body.bannerList[i].image, 'content': datas.data.body.bannerList[i].content };
                  bannerList.push(banner);
                }
              }
              if (datas.data.body.isHashospital == '1') {
                _this.setData({
                  icon: datas.data.body.icon,
                  hospitalName: datas.data.body.hospitalName,
                  kefuTel: datas.data.body.kefuTel,
                  movies: bannerList,
                  isHashospital: 1
                })
              } else {//若当前位置找不到医院
                _this.setData({
                  //  movies: bannerList,
                  isHashospital: 0
                })
              }


            }
          },
          fail: function () {
            wx.showToast({
              title: '服务器请求失败',
              icon: "none",
              duration: 2000
            })
          }
        })

      },
      fail() {
        wx.showToast({
          title: "定位失败,请打开位置信息",
          icon: "none",
          duration: 2000
        })
      }
    })
  },
  //拨打客服电话
  makePhone: function () {
    var phone = this.data.kefuTel;
    if (phone != null && phone != '') {
      wx.makePhoneCall({
        phoneNumber: phone
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '暂无客服电话'
      })
    }
  },
  //扫码开锁-跳转-支付页面
  openkaipay: function () {
    var _this = this;
    // wx.openBluetoothAdapter({
      // success(res) {
        //已经打开蓝牙了
        var isHashospital = _this.data.isHashospital;
        console.log(isHashospital+'---------------')
        let userinfo = wx.getStorageSync("userinfo");
        if (isHashospital==1) {
          wx.scanCode({
            success(res) {
              //截取二维码url中的设备编号
              let info = res.result.split("=")[1];
              wx.request({
                url: baseInfo + "scanCode",
                method: "get",
                data: {
                  "uid": userinfo.uid, //用户ID
                  "deviceNum": info, //设备编号 
                  "type": '0'
                },
                dataType: "json",
                header: {
                  'Content-Type': 'application/json',
                },
                success: function (datas) {
                  console.log("扫码时判断设备：" + JSON.stringify(datas));
                  if (datas.data.errorCode == "0") {
                    if (datas.data.body.isOpen == "1") {
                      wx.showToast({
                        icon: 'none',
                        title: '该设备正在使用中'
                      })
                    } else {
                      wx.navigateTo({
                        url: "../pay/scanCodePay?deviceNum=" + info + "&typeSataus=0"
                      });
                    }
                  } else {
                    wx.showToast({
                      icon: 'none',
                      title: datas.data.msg
                    })
                  }
                }
              })

            }
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '当前位置未匹配到医院'
          })
        }

  },
  // 根据是否有code判断是否需要登录
  getphoneNum(e){
    let _this=this;
    wx.login({
      success(res) {
        _this.setData({
          code: res.code
        })
        _this._getphone(e, res.code);
      }
    })
    // wx.login()
    // console.log("e",e)
  },
  // 获取手机号业务
  _getphone(e,code){
    // let event=e;
    // let encryptedData = e.detail
    let _this=this;
    wx.request({
      url: baseInfo + "getPhoneNum",
      data: {
        uid: wx.getStorageSync("userinfo").uid,
        encryptedData: e.detail.encryptedData,
        iv:e.detail.iv,
        code:code
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.errorCode==0){
          let store = wx.getStorageSync("userinfo");
          store.isNew=1;
          wx.setStorageSync("userinfo", store)
          _this.setData({
            isphone:true
          })
        }
      }})
  },
  //扫码关锁
  opensaoma: function () {
    var _this = this;
    wx.openBluetoothAdapter({
      success(res) {
        //成功
        var isHashospital = _this.data.isHashospital;
        let userinfo = wx.getStorageSync("userinfo");
        if (isHashospital==1) {
          wx.scanCode({
            success(res) {
              //截取二维码url中的设备编号
              let info = res.result.split("=")[1];
              wx.request({
                url: baseInfo + "scanCode",
                method: "get",
                data: {
                  "uid": userinfo.uid, //用户ID
                  "deviceNum": info, //设备编号   
                  "type": "1"
                },
                dataType: "json",
                header: {
                  'Content-Type': 'application/json',
                },
                success: function (datas) {
                  console.log("扫码时判断设备：" + JSON.stringify(datas));
                  if (datas.data.errorCode == "0") {
                    if (datas.data.body.isCurrentUse == "1") {
                      wx.navigateTo({
                        url: "../scanCode/scanLock?deviceNum=" + info
                      });
                    } else {
                      wx.showToast({
                        icon: 'none',
                        title: '暂无与该设备匹配的订单'
                      })
                    }
                  } else {
                    wx.showToast({
                      icon: 'none',
                      title: datas.resultNote
                    })
                  }
                }
              })
            }
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '当前位置未匹配到医院'
          })
        }
      },
      fail(res) {
        console.log("当前蓝牙状态：" + res.errCode);
        if (res.errCode == '10001') {
          wx.showToast({
            title: '请先打开手机蓝牙~~',
            icon: 'none',
            duration: 1000
          })
        }
      }
    })

  },

  //跳转-输入编号开锁
  openscanUnlock: function () {
    var isHashospital = this.data.isHashospital;
    if (isHashospital=='1') {
      wx.navigateTo({
        url: "../scanCode/scanUnlock"
      });
    } else {
      wx.showToast({
        icon: 'none',
        title: '当前位置未匹配到医院'
      })
    }
  },
  //点击轮播图进去详情
  openguideDetail: function (e) {
    let _this = this;
    var content = e.currentTarget.dataset.cons;
    console.log("详情内容：" + content);
    wx.setStorageSync('content', content)
    wx.navigateTo({
      url: "../perCenter/guideDetail"
    });
  },
  //跳转到 个人中心
  openPerCenter: function () {
    wx.navigateTo({
      url: "../perCenter/perCenter"
    });
  },

  //跳转到 我的卡包
  openCardPck: function () {
    wx.navigateTo({
      url: "../cardPck/cardPck"
    });
  },
  //获取fromid
  gorRunnerLobby: function (e) {
    var that = this;
    // that.setData({
    //   fid: e.detail.formId
    // })
    this.formid(e.detail.formId)

  },

  formid: function (id) {
    var that = this;
    let userinfos = wx.getStorageSync("userinfo");
    wx.request({
      url: baseInfo + "saveFormID",
      method: "get",
      data: {
        "uid": userinfos.uid, //用户ID
        "formId": id //提交formid 用于推送
      },
      dataType: "json",
      header: {
        'Content-Type': 'application/json',
      },
      success: function (datas) {
        if (datas.data.errorCode == "0") {


        } else {
          wx.showToast({
            icon: 'none',
            title: datas.resultNote
          })
        }
      }
    })
  },


  //跳转到 我的订单
  openOrder: function () {
    wx.navigateTo({
      url: "../order/userorder"
    });
  },

  //跳转到 我的钱包
  openWallet: function () {
    wx.navigateTo({
      url: "../wallet/wallet"
    });
  },

  //点击确定 登录
  closeLogin: function () {
    let uid = wx.getStorageSync("userinfo").uid;
    // console.log("uiiidd", uid);
    let _this = this;
    wx.request({
      url: baseInfo + "bindPhoneNumber",
      data: {
        "uid": uid, //商户ID
        "phoneNum": _this.data.phoneInfo, //用户手机号
        "code": _this.data.yanmaInfo, //验证码
        "type": 0 //类型（0-绑定手机号，1-修改绑定手机号）
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("--修改手机号成功:--", res);
        if (res.data.errorCode == "0") {
          var datas = res.data.body;

          // _this.setData({
          //   yanmaInfo: datas.code
          // });

          _this.setData({
            loginBox: false
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

  //获取输入的手机号
  getphone: function (e) {
    var _this = this;
    _this.setData({
      phoneInfo: e.detail.value
    });
    // console.log(_this.data.phoneInfo);
  },

  //获取输入的验证码
  getyanma: function (e) {
    var _this = this;
    _this.setData({
      yanmaInfo: e.detail.value
    });
    // console.log(_this.data.yanmaInfo);
  },

  //用户点击获取验证码
  sendcode: function (e) {
    let _this = this;

    countdown(_this); //调用倒计时函数


    if (_this.data.second < 5) {
      return
    } else {
      wx.request({
        url: baseInfo + "sendSmsCode",
        data: {
          "phoneNum": _this.data.phoneInfo
        },
        dataType: "json",
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log("--获取验证码成功:--", res);
          if (res.data.errorCode == "0") {
            var datas = res.data.body;

            _this.setData({
              // yanmaInfo: datas.code
            });

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








  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.phone
    if (wx.getStorageSync("userinfo").isNew==0){
      this.setData({
        isphone:false
      })
      return;
    }
    this.setData({
      isphone:true
    })
    
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




