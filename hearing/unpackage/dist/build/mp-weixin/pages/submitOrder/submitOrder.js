(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/submitOrder/submitOrder"],{"03cf":function(t,e,a){"use strict";a.r(e);var n=a("7240"),o=a.n(n);for(var u in n)"default"!==u&&function(t){a.d(e,t,(function(){return n[t]}))}(u);e["default"]=o.a},"158b":function(t,e,a){},7240:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=u(a("17c9")),o=a("cea1");function u(t){return t&&t.__esModule?t:{default:t}}var c={data:function(){return{Color:"#fff",backColor:"#06A5C4",user:"",call:"",id:""}},onLoad:function(t){this.id=t.shop},methods:{getuserinfo:function(e){var a=this;""!=this.user?""!=this.call?/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.call)?t.login({provider:"weixin",success:function(e){console.log(e.code),t.getUserInfo({success:function(u){console.log(u);var c={cmd:"saveCouponOrder",uid:t.getStorageSync("uid"),id:a.id,code:e.code,userInfo:u.userInfo,type:3,name:a.user,phone:a.call};n.default.showLoading("",(function(){var e={data:c,success:function(e){console.log(e),0==e.data.result?(n.default.hideLoading(),t.requestPayment({provider:"wxpay",timeStamp:e.data.body.timeStamp,nonceStr:e.data.body.nonceStr,package:e.data.body.package,signType:e.data.body.signType,paySign:e.data.body.paySign,success:function(e){t.navigateTo({url:"/pages/result/result?type=0"})},fail:function(t){n.default.showToast(t)}})):(n.default.hideLoading(),n.default.showToast(e.data.resultNote))}};(0,o.ajax)(e)}))}})}}):n.default.showToast("手机号格式不正确"):n.default.showToast("手机号不能为空"):n.default.showToast("姓名不能为空")}}};e.default=c}).call(this,a("543d")["default"])},"73ae":function(t,e,a){"use strict";a.r(e);var n=a("f061"),o=a("03cf");for(var u in o)"default"!==u&&function(t){a.d(e,t,(function(){return o[t]}))}(u);a("f918");var c,s=a("f0c5"),r=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,"7a337658",null,!1,n["a"],c);e["default"]=r.exports},ac1b:function(t,e,a){"use strict";(function(t){a("7954");n(a("66fd"));var e=n(a("73ae"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},f061:function(t,e,a){"use strict";var n,o=function(){var t=this,e=t.$createElement;t._self._c},u=[];a.d(e,"b",(function(){return o})),a.d(e,"c",(function(){return u})),a.d(e,"a",(function(){return n}))},f918:function(t,e,a){"use strict";var n=a("158b"),o=a.n(n);o.a}},[["ac1b","common/runtime","common/vendor"]]]);