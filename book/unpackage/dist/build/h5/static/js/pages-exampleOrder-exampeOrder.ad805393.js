(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-exampleOrder-exampeOrder"],{1366:function(t,e,i){"use strict";i.r(e);var n=i("c698"),a=i("2485");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("be62");var s,l=i("f0c5"),c=Object(l["a"])(a["default"],n["b"],n["c"],!1,null,"086474c7",null,!1,n["a"],s);e["default"]=c.exports},"23a9":function(t,e,i){"use strict";(function(t){var n=i("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("eac7")),o=i("5048"),s=n(i("1aa6")),l={data:function(){return{Color:"#333",itemIndex:0,tab:["投诉订单","被投诉订单"],uid:"",list:[],mescroll:null,downOption:{use:!0,auto:!0,autoShowLoading:!0,isLock:!1,isBoth:!0,offset:80,inOffsetRate:1,outOffsetRate:.2,bottomOffset:20,minAngle:45,textInOffset:"下拉刷新",textOutOffset:"释放更新",textLoading:"加载中 ..."},upOption:{use:!0,auto:!0,isLock:!1,isBoth:!0,page:{num:0,size:10,time:null},noMoreSize:6,textLoading:"加载中 ...",textNoMore:"-- 已经到底了 --",toTop:{src:"http://www.mescroll.com/img/mescroll-totop.png",offset:1e3,duration:300},empty:{use:!0,icon:"http://www.mescroll.com/img/mescroll-empty.png",tip:"没有符合条件的订单"}},state:5,look:!1}},components:{MescrollUni:s.default},onUnload:function(){this.mescroll=null},onReachBottom:function(){this.mescroll&&this.mescroll.onReachBottom()},onPageScroll:function(t){this.mescroll&&this.mescroll.onPageScroll(t)},onLoad:function(){this.uid=uni.getStorageSync("uid")},methods:{changeTab:function(t){this.look||(this.itemIndex=t,0==this.itemIndex?this.state=5:1==this.itemIndex&&(this.state=6),this.look=!0,this.list=[],this.mescroll.resetUpScroll())},mescrollInit:function(t){this.mescroll=t},downCallback:function(t){this.list=[],this.mescroll.resetUpScroll()},upCallback:function(t){t.num,t.size;var e=this;e.init(t,this.state)},topClick:function(){t("log","点击了回到顶部按钮"," at pages/exampleOrder/exampeOrder.vue:169")},init:function(e,i){var n=this,s={cmd:"myorderlist",uid:n.uid,type:i,nowPage:e.num,pageCount:e.size};a.default.showLoading("",(function(){var i={data:s,success:function(i){if(t("log",i," at pages/exampleOrder/exampeOrder.vue:186"),0==i.data.result){if(a.default.hideLoading(),i.data.dataList){for(var o=0;o<i.data.dataList.length;o++)n.list.push(i.data.dataList[o]);n.look=!1}}else a.default.hideLoading(),n.look=!1,a.default.showToast(i.data.resultNote);var s=[];i.data.dataList&&(s=i.data.dataList);var l=1;i.data.totalPage&&(l=i.data.totalPage),e.endByPage(s.length,l),n.look=!1}};(0,o.ajax)(i)}))},goCall:function(t){uni.makePhoneCall({phoneNumber:t})}}};e.default=l}).call(this,i("0de9")["log"])},2485:function(t,e,i){"use strict";i.r(e);var n=i("23a9"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},"2bfd":function(t,e,i){var n=i("642e");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("0f703bee",n,!0,{sourceMap:!1,shadowMode:!1})},"642e":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.contain[data-v-086474c7]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.contain .fixed[data-v-086474c7]{width:100%}.contain .wrapper[data-v-086474c7]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;padding:0 %?28?%;box-sizing:border-box}.contain .wrapper .tab[data-v-086474c7]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-around;justify-content:space-around;-webkit-align-self:center;align-self:center;font-size:14px;color:#333;margin-bottom:%?30?%}.contain .wrapper .tab .tab-item[data-v-086474c7]{padding:%?10?% %?40?%;border-radius:4px;border:1px solid #eee}.contain .wrapper .tab .tab-item.active[data-v-086474c7]{background:#f60;border:none;color:#fff}.contain .wrapper .lists[data-v-086474c7]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.contain .wrapper .lists .item[data-v-086474c7]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;margin-bottom:%?60?%}.contain .wrapper .lists .item .state[data-v-086474c7]{width:100%;height:%?80?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:14px;color:#999;border-bottom:1px solid #eee}.contain .wrapper .lists .item .product[data-v-086474c7]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;margin:%?30?% 0}.contain .wrapper .lists .item .product img[data-v-086474c7]{width:%?120?%;height:%?120?%;border-radius:4px}.contain .wrapper .lists .item .product .product-item[data-v-086474c7]{width:80%;height:%?120?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-justify-content:space-around;justify-content:space-around;font-size:14px;color:#333}.contain .wrapper .lists .item .product .product-item .product-title[data-v-086474c7]{width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.contain .wrapper .lists .item .product .product-item .price[data-v-086474c7]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.contain .wrapper .lists .item .total[data-v-086474c7]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?28?%;color:#999}.contain .wrapper .lists .item .time[data-v-086474c7]{width:100%;height:%?90?%;line-height:%?90?%;font-size:12px;color:#999;border-bottom:1px solid #eee}.contain .wrapper .lists .item .btns[data-v-086474c7]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;margin:%?36?% 0}.contain .wrapper .lists .item .btns .pay2[data-v-086474c7]{padding:%?8?% %?40?%;border-radius:4px;background:#f60;font-size:14px;color:#fff}.contain .wrapper .lists .item .btns .pay1[data-v-086474c7]{padding:%?8?% %?40?%;border-radius:4px;background:#fff;font-size:14px;color:#f60;border:1px solid #eee;margin-right:%?30?%}',""]),t.exports=e},be62:function(t,e,i){"use strict";var n=i("2bfd"),a=i.n(n);a.a},c698:function(t,e,i){"use strict";var n={mescrollUni:i("1aa6").default},a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"contain"},[i("v-uni-view",{staticClass:"fixed"},[i("cu-custom",{attrs:{isBack:!0,Color:t.Color,isIcon:!0,bgColor:"bg-shadeTop text-white"}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"},[t._v("投诉订单")])],2)],1),i("v-uni-view",{staticClass:"wrapper"},[i("v-uni-view",{staticClass:"tab"},t._l(t.tab,(function(e,n){return i("v-uni-view",{key:n,staticClass:"tab-item",class:t.itemIndex==n?"active":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeTab(n)}}},[t._v(t._s(e))])})),1),i("mescroll-uni",{attrs:{down:t.downOption,up:t.upOption},on:{down:function(e){arguments[0]=e=t.$handleEvent(e),t.downCallback.apply(void 0,arguments)},up:function(e){arguments[0]=e=t.$handleEvent(e),t.upCallback.apply(void 0,arguments)},init:function(e){arguments[0]=e=t.$handleEvent(e),t.mescrollInit.apply(void 0,arguments)},emptyclick:function(e){arguments[0]=e=t.$handleEvent(e),t.emptyClick.apply(void 0,arguments)},topclick:function(e){arguments[0]=e=t.$handleEvent(e),t.topClick.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"lists"},t._l(t.list,(function(e,n){return i("v-uni-view",{key:n,staticClass:"item"},[i("v-uni-view",{staticClass:"state"},[i("v-uni-view",[t._v("订单编号："+t._s(e.ordernum))]),t.uid==e.uid&&0==e.state?i("v-uni-view",{staticStyle:{color:"#FF6600"}},[t._v("待付款")]):t._e(),t.uid==e.uid&&1==e.state?i("v-uni-view",{staticStyle:{color:"#FF6600"}},[t._v("待卖家收款")]):t._e(),t.uid==e.taid&&1==e.state1?i("v-uni-view",{staticStyle:{color:"#FF6600"}},[t._v("待收款")]):t._e(),t.uid==e.uid&&2==e.state?i("v-uni-view",{staticStyle:{color:"#FF6600"}},[t._v("待上架")]):t._e(),t.uid==e.taid&&2==e.state1?i("v-uni-view",{staticStyle:{color:"#FF6600"}},[t._v("待发货")]):t._e(),t.uid==e.uid&&3==e.state?i("v-uni-view",{staticStyle:{color:"#FF6600"}},[t._v("已委托")]):t._e(),t.uid==e.taid&&3==e.state1?i("v-uni-view",{staticStyle:{color:"#FF6600"}},[t._v("已发货")]):t._e(),t.uid==e.taid&&4==e.state1?i("v-uni-view",{staticStyle:{color:"#FF6600"}},[t._v("已完成")]):t._e(),t.uid==e.uid&&6==e.state?i("v-uni-view",{staticStyle:{color:"#FF6600"}},[t._v("已申诉")]):t._e(),t.uid==e.taid&&6==e.state1?i("v-uni-view",{staticStyle:{color:"#FF6600"}},[t._v("已申诉")]):t._e(),t.uid==e.uid&&7==e.state?i("v-uni-view",{staticStyle:{color:"#FF6600"}},[t._v("已取消")]):t._e(),t.uid==e.taid&&7==e.state1?i("v-uni-view",{staticStyle:{color:"#FF6600"}},[t._v("已取消")]):t._e()],1),i("v-uni-view",{staticClass:"product"},[i("img",{attrs:{src:e.goodsimage,alt:""}}),i("v-uni-view",{staticClass:"product-item"},[i("v-uni-view",{staticClass:"product-title"},[t._v(t._s(e.goodsname))]),i("v-uni-view",{staticClass:"price"},[i("v-uni-view",{staticStyle:{"font-size":"32upx",color:"#FF6600"}},[t._v("￥"+t._s(e.goodsprice))]),i("v-uni-view",{staticStyle:{"font-size":"32upx",color:"#999"}},[t._v("x1")])],1)],1)],1),i("v-uni-view",{staticClass:"total",staticStyle:{"padding-bottom":"30upx","border-bottom":"1px solid #eee"}},[i("v-uni-view",{staticStyle:{"margin-right":"40upx"}},[t._v("共1个商品")]),i("v-uni-view",[t._v("实付："),i("span",{staticStyle:{color:"#FF6600"}},[t._v("￥"+t._s(e.goodsprice))])])],1),i("v-uni-view",{staticClass:"btns",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e)}}},[i("v-uni-view",{staticClass:"pay1",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goCall(e.pingtaiphone)}}},[t._v("联系平台撤销投诉")]),t.uid==e.taid&&6==e.state1?i("v-uni-view",{staticClass:"pay2",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goCall(e.userphone)}}},[t._v("联系客户")]):t._e(),t.uid==e.uid&&6==e.state1?i("v-uni-view",{staticClass:"pay2",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goCall(e.taphone)}}},[t._v("联系卖家")]):t._e()],1)],1)})),1)],1)],1)],1)},o=[];i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}))}}]);