(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/law/law"],{3229:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return o})},4847:function(t,e,n){},6273:function(t,e,n){"use strict";(function(t){n("9183"),n("921b");a(n("66fd"));var e=a(n("b395"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},8098:function(t,e,n){"use strict";n.r(e);var a=n("a0f3"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);e["default"]=o.a},a0f3:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("92ac"),o=u(n("51d2")),i=u(n("95a3")),l=u(n("788b"));function u(t){return t&&t.__esModule?t:{default:t}}var s=function(){return n.e("components/robby-image-upload/robby-image-upload").then(n.bind(null,"6b8b"))},c={data:function(){return{show:!1,radio:1,address:"",user:"",tel:"",content:"",imageData:[],url:i.default.baseUrl,longitude:"",latitude:""}},components:{robbyImageUpload:s},onLoad:function(){var e=this;t.getLocation({type:"gcj02",success:function(t){e.latitude=t.latitude,e.longitude=t.longitude;var n=new l.default.AMapWX({key:"196ae56c16a196319ccabd73b260c593"});n.getRegeo({location:e.longitude+","+e.latitude,success:function(t){console.log(t),e.address=t[0].name},fail:function(t){console.log(t)}})}})},methods:{shows:function(){this.show=!0},RadioChange:function(t){this.radio=t.detail.value,this.show=!1},deleteImage:function(t){console.log(t)},addImage:function(t){console.log(t)},control:function(){this.show=!1},submit:function(){if(""!=this.address)if(""!=this.user)if(""!=this.tel)if(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.tel))if(""!=this.content)if(this.content.length>300)o.default.showTitle("举报内容不能超过300字");else if(0!=this.imageData.length){for(var e=this.imageData,n=0;n<e.length;n++)e[n].indexOf(this.url)>-1&&(e[n]=e[n].substr(this.url.length));var i=e.join("|"),l={uid:t.getStorageSync("uid"),complType:this.radio,cname:this.user,telnum:this.tel,content:this.content,material:i,location:this.address,longitude:this.longitude,latitude:this.latitude};o.default.showLoading("加载中...");var u={url:"/complPhotograph/submit",data:l,header:{"Content-Type":"application/x-www-form-urlencoded"},success:function(e){console.log(e),1==e.data.success&&(o.default.hideLoading(),o.default.showTitle("提交成功"),setTimeout(function(){t.navigateBack({delta:1})},500))}};(0,a.ajax)(u)}else o.default.showTitle("请上传图片");else o.default.showTitle("举报内容不能为空");else o.default.showTitle("手机号格式不正确");else o.default.showTitle("手机号不能为空");else o.default.showTitle("姓名不能为空");else o.default.showTitle("位置不能为空")}}};e.default=c}).call(this,n("543d")["default"])},b395:function(t,e,n){"use strict";n.r(e);var a=n("3229"),o=n("8098");for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);n("c34d");var l=n("2877"),u=Object(l["a"])(o["default"],a["a"],a["b"],!1,null,null,null);e["default"]=u.exports},c34d:function(t,e,n){"use strict";var a=n("4847"),o=n.n(a);o.a}},[["6273","common/runtime","common/vendor"]]]);