(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/my"],{"04bc":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n("2f62"),r=a(n("17c9")),u=n("cea1");function a(e){return e&&e.__esModule?e:{default:e}}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){f(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s={data:function(){return{Color:"#333",backColor:"#ffffff",userList:{}}},computed:i({},(0,o.mapState)({myInfo:function(e){return e.user.myInfo}})),onShow:function(){this.init()},methods:{init:function(){var t=this,n={cmd:"userInfo",uid:e.getStorageSync("uid")};r.default.showLoading("",(function(){var e={data:n,success:function(e){0==e.data.result?(r.default.hideLoading(),t.userList=e.data,console.log(e)):(r.default.hideLoading(),r.default.showToast(e.data.resultNote))}};(0,u.ajax)(e)}))},goPerson:function(){e.navigateTo({url:"/pages/user/user"})},goMessage:function(){e.navigateTo({url:"/pages/message/message"})},goOrder:function(t){e.navigateTo({url:"/pages/order/order?type="+t})},goComment:function(){e.navigateTo({url:"/pages/myComment/myComment"})},goStore:function(){e.navigateTo({url:"/pages/myStore/myStore"})},goAbout:function(t){e.navigateTo({url:"/pages/myContent/myContent?num="+t})},goQuestion:function(){e.navigateTo({url:"/pages/question/question"})},goBack:function(){this.myInfo.userID&&this.$store.dispatch("resetStore"),e.clearStorageSync(),e.reLaunch({url:"/pages/login/login"})}}};t.default=s}).call(this,n("543d")["default"])},"0a9c":function(e,t,n){"use strict";n.r(t);var o=n("04bc"),r=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,(function(){return o[e]}))}(u);t["default"]=r.a},"1ee5":function(e,t,n){"use strict";var o,r=function(){var e=this,t=e.$createElement;e._self._c},u=[];n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return o}))},"4ab1":function(e,t,n){},d082:function(e,t,n){"use strict";var o=n("4ab1"),r=n.n(o);r.a},d273:function(e,t,n){"use strict";(function(e){n("7954");o(n("66fd"));var t=o(n("f4cd"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},f4cd:function(e,t,n){"use strict";n.r(t);var o=n("1ee5"),r=n("0a9c");for(var u in r)"default"!==u&&function(e){n.d(t,e,(function(){return r[e]}))}(u);n("d082");var a,c=n("f0c5"),i=Object(c["a"])(r["default"],o["b"],o["c"],!1,null,"3361bc2f",null,!1,o["a"],a);t["default"]=i.exports}},[["d273","common/runtime","common/vendor"]]]);