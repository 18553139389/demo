(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-order-order"],{"0ca7":function(t,o,e){"use strict";e.r(o);var n=e("ad9e"),i=e.n(n);for(var s in n)"default"!==s&&function(t){e.d(o,t,(function(){return n[t]}))}(s);o["default"]=i.a},"0e8e":function(t,o,e){var n=e("24fb");o=n(!1),o.push([t.i,"/*! mescroll-uni\n * version 1.0.0\n * 2019-03-10 文举\n * http://www.mescroll.com\n */\n\n/*下拉刷新区域*/.mescroll-downwarp[data-v-37b62656]{position:relative;width:100%;height:0;overflow:hidden;text-align:center}\n\n/*下拉刷新--内容区,定位于区域底部*/.mescroll-downwarp .downwarp-content[data-v-37b62656]{position:absolute;left:0;bottom:0;width:100%;min-height:%?60?%;padding:%?20?% 0;text-align:center}\n\n/*上拉加载区域*/.mescroll-upwarp[data-v-37b62656]{min-height:%?60?%;padding:%?30?% 0;text-align:center;clear:both}\n\n/*下拉刷新,上拉加载--提示文本*/.mescroll-downwarp .downwarp-tip[data-v-37b62656],\n.mescroll-upwarp .upwarp-tip[data-v-37b62656],\n.mescroll-upwarp .upwarp-nodata[data-v-37b62656]{display:inline-block;font-size:%?28?%;color:grey;vertical-align:middle}.mescroll-downwarp .downwarp-tip[data-v-37b62656],\n.mescroll-upwarp .upwarp-tip[data-v-37b62656]{margin-left:%?16?%}\n\n/*下拉刷新,上拉加载--旋转进度条*/.mescroll-downwarp .downwarp-progress[data-v-37b62656],\n.mescroll-upwarp .upwarp-progress[data-v-37b62656]{display:inline-block;width:%?32?%;height:%?32?%;border-radius:50%;border:%?2?% solid grey;border-bottom-color:transparent;vertical-align:middle}\n\n/*下拉刷新--高度重置的过渡动画*/.mescroll-downwarp-reset[data-v-37b62656]{-webkit-transition:height .3s;transition:height .3s}\n\n/*旋转动画*/.mescroll-rotate[data-v-37b62656]{-webkit-animation:mescrollRotate-data-v-37b62656 .6s linear infinite;animation:mescrollRotate-data-v-37b62656 .6s linear infinite}@-webkit-keyframes mescrollRotate-data-v-37b62656{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(1turn)}}@keyframes mescrollRotate-data-v-37b62656{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\n\n/*无任何数据的空布局*/.mescroll-empty[data-v-37b62656]{width:100%;padding-top:%?40?%;text-align:center}.mescroll-empty .empty-icon[data-v-37b62656]{width:45%}.mescroll-empty .empty-tip[data-v-37b62656]{margin-top:%?20?%;font-size:%?24?%;color:grey}.mescroll-empty .empty-btn[data-v-37b62656]{max-width:40%;margin:%?60?% auto;padding:%?20?%;font-size:%?28?%;border:%?1?% solid #ff6990;border-radius:%?12?%;background-color:#fff;color:#ff6990}.mescroll-empty .empty-btn[data-v-37b62656]:active{opacity:.75}\n\n/*回到顶部的按钮*/.mescroll-totop[data-v-37b62656]{z-index:9990;position:fixed;right:%?20?%;bottom:%?120?%;width:%?72?%;height:%?72?%;border-radius:50%;opacity:0}\n\n/*显示动画--淡入*/.mescroll-lazy-in[data-v-37b62656],\n.mescroll-fade-in[data-v-37b62656]{-webkit-animation:mescrollFadeIn-data-v-37b62656 .3s linear forwards;animation:mescrollFadeIn-data-v-37b62656 .3s linear forwards}@-webkit-keyframes mescrollFadeIn-data-v-37b62656{0%{opacity:0}100%{opacity:1}}@keyframes mescrollFadeIn-data-v-37b62656{0%{opacity:0}100%{opacity:1}}\n\n/*隐藏动画--淡出*/.mescroll-fade-out[data-v-37b62656]{pointer-events:none;-webkit-animation:mescrollFadeOut-data-v-37b62656 .5s linear forwards;animation:mescrollFadeOut-data-v-37b62656 .5s linear forwards}@-webkit-keyframes mescrollFadeOut-data-v-37b62656{0%{opacity:1}100%{opacity:0}}@keyframes mescrollFadeOut-data-v-37b62656{0%{opacity:1}100%{opacity:0}}",""]),t.exports=o},1685:function(t,o,e){"use strict";var n=e("77f2"),i=e.n(n);i.a},2408:function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.ajax1=o.ajax=void 0;var n=function(t){t=t||{},t.url=t.url||"",t.data=JSON.stringify(t.data)||{},t.method=t.method||"POST",t.header=t.header||{"Content-Type":"application/json"},t.success=t.success||function(){},t.fail=t.fail||function(){},console.log(t.data),uni.request({url:"https://www.paobuxiu.cn/runrepair"+t.url,data:t.data,method:t.method,header:t.header,dataType:"json",success:function(o){t.success(o)},fail:function(o){t.fail(o),uni.showToast({title:"请稍后重试",icon:"none"})}})};o.ajax=n;var i=function(t){t=t||{},t.url=t.url||"",t.data=JSON.stringify(t.data)||{},t.method=t.method||"POST",t.header=t.header||{"Content-Type":"application/json"},t.success=t.success||function(){},t.fail=t.fail||function(){},console.log(t.data),uni.request({url:t.url,data:t.data,method:t.method,header:t.header,dataType:"json",success:function(o){t.success(o)},fail:function(o){t.fail(o),uni.showToast({title:"请稍后重试",icon:"none"})}})};o.ajax1=i},3398:function(t,o,e){"use strict";e.r(o);var n=e("cee3"),i=e("e850");for(var s in i)"default"!==s&&function(t){e.d(o,t,(function(){return i[t]}))}(s);e("1685");var a,l=e("f0c5"),r=Object(l["a"])(i["default"],n["b"],n["c"],!1,null,"37b62656",null,!1,n["a"],a);o["default"]=r.exports},"3f49":function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var n={showToast:function(t){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"none",e=arguments.length>2?arguments[2]:void 0;uni.showToast({title:t,icon:o,duration:2e3,mask:!0,success:e})},hideToast:function(){uni.hideToast()},showLoading:function(t,o){uni.showLoading({title:t,mask:!0,success:o})},hideLoading:function(){uni.hideLoading()}},i=n;o.default=i},"42f6":function(t,o,e){var n=e("b8c1");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=e("4f06").default;i("40c2cde4",n,!0,{sourceMap:!1,shadowMode:!1})},"62d3":function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var n={down:{textInOffset:"下拉刷新",textOutOffset:"释放更新",textLoading:"加载中 ...",offset:80},up:{textLoading:"加载中 ...",textNoMore:"-- END --",toTop:{src:"http://www.mescroll.com/img/mescroll-totop.png?v=1",offset:1e3,duration:300},empty:{use:!0,icon:"http://www.mescroll.com/img/mescroll-empty.png?v=1",tip:"~ 暂无相关数据 ~"}}},i=n;o.default=i},"66f8":function(t,o,e){"use strict";e.r(o);var n=e("7d23"),i=e("0ca7");for(var s in i)"default"!==s&&function(t){e.d(o,t,(function(){return i[t]}))}(s);e("6c68");var a,l=e("f0c5"),r=Object(l["a"])(i["default"],n["b"],n["c"],!1,null,"369f7400",null,!1,n["a"],a);o["default"]=r.exports},"6c68":function(t,o,e){"use strict";var n=e("42f6"),i=e.n(n);i.a},"77f2":function(t,o,e){var n=e("0e8e");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=e("4f06").default;i("d5e3964c",n,!0,{sourceMap:!1,shadowMode:!1})},"7d23":function(t,o,e){"use strict";var n={mescrollUni:e("3398").default},i=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("v-uni-view",{staticClass:"contain"},[e("v-uni-view",{staticClass:"fixed"},[e("cu-custom",{attrs:{isBacks:!0,Color:t.Color,isIcons:!0,bgColor:"bg-shadeTop text-white"},on:{Back:function(o){arguments[0]=o=t.$handleEvent(o),t.Back.apply(void 0,arguments)}}},[e("template",{attrs:{slot:"backText"},slot:"backText"}),e("template",{attrs:{slot:"content"},slot:"content"},[t._v(t._s(t.title))])],2)],1),e("v-uni-view",{staticClass:"wrapper"},[e("mescroll-uni",{attrs:{down:t.downOption,up:t.upOption},on:{down:function(o){arguments[0]=o=t.$handleEvent(o),t.downCallback.apply(void 0,arguments)},up:function(o){arguments[0]=o=t.$handleEvent(o),t.upCallback.apply(void 0,arguments)},init:function(o){arguments[0]=o=t.$handleEvent(o),t.mescrollInit.apply(void 0,arguments)},emptyclick:function(o){arguments[0]=o=t.$handleEvent(o),t.emptyClick.apply(void 0,arguments)},topclick:function(o){arguments[0]=o=t.$handleEvent(o),t.topClick.apply(void 0,arguments)}}},t._l(t.list,(function(o,n){return e("v-uni-view",{key:n,staticClass:"item"},[e("v-uni-view",{staticClass:"column"},[e("v-uni-view",{staticClass:"line"},[e("v-uni-view",{staticStyle:{width:"140rpx"}},[t._v("订单编号：")]),e("v-uni-view",[t._v(t._s(o.orderNum))])],1)],1),e("v-uni-view",{staticClass:"column"},[e("v-uni-view",{staticClass:"line"},[e("v-uni-view",{staticStyle:{width:"140rpx"}},[t._v("下单时间：")]),e("v-uni-view",[t._v(t._s(o.adtime))])],1)],1),o.sku?e("v-uni-view",{staticClass:"column"},[e("v-uni-view",{staticClass:"lines",staticStyle:{"align-items":"flex-start"}},[e("v-uni-view",{staticStyle:{width:"140rpx"}},[t._v("规格选择：")]),e("v-uni-view",{staticStyle:{width:"70%"}},[t._v(t._s(o.sku))])],1)],1):t._e(),e("v-uni-view",{staticClass:"column"},[e("v-uni-view",{staticClass:"line"},[e("v-uni-view",{staticStyle:{width:"140rpx"}},[t._v("预估价为：")]),e("v-uni-view",[t._v(t._s(o.content))])],1)],1),e("v-uni-view",{staticClass:"column"},[e("v-uni-view",{staticClass:"line"},[e("v-uni-view",{staticStyle:{width:"140rpx"}},[t._v("预估费用：")]),e("v-uni-view",{staticStyle:{color:"red","font-size":"30rpx"}},[t._v("￥"+t._s(o.fee))])],1),e("v-uni-view",[t._v("服务方式："+t._s(o.serviceMethod.name))])],1)],1)})),1)],1)],1)},s=[];e.d(o,"b",(function(){return i})),e.d(o,"c",(function(){return s})),e.d(o,"a",(function(){return n}))},ad9e:function(t,o,e){"use strict";var n=e("ee27");e("e25e"),Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var i=e("2408"),s=n(e("3f49")),a=n(e("3398")),l={data:function(){return{Color:"#333",title:"",lists:["维修服务","回收服务","安装服务","家装服务","清洗服务","其他服务"],color:"#ffffff",activeIndex:0,list:[],mescroll:null,downOption:{use:!0,auto:!0,autoShowLoading:!0,isLock:!1,isBoth:!0,offset:80,inOffsetRate:1,outOffsetRate:.2,bottomOffset:20,minAngle:45,textInOffset:"下拉刷新",textOutOffset:"释放更新",textLoading:"加载中 ..."},upOption:{use:!0,auto:!0,isLock:!1,isBoth:!0,page:{num:0,size:10,time:null},noMoreSize:6,textLoading:"加载中 ...",textNoMore:"-- 已经到底了 --",toTop:{src:"http://www.mescroll.com/img/mescroll-totop.png",offset:1e3,duration:300},empty:{use:!0,icon:"http://www.mescroll.com/img/mescroll-empty.png",tip:"没有符合条件的订单"}},type:1}},components:{MescrollUni:a.default},onLoad:function(t){t.type&&(this.type=t.type,1==t.type?this.title="维修订单":2==t.type?this.title="回收订单":3==t.type?this.title="安装订单":4==t.type?this.title="家装订单":5==t.type?this.title="清洗订单":6==t.type&&(this.title="其他订单"))},onUnload:function(){this.mescroll=null},onReachBottom:function(){this.mescroll&&this.mescroll.onReachBottom()},onPageScroll:function(t){this.mescroll&&this.mescroll.onPageScroll(t)},methods:{Back:function(){uni.redirectTo({url:"/pages/person/person"})},getIndex:function(t){this.activeIndex!=t&&(this.activeIndex=t,this.type=parseInt(this.activeIndex)+1,this.list=[],this.mescroll.resetUpScroll())},mescrollInit:function(t){this.mescroll=t},downCallback:function(t){this.list=[],this.mescroll.resetUpScroll()},upCallback:function(t){t.num,t.size;var o=this;o.init(t)},topClick:function(){console.log("点击了回到顶部按钮")},init:function(t){var o=this,e={uid:uni.getStorageSync("uid"),orderType:this.type,nowPage:t.num};s.default.showLoading("",(function(){var n={url:"/api/orderList",data:e,success:function(e){if(console.log(e),0==e.data.result){if(s.default.hideLoading(),e.data.dataList)for(var n=0;n<e.data.dataList.length;n++)o.list.push(e.data.dataList[n])}else s.default.hideLoading(),s.default.showToast(e.data.resultNote);var i=[];e.data.dataList&&(i=e.data.dataList);var a=1;e.data.totalPage&&(a=e.data.totalPage),t.endByPage(i.length,a)}};(0,i.ajax)(n)}))}}};o.default=l},b8c1:function(t,o,e){var n=e("24fb");o=n(!1),o.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.contain[data-v-369f7400]{width:100%;min-height:100vh;background:#f5f5f5;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.contain .fixed[data-v-369f7400]{width:100%}.contain .wrapper[data-v-369f7400]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;padding:%?28?%;box-sizing:border-box}.contain .wrapper .item[data-v-369f7400]{width:100%;padding:%?24?%;box-sizing:border-box;border-radius:4px;border-radius:4px;background:#fff;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;margin-bottom:%?30?%}.contain .wrapper .item .column[data-v-369f7400]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?26?%;color:#333;margin-bottom:%?28?%}.contain .wrapper .item .column .line[data-v-369f7400]{display:-webkit-box;display:-webkit-flex;display:flex}.contain .wrapper .item .column .lines[data-v-369f7400]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}',""]),t.exports=o},cee3:function(t,o,e){"use strict";var n,i=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("v-uni-view",{style:{"padding-top":t.padTop,"padding-bottom":t.padBottom},on:{touchstart:function(o){arguments[0]=o=t.$handleEvent(o),t.touchstartEvent.apply(void 0,arguments)},touchmove:function(o){arguments[0]=o=t.$handleEvent(o),t.touchmoveEvent.apply(void 0,arguments)},touchend:function(o){arguments[0]=o=t.$handleEvent(o),t.touchendEvent.apply(void 0,arguments)},touchcancel:function(o){arguments[0]=o=t.$handleEvent(o),t.touchendEvent.apply(void 0,arguments)}}},[t.optDown?e("v-uni-view",{staticClass:"mescroll-downwarp",class:{"mescroll-downwarp-reset":t.isDownReset},style:{height:t.downHight+"px",position:"relative",overflow:"hidden","-webkit-transition":t.isDownReset?"height 300ms":""}},[e("v-uni-view",{staticClass:"downwarp-content",staticStyle:{"text-align":"center",position:"absolute",left:"0",bottom:"0",width:"100%",padding:"20upx 0"}},[e("v-uni-view",{staticClass:"downwarp-progress",class:{"mescroll-rotate":t.isDownLoading},style:{transform:"rotate("+t.downRotate+"deg)"}}),e("v-uni-view",{staticClass:"downwarp-tip"},[t._v(t._s(t.downText))])],1)],1):t._e(),t._t("default"),t.optEmpty&&t.isShowEmpty?e("v-uni-view",{staticClass:"mescroll-empty"},[t.optEmpty.icon?e("v-uni-image",{staticClass:"empty-icon",attrs:{src:t.optEmpty.icon,mode:"widthFix"}}):t._e(),t.optEmpty.tip?e("v-uni-view",{staticClass:"empty-tip"},[t._v(t._s(t.optEmpty.tip))]):t._e(),t.optEmpty.btnText?e("v-uni-view",{staticClass:"empty-btn",on:{click:function(o){arguments[0]=o=t.$handleEvent(o),t.emptyClick.apply(void 0,arguments)}}},[t._v(t._s(t.optEmpty.btnText))]):t._e()],1):t._e(),t.optUp?e("v-uni-view",{staticClass:"mescroll-upwarp"},[t.isUpLoading?[e("v-uni-view",{staticClass:"upwarp-progress mescroll-rotate"}),e("v-uni-view",{staticClass:"upwarp-tip"},[t._v(t._s(t.optUp.textLoading))])]:t._e(),t.isUpNoMore?e("v-uni-view",{staticClass:"upwarp-nodata"},[t._v(t._s(t.optUp.textNoMore))]):t._e()],2):t._e(),t.optToTop?e("v-uni-image",{staticClass:"mescroll-totop",class:{"mescroll-fade-in":t.isShowToTop},attrs:{src:t.optToTop.src,mode:"widthFix"},on:{click:function(o){arguments[0]=o=t.$handleEvent(o),t.toTopClick.apply(void 0,arguments)}}}):t._e()],2)},s=[];e.d(o,"b",(function(){return i})),e.d(o,"c",(function(){return s})),e.d(o,"a",(function(){return n}))},e12a:function(t,o,e){"use strict";var n=e("ee27");e("a9e3"),Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var i=n(e("ed68")),s=n(e("62d3")),a={data:function(){return{mescroll:null,downHight:0,downRotate:0,downText:"",isDownReset:!1,isDownLoading:!1,isUpLoading:!1,isUpNoMore:!1,isShowEmpty:!1,isShowToTop:!1}},props:{down:Object,up:Object,top:[String,Number],bottom:[String,Number]},computed:{optDown:function(){return this.mescroll?this.mescroll.optDown:null},optUp:function(){return this.mescroll?this.mescroll.optUp:null},optEmpty:function(){return this.mescroll?this.mescroll.optUp.empty:null},optToTop:function(){return this.mescroll?this.mescroll.optUp.toTop:null},padTop:function(){return uni.upx2px(Number(this.top)||0)+"px"},padBottom:function(){return uni.upx2px(Number(this.bottom)||0)+"px"}},methods:{touchstartEvent:function(t){this.mescroll&&this.mescroll.touchstartEvent(t)},touchmoveEvent:function(t){this.mescroll&&this.mescroll.touchmoveEvent(t)},touchendEvent:function(t){this.mescroll&&this.mescroll.touchendEvent(t)},emptyClick:function(){this.$emit("emptyclick",this.mescroll)},toTopClick:function(){this.isShowToTop=!1,uni.pageScrollTo({scrollTop:0,duration:this.mescroll.optUp.toTop.duration}),this.$emit("topclick",this.mescroll)}},mounted:function(){var t=this,o={down:{inOffset:function(o){t.isDownReset=!1,t.isDownLoading=!1,t.downText=o.optDown.textInOffset},outOffset:function(o){t.isDownReset=!1,t.isDownLoading=!1,t.downText=o.optDown.textOutOffset},onMoving:function(o,e,n){t.downHight=n,t.downRotate=360*e},showLoading:function(o,e){t.isDownReset=!0,t.isDownLoading=!0,t.downHight=e,t.downText=o.optDown.textLoading},endDownScroll:function(o){t.isDownReset=!0,t.isDownLoading=!1,t.downHight=0},callback:function(o){t.$emit("down",o)}},up:{showLoading:function(){t.isUpLoading=!0,t.isUpNoMore=!1},showNoMore:function(){t.isUpLoading=!1,t.isUpNoMore=!0},hideUpScroll:function(){t.isUpLoading=!1,t.isUpNoMore=!1},empty:{onShow:function(o){t.isShowEmpty!=o&&(t.isShowEmpty=o)}},toTop:{onShow:function(o){t.isShowToTop!=o&&(t.isShowToTop=o)}},callback:function(o){t.$emit("up",o)}}};i.default.extend(o,s.default);var e=i.default.extend({down:t.down?JSON.parse(JSON.stringify(t.down)):t.down,up:t.up?JSON.parse(JSON.stringify(t.up)):t.up},o);t.mescroll=new i.default(e),t.$emit("init",t.mescroll),uni.getSystemInfo({success:function(o){t.mescroll.setBodyHeight(o.windowHeight)}})}};o.default=a},e850:function(t,o,e){"use strict";e.r(o);var n=e("e12a"),i=e.n(n);for(var s in n)"default"!==s&&function(t){e.d(o,t,(function(){return n[t]}))}(s);o["default"]=i.a},ed68:function(t,o,e){"use strict";
/*! mescroll-uni
 * version 1.0.0
 * 2019-03-10 文举
 * http://www.mescroll.com
 */
function n(t){var o=this;o.version="1.0.0",o.options=t||{},o.isDownScrolling=!1,o.isUpScrolling=!1;var e=o.options.down&&o.options.down.callback;o.initDownScroll(),o.initUpScroll(),setTimeout((function(){o.optDown.use&&o.optDown.auto&&e&&(o.optDown.autoShowLoading?o.triggerDownScroll():o.optDown.callback&&o.optDown.callback(o)),o.optUp.use&&o.optUp.auto&&!o.isUpAutoLoad&&o.triggerUpScroll()}),30)}Object.defineProperty(o,"__esModule",{value:!0}),o.default=n,n.prototype.extendDownScroll=function(t){n.extend(t,{use:!0,auto:!0,autoShowLoading:!1,isLock:!1,isBoth:!0,offset:80,inOffsetRate:1,outOffsetRate:.2,bottomOffset:20,minAngle:45,textInOffset:"下拉刷新",textOutOffset:"释放更新",textLoading:"加载中 ...",inited:null,inOffset:null,outOffset:null,onMoving:null,beforeLoading:null,showLoading:null,afterLoading:null,endDownScroll:null,callback:function(t){t.resetUpScroll()}})},n.prototype.extendUpScroll=function(t){n.extend(t,{use:!0,auto:!0,isLock:!1,isBoth:!0,callback:null,page:{num:0,size:10,time:null},noMoreSize:5,textLoading:"加载中 ...",textNoMore:"-- END --",inited:null,showLoading:null,showNoMore:null,hideUpScroll:null,toTop:{src:null,offset:1e3,duration:300,btnClick:null,onShow:null},empty:{use:!0,icon:null,tip:"~ 暂无相关数据 ~",btnText:"",btnClick:null,onShow:null}})},n.extend=function(t,o){if(!t)return o;for(var e in o)null==t[e]?t[e]=o[e]:"object"===typeof t[e]&&n.extend(t[e],o[e]);return t},n.prototype.initDownScroll=function(){var t=this;t.optDown=t.options.down||{},t.extendDownScroll(t.optDown),t.downHight=0,t.optDown.use&&t.optDown.inited&&setTimeout((function(){t.optDown.inited(t)}),0)},n.prototype.touchstartEvent=function(t){if(this.optDown.use){var o=this;o.startPoint=o.getPoint(t),o.lastPoint=o.startPoint,o.maxTouchmoveY=o.getBodyHeight()-o.optDown.bottomOffset,o.inTouchend=!1}},n.prototype.touchmoveEvent=function(t){if(this.startPoint){var o=this,e=o.getScrollTop(),n=o.getPoint(t),i=n.y-o.startPoint.y;if(i>0&&e<=0&&o.optDown.use&&!o.inTouchend&&!o.isDownScrolling&&!o.optDown.isLock&&(!o.isUpScrolling||o.isUpScrolling&&o.optUp.isBoth)){var s=Math.abs(o.lastPoint.x-n.x),a=Math.abs(o.lastPoint.y-n.y),l=Math.sqrt(s*s+a*a);if(0!==l){var r=Math.asin(a/l)/Math.PI*180;if(r<o.optDown.minAngle)return}if(o.maxTouchmoveY>0&&n.y>=o.maxTouchmoveY)return o.inTouchend=!0,void o.touchendEvent();var p=n.y-o.lastPoint.y;o.downHight<o.optDown.offset?(1!==o.movetype&&(o.movetype=1,o.optDown.inOffset&&o.optDown.inOffset(o),o.isMoveDown=!0),o.downHight+=p*o.optDown.inOffsetRate):(2!==o.movetype&&(o.movetype=2,o.optDown.outOffset&&o.optDown.outOffset(o),o.isMoveDown=!0),o.downHight+=p>0?p*o.optDown.outOffsetRate:p);var c=o.downHight/o.optDown.offset;o.optDown.onMoving&&o.optDown.onMoving(o,c,o.downHight)}o.lastPoint=n}},n.prototype.touchendEvent=function(t){var o=this;o.optDown.use&&o.isMoveDown&&(o.downHight>=o.optDown.offset?o.triggerDownScroll():(o.downHight=0,o.optDown.endDownScroll&&o.optDown.endDownScroll(o)),o.movetype=0,o.isMoveDown=!1)},n.prototype.getPoint=function(t){return{x:t.touches?t.touches[0].pageX:t.clientX,y:t.touches?t.touches[0].pageY:t.clientY}},n.prototype.triggerDownScroll=function(){this.optDown.beforeLoading&&this.optDown.beforeLoading(this)||(this.showDownScroll(),this.optDown.callback&&this.optDown.callback(this))},n.prototype.showDownScroll=function(){this.isDownScrolling=!0,this.downHight=this.optDown.offset,this.optDown.showLoading(this,this.downHight)},n.prototype.endDownScroll=function(){var t=this,o=function(){t.downHight=0,t.isDownScrolling=!1,t.optDown.endDownScroll&&t.optDown.endDownScroll(t)},e=0;t.optDown.afterLoading&&(e=t.optDown.afterLoading(t)),"number"===typeof e&&e>0?setTimeout(o,e):o()},n.prototype.lockDownScroll=function(t){null==t&&(t=!0),this.optDown.isLock=t},n.prototype.initUpScroll=function(){var t=this;t.optUp=t.options.up||{use:!1},t.extendUpScroll(t.optUp),!1!==t.optUp.use&&(t.optUp.hasNext=!0,t.optUp.empty.btnText=t.optUp.empty.btnText||t.optUp.empty.btntext,t.optUp.inited&&setTimeout((function(){t.optUp.inited(t)}),0))},n.prototype.onReachBottom=function(){var t=this;!t.isUpScrolling&&(!t.isDownScrolling||t.isDownScrolling&&t.optDown.isBoth)&&!t.optUp.isLock&&t.optUp.hasNext&&t.triggerUpScroll()},n.prototype.onPageScroll=function(t){var o=this,e=t.scrollTop;if(o.optUp.toTop.src&&(e>=o.optUp.toTop.offset?o.showTopBtn():o.hideTopBtn()),o.optUp.onScroll){null==o.preScrollY&&(o.preScrollY=0);var n=e-o.preScrollY>0;o.preScrollY=e,o.optUp.onScroll(o,e,n)}o.setScrollTop(e)},n.prototype.triggerUpScroll=function(){this.optUp.callback&&!this.isUpScrolling&&(this.showUpScroll(),this.optUp.page.num++,this.isUpAutoLoad=!0,this.num=this.optUp.page.num,this.size=this.optUp.page.size,this.time=this.optUp.page.time,this.optUp.callback(this))},n.prototype.showUpScroll=function(){this.isUpScrolling=!0,this.optUp.showLoading&&this.optUp.showLoading(this)},n.prototype.showNoMore=function(){this.optUp.hasNext=!1,this.optUp.showNoMore&&this.optUp.showNoMore(this)},n.prototype.hideUpScroll=function(){this.optUp.hideUpScroll&&this.optUp.hideUpScroll(this)},n.prototype.endUpScroll=function(t){null!=t&&(t?this.showNoMore():this.hideUpScroll()),this.isUpScrolling=!1},n.prototype.resetUpScroll=function(t){if(this.optUp&&this.optUp.use){var o=this.optUp.page;this.prePageNum=o.num,this.prePageTime=o.time,o.num=1,o.time=null,this.isDownScrolling||!1===t||(null==t?(this.removeEmpty(),this.showUpScroll()):this.showDownScroll()),this.isUpAutoLoad=!0,this.num=o.num,this.size=o.size,this.time=o.time,this.optUp.callback&&this.optUp.callback(this)}},n.prototype.setPageNum=function(t){this.optUp.page.num=t-1},n.prototype.setPageSize=function(t){this.optUp.page.size=t},n.prototype.endByPage=function(t,o,e){var n;this.optUp.use&&null!=o&&(n=this.optUp.page.num<o),this.endSuccess(t,n,e)},n.prototype.endBySize=function(t,o,e){var n;if(this.optUp.use&&null!=o){var i=(this.optUp.page.num-1)*this.optUp.page.size+t;n=i<o}this.endSuccess(t,n,e)},n.prototype.endSuccess=function(t,o,e){var n=this;if(n.isDownScrolling&&n.endDownScroll(),n.optUp.use){var i;if(null!=t){var s=n.optUp.page.num,a=n.optUp.page.size;if(1===s&&e&&(n.optUp.page.time=e),t<a||!1===o)if(n.optUp.hasNext=!1,0===t&&1===s)i=!1,n.showEmpty();else{var l=(s-1)*a+t;i=!(l<n.optUp.noMoreSize),n.removeEmpty()}else i=!1,n.optUp.hasNext=!0,n.removeEmpty()}n.endUpScroll(i)}},n.prototype.endErr=function(){if(this.isDownScrolling){var t=this.optUp.page;t&&this.prePageNum&&(t.num=this.prePageNum,t.time=this.prePageTime),this.endDownScroll()}this.isUpScrolling&&(this.optUp.page.num--,this.endUpScroll(!1))},n.prototype.showEmpty=function(){this.optUp.empty.onShow&&this.optUp.empty.onShow(!0)},n.prototype.removeEmpty=function(){this.optUp.empty.onShow&&this.optUp.empty.onShow(!1)},n.prototype.showTopBtn=function(){this.optUp.toTop.src&&!this.topBtnShow&&(this.topBtnShow=!0,this.optUp.toTop.onShow&&this.optUp.toTop.onShow(!0))},n.prototype.hideTopBtn=function(){this.optUp.toTop.src&&this.topBtnShow&&(this.topBtnShow=!1,this.optUp.toTop.onShow&&this.optUp.toTop.onShow(!1))},n.prototype.getScrollTop=function(){return this.scrollTop||0},n.prototype.setScrollTop=function(t){this.scrollTop=t},n.prototype.getBodyHeight=function(){return this.bodyHeight||0},n.prototype.setBodyHeight=function(t){this.bodyHeight=t}}}]);