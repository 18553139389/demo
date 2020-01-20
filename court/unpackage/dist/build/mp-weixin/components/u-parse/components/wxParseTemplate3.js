(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/u-parse/components/wxParseTemplate3"],{"3f95":function(e,n,t){"use strict";t.r(n);var r=t("6e1b"),a=t("6816");for(var o in a)"default"!==o&&function(e){t.d(n,e,function(){return a[e]})}(o);var u=t("2877"),s=Object(u["a"])(a["default"],r["a"],r["b"],!1,null,null,null);n["default"]=s.exports},6816:function(e,n,t){"use strict";t.r(n);var r=t("a415"),a=t.n(r);for(var o in r)"default"!==o&&function(e){t.d(n,e,function(){return r[e]})}(o);n["default"]=a.a},"6e1b":function(e,n,t){"use strict";var r=function(){var e=this,n=e.$createElement;e._self._c},a=[];t.d(n,"a",function(){return r}),t.d(n,"b",function(){return a})},a415:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=function(){return t.e("components/u-parse/components/wxParseTemplate4").then(t.bind(null,"59f4"))},a=function(){return t.e("components/u-parse/components/wxParseImg").then(t.bind(null,"b71c"))},o=function(){return t.e("components/u-parse/components/wxParseVideo").then(t.bind(null,"9e76"))},u=function(){return t.e("components/u-parse/components/wxParseAudio").then(t.bind(null,"549a"))},s={name:"wxParseTemplate3",props:{node:{}},components:{wxParseTemplate:r,wxParseImg:a,wxParseVideo:o,wxParseAudio:u},methods:{wxParseATap:function(e){var n=e.currentTarget.dataset.href;if(n){var t=this.$parent;while(!t.preview||"function"!==typeof t.preview)t=t.$parent;t.navigate(n,e)}}}};n.default=s}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/u-parse/components/wxParseTemplate3-create-component',
    {
        'components/u-parse/components/wxParseTemplate3-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("3f95"))
        })
    },
    [['components/u-parse/components/wxParseTemplate3-create-component']]
]);                
