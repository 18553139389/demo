// pages/theLock/theLock.js
const baseInfo = require("../../utils/util.js").baseInfo;
/**以下为蓝牙锁专用 开始 */
var device_Id = ""; //34:03:DE:4D:9A:C8   advertisServiceUUIDs: 0000FEE7-0000-1000-8000-00805F9B34FB
var service_Id = "0000FEE7-0000-1000-8000-00805F9B34FB";
var writeServiceId = ""; // 可写服务uuid
var writeCharacteristicId = "000036F5-0000-1000-8000-00805F9B34FB"; // 可写特征值uuid  
var notifyServiceId = ""; // 通知服务uuid
var notifyCharacteristicId = "000036F6-0000-1000-8000-00805F9B34FB"; // 通知特征值uuid
// var get_Data_jia = "060101012C2C62582667426601333141"; //获取token时 请求加密的数据
var get_Data = ""; //获取蓝牙发送的信息

//----------------------------------------------------------------------------------------------------
var characteristicId = []; //可以接收 蓝牙信息 read：true  write：true  notify：false
var characteristicId2 = []; //发送信息 开启推送 read：false  write：true  notify：true

var readServiceId = ""; // 可读服务uuid
var readCharacteristicId = "000036F6-0000-1000-8000-00805F9B34FB"; // 可读特征值uuid    

var readServiceId2 = "00001800-0000-1000-8000-00805F9B34FB"; // 可读服务uuid
var readCharacteristicId2 = "00002A02-0000-1000-8000-00805F9B34FB"; // 可读特征值uuid   

var data_data = "060101012C2C62582667426601333141"; //第一次加密用
var data_jia = ""; //加密后的数据
var data_jie = ""; //解密后的数据
var data_jias = ""; //开锁加密后的数据
var data_token = "";

var return_jia = ""; //加密接口返回的值

var hex_guan = ""; //关锁指令
var hex_dian = "";//锁的电量
var hex_kg = "";//锁的状态指令
var data_jiazt = "";
var kaisuozt = "";//锁的状态
var sou_ly = "0";//搜索蓝牙判断条件
/**蓝牙锁专用结束 */
var uid="";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shows: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    uid = wx.getStorageSync("userinfo").uid;
     that.setData({
        isYunwei: options.isYunwei
     })
    //判断设备
    console.log(options.macAddr)
    device_Id = options.macAddr;
    that.openadapter();
  },

  //跳转-订单列表
  openorder: function () {
    var that=this;
    console.log(that.data.isYunwei)
    if (that.data.isYunwei==0){
      wx.reLaunch({
        url: "../home/home"
      });
    } else if (that.data.isYunwei==1){
      wx.reLaunch({
        url: "../backstage/backstage"
      });
    }
    
  },


  //1.0 初始化蓝牙
  openadapter: function () {
    var _this = this;
     _this.setData({
       shows:false
     })
    wx.openBluetoothAdapter({
      success: function (res) {
        console.log("1.0 初始化蓝牙成功:")
        console.log(res);
        _this.opendiscovery();  //1.1 开始搜索
      }
    })
  },
  //1.1 开始搜索
  opendiscovery: function () {
    var _this = this;
    // wx.startBluetoothDevicesDiscovery({
    //   services: ['FEE7'],
    //   success: function (res) {
    //     console.log('1.1 开始搜索:')
    //     console.log(res);

    //     _this.getdevice();
    //     if (sou_ly == 0) {
    //       setTimeout(function () {
    //         console.log("停止蓝牙搜索")
    //         wx.stopBluetoothDevicesDiscovery({
    //           success: function (res) {

    //           }
    //         })
    //       }, 5000);
    //     }

    //   }
    // })
    console.log("走开始搜索前")
    _this.getdevice();
  },
  //1.2 获取设备getBluetoothDevices  
  //onBluetoothDeviceFound
  getdevice: function () {
    var _this = this;
    sou_ly = 1;
    console.log("还没有开始搜索")
    wx.startBluetoothDevicesDiscovery({
      services: ['FEE7'],
      success(res) {
        console.log("开始搜寻附近的蓝牙外围设备")
        wx.onBluetoothDeviceFound(res => {
          console.log("-------------:" + JSON.stringify(res));
          var devices = res.devices;
          for (let i = 0; i < devices.length; i++) {
            let advertisData = devices[i].advertisData;
            var data = _this.arrayBufferToHexString(advertisData);//二进制转字符串
            console.log("循环的mac数据"+data)
            console.log("这个是mac" + device_Id.replace(/:/g, ""))
            var mac_id = device_Id.replace(/:/g, "")
            console.log("是-1吗" + data.indexOf(mac_id))
            console.log(!!data)
            if (!!data && data.indexOf(mac_id) > -1) {
              console.log("find");
              device_Id = devices[i].deviceId;
              _this.connecteddevice();
              setTimeout(function () {
                console.log("停止蓝牙搜索")
                wx.stopBluetoothDevicesDiscovery({
                  success: function (res) {

                  }
                })
              }, 1000);
            }else{
              console.log("没有搜索到要找的设备")
            }
          }
        });
      },
      fail(res) {
        console.log(res);
      }
    });
  },
  //把二进制转成字符串
  arrayBufferToHexString: function (buffer) {
    let bufferType = Object.prototype.toString.call(buffer)
    if (buffer != '[object ArrayBuffer]') {
      return
    }
    let dataView = new DataView(buffer)

    var hexStr = '';
    for (var i = 0; i < dataView.byteLength; i++) {
      var str = dataView.getUint8(i);
      var hex = (str & 0xff).toString(16);
      hex = (hex.length === 1) ? '0' + hex : hex;
      hexStr += hex;
    }
    console.log("================:" + hexStr.toUpperCase());
    return hexStr.toUpperCase();
  },



  //2.0 连接设备
  connecteddevice: function () {
    console.log('2.0开始链接设备');
    var _this = this;
    console.log('连接的设备mac:' + device_Id);
    wx.createBLEConnection({
      deviceId: device_Id + "",
      success: function (res_) {
        console.log("2.1 连接设备成功");
        console.log(res_);
        _this.getservice();
      }, fail: function (res_) {// 连接蓝牙失败
        console.log("蓝牙创建链接失败1：" + JSON.stringify(res_));
        if (res_.errCode == -1) {//说明已经连接
          wx.closeBLEConnection({//先关闭连接然后在创建连接
            deviceId: device_Id + "",
            success(res) {
              console.log("断开链接成功");
              wx.createBLEConnection({
                deviceId: device_Id + "",
                success: function (res_) {
                  console.log("1.0 连接设备成功");
                  console.log(res_);
                  _this.getservice();
                }, fail: function (res_) {// 连接蓝牙失败
                  console.log("蓝牙创建链接失败1：" + JSON.stringify(res_));
                }
              })
            }
          })
        }
      }
    })
  },

  //3.0 获取服务--所有服务集合
  getservice: function () {
    var _this = this;
    wx.getBLEDeviceServices({
      deviceId: device_Id,
      success: function (res) {
        console.log("3.0 获取服务--所有服务集合");
        console.log(res);
        _this.getcharacteristics_ks();
      }
    })
  },


  //4.0 获取特征值 开锁专用
  getcharacteristics_ks: function () {
    var _this = this;
    wx.getBLEDeviceCharacteristics({
      deviceId: device_Id,
      serviceId: service_Id,
      success: function (res) {
        console.log("4.0 获取特征值成功:");
        console.log(res);
        _this.startnotify();
        //获取令牌
        _this.senddata();

      }
    })
  },
  //5.0 开启notify
  startnotify: function () {
    var _this = this;
    wx.notifyBLECharacteristicValueChange({
      state: true,
      deviceId: device_Id,
      serviceId: service_Id,
      characteristicId: notifyCharacteristicId,
      success: function (res) {
        console.log("5.0 开启notify成功:")
        console.log(res);

        function ab2hex(buffer) {
          var hexArr = Array.prototype.map.call(
            new Uint8Array(buffer),
            function (bit) {
              return ('00' + bit.toString(16)).slice(-2)
            }
          )
          return hexArr.join('');
        }
        wx.onBLECharacteristicValueChange(function (res) {
          console.log("5.1 监听蓝牙发送过来的值");
          console.log(res);
          console.log(ab2hex(res.value));

          //获取蓝牙响应的数据
          get_Data = ab2hex(res.value);

        })
      }
    })
  },
  //6.1 将蓝牙响应的数据 发送给后台进行解密
  senddata: function () {
    var _this = this;
    _this.senddatapop(data_data);
  },

  // 获取token前加密获取token指令接口
  senddatapop: function (data_data) {
    let _this = this;
    wx.request({
      url: "https://xcx.zhiyunw.com/zhiyunpeihu/service/getEncrypt",
      data: {
        "hexString": data_data
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.errorCode == "0") {
          var datas = res.data.body.encrypt;
          data_jia = datas;
          console.log("加密后的数据：");
          console.log(datas);
          //开始获取token
          _this.startwrite();

        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg
          })
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },  
  //6.0 写入数据，获取token
  startwrite: function () {
    let _this = this;
    let hex = data_jia;

    let typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16)
    }))

    let buffer = typedArray.buffer;

    wx.writeBLECharacteristicValue({
      deviceId: device_Id,
      serviceId: service_Id,
      characteristicId: writeCharacteristicId,
      value: buffer,
      success: function (res) {
        console.log("获取token成功:")
        console.log(res);
        //执行令牌解密以及开锁操作
        _this.getdata_token();
      }
    })

  },
  getdata_token: function () {
    let _this = this;
    _this.getdatapop_token(get_Data);
  },

  //6.2 获取后台解密后的数据
  getdatapop_token: function (get_Data) {
    let _this = this;
    wx.request({
      url: "https://xcx.zhiyunw.com/zhiyunpeihu/service/getDecrypt",
      data: {
        "hexString": get_Data
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("请求成功");
        if (res.data.errorCode == "0") {
          let datas = res.data.body.decrypt;
          //截取token字符段
          let str = datas.slice(6, 14);
          data_token = str;
          let hex = "050106303030303030" + str + "5E2636";
          hex_guan = "050C0101" + str + "0100010035274ADE";
          hex_kg = "050E0101" + str + "0100010035274ADE";//这个是检查锁的状态
          //02010101
          hex_dian = "02010101" + str + "0100010035274ADE";
          data_data = hex;

          console.log("解密后的数据");
          console.log(datas);
          //获取令牌后执行加密开锁
          _this.doKaiSuo();

        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg
          })
        }
      }
    })
  },
  //先加密，后开锁
  doKaiSuo: function () {
    let _this = this;

    wx.request({
      url: "https://xcx.zhiyunw.com/zhiyunpeihu/service/getEncrypt",
      data: {
        "hexString": data_data
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log("请求成功", res);
        if (res.data.errorCode == "0") {
          var datas = res.data.body.encrypt;
          data_jia = datas;

          //获取密文然后去开锁
          _this.kaisuo();
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg
          })
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  //8.0 开锁
  kaisuo: function () {
    let _this = this;

    let hex1 = data_jia;
    console.log("开锁指定加密，准备发送");
    let typedArray = new Uint8Array(hex1.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16)
    }))

    let buffer = typedArray.buffer;

    wx.writeBLECharacteristicValue({
      deviceId: device_Id,
      serviceId: service_Id,
      characteristicId: writeCharacteristicId,
      value: buffer,
      success: function (res) {

        //获取状态然后解密
        // _this.huoqzl(hex_kg);
        //解密
        console.log("开锁成功之后蓝牙返回的数据================：" + get_Data);
        setTimeout(function () {
          console.log("开锁成功之后蓝牙返回的数据1================：" + get_Data);
          _this.getdatapop(get_Data);
          console.log(kaisuozt)

        }, 5000)



      }
    })

  },
  //6.2 获取后台解密后的数据
  getdatapop: function (get_Data) {
    console.log("get_Data===========:" + get_Data)
    let _this = this;
    wx.request({
      url: "https://xcx.zhiyunw.com/zhiyunpeihu/service/getDecrypt",
      data: {
        "hexString": get_Data
      },
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.errorCode == "0") {
          let datas = res.data.body.decrypt;
          //截取token字符段
          kaisuozt = datas.slice(0, 8);
          console.log("解密后的数据" + kaisuozt);
          console.log(datas);

          if (kaisuozt == '05020100') {
            console.log("开锁成功")
            wx.closeBLEConnection({//开锁成功之后关闭连接
              deviceId: device_Id + "",
              success(res) {
                _this.setData({
                  shows: true
                })
                console.log("开锁成功之后断开链接成功");
              }
            })
            wx.closeBluetoothAdapter({
              success(res) {
              },
              fail(res) {
              }
            })
          } else if (kaisuozt == '05020101') {
            console.log("失败")
            _this.setData({
              shows: true
            })
            wx.showToast({
              icon: 'none',
              title: "开锁失败 钱自动退回"
            })
            wx.closeBLEConnection({//开锁成功之后关闭连接
              deviceId: device_Id ,
              success(res) {
                _this.setData({
                  shows: true
                })
                wx.closeBluetoothAdapter({
                  success(res) {
                  },
                  fail(res) {
                  }
                })
                console.log("开锁成功之后断开链接成功");
              }
            })
           
          }else{
            console.log("开锁成功或者失败的最后的失败")
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