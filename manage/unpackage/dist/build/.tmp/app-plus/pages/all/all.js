(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/all/all"],{"106d":function(t,e,a){"use strict";(function(t){a("9fbb"),a("921b");o(a("66fd"));var e=o(a("6c3e"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("6e42")["createPage"])},"5a0a":function(t,e,a){},6017:function(t,e,a){"use strict";var o=a("5a0a"),n=a.n(o);n.a},"6c3e":function(t,e,a){"use strict";a.r(e);var o=a("bd5c"),n=a("ed2f");for(var i in n)"default"!==i&&function(t){a.d(e,t,function(){return n[t]})}(i);a("6017");var s,d=a("f0c5"),r=Object(d["a"])(n["default"],o["b"],o["c"],!1,null,"2ab289d2",null,!1,o["a"],s);e["default"]=r.exports},bd5c:function(t,e,a){"use strict";var o,n=function(){var t=this,e=t.$createElement;t._self._c},i=[];a.d(e,"b",function(){return n}),a.d(e,"c",function(){return i}),a.d(e,"a",function(){return o})},ea65:function(t,e,a){"use strict";(function(t,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=d(a("d4ef")),i=d(a("d5ef")),s=a("01bc");function d(t){return t&&t.__esModule?t:{default:t}}function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var c,u=function(){return Promise.all([a.e("common/vendor"),a.e("components/w-picker/w-picker")]).then(a.bind(null,"d9ad"))},l=null,f={data:function(){return{Color:"#fff",backColor:"#00AAEF",itemIndex:0,val:"",tab:["入库","出库","其他"],cWidth:"",cHeight:"",pixelRatio:1,date:"",type:1,summary:"",list:[],listNum:[],tabs:["月统计","年统计"],tabIndex:0,weight:{}}},components:{wPicker:u},onLoad:function(){var e=new Date,a=e.getFullYear(),o=e.getMonth()+1>9?e.getMonth()+1:"0"+(e.getMonth()+1);this.val="".concat(a,"年").concat(o,"月"),this.date="".concat(a,"-").concat(o),c=this,t.getSystemInfo({success:function(t){t.pixelRatio>1&&(c.pixelRatio=1)}}),this.cWidth=t.upx2px(750),this.cHeight=t.upx2px(500),this.init()},methods:{init:function(){0==this.tabIndex?(this.goWeight(),this.goCount(),this.goNumer()):(this.goWeightYear(),this.goNumerYear(),this.goCountYear())},goWeightYear:function(){var e=this,a={token:t.getStorageSync("token"),addyear:this.date,inorout:this.type,os:t.getSystemInfoSync().platform,osversion:t.getSystemInfoSync().system,appversion:t.getStorageSync("appversion")};n.default.showLoading("",function(){var i={url:"/api/AppDataReport/TypeAndYear2CntAndWeight",data:a,success:function(a){console.log(o(a," at pages\\all\\all.vue:143")),0==a.data.Code?(n.default.hideLoading(),e.weight=a.data.Customerdata):-2==a.data.Code||-1==a.data.Code?(n.default.hideLoading(),n.default.showToast(a.data.Description),t.removeStorageSync("token"),setTimeout(function(){t.redirectTo({url:"/pages/login/login"})},500)):(n.default.hideLoading(),n.default.showToast(a.data.Description))}};(0,s.ajax)(i)})},goWeight:function(){var e=this,a={token:t.getStorageSync("token"),addmonth:this.date,inorout:this.type,os:t.getSystemInfoSync().platform,osversion:t.getSystemInfoSync().system,appversion:t.getStorageSync("appversion")};n.default.showLoading("",function(){var i={url:"/api/AppDataReport/TypeAndMonth2CntAndWeight",data:a,success:function(a){console.log(o(a," at pages\\all\\all.vue:181")),0==a.data.Code?(n.default.hideLoading(),e.weight=a.data.Customerdata):-2==a.data.Code||-1==a.data.Code?(n.default.hideLoading(),n.default.showToast(a.data.Description),t.removeStorageSync("token"),setTimeout(function(){t.redirectTo({url:"/pages/login/login"})},500)):(n.default.hideLoading(),n.default.showToast(a.data.Description))}};(0,s.ajax)(i)})},goNumer:function(){var e=this,a={token:t.getStorageSync("token"),addmonth:this.date,inorout:this.type,os:t.getSystemInfoSync().platform,osversion:t.getSystemInfoSync().system,appversion:t.getStorageSync("appversion")};n.default.showLoading("",function(){var i={url:"/api/AppDataReport/TypeAndMonth2GoodsList",data:a,success:function(a){console.log(o(a," at pages\\all\\all.vue:218")),0==a.data.Code?(n.default.hideLoading(),e.listNum=a.data.Customerdata):-2==a.data.Code||-1==a.data.Code?(n.default.hideLoading(),n.default.showToast(a.data.Description),t.removeStorageSync("token"),setTimeout(function(){t.redirectTo({url:"/pages/login/login"})},500)):(n.default.hideLoading(),n.default.showToast(a.data.Description))}};(0,s.ajax)(i)})},goNumerYear:function(){var e=this,a={token:t.getStorageSync("token"),addyear:this.date,inorout:this.type,os:t.getSystemInfoSync().platform,osversion:t.getSystemInfoSync().system,appversion:t.getStorageSync("appversion")};n.default.showLoading("",function(){var i={url:"/api/AppDataReport/TypeAndYear2GoodsList",data:a,success:function(a){console.log(o(a," at pages\\all\\all.vue:256")),0==a.data.Code?(n.default.hideLoading(),e.listNum=a.data.Customerdata):-2==a.data.Code||-1==a.data.Code?(n.default.hideLoading(),n.default.showToast(a.data.Description),t.removeStorageSync("token"),setTimeout(function(){t.redirectTo({url:"/pages/login/login"})},500)):(n.default.hideLoading(),n.default.showToast(a.data.Description))}};(0,s.ajax)(i)})},goCount:function(){var e=this,a={token:t.getStorageSync("token"),addmonth:this.date,inorout:this.type,os:t.getSystemInfoSync().platform,osversion:t.getSystemInfoSync().system,appversion:t.getStorageSync("appversion")};n.default.showLoading("",function(){var i={url:"/api/AppDataReport/TypeAndMonth2MonthList",data:a,success:function(a){if(console.log(o(a," at pages\\all\\all.vue:294")),0==a.data.Code){n.default.hideLoading();var i={categories:[],series:[]};if(a.data.Customerdata.length>0){e.list=a.data.Customerdata;var s=[];e.list.forEach(function(t){i.categories.unshift(t.addmonth.substr(5)),e.date==t.addmonth?s.unshift({value:t.goodsweight,color:"#53bb6e",textColor:"#ffffff"}):s.unshift({value:t.goodsweight,color:"#CBEBD4",textColor:"#ffffff"})}),1==e.type?i.series=[{name:"入库量",data:s}]:2==e.type?i.series=[{name:"出库量",data:s}]:i.series=[{name:"其他",data:s}]}else{i.categories.unshift(e.date.substr(5));var d=[{value:0,color:"#CBEBD4",textColor:"#ffffff"}];1==e.type?i.series=[{name:"入库量",data:d}]:2==e.type?i.series=[{name:"出库量",data:d}]:i.series=[{name:"其他",data:d}]}c.showColumn("canvasColumn",i)}else-2==a.data.Code||-1==a.data.Code?(n.default.hideLoading(),n.default.showToast(a.data.Description),t.removeStorageSync("token"),setTimeout(function(){t.redirectTo({url:"/pages/login/login"})},500)):(n.default.hideLoading(),n.default.showToast(a.data.Description))}};(0,s.ajax)(i)})},goCountYear:function(){var e=this,a={token:t.getStorageSync("token"),addyear:this.date,inorout:this.type,os:t.getSystemInfoSync().platform,osversion:t.getSystemInfoSync().system,appversion:t.getStorageSync("appversion")};n.default.showLoading("",function(){var i={url:"/api/AppDataReport/TypeAndYear2YearList",data:a,success:function(a){if(console.log(o(a," at pages\\all\\all.vue:395")),0==a.data.Code){n.default.hideLoading();var i={categories:[],series:[]};if(a.data.Customerdata.length>0){e.list=a.data.Customerdata;var s=[];e.list.forEach(function(t){i.categories.unshift(t.addyear),e.date==t.addyear?s.unshift({value:t.goodsweight,color:"#53bb6e",textColor:"#ffffff"}):s.unshift({value:t.goodsweight,color:"#CBEBD4",textColor:"#ffffff"})}),1==e.type?i.series=[{name:"入库量",data:s}]:2==e.type?i.series=[{name:"出库量",data:s}]:i.series=[{name:"其他",data:s}]}else{i.categories.unshift(e.date.substr(5));var d=[{value:0,color:"#CBEBD4",textColor:"#ffffff"}];1==e.type?i.series=[{name:"入库量",data:d}]:2==e.type?i.series=[{name:"出库量",data:d}]:i.series=[{name:"其他",data:d}]}c.showColumn("canvasColumn",i)}else-2==a.data.Code||-1==a.data.Code?(n.default.hideLoading(),n.default.showToast(a.data.Description),t.removeStorageSync("token"),setTimeout(function(){t.redirectTo({url:"/pages/login/login"})},500)):(n.default.hideLoading(),n.default.showToast(a.data.Description))}};(0,s.ajax)(i)})},showColumn:function(t,e){var a;l=new i.default((a={$this:c,canvasId:t,type:"column",padding:[15,5,0,15],legend:{show:!0,padding:5,lineHeight:11,margin:0},fontSize:12,background:"#FFFFFF",pixelRatio:c.pixelRatio,animation:!0,dataLabel:!1,categories:e.categories,series:e.series,xAxis:{disableGrid:!0},yAxis:{data:[{position:"left",axisLine:!1,format:function(t){return t.toFixed(0)}}]}},r(a,"dataLabel",!0),r(a,"width",c.cWidth*c.pixelRatio),r(a,"height",c.cHeight*c.pixelRatio),r(a,"extra",{column:{type:"group",width:c.cWidth*c.pixelRatio*.45/e.categories.length}}),a))},touchColumn:function(t){l.scrollStart(t)},moveColumn:function(t){l.scroll(t)},touchEndColumn:function(t){l.scrollEnd(t),l.touchLegend(t,{animation:!0}),l.showToolTip(t,{format:function(t,e){return"object"===typeof t.data?e+" "+t.name+":"+t.data.value:e+" "+t.name+":"+t.data}})},goWork:function(e){t.navigateTo({url:"/pages/list/list?name="+e+"&date="+this.date+"&type="+this.type+"&tab="+this.tabIndex})},changeTabs:function(t){this.tabIndex=t;var e=new Date,a=e.getFullYear(),o=e.getMonth()+1>9?e.getMonth()+1:"0"+(e.getMonth()+1);0==t?(this.val="".concat(a,"年").concat(o,"月"),this.date="".concat(a,"-").concat(o)):(this.val="".concat(a,"年"),this.date="".concat(a)),this.init()},changeTab:function(t){this.type!=t+1&&(this.itemIndex=t,this.type=2==t?100:t+1,this.init())},showType:function(){0==this.tabIndex?this.$refs.picker1.show():this.$refs.picker2.show()},onConfirm1:function(t){console.log(o(JSON.stringify(t)," at pages\\all\\all.vue:582")),this.val="".concat(t.checkArr[0][0],"年").concat(t.checkArr[0][1],"月"),this.date=t.result,this.init()},onConfirm2:function(t){console.log(o(t," at pages\\all\\all.vue:588")),this.val="".concat(t.checkArr[0][0],"年"),this.date=t.checkArr[0][0],this.init()}}};e.default=f}).call(this,a("6e42")["default"],a("0de9")["default"])},ed2f:function(t,e,a){"use strict";a.r(e);var o=a("ea65"),n=a.n(o);for(var i in o)"default"!==i&&function(t){a.d(e,t,function(){return o[t]})}(i);e["default"]=n.a}},[["106d","common/runtime","common/vendor"]]]);