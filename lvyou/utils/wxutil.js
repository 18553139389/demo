class util{
  static toast(title,icon=0,duration=1500,callback){
    wx.showToast({
      title:title,
      icon:icon===0?"none":icon===1?"success":"loading",
      duration:duration,
      success:()=>{
        if(callback){
          callback();
        }
      }
    })
  }
}

module.exports=util;