(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-vipAppointment-vipAppointment"],{"405a":function(e,t,i){var a=i("91a2");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("6758242f",a,!0,{sourceMap:!1,shadowMode:!1})},"40c1":function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"contain"},[i("v-uni-view",{staticClass:"fixed"},[i("cu-custom",{attrs:{isBack:!0,Color:e.Color,backColor:e.backColor,isIcon:!0,bgColor:"bg-shadeTop text-white"}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"},[e._v("填写订单")])],2)],1),i("v-uni-view",{staticClass:"formData"},[i("v-uni-view",{staticClass:"list"},[i("v-uni-view",[e._v("贵宾厅")]),i("v-uni-view",{staticClass:"right"},[e._v(e._s(e.name))])],1),i("v-uni-view",{staticClass:"list"},[i("v-uni-view",[e._v("到厅时间")]),i("v-uni-view",{staticClass:"right",staticStyle:{color:"#999"},on:{click:function(t){t=e.$handleEvent(t),e.choiceTime(t)}}},[e._v(e._s(e.time))])],1),i("v-uni-view",{staticClass:"list"},[i("v-uni-view",[e._v("到厅人数")]),i("v-uni-view",{staticClass:"right",staticStyle:{background:"none","padding-left":"0"}},[i("van-stepper",{attrs:{integer:"",min:1,"disable-input":"","input-width":"32px"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1)],1),i("v-uni-view",{staticClass:"list"},[i("v-uni-view",[e._v("联系人")]),i("v-uni-view",{staticClass:"right"},[i("v-uni-input",{attrs:{type:"text",placeholder:"请输入联系人姓名"},model:{value:e.user,callback:function(t){e.user=t},expression:"user"}})],1)],1),i("v-uni-view",{staticClass:"list"},[i("v-uni-view",[e._v("手机号")]),i("v-uni-view",{staticClass:"right"},[i("v-uni-input",{attrs:{type:"number",placeholder:"请输入手机号"},model:{value:e.tel,callback:function(t){e.tel=t},expression:"tel"}})],1)],1)],1),i("v-uni-view",{staticClass:"notice"},[i("v-uni-view",{staticClass:"title",staticStyle:{"margin-bottom":"30upx"}},[e._v("服务须知")]),i("v-uni-view",{staticClass:"mark"},[e._v(e._s(e.notice))])],1),0==e.isVip?i("v-uni-view",{staticClass:"pay"},[i("v-uni-view",{staticClass:"money"},[e._v("实付款："),i("v-uni-text",[e._v("￥"+e._s(e.price))])],1),i("v-uni-view",{staticClass:"payBtn",on:{click:function(t){t=e.$handleEvent(t),e.paySuc(t)}}},[e._v("立即支付")])],1):e._e(),1==e.isVip?i("v-uni-view",{staticClass:"sort",on:{click:function(t){t=e.$handleEvent(t),e.goOrder(t)}}},[e._v("立即预约")]):e._e(),i("van-popup",{attrs:{position:"bottom",overlay:!1},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}},[i("van-datetime-picker",{attrs:{type:"datetime","min-date":e.minDate},on:{cancel:function(t){t=e.$handleEvent(t),e.cancel(t)},confirm:function(t){t=e.$handleEvent(t),e.confirm(t)}},model:{value:e.currentTime,callback:function(t){e.currentTime=t},expression:"currentTime"}})],1)],1)},n=[];i.d(t,"a",function(){return a}),i.d(t,"b",function(){return n})},"6b07":function(e,t,i){"use strict";var a=i("405a"),n=i.n(a);n.a},"74f5":function(e,t,i){"use strict";i.r(t);var a=i("f6e5"),n=i.n(a);for(var s in a)"default"!==s&&function(e){i.d(t,e,function(){return a[e]})}(s);t["default"]=n.a},"85f6":function(e,t,i){"use strict";i.r(t);var a=i("40c1"),n=i("74f5");for(var s in n)"default"!==s&&function(e){i.d(t,e,function(){return n[e]})}(s);i("6b07");var o=i("2877"),l=Object(o["a"])(n["default"],a["a"],a["b"],!1,null,"07b0e4c5",null);t["default"]=l.exports},"91a2":function(e,t,i){t=e.exports=i("2350")(!1),t.push([e.i,"uni-page-body[data-v-07b0e4c5]{width:100%;height:100%}.contain[data-v-07b0e4c5]{width:100%;height:100%;background:#f8f8f8}.formData[data-v-07b0e4c5]{width:92%;margin:%?30?% auto;background:#fff;border-radius:4px;padding:0 %?20?%;-webkit-box-sizing:border-box;box-sizing:border-box}.list[data-v-07b0e4c5]{width:100%;height:%?90?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;font-size:14px;color:#333\n\t/* border-bottom: 1px solid #eee; */}.right[data-v-07b0e4c5]{width:70%;text-align:left}.notice[data-v-07b0e4c5]{width:100%;padding:0 %?30?% %?30?%;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;font-size:12px;color:#999}.mark[data-v-07b0e4c5]{width:100%;margin-bottom:%?12?%}.pay[data-v-07b0e4c5]{width:100%;height:%?100?%;padding-left:%?30?%;border-top:2px solid #eee;position:fixed;left:0;bottom:0;z-index:99;background:#fff;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.money[data-v-07b0e4c5]{height:%?100?%;line-height:%?100?%}.money>uni-text[data-v-07b0e4c5]{margin-left:%?30?%;color:red}.sort[data-v-07b0e4c5]{width:100%;height:%?100?%;padding-left:%?30?%;\n\t/* border-top: 2px solid #eee; */position:fixed;left:0;bottom:0;z-index:99;background:#fff;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.right[data-v-07b0e4c5],.right>uni-input[data-v-07b0e4c5]{background:#f8f8f8;padding:0 %?20?%;height:%?60?%;line-height:%?60?%}.pay[data-v-07b0e4c5]{width:100%;height:%?100?%;padding-left:%?30?%;border-top:2px solid #eee;position:fixed;left:0;bottom:0;z-index:99;background:#fff;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.money[data-v-07b0e4c5]{height:%?100?%;line-height:%?100?%}.money>uni-text[data-v-07b0e4c5]{margin-left:%?30?%;color:red}.payBtn[data-v-07b0e4c5]{height:%?100?%;line-height:%?100?%;font-size:14px;color:#fff;padding:0 %?40?%;background:#de2910}.sort[data-v-07b0e4c5]{width:100%;height:%?100?%;padding-left:%?30?%;border-top:2px solid #eee;position:fixed;left:0;bottom:0;z-index:99;background:#fff;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;background:#de2910;color:#fff;font-size:15px}.van-stepper__minus[data-v-07b0e4c5],.van-stepper__plus[data-v-07b0e4c5]{background-color:#fff!important}",""])},f42a:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ajax=void 0;var a=function(e){e=e||{},e.url=e.url||"",e.data=JSON.stringify(e.data||{}),e.method=e.method||"POST",e.header=e.header||{"Content-Type":"application/json"},e.success=e.success||function(){},e.fail=e.fail||function(){},console.log(e.data),uni.request({url:"http://m.xgcyz1978.com"+e.url,data:e.data,method:e.method,header:e.header,dataType:"json",success:function(t){e.success(t)},fail:function(t){e.fail(t),uni.showToast({title:"请稍后重试",icon:"none"})}})};t.ajax=a},f6e5:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i("f42a"),n=i("ad18"),s={data:function(){return{Color:"#DE2910",value:1,backColor:"#FFFFFF",currentTime:new Date,minDate:new Date,show:!1,time:"请选择到厅时间",name:"",user:"",tel:"",id:"",isVip:0,notice:"",price:0}},components:{Toast:n.Toast},onLoad:function(e){if(this.getRequest("uid")){var t=this.getRequest("uid");this.$store.commit("changeUid",t)}this.name=decodeURIComponent(e.name),this.id=e.id,this.isVip=e.isVip,this.notice=decodeURIComponent(e.notice),this.price=e.price},methods:{getRequest:function(e){for(var t=window.location.search.substring(1),i=t.split("&"),a=0;a<i.length;a++){var n=i[a].split("=");if(n[0]==e)return n[1]}return!1},init:function(){var e=this,t={vipHallId:this.id,uid:this.$store.state.uid},i={url:"/api/gzh/vipHallDetail",data:t,success:function(t){console.log(t),0==t.data.result&&(e.imgs=t.data.images,e.listData=t.data,e.serviceList=t.data.serviceList,e.assistantList=t.data.assistantList,e.name=t.data.title,e.isVip=t.data.isVip)}};(0,a.ajax)(i)},confirm:function(e){this.time=this.dateFtt("yyyy-MM-dd hh:mm",e),this.show=!1},cancel:function(){this.show=!1},choiceTime:function(){this.show=!0},dateFtt:function(e,t){var i={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};for(var a in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length))),i)new RegExp("("+a+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?i[a]:("00"+i[a]).substr((""+i[a]).length)));return e},paySuc:function(){if("请选择到厅时间"!=this.time)if(""!=this.user)if(""!=this.tel)if(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.tel)){var e=this,t={uid:this.$store.state.uid,vipHallId:e.id,numbers:e.value,reserveDate:e.time,username:e.user,phone:e.tel,amount:e.price},i={url:"/api/gzh/bookingVipHall",data:t,success:function(t){0==t.data.result?uni.navigateTo({url:"../pay/pay?id="+e.id+"&order="+t.data.orderId}):(0,n.Toast)(t.data.resultNote)}};(0,a.ajax)(i)}else(0,n.Toast)("手机号格式不正确");else(0,n.Toast)("手机号不能为空");else(0,n.Toast)("请输入联系人");else(0,n.Toast)("请选择时间")},goOrder:function(){if("请选择到厅时间"!=this.time)if(""!=this.user)if(""!=this.tel)if(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.tel)){var e=this,t={uid:this.$store.state.uid,vipHallId:e.id,numbers:e.value,reserveDate:e.time,username:e.user,phone:e.tel,amount:0},i={url:"/api/gzh/bookingVipHall",data:t,success:function(e){0==e.data.result?uni.navigateTo({url:"../vipOrder/vipOrder"}):(0,n.Toast)(e.data.resultNote)}};(0,a.ajax)(i)}else(0,n.Toast)("手机号格式不正确");else(0,n.Toast)("手机号不能为空");else(0,n.Toast)("请输入联系人");else(0,n.Toast)("请选择时间")}}};t.default=s}}]);