(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["colorui/components/cu-custom"],{"1c63":function(t,n,o){},33007:function(t,n,o){"use strict";var a=o("1c63"),c=o.n(a);c.a},"363f":function(t,n,o){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar}},name:"cu-custom",computed:{style:function(){var t=this.StatusBar,n=this.CustomBar,o=this.bgImage,a=this.Color,c=this.backColor,e="height:".concat(n,"px;padding-top:").concat(t,"px;color:").concat(a,";background-color:").concat(c);return this.bgImage&&(e="".concat(e,"background-image:url(").concat(o,");color:").concat(a,";background-color:").concat(c)),e}},props:{bgColor:{type:String,default:""},isBack:{type:[Boolean,String],default:!1},isIcon:{type:[Boolean,String],default:!1},isBacks:{type:[Boolean,String],default:!1},isIcons:{type:[Boolean,String],default:!1},bgImage:{type:String,default:""},Color:{type:String,default:""},backColor:{type:String,default:"#FFFFFF"}},methods:{BackPage:function(){t.navigateBack({delta:1})},goRight:function(){this.$emit("goRight")},Back:function(){this.$emit("Back")}}};n.default=o}).call(this,o("543d")["default"])},"71b6":function(t,n,o){"use strict";var a,c=function(){var t=this,n=t.$createElement;t._self._c},e=[];o.d(n,"b",(function(){return c})),o.d(n,"c",(function(){return e})),o.d(n,"a",(function(){return a}))},"79ee":function(t,n,o){"use strict";o.r(n);var a=o("363f"),c=o.n(a);for(var e in a)"default"!==e&&function(t){o.d(n,t,(function(){return a[t]}))}(e);n["default"]=c.a},ce52:function(t,n,o){"use strict";o.r(n);var a=o("71b6"),c=o("79ee");for(var e in c)"default"!==e&&function(t){o.d(n,t,(function(){return c[t]}))}(e);o("33007");var u,r=o("f0c5"),i=Object(r["a"])(c["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],u);n["default"]=i.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'colorui/components/cu-custom-create-component',
    {
        'colorui/components/cu-custom-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("ce52"))
        })
    },
    [['colorui/components/cu-custom-create-component']]
]);
