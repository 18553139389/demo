(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/messageDetail/messageDetail"],{"00bf":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=u(e("17c9")),o=e("cea1");function u(t){return t&&t.__esModule?t:{default:t}}var i=function(){Promise.all([e.e("common/vendor"),e.e("components/feng-parse/parse")]).then(function(){return resolve(e("c23e"))}.bind(null,e)).catch(e.oe)},c={data:function(){return{Color:"#333",backColor:"#fff",id:"",html:"",list:{}}},components:{uParse:i},onLoad:function(t){this.id=t.id,this.init(t.id)},methods:{init:function(t){var n=this,e={cmd:"getMsgById",id:t};a.default.showLoading("",(function(){var t={data:e,success:function(t){0==t.data.result?(a.default.hideLoading(),n.list=t.data,n.html=t.data.content,console.log(t)):(a.default.hideLoading(),a.default.showToast(t.data.resultNote))}};(0,o.ajax)(t)}))}}};n.default=c},"282f":function(t,n,e){},"491a":function(t,n,e){"use strict";(function(t){e("7954");a(e("66fd"));var n=a(e("fb6a"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"839e":function(t,n,e){"use strict";var a,o=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return a}))},8812:function(t,n,e){"use strict";e.r(n);var a=e("00bf"),o=e.n(a);for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);n["default"]=o.a},eb22:function(t,n,e){"use strict";var a=e("282f"),o=e.n(a);o.a},fb6a:function(t,n,e){"use strict";e.r(n);var a=e("839e"),o=e("8812");for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);e("eb22");var i,c=e("f0c5"),r=Object(c["a"])(o["default"],a["b"],a["c"],!1,null,"1f3bca6a",null,!1,a["a"],i);n["default"]=r.exports}},[["491a","common/runtime","common/vendor"]]]);