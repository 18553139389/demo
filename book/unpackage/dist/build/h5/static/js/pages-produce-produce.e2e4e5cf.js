(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-produce-produce"],{"28c3":function(t,e,n){"use strict";(function(t){var c=n("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=c(n("f869")),r={data:function(){return{Color:"#333",title:"",content:"",loading:!1,webviewStyles:{progress:{color:"#FF3333"}}}},components:{uParse:i.default},onLoad:function(e){t("log",e," at pages/produce/produce.vue:35"),this.title=decodeURIComponent(e.title),this.content=decodeURIComponent(e.content)}};e.default=r}).call(this,n("0de9")["log"])},"6c08":function(t,e,n){"use strict";n.r(e);var c=n("28c3"),i=n.n(c);for(var r in c)"default"!==r&&function(t){n.d(e,t,(function(){return c[t]}))}(r);e["default"]=i.a},"7c09":function(t,e,n){"use strict";n.r(e);var c=n("b683"),i=n("6c08");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("8984");var o,a=n("f0c5"),s=Object(a["a"])(i["default"],c["b"],c["c"],!1,null,"cb7efc6c",null,!1,c["a"],o);e["default"]=s.exports},8984:function(t,e,n){"use strict";var c=n("c7cd"),i=n.n(c);i.a},b683:function(t,e,n){"use strict";var c,i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"contain"},[n("v-uni-view",{staticClass:"fixed"},[n("cu-custom",{attrs:{isBack:!0,Color:t.Color,isIcon:!0,bgColor:"bg-shadeTop text-white"}},[n("template",{attrs:{slot:"backText"},slot:"backText"}),n("template",{attrs:{slot:"content"},slot:"content"},[t._v(t._s(t.title))])],2)],1),n("v-uni-view",{staticClass:"wrapper"},[n("v-uni-web-view",{attrs:{"webview-styles":t.webviewStyles,src:t.content}})],1)],1)},r=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return c}))},c7cd:function(t,e,n){var c=n("d6bb");"string"===typeof c&&(c=[[t.i,c,""]]),c.locals&&(t.exports=c.locals);var i=n("4f06").default;i("2f11b8c8",c,!0,{sourceMap:!1,shadowMode:!1})},d6bb:function(t,e,n){var c=n("24fb");e=c(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.contain[data-v-cb7efc6c]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.contain .fixed[data-v-cb7efc6c]{width:100%}.contain .wrapper[data-v-cb7efc6c]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.contain .wrapper .content[data-v-cb7efc6c]{width:100%;font-size:14px;color:#333}.contain .wrapper img[data-v-cb7efc6c]{width:100%}',""]),t.exports=e}}]);