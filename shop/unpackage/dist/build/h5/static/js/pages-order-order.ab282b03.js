(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-order-order"],{"01e9":function(t,i,e){"use strict";var n=e("63b5"),a=e.n(n);a.a},"142c":function(t,i,e){"use strict";var n,a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"contain"},[e("v-uni-view",{staticClass:"wrapper"},[e("v-uni-view",{staticClass:"tab"},t._l(t.tabs,function(i,n){return e("v-uni-view",{key:n,staticClass:"tab-item",class:t.itemIndex==n?"active":"",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.change(n)}}},[t._v(t._s(i))])}),1),e("mescroll-uni",{attrs:{down:t.downOption,up:t.upOption},on:{down:function(i){arguments[0]=i=t.$handleEvent(i),t.downCallback.apply(void 0,arguments)},up:function(i){arguments[0]=i=t.$handleEvent(i),t.upCallback.apply(void 0,arguments)},init:function(i){arguments[0]=i=t.$handleEvent(i),t.mescrollInit.apply(void 0,arguments)},emptyclick:function(i){arguments[0]=i=t.$handleEvent(i),t.emptyClick.apply(void 0,arguments)},topclick:function(i){arguments[0]=i=t.$handleEvent(i),t.topClick.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"lists"},t._l(t.list,function(i,n){return e("v-uni-view",{key:n,staticClass:"item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goDetail(i.orderId)}}},[e("v-uni-view",{staticClass:"list-top"},[e("v-uni-view",[t._v(t._s(i.orderId))]),0==i.state?e("v-uni-view",[t._v("待完成")]):t._e(),1==i.state?e("v-uni-view",[t._v("已完成")]):t._e(),2==i.state?e("v-uni-view",[t._v("订单无效")]):t._e()],1),e("v-uni-view",{staticClass:"list-middle"},[e("img",{attrs:{src:i.productImage,alt:""}}),e("v-uni-view",{staticClass:"product"},[e("v-uni-view",[t._v(t._s(i.productTitle))]),e("v-uni-view",{staticClass:"price"},[e("v-uni-view",{staticStyle:{color:"red"}},[t._v("￥"+t._s(i.price))]),e("v-uni-view",{staticStyle:{"margin-left":"40upx"}},[t._v("x"+t._s(i.qty))])],1)],1)],1),e("v-uni-view",{staticClass:"list-top"},[e("v-uni-view",[t._v(t._s(i.createDate))]),e("v-uni-view",[t._v("合计："),e("span",{staticStyle:{color:"red"}},[t._v("￥"+t._s(i.amount))])])],1)],1)}),1)],1)],1)],1)},o=[];e.d(i,"b",function(){return a}),e.d(i,"c",function(){return o}),e.d(i,"a",function(){return n})},"2b70":function(t,i,e){"use strict";e.r(i);var n=e("8c3b"),a=e.n(n);for(var o in n)"default"!==o&&function(t){e.d(i,t,function(){return n[t]})}(o);i["default"]=a.a},"585b":function(t,i,e){"use strict";e.r(i);var n=e("142c"),a=e("2b70");for(var o in a)"default"!==o&&function(t){e.d(i,t,function(){return a[t]})}(o);e("01e9");var l,s=e("f0c5"),c=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"5fd5e7a8",null,!1,n["a"],l);i["default"]=c.exports},"63b5":function(t,i,e){var n=e("e981");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=e("4f06").default;a("9ac9e0c8",n,!0,{sourceMap:!1,shadowMode:!1})},"8c3b":function(t,i,e){"use strict";var n=e("288e");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a=n(e("9ff2")),o=e("65dd"),l=n(e("ee67")),s={data:function(){return{Color:"#333",backColor:"#EDEDED",itemIndex:0,tabs:["全部","待完成","已完成"],type:"",list:[],mescroll:null,downOption:{use:!0,auto:!0,autoShowLoading:!0,isLock:!1,isBoth:!0,offset:80,inOffsetRate:1,outOffsetRate:.2,bottomOffset:20,minAngle:45,textInOffset:"下拉刷新",textOutOffset:"释放更新",textLoading:"加载中 ..."},upOption:{use:!0,auto:!0,isLock:!1,isBoth:!0,page:{num:0,size:10,time:null},noMoreSize:6,textLoading:"加载中 ...",textNoMore:"-- 没有更多数据 --",toTop:{src:"http://www.mescroll.com/img/mescroll-totop.png",offset:1e3,duration:300},empty:{use:!0,icon:"http://www.mescroll.com/img/mescroll-empty.png",tip:"没有符合条件的订单"}}}},onShow:function(){this.mescroll&&(this.list=[],this.mescroll.resetUpScroll())},components:{MescrollUni:l.default},onUnload:function(){this.mescroll=null},onReachBottom:function(){this.mescroll&&this.mescroll.onReachBottom()},onPageScroll:function(t){this.mescroll&&this.mescroll.onPageScroll(t)},methods:{mescrollInit:function(t){this.mescroll=t},downCallback:function(t){this.list=[],this.mescroll.resetUpScroll()},upCallback:function(t){t.num,t.size;var i=this;i.init(t,this.type)},topClick:function(){console.log("点击了回到顶部按钮")},init:function(t,i){var e=this,n={uid:uni.getStorageSync("uid"),type:i,pageNo:t.num,pageSize:t.size},l={url:"/orderList",data:n,success:function(i){if(console.log(i),0==i.data.result){if(i.data.dataList)for(var n=0;n<i.data.dataList.length;n++)e.list.push(i.data.dataList[n])}else a.default.showToast(i.data.resultNote);var o=[];i.data.dataList&&(o=i.data.dataList);var l=1;i.data.totalPage&&(l=i.data.totalPage),t.endByPage(o.length,l)}};(0,o.ajax)(l)},change:function(t){this.itemIndex=t,0==t?this.type="":1==t?this.type="0":2==t&&(this.type="1"),this.list=[],this.mescroll.resetUpScroll()},goDetail:function(t){uni.navigateTo({url:"/pages/productDetail/productDetail?id="+t})}}};i.default=s},e981:function(t,i,e){i=t.exports=e("2350")(!1),i.push([t.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.contain[data-v-5fd5e7a8]{width:100%;min-height:100vh;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;background:#ededed}.contain .fixed[data-v-5fd5e7a8]{width:100%}.contain .wrapper[data-v-5fd5e7a8]{width:100%;padding:0 %?28?%;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;margin-top:%?24?%}.contain .wrapper .tab[data-v-5fd5e7a8]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-justify-content:space-around;justify-content:space-around}.contain .wrapper .tab .tab-item[data-v-5fd5e7a8]{font-size:%?30?%;color:#999}.contain .wrapper .tab .tab-item.active[data-v-5fd5e7a8]{color:#111}.contain .wrapper .lists[data-v-5fd5e7a8]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;margin-top:%?30?%}.contain .wrapper .lists .item[data-v-5fd5e7a8]{width:100%;padding:%?24?%;box-sizing:border-box;background:#fff;border-radius:4px;margin:0 0 %?30?%}.contain .wrapper .lists .item .list-top[data-v-5fd5e7a8]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-size:%?30?%;color:#111}.contain .wrapper .lists .item .list-middle[data-v-5fd5e7a8]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;padding:%?24?% 0}.contain .wrapper .lists .item .list-middle img[data-v-5fd5e7a8]{width:%?140?%;height:%?140?%;border-radius:4px}.contain .wrapper .lists .item .list-middle .product[data-v-5fd5e7a8]{width:75%;height:%?140?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-justify-content:space-around;justify-content:space-around;font-size:%?30?%;color:#111;padding-left:%?24?%;box-sizing:border-box}.contain .wrapper .lists .item .list-middle .product .price[data-v-5fd5e7a8]{width:100%;height:%?40?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?28?%;color:#999}.contain .wrapper .lists .item .list-middle .product .price uni-view[data-v-5fd5e7a8]{height:%?40?%;line-height:%?40?%}.contain .wrapper .lists .item .back[data-v-5fd5e7a8]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;margin-top:%?24?%}.contain .wrapper .lists .item .back .btns[data-v-5fd5e7a8]{width:%?200?%;height:%?60?%;line-height:%?60?%;background:#111;border-radius:30px;font-size:%?30?%;color:#fff;text-align:center}',""])}}]);