(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/modify/modify"],{"142b":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a("131d"),s=n(a("5264"));function n(t){return t&&t.__esModule?t:{default:t}}var i={data:function(){return{Color:"#333",tel:"",code:"",pass:"",btnState:!1,rTime:"获取验证码"}},methods:{getValidate:function(){if(""!=this.tel)if(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.tel)){var e=this;this.rTime=60;this.rTime;this.btnState=!0;var a=setInterval(function(){--e.rTime<=0&&(e.rTime="获取验证码",clearInterval(a),e.btnState=!1)},1e3),n={mobile:this.tel,type:1,os:t.getSystemInfoSync().platform,osversion:t.getSystemInfoSync().system,appversion:t.getStorageSync("appversion")};s.default.showLoading("",function(){var e={url:"/api/sms/sendsms",data:n,success:function(e){0==e.data.Code?(s.default.hideLoading(),s.default.showToast("发送成功")):-2==e.data.Code||-1==e.data.Code?(s.default.hideLoading(),s.default.showToast(e.data.Description),t.removeStorageSync("token"),setTimeout(function(){t.redirectTo({url:"/pages/login/login"})},500)):(s.default.hideLoading(),s.default.showToast(e.data.Description))}};(0,o.ajax)(e)})}else s.default.showToast("手机号格式不正确");else s.default.showToast("手机号不能为空")},sure:function(){if(""!=this.tel)if(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.tel))if(""!=this.code){var e=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;if(!e.test(this.pass)||this.pass.length<6||this.pass.length>12)s.default.showToast("密码只能是字母和数字组合6-12位");else{var a={mobile:this.tel,companyid:t.getStorageSync("id"),type:1,smscode:this.code,password:this.pass,os:t.getSystemInfoSync().platform,osversion:t.getSystemInfoSync().system,appversion:t.getStorageSync("appversion")};s.default.showLoading("",function(){var e={url:"/api/companyuser/ChangePswd",data:a,success:function(e){0==e.data.Code?(s.default.hideLoading(),s.default.showToast("修改密码成功"),setTimeout(function(){t.navigateBack({delta:1})},500)):-2==e.data.Code||-1==e.data.Code?(s.default.hideLoading(),s.default.showToast(e.data.Description),t.removeStorageSync("token"),setTimeout(function(){t.redirectTo({url:"/pages/login/login"})},500)):(s.default.hideLoading(),s.default.showToast(e.data.Description))}};(0,o.ajax)(e)})}}else s.default.showToast("验证码不能为空");else s.default.showToast("手机号格式不正确");else s.default.showToast("手机号不能为空")}}};e.default=i}).call(this,a("6e42")["default"])},"2a0b":function(t,e,a){"use strict";var o=a("b342"),s=a.n(o);s.a},"2ffe":function(t,e,a){"use strict";a.r(e);var o=a("b1dc"),s=a("427f");for(var n in s)"default"!==n&&function(t){a.d(e,t,function(){return s[t]})}(n);a("2a0b");var i=a("2877"),d=Object(i["a"])(s["default"],o["a"],o["b"],!1,null,"5aa9bae4",null);e["default"]=d.exports},"427f":function(t,e,a){"use strict";a.r(e);var o=a("142b"),s=a.n(o);for(var n in o)"default"!==n&&function(t){a.d(e,t,function(){return o[t]})}(n);e["default"]=s.a},9912:function(t,e,a){"use strict";(function(t){a("2448"),a("921b");o(a("66fd"));var e=o(a("2ffe"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("6e42")["createPage"])},b1dc:function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},s=[];a.d(e,"a",function(){return o}),a.d(e,"b",function(){return s})},b342:function(t,e,a){}},[["9912","common/runtime","common/vendor"]]]);