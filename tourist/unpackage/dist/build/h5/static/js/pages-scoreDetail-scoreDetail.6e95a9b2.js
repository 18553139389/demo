(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-scoreDetail-scoreDetail"],{"01b2":function(t,e,o){e=t.exports=o("2350")(!1),e.push([t.i,"uni-page-body[data-v-3d9efd00]{width:100%;height:100%}.contain[data-v-3d9efd00]{width:100%;height:100%;background:#f8f8f8}.title[data-v-3d9efd00]{width:100%;padding:%?30?%;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:14px;color:#333;text-align:justify}.content[data-v-3d9efd00]{width:100%;padding:0 %?30?%;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:12px;color:#999;text-align:justify}",""])},"0a6f":function(t,e,o){"use strict";o.r(e);var i=o("c6ef"),n=o("ef77");for(var a in n)"default"!==a&&function(t){o.d(e,t,function(){return n[t]})}(a);o("a9e9");var r=o("2877"),s=Object(r["a"])(n["default"],i["a"],i["b"],!1,null,"3d9efd00",null);e["default"]=s.exports},"5b30":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{Color:"#DE2910",value:"",backColor:"#FFFFFF"}},onLoad:function(){if(this.getRequest("uid")){var t=this.getRequest("uid");this.$store.commit("changeUid",t)}},onReady:function(){},methods:{getRequest:function(t){for(var e=window.location.search.substring(1),o=e.split("&"),i=0;i<o.length;i++){var n=o[i].split("=");if(n[0]==t)return n[1]}return!1}}};e.default=i},a9e9:function(t,e,o){"use strict";var i=o("f6d5"),n=o.n(i);n.a},c6ef:function(t,e,o){"use strict";var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-uni-view",{staticClass:"contain"},[o("v-uni-view",{staticClass:"fixed"},[o("cu-custom",{attrs:{isBack:!0,Color:t.Color,backColor:t.backColor,isIcon:!0,bgColor:"bg-shadeTop text-white"}},[o("template",{attrs:{slot:"backText"},slot:"backText"}),o("template",{attrs:{slot:"content"},slot:"content"},[t._v("积分规则")])],2)],1),o("v-uni-view",{staticClass:"title"},[t._v("机票预订成功通知")]),o("v-uni-view",{staticClass:"content"},[t._v("购买飞机票成功了购买飞机票成功了购买飞机票成功了购买飞机票成功了购买飞机票成功了购买飞机票成功了。")])],1)},n=[];o.d(e,"a",function(){return i}),o.d(e,"b",function(){return n})},ef77:function(t,e,o){"use strict";o.r(e);var i=o("5b30"),n=o.n(i);for(var a in i)"default"!==a&&function(t){o.d(e,t,function(){return i[t]})}(a);e["default"]=n.a},f6d5:function(t,e,o){var i=o("01b2");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=o("4f06").default;n("9a97477e",i,!0,{sourceMap:!1,shadowMode:!1})}}]);