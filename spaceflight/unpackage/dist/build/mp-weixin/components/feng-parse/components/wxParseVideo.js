(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/feng-parse/components/wxParseVideo"],{"094e":function(t,n,e){"use strict";var o=e("29fc"),a=e.n(o);a.a},"29fc":function(t,n,e){},"4d09":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"wxParseVideo",props:{node:{}},data:function(){return{playState:!0,videoStyle:"width: 100%;"}},methods:{play:function(){console.log("点击了video 播放"),this.playState=!this.playState}},mounted:function(){var n=this;t.$on("slideMenuShow",(function(t){console.log("捕获事件："+t),"show"==t&&n.playState&&(n.playState=!1)}))}};n.default=e}).call(this,e("543d")["default"])},"5dc6":function(t,n,e){"use strict";e.r(n);var o=e("4d09"),a=e.n(o);for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);n["default"]=a.a},9032:function(t,n,e){"use strict";e.r(n);var o=e("b542"),a=e("5dc6");for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);e("094e");var c,i=e("f0c5"),r=Object(i["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);n["default"]=r.exports},b542:function(t,n,e){"use strict";var o,a=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return o}))}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/feng-parse/components/wxParseVideo-create-component',
    {
        'components/feng-parse/components/wxParseVideo-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("9032"))
        })
    },
    [['components/feng-parse/components/wxParseVideo-create-component']]
]);
