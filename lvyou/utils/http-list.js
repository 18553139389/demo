const HTTP=require("./http");

// 方法中  1：GET请求  2：POST请求
class req extends HTTP{ 
  postD(data){
        return this.request({
            url:"",
            method:2,
            data:data
        })
    }
  getD(data){
    return this.request({
      url: "",
      method: 1,
      data: data
    })
  }
  showLoading(text="加载中..."){
    wx.showLoading({
      title:text,
      mask:true
    })
    return this;
  }
  showToast(text){
    wx.showToast({
      title:text,
      mask:true,
      icon:"none"
    })
    return this;
  }
  // 小程序打开网页链接处理
  change1(url){
    // console.log(encodeURIComponent(url))
    // console.log(url,"url")
    // console.log(url.replace("?","!!"))
    return encodeURIComponent(url)
  }
  // change2(url){
  //   console.log(url,"2")
  //   let newUrl=decodeURIComponent(url)
  //   console.log(newUrl)
  //   return newUrl.replace("!!","?")
  // }
}

module.exports=req;

