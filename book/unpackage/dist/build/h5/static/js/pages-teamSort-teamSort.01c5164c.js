(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-teamSort-teamSort"],{"0de9":function(t,e,i){"use strict";function n(t){var e=Object.prototype.toString.call(t);return e.substring(8,e.length-1)}function a(){return"string"===typeof __channelId__&&__channelId__}function o(t){for(var e=arguments.length,i=new Array(e>1?e-1:0),n=1;n<e;n++)i[n-1]=arguments[n];console[t].apply(console,i)}function s(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];var o=e.shift();if(a())return e.push(e.pop().replace("at ","uni-app:///")),console[o].apply(console,e);var s=e.map((function(t){var e=Object.prototype.toString.call(t).toLowerCase();if("[object object]"===e||"[object array]"===e)try{t="---BEGIN:JSON---"+JSON.stringify(t)+"---END:JSON---"}catch(a){t="[object object]"}else if(null===t)t="---NULL---";else if(void 0===t)t="---UNDEFINED---";else{var i=n(t).toUpperCase();t="NUMBER"===i||"BOOLEAN"===i?"---BEGIN:"+i+"---"+t+"---END:"+i+"---":String(t)}return t})),r="";if(s.length>1){var c=s.pop();r=s.join("---COMMA---"),0===c.indexOf(" at ")?r+=c:r+="---COMMA---"+c}else r=s[0];console[o](r)}i.r(e),i.d(e,"log",(function(){return o})),i.d(e,"default",(function(){return s}))},"1d32":function(t,e,i){t.exports=i.p+"static/img/yj_bg.a71c1be7.png"},"1de5":function(t,e,i){"use strict";t.exports=function(t,e){return e||(e={}),t=t&&t.__esModule?t.default:t,"string"!==typeof t?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),e.hash&&(t+=e.hash),/["'() \t\n]/.test(t)||e.needQuotes?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t)}},5048:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.ajax1=e.ajax=void 0;var i=function(e){e=e||{},e.url=e.url||"",e.data=JSON.stringify(e.data)||{},e.method=e.method||"POST",e.header=e.header||{"Content-Type":"application/x-www-form-urlencoded;charset=utf-8"},e.success=e.success||function(){},e.fail=e.fail||function(){},t("log",e.data," at request/request.js:11"),uni.request({url:"https://www.ytsh.vip/easyamoy/api/service",data:{json:e.data},method:e.method,header:e.header,success:function(t){e.success(t)},fail:function(t){e.fail(t),uni.showToast({title:"请稍后重试",icon:"none"})}})};e.ajax=i;var n=function(e){e=e||{},e.url=e.url||"",e.data=JSON.stringify(e.data)||{},e.method=e.method||"POST",e.header=e.header||{"Content-Type":"application/json"},e.success=e.success||function(){},e.fail=e.fail||function(){},t("log",e.data," at request/request.js:43"),uni.request({url:e.url,data:e.data,method:e.method,header:e.header,dataType:"json",success:function(t){e.success(t)},fail:function(t){e.fail(t),uni.showToast({title:"请稍后重试",icon:"none"})}})};e.ajax1=n}).call(this,i("0de9")["log"])},"537f":function(t,e,i){"use strict";i.r(e);var n=i("8e4a"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},"8e4a":function(t,e,i){"use strict";var n=i("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i("5048"),o=n(i("eac7")),s={data:function(){return{Color:"#FFFFFF",backColor:"",list:[],mine:""}},onShow:function(){this.init()},methods:{init:function(){var t=this,e={cmd:"rankinglist",uid:uni.getStorageSync("uid"),pageCount:100};o.default.showLoading("",(function(){var i={data:e,success:function(e){0==e.data.result?(o.default.hideLoading(),t.list=e.data.dataList,t.mine=e.data.datastr):(o.default.hideLoading(),o.default.showToast(e.data.resultNote))}};(0,a.ajax)(i)}))}}};e.default=s},a70e:function(t,e,i){"use strict";i.r(e);var n=i("b13fd"),a=i("537f");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("c4a2");var s,r=i("f0c5"),c=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,"08f15ac6",null,!1,n["a"],s);e["default"]=c.exports},b13fd:function(t,e,i){"use strict";var n,a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"contain"},[n("v-uni-view",{staticClass:"fixed"},[n("cu-custom",{attrs:{isBack:!0,Color:t.Color,backColor:t.backColor,isIcon:!0,bgColor:"bg-shadeTop text-white"}},[n("template",{attrs:{slot:"backText"},slot:"backText"}),n("template",{attrs:{slot:"content"},slot:"content"},[t._v("佣金排名")])],2)],1),n("v-uni-view",{staticClass:"wrapper"},[n("v-uni-view",{staticClass:"top1"},[n("img",{attrs:{src:i("b3c6"),alt:""}}),n("v-uni-view",{staticClass:"sort"},[t._v("NO."+t._s(t.mine))])],1),n("v-uni-view",{staticClass:"list"},[n("v-uni-view",{staticClass:"lis"},[n("v-uni-view",{staticClass:"head"},[n("v-uni-view",[t._v("排名")]),n("v-uni-view",[t._v("昵称")]),n("v-uni-view",[t._v("累计佣金")])],1),n("v-uni-scroll-view",{staticClass:"scroll-Y",staticStyle:{height:"600upx"},attrs:{"scroll-y":"true","show-scrollbar":"true"}},t._l(t.list,(function(e,i){return n("v-uni-view",{key:i,staticClass:"item"},[n("v-uni-view",{staticStyle:{color:"#FF6600","font-size":"28upx",width:"10%"}},[t._v(t._s(e.rank))]),n("v-uni-view",{staticClass:"name"},[n("img",{attrs:{src:e.userimage.indexOf("https")>-1?e.userimage:"https://www.ytsh.vip/"+e.userimage,alt:""}}),n("v-uni-view",{staticStyle:{width:"45%"}},[t._v(t._s(e.username))])],1),n("v-uni-view",{staticStyle:{color:"#FF6600",width:"30%","text-align":"center"}},[t._v(t._s(e.money)+"元")])],1)})),1)],1)],1)],1)],1)},o=[];i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}))},b3c6:function(t,e,i){t.exports=i.p+"static/img/jiangbei.2254a362.png"},b776:function(t,e,i){var n=i("24fb"),a=i("1de5"),o=i("1d32"),s=i("d9e1");e=n(!1);var r=a(o),c=a(s);e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.contain[data-v-08f15ac6]{width:100%;height:100vh;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;overflow:hidden;background:url('+r+");background-size:100% 100%}.contain .fixed[data-v-08f15ac6]{width:100%}.contain .wrapper[data-v-08f15ac6]{width:100%;height:calc(100vh - %?130?%);overflow:hidden;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.contain .wrapper .top1[data-v-08f15ac6]{width:%?300?%;height:%?348?%;position:relative;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.contain .wrapper .top1 img[data-v-08f15ac6]{position:absolute;top:0;left:0;width:100%;height:100%}.contain .wrapper .top1 .sort[data-v-08f15ac6]{font-size:%?48?%;color:#fff;z-index:10;margin-top:%?180?%}.contain .wrapper .list[data-v-08f15ac6]{width:85%;background:url("+c+") no-repeat 50%;background-size:100% 100%;margin-top:%?-30?%;z-index:99;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.contain .wrapper .list .lis[data-v-08f15ac6]{width:%?480?%;padding-top:%?80?%;padding-bottom:%?30?%;box-sizing:border-box}.contain .wrapper .list .lis .head[data-v-08f15ac6]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?26?%;color:#333;margin-bottom:%?10?%}.contain .wrapper .list .lis .item[data-v-08f15ac6]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?20?%;color:#333;margin-top:%?40?%}.contain .wrapper .list .lis .item .name[data-v-08f15ac6]{width:60%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;margin-left:%?100?%}.contain .wrapper .list .lis .item .name img[data-v-08f15ac6]{width:%?40?%;height:%?40?%;border-radius:50%;margin-right:%?10?%}.contain .wrapper .list .lis .item .name uni-view[data-v-08f15ac6]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",""]),t.exports=e},c4a2:function(t,e,i){"use strict";var n=i("e43c"),a=i.n(n);a.a},d9e1:function(t,e,i){t.exports=i.p+"static/img/paihangbang.d22e7e9a.png"},e43c:function(t,e,i){var n=i("b776");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("c1abb4d8",n,!0,{sourceMap:!1,shadowMode:!1})},eac7:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={showToast:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"none",i=arguments.length>2?arguments[2]:void 0;uni.showToast({title:t,icon:e,duration:2e3,mask:!0,success:i})},hideToast:function(){uni.hideToast()},showLoading:function(t,e){uni.showLoading({title:t,mask:!0,success:e})},hideLoading:function(){uni.hideLoading()}},a=n;e.default=a}}]);