(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0e20":function(a,t,e){"use strict";(function(a,i){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(e("56cf")),s=e("b992");function o(a){return a&&a.__esModule?a:{default:a}}var d=function(){return e.e("components/an-notice-bar/an-notice-bar").then(e.bind(null,"b2d2"))},c={data:function(){return{val:"",StatusBar:this.StatusBar,autoplay:!0,interval:5e3,text:"",status1:!1,status2:!1,data3:[{title:"产品画册",img:"../../static/images/chanpinhuace.png",id:3},{title:"产品图片",img:"../../static/images/chanpintupian.png",id:2},{title:"产品海报",img:"../../static/images/chanpinhaibao.png",id:8},{title:"相关视频",img:"../../static/images/xiangguanship.png",id:7},{title:"全景360°",img:"../../static/images/quanjing360.png",id:5},{title:"培训材料",img:"../../static/images/peixuncailiao.png",id:4},{title:"故事案例",img:"../../static/images/gushianli.png",id:10},{title:"销售话术",img:"../../static/images/xiaoshouhuashu.png",id:11},{title:"微页",img:"../../static/images/cheweiye.png",id:6}],count3:1,has:!1,message:{},swiperList:[],show1:!1,total1:1,list1:[],show2:!1,total2:1,list2:[],list3:[]}},components:{AnNoticeBar:d},onShow:function(){this.message=a.getStorageSync("message"),this.init()},computed:{style:function(){var a=this.StatusBar,t="padding-top:".concat(a,"px;");return t}},methods:{init:function(){var a=this,t={Token:this.message.Token};n.default.showLoading("加载中...",function(){var e={url:"/app/service/has/dynamic",data:t,success:function(t){n.default.hideLoading(),1==t.data.success?a.has=t.data.body.hasDynamic:(n.default.hideLoading(),n.default.showToast(t.data.msg))}};(0,s.ajax)(e)});var e={Token:this.message.Token};n.default.showLoading("加载中...",function(){var t={url:"/app/service/carousel",data:e,success:function(t){console.log(i(t," at pages\\index\\index.vue:199")),n.default.hideLoading(),1==t.data.success?"undefined"!=t.data.body.list&&t.data.body.list.length>0&&(a.swiperList=t.data.body.list):(n.default.hideLoading(),n.default.showToast(t.data.msg))}};(0,s.ajax)(t)}),n.default.showLoading("加载中...",function(){var t={url:"/app/service/notice",data:e,success:function(t){if(1==t.data.success){if(n.default.hideLoading(),"undefined"!=t.data.body.list&&t.data.body.list.length>0){var e="";t.data.body.list.forEach(function(a){e+=a.title+"|"}),a.text=e.substr(0,e.length-1)}}else n.default.hideLoading(),n.default.showToast(t.data.msg)}};(0,s.ajax)(t)});var o=this.message.productType.split(",");if(o.indexOf("1")>-1){this.show1=!0;var d={Token:this.message.Token,productType:"1"};n.default.showLoading("加载中...",function(){var t={url:"/app/service/product/category",data:d,success:function(t){n.default.hideLoading(),1==t.data.success?"undefined"!=t.data.body.list&&t.data.body.list.length>0&&(a.total1=Math.ceil(t.data.body.list.length/8),a.total1>1&&(a.status1=!0),a.list1=t.data.body.list):(n.default.hideLoading(),n.default.showToast(t.data.msg))}};(0,s.ajax)(t)})}var c=this.message.productType.split(",");if(c.indexOf("2")>-1){this.show2=!0;var u={Token:this.message.Token,productType:"2"};n.default.showLoading("加载中...",function(){var t={url:"/app/service/product/category",data:u,success:function(t){n.default.hideLoading(),1==t.data.success?"undefined"!=t.data.body.list&&t.data.body.list.length>0&&(a.total2=Math.ceil(t.data.body.list.length/8),a.total2>1&&(a.status2=!0),a.list2=t.data.body.list):(n.default.hideLoading(),n.default.showToast(t.data.msg))}};(0,s.ajax)(t)})}var l={Token:this.message.Token};n.default.showLoading("加载中...",function(){var t={url:"/app/service/view/recent",data:l,success:function(t){console.log(i(t," at pages\\index\\index.vue:307")),1==t.data.success?(n.default.hideLoading(),"undefined"!=t.data.body.page.list&&t.data.body.page.list.length>0&&(a.list3=t.data.body.page.list)):(n.default.hideLoading(),n.default.showToast(t.data.msg))}};(0,s.ajax)(t)})},goSearch:function(){a.navigateTo({url:"/pages/search/search"})},goMessage:function(){a.navigateTo({url:"/pages/trend/trend"})},goNotice:function(){a.navigateTo({url:"/pages/notice/notice"})},goAll:function(t,e,i){a.navigateTo({url:"/pages/product/product?type=".concat(t,"&name=").concat(e,"&id=").concat(i)})},goDetail:function(t,e){6==t?a.navigateTo({url:"/pages/example/example"}):7==t?a.navigateTo({url:"/pages/speak/speak"}):(this.$store.commit("changeSelectId",e),a.switchTab({url:"/pages/allProduct/allProduct"}))},goLook:function(t){if(1==t.infoType)a.navigateTo({url:"/pages/detail/detail?id=".concat(t.viewId)});else if(3==t.infoType){var e={Token:this.message.Token,id:t.viewId,infoType:3};n.default.showLoading("加载中...",function(){var i={url:"/app/service/product/additional",data:e,success:function(e){if(1==e.data.success){n.default.hideLoading();var i=e.data.body.info;setTimeout(function(){a.navigateTo({url:"/pages/album/album?id=".concat(t.viewId,"&list=").concat(JSON.stringify(t),"&lists=").concat(JSON.stringify(i))})},300)}else n.default.hideLoading(),n.default.showToast(e.data.msg)}};(0,s.ajax)(i)})}else if(4==t.infoType){var i={Token:this.message.Token,id:t.viewId,infoType:4};n.default.showLoading("加载中...",function(){var e={url:"/app/service/product/additional",data:i,success:function(e){if(1==e.data.success){n.default.hideLoading();var i=e.data.body.info;setTimeout(function(){a.navigateTo({url:"/pages/train/train?id=".concat(t.viewId,"&list=").concat(JSON.stringify(t),"&lists=").concat(JSON.stringify(i))})},300)}else n.default.hideLoading(),n.default.showToast(e.data.msg)}};(0,s.ajax)(e)})}else if(5==t.infoType){var o={Token:this.message.Token,id:t.viewId,infoType:5};n.default.showLoading("加载中...",function(){var e={url:"/app/service/product/additional",data:o,success:function(e){if(1==e.data.success){var i="";i=e.data.body.info.content;var s=JSON.stringify(t);a.navigateTo({url:"/pages/360/360?url=".concat(i,"&id=").concat(t.viewId,"&list=").concat(s,"&type=5")}),n.default.hideLoading()}else n.default.hideLoading(),n.default.showToast(e.data.msg)}};(0,s.ajax)(e)})}else if(6==t.infoType){var d={Token:this.message.Token,id:t.viewId,infoType:6};n.default.showLoading("加载中...",function(){var e={url:"/app/service/product/additional",data:d,success:function(e){if(1==e.data.success){var i="";i=e.data.body.info.content;var s=JSON.stringify(t);a.navigateTo({url:"/pages/360/360?url=".concat(i,"&id=").concat(t.viewId,"&list=").concat(s,"&type=6")}),n.default.hideLoading()}else n.default.hideLoading(),n.default.showToast(e.data.msg)}};(0,s.ajax)(e)})}else 8==t.infoType&&a.navigateTo({url:"/pages/bill/bill?id=".concat(t.viewId)})},goText:function(t,e){a.navigateTo({url:"/pages/imgText/imgText?title=".concat(t,"&url=https://sale.clingcenter.net/").concat(e)})},goRecent:function(){a.navigateTo({url:"/pages/nearLook/nearLook"})}}};t.default=c}).call(this,e("6e42")["default"],e("0de9")["default"])},3310:function(a,t,e){"use strict";var i=e("cd27"),n=e.n(i);n.a},"3f6b":function(a,t,e){"use strict";var i,n=function(){var a=this,t=a.$createElement,i=(a._self._c,e("e20c")),n=e("e24b"),s=e("1522"),o=e("5e39");a.$mp.data=Object.assign({},{$root:{m0:i,m1:n,m2:s,m3:o}})},s=[];e.d(t,"b",function(){return n}),e.d(t,"c",function(){return s}),e.d(t,"a",function(){return i})},a146:function(a,t,e){"use strict";(function(a){e("0ad5"),e("921b");i(e("66fd"));var t=i(e("c4c4"));function i(a){return a&&a.__esModule?a:{default:a}}a(t.default)}).call(this,e("6e42")["createPage"])},abb9:function(a,t,e){"use strict";e.r(t);var i=e("0e20"),n=e.n(i);for(var s in i)"default"!==s&&function(a){e.d(t,a,function(){return i[a]})}(s);t["default"]=n.a},c4c4:function(a,t,e){"use strict";e.r(t);var i=e("3f6b"),n=e("abb9");for(var s in n)"default"!==s&&function(a){e.d(t,a,function(){return n[a]})}(s);e("3310");var o,d=e("f0c5"),c=Object(d["a"])(n["default"],i["b"],i["c"],!1,null,"88fb219e",null,!1,i["a"],o);t["default"]=c.exports},cd27:function(a,t,e){}},[["a146","common/runtime","common/vendor"]]]);