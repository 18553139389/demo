(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-address-address"],{"0de9":function(t,e,i){"use strict";function a(t){var e=Object.prototype.toString.call(t);return e.substring(8,e.length-1)}function n(){return"string"===typeof __channelId__&&__channelId__}function o(t){for(var e=arguments.length,i=new Array(e>1?e-1:0),a=1;a<e;a++)i[a-1]=arguments[a];console[t].apply(console,i)}function s(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];var o=e.shift();if(n())return e.push(e.pop().replace("at ","uni-app:///")),console[o].apply(console,e);var s=e.map((function(t){var e=Object.prototype.toString.call(t).toLowerCase();if("[object object]"===e||"[object array]"===e)try{t="---BEGIN:JSON---"+JSON.stringify(t)+"---END:JSON---"}catch(n){t="[object object]"}else if(null===t)t="---NULL---";else if(void 0===t)t="---UNDEFINED---";else{var i=a(t).toUpperCase();t="NUMBER"===i||"BOOLEAN"===i?"---BEGIN:"+i+"---"+t+"---END:"+i+"---":String(t)}return t})),r="";if(s.length>1){var d=s.pop();r=s.join("---COMMA---"),0===d.indexOf(" at ")?r+=d:r+="---COMMA---"+d}else r=s[0];console[o](r)}i.r(e),i.d(e,"log",(function(){return o})),i.d(e,"default",(function(){return s}))},1135:function(t,e,i){"use strict";i.r(e);var a=i("fc93"),n=i("ce78");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("bb9c");var s,r=i("f0c5"),d=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"b8b5825a",null,!1,a["a"],s);e["default"]=d.exports},5048:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.ajax1=e.ajax=void 0;var i=function(e){e=e||{},e.url=e.url||"",e.data=JSON.stringify(e.data)||{},e.method=e.method||"POST",e.header=e.header||{"Content-Type":"application/x-www-form-urlencoded;charset=utf-8"},e.success=e.success||function(){},e.fail=e.fail||function(){},t("log",e.data," at request/request.js:11"),uni.request({url:"https://www.ytsh.vip/easyamoy/api/service",data:{json:e.data},method:e.method,header:e.header,success:function(t){e.success(t)},fail:function(t){e.fail(t),uni.showToast({title:"请稍后重试",icon:"none"})}})};e.ajax=i;var a=function(e){e=e||{},e.url=e.url||"",e.data=JSON.stringify(e.data)||{},e.method=e.method||"POST",e.header=e.header||{"Content-Type":"application/json"},e.success=e.success||function(){},e.fail=e.fail||function(){},t("log",e.data," at request/request.js:43"),uni.request({url:e.url,data:e.data,method:e.method,header:e.header,dataType:"json",success:function(t){e.success(t)},fail:function(t){e.fail(t),uni.showToast({title:"请稍后重试",icon:"none"})}})};e.ajax1=a}).call(this,i("0de9")["log"])},"83d3":function(t,e,i){var a=i("d74c");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("05c24908",a,!0,{sourceMap:!1,shadowMode:!1})},bb9c:function(t,e,i){"use strict";var a=i("83d3"),n=i.n(a);n.a},c572:function(t,e,i){"use strict";(function(t){var a=i("ee27");i("4160"),i("a434"),i("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i("5048"),o=a(i("eac7")),s={data:function(){return{Color:"#333",backColor:"#F8F9FB",current:0,list:[]}},onShow:function(){this.init()},methods:{init:function(){var t=this,e={cmd:"myaddresslist",uid:uni.getStorageSync("uid")};o.default.showLoading("",(function(){var i={data:e,success:function(e){0==e.data.result?(o.default.hideLoading(),e.data.dataList&&(t.list=e.data.dataList,t.list.forEach((function(t){1==t.isdefault&&(uni.setStorageSync("changeAddress",t.address+t.addressdetail),uni.setStorageSync("changeItem",JSON.stringify(t)))})))):(o.default.hideLoading(),o.default.showToast(e.data.resultNote))}};(0,n.ajax)(i)}))},radioChange:function(t){for(var e=0;e<this.list.length;e++)if(this.list[e].aid===t.target.value){this.current=e;break}var i={cmd:"addoreditaddresslist",uid:uni.getStorageSync("uid"),aid:this.list[this.current].aid,name:this.list[this.current].name,phone:this.list[this.current].phone,address:this.list[this.current].address,addressdetail:this.list[this.current].addressdetail,isdefault:1},a={data:i,success:function(t){0==t.data.result||o.default.showToast(t.data.resultNote)}};(0,n.ajax)(a)},goAdd:function(){uni.navigateTo({url:"/pages/editorAddress/editorAddress?type=1"})},goDel:function(e,i){var a=this;uni.showModal({content:"确认删除该地址吗？",confirmColor:"#FF6600",success:function(s){if(s.confirm){var r={cmd:"deleteaddress",uid:uni.getStorageSync("uid"),aid:e};o.default.showLoading("",(function(){var t={data:r,success:function(t){0==t.data.result?(o.default.hideLoading(),o.default.showToast("删除成功"),a.list.splice(i,1)):(o.default.hideLoading(),o.default.showToast(t.data.resultNote))}};(0,n.ajax)(t)}))}else s.cancel&&t("log","用户点击取消"," at pages/address/address.vue:148")}})},goEditor:function(t){var e=JSON.stringify(t);uni.navigateTo({url:"/pages/editorAddress/editorAddress?type=0&list="+e})},goChange:function(t){uni.setStorageSync("changeAddress",t.address+t.addressdetail),uni.setStorageSync("changeItem",JSON.stringify(t)),uni.setStorageSync("changeAid",t.aid),setTimeout((function(){uni.navigateBack({delta:1})}),300)}}};e.default=s}).call(this,i("0de9")["log"])},ce78:function(t,e,i){"use strict";i.r(e);var a=i("c572"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},d74c:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.contain[data-v-b8b5825a]{width:100%;min-height:100vh;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;background:#f8f9fb;position:relative}.contain .fixed[data-v-b8b5825a]{width:100%}.contain .wrapper[data-v-b8b5825a]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;padding-bottom:%?120?%}.contain .wrapper .item[data-v-b8b5825a]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;font-size:14px;color:#333;padding:0 %?28?%;box-sizing:border-box}.contain .wrapper .item li[data-v-b8b5825a]{width:100%;padding:%?24?% 0 0;border-radius:4px;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;background:#fff;margin-bottom:%?30?%}.contain .wrapper .item li .user[data-v-b8b5825a]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:0 %?28?%;box-sizing:border-box}.contain .wrapper .item li .content[data-v-b8b5825a]{width:100%;color:#666;margin:%?30?% 0;padding:0 %?28?%;box-sizing:border-box}.contain .wrapper .item li .status[data-v-b8b5825a]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:%?40?% %?28?%;box-sizing:border-box;border-top:1px solid #eee}.contain .wrapper .item li .status .status-left[data-v-b8b5825a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.contain .wrapper .item li .status .status-left span[data-v-b8b5825a]{margin-left:%?24?%}.contain .wrapper .item li .status .status-left .del[data-v-b8b5825a]{padding:%?8?% %?30?%;border:1px solid #eee;border-radius:4px}.contain .wrapper .item li .status .status-left .editor[data-v-b8b5825a]{padding:%?8?% %?30?%;border-radius:4px;background:#f60;color:#fff;margin-left:%?24?%}.contain .add[data-v-b8b5825a]{width:100%;height:%?90?%;line-height:%?90?%;text-align:center;font-size:15px;color:#fff;background:#f60;position:fixed;left:0;bottom:0;z-index:999}',""]),t.exports=e},eac7:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={showToast:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"none",i=arguments.length>2?arguments[2]:void 0;uni.showToast({title:t,icon:e,duration:2e3,mask:!0,success:i})},hideToast:function(){uni.hideToast()},showLoading:function(t,e){uni.showLoading({title:t,mask:!0,success:e})},hideLoading:function(){uni.hideLoading()}},n=a;e.default=n},fc93:function(t,e,i){"use strict";var a,n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"contain"},[i("v-uni-view",{staticClass:"fixed"},[i("cu-custom",{attrs:{isBack:!0,Color:t.Color,backColor:t.backColor,isIcon:!0,bgColor:"bg-shadeTop text-white"}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"},[t._v("地址管理")])],2)],1),t.list.length>0?i("v-uni-view",{staticClass:"wrapper"},[i("v-uni-radio-group",{on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.radioChange.apply(void 0,arguments)}}},[i("ul",{staticClass:"item"},t._l(t.list,(function(e,a){return i("li",{key:a,on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goChange(e)}}},[i("v-uni-view",{staticClass:"user"},[i("span",[t._v(t._s(e.name))]),i("span",{staticStyle:{"margin-left":"24upx"}},[t._v(t._s(e.phone))])]),i("v-uni-view",{staticClass:"content"},[t._v(t._s(e.address)+t._s(e.addressdetail))]),i("v-uni-view",{staticClass:"status",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e)}}},[i("v-uni-view",{staticClass:"status-left"},[i("v-uni-radio",{attrs:{value:e.aid,checked:a===t.current,color:"#FF6600"}}),i("span",[t._v("设为默认")])],1),i("v-uni-view",{staticClass:"status-left"},[a!==t.current?i("v-uni-view",{staticClass:"del",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goDel(e.aid,a)}}},[t._v("删除")]):t._e(),i("v-uni-view",{staticClass:"editor",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goEditor(e)}}},[t._v("编辑")])],1)],1)],1)})),0)])],1):t._e(),i("v-uni-view",{staticClass:"add",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goAdd.apply(void 0,arguments)}}},[t._v("添加地址")])],1)},o=[];i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}))}}]);