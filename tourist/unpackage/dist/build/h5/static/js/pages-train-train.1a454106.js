(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-train-train"],{"525e":function(t,e,i){"use strict";var a=i("9dab"),n=i.n(a);n.a},5994:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("3b2b"),i("a481"),i("28a5"),i("386d");var a=i("f42a"),n={data:function(){return{Color:"#E73C1D",value:"",backColor:"#FFFFFF",loops:!1,activityList:[]}},computed:{name1:function(){return this.$store.state.train1},name2:function(){return this.$store.state.train2},date:function(){return this.$store.state.trainDate},day:function(){return this.$store.state.trainDay}},onLoad:function(){if(this.getRequest("uid")){var t=this.getRequest("uid");this.$store.commit("changeUid",t)}this.init()},onReady:function(){this.$store.commit("changeTrainDate",this.dateFtt("MM-dd",new Date)),this.$store.commit("changeTrainDay",this.getDay((new Date).getDay())),this.$store.commit("changeStartTrainDate",this.dateFtt("yyyy/MM/dd",new Date)),t.log(this.$store.state.startTrainDate)},methods:{getRequest:function(t){for(var e=window.location.search.substring(1),i=e.split("&"),a=0;a<i.length;a++){var n=i[a].split("=");if(n[0]==t)return n[1]}return!1},Back:function(){uni.switchTab({url:"../index/index"})},init:function(){var t=this,e={type:2},i={url:"/api/gzh/searchPicture",data:e,success:function(e){0==e.data.result&&(t.activityList=e.data.dataList)}};(0,a.ajax)(i)},loop:function(){var t=this,e=this.name1,i=this.name2;this.$store.commit("changeTrain1",i),this.$store.commit("changeTrain2",e),this.loops=!0,setTimeout(function(){t.loops=!1},500)},goCity1:function(){uni.navigateTo({url:"../selectTrain/selectTrain?type=1",animationType:"slide-in-left",animationDuration:500})},goCity2:function(){uni.navigateTo({url:"../selectTrain/selectTrain?type=2",animationType:"slide-in-left",animationDuration:500})},goTime:function(){uni.navigateTo({url:"../selectTime/selectTime?type=2",animationType:"slide-in-left",animationDuration:500})},dateFtt:function(t,e){var i={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};for(var a in/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length))),i)new RegExp("("+a+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[a]:("00"+i[a]).substr((""+i[a]).length)));return t},GetDateStr:function(t){var e=new Date;e.setDate(e.getDate()+t);var i=e.getFullYear(),a=e.getMonth()+1,n=e.getDate();return a=a>9?a:"0"+a,n=n>9?n:"0"+n,this.$store.commit("changeDay2",this.getDay(new Date(i+"-"+a+"-"+n).getDay())),a+"-"+n},getDay:function(t){switch(t){case 0:t="周日";break;case 1:t="周一";break;case 2:t="周二";break;case 3:t="周三";break;case 4:t="周四";break;case 5:t="周五";break;case 6:t="周六"}return t},goOrder:function(){uni.navigateTo({url:"../trainList/trainList",animationType:"slide-in-left",animationDuration:500})},goUrl:function(t){uni.navigateTo({url:"../content/content?url="+encodeURIComponent(t)})}}};e.default=n}).call(this,i("5a52")["default"])},9447:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,"uni-page-body[data-v-701d0bb8]{width:100%;height:100%;background:#f8f8f8}.contain[data-v-701d0bb8]{width:100%;height:100%}.wrapper[data-v-701d0bb8]{width:100%;padding:%?30?%;-webkit-box-sizing:border-box;box-sizing:border-box}.list[data-v-701d0bb8]{width:100%;background:#fff;border-radius:4px;-webkit-box-shadow:0 1px 4px #eee;box-shadow:0 1px 4px #eee;padding-bottom:%?30?%;overflow:hidden}.tab1[data-v-701d0bb8]{width:100%;padding:0 %?30?%;-webkit-box-sizing:border-box;box-sizing:border-box}.city[data-v-701d0bb8]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:%?40?% 0 %?30?%;font-size:14px;color:#333;border-bottom:1px solid #eee}.city>img[data-v-701d0bb8]{width:%?40?%;height:%?40?%}.loops[data-v-701d0bb8]{-webkit-animation:loops-data-v-701d0bb8 .5s linear;animation:loops-data-v-701d0bb8 .5s linear}@-webkit-keyframes loops-data-v-701d0bb8{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes loops-data-v-701d0bb8{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.time[data-v-701d0bb8]{width:100%;padding:%?30?% 0;font-size:14px;color:#333;border-bottom:1px solid #eee;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.time>img[data-v-701d0bb8]{width:%?28?%;height:%?28?%}.choice[data-v-701d0bb8]{width:100%;height:%?90?%;font-size:12px;color:#333;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.child[data-v-701d0bb8],.seat[data-v-701d0bb8]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:%?90?%;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.seat>uni-view[data-v-701d0bb8]{height:%?90?%;line-height:%?90?%;margin-top:3px}.seat>img[data-v-701d0bb8]{margin-left:%?30?%;width:%?24?%;height:%?24?%}.explain[data-v-701d0bb8]{width:100%;font-size:12px;color:#999;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;\n\t/* flex-direction: row-reverse; */-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.search[data-v-701d0bb8]{width:100%;height:%?90?%;line-height:%?90?%;text-align:center;font-size:14px;color:#fff;background:#e73c1d;border-radius:4px;margin:%?40?% 0 %?20?%}.imgs[data-v-701d0bb8]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;margin-top:%?40?%}.imgs-list[data-v-701d0bb8]{width:100%;height:%?280?%;border-radius:4px;overflow:hidden;margin-bottom:%?30?%}.imgs-list>img[data-v-701d0bb8]{width:100%;height:100%}.date1[data-v-701d0bb8]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.date1>img[data-v-701d0bb8]{width:%?28?%;height:%?28?%;margin-left:%?30?%}.piao[data-v-701d0bb8]{font-size:12px;color:#999;margin-top:%?16?%}.hot_wrapper[data-v-701d0bb8]{width:100%;padding:%?30?% 0;-webkit-box-sizing:border-box;box-sizing:border-box}.hot_list[data-v-701d0bb8]{width:100%;border-radius:6px;overflow:hidden;margin-bottom:%?30?%}.hot_img[data-v-701d0bb8]{width:100%\n\t/* height: 260upx; */}.hot_img>img[data-v-701d0bb8]{width:100%;height:100%}body.?%PAGE?%[data-v-701d0bb8]{background:#f8f8f8}",""])},"9dab":function(t,e,i){var a=i("9447");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("c0e0c890",a,!0,{sourceMap:!1,shadowMode:!1})},ba84:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA6UlEQVRYR8XXzQ3CMAyGYbsTRckCdAM2ADZgE9gAmIAVWCBVRmGBSKhXhIh/PkOuTvU+7cUq058Pj/qllC0R7Xrvh9bac3RfO5cC7kTUeu8zGjEErG+Uc94z8yUCIQJEIsSAKIQKEIFQA9AIEwCJMANQCBcAgXADvAgIwIOAAawIKMCCgAPeEI9a6/xtQ4YASinXdYUT0a3Wuv8pQBNfYdAvoI1DAZY4DGCNQwCeuBvgjbsAiLgZgIqbAMi4GoCOqwARcTEgKi4C5JyPzHySLBbtf6EIkFJK0zRtlmU5WwKjZ6DLaBT7NH8Bz0DMId00QY0AAAAASUVORK5CYII="},cb1a:function(t,e,i){"use strict";i.r(e);var a=i("5994"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);e["default"]=n.a},d7a7:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"contain"},[a("v-uni-view",{staticClass:"fixed"},[a("cu-custom",{attrs:{isBacks:!0,Color:t.Color,backColor:t.backColor,isIcons:!0,bgColor:"bg-shadeTop text-white"},on:{Back:function(e){e=t.$handleEvent(e),t.Back(e)}}},[a("template",{attrs:{slot:"backText"},slot:"backText"}),a("template",{attrs:{slot:"content"},slot:"content"},[t._v("火车票")])],2)],1),a("v-uni-view",{staticClass:"wrapper"},[a("v-uni-view",{staticClass:"list"},[a("v-uni-view",{staticClass:"tab1"},[a("v-uni-view",{staticClass:"city"},[a("v-uni-text",{on:{click:function(e){e=t.$handleEvent(e),t.goCity1(e)}}},[t._v(t._s(t.name1))]),a("img",{class:[t.loops?"loops":""],attrs:{src:i("ff35"),alt:""},on:{click:function(e){e=t.$handleEvent(e),t.loop(e)}}}),a("v-uni-text",{on:{click:function(e){e=t.$handleEvent(e),t.goCity2(e)}}},[t._v(t._s(t.name2))])],1),a("v-uni-view",{staticClass:"time",on:{click:function(e){e=t.$handleEvent(e),t.goTime(e)}}},[a("v-uni-text",[t._v(t._s(t.date)+" "+t._s(t.day))]),a("img",{attrs:{src:i("ba84"),alt:""}})],1),a("v-uni-view",{staticClass:"search",on:{click:function(e){e=t.$handleEvent(e),t.goOrder(e)}}},[t._v("搜索火车票")])],1)],1),a("v-uni-view",{staticClass:"hot_wrapper"},t._l(t.activityList,function(e,i){return a("v-uni-view",{key:i,staticClass:"hot_list",on:{click:function(i){i=t.$handleEvent(i),t.goUrl(e.url)}}},[a("v-uni-view",{staticClass:"hot_img"},[a("img",{attrs:{src:e.image,alt:""}})])],1)}),1)],1)],1)},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},f42a:function(t,e,i){"use strict";(function(t){var a=i("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.ajaxs=e.ajax=void 0;var n=a(i("f499")),o=function(e){e=e||{},e.url=e.url||"",e.data=(0,n.default)(e.data||{}),e.method=e.method||"POST",e.header=e.header||{"Content-Type":"application/json"},e.success=e.success||function(){},e.fail=e.fail||function(){},t.log(e.data),uni.request({url:"https://m.xgcyz1978.com"+e.url,data:e.data,method:e.method,header:e.header,dataType:"json",success:function(t){e.success(t)},fail:function(t){e.fail(t),uni.showToast({title:"请稍后重试",icon:"none"})}})};e.ajax=o;var s=function(e){e=e||{},e.url=e.url||"",e.data=(0,n.default)(e.data||{}),e.method=e.method||"POST",e.header=e.header||{"Content-Type":"application/json"},e.success=e.success||function(){},e.fail=e.fail||function(){},t.log(e.data),uni.request({url:"https://m.xgcyz1978.com"+e.url,data:e.data,method:e.method,header:e.header,dataType:"json",success:function(t){e.success(t)},fail:function(t){e.fail(t),uni.showToast({title:"请稍后重试",icon:"none"})}})};e.ajaxs=s}).call(this,i("5a52")["default"])},fe1a:function(t,e,i){"use strict";i.r(e);var a=i("d7a7"),n=i("cb1a");for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);i("525e");var s=i("2877"),r=Object(s["a"])(n["default"],a["a"],a["b"],!1,null,"701d0bb8",null);e["default"]=r.exports},ff35:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACRUlEQVRYR8WXy1HDMBBAdz1jX4EO6ADoIKkA6AAqgBwiHSFHKYeECggVkFQAHZAS6ICc4xkvsxmLEbIsSybAXjxjSbvP+5URfiBa6yshxOIHKgD7HmbjAPAohOitg233OmyMs4I/B7CN/zmAa3znQsR7flZV9V4UxWo0Gm1SwhodAp9xnyEiWiLiRAixjgFJATgloldEPIhRTETzoigmXR6JBmCjWusGBCIOq6oaICKv8dMGXOd5PgxBJAH4IOwqmM1mh2VZck7cWF4KQrQCsLI2ctsTvjJUSl0AwMLyxoMQ4tYXOi/AdDodENEs5D4DIaU89ClmCER8ttbOfInpBdBaLwHgHACC7mOIULZrredWOFZCCPbMN2kA1HH8MLvyPD/qyuS2qmBd2+323YTCp6sB4LjOSx1ThmaP5U1+de0OLx/APSLe8W4imkgpd52uryilgvq6AC6llJwPvaVO6JdaQaMaggDcZMbj8Wtv6wDghDQN4F9C4AydvSYhETVC+utlWJZlsKS7GhGHv7WNmtnQ1ozqPsAT9AQA4hqRUQoAbyb5fK4za0qpDSIOuiCyLLv1JXTrMHLa6IaIrn0lqbUmAOBb0DAE0dZNg+NYKbWu3bf7YN8lowbg5SBEWykHAZwYfunga1eWZWu+IQGA3SeSIaIuJE44uvpSEkQUgJWYPBd4THdJsHLsw9EA5lA9ri+I6JjfmcFlVcyTlJL/mqIkGcDVaiUhJ2mS8d0HRGEGNhmAPsb3BtDX+F4AlFKLlJi7zvwEsvGCMMdJRQIAAAAASUVORK5CYII="}}]);