(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-service-service"],{"044b":function(e,t){function n(e){return!!e.constructor&&"function"===typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function r(e){return"function"===typeof e.readFloatLE&&"function"===typeof e.slice&&n(e.slice(0,0))}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&(n(e)||r(e)||!!e._isBuffer)}},"0cf1":function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},"1a69":function(e,t,n){"use strict";n.r(t);var r=n("f46b"),o=n("b077a");for(var i in o)"default"!==i&&function(e){n.d(t,e,function(){return o[e]})}(i);n("3987");var a=n("2877"),s=Object(a["a"])(o["default"],r["a"],r["b"],!1,null,"e8517f30",null);t["default"]=s.exports},"1c03":function(e,t,n){"use strict";e.exports=n("7dbc")},"2b5b":function(e,t,n){"use strict";n("a481"),e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},"2c5c":function(e,t,n){"use strict";var r=n("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n("795b")),i=r(n("1c03"));function a(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"post";return new o.default(function(r,o){(0,i.default)({url:e,method:n,headers:{"Content-Type":"application/json"},data:t}).then(function(e){r(e)}).catch(function(e){o(e)})})}i.default.defaults.baseURL="http://m.xgcyz1978.com",i.default.defaults.timeout=1e4;var s={postRequest:a};t.default=s},3841:function(e,t,n){"use strict";var r=n("288e"),o=r(n("795b"));n("ac6a");var i=n("df13"),a=n("e675"),s=n("0cf1"),u=n("9e7f"),c=n("e5a9"),f=n("2b5b");function l(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){l(e),e.baseURL&&!c(e.url)&&(e.url=f(e.baseURL,e.url)),e.headers=e.headers||{},e.data=a(e.data,e.headers,e.transformRequest),e.headers=i.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),i.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]});var t=e.adapter||u.adapter;return t(e).then(function(t){return l(e),t.data=a(t.data,t.headers,e.transformResponse),t},function(t){return s(t)||(l(e),t&&t.response&&(t.response.data=a(t.response.data,t.response.headers,e.transformResponse))),o.default.reject(t)})}},3987:function(e,t,n){"use strict";var r=n("55ba"),o=n.n(r);o.a},"3e39":function(e,t,n){"use strict";n("ac6a");var r=n("df13");e.exports=function(e,t){t=t||{};var n={};return r.forEach(["url","method","params","data"],function(e){"undefined"!==typeof t[e]&&(n[e]=t[e])}),r.forEach(["headers","auth","proxy"],function(o){r.isObject(t[o])?n[o]=r.deepMerge(e[o],t[o]):"undefined"!==typeof t[o]?n[o]=t[o]:r.isObject(e[o])?n[o]=r.deepMerge(e[o]):"undefined"!==typeof e[o]&&(n[o]=e[o])}),r.forEach(["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","maxContentLength","validateStatus","maxRedirects","httpAgent","httpsAgent","cancelToken","socketPath"],function(r){"undefined"!==typeof t[r]?n[r]=t[r]:"undefined"!==typeof e[r]&&(n[r]=e[r])}),n}},"426c":function(e,t,n){"use strict";(function(e){var r=n("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("34ef"),n("4917"),n("28a5");var o=n("ad18"),i=n("f42a"),a=r(n("2c5c")),s={data:function(){return{Color:"#DE2910",value:"",backColor:"#FFFFFF",val:"",fileList:[],ids:"",urls:""}},components:{Uploader:o.Uploader,Toast:o.Toast},onLoad:function(e){this.ids=e.id},methods:{afterRead:function(t){var n=this;if(this.fileList.length>=5)(0,o.Toast)("最多上传5张照片");else{this.fileList.push(t.content);var r="";r=n.dataURLtoFile(t.content,"detail.png");var i=new FormData;i.append("file",r),a.default.postRequest("/api/uploadFile",i).then(function(e){0==e.data.result&&(n.urls+=e.data.url+"|")}).catch(function(t){e.log(t)})}},dataURLtoFile:function(e,t){var n=e.split(","),r=n[0].match(/:(.*?);/)[1],o=atob(n[1]),i=o.length,a=new Uint8Array(i);while(i--)a[i]=o.charCodeAt(i);return new File([a],t,{type:r})},imgPreview:function(){(0,o.ImagePreview)(this.fileList)},delImg:function(e){this.fileList.splice(e,1)},goOrder:function(){if(""!=this.val){var t=this.urls.substr(0,this.urls.length-1);e.log(t);var n={orderId:this.ids,content:this.val,images:t},r={url:"/api/gzh/addProductService",data:n,success:function(e){0==e.data.result&&((0,o.Toast)("提交成功"),setTimeout(function(){uni.navigateBack({delta:1})},300))}};(0,i.ajax)(r)}else(0,o.Toast)("提交内容不能为空")}}};t.default=s}).call(this,n("5a52")["default"])},4362:function(e,t,n){t.nextTick=function(e){setTimeout(e,0)},t.platform=t.arch=t.execPath=t.title="browser",t.pid=1,t.browser=!0,t.env={},t.argv=[],t.binding=function(e){throw new Error("No such module. (Possibly not yet loaded)")},function(){var e,r="/";t.cwd=function(){return r},t.chdir=function(t){e||(e=n("df7c")),r=e.resolve(t,r)}}(),t.exit=t.kill=t.umask=t.dlopen=t.uptime=t.memoryUsage=t.uvCounters=function(){},t.features={}},"47a0":function(e,t,n){"use strict";n("28a5"),n("ac6a");var r=n("df13"),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,a={};return e?(r.forEach(e.split("\n"),function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(a[t]&&o.indexOf(t)>=0)return;a[t]="set-cookie"===t?(a[t]?a[t]:[]).concat([n]):a[t]?a[t]+", "+n:n}}),a):a}},"4ff8":function(e,t,n){"use strict";var r=n("fc67");e.exports=function(e,t,n){var o=n.config.validateStatus;!o||o(n.status)?e(n):t(r("Request failed with status code "+n.status,n.config,null,n.request,n))}},"55ba":function(e,t,n){var r=n("7fb9");"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var o=n("4f06").default;o("d8a34a68",r,!0,{sourceMap:!1,shadowMode:!1})},5690:function(e,t,n){"use strict";n("7f7f"),n("ac6a");var r=n("df13");e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},"5d81":function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},"61ed":function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},"61f3":function(e,t,n){"use strict";n("386d"),n("a481");var r=n("df13");e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=o(window.location.href),function(t){var n=r.isString(t)?o(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return function(){return!0}}()},7986:function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},"7dbc":function(e,t,n){"use strict";var r=n("288e"),o=r(n("795b"));n("ac6a"),n("5df3");var i=n("df13"),a=n("5d81"),s=n("da86"),u=n("3e39"),c=n("9e7f");function f(e){var t=new s(e),n=a(s.prototype.request,t);return i.extend(n,s.prototype,t),i.extend(n,t),n}var l=f(c);l.Axios=s,l.create=function(e){return f(u(l.defaults,e))},l.Cancel=n("7986"),l.CancelToken=n("d89e"),l.isCancel=n("0cf1"),l.all=function(e){return o.default.all(e)},l.spread=n("61ed"),e.exports=l,e.exports.default=l},"7fb9":function(e,t,n){t=e.exports=n("2350")(!1),t.push([e.i,"uni-page-body[data-v-e8517f30]{width:100%;\n\t/* height: 100%; */background:#f8f8f8}.contain[data-v-e8517f30]{width:100%;height:100%}.list[data-v-e8517f30]{width:100%;padding:%?30?%;-webkit-box-sizing:border-box;box-sizing:border-box;margin-top:%?30?%}.wrapper[data-v-e8517f30]{width:100%;background:#fff;border-radius:4px;padding:%?20?%;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:1px 1px 5px #eee;box-shadow:1px 1px 5px #eee}.content[data-v-e8517f30]{width:100%;height:%?260?%;border:none;font-size:14px;color:#333}.imgs[data-v-e8517f30]{width:100%;overflow:hidden;\n\t/* display: flex;\n\tflex-wrap: wrap; */font-size:14px;color:#333}.picture[data-v-e8517f30]{float:left;width:100%;margin-right:4%;height:%?140?%;border:1px dashed #eee;border-radius:6px;margin-bottom:%?20?%}.first[data-v-e8517f30]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.first>img[data-v-e8517f30]{width:%?70?%}.van-uploader[data-v-e8517f30]{width:21%;height:%?140?%;float:left;margin-right:4%}.del[data-v-e8517f30]{width:%?30?%;height:%?30?%;border-radius:50%;background:#de2910;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;position:absolute;right:%?-15?%;top:%?-15?%}.del>img[data-v-e8517f30]{width:%?30?%;height:%?30?%}.buy[data-v-e8517f30]{width:100%;height:%?90?%;line-height:%?90?%;text-align:center;font-size:15px;color:#fff;background:#de2910;position:fixed;left:0;bottom:0;z-index:999}body.?%PAGE?%[data-v-e8517f30]{background:#f8f8f8}",""])},"87d3":function(e,t,n){"use strict";var r=n("288e"),o=r(n("f499"));n("ac6a"),n("6b54"),n("87b3"),n("a481");var i=n("df13");function a(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var r;if(n)r=n(t);else if(i.isURLSearchParams(t))r=t.toString();else{var s=[];i.forEach(t,function(e,t){null!==e&&"undefined"!==typeof e&&(i.isArray(e)?t+="[]":e=[e],i.forEach(e,function(e){i.isDate(e)?e=e.toISOString():i.isObject(e)&&(e=(0,o.default)(e)),s.push(a(t)+"="+a(e))}))}),r=s.join("&")}if(r){var u=e.indexOf("#");-1!==u&&(e=e.slice(0,u)),e+=(-1===e.indexOf("?")?"?":"&")+r}return e}},"8bb4":function(e,t,n){"use strict";n("7f7f"),e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},"9e7f":function(e,t,n){"use strict";(function(t){var r=n("288e");n("ac6a");var o=r(n("f499"));n("6b54"),n("87b3");var i=n("df13"),a=n("5690"),s={"Content-Type":"application/x-www-form-urlencoded"};function u(e,t){!i.isUndefined(e)&&i.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}function c(){var e;return"undefined"!==typeof t&&"[object process]"===Object.prototype.toString.call(t)?e=n("fdef6"):"undefined"!==typeof XMLHttpRequest&&(e=n("fdef6")),e}var f={adapter:c(),transformRequest:[function(e,t){return a(t,"Accept"),a(t,"Content-Type"),i.isFormData(e)||i.isArrayBuffer(e)||i.isBuffer(e)||i.isStream(e)||i.isFile(e)||i.isBlob(e)?e:i.isArrayBufferView(e)?e.buffer:i.isURLSearchParams(e)?(u(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):i.isObject(e)?(u(t,"application/json;charset=utf-8"),(0,o.default)(e)):e}],transformResponse:[function(e){if("string"===typeof e)try{e=JSON.parse(e)}catch(t){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};i.forEach(["delete","get","head"],function(e){f.headers[e]={}}),i.forEach(["post","put","patch"],function(e){f.headers[e]=i.merge(s)}),e.exports=f}).call(this,n("4362"))},a5a1:function(e,t,n){"use strict";n("ac6a");var r=n("df13");function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=o},a72a:function(e,t,n){"use strict";var r=n("288e"),o=r(n("0a0d"));n("3b2b"),n("4917");var i=n("df13");e.exports=i.isStandardBrowserEnv()?function(){return{write:function(e,t,n,r,o,a){var s=[];s.push(e+"="+encodeURIComponent(t)),i.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),i.isString(r)&&s.push("path="+r),i.isString(o)&&s.push("domain="+o),!0===a&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",(0,o.default)()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},b077a:function(e,t,n){"use strict";n.r(t);var r=n("426c"),o=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,function(){return r[e]})}(i);t["default"]=o.a},b139:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADW0lEQVRYR+2WS2xUVRjH//8zQ41NY1sRCUQDJuJKGcWBxnbumXOXxBBdsNEVbgyCQRI0RDZVCcZHDS5MgIXGDQtCSFyocWFyzj23izGtD+ThookpmHQDxUUrrS29n7kTh7TNcOeRIWy4y3O+x+/77vkexD3+eI/94z5AUxmIo+gQRD4FmsuYAJNQ6k2t9XeNfnFDgDiO+7G0dAVADsDXELmWZVSUWo8keQ3ArFqz5olSqTSTJd8YwNovQO6HyK4gDL9tFFF6763dTfIsgE8CYw43DTDq3E4ROSpkgUC+piiA18aUm3Fek/HO/URgxzKdRQF+o8iRIAx/rJ3fzoD3/iUmyTd1nYiEQRi6VgCqwQDf19NRwI4hY8bSu9sAsXPpQVGAA739/V8VCoV/WnHYSNZa25MnXwfwGYAfAmN2rgDw1s4SmAzC8OksY9baR/JKHZIk2U7yOYgsgvydwJjkciNBEPydpe+dmwDQp41ZtzoDCwKMaWOG7mQgdm5XtRKAh1MZASYoMgXymfRMgOtQak9W+XnnfibwZGBMb0sAcRS9CpHTIvKvIj9GPn+qVCpNpUYqlcpDt+bnDwvwNoAuUWq31vpcvUDaAqhUKusX5ucnCSyIUi9orS/XMx7HcUGWlkYhwge6uzcNDAxMr5ZrC8A79yGBdwXYp405kfWPR609KORxkO8F5fL7HQGIrb0IcsuDPT39xWLxZhbA+Ph4782ZmWmQ57Uxz3cEwDu3SJFLQRg+26jc0vvYuT8APBoYs7ZTAGk/n9DGbGsGwDuXvpF1tVJbrtPWG4iduwDgqVxXV9/g4OBcFkRaEQtzczdI/hoYs70jGRh17pgAR0TkDR2GJ7MA4ih6CyKfCzCsjfmgIwDe+w1Ikj8JzIlSpTuVofd+K5MkFpFcR8uw+rCWNSICH90CRsIwnK02ImsfWwT2gnznrjSiWhq9tS+T/LLadkWmCVwUchOBzf+35rvXimsQtWEEkSKAbW0Mo/qzwDuXltoFbcxgM6XWrox37hcAj9ebhhbAVubzmxvtce06t9b25cmrAM4HxgQrpmEURVqJRAL8BfIMk6SjCwmAHpCvANhI8sVSuVzdllYspdV5LzK8eidsN+JVetk7YYectGym4VressUWFe4D/Ae3stswuiVAlgAAAABJRU5ErkJggg=="},d89e:function(e,t,n){"use strict";var r=n("288e"),o=r(n("795b")),i=n("7986");function a(e){if("function"!==typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new o.default(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new i(e),t(n.reason))})}a.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},a.source=function(){var e,t=new a(function(t){e=t});return{token:t,cancel:e}},e.exports=a},da86:function(e,t,n){"use strict";var r=n("288e");n("a481"),n("ac6a");var o=r(n("795b")),i=n("df13"),a=n("87d3"),s=n("a5a1"),u=n("3841"),c=n("3e39");function f(e){this.defaults=e,this.interceptors={request:new s,response:new s}}f.prototype.request=function(e){"string"===typeof e?(e=arguments[1]||{},e.url=arguments[0]):e=e||{},e=c(this.defaults,e),e.method=e.method?e.method.toLowerCase():"get";var t=[u,void 0],n=o.default.resolve(e);this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});while(t.length)n=n.then(t.shift(),t.shift());return n},f.prototype.getUri=function(e){return e=c(this.defaults,e),a(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},i.forEach(["delete","get","head","options"],function(e){f.prototype[e]=function(t,n){return this.request(i.merge(n||{},{method:e,url:t}))}}),i.forEach(["post","put","patch"],function(e){f.prototype[e]=function(t,n,r){return this.request(i.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=f},df13:function(e,t,n){"use strict";n("a481"),n("6b54"),n("87b3");var r=n("5d81"),o=n("044b"),i=Object.prototype.toString;function a(e){return"[object Array]"===i.call(e)}function s(e){return"[object ArrayBuffer]"===i.call(e)}function u(e){return"undefined"!==typeof FormData&&e instanceof FormData}function c(e){var t;return t="undefined"!==typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer,t}function f(e){return"string"===typeof e}function l(e){return"number"===typeof e}function d(e){return"undefined"===typeof e}function p(e){return null!==e&&"object"===typeof e}function h(e){return"[object Date]"===i.call(e)}function g(e){return"[object File]"===i.call(e)}function m(e){return"[object Blob]"===i.call(e)}function v(e){return"[object Function]"===i.call(e)}function b(e){return p(e)&&v(e.pipe)}function w(e){return"undefined"!==typeof URLSearchParams&&e instanceof URLSearchParams}function x(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function y(){return("undefined"===typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!==typeof window&&"undefined"!==typeof document)}function A(e,t){if(null!==e&&"undefined"!==typeof e)if("object"!==typeof e&&(e=[e]),a(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}function k(){var e={};function t(t,n){"object"===typeof e[n]&&"object"===typeof t?e[n]=k(e[n],t):e[n]=t}for(var n=0,r=arguments.length;n<r;n++)A(arguments[n],t);return e}function C(){var e={};function t(t,n){"object"===typeof e[n]&&"object"===typeof t?e[n]=C(e[n],t):e[n]="object"===typeof t?C({},t):t}for(var n=0,r=arguments.length;n<r;n++)A(arguments[n],t);return e}function E(e,t,n){return A(t,function(t,o){e[o]=n&&"function"===typeof t?r(t,n):t}),e}e.exports={isArray:a,isArrayBuffer:s,isBuffer:o,isFormData:u,isArrayBufferView:c,isString:f,isNumber:l,isObject:p,isUndefined:d,isDate:h,isFile:g,isBlob:m,isFunction:v,isStream:b,isURLSearchParams:w,isStandardBrowserEnv:y,forEach:A,merge:k,deepMerge:C,extend:E,trim:x}},df7c:function(e,t,n){(function(e){function n(e,t){for(var n=0,r=e.length-1;r>=0;r--){var o=e[r];"."===o?e.splice(r,1):".."===o?(e.splice(r,1),n++):n&&(e.splice(r,1),n--)}if(t)for(;n--;n)e.unshift("..");return e}var r=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,o=function(e){return r.exec(e).slice(1)};function i(e,t){if(e.filter)return e.filter(t);for(var n=[],r=0;r<e.length;r++)t(e[r],r,e)&&n.push(e[r]);return n}t.resolve=function(){for(var t="",r=!1,o=arguments.length-1;o>=-1&&!r;o--){var a=o>=0?arguments[o]:e.cwd();if("string"!==typeof a)throw new TypeError("Arguments to path.resolve must be strings");a&&(t=a+"/"+t,r="/"===a.charAt(0))}return t=n(i(t.split("/"),function(e){return!!e}),!r).join("/"),(r?"/":"")+t||"."},t.normalize=function(e){var r=t.isAbsolute(e),o="/"===a(e,-1);return e=n(i(e.split("/"),function(e){return!!e}),!r).join("/"),e||r||(e="."),e&&o&&(e+="/"),(r?"/":"")+e},t.isAbsolute=function(e){return"/"===e.charAt(0)},t.join=function(){var e=Array.prototype.slice.call(arguments,0);return t.normalize(i(e,function(e,t){if("string"!==typeof e)throw new TypeError("Arguments to path.join must be strings");return e}).join("/"))},t.relative=function(e,n){function r(e){for(var t=0;t<e.length;t++)if(""!==e[t])break;for(var n=e.length-1;n>=0;n--)if(""!==e[n])break;return t>n?[]:e.slice(t,n-t+1)}e=t.resolve(e).substr(1),n=t.resolve(n).substr(1);for(var o=r(e.split("/")),i=r(n.split("/")),a=Math.min(o.length,i.length),s=a,u=0;u<a;u++)if(o[u]!==i[u]){s=u;break}var c=[];for(u=s;u<o.length;u++)c.push("..");return c=c.concat(i.slice(s)),c.join("/")},t.sep="/",t.delimiter=":",t.dirname=function(e){var t=o(e),n=t[0],r=t[1];return n||r?(r&&(r=r.substr(0,r.length-1)),n+r):"."},t.basename=function(e,t){var n=o(e)[2];return t&&n.substr(-1*t.length)===t&&(n=n.substr(0,n.length-t.length)),n},t.extname=function(e){return o(e)[3]};var a="b"==="ab".substr(-1)?function(e,t,n){return e.substr(t,n)}:function(e,t,n){return t<0&&(t=e.length+t),e.substr(t,n)}}).call(this,n("4362"))},e5a9:function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},e675:function(e,t,n){"use strict";n("ac6a");var r=n("df13");e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},f40c:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB0klEQVRYR+2WXUtVQRSGn5cuIgujC1HIECQoAkEEOSZYKlHgP+hvdlEGEYr4gVFEgXhRUBEiRkkRRFdLFsyBxda9nTkn2jdn7s7Zs+Z9Zn2OaHmpZX0GAAMPNHrAzK4Cj4Enkg5KEtbMLgAd4LWkv3W2tQDpgHfAHeA7sCTpfQ6EmU0Bz4DrwB4wUwfRBPAQeB4Ej4F5SftNEEl8HbgW9rnd9ll2TQAXgSNgOBh+A+7VQZjZbWCrIv4TGJf0uwjAN5vZIrAKOEx3OYTf6EM80MxuJvGR8P8fYEXSWnEOdA0SxFPgUjjkELgr6VMCdfENYKwi/kCSe6R2ZfUBM5tP+XAlnPQVWEi/Pb5R3N396Dxxt80CSLecBV4CEeIz4OU2HsB+AX7zVzkVkw0QIF5UEjPquPh9SW9zxIs8EHJiGvAyi9Xhn71Ml0vE+wHwUMQ6/z8AZuZ5cF4IsuNf5IEkXk3CL94ugIkQc68AD8W/S8JWy7DVRtRqKzazUeAjcLkyB0qHkefEpCSfIadW0zT09rsZLPoZxx1Ju6UAQ8Ab4BbwA1gsfJB03wS9PUhS6/UxPOehkOTDJ3uZ2Q13PbDT05MsW6nPjUXDqE+tM80HAAMPnAC3hsEh5bjfpgAAAABJRU5ErkJggg=="},f42a:function(e,t,n){"use strict";(function(e){var r=n("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.ajaxs=t.ajax=void 0;var o=r(n("f499")),i=function(t){t=t||{},t.url=t.url||"",t.data=(0,o.default)(t.data||{}),t.method=t.method||"POST",t.header=t.header||{"Content-Type":"application/json"},t.success=t.success||function(){},t.fail=t.fail||function(){},e.log(t.data),uni.request({url:"https://m.xgcyz1978.com"+t.url,data:t.data,method:t.method,header:t.header,dataType:"json",success:function(e){t.success(e)},fail:function(e){t.fail(e),uni.showToast({title:"请稍后重试",icon:"none"})}})};t.ajax=i;var a=function(t){t=t||{},t.url=t.url||"",t.data=(0,o.default)(t.data||{}),t.method=t.method||"POST",t.header=t.header||{"Content-Type":"application/json"},t.success=t.success||function(){},t.fail=t.fail||function(){},e.log(t.data),uni.request({url:"https://m.xgcyz1978.com"+t.url,data:t.data,method:t.method,header:t.header,dataType:"json",success:function(e){t.success(e)},fail:function(e){t.fail(e),uni.showToast({title:"请稍后重试",icon:"none"})}})};t.ajaxs=a}).call(this,n("5a52")["default"])},f46b:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-uni-view",{staticClass:"contain"},[r("v-uni-view",{staticClass:"fixed"},[r("cu-custom",{attrs:{isBack:!0,Color:e.Color,backColor:e.backColor,isIcon:!0,bgColor:"bg-shadeTop text-white"}},[r("template",{attrs:{slot:"backText"},slot:"backText"}),r("template",{attrs:{slot:"content"},slot:"content"},[e._v("申请售后")])],2)],1),r("v-uni-view",{staticClass:"list"},[r("v-uni-view",{staticClass:"wrapper"},[r("v-uni-textarea",{staticClass:"content",attrs:{placeholder:"请输入售后说明"},model:{value:e.val,callback:function(t){e.val=t},expression:"val"}})],1),r("v-uni-view",{staticClass:"wrapper imgs",staticStyle:{"padding-right":"0","margin-top":"40upx"}},[r("van-uploader",{attrs:{multiple:"","max-count":5,"after-read":e.afterRead},model:{value:e.fileList,callback:function(t){e.fileList=t},expression:"fileList"}},[r("v-uni-view",{staticClass:"picture first"},[r("img",{attrs:{src:n("b139"),alt:""}}),r("v-uni-view",{staticStyle:{"font-size":"12px",color:"#c3c0c0"}},[e._v("上传凭证")])],1)],1),e._l(e.fileList,function(t,o){return r("v-uni-view",{key:o,staticClass:"picture",staticStyle:{width:"21%",border:"none",position:"relative"},on:{click:function(t){t=e.$handleEvent(t),e.imgPreview(t)}}},[r("img",{staticStyle:{width:"100%",height:"100%","border-radius":"4px"},attrs:{src:t,alt:""}}),r("v-uni-view",{staticClass:"del",on:{click:function(t){t.stopPropagation(),t=e.$handleEvent(t),e.delImg(o)}}},[r("img",{attrs:{src:n("f40c"),alt:""}})])],1)})],2)],1),r("v-uni-view",{staticClass:"buy",on:{click:function(t){t=e.$handleEvent(t),e.goOrder(t)}}},[e._v("提交申请")])],1)},o=[];n.d(t,"a",function(){return r}),n.d(t,"b",function(){return o})},fc67:function(e,t,n){"use strict";var r=n("8bb4");e.exports=function(e,t,n,o,i){var a=new Error(e);return r(a,t,n,o,i)}},fdef6:function(e,t,n){"use strict";var r=n("288e");n("ac6a");var o=r(n("795b")),i=n("df13"),a=n("4ff8"),s=n("87d3"),u=n("47a0"),c=n("61f3"),f=n("fc67");e.exports=function(e){return new o.default(function(t,r){var o=e.data,l=e.headers;i.isFormData(o)&&delete l["Content-Type"];var d=new XMLHttpRequest;if(e.auth){var p=e.auth.username||"",h=e.auth.password||"";l.Authorization="Basic "+btoa(p+":"+h)}if(d.open(e.method.toUpperCase(),s(e.url,e.params,e.paramsSerializer),!0),d.timeout=e.timeout,d.onreadystatechange=function(){if(d&&4===d.readyState&&(0!==d.status||d.responseURL&&0===d.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in d?u(d.getAllResponseHeaders()):null,o=e.responseType&&"text"!==e.responseType?d.response:d.responseText,i={data:o,status:d.status,statusText:d.statusText,headers:n,config:e,request:d};a(t,r,i),d=null}},d.onabort=function(){d&&(r(f("Request aborted",e,"ECONNABORTED",d)),d=null)},d.onerror=function(){r(f("Network Error",e,null,d)),d=null},d.ontimeout=function(){r(f("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",d)),d=null},i.isStandardBrowserEnv()){var g=n("a72a"),m=(e.withCredentials||c(e.url))&&e.xsrfCookieName?g.read(e.xsrfCookieName):void 0;m&&(l[e.xsrfHeaderName]=m)}if("setRequestHeader"in d&&i.forEach(l,function(e,t){"undefined"===typeof o&&"content-type"===t.toLowerCase()?delete l[t]:d.setRequestHeader(t,e)}),e.withCredentials&&(d.withCredentials=!0),e.responseType)try{d.responseType=e.responseType}catch(v){if("json"!==e.responseType)throw v}"function"===typeof e.onDownloadProgress&&d.addEventListener("progress",e.onDownloadProgress),"function"===typeof e.onUploadProgress&&d.upload&&d.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){d&&(d.abort(),r(e),d=null)}),void 0===o&&(o=null),d.send(o)})}}}]);