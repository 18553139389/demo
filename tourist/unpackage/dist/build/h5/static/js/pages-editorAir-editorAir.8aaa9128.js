(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-editorAir-editorAir"],{"0766":function(t,e,a){"use strict";var i=a("db78"),s=a.n(i);s.a},"6e38":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"contain"},[i("v-uni-view",{staticClass:"fixed"},[i("cu-custom",{attrs:{isBack:!0,Color:t.Color,backColor:t.backColor,isIcon:!0,bgColor:"bg-shadeTop text-white"},on:{goRight:function(e){e=t.$handleEvent(e),t.goRight(e)}}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"},[t._v(t._s(t.text))]),i("template",{attrs:{slot:"right"},slot:"right"},[t._v("删除")])],2)],1),i("v-uni-view",{staticClass:"lists"},[i("v-uni-view",{staticClass:"listMsg"},[i("v-uni-view",{staticClass:"head"},[t._v("姓名")]),i("v-uni-input",{attrs:{type:"text",placeholder:"请与证件保持一致"},model:{value:t.user,callback:function(e){t.user=e},expression:"user"}})],1),i("v-uni-view",{staticClass:"cards",on:{click:function(e){e=t.$handleEvent(e),t.choice(e)}}},[i("v-uni-view",{staticClass:"card"},[i("v-uni-view",{staticClass:"head"},[t._v("证件类型")]),i("v-uni-input",{attrs:{type:"text",placeholder:"身份证",disabled:""},model:{value:t.cardType,callback:function(e){t.cardType=e},expression:"cardType"}})],1),i("img",{attrs:{src:a("ba84"),alt:""}})],1),i("v-uni-view",{staticClass:"cards",on:{click:function(e){e=t.$handleEvent(e),t.choiceBirth(e)}}},[i("v-uni-view",{staticClass:"card"},[i("v-uni-view",{staticClass:"head"},[t._v("出生日期")]),i("v-uni-input",{attrs:{type:"text",placeholder:"请选择出生日期",disabled:""},model:{value:t.birthday,callback:function(e){t.birthday=e},expression:"birthday"}})],1),i("img",{attrs:{src:a("ba84"),alt:""}})],1),i("v-uni-view",{staticClass:"listMsg"},[i("v-uni-view",{staticClass:"head"},[t._v("证件号码")]),i("v-uni-input",{attrs:{type:"text",placeholder:"请与证件保持一致"},model:{value:t.card,callback:function(e){t.card=e},expression:"card"}})],1),i("v-uni-view",{staticClass:"listMsg"},[i("v-uni-view",{staticClass:"head"},[t._v("手机号码")]),i("v-uni-input",{attrs:{type:"text",placeholder:"用于接受航空公司重要通知"},model:{value:t.tel,callback:function(e){t.tel=e},expression:"tel"}})],1)],1),i("v-uni-view",{staticClass:"submit",on:{click:function(e){e=t.$handleEvent(e),t.submit(e)}}},[t._v("确定")]),i("van-popup",{attrs:{position:"bottom"},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[i("van-picker",{attrs:{"show-toolbar":"",columns:t.columns},on:{cancel:function(e){e=t.$handleEvent(e),t.onCancel(e)},confirm:function(e){e=t.$handleEvent(e),t.onConfirm(e)}}})],1),i("van-popup",{attrs:{position:"bottom",overlay:!0},model:{value:t.show3,callback:function(e){t.show3=e},expression:"show3"}},[i("van-datetime-picker",{attrs:{type:"date","min-date":t.minDate},on:{cancel:function(e){e=t.$handleEvent(e),t.cancel3(e)},confirm:function(e){e=t.$handleEvent(e),t.confirm3(e)}},model:{value:t.currentTime,callback:function(e){t.currentTime=e},expression:"currentTime"}})],1),i("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:t.sub,callback:function(e){t.sub=e},expression:"sub"}},[i("van-loading",{attrs:{type:"spinner"}})],1)],1)},s=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return s})},"7e41":function(t,e,a){"use strict";a.r(e);var i=a("6e38"),s=a("9c58");for(var n in s)"default"!==n&&function(t){a.d(e,t,function(){return s[t]})}(n);a("0766");var o=a("2877"),r=Object(o["a"])(s["default"],i["a"],i["b"],!1,null,"8a0f2014",null);e["default"]=r.exports},"9c58":function(t,e,a){"use strict";a.r(e);var i=a("aad8"),s=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,function(){return i[t]})}(n);e["default"]=s.a},aad8:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a("ad18"),s=a("f42a"),n={data:function(){return{Color:"#DE2910",value:"",backColor:"#FFFFFF",user:"",cardType:"身份证",card:"",tel:"",show:!1,text:"新增乘机人",birthday:"",show3:!1,currentTime:new Date,minDate:new Date("1900-01-01"),sub:!1,columns:[{id:0,text:"身份证"},{id:1,text:"护照"},{id:4,text:"港澳通行证"},{id:5,text:"台胞证"},{id:6,text:"台湾通行证"},{id:7,text:"回乡证"},{id:9,text:"其他"}],index:0,userList:{},type:"",userId:""}},components:{Toast:i.Toast,Dialog:i.Dialog},onLoad:function(t){if(this.getRequest("uid")){var e=this.getRequest("uid");this.$store.commit("changeUid",e)}var a=this;if(1==t.type){this.type=t.type,this.userId=t.id;var i=t.id;this.text="编辑乘机人";var n={uid:this.$store.state.uid},o={url:"/api/gzh/passengerList",data:n,success:function(t){if(console.log(t),0==t.data.result)for(var e=0;e<t.data.dataList.length;e++)i==t.data.dataList[e].id&&(a.userList=t.data.dataList[e],console.log(a.userList),a.user=a.userList.username,0==a.userList.cardType?a.cardType="身份证":1==a.userList.cardType?a.cardType="护照":4==a.userList.cardType?a.cardType="港澳通行证":5==a.userList.cardType?a.cardType="台胞证":6==a.userList.cardType?a.cardType="台湾通行证":7==a.userList.cardType?a.cardType="回乡证":9==a.userList.cardType&&(a.cardType="其他"),a.tel=a.userList.phone,a.card=a.userList.cardNo,a.birthday=a.userList.birthday.split("/").join("-"))}};(0,s.ajax)(o)}},methods:{getRequest:function(t){for(var e=window.location.search.substring(1),a=e.split("&"),i=0;i<a.length;i++){var s=a[i].split("=");if(s[0]==t)return s[1]}return!1},onCancel:function(){this.show=!1},onConfirm:function(t){console.log(t),this.show=!1,this.cardType=t.text,this.index=t.id},cancel3:function(){this.show3=!1},confirm3:function(t){this.show3=!1,this.birthday=this.dateFtt("yyyy-MM-dd",t),console.log(this.birthday)},choice:function(){this.show=!0},choiceBirth:function(){this.show3=!0},dateFtt:function(t,e){var a={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};for(var i in/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length))),a)new RegExp("("+i+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?a[i]:("00"+a[i]).substr((""+a[i]).length)));return t},goRight:function(){var t=this;i.Dialog.confirm({title:"删除",message:"确认删除此编辑人吗"}).then(function(){var e={uid:t.$store.state.uid,passengerId:t.userId},a={url:"/api/gzh/delPassenger",data:e,success:function(t){console.log(t),0==t.data.result?((0,i.Toast)("删除成功"),setTimeout(function(){uni.navigateBack({delta:1})},300)):(0,i.Toast)(t.data.resultNote)}};(0,s.ajax)(a)}).catch(function(){})},submit:function(){if(""!=this.user)if(""!=this.card){if("身份证"==this.cardType){var t=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;if(!t.test(this.card))return void(0,i.Toast)("身份证不合法")}if(""!=this.birthday)if(""!=this.tel)if(/^1[345789]\d{9}$/.test(this.tel)){var e=this;if(this.sub=!0,0==this.type){var a={url:"/api/gzh/savePassenger",data:{uid:this.$store.state.uid,username:this.user,cardType:this.index,cardNo:this.card,phone:this.tel,birthday:this.birthday},success:function(t){console.log(t),0==t.data.result?(e.sub=!1,(0,i.Toast)("新增成功"),setTimeout(function(){uni.navigateBack({delta:1})},500)):(0,i.Toast)(t.data.resultNote)}};(0,s.ajax)(a)}else if(1==this.type){var n={url:"/api/gzh/savePassenger",data:{uid:this.$store.state.uid,passengerId:this.userId,username:this.user,cardType:this.index,cardNo:this.card,phone:this.tel,birthday:this.birthday},success:function(t){console.log(t),0==t.data.result?(e.sub=!1,(0,i.Toast)("编辑成功"),setTimeout(function(){uni.navigateBack({delta:1})},500)):(0,i.Toast)(t.data.resultNote)}};(0,s.ajax)(n)}}else(0,i.Toast)("手机号格式不正确");else(0,i.Toast)("手机号不能为空");else(0,i.Toast)("请选择出生日期")}else(0,i.Toast)("证件号码不能为空");else(0,i.Toast)("姓名不能为空")}}};e.default=n},ba84:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA6UlEQVRYR8XXzQ3CMAyGYbsTRckCdAM2ADZgE9gAmIAVWCBVRmGBSKhXhIh/PkOuTvU+7cUq058Pj/qllC0R7Xrvh9bac3RfO5cC7kTUeu8zGjEErG+Uc94z8yUCIQJEIsSAKIQKEIFQA9AIEwCJMANQCBcAgXADvAgIwIOAAawIKMCCgAPeEI9a6/xtQ4YASinXdYUT0a3Wuv8pQBNfYdAvoI1DAZY4DGCNQwCeuBvgjbsAiLgZgIqbAMi4GoCOqwARcTEgKi4C5JyPzHySLBbtf6EIkFJK0zRtlmU5WwKjZ6DLaBT7NH8Bz0DMId00QY0AAAAASUVORK5CYII="},d421:function(t,e,a){e=t.exports=a("2350")(!1),e.push([t.i,".contain[data-v-8a0f2014]{width:100%;height:100%;background:#fff}.van-popup[data-v-8a0f2014]{background:none!important}.lists[data-v-8a0f2014]{width:100%;padding:0 %?30?%;-webkit-box-sizing:border-box;box-sizing:border-box;border-top:8px solid #f8f8f8;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.cards[data-v-8a0f2014],.listMsg[data-v-8a0f2014]{width:100%;height:%?90?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;font-size:14px;color:#333;border-bottom:1px solid #eee}.head[data-v-8a0f2014]{width:%?160?%;height:%?90?%;line-height:%?90?%}.card>uni-input[data-v-8a0f2014],.listMsg>uni-input[data-v-8a0f2014]{margin-left:%?50?%;font-size:14px}.cards>img[data-v-8a0f2014]{width:%?24?%;float:right}.cards[data-v-8a0f2014]{-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.card[data-v-8a0f2014]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.submit[data-v-8a0f2014]{width:70%;height:%?90?%;line-height:%?90?%;text-align:center;font-size:15px;color:#fff;border-radius:4px;background:#de2910;margin:%?160?% auto}",""])},db78:function(t,e,a){var i=a("d421");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var s=a("4f06").default;s("234b6500",i,!0,{sourceMap:!1,shadowMode:!1})},f42a:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ajax=void 0;var i=function(t){t=t||{},t.url=t.url||"",t.data=JSON.stringify(t.data||{}),t.method=t.method||"POST",t.header=t.header||{"Content-Type":"application/json"},t.success=t.success||function(){},t.fail=t.fail||function(){},console.log(t.data),uni.request({url:"http://m.xgcyz1978.com"+t.url,data:t.data,method:t.method,header:t.header,dataType:"json",success:function(e){t.success(e)},fail:function(e){t.fail(e),uni.showToast({title:"请稍后重试",icon:"none"})}})};e.ajax=i}}]);