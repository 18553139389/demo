(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/an-notice-bar/an-notice-bar"],{"2b6f":function(t,n,e){"use strict";e.r(n);var o=e("dd1d"),u=e("74ad");for(var r in u)"default"!==r&&function(t){e.d(n,t,(function(){return u[t]}))}(r);e("2e4b");var i,c=e("f0c5"),a=Object(c["a"])(u["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);n["default"]=a.exports},"2e4b":function(t,n,e){"use strict";var o=e("d3df"),u=e.n(o);u.a},"74ad":function(t,n,e){"use strict";e.r(n);var o=e("9d8d"),u=e.n(o);for(var r in o)"default"!==r&&function(t){e.d(n,t,(function(){return o[t]}))}(r);n["default"]=u.a},"9d8d":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=function(){Promise.all([e.e("common/vendor"),e.e("components/uni-icons/uni-icons")]).then(function(){return resolve(e("cfdf"))}.bind(null,e)).catch(e.oe)},u={components:{uniIcons:o},props:{text:{type:"",default:"暂无消息"},color:{type:String,default:""},bgColor:{type:String,default:""},switchTime:{type:Number,default:5},showSerial:{type:Boolean,default:!0}},data:function(){return{number:0}},created:function(){this.startMove()},computed:{list:function(){return this.text.split("|")}},methods:{startMove:function(){var t=this;setTimeout((function(){t.number===t.list.length-1?t.number=0:t.number+=1,t.startMove()}),1e3*this.switchTime)},more:function(){this.$emit("more")}}};n.default=u},d3df:function(t,n,e){},dd1d:function(t,n,e){"use strict";var o,u=function(){var t=this,n=t.$createElement;t._self._c},r=[];e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return o}))}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/an-notice-bar/an-notice-bar-create-component',
    {
        'components/an-notice-bar/an-notice-bar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("2b6f"))
        })
    },
    [['components/an-notice-bar/an-notice-bar-create-component']]
]);