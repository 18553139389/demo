(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-airTicket-airTicket"],{"05c0":function(t,e,i){"use strict";var n=i("dd46"),a=i.n(n);a.a},"222d":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"contain"},[n("v-uni-view",{staticClass:"fixed"},[n("cu-custom",{attrs:{isBack:!0,Color:t.Color,backColor:t.backColor,isIcon:!0,bgColor:"bg-shadeTop text-white"}},[n("template",{attrs:{slot:"backText"},slot:"backText"}),n("template",{attrs:{slot:"content"},slot:"content"},[t._v("机票")])],2)],1),n("v-uni-view",{staticClass:"wrapper"},[n("v-uni-view",{staticClass:"list"},[n("van-tabs",{attrs:{"title-active-color":"#fff",color:"#E73C1D",type:"card"},on:{change:function(e){e=t.$handleEvent(e),t.choiceSingle(e)}},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[n("van-tab",{attrs:{title:"单程"}},[n("v-uni-view",{staticClass:"tab1"},[n("v-uni-view",{staticClass:"city"},[n("v-uni-text",{on:{click:function(e){e=t.$handleEvent(e),t.goCity1(e)}}},[t._v(t._s(t.name1))]),n("img",{class:[t.loops?"loops":""],attrs:{src:i("ff35"),alt:""},on:{click:function(e){e=t.$handleEvent(e),t.loop(e)}}}),n("v-uni-text",{on:{click:function(e){e=t.$handleEvent(e),t.goCity2(e)}}},[t._v(t._s(t.name2))])],1),n("v-uni-view",{staticClass:"time",on:{click:function(e){e=t.$handleEvent(e),t.goTime(e)}}},[n("v-uni-text",[t._v(t._s(t.date)+" "+t._s(t.day))]),n("img",{attrs:{src:i("ba84"),alt:""}})],1),n("v-uni-view",{staticClass:"choice"},[n("v-uni-view",{staticClass:"child"},[n("van-checkbox",{staticStyle:{"margin-right":"40upx"},attrs:{"checked-color":"#E73C1D"},on:{change:function(e){e=t.$handleEvent(e),t.changeState(e)}},model:{value:t.checked1,callback:function(e){t.checked1=e},expression:"checked1"}},[t._v("儿童票")])],1)],1),t.checked1||t.checked2?n("v-uni-view",{staticClass:"explain"},[n("van-icon",{attrs:{name:"info-o"}}),n("v-uni-view",[t._v("儿童婴儿预定说明")])],1):t._e(),t.checked1||t.checked2?n("v-uni-view",{staticClass:"piao"},[t._v("儿童票需要单独查询，单独下单，不能和成人一起下单,婴儿票必须和成人一起下单")]):t._e(),n("v-uni-view",{staticClass:"search",on:{click:function(e){e=t.$handleEvent(e),t.goOrder(e)}}},[t._v("搜索机票")])],1)],1),n("van-tab",{attrs:{title:"往返"}},[n("v-uni-view",{staticClass:"tab1"},[n("v-uni-view",{staticClass:"city"},[n("v-uni-text",{on:{click:function(e){e=t.$handleEvent(e),t.goCity1(e)}}},[t._v(t._s(t.name1))]),n("img",{class:[t.loops?"loops":""],attrs:{src:i("ff35"),alt:""},on:{click:function(e){e=t.$handleEvent(e),t.loop(e)}}}),n("v-uni-text",{on:{click:function(e){e=t.$handleEvent(e),t.goCity2(e)}}},[t._v(t._s(t.name2))])],1),n("v-uni-view",{staticClass:"time",on:{click:function(e){e=t.$handleEvent(e),t.goTime1(e)}}},[n("v-uni-view",{staticClass:"date1"},[n("v-uni-text",[t._v(t._s(t.date1)+" "+t._s(t.day1))]),n("img",{attrs:{src:i("ba84"),alt:""}})],1),n("v-uni-view",{staticClass:"date1"},[n("v-uni-text",[t._v(t._s(t.date2)+" "+t._s(t.day2))]),n("img",{attrs:{src:i("ba84"),alt:""}})],1)],1),t.child?n("v-uni-view",{staticClass:"choice"},[n("v-uni-view",{staticClass:"child"},[n("van-checkbox",{staticStyle:{"margin-right":"40upx"},attrs:{"checked-color":"#E73C1D"},on:{change:function(e){e=t.$handleEvent(e),t.changeState(e)}},model:{value:t.checked1,callback:function(e){t.checked1=e},expression:"checked1"}},[t._v("儿童票")])],1)],1):t._e(),t.checked1||t.checked2?n("v-uni-view",{staticClass:"explain"},[n("van-icon",{attrs:{name:"info-o"}}),n("v-uni-view",[t._v("儿童婴儿预定说明")])],1):t._e(),t.checked1||t.checked2?n("v-uni-view",{staticClass:"piao"},[t._v("儿童票需要单独查询，单独下单，不能和成人一起下单,婴儿票必须和成人一起下单")]):t._e(),n("v-uni-view",{staticClass:"search",on:{click:function(e){e=t.$handleEvent(e),t.goSearch(e)}}},[t._v("搜索机票")])],1)],1)],1)],1),n("v-uni-view",{staticClass:"imgs"},t._l(t.imgList,function(t,e){return n("v-uni-view",{key:e,staticClass:"imgs-list"},[n("img",{attrs:{src:t,alt:""}})])}),1)],1),n("van-popup",{attrs:{position:"bottom"},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[n("van-picker",{attrs:{"show-toolbar":"",columns:t.columns},on:{cancel:function(e){e=t.$handleEvent(e),t.onCancel(e)},confirm:function(e){e=t.$handleEvent(e),t.onConfirm(e)}}})],1)],1)},a=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return a})},"2b55":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.air=void 0;var n=i("861c"),a=function(t){var e=o("yyyy/MM/dd hh:mm:ss",new Date),i="b421b9a21075a359c09a36db79325d5b",a="d3243685d9922998ddd4232f38b53555";t=t||{},t.data=t.data||{};var r={ApiKey:i,Timestamp:e,Sign:(0,n.md5)("apikey"+i+"secretkey"+a+"timestamp"+e).toLowerCase(),Data:t.data};t.url=t.url||"",t.datas=JSON.stringify(r),t.method=t.method||"POST",t.header={"Access-Control-Allow-Origin":"*","Content-Type":"application/json"},t.success=t.success||function(){},t.fail=t.fail||function(){},console.log(t.data),console.log(e),console.log(r.Sign),uni.request({url:"http://apitest.99263.com"+t.url,data:t.datas,method:t.method,header:{"Content-Type":"application/json"},success:function(e){t.success(e)},fail:function(e){t.fail(e),uni.showToast({title:"请稍后重试",icon:"none"})}})};function o(t,e){var i={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};for(var n in/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length))),i)new RegExp("("+n+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[n]:("00"+i[n]).substr((""+i[n]).length)));return t}e.air=a},"681c":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,"uni-page-body[data-v-2bf05788]{width:100%;height:100%;background:#f9f9f9}.contain[data-v-2bf05788]{width:100%;height:100%}.wrapper[data-v-2bf05788]{width:100%;padding:%?30?%;-webkit-box-sizing:border-box;box-sizing:border-box}.list[data-v-2bf05788]{width:100%;background:#fff;border-radius:4px;-webkit-box-shadow:0 1px 4px #eee;box-shadow:0 1px 4px #eee;padding-bottom:%?30?%;overflow:hidden}.tab1[data-v-2bf05788]{width:100%;padding:0 %?30?%;-webkit-box-sizing:border-box;box-sizing:border-box}.city[data-v-2bf05788]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:%?40?% 0 %?30?%;font-size:14px;color:#333;border-bottom:1px solid #eee}.city>img[data-v-2bf05788]{width:%?40?%;height:%?40?%}.loops[data-v-2bf05788]{-webkit-animation:loops-data-v-2bf05788 .5s linear;animation:loops-data-v-2bf05788 .5s linear}@-webkit-keyframes loops-data-v-2bf05788{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes loops-data-v-2bf05788{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.time[data-v-2bf05788]{width:100%;padding:%?30?% 0;font-size:14px;color:#333;border-bottom:1px solid #eee;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.time>img[data-v-2bf05788]{width:%?28?%;height:%?28?%}.choice[data-v-2bf05788]{width:100%;height:%?90?%;font-size:12px;color:#333;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.child[data-v-2bf05788],.seat[data-v-2bf05788]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:%?90?%;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.seat>uni-view[data-v-2bf05788]{height:%?90?%;line-height:%?90?%;margin-top:3px}.seat>img[data-v-2bf05788]{margin-left:%?30?%;width:%?24?%;height:%?24?%}.explain[data-v-2bf05788]{width:100%;font-size:12px;color:#999;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;\n\t/* flex-direction: row-reverse; */-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.search[data-v-2bf05788]{width:100%;height:%?90?%;line-height:%?90?%;text-align:center;font-size:14px;color:#fff;background:#e73c1d;border-radius:4px;margin:%?40?% 0 %?20?%}.imgs[data-v-2bf05788]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;margin-top:%?40?%}.imgs-list[data-v-2bf05788]{width:100%;height:%?280?%;border-radius:4px;overflow:hidden;margin-bottom:%?30?%}.imgs-list>img[data-v-2bf05788]{width:100%;height:100%}.date1[data-v-2bf05788]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.date1>img[data-v-2bf05788]{width:%?28?%;height:%?28?%;margin-left:%?30?%}.piao[data-v-2bf05788]{font-size:12px;color:#999;margin-top:%?16?%}body.?%PAGE?%[data-v-2bf05788]{background:#f9f9f9}",""])},"861c":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.md5=void 0;var n=function(t){var e,i,n,a,r,s,c,l,b,p=Array(),y=7,w=12,C=17,x=22,k=5,A=9,S=14,E=20,D=4,O=11,R=16,$=23,T=6,j=10,M=15,_=21;for(t=v(t),p=g(t),s=1732584193,c=4023233417,l=2562383102,b=271733878,e=0;e<p.length;e+=16)i=s,n=c,a=l,r=b,s=u(s,c,l,b,p[e+0],y,3614090360),b=u(b,s,c,l,p[e+1],w,3905402710),l=u(l,b,s,c,p[e+2],C,606105819),c=u(c,l,b,s,p[e+3],x,3250441966),s=u(s,c,l,b,p[e+4],y,4118548399),b=u(b,s,c,l,p[e+5],w,1200080426),l=u(l,b,s,c,p[e+6],C,2821735955),c=u(c,l,b,s,p[e+7],x,4249261313),s=u(s,c,l,b,p[e+8],y,1770035416),b=u(b,s,c,l,p[e+9],w,2336552879),l=u(l,b,s,c,p[e+10],C,4294925233),c=u(c,l,b,s,p[e+11],x,2304563134),s=u(s,c,l,b,p[e+12],y,1804603682),b=u(b,s,c,l,p[e+13],w,4254626195),l=u(l,b,s,c,p[e+14],C,2792965006),c=u(c,l,b,s,p[e+15],x,1236535329),s=d(s,c,l,b,p[e+1],k,4129170786),b=d(b,s,c,l,p[e+6],A,3225465664),l=d(l,b,s,c,p[e+11],S,643717713),c=d(c,l,b,s,p[e+0],E,3921069994),s=d(s,c,l,b,p[e+5],k,3593408605),b=d(b,s,c,l,p[e+10],A,38016083),l=d(l,b,s,c,p[e+15],S,3634488961),c=d(c,l,b,s,p[e+4],E,3889429448),s=d(s,c,l,b,p[e+9],k,568446438),b=d(b,s,c,l,p[e+14],A,3275163606),l=d(l,b,s,c,p[e+3],S,4107603335),c=d(c,l,b,s,p[e+8],E,1163531501),s=d(s,c,l,b,p[e+13],k,2850285829),b=d(b,s,c,l,p[e+2],A,4243563512),l=d(l,b,s,c,p[e+7],S,1735328473),c=d(c,l,b,s,p[e+12],E,2368359562),s=f(s,c,l,b,p[e+5],D,4294588738),b=f(b,s,c,l,p[e+8],O,2272392833),l=f(l,b,s,c,p[e+11],R,1839030562),c=f(c,l,b,s,p[e+14],$,4259657740),s=f(s,c,l,b,p[e+1],D,2763975236),b=f(b,s,c,l,p[e+4],O,1272893353),l=f(l,b,s,c,p[e+7],R,4139469664),c=f(c,l,b,s,p[e+10],$,3200236656),s=f(s,c,l,b,p[e+13],D,681279174),b=f(b,s,c,l,p[e+0],O,3936430074),l=f(l,b,s,c,p[e+3],R,3572445317),c=f(c,l,b,s,p[e+6],$,76029189),s=f(s,c,l,b,p[e+9],D,3654602809),b=f(b,s,c,l,p[e+12],O,3873151461),l=f(l,b,s,c,p[e+15],R,530742520),c=f(c,l,b,s,p[e+2],$,3299628645),s=h(s,c,l,b,p[e+0],T,4096336452),b=h(b,s,c,l,p[e+7],j,1126891415),l=h(l,b,s,c,p[e+14],M,2878612391),c=h(c,l,b,s,p[e+5],_,4237533241),s=h(s,c,l,b,p[e+12],T,1700485571),b=h(b,s,c,l,p[e+3],j,2399980690),l=h(l,b,s,c,p[e+10],M,4293915773),c=h(c,l,b,s,p[e+1],_,2240044497),s=h(s,c,l,b,p[e+8],T,1873313359),b=h(b,s,c,l,p[e+15],j,4264355552),l=h(l,b,s,c,p[e+6],M,2734768916),c=h(c,l,b,s,p[e+13],_,1309151649),s=h(s,c,l,b,p[e+4],T,4149444226),b=h(b,s,c,l,p[e+11],j,3174756917),l=h(l,b,s,c,p[e+2],M,718787259),c=h(c,l,b,s,p[e+9],_,3951481745),s=o(s,i),c=o(c,n),l=o(l,a),b=o(b,r);var I=m(s)+m(c)+m(l)+m(b);return I.toUpperCase()};function a(t,e){return t<<e|t>>>32-e}function o(t,e){var i,n,a,o,r;return a=2147483648&t,o=2147483648&e,i=1073741824&t,n=1073741824&e,r=(1073741823&t)+(1073741823&e),i&n?2147483648^r^a^o:i|n?1073741824&r?3221225472^r^a^o:1073741824^r^a^o:r^a^o}function r(t,e,i){return t&e|~t&i}function s(t,e,i){return t&i|e&~i}function c(t,e,i){return t^e^i}function l(t,e,i){return e^(t|~i)}function u(t,e,i,n,s,c,l){return t=o(t,o(o(r(e,i,n),s),l)),o(a(t,c),e)}function d(t,e,i,n,r,c,l){return t=o(t,o(o(s(e,i,n),r),l)),o(a(t,c),e)}function f(t,e,i,n,r,s,l){return t=o(t,o(o(c(e,i,n),r),l)),o(a(t,s),e)}function h(t,e,i,n,r,s,c){return t=o(t,o(o(l(e,i,n),r),c)),o(a(t,s),e)}function g(t){var e,i=t.length,n=i+8,a=(n-n%64)/64,o=16*(a+1),r=Array(o-1),s=0,c=0;while(c<i)e=(c-c%4)/4,s=c%4*8,r[e]=r[e]|t.charCodeAt(c)<<s,c++;return e=(c-c%4)/4,s=c%4*8,r[e]=r[e]|128<<s,r[o-2]=i<<3,r[o-1]=i>>>29,r}function m(t){var e,i,n="",a="";for(i=0;i<=3;i++)e=t>>>8*i&255,a="0"+e.toString(16),n+=a.substr(a.length-2,2);return n}function v(t){for(var e="",i=0;i<t.length;i++){var n=t.charCodeAt(i);n<128?e+=String.fromCharCode(n):n>127&&n<2048?(e+=String.fromCharCode(n>>6|192),e+=String.fromCharCode(63&n|128)):(e+=String.fromCharCode(n>>12|224),e+=String.fromCharCode(n>>6&63|128),e+=String.fromCharCode(63&n|128))}return e}e.md5=n},"871b":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;i("f64f"),i("861c"),i("2b55");var n=i("fe48"),a=(i("f42a"),{data:function(){return{Color:"#E73C1D",value:"",backColor:"#FFFFFF",active:0,loops:!1,checked1:!1,checked2:!1,show:!1,seat:"不限舱位",columns:["不限舱位","经济舱"],imgList:["../../static/img/img1.jpg","../../static/img/img2.jpg","../../static/img/img3.jpg"],singleStart:"",singleEnd:"",nowDate:"",child:!0}},computed:{name1:function(){return this.$store.state.city1},name2:function(){return this.$store.state.city2},date:function(){return this.$store.state.date},day:function(){return this.$store.state.day},date1:function(){return this.$store.state.date1},day1:function(){return this.$store.state.day1},date2:function(){return this.$store.state.date2},day2:function(){return this.$store.state.day2}},onLoad:function(){if(this.getRequest("uid")){var t=this.getRequest("uid");this.$store.commit("changeUid",t)}},onReady:function(){this.$store.commit("changeDate",this.dateFtt("MM-dd",new Date)),this.$store.commit("changeDay",this.getDay((new Date).getDay())),this.$store.commit("changeDate1",this.dateFtt("MM-dd",new Date)),this.$store.commit("changeDay1",this.getDay((new Date).getDay())),this.$store.commit("changeDate2",this.GetDateStr(3));var t=new Date,e=t.getFullYear();this.$store.commit("changeDoubleStart",e+"-"+this.date1),this.$store.commit("changeDoubleEnd",e+"-"+this.date2),this.$store.commit("changePrice1",e+"-"+this.date1),this.$store.commit("changeInit1",e+"-"+this.date1),this.$store.commit("changePrice2",e+"-"+this.date2),this.$store.commit("changeInit2",e+"-"+this.date2);var i=new Date,n="".concat(i.getFullYear(),"-").concat(i.getMonth()+1,"-").concat(i.getDate());this.$store.commit("changePrice",n)},onShow:function(){""==this.$store.state.singleStart&&this.$store.commit("changeSingleStart",this.dateFtt("yyyy/MM/dd",new Date))},methods:{getRequest:function(t){for(var e=window.location.search.substring(1),i=e.split("&"),n=0;n<i.length;n++){var a=i[n].split("=");if(a[0]==t)return a[1]}return!1},loop:function(){var t=this,e=this.name1,i=this.name2;this.$store.commit("changeCity1",i),this.$store.commit("changeCity2",e),this.loops=!0,setTimeout(function(){t.loops=!1},500);for(var a=0;a<n.airport.RECORDS.length;a++)this.name1==n.airport.RECORDS[a].cityname&&(this.singleStart=n.airport.RECORDS[a].citycode),this.name2==n.airport.RECORDS[a].cityname&&(this.singleEnd=n.airport.RECORDS[a].citycode)},goCity1:function(){uni.navigateTo({url:"../selectCity/selectCity?type=1",animationType:"slide-in-left",animationDuration:500})},goCity2:function(){uni.navigateTo({url:"../selectCity/selectCity?type=2",animationType:"slide-in-left",animationDuration:500})},goTime:function(){uni.navigateTo({url:"../selectTime/selectTime?type=0",animationType:"slide-in-left",animationDuration:500})},goTime1:function(){uni.navigateTo({url:"../doubleDate/doubleDate",animationType:"slide-in-left",animationDuration:500})},dateFtt:function(t,e){var i={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};for(var n in/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length))),i)new RegExp("("+n+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[n]:("00"+i[n]).substr((""+i[n]).length)));return t},GetDateStr:function(t){var e=new Date;e.setDate(e.getDate()+t);var i=e.getFullYear(),n=e.getMonth()+1,a=e.getDate();return n=n>9?n:"0"+n,a=a>9?a:"0"+a,this.$store.commit("changeDay2",this.getDay(new Date(i+"-"+n+"-"+a).getDay())),n+"-"+a},getDay:function(t){switch(t){case 0:t="周日";break;case 1:t="周一";break;case 2:t="周二";break;case 3:t="周三";break;case 4:t="周四";break;case 5:t="周五";break;case 6:t="周六"}return t},showSeat:function(){this.show=!0},onCancel:function(){this.show=!1},onConfirm:function(t){console.log(t),this.show=!1,this.seat=t},goOrder:function(){if(0==this.$store.state.searchState||2==this.$store.state.searchState)for(var t=0;t<n.airport.RECORDS.length;t++)this.name1==n.airport.RECORDS[t].cityname&&(this.singleStart=n.airport.RECORDS[t].citycode,this.$store.commit("changeStartCity",n.airport.RECORDS[t].citycode)),this.name2==n.airport.RECORDS[t].cityname&&(this.singleEnd=n.airport.RECORDS[t].citycode,this.$store.commit("changeEndCity",n.airport.RECORDS[t].citycode));uni.navigateTo({url:"../singleAir/singleAir?singleStart="+this.singleStart+"&singleEnd="+this.singleEnd+"&checked1="+this.checked1,animationType:"slide-in-left",animationDuration:500})},goSearch:function(){if(0==this.$store.state.searchState||2==this.$store.state.searchState)for(var t=0;t<n.airport.RECORDS.length;t++)this.name1==n.airport.RECORDS[t].cityname&&(this.singleStart=n.airport.RECORDS[t].citycode,this.$store.commit("changeStartCity",n.airport.RECORDS[t].citycode)),this.name2==n.airport.RECORDS[t].cityname&&(this.singleEnd=n.airport.RECORDS[t].citycode,this.$store.commit("changeEndCity",n.airport.RECORDS[t].citycode));uni.navigateTo({url:"../airStart/airStart",animationType:"slide-in-left",animationDuration:500})},changeState:function(t){this.$store.commit("changeState",t)},choiceSingle:function(t){this.child=1!=t,this.$store.commit("changeSingle",t)}}});e.default=a},"96ba":function(t,e,i){"use strict";i.r(e);var n=i("222d"),a=i("fa70");for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);i("05c0");var r=i("2877"),s=Object(r["a"])(a["default"],n["a"],n["b"],!1,null,"2bf05788",null);e["default"]=s.exports},ba84:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA6UlEQVRYR8XXzQ3CMAyGYbsTRckCdAM2ADZgE9gAmIAVWCBVRmGBSKhXhIh/PkOuTvU+7cUq058Pj/qllC0R7Xrvh9bac3RfO5cC7kTUeu8zGjEErG+Uc94z8yUCIQJEIsSAKIQKEIFQA9AIEwCJMANQCBcAgXADvAgIwIOAAawIKMCCgAPeEI9a6/xtQ4YASinXdYUT0a3Wuv8pQBNfYdAvoI1DAZY4DGCNQwCeuBvgjbsAiLgZgIqbAMi4GoCOqwARcTEgKi4C5JyPzHySLBbtf6EIkFJK0zRtlmU5WwKjZ6DLaBT7NH8Bz0DMId00QY0AAAAASUVORK5CYII="},dd46:function(t,e,i){var n=i("681c");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("2d297e15",n,!0,{sourceMap:!1,shadowMode:!1})},f42a:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ajax=void 0;var n=function(t){t=t||{},t.url=t.url||"",t.data=JSON.stringify(t.data||{}),t.method=t.method||"POST",t.header=t.header||{"Content-Type":"application/json"},t.success=t.success||function(){},t.fail=t.fail||function(){},console.log(t.data),uni.request({url:"http://m.xgcyz1978.com"+t.url,data:t.data,method:t.method,header:t.header,dataType:"json",success:function(e){t.success(e)},fail:function(e){t.fail(e),uni.showToast({title:"请稍后重试",icon:"none"})}})};e.ajax=n},f55e:function(t,e,i){"use strict";function n(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{},n=Object.keys(i);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(i).filter(function(t){return Object.getOwnPropertyDescriptor(i,t).enumerable}))),n.forEach(function(e){s(t,e,i[e])})}return t}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function r(t,e,i){return e&&o(t.prototype,e),i&&o(t,i),t}function s(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var c=function(){function t(){a(this,t),s(this,"config",{baseUrl:"",header:{"content-type":"application/json"},method:"POST",dataType:"json",responseType:"text",success:function(){},fail:function(){},complete:function(){}}),s(this,"interceptor",{request:function(e){e&&(t.requestBeforeFun=e)},response:function(e){e&&(t.requestComFun=e)}})}return r(t,[{key:"setConfig",value:function(t){this.config=t(this.config)}},{key:"request",value:function(){var e=this,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return i.baseUrl=i.baseUrl||this.config.baseUrl,i.dataType=i.dataType||this.config.dataType,i.url=t.posUrl(i.url)?i.url:i.baseUrl+i.url,i.data=i.data||{},i.header=i.header||this.config.header,i.method=i.method||this.config.method,new Promise(function(a,o){var r=!0,s=null;i.complete=function(e){var i=e.statusCode;e.config=s,e=t.requestComFun(e),200===i?a(e):o(e)};var c=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"handle cancel",e={errMsg:t,config:l};o(e),r=!1},l=n({},e.config,i);s=n({},l,t.requestBeforeFun(l,c)),r&&uni.request(s)})}},{key:"get",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return i.url=t,i.data=e,i.method="GET",this.request(i)}},{key:"post",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return i.url=t,i.data=e,i.method="POST",this.request(i)}}],[{key:"posUrl",value:function(t){return/(http|https):\/\/([\w.]+\/?)\S*/.test(t)}},{key:"requestBeforeFun",value:function(t){return t}},{key:"requestComFun",value:function(t){return t}}]),t}();e.default=c},f64f:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.test=e.http=void 0;var n=a(i("f55e"));function a(t){return t&&t.__esModule?t:{default:t}}function o(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{},n=Object.keys(i);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(i).filter(function(t){return Object.getOwnPropertyDescriptor(i,t).enumerable}))),n.forEach(function(e){r(t,e,i[e])})}return t}function r(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var s=new n.default;e.test=s,s.setConfig(function(t){return t.baseUrl="http://open-al.variflight.com/api/flight?",t}),s.interceptor.request(function(t,e){return t.header=o({},t.header),t}),s.interceptor.response(function(t){return t});var c=new n.default;e.http=c,c.setConfig(function(t){return t.baseUrl="http://open-al.variflight.com/api/flight?",t}),c.interceptor.request(function(t,e){return t.header=o({},t.header),t}),c.interceptor.response(function(t){return console.log(t),t})},fa70:function(t,e,i){"use strict";i.r(e);var n=i("871b"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e["default"]=a.a},ff35:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACRUlEQVRYR8WXy1HDMBBAdz1jX4EO6ADoIKkA6AAqgBwiHSFHKYeECggVkFQAHZAS6ICc4xkvsxmLEbIsSybAXjxjSbvP+5URfiBa6yshxOIHKgD7HmbjAPAohOitg233OmyMs4I/B7CN/zmAa3znQsR7flZV9V4UxWo0Gm1SwhodAp9xnyEiWiLiRAixjgFJATgloldEPIhRTETzoigmXR6JBmCjWusGBCIOq6oaICKv8dMGXOd5PgxBJAH4IOwqmM1mh2VZck7cWF4KQrQCsLI2ctsTvjJUSl0AwMLyxoMQ4tYXOi/AdDodENEs5D4DIaU89ClmCER8ttbOfInpBdBaLwHgHACC7mOIULZrredWOFZCCPbMN2kA1HH8MLvyPD/qyuS2qmBd2+323YTCp6sB4LjOSx1ThmaP5U1+de0OLx/APSLe8W4imkgpd52uryilgvq6AC6llJwPvaVO6JdaQaMaggDcZMbj8Wtv6wDghDQN4F9C4AydvSYhETVC+utlWJZlsKS7GhGHv7WNmtnQ1ozqPsAT9AQA4hqRUQoAbyb5fK4za0qpDSIOuiCyLLv1JXTrMHLa6IaIrn0lqbUmAOBb0DAE0dZNg+NYKbWu3bf7YN8lowbg5SBEWykHAZwYfunga1eWZWu+IQGA3SeSIaIuJE44uvpSEkQUgJWYPBd4THdJsHLsw9EA5lA9ri+I6JjfmcFlVcyTlJL/mqIkGcDVaiUhJ2mS8d0HRGEGNhmAPsb3BtDX+F4AlFKLlJi7zvwEsvGCMMdJRQIAAAAASUVORK5CYII="}}]);