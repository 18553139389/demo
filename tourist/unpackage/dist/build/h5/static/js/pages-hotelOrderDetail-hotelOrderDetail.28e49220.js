(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-hotelOrderDetail-hotelOrderDetail"],{"003e":function(t,e,i){"use strict";i.r(e);var a=i("ec44"),s=i("f9ba");for(var n in s)"default"!==n&&function(t){i.d(e,t,function(){return s[t]})}(n);i("e1d9");var o=i("2877"),l=Object(o["a"])(s["default"],a["a"],a["b"],!1,null,"5d233880",null);e["default"]=l.exports},"0241":function(t,e,i){var a=i("a6f5");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=i("4f06").default;s("04337c3d",a,!0,{sourceMap:!1,shadowMode:!1})},9846:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i("f42a"),s=i("ad18"),n={data:function(){return{Color:"#DE2910",value:"",backColor:"#FFFFFF",id:"",list:{},show1:!1,val1:""}},components:{Toast:s.Toast},onLoad:function(t){if(this.getRequest("uid")){var e=this.getRequest("uid");this.$store.commit("changeUid",e)}this.id=t.id,this.init()},methods:{getRequest:function(t){for(var e=window.location.search.substring(1),i=e.split("&"),a=0;a<i.length;a++){var s=i[a].split("=");if(s[0]==t)return s[1]}return!1},init:function(){var t=this,e={uid:t.$store.state.uid,orderId:t.id},i={url:"/api/gzh/hotelOrderDetail",data:e,success:function(e){console.log(e),0==e.data.result&&(t.list=e.data)}};(0,a.ajaxs)(i)},goPay:function(){var t=this,e={orderId:this.id},i={url:"/api/gzh/payHotelOrder",data:e,success:function(e){if(console.log(e),0==e.data.result){var i=e.data.body.appId,a=e.data.body.timeStamp,n=e.data.body.nonceStr,o=e.data.body.prepay,l=e.data.body.signType,r=e.data.body.paySign;t.onBridgeReady(i,a,n,o,l,r)}else(0,s.Toast)(e.data.resultNote)}};(0,a.ajaxs)(i)},onBridgeReady:function(t,e,i,a,n,o){WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:t,timeStamp:e,nonceStr:i,package:a,signType:n,paySign:o},function(t){"get_brand_wcpay_request:ok"===t.err_msg?((0,s.Toast)("支付成功"),uni.navigateBack({delta:1})):"get_brand_wcpay_request:cancel"===t.err_msg?(0,s.Toast)("用户取消支付"):"get_brand_wcpay_request:fail"===t.err_msg&&(0,s.Toast)("网络异常，请重试")})},cancelOrder:function(){this.show1=!0},confirm1:function(){if(""!=this.val1){var t=this,e={uid:this.$store.state.uid,OrderID:this.id,CancelReason:this.val1},i={url:"/api/gzh/hotelCancelOrder",data:e,success:function(e){0==e.data.result?(t.show1=!1,(0,s.Toast)("取消成功"),uni.navigateBack({delta:1})):(0,s.Toast)(e.data.resultNote)}};ajax(i)}else(0,s.Toast)("备注不能为空")}}};e.default=n},a6f5:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,"uni-page-body[data-v-5d233880]{width:100%;height:100%}.contain[data-v-5d233880]{width:100%;height:100%;background:#f8f8f8}.orderMsg[data-v-5d233880]{width:92%;padding:%?30?% 0 0;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;background:#fff;border-radius:4px;margin:%?30?% auto 0}.orderHead[data-v-5d233880]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.title-left[data-v-5d233880]{padding-left:%?20?%;-webkit-box-sizing:border-box;box-sizing:border-box;border-left:4px solid red;font-size:14px;color:#333}.title-right[data-v-5d233880]{font-size:14px;color:#de2910;padding-right:%?20?%}.title[data-v-5d233880]{width:100%;padding-left:%?20?%;-webkit-box-sizing:border-box;box-sizing:border-box;border-left:4px solid red;font-size:14px;color:#333}.orderList[data-v-5d233880]{width:100%;padding:%?28?%;-webkit-box-sizing:border-box;box-sizing:border-box}.list[data-v-5d233880]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;margin-bottom:%?24?%;font-size:14px;color:#333}.content[data-v-5d233880]{width:70%;text-align:justify}.item[data-v-5d233880]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;font-size:14px;color:#333;border-bottom:1px solid #eee;padding:%?20?% 0}.open[data-v-5d233880]{width:70%;margin:0 auto %?40?%;height:%?90?%;line-height:%?90?%;text-align:center;background:#de2910;border-radius:4px;font-size:15px;color:#fff}.back[data-v-5d233880]{width:70%;margin:0 auto %?40?%;height:%?90?%;line-height:%?90?%;text-align:center;background:#eee;border-radius:4px;font-size:15px;color:#a5a5a5}",""])},e1d9:function(t,e,i){"use strict";var a=i("0241"),s=i.n(a);s.a},ec44:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"contain"},[i("v-uni-view",{staticClass:"fixed"},[i("cu-custom",{attrs:{isBack:!0,Color:t.Color,backColor:t.backColor,isIcon:!0,bgColor:"bg-shadeTop text-white"}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"},[t._v("订单详情")])],2)],1),i("v-uni-view",{staticClass:"orderMsg",staticStyle:{"margin-top":"30upx"}},[i("v-uni-view",{staticClass:"orderHead"},[i("v-uni-view",{staticClass:"title-left"},[t._v("订单信息")])],1),i("v-uni-view",{staticClass:"orderList"},[i("v-uni-view",{staticClass:"list"},[i("v-uni-text",[t._v("订单状态：")]),2==t.list.orderStatus?i("v-uni-view",{staticClass:"content",staticStyle:{color:"#DE2910"}},[t._v("待付款")]):t._e(),3==t.list.orderStatus?i("v-uni-view",{staticClass:"content",staticStyle:{color:"#DE2910"}},[t._v("已付款")]):t._e(),4==t.list.orderStatus?i("v-uni-view",{staticClass:"content",staticStyle:{color:"#DE2910"}},[t._v("已入住")]):t._e(),5==t.list.orderStatus?i("v-uni-view",{staticClass:"content",staticStyle:{color:"#DE2910"}},[t._v("已取消")]):t._e(),6==t.list.orderStatus?i("v-uni-view",{staticClass:"content",staticStyle:{color:"#DE2910"}},[t._v("取消中")]):t._e(),7==t.list.orderStatus?i("v-uni-view",{staticClass:"content",staticStyle:{color:"#DE2910"}},[t._v("已退款")]):t._e(),8==t.list.orderStatus?i("v-uni-view",{staticClass:"content",staticStyle:{color:"#DE2910"}},[t._v("已离店")]):t._e(),13==t.list.orderStatus?i("v-uni-view",{staticClass:"content",staticStyle:{color:"#DE2910"}},[t._v("待确认")]):t._e(),14==t.list.orderStatus?i("v-uni-view",{staticClass:"content",staticStyle:{color:"#DE2910"}},[t._v("已确认")]):t._e(),20==t.list.orderStatus?i("v-uni-view",{staticClass:"content",staticStyle:{color:"#DE2910"}},[t._v("待入住")]):t._e(),23==t.list.orderStatus?i("v-uni-view",{staticClass:"content",staticStyle:{color:"#DE2910"}},[t._v("未入住")]):t._e()],1),i("v-uni-view",{staticClass:"list"},[i("v-uni-text",[t._v("订单编号：")]),i("v-uni-view",{staticClass:"content"},[t._v(t._s(t.id))])],1),i("v-uni-view",{staticClass:"list"},[i("v-uni-text",[t._v("预定日期：")]),i("v-uni-view",{staticClass:"content"},[t._v(t._s(t.list.orderDate))])],1),i("v-uni-view",{staticClass:"list"},[i("v-uni-text",[t._v("订单金额：")]),i("v-uni-view",{staticClass:"content",staticStyle:{color:"#DE2910"}},[t._v("￥"+t._s(t.list.orderAmount))])],1),i("v-uni-view",{staticClass:"list"},[i("v-uni-text",[t._v("支付方式：")]),0==t.list.roomType?i("v-uni-view",{staticClass:"content"},[t._v("酒店现付")]):t._e(),1==t.list.roomType?i("v-uni-view",{staticClass:"content"},[t._v("酒店预付")]):t._e()],1),i("v-uni-view",{staticClass:"list"},[i("v-uni-text",[t._v("担保情况：")]),0==t.list.isGuarantee?i("v-uni-view",{staticClass:"content"},[t._v("无需担保")]):t._e(),1==t.list.isGuarantee?i("v-uni-view",{staticClass:"content"},[t._v("需担保")]):t._e()],1)],1)],1),i("v-uni-view",{staticClass:"orderMsg",staticStyle:{"margin-top":"30upx"}},[i("v-uni-view",{staticClass:"orderHead"},[i("v-uni-view",{staticClass:"title-left"},[t._v("酒店信息")])],1),i("v-uni-view",{staticClass:"orderList"},[i("v-uni-view",{staticClass:"item",staticStyle:{"padding-top":"0"}},[i("v-uni-view",[t._v(t._s(t.list.hotelName))])],1),i("v-uni-view",{staticClass:"item"},[i("v-uni-view",[t._v(t._s(t.list.roomName))]),i("v-uni-view",[t._v(t._s(t.list.roomCount)+"间")])],1),i("v-uni-view",{staticClass:"item"},[i("v-uni-view",[t._v("入住时间")]),i("v-uni-view",[t._v(t._s(t.list.inDate))])],1),i("v-uni-view",{staticClass:"item"},[i("v-uni-view",[t._v("离店时间")]),i("v-uni-view",[t._v(t._s(t.list.outDate))])],1),i("v-uni-view",{staticClass:"item",staticStyle:{"padding-bottom":"0","border-bottom":"none"}},[i("v-uni-view",[t._v("最晚到店时间")]),i("v-uni-view",[t._v("18:00")])],1)],1)],1),i("v-uni-view",{staticClass:"orderMsg",staticStyle:{margin:"30upx auto"}},[i("v-uni-view",{staticClass:"orderHead"},[i("v-uni-view",{staticClass:"title-left"},[t._v("入住信息")])],1),i("v-uni-view",{staticClass:"orderList"},[i("v-uni-view",{staticClass:"item"},[i("v-uni-view",[t._v("入住人")]),i("v-uni-view",[t._v(t._s(t.list.passengers))])],1),i("v-uni-view",{staticClass:"item",staticStyle:{"padding-bottom":"0","border-bottom":"none"}},[i("v-uni-view",[t._v("联系人手机号")]),i("v-uni-view",[t._v(t._s(t.list.contactMobile))])],1)],1)],1),2==t.list.orderStatus&&1==t.list.roomType?i("v-uni-view",{staticClass:"open",on:{click:function(e){e=t.$handleEvent(e),t.goPay(e)}}},[t._v("去付款")]):t._e(),2==t.list.orderStatus?i("v-uni-view",{staticClass:"back",on:{click:function(e){e=t.$handleEvent(e),t.cancelOrder(e)}}},[t._v("取消订单")]):t._e(),i("van-dialog",{attrs:{title:"备注","show-cancel-button":""},on:{confirm:function(e){e=t.$handleEvent(e),t.confirm1(e)}},model:{value:t.show1,callback:function(e){t.show1=e},expression:"show1"}},[i("v-uni-view",{staticClass:"beizhu"},[i("v-uni-textarea",{attrs:{placeholder:"退票原因"},model:{value:t.val1,callback:function(e){t.val1=e},expression:"val1"}})],1)],1)],1)},s=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return s})},f42a:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ajaxs=e.ajax=void 0;var a=function(t){t=t||{},t.url=t.url||"",t.data=JSON.stringify(t.data||{}),t.method=t.method||"POST",t.header=t.header||{"Content-Type":"application/json"},t.success=t.success||function(){},t.fail=t.fail||function(){},console.log(t.data),uni.request({url:"https://m.xgcyz1978.com"+t.url,data:t.data,method:t.method,header:t.header,dataType:"json",success:function(e){t.success(e)},fail:function(e){t.fail(e),uni.showToast({title:"请稍后重试",icon:"none"})}})};e.ajax=a;var s=function(t){t=t||{},t.url=t.url||"",t.data=JSON.stringify(t.data||{}),t.method=t.method||"POST",t.header=t.header||{"Content-Type":"application/json"},t.success=t.success||function(){},t.fail=t.fail||function(){},console.log(t.data),uni.request({url:"https://m.xgcyz1978.com"+t.url,data:t.data,method:t.method,header:t.header,dataType:"json",success:function(e){t.success(e)},fail:function(e){t.fail(e),uni.showToast({title:"请稍后重试",icon:"none"})}})};e.ajaxs=s},f9ba:function(t,e,i){"use strict";i.r(e);var a=i("9846"),s=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);e["default"]=s.a}}]);