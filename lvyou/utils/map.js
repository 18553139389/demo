// 引入SDK核心类
var QQMapWX = require('../lib/qqmap-wx-jssdk.min.js');
// 实例化API核心类
var qqmap = new QQMapWX({
  key: 'PUHBZ-XHL3R-676WI-WC44A-TCSL3-GJFGX'//申请的开发者秘钥key
});
class map {
  /**
   * 坐标转换地址
   */
  static getAddress(latitude, longitude, callback, errback = "") {
    
    qqmap.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function(res) {
        callback(res)
      },
      fail(err) {
        errback(err)
      }
    })
  }
  /**
    * 中国正常GCJ02坐标---->百度地图BD09坐标
    * 腾讯地图用的也是GCJ02坐标
    */
  static tb(latitude, longitude) {
    let $x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    let $x = longitude;
    let $y = latitude;
    let $z = Math.sqrt($x * $x + $y * $y) + 0.00002 * Math.sin($y * $x_pi);
    let $theta = Math.atan2($y, $x) + 0.000003 * Math.cos($x * $x_pi);
    let $lng = $z * Math.cos($theta) + 0.0065;
    let $lat = $z * Math.sin($theta) + 0.006;
    return {lat:$lat,lon:$lng}
  }
  /**
    * 百度地图BD09坐标---->中国正常GCJ02坐标
    * 腾讯地图用的也是GCJ02坐标
    */
  static bt(latitude, longitude){
    let $x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    let $x = longitude - 0.0065;
    let $y = latitude - 0.006;
    let $z = Math.sqrt($x * $x + $y * $y) - 0.00002 * Math.sin($y * $x_pi);
    let $theta = Math.atan2($y, $x) - 0.000003 * Math.cos($x * $x_pi);
    let $lng = $z * Math.cos($theta);
    let $lat = $z * Math.sin($theta);
    return {lat:$lat,lon:$lng}
  }
}
module.exports = map;