(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/user"],{"0649":function(t,e,a){"use strict";a.r(e);var n=a("3327"),o=a("5484");for(var u in o)"default"!==u&&function(t){a.d(e,t,(function(){return o[t]}))}(u);a("5ee3");var i,d=a("f0c5"),c=Object(d["a"])(o["default"],n["b"],n["c"],!1,null,"6a99d2e3",null,!1,n["a"],i);e["default"]=c.exports},"0d4c":function(t,e,a){"use strict";(function(t){a("7954");n(a("66fd"));var e=n(a("0649"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},"125f":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=u(a("17c9")),o=a("cea1");function u(t){return t&&t.__esModule?t:{default:t}}var i=function(){a.e("components/kx-datetime/kx-datetime").then(function(){return resolve(a("28ee"))}.bind(null,a)).catch(a.oe)},d=function(){a.e("components/popup/uni-popup").then(function(){return resolve(a("f5ce"))}.bind(null,a)).catch(a.oe)},c={data:function(){return{Color:"#333",backColor:"#fff",userList:{},date:"",startdate:"1960-1-1",enddate:"2030-1-1",head:"",age:"",sex:"",sexList:["女","男"]}},onShow:function(){this.init()},components:{KXDateTime:i,uniPopup:d},methods:{init:function(){var e=this,a={cmd:"userInfo",uid:t.getStorageSync("uid")};n.default.showLoading("",(function(){var t={data:a,success:function(t){0==t.data.result?(n.default.hideLoading(),e.userList=t.data,e.age=t.data.age,e.sex=t.data.sex,e.head=t.data.icon,console.log(t)):(n.default.hideLoading(),n.default.showToast(t.data.resultNote))}};(0,o.ajax)(t)}))},goNick:function(){t.navigateTo({url:"/pages/nick/nick"})},goBind:function(){t.navigateTo({url:"/pages/bind/bind"})},choiceTime:function(){this.$refs.date.open()},kxdatetime:function(e){this.age=e;var a={cmd:"editAge",uid:t.getStorageSync("uid"),age:e};n.default.showLoading("",(function(){var t={data:a,success:function(t){0==t.data.result?(n.default.hideLoading(),n.default.showToast("生日修改成功")):(n.default.hideLoading(),n.default.showToast(t.data.resultNote))}};(0,o.ajax)(t)}))},showPopup:function(){var t=this;this.$nextTick((function(){t.$refs["showpopup"].open()}))},changeSex:function(e){var a=this;this.$refs["showpopup"].close();var u={cmd:"editSex",uid:t.getStorageSync("uid"),sex:e};n.default.showLoading("",(function(){var t={data:u,success:function(t){0==t.data.result?(n.default.hideLoading(),a.sex=0==e?0:1,n.default.showToast("性别修改成功")):(n.default.hideLoading(),n.default.showToast(t.data.resultNote))}};(0,o.ajax)(t)}))},changeHead:function(){var e=this;t.chooseImage({count:1,sizeType:["original","compressed"],success:function(a){n.default.showLoading("上传中...",(function(){a.tempFilePaths.forEach((function(a,u){t.uploadFile({url:"https://xcx.boinhearing.cn/api/addimgs",filePath:a,name:"file",success:function(a){n.default.hideLoading(),e.video=[];var u=JSON.parse(a.data);e.head=u.objects[0];var i={cmd:"editIcon",uid:t.getStorageSync("uid"),icon:e.head};n.default.showLoading("",(function(){var t={data:i,success:function(t){0==t.data.result?(n.default.hideLoading(),n.default.showToast("头像修改成功")):(n.default.hideLoading(),n.default.showToast(t.data.resultNote))}};(0,o.ajax)(t)}))},fail:function(t){n.default.hideLoading(),n.default.showToast("上传失败")}})}))}))},fail:function(t){n.default.hideLoading(),n.default.showToast("上传失败")}})}}};e.default=c}).call(this,a("543d")["default"])},3327:function(t,e,a){"use strict";var n={uniPopup:function(){return a.e("components/uni-popup/uni-popup").then(a.bind(null,"100e"))}},o=function(){var t=this,e=t.$createElement;t._self._c},u=[];a.d(e,"b",(function(){return o})),a.d(e,"c",(function(){return u})),a.d(e,"a",(function(){return n}))},5484:function(t,e,a){"use strict";a.r(e);var n=a("125f"),o=a.n(n);for(var u in n)"default"!==u&&function(t){a.d(e,t,(function(){return n[t]}))}(u);e["default"]=o.a},"5ee3":function(t,e,a){"use strict";var n=a("fc14"),o=a.n(n);o.a},fc14:function(t,e,a){}},[["0d4c","common/runtime","common/vendor"]]]);