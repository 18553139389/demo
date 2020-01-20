const config = require("../config.js");

const tips = {
  1: '网络问题，请重试',
  2: '请先登录'
}

// const HTTP = function(url, resolve, reject, data = {}, method = 1) {
//   let methods = method === 2 ? "POST" : 'GET';
//   wx.request({
//     url: config.api_blink_url + "?json=" + JSON.stringify(data),
//     data: "",
//     dataType: "json",
//     method: methods,
//     header: {
//       "Content-Type": "application/json"
//     },
//     success: (res) => {
//       const code = res.statusCode.toString();
//       if (code.startsWith("2")) {
//         resolve(res);
//       } else {
//         reject();
//         const tip = tips[errCode];
//         wx.showToast({
//           title: tip ? tip : tips[1],
//           icon: "none",
//           duration: 2000
//         })
//       }
//     },
//     fail: (err) => {
//       reject();
//       const tip = tips[errCode];
//       wx.showToast({
//         title: tip ? tip : tips[1],
//         icon: "none",
//         duration: 2000
//       })
//     }
//   });
// }

class HTTP {
  constructor() {
    this.baseUrl = config.api_blink_url
  }

  request({
    url,
    data = {},
    method = 1
  }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method);
    })
  }

  _request(url, resolve, reject, data = {}, method = 1) {
    let methods = method === 2 ? "POST" : 'GET';
    wx.request({
      url: config.api_blink_url + "?json=" + JSON.stringify(data),
      data: "",
      dataType: "json",
      method: methods,
      header: {
        "Content-Type": "application/json"
      },
      success: (res) => {
        const code = res.statusCode.toString();
        if (code.startsWith("2")) {
          resolve(res);
        } else {
          reject();
          this._showErr(code)
        }
      },
      fail: (err) => {
        reject();
        this._showErr(1)
      }
    })
  }

  // 正常
  // _request(url, resolve, reject, data = {}, method = 1) {
  //   let methods = method === 2 ? "POST" : 'GET';
  //   wx.request({
  //     url: config.api_blink_url + url,
  //     data: data,
  //     dataType: "json",
  //     method: methods,
  //     header: {
  //       "Content-Type": "application/json"
  //     },
  //     success: (res) => {
  //       const code = res.statusCode.toString();
  //       if (code.startsWith("2")) {
  //         resolve(res);
  //       }
  //       else {
  //         reject();
  //         this._showErr(code)
  //       }
  //     },
  //     fail: (err) => {
  //       reject();
  //       this._showErr(1)
  //     }
  //   })
  // }

  _showErr(errCode = 1) {
    const tip = tips[errCode];
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: "none",
      duration: 2000
    })
  }
}

module.exports = HTTP;