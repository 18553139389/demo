(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/myFriend/myFriend"],{"07ec":function(t,e,n){"use strict";var o=n("1dfa"),a=n.n(o);a.a},"1dfa":function(t,e,n){},"235a":function(t,e,n){"use strict";var o={mescrollUni:function(){return Promise.all([n.e("common/vendor"),n.e("components/mescroll-uni/mescroll-uni")]).then(n.bind(null,"321a"))}},a=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}))},"26a4":function(t,e,n){"use strict";n.r(e);var o=n("235a"),a=n("6ff2");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("07ec");var l,u=n("f0c5"),c=Object(u["a"])(a["default"],o["b"],o["c"],!1,null,"1a42b3ef",null,!1,o["a"],l);e["default"]=c.exports},6286:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("ba6d")),a=n("8442");function i(t){return t&&t.__esModule?t:{default:t}}var l=function(){Promise.all([n.e("common/vendor"),n.e("components/mescroll-uni/mescroll-uni")]).then(function(){return resolve(n("321a"))}.bind(null,n)).catch(n.oe)},u={data:function(){return{Color:"#333",backColor:"#fff",list:[],mescroll:null,downOption:{use:!0,auto:!0,autoShowLoading:!0,isLock:!1,isBoth:!0,offset:80,inOffsetRate:1,outOffsetRate:.2,bottomOffset:20,minAngle:45,textInOffset:"下拉刷新",textOutOffset:"释放更新",textLoading:"加载中 ..."},upOption:{use:!0,auto:!0,isLock:!1,isBoth:!0,page:{num:0,size:10,time:null},noMoreSize:6,textLoading:"加载中 ...",textNoMore:"-- 没有更多数据 --",toTop:{src:"http://www.mescroll.com/img/mescroll-totop.png",offset:1e3,duration:300},empty:{use:!0,icon:"http://www.mescroll.com/img/mescroll-empty.png",tip:"还没有人关注哦~~"}}}},components:{MescrollUni:l},onUnload:function(){this.mescroll=null},onReachBottom:function(){this.mescroll&&this.mescroll.onReachBottom()},onPageScroll:function(t){this.mescroll&&this.mescroll.onPageScroll(t)},methods:{mescrollInit:function(t){this.mescroll=t},downCallback:function(t){this.list=[],this.mescroll.resetUpScroll()},upCallback:function(t){t.num,t.size;var e=this;e.init(t)},topClick:function(){console.log("点击了回到顶部按钮")},init:function(e){var n=this,i={uid:t.getStorageSync("uid"),type:2,pageSize:e.size,pageNo:e.num};o.default.showLoading("",(function(){var t={url:"/api/myFenSiAndGz",data:i,success:function(t){console.log(t),0==t.data.result?(o.default.hideLoading(),t.data.dataList&&(n.list=t.data.dataList)):(o.default.hideLoading(),o.default.showToast(t.data.resultNote));var a=[];t.data.dataList&&(a=t.data.dataList);var i=1;t.data.totalPage&&(i=t.data.totalPage),e.endByPage(a.length,i)}};(0,a.ajax)(t)}))},goUser:function(e){t.navigateTo({url:"/pages/user/user?id="+e})}}};e.default=u}).call(this,n("543d")["default"])},"6ff2":function(t,e,n){"use strict";n.r(e);var o=n("6286"),a=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=a.a},a8d2:function(t,e,n){"use strict";(function(t){n("e91d");o(n("66fd"));var e=o(n("26a4"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["a8d2","common/runtime","common/vendor"]]]);