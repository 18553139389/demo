const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 接口域名地址
const baseInfo = "https://ph.moon2018.com/nuanxinpeihu/service/";
// const baseInfo = "http://192.168.3.150:8080/zhiyunpeihu/service/";
// 单张图片上传地址
// const upload = "http://192.168.3.218/zhiyunpeihu/service/uploadImage";
const upload = "https://ph.moon2018.com/nuanxinpeihu/service/uploadImage";

const tips = {
  1: '抱歉，出现了一个错误',
  2: '请先登录'
}
const postD = function (url, data = {}, method = '2') {
  return new Promise((resolve, reject) => {
    _request(url, resolve, reject, data, method);
  })
}
function _request(url, resolve, reject, data = {}, method = 1) {
  let methods = method === 2 ? "POST" : 'GET';
  wx.request({
    url: api_blink_url + "?json=" + JSON.stringify(data),
    // url: api_blink_url + url,
    // data: "",
    data: data,
    dataType: "json",
    method: methods,
    header: {
      "Content-Type": "application/json"
    },
    success: (res) => {
      const code = res.statusCode.toString();
      if (code.startsWith("2")) {
        resolve(res);
      }
      else {
        reject();
        _showErr(code)
      }
    },
    fail: (err) => {
      reject();
      _showErr(1)
    }
  })
}
function _showErr(errCode = 1) {
  const tip = tips[errCode];
  wx.showToast({
    title: tip ? tip : tips[1],
    icon: "none",
    duration: 2000
  })
}

module.exports = {
  formatTime: formatTime,
  baseInfo: baseInfo,
  upload: upload,
  postD: postD
}

