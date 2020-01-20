

  class map{
    static request(url, params, method = "GET", type = "json") {
      console.log("向后端传递的参数", params);
      return new Promise((resolve, reject) => {
        let opts = {
          url: url,
          data: Object.assign({}, params),
          method: method,
          header: { 'Content-Type': type },
          success: resolve,
          fail: reject
        }
        // console.log("请求的URL", opts.url);
        wx.request(opts);
      });
    };
    /**
     * 获取用户中心位置经纬度
     * @param {ctx} name 
     */
    static getCenterLocation(name) {
      return new Promise((resolve, reject) => name.getCenterLocation({ success: resolve, fail: reject }));
    }
  }
module.exports=map;