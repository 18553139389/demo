(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-productDetail-productDetail~pages-shopDetail-shopDetail"],{"06c5":function(e,t,n){"use strict";n("a630"),n("fb6a"),n("d3b7"),n("25f0"),n("3ca3"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=o;var i=r(n("6b75"));function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(e){if("string"===typeof e)return(0,i.default)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?(0,i.default)(e,t):void 0}}},"26ec":function(e,t,n){var i=n("24fb");t=i(!1),t.push([e.i,"@-webkit-keyframes _show-data-v-70b32414{0%{opacity:0}100%{opacity:1}}@keyframes _show-data-v-70b32414{0%{opacity:0}100%{opacity:1}}\n\n\n\n",""]),e.exports=t},3967:function(e,t,n){"use strict";var i=n("ac8f"),r=n.n(i);r.a},"527e":function(e,t,n){var i;n("c975"),n("ac1f"),n("466d"),n("5319"),n("1276");var r=n("9523");!function(r,o){i=function(){return o(r)}.call(t,n,t,e),void 0===i||(e.exports=i)}(window,(function(e,t){if(!e.jWeixin){var n,i,o={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},a=function(){var e={};for(var t in o)e[o[t]]=t;return e}(),s=e.document,c=s.title,l=navigator.userAgent.toLowerCase(),u=navigator.platform.toLowerCase(),d=!(!u.match("mac")&&!u.match("win")),f=-1!=l.indexOf("wxdebugger"),p=-1!=l.indexOf("micromessenger"),h=-1!=l.indexOf("android"),m=-1!=l.indexOf("iphone")||-1!=l.indexOf("ipad"),g=(i=l.match(/micromessenger\/(\d+\.\d+\.\d+)/)||l.match(/micromessenger\/(\d+\.\d+)/))?i[1]:"",v={initStartTime:V(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},y={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:m?1:h?2:-1,clientVersion:g,url:encodeURIComponent(location.href)},b={},_={_completes:[]},w={state:0,data:{}};E((function(){v.initEndTime=V()}));var S=!1,I=[],T=(n={config:function(t){O("config",b=t);var n=!1!==b.check;E((function(){if(n)A(o.config,{verifyJsApiList:L(b.jsApiList),verifyOpenTagList:L(b.openTagList)},function(){_._complete=function(e){v.preVerifyEndTime=V(),w.state=1,w.data=e},_.success=function(e){y.isPreVerifyOk=0},_.fail=function(e){_._fail?_._fail(e):w.state=-1};var e=_._completes;return e.push((function(){!function(){if(!(d||f||b.debug||g<"6.0.2"||y.systemType<0)){var e=new Image;y.appId=b.appId,y.initTime=v.initEndTime-v.initStartTime,y.preVerifyTime=v.preVerifyEndTime-v.preVerifyStartTime,T.getNetworkType({isInnerInvoke:!0,success:function(t){y.networkType=t.networkType;var n="https://open.weixin.qq.com/sdk/report?v="+y.version+"&o="+y.isPreVerifyOk+"&s="+y.systemType+"&c="+y.clientVersion+"&a="+y.appId+"&n="+y.networkType+"&i="+y.initTime+"&p="+y.preVerifyTime+"&u="+y.url;e.src=n}})}}()})),_.complete=function(t){for(var n=0,i=e.length;n<i;++n)e[n]();_._completes=[]},_}()),v.preVerifyStartTime=V();else{w.state=1;for(var e=_._completes,t=0,i=e.length;t<i;++t)e[t]();_._completes=[]}})),T.invoke||(T.invoke=function(t,n,i){e.WeixinJSBridge&&WeixinJSBridge.invoke(t,C(n),i)},T.on=function(t,n){e.WeixinJSBridge&&WeixinJSBridge.on(t,n)})},ready:function(e){0!=w.state?e():(_._completes.push(e),!p&&b.debug&&e())},error:function(e){g<"6.0.2"||(-1==w.state?e(w.data):_._fail=e)},checkJsApi:function(e){A("checkJsApi",{jsApiList:L(e.jsApiList)},(e._complete=function(e){if(h){var t=e.checkResult;t&&(e.checkResult=JSON.parse(t))}e=function(e){var t=e.checkResult;for(var n in t){var i=a[n];i&&(t[i]=t[n],delete t[n])}return e}(e)},e))},onMenuShareTimeline:function(e){M(o.onMenuShareTimeline,{complete:function(){A("shareTimeline",{title:e.title||c,desc:e.title||c,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){M(o.onMenuShareAppMessage,{complete:function(t){"favorite"===t.scene?A("sendAppMessage",{title:e.title||c,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""}):A("sendAppMessage",{title:e.title||c,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){M(o.onMenuShareQQ,{complete:function(){A("shareQQ",{title:e.title||c,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){M(o.onMenuShareWeibo,{complete:function(){A("shareWeiboApp",{title:e.title||c,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){M(o.onMenuShareQZone,{complete:function(){A("shareQZone",{title:e.title||c,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},updateTimelineShareData:function(e){A("updateTimelineShareData",{title:e.title,link:e.link,imgUrl:e.imgUrl},e)},updateAppMessageShareData:function(e){A("updateAppMessageShareData",{title:e.title,desc:e.desc,link:e.link,imgUrl:e.imgUrl},e)},startRecord:function(e){A("startRecord",{},e)},stopRecord:function(e){A("stopRecord",{},e)},onVoiceRecordEnd:function(e){M("onVoiceRecordEnd",e)},playVoice:function(e){A("playVoice",{localId:e.localId},e)},pauseVoice:function(e){A("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){A("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){M("onVoicePlayEnd",e)},uploadVoice:function(e){A("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){A("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){A("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){A("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},(e._complete=function(e){if(h){var t=e.localIds;try{t&&(e.localIds=JSON.parse(t))}catch(e){}}},e))},getLocation:function(e){},previewImage:function(e){A(o.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){A("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){A("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===S?(S=!0,A("getLocalImgData",{localId:e.localId},(e._complete=function(e){if(S=!1,0<I.length){var t=I.shift();wx.getLocalImgData(t)}},e))):I.push(e)},getNetworkType:function(e){A("getNetworkType",{},(e._complete=function(e){e=function(e){var t=e.errMsg;e.errMsg="getNetworkType:ok";var n=e.subtype;if(delete e.subtype,n)e.networkType=n;else{var i=t.indexOf(":"),r=t.substring(i+1);switch(r){case"wifi":case"edge":case"wwan":e.networkType=r;break;default:e.errMsg="getNetworkType:fail"}}return e}(e)},e))},openLocation:function(e){A("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)}},r(n,"getLocation",(function(e){A(o.getLocation,{type:(e=e||{}).type||"wgs84"},(e._complete=function(e){delete e.type},e))})),r(n,"hideOptionMenu",(function(e){A("hideOptionMenu",{},e)})),r(n,"showOptionMenu",(function(e){A("showOptionMenu",{},e)})),r(n,"closeWindow",(function(e){A("closeWindow",{},e=e||{})})),r(n,"hideMenuItems",(function(e){A("hideMenuItems",{menuList:e.menuList},e)})),r(n,"showMenuItems",(function(e){A("showMenuItems",{menuList:e.menuList},e)})),r(n,"hideAllNonBaseMenuItem",(function(e){A("hideAllNonBaseMenuItem",{},e)})),r(n,"showAllNonBaseMenuItem",(function(e){A("showAllNonBaseMenuItem",{},e)})),r(n,"scanQRCode",(function(e){A("scanQRCode",{needResult:(e=e||{}).needResult||0,scanType:e.scanType||["qrCode","barCode"]},(e._complete=function(e){if(m){var t=e.resultStr;if(t){var n=JSON.parse(t);e.resultStr=n&&n.scan_code&&n.scan_code.scan_result}}},e))})),r(n,"openAddress",(function(e){A(o.openAddress,{},(e._complete=function(e){e=function(e){return e.postalCode=e.addressPostalCode,delete e.addressPostalCode,e.provinceName=e.proviceFirstStageName,delete e.proviceFirstStageName,e.cityName=e.addressCitySecondStageName,delete e.addressCitySecondStageName,e.countryName=e.addressCountiesThirdStageName,delete e.addressCountiesThirdStageName,e.detailInfo=e.addressDetailInfo,delete e.addressDetailInfo,e}(e)},e))})),r(n,"openProductSpecificView",(function(e){A(o.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)})),r(n,"addCard",(function(e){for(var t=e.cardList,n=[],i=0,r=t.length;i<r;++i){var a=t[i],s={card_id:a.cardId,card_ext:a.cardExt};n.push(s)}A(o.addCard,{card_list:n},(e._complete=function(e){var t=e.card_list;if(t){for(var n=0,i=(t=JSON.parse(t)).length;n<i;++n){var r=t[n];r.cardId=r.card_id,r.cardExt=r.card_ext,r.isSuccess=!!r.is_succ,delete r.card_id,delete r.card_ext,delete r.is_succ}e.cardList=t,delete e.card_list}},e))})),r(n,"chooseCard",(function(e){A("chooseCard",{app_id:b.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},(e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e))})),r(n,"openCard",(function(e){for(var t=e.cardList,n=[],i=0,r=t.length;i<r;++i){var a=t[i],s={card_id:a.cardId,code:a.code};n.push(s)}A(o.openCard,{card_list:n},e)})),r(n,"consumeAndShareCard",(function(e){A(o.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)})),r(n,"chooseWXPay",(function(e){A(o.chooseWXPay,P(e),e)})),r(n,"openEnterpriseRedPacket",(function(e){A(o.openEnterpriseRedPacket,P(e),e)})),r(n,"startSearchBeacons",(function(e){A(o.startSearchBeacons,{ticket:e.ticket},e)})),r(n,"stopSearchBeacons",(function(e){A(o.stopSearchBeacons,{},e)})),r(n,"onSearchBeacons",(function(e){M(o.onSearchBeacons,e)})),r(n,"openEnterpriseChat",(function(e){A("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)})),r(n,"launchMiniProgram",(function(e){A("launchMiniProgram",{targetAppId:e.targetAppId,path:function(e){if("string"==typeof e&&0<e.length){var t=e.split("?")[0],n=e.split("?")[1];return t+=".html",void 0!==n?t+"?"+n:t}}(e.path),envVersion:e.envVersion},e)})),r(n,"openBusinessView",(function(e){A("openBusinessView",{businessType:e.businessType,queryString:e.queryString||"",envVersion:e.envVersion},(e._complete=function(e){if(h){var t=e.extraData;if(t)try{e.extraData=JSON.parse(t)}catch(t){e.extraData={}}}},e))})),r(n,"miniProgram",{navigateBack:function(e){e=e||{},E((function(){A("invokeMiniProgramAPI",{name:"navigateBack",arg:{delta:e.delta||1}},e)}))},navigateTo:function(e){E((function(){A("invokeMiniProgramAPI",{name:"navigateTo",arg:{url:e.url}},e)}))},redirectTo:function(e){E((function(){A("invokeMiniProgramAPI",{name:"redirectTo",arg:{url:e.url}},e)}))},switchTab:function(e){E((function(){A("invokeMiniProgramAPI",{name:"switchTab",arg:{url:e.url}},e)}))},reLaunch:function(e){E((function(){A("invokeMiniProgramAPI",{name:"reLaunch",arg:{url:e.url}},e)}))},postMessage:function(e){E((function(){A("invokeMiniProgramAPI",{name:"postMessage",arg:e.data||{}},e)}))},getEnv:function(t){E((function(){t({miniprogram:"miniprogram"===e.__wxjs_environment})}))}}),n),k=1,x={};return s.addEventListener("error",(function(e){if(!h){var t=e.target,n=t.tagName,i=t.src;if(("IMG"==n||"VIDEO"==n||"AUDIO"==n||"SOURCE"==n)&&-1!=i.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var r=t["wx-id"];if(r||(r=k++,t["wx-id"]=r),x[r])return;x[r]=!0,wx.ready((function(){wx.getLocalImgData({localId:i,success:function(e){t.src=e.localData}})}))}}}),!0),s.addEventListener("load",(function(e){if(!h){var t=e.target,n=t.tagName;if(t.src,"IMG"==n||"VIDEO"==n||"AUDIO"==n||"SOURCE"==n){var i=t["wx-id"];i&&(x[i]=!1)}}}),!0),t&&(e.wx=e.jWeixin=T),T}function A(t,n,i){e.WeixinJSBridge?WeixinJSBridge.invoke(t,C(n),(function(e){B(t,e,i)})):O(t,i)}function M(t,n,i){e.WeixinJSBridge?WeixinJSBridge.on(t,(function(e){i&&i.trigger&&i.trigger(e),B(t,e,n)})):O(t,i||n)}function C(e){return(e=e||{}).appId=b.appId,e.verifyAppId=b.appId,e.verifySignType="sha1",e.verifyTimestamp=b.timestamp+"",e.verifyNonceStr=b.nonceStr,e.verifySignature=b.signature,e}function P(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function B(e,t,n){"openEnterpriseChat"!=e&&"openBusinessView"!==e||(t.errCode=t.err_code),delete t.err_code,delete t.err_desc,delete t.err_detail;var i=t.errMsg;i||(i=t.err_msg,delete t.err_msg,i=function(e,t){var n=e,i=a[n];i&&(n=i);var r="ok";if(t){var o=t.indexOf(":");"confirm"==(r=t.substring(o+1))&&(r="ok"),"failed"==r&&(r="fail"),-1!=r.indexOf("failed_")&&(r=r.substring(7)),-1!=r.indexOf("fail_")&&(r=r.substring(5)),"access denied"!=(r=(r=r.replace(/_/g," ")).toLowerCase())&&"no permission to execute"!=r||(r="permission denied"),"config"==n&&"function not exist"==r&&(r="ok"),""==r&&(r="fail")}return n+":"+r}(e,i),t.errMsg=i),(n=n||{})._complete&&(n._complete(t),delete n._complete),i=t.errMsg||"",b.debug&&!n.isInnerInvoke&&alert(JSON.stringify(t));var r=i.indexOf(":");switch(i.substring(r+1)){case"ok":n.success&&n.success(t);break;case"cancel":n.cancel&&n.cancel(t);break;default:n.fail&&n.fail(t)}n.complete&&n.complete(t)}function L(e){if(e){for(var t=0,n=e.length;t<n;++t){var i=e[t],r=o[i];r&&(e[t]=r)}return e}}function O(e,t){if(!(!b.debug||t&&t.isInnerInvoke)){var n=a[e];n&&(e=n),t&&t._complete&&delete t._complete,console.log('"'+e+'",',t||"")}}function V(){return(new Date).getTime()}function E(t){p&&(e.WeixinJSBridge?t():s.addEventListener&&s.addEventListener("WeixinJSBridgeReady",t,!1))}}))},"6b75":function(e,t,n){"use strict";function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}Object.defineProperty(t,"__esModule",{value:!0}),t.default=i},7018:function(e,t,n){"use strict";n.r(t);var i=n("9f67"),r=n("c06e");for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);n("3967");var a,s=n("f0c5"),c=Object(s["a"])(r["default"],i["b"],i["c"],!1,null,"70b32414",null,!1,i["a"],a);t["default"]=c.exports},"8ad0":function(e,t,n){n("ac1f"),n("1276");var i={errorImg:null,filter:null,highlight:null,onText:null,entities:{quot:'"',apos:"'",semi:";",nbsp:" ",ensp:" ",emsp:" ",ndash:"–",mdash:"—",middot:"·",lsquo:"‘",rsquo:"’",ldquo:"“",rdquo:"”",bull:"•",hellip:"…"},blankChar:r(" , ,\t,\r,\n,\f"),boolAttrs:r("allowfullscreen,autoplay,autostart,controls,ignore,loop,muted"),blockTags:r("address,article,aside,body,caption,center,cite,footer,header,html,nav,pre,section"),ignoreTags:r("area,base,canvas,frame,iframe,input,link,map,meta,param,script,source,style,svg,textarea,title,track,wbr"),richOnlyTags:r("a,colgroup,fieldset,legend,table"),selfClosingTags:r("area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr"),trustTags:r("a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video"),userAgentStyles:{address:"font-style:italic",big:"display:inline;font-size:1.2em",blockquote:"background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px",caption:"display:table-caption;text-align:center",center:"text-align:center",cite:"font-style:italic",dd:"margin-left:40px",mark:"background-color:yellow",pre:"font-family:monospace;white-space:pre;overflow:scroll",s:"text-decoration:line-through",small:"display:inline;font-size:0.8em",u:"text-decoration:underline"}};function r(e){for(var t=Object.create(null),n=e.split(","),i=n.length;i--;)t[n[i]]=!0;return t}e.exports=i},9523:function(e,t){function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}e.exports=n},"9f67":function(e,t,n){"use strict";var i;n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return i}));var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",[e.nodes.length?e._e():e._t("default"),n("v-uni-view",{style:e.showAm+(e.selectable?";user-select:text;-webkit-user-select:text":""),attrs:{id:"_top"}},[n("div",{attrs:{id:"rtf"+e.uid}})])],2)},o=[]},ac8f:function(e,t,n){var i=n("26ec");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var r=n("4f06").default;r("173c9fc5",i,!0,{sourceMap:!1,shadowMode:!1})},b85c:function(e,t,n){"use strict";n("a4d3"),n("e01a"),n("d28b"),n("d3b7"),n("3ca3"),n("ddb0"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=o;var i=r(n("06c5"));function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var n;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=(0,i.default)(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,s=!0,c=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return s=e.done,e},e:function(e){c=!0,a=e},f:function(){try{s||null==n["return"]||n["return"]()}finally{if(c)throw a}}}}},c06e:function(e,t,n){"use strict";n.r(t);var i=n("f661"),r=n.n(i);for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);t["default"]=r.a},f661:function(e,t,n){"use strict";var i=n("4ea4");n("99af"),n("caad"),n("c975"),n("acd8"),n("e25e"),n("ac1f"),n("2532"),n("466d"),n("5319"),n("1276"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=i(n("b85c")),o=uni.getSystemInfoSync(),a=o.windowWidth,s=(o.platform,n("8ad0")),c={name:"parser",data:function(){return{uid:this._uid,showAm:"",nodes:[]}},props:{html:String,autopause:{type:Boolean,default:!0},autoscroll:Boolean,autosetTitle:{type:Boolean,default:!0},domain:String,lazyLoad:Boolean,selectable:Boolean,tagStyle:Object,showWithAnimation:Boolean,useAnchor:Boolean},watch:{html:function(e){this.setContent(e)}},created:function(){this.imgList=[],this.imgList.each=function(e){for(var t=0,n=this.length;t<n;t++)this.setItem(t,e(this[t],t,this))},this.imgList.setItem=function(e,t){if(void 0!=e&&t){if(0==t.indexOf("http")&&this.includes(t)){for(var n,i=t.split("://")[0],r=i.length;n=t[r];r++){if("/"==n&&"/"!=t[r-1]&&"/"!=t[r+1])break;i+=Math.random()>.5?n.toUpperCase():n}return i+=t.substr(r),this[e]=i}if(this[e]=t,t.includes("data:image")){var o=t.match(/data:image\/(\S+?);(\S+?),(.+)/);if(!o)return}}}},mounted:function(){this.document=document.getElementById("rtf"+this._uid),this.html&&this.setContent(this.html)},beforeDestroy:function(){this._observer&&this._observer.disconnect(),this.imgList.each((function(e){})),clearInterval(this._timer)},methods:{setContent:function(e,t){var n=this;if(e){var i=document.createElement("div");t?this.rtf?this.rtf.appendChild(i):this.rtf=i:(this.rtf&&this.rtf.parentNode.removeChild(this.rtf),this.rtf=i),i.innerHTML=this._handleHtml(e,t);for(var o,c=this.rtf.getElementsByTagName("style"),l=0;o=c[l++];)o.innerHTML=o.innerHTML.replace(/body/g,"#rtf"+this._uid),o.setAttribute("scoped","true");!this._observer&&this.lazyLoad&&IntersectionObserver&&(this._observer=new IntersectionObserver((function(e){for(var t,i=0;t=e[i++];)t.isIntersecting&&(t.target.src=t.target.getAttribute("data-src"),t.target.removeAttribute("data-src"),n._observer.unobserve(t.target))}),{rootMargin:"500px 0px 500px 0px"}));var u=this,d=this.rtf.getElementsByTagName("title");d.length&&this.autosetTitle&&uni.setNavigationBarTitle({title:d[0].innerText}),this.imgList.length=0;for(var f,p=this.rtf.getElementsByTagName("img"),h=0,m=0;f=p[h];h++){parseInt(f.style.width||f.getAttribute("width"))>a&&(f.style.height="auto");var g=f.getAttribute("src");this.domain&&g&&("/"==g[0]?"/"==g[1]?f.src=(this.domain.includes("://")?this.domain.split("://")[0]:"")+":"+g:f.src=this.domain+g:g.includes("://")||(f.src=this.domain+"/"+g)),f.hasAttribute("ignore")||"A"==f.parentElement.nodeName||(f.i=m++,u.imgList.push(f.getAttribute("original-src")||f.src||f.getAttribute("data-src")),f.onclick=function(){var e=!0;this.ignore=function(){return e=!1},u.$emit("imgtap",this),e&&uni.previewImage({current:this.i,urls:u.imgList})}),f.onerror=function(){s.errorImg&&(u.imgList[this.i]=this.src=s.errorImg),u.$emit("error",{source:"img",target:this})},u.lazyLoad&&this._observer&&f.src&&0!=f.i&&(f.setAttribute("data-src",f.src),f.removeAttribute("src"),this._observer.observe(f))}var v,y=this.rtf.getElementsByTagName("a"),b=(0,r.default)(y);try{for(b.s();!(v=b.n()).done;){var _=v.value;_.onclick=function(){var e=!0,t=this.getAttribute("href");if(u.$emit("linkpress",{href:t,ignore:function(){return e=!1}}),e&&t)if("#"==t[0])u.useAnchor&&u.navigateTo({id:t.substr(1)});else{if(0==t.indexOf("http")||0==t.indexOf("//"))return!0;uni.navigateTo({url:t})}return!1}}}catch(V){b.e(V)}finally{b.f()}var w=this.rtf.getElementsByTagName("video");u.videoContexts=w;for(var S,I=0;S=w[I++];)S.style.maxWidth="100%",S.onerror=function(){u.$emit("error",{source:"video",target:this})},S.onplay=function(){if(u.autopause)for(var e,t=0;e=u.videoContexts[t++];)e!=this&&e.pause()};var T,k,x=this.rtf.getElementsByTagName("audio"),A=(0,r.default)(x);try{for(A.s();!(T=A.n()).done;){var M=T.value;M.onerror=function(){u.$emit("error",{source:"audio",target:this})}}}catch(V){A.e(V)}finally{A.f()}if(this.autoscroll){var C,P=this.rtf.getElementsByTagName("table"),B=(0,r.default)(P);try{for(B.s();!(C=B.n()).done;){var L=C.value,O=document.createElement("div");O.style.overflow="scroll",L.parentNode.replaceChild(O,L),O.appendChild(L)}}catch(V){B.e(V)}finally{B.f()}}t||this.document.appendChild(this.rtf),this.$nextTick((function(){n.nodes=[1],n.$emit("load")})),setTimeout((function(){return n.showAm=""}),500),clearInterval(this._timer),this._timer=setInterval((function(){n.rect=n.rtf.getBoundingClientRect(),n.rect.height==k&&(n.$emit("ready",n.rect),clearInterval(n._timer)),k=n.rect.height}),350),this.showWithAnimation&&!t&&(this.showAm="animation:_show .5s")}else this.rtf&&!t&&this.rtf.parentNode.removeChild(this.rtf)},getText:function(){arguments.length>0&&void 0!==arguments[0]||this.nodes;var e="";return e=this.rtf.innerText,e},in:function(e){e.page&&e.selector&&e.scrollTop&&(this._in=e)},navigateTo:function(e){var t=this;if(!this.useAnchor)return e.fail&&e.fail("Anchor is disabled");var n=" ",i=uni.createSelectorQuery().in(this._in?this._in.page:this).select((this._in?this._in.selector:"#_top")+(e.id?"".concat(n,"#").concat(e.id,",").concat(this._in?this._in.selector:"#_top").concat(n,".").concat(e.id):"")).boundingClientRect();this._in?i.select(this._in.selector).scrollOffset().select(this._in.selector).boundingClientRect():i.selectViewport().scrollOffset(),i.exec((function(n){if(!n[0])return e.fail&&e.fail("Label not found");var i=n[1].scrollTop+n[0].top-(n[2]?n[2].top:0)+(e.offset||0);t._in?t._in.page[t._in.scrollTop]=i:uni.pageScrollTo({scrollTop:i,duration:300}),e.success&&e.success()}))},getVideoContext:function(e){if(!e)return this.videoContexts;for(var t=this.videoContexts.length;t--;)if(this.videoContexts[t].id==e)return this.videoContexts[t]},_handleHtml:function(e,t){if(!t){var n="<style scoped>@keyframes _show{0%{opacity:0}100%{opacity:1}}img{max-width:100%}";for(var i in s.userAgentStyles)n+="".concat(i,"{").concat(s.userAgentStyles[i],"}");for(i in this.tagStyle)n+="".concat(i,"{").concat(this.tagStyle[i],"}");n+="</style>",e=n+e}return e.includes("rpx")&&(e=e.replace(/[0-9.]+\s*rpx/g,(function(e){return parseFloat(e)*a/750+"px"}))),e}}};t.default=c}}]);