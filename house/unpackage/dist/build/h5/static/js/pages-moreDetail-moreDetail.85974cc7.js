(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-moreDetail-moreDetail"],{"0c6d":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.contain[data-v-ef2972c6]{width:100%;min-height:100vh;background:#f6f6f6;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.contain .fixed[data-v-ef2972c6]{width:100%}.contain .wrapper[data-v-ef2972c6]{width:100%;padding:0 %?28?%;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.contain .wrapper .column[data-v-ef2972c6]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.contain .wrapper .column .item[data-v-ef2972c6]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;padding:%?28?% 0;border-bottom:1px solid #eee}.contain .wrapper .column .item uni-image[data-v-ef2972c6]{width:%?180?%;height:%?180?%;-webkit-border-radius:6px;border-radius:6px}.contain .wrapper .column .item .message[data-v-ef2972c6]{width:70%;height:%?180?%;padding-left:%?24?%;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.contain .wrapper .column .item .message .msg-title[data-v-ef2972c6]{width:100%;font-size:%?30?%;color:#333;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.contain .wrapper .column .item .message .msg-produce[data-v-ef2972c6]{width:100%;font-size:%?28?%;color:#666;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;white-space:pre-wrap;line-height:18px}.contain .wrapper .column .item .message .price[data-v-ef2972c6]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?28?%;color:#fe5f23}.contain .wrapper .column .item .message .price .btn[data-v-ef2972c6]{width:%?120?%;height:%?44?%;line-height:%?44?%;text-align:center;-webkit-border-radius:24px;border-radius:24px;background:#fe5f23;font-size:%?26?%;color:#fff}.contain .wrapper .column .item[data-v-ef2972c6]:last-child{border-bottom:none}',""]),t.exports=e},8253:function(t,e,i){var n=i("0c6d");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("4f06").default;o("06cc66b6",n,!0,{sourceMap:!1,shadowMode:!1})},"8c07":function(t,e,i){"use strict";i.r(e);var n=i("ef32"),o=i("b9b7");for(var a in o)"default"!==a&&function(t){i.d(e,t,(function(){return o[t]}))}(a);i("fa79");var l,s=i("f0c5"),c=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,"ef2972c6",null,!1,n["a"],l);e["default"]=c.exports},a0ca:function(t,e,i){"use strict";var n=i("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n(i("4ba6")),a={data:function(){return{Bg:"#ffffff",list:[],mescroll:null,downOption:{use:!0,auto:!0,autoShowLoading:!0,isLock:!1,isBoth:!0,offset:80,inOffsetRate:1,outOffsetRate:.2,bottomOffset:20,minAngle:45,textInOffset:"下拉刷新",textOutOffset:"释放更新",textLoading:"加载中 ..."},upOption:{use:!0,auto:!0,isLock:!1,isBoth:!0,page:{num:0,size:10,time:null},noMoreSize:3,textLoading:"加载中 ...",textNoMore:"-- 已经到底了 --",toTop:{src:"http://www.mescroll.com/img/mescroll-totop.png",offset:1e3,duration:300},empty:{use:!0,icon:"http://www.mescroll.com/img/mescroll-empty.png",tip:"没有符合条件的数据"}},type:1,title:""}},components:{MescrollUni:o.default},onUnload:function(){this.mescroll=null},onReachBottom:function(){this.mescroll&&this.mescroll.onReachBottom()},onPageScroll:function(t){this.mescroll&&this.mescroll.onPageScroll(t)},onLoad:function(t){this.type=t.type,1==this.type?this.title="保障列表":this.title="服务列表"},methods:{goBack:function(){uni.navigateBack({delta:1})},mescrollInit:function(t){this.mescroll=t},downCallback:function(t){this.list=[],this.mescroll.resetUpScroll()},upCallback:function(t){t.num,t.size;var e=this;e.init(t)},topClick:function(){console.log("点击了回到顶部按钮")},init:function(t){var e=this,i=this;i.list=[];var n={type:this.type,nowPage:t.num,pageCount:t.size};this.$u.post("getproductlist",n).then((function(n){if(console.log(n),0==n.result){if(n.dataList)for(var o=0;o<n.dataList.length;o++)i.list.push(n.dataList[o])}else e.$refs.uToast.show({title:n.resultNote,type:"none"});var a=[];n.dataList&&(a=n.dataList);var l=1;n.totalPage&&(l=n.totalPage),t.endByPage(a.length,l)}))}}};e.default=a},b9b7:function(t,e,i){"use strict";i.r(e);var n=i("a0ca"),o=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=o.a},ef32:function(t,e,i){"use strict";i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var n={mescrollUni:i("4ba6").default},o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"contain"},[i("v-uni-view",{staticClass:"fixed"},[i("cu-custom",{attrs:{isBacks:!0,bgColor:"#333",Bg:t.Bg},on:{goBack:function(e){arguments[0]=e=t.$handleEvent(e),t.goBack.apply(void 0,arguments)}}},[i("template",{attrs:{slot:"content"},slot:"content"},[t._v(t._s(t.title))])],2)],1),i("v-uni-view",{staticClass:"wrapper"},[i("mescroll-uni",{attrs:{down:t.downOption,up:t.upOption},on:{down:function(e){arguments[0]=e=t.$handleEvent(e),t.downCallback.apply(void 0,arguments)},up:function(e){arguments[0]=e=t.$handleEvent(e),t.upCallback.apply(void 0,arguments)},init:function(e){arguments[0]=e=t.$handleEvent(e),t.mescrollInit.apply(void 0,arguments)},emptyclick:function(e){arguments[0]=e=t.$handleEvent(e),t.emptyClick.apply(void 0,arguments)},topclick:function(e){arguments[0]=e=t.$handleEvent(e),t.topClick.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"column"},t._l(t.list,(function(e,n){return i("v-uni-view",{key:n,staticClass:"item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goDetail.apply(void 0,arguments)}}},[i("v-uni-image",{attrs:{src:e.image}}),i("v-uni-view",{staticClass:"message"},[i("v-uni-view",{staticClass:"msg-title"},[t._v(t._s(e.name))]),i("v-uni-view",{staticClass:"msg-produce"},[t._v(t._s(e.descs))]),i("v-uni-view",{staticClass:"price"},[i("v-uni-view",[t._v(t._s(e.integrals)+"积分")]),i("v-uni-view",{staticClass:"btn"},[t._v("去兑换")])],1)],1)],1)})),1)],1)],1)],1)},a=[]},fa79:function(t,e,i){"use strict";var n=i("8253"),o=i.n(n);o.a}}]);