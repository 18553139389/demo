(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"13a5":function(t,e,n){},"1eef":function(t,e,n){"use strict";(function(t){n("9183"),n("921b");var e=r(n("66fd")),o=r(n("a69b")),u=r(n("6be4"));function r(t){return t&&t.__esModule?t:{default:t}}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){a(t,e,n[e])})}return t}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}e.default.prototype.$store=u.default,e.default.config.productionTip=!1;var i=function(){return n.e("colorui/components/cu-custom").then(n.bind(null,"f4cc"))};e.default.component("cu-custom",i),o.default.mpType="app";var l=new e.default(c({},o.default));t(l).$mount()}).call(this,n("543d")["createApp"])},"2c39":function(t,e,n){"use strict";var o=n("13a5"),u=n.n(o);u.a},9033:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=u(n("66fd"));function u(t){return t&&t.__esModule?t:{default:t}}var r={globalData:{userInfo:null},onLaunch:function(){t.hideTabBar(),wx.checkSession({success:function(){console.log("ok")},fail:function(){t.login({provider:"weixin",success:function(t){console.log(t),wx.redirectTo({url:"../login/login?code="+t.code})}})}}),t.getSystemInfo({success:function(t){o.default.prototype.StatusBar=t.statusBarHeight;var e=wx.getMenuButtonBoundingClientRect();o.default.prototype.Custom=e,o.default.prototype.CustomBar=e.bottom+e.top-t.statusBarHeight}})},onShow:function(){t.hideTabBar()},onHide:function(){}};e.default=r}).call(this,n("543d")["default"])},a69b:function(t,e,n){"use strict";n.r(e);var o=n("e06e");for(var u in o)"default"!==u&&function(t){n.d(e,t,function(){return o[t]})}(u);n("2c39");var r,c,a=n("2877"),i=Object(a["a"])(o["default"],r,c,!1,null,null,null);e["default"]=i.exports},e06e:function(t,e,n){"use strict";n.r(e);var o=n("9033"),u=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,function(){return o[t]})}(r);e["default"]=u.a}},[["1eef","common/runtime","common/vendor"]]]);