(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-about-about"],{"14d9":function(t,e,n){"use strict";var a=n("9ffa"),i=n.n(a);i.a},1897:function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.contain[data-v-8d5f273a]{width:100%;min-height:100vh;background:#fff}.contain .wrapper[data-v-8d5f273a]{width:1200px;min-height:100vh;margin:0 auto;padding-top:%?15?%;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.contain .wrapper .title[data-v-8d5f273a]{width:100%;text-align:center;font-size:16px;font-weight:600;color:#333}.contain .wrapper .message[data-v-8d5f273a]{width:80%;display:-webkit-box;display:-webkit-flex;display:flex;height:%?30?%;background:#f6f6f6;border-radius:4px;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:0 %?10?%;box-sizing:border-box;font-size:14px;margin-top:%?30?%}.contain .wrapper .message .message-left[data-v-8d5f273a]{font-size:14px;color:#666}.contain .wrapper uni-image[data-v-8d5f273a]{width:%?80?%;height:%?80?%;margin-top:%?30?%}.contain .wrapper .wx[data-v-8d5f273a]{width:%?120?%;height:%?20?%;line-height:%?20?%;text-align:center;background:#f6f6f6;border-radius:24px;margin:%?10?% auto 0;font-size:14px}',""]),t.exports=e},"217e":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={showToast:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"none",n=arguments.length>2?arguments[2]:void 0;uni.showToast({title:t,icon:e,duration:2e3,mask:!0,success:n})},hideToast:function(){uni.hideToast()},showLoading:function(t,e){uni.showLoading({title:t,mask:!0,success:e})},hideLoading:function(){uni.hideLoading()}},i=a;e.default=i},"496e":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ajax1=e.ajax=void 0;var a=function(t){t=t||{},t.url=t.url||"",t.data=t.data||{},t.method=t.method||"POST",t.header=t.header||{"Content-Type":"application/x-www-form-urlencoded"},t.success=t.success||function(){},t.fail=t.fail||function(){},console.log(t.data),uni.request({url:"http://47.94.251.81:9008/api/"+t.url,data:t.data,method:t.method,header:t.header,success:function(e){t.success(e)},fail:function(e){t.fail(e),uni.showToast({title:"请稍后重试",icon:"none"})}})};e.ajax=a;var i=function(t){t=t||{},t.url=t.url||"",t.data=JSON.stringify(t.data)||{},t.method=t.method||"POST",t.header=t.header||{"Content-Type":"application/json"},t.success=t.success||function(){},t.fail=t.fail||function(){},console.log(t.data),uni.request({url:t.url,data:t.data,method:t.method,header:t.header,dataType:"json",success:function(e){t.success(e)},fail:function(e){t.fail(e),uni.showToast({title:"请稍后重试",icon:"none"})}})};e.ajax1=i},"6d20":function(t,e,n){"use strict";var a=n("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a(n("217e")),o=n("496e"),s={data:function(){return{code:"",phone:""}},onLoad:function(){this.init()},methods:{init:function(){var t=this,e={},n={url:"customer",data:e,success:function(e){console.log(e),e.data.success?(t.code=e.data.body.code,t.phone=e.data.body.phone):i.default.showToast(e.data.msg)}};(0,o.ajax)(n)}}};e.default=s},"9ffa":function(t,e,n){var a=n("1897");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("57f54728",a,!0,{sourceMap:!1,shadowMode:!1})},c93c:function(t,e,n){"use strict";n.r(e);var a=n("6d20"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=i.a},db42:function(t,e,n){"use strict";var a,i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"contain"},[n("v-uni-view",{staticClass:"wrapper"},[n("v-uni-view",{staticClass:"title"},[t._v("联系我们")]),n("v-uni-view",{staticClass:"message"},[n("v-uni-view",{staticClass:"message-left"},[t._v(t._s(t.phone)+" 平台电话")]),n("v-uni-view",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goCall.apply(void 0,arguments)}}},[t._v("联系我们")])],1),n("v-uni-image",{attrs:{src:t.code}}),n("v-uni-view",{staticClass:"wx"},[t._v("扫描添加客服微信")])],1)],1)},o=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}))},f9e8:function(t,e,n){"use strict";n.r(e);var a=n("db42"),i=n("c93c");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("14d9");var s,r=n("f0c5"),c=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,"8d5f273a",null,!1,a["a"],s);e["default"]=c.exports}}]);