(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createPage = createPage;exports.createComponent = createComponent;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var SYNC_API_RE = /requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name);
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {params[_key - 1] = arguments[_key];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return api.apply(void 0, [options].concat(params));
    }
    return handlePromise(new Promise(function (resolve, reject) {
      api.apply(void 0, [Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      Promise.prototype.finally = function (callback) {
        var promise = this.constructor;
        return this.then(
        function (value) {return promise.resolve(callback()).then(function () {return value;});},
        function (reason) {return promise.resolve(callback()).then(function () {
            throw reason;
          });});

      };
    }));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var protocols = {};

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var returnValue = wx[options.name || methodName](arg1, arg2);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  getProvider: getProvider });




var api = /*#__PURE__*/Object.freeze({});



var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {args[_key2 - 1] = arguments[_key2];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var name = 'onLoad';
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {args[_key3] = arguments[_key3];}
      return oldHook.apply(this, args);
    };
  }
  return MPPage(options);
};

var behavior = Behavior({
  created: function created() {
    initTriggerEvent(this);
  } });


Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (options.behaviors || (options.behaviors = [])).unshift(behavior);
  return MPComponent(options);
};

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function triggerLink(mpInstance, vueOptions) {
  mpInstance.triggerEvent('__l', mpInstance.$vm || vueOptions, {
    bubbles: true,
    composed: true });

}

function handleLink(event) {
  if (event.detail.$mp) {// vm
    if (!event.detail.$parent) {
      event.detail.$parent = this.$vm;
      event.detail.$parent.$children.push(event.detail);

      event.detail.$root = this.$vm.$root;
    }
  } else {// vueOptions
    if (!event.detail.parent) {
      event.detail.parent = this.$vm;
    }
  }
}

function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function initHooks(mpOptions, hooks) {
  hooks.forEach(function (hook) {
    mpOptions[hook] = function (args) {
      return this.$vm.__call_hook(hook, args);
    };
  });
}

function getData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function getBehaviors(vueOptions) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = String;
          vueProps['value'] = null;
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    Behavior({
      properties: getProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        Behavior({
          properties: getProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function getProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type, value, file);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts, null, file);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                                  *[
                                                  *    ['data.items', 'data.id', item.data.id],
                                                  *    ['metas', 'id', meta.id]
                                                  *],
                                                  *[
                                                  *    ['data.items', 'data.id', item.data.id],
                                                  *    ['metas', 'id', meta.id]
                                                  *],
                                                  *'test'
                                                  */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var eventOpts = (event.currentTarget || event.target).dataset.eventOpts;
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && eventType === type) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handler = _this.$vm[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          handler.apply(_this.$vm, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName));

        }
      });
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$mp[vm.mpType];
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

var hooks = [
'onHide',
'onError',
'onPageNotFound',
'onUniNViewMessage'];


function initVm(vm) {
  if (this.$vm) {// 百度竟然 onShow 在 onLaunch 之前？
    return;
  }
  {
    if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
      console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
    }
  }

  this.$vm = vm;

  this.$vm.$mp = {
    app: this };

}

function createApp(vm) {
  // 外部初始化时 Vue 还未初始化，放到 createApp 内部初始化 mixin
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        {// 头条的 selectComponent 竟然是异步的
          initRefs(this);
        }
        initMocks(this, mocks);
      }
    },
    created: function created() {// 处理 injections
      this.__init_injections(this);
      this.__init_provide(this);
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      initVm.call(this, vm);

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted');

      this.$vm.__call_hook('onLaunch', args);
    },
    onShow: function onShow(args) {
      initVm.call(this, vm);

      this.$vm.__call_hook('onShow', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};

  initHooks(appOptions, hooks); // 延迟执行，因为 App 的注册在 main.js 之前，可能导致生命周期内 Vue 原型上开发者注册的属性无法访问

  App(appOptions);

  return vm;
}

var hooks$1 = [
'onShow',
'onHide',
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap',
'onBackPress',
'onNavigationBarButtonTap',
'onNavigationBarSearchInputChanged',
'onNavigationBarSearchInputConfirmed',
'onNavigationBarSearchInputClicked'];


function initVm$1(VueComponent) {// 百度的 onLoad 触发在 attached 之前
  if (this.$vm) {
    return;
  }

  this.$vm = new VueComponent({
    mpType: 'page',
    mpInstance: this });


  this.$vm.__call_hook('created');
  this.$vm.$mount();
}

function createPage(vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = _vue.default.extend(vueOptions);
  }
  var pageOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: getData(vueOptions, _vue.default.prototype),
    lifetimes: { // 当页面作为组件时
      attached: function attached() {
        initVm$1.call(this, VueComponent);
      },
      ready: function ready() {
        this.$vm.__call_hook('beforeMount');
        this.$vm._isMounted = true;
        this.$vm.__call_hook('mounted');
        this.$vm.__call_hook('onReady');
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    methods: { // 作为页面时
      onLoad: function onLoad(args) {
        initVm$1.call(this, VueComponent);
        this.$vm.$mp.query = args; // 又要兼容 mpvue
        this.$vm.__call_hook('onLoad', args); // 开发者可能会在 onLoad 时赋值，提前到 mount 之前
      },
      onUnload: function onUnload() {
        this.$vm.__call_hook('onUnload');
      },
      __e: handleEvent,
      __l: handleLink } };



  initHooks(pageOptions.methods, hooks$1);

  return Component(pageOptions);
}

function initVm$2(VueComponent) {
  if (this.$vm) {
    return;
  }

  var options = {
    mpType: 'component',
    mpInstance: this,
    propsData: this.properties };

  // 初始化 vue 实例
  this.$vm = new VueComponent(options);

  // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
  var vueSlots = this.properties.vueSlots;
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    this.$vm.$scopedSlots = this.$vm.$slots = $slots;
  }
  // 性能优先，mount 提前到 attached 中，保证组件首次渲染数据被合并
  // 导致与标准 Vue 的差异，data 和 computed 中不能使用$parent，provide等组件属性
  this.$vm.$mount();
}

function createComponent(vueOptions) {
  vueOptions = vueOptions.default || vueOptions;

  var behaviors = getBehaviors(vueOptions);

  var properties = getProperties(vueOptions.props, false, vueOptions.__file);

  var VueComponent = _vue.default.extend(vueOptions);

  var componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: getData(vueOptions, _vue.default.prototype),
    behaviors: behaviors,
    properties: properties,
    lifetimes: {
      attached: function attached() {
        initVm$2.call(this, VueComponent);
      },
      ready: function ready() {
        initVm$2.call(this, VueComponent); // 目前发现部分情况小程序 attached 不触发
        triggerLink(this); // 处理 parent,children

        // 补充生命周期
        this.$vm.__call_hook('created');
        this.$vm.__call_hook('beforeMount');
        this.$vm._isMounted = true;
        this.$vm.__call_hook('mounted');
        this.$vm.__call_hook('onReady');
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __e: handleEvent,
      __l: handleLink } };



  return Component(componentOptions);
}

var uni = {};

if (typeof Proxy !== 'undefined') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (name === 'upx2px') {
        return upx2px;
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    } });

} else {
  uni.upx2px = upx2px;

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$mp && vm.$mp[vm.mpType]){
        return vm.$mp[vm.mpType].is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          !vm._getFormData && warn(//fixed by xxxxxx uni://form-field 时不告警
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initState(vm);

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$mp[vm.mpType];
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$mp[vm.mpType];
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$mp[vm.mpType];
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
    // 确保当前 vm 所有数据被同步
    var dataKeys = [].concat(
        Object.keys(vm._data || {}),
        Object.keys(vm._computedWatchers || {}));

    var ret = dataKeys.reduce(function(ret, key) {
        ret[key] = vm[key];
        return ret
    }, Object.create(null));
    //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
    Object.assign(ret, vm.$mp.data || {});
    if (
        Array.isArray(vm.$options.behaviors) &&
        vm.$options.behaviors.indexOf('uni://form-field') !== -1
    ) { //form-field
        ret['name'] = vm.name;
        ret['value'] = vm.value;
    }
    return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
    var this$1 = this;

    if (vnode === null) { //destroy
        return
    }
    if (this.mpType === 'page' || this.mpType === 'component') {
        var mpInstance = this.$mp[this.mpType];
        var data = cloneWithData(this);
        data.__webviewId__ = mpInstance.data.__webviewId__;
        var mpData = Object.create(null);
        Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
            mpData[key] = mpInstance.data[key];
        });
        var diffData = diff(data, mpData);
        if (Object.keys(diffData).length) {
            if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
                console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
                    ']差量更新',
                    JSON.stringify(diffData));
            }
            this.__next_tick_pending = true;
            mpInstance.setData(diffData, function () {
                this$1.__next_tick_pending = false;
                flushCallbacks$1(this$1);
            });
        } else {
            flushCallbacks$1(this);
        }
    }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
    var parts = path.split('.');
    var key = parts[0];
    if (key.indexOf('__$n') === 0) { //number index
        key = parseInt(key.replace('__$n', ''));
    }
    if (parts.length === 1) {
        return obj[key]
    }
    return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

    var oldEmit = Vue.prototype.$emit;

    Vue.prototype.$emit = function(event) {
        if (this.$mp && event) {
            this.$mp[this.mpType]['triggerEvent'](event, {
                __args__: toArray(arguments, 1)
            });
        }
        return oldEmit.apply(this, arguments)
    };
    
    Vue.prototype.$nextTick = function (fn) {
      return nextTick$1(this, fn)
    };

    MP_METHODS.forEach(function (method) {
        Vue.prototype[method] = function(args) {
            if (this.$mp) {
                return this.$mp[this.mpType][method](args)
            }
        };
    });

    Vue.prototype.__init_provide = initProvide;

    Vue.prototype.__init_injections = initInjections;

    Vue.prototype.__call_hook = function(hook, args) {
        var vm = this;
        // #7573 disable dep collection when invoking lifecycle hooks
        pushTarget();
        var handlers = vm.$options[hook];
        var info = hook + " hook";
        var ret;
        if (handlers) {
            for (var i = 0, j = handlers.length; i < j; i++) {
                ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
            }
        }
        if (vm._hasHookEvent) {
            vm.$emit('hook:' + hook);
        }
        popTarget();
        return ret
    };

    Vue.prototype.__set_model = function(target, key, value, modifiers) {
        if (Array.isArray(modifiers)) {
            if (modifiers.indexOf('trim') !== -1) {
                value = value.trim();
            }
            if (modifiers.indexOf('number') !== -1) {
                value = this._n(value);
            }
        }
        target[key] = value;
    };

    Vue.prototype.__set_sync = function(target, key, value) {
        target[key] = value;
    };

    Vue.prototype.__get_orig = function(item) {
        if (isPlainObject(item)) {
            return item['$orig'] || item
        }
        return item
    };

    Vue.prototype.__get_value = function(dataPath, target) {
        return getTarget(target || this, dataPath)
    };


    Vue.prototype.__get_class = function(dynamicClass, staticClass) {
        return renderClass(staticClass, dynamicClass)
    };

    Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
        if (!dynamicStyle && !staticStyle) {
            return ''
        }
        var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
        var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
        return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
    };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vuex/dist/vuex.esm.js":
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\common\\toast.js":
/*!*********************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/common/toast.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var Toast = {
  showToast: function showToast(content) {var icon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';var callback = arguments.length > 2 ? arguments[2] : undefined;
    uni.showToast({
      title: content,
      icon: icon,
      duration: 2000,
      mask: true,
      success: callback });

  },
  hideToast: function hideToast() {
    uni.hideToast();
  },
  showLoading: function showLoading(content, callback) {
    uni.showLoading({
      title: content,
      mask: true,
      success: callback });

  },
  hideLoading: function hideLoading() {
    uni.hideLoading();
  } };var _default =


Toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\main.js":
/*!*************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/main.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createApp) {__webpack_require__(/*! uni-pages */ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\pages.json");
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\App.vue"));
var _store = _interopRequireDefault(__webpack_require__(/*! ./store */ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\store\\index.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
_vue.default.prototype.$store = _store.default;

_vue.default.config.productionTip = false;var cuCustom = function cuCustom() {return __webpack_require__.e(/*! import() | colorui/components/cu-custom */ "colorui/components/cu-custom").then(__webpack_require__.bind(null, /*! ./colorui/components/cu-custom.vue */ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\colorui\\components\\cu-custom.vue"));};


_vue.default.component('cu-custom', cuCustom);

_App.default.mpType = 'app';

var app = new _vue.default(_objectSpread({},
_App.default));

createApp(app).$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createApp"]))

/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\main.js?{\"page\":\"pages%2Findex%2Findex\"}":
/*!**********************************************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/main.js?{"page":"pages%2Findex%2Findex"} ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/index/index.vue */ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\pages\\index\\index.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\main.js?{\"page\":\"pages%2Flogin%2Flogin\"}":
/*!**********************************************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/main.js?{"page":"pages%2Flogin%2Flogin"} ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _login = _interopRequireDefault(__webpack_require__(/*! ./pages/login/login.vue */ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\pages\\login\\login.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_login.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\main.js?{\"page\":\"pages%2Flook%2Flook\"}":
/*!********************************************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/main.js?{"page":"pages%2Flook%2Flook"} ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _look = _interopRequireDefault(__webpack_require__(/*! ./pages/look/look.vue */ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\pages\\look\\look.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_look.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\main.js?{\"page\":\"pages%2Fmessage%2Fmessage\"}":
/*!**************************************************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/main.js?{"page":"pages%2Fmessage%2Fmessage"} ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _message = _interopRequireDefault(__webpack_require__(/*! ./pages/message/message.vue */ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\pages\\message\\message.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_message.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\main.js?{\"page\":\"pages%2Fmodify%2Fmodify\"}":
/*!************************************************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/main.js?{"page":"pages%2Fmodify%2Fmodify"} ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _modify = _interopRequireDefault(__webpack_require__(/*! ./pages/modify/modify.vue */ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\pages\\modify\\modify.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_modify.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\main.js?{\"page\":\"pages%2Fproduct%2Fproduct\"}":
/*!**************************************************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/main.js?{"page":"pages%2Fproduct%2Fproduct"} ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _product = _interopRequireDefault(__webpack_require__(/*! ./pages/product/product.vue */ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\pages\\product\\product.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_product.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\main.js?{\"page\":\"pages%2Freport%2Freport\"}":
/*!************************************************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/main.js?{"page":"pages%2Freport%2Freport"} ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _report = _interopRequireDefault(__webpack_require__(/*! ./pages/report/report.vue */ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\pages\\report\\report.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_report.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\main.js?{\"page\":\"pages%2Fset%2Fset\"}":
/*!******************************************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/main.js?{"page":"pages%2Fset%2Fset"} ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _set = _interopRequireDefault(__webpack_require__(/*! ./pages/set/set.vue */ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\pages\\set\\set.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_set.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\main.js?{\"page\":\"pages%2Fuser%2Fuser\"}":
/*!********************************************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/main.js?{"page":"pages%2Fuser%2Fuser"} ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _user = _interopRequireDefault(__webpack_require__(/*! ./pages/user/user.vue */ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\pages\\user\\user.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_user.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\pages.json":
/*!****************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/pages.json ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\request\\request.js":
/*!************************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/request/request.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.ajax = void 0;var ajax = function ajax(opt) {
  opt = opt || {};
  opt.url = opt.url || '';
  opt.data = opt.data || {};
  opt.method = opt.method || 'POST';
  opt.header = opt.header || {
    "Content-Type": "application/x-www-form-urlencoded" };

  opt.success = opt.success || function () {};
  opt.fail = opt.fail || function () {};
  console.log(opt.data);
  uni.request({
    url: 'http://39.100.103.8:8080' + opt.url,
    data: opt.data,
    method: opt.method,
    header: opt.header,
    dataType: "json",
    success: function success(res) {
      opt.success(res);
    },
    fail: function fail(res) {
      opt.fail(res);
      uni.showToast({
        title: '请稍后重试',
        icon: 'none' });

    } });

};exports.ajax = ajax;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\static\\images\\bg.png":
/*!**************************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/static/images/bg.png ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/bg.b878fe55.png";

/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\static\\images\\chanpinguanli.png":
/*!*************************************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/static/images/chanpinguanli.png ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWYAAACZCAYAAAAclZBuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkExQ0MzRTMzMUQ0MjExRUE5QjkxQzhGMDBBRjk2MkZFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkExQ0MzRTM0MUQ0MjExRUE5QjkxQzhGMDBBRjk2MkZFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTFDQzNFMzExRDQyMTFFQTlCOTFDOEYwMEFGOTYyRkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTFDQzNFMzIxRDQyMTFFQTlCOTFDOEYwMEFGOTYyRkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6/4HKSAAAUC0lEQVR42uzd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"

/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\static\\images\\cheliangjilu.png":
/*!************************************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/static/images/cheliangjilu.png ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWcAAACZCAYAAADzV/tQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk5QTNCNEJDMUQ0MjExRUE4ODlBOTI2QjdBRTBCRERBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk5QTNCNEJEMUQ0MjExRUE4ODlBOTI2QjdBRTBCRERBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTlBM0I0QkExRDQyMTFFQTg4OUE5MjZCN0FFMEJEREEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTlBM0I0QkIxRDQyMTFFQTg4OUE5MjZCN0FFMEJEREEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5hO7HjAAAYAElEQVR42uyd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"

/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\static\\images\\jiantou.png":
/*!*******************************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/static/images/jiantou.png ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAUCAYAAABbLMdoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRBQ0E1MUVBMUQ0MjExRUFBMjMwRDEzNzhCNjM4NDdDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRBQ0E1MUVCMUQ0MjExRUFBMjMwRDEzNzhCNjM4NDdDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REFDQTUxRTgxRDQyMTFFQUEyMzBEMTM3OEI2Mzg0N0MiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REFDQTUxRTkxRDQyMTFFQUEyMzBEMTM3OEI2Mzg0N0MiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6H/nC2AAAArUlEQVR42mKcOXOmFgMDAysQX2QgAJiAeCcQnwZiP2IUt0JNXkNIA0jxDCDOIkYDE5SeTowGJiQ2QQ1MaHy8Gpiw2AbSkAzEzOgamHD4ZR4Qx6FrYMITUkvRNKgzEYgHPqiBf4D4Fz7FmUA8DYi/A7EPEN9nIlLhPlxuxqoQm+J0XArRFUfjU4isGKRwERD/xKUQpjiSGIUwxTXEKAQBFiAOA+J/QHydUE4BCDAAMqUv1AeHAjgAAAAASUVORK5CYII="

/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\static\\images\\logo.png":
/*!****************************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/static/images/logo.png ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO8AAADvCAYAAAAacIO5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVDNTBBMDE4MUQ0MTExRUFBNzRDOThEODQ3NDYyQTcyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVDNTBBMDE5MUQ0MTExRUFBNzRDOThEODQ3NDYyQTcyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUM1MEEwMTYxRDQxMTFFQUE3NEM5OEQ4NDc0NjJBNzIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUM1MEEwMTcxRDQxMTFFQUE3NEM5OEQ4NDc0NjJBNzIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5Tt6MhAAAqJUlEQVR42uyd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"

/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\static\\images\\search.png":
/*!******************************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/static/images/search.png ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC+ElEQVRYR8XXW6hUdRTH8c9Jy9DC1CylsIuSaGaEL2JSEWZo9dJFNCjBy4spPVgGSjejMipDyQuGoQ+CUPQglqTkU2EkQlJWCqWWIWQXKrLwFMY6rAP7nDMze49zOP5fhpn5r7W+e/3/67fWbnOeV9t5jq8qwNV4CPdhFOL7X/gRX+AdfIAzzT5QGcCNeBYPUgr7M17FmzhdFaQRwEJsxAUFZ4fziY/iUozGrRhY2PMd7kJ8lq56ACvxdFqfxRa8iG9reLwQM7AG1+b/vyXEgTKCWgDTsCcNf8f92FvmCAOwCY/m3pO4Gaca2XYHGIKvcWUa3oGvKgQvbnkNS/OHXZjZDMArWIY/MDlhmozfsX0z5qXhTfiynpNiBi7HD7gYK/DSuUROm0E4jmHYjjlVAII4yP/EFfinBYAwXZ4XN0oyjramRhQz8C4ewHv52WJ81xVK8W7sruWwCHAI47EY61qNnvahF1Gaj2NtGcAvGIp78X4vAXyI6Xg5j6SH22IG/s4LOAX7egkgBGxuyvOSsgwcwzW9nIEd2cCex3NlAJ8gnv4xrO+lDHyeajgfb5cBrMJT2JnUrTIMRvSEOOYxdfpIlxYbTx9ZiHq9CtFeW1nRE7YiqmtCFSEK0m9wA1YX9PxcIMJXyG9pWXdvRp3U/2YvKG2ndeieyOHkp7zYdVW1O0B/fIZbcAJTU9ObycICvJUGG7CokXGteWAkDmJ4tuR7sL8CQUxOMb49U9gbw8wj2FblDhT3jEWoWOjCfynNr+P7Go764Xa8gYmZsYezo8Ys0BCi0UwYGYhWemchaNzoGFBCtC7B9akdMR9GoJiInsyOelFOVrflf7MQDa/LKpuKY3NIaejDuDppbM9shY5EGRdXDKsf5YWOTM7uDlEFoNNhNKpJ+U4wAr/mkXyaglPvmCNTARbHExAxY4ZEd6xmACrcw7pbAv7jzGKUeMwdHRB9BRCx4k5Ficd8EFPSZWjvS4CAiNe6eL84ghf6OgM1z6evM9AD4n8UO5AhnhAvagAAAABJRU5ErkJggg=="

/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\static\\images\\shoujihao.png":
/*!*********************************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/static/images/shoujihao.png ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAwMDRDQzIxMUQ0MjExRUE4QkUxQUM0NTg3ODhBREI3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAwMDRDQzIyMUQ0MjExRUE4QkUxQUM0NTg3ODhBREI3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDAwNENDMUYxRDQyMTFFQThCRTFBQzQ1ODc4OEFEQjciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDAwNENDMjAxRDQyMTFFQThCRTFBQzQ1ODc4OEFEQjciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Y28XKAAABk0lEQVR42uyYsUvDQBTGkxoQW9FJBKeKo1CHbkr2KI4qgptDwP9AcBb8DxQnBwdBx6LFNThJF8FFqN2K4iCCUoRq/A6+Sih35ggXzHAf/LhcQt77uJeDe3HjOHaKIi858X1/cDkLdsEqmDGYrwsa4AB0xI0oin4fliQvBOAOhIaNOIwXMn7w58pAc+ACVMAXOAM3oGfAyBhYAptgnHkWQFtlZi9hRJSoaXhlDsEpS1Vhvm1VmVY4nudgZKAm4yfzSc1Mc2zlvHFaQ/mUH7BQP2cz0vglp0CyZqwZa8aasWasGWtG90CuMLsMpgzkegFX4DurmZBHRVPaAUdZy/Ro8KDVZ7zMZboGE2DUgJnPtC7D0wjSSwnigknwBuL/3E1l8ABeOZbzMONpvi9KWOV1lfPMu3j45jPbh7pm0CewCObBPec6qifyKVfmkuO6rBdW6BaccNRRwPjJfNKV2QcbbD0bOfbaI+CD+ZRmRBO+xvZTNOdbxLTeuTrttA9Y9MI1cMz/KSbVZdyarJd3i/Tn6keAAQC70E/wI9UoYAAAAABJRU5ErkJggg=="

/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\static\\images\\tongxunlu.png":
/*!*********************************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/static/images/tongxunlu.png ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAIAAAC3ytZVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjgxRjQ3NzkzMUQ0MjExRUE5RTJFOEIwNTRBQjUwNDY4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjgxRjQ3Nzk0MUQ0MjExRUE5RTJFOEIwNTRBQjUwNDY4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODFGNDc3OTExRDQyMTFFQTlFMkU4QjA1NEFCNTA0NjgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODFGNDc3OTIxRDQyMTFFQTlFMkU4QjA1NEFCNTA0NjgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6YpB8cAAAEvUlEQVR42uzaf2gbVRwA8Lvru8slTbulWWc1rc5uc47O1qn7x82BCjp/ggNFQQUR/WMoigxFxCHMIfQfQf/YP8qUFYTJ9A9BmM6x1U2dU+bqStO5tbWuadotyZrkcvfu1/Otydq0tmUz9+4u9PsllBwp79597vu+771L+NauUQ7iSghAABzAARzAARzAARzAARzAARzAARzAARzAARzAARwQwAEcwHG1gVw4xwMt8ra22lsjSBR4xxvPG+RYEneezA3lrCrIjqdXhXZvXnpbVGRhQSMs8g+2yF9vibbWI79zhBD/9h11LiRgvSRsvz3sd472qEjvnlOtjar2Ap/ec33A7xxB5JjFF4P4+aP53f0amT8TfVFKaS9WLUEr6tF/+7OuQXTE4kDC2HMO0zf7h3EY8c+tDDC6f5Vy1PDc1tYg5Zjz05ZwTeVd/DVlfhhXSweE6xrQtsTERplJXlfa6MamwHwWjkTfhLXrT5WUjRDD5k5cNH26DKMzKDuLYcV+r0fFZeuJIsuEQXzKUSfx7DhOpMxs8cqn/0yOcGbnrJSDIQbHPdEiPRIrZd/keCmB3BASfMrBdkPFc6+skR9vFsnMO9AeQYuRoxg3hYXyytERQXUiv3g5/lamF6N0yDzWLC3eDb5pc91jxlRy0KqxuUlcvBz7h/UMnq6iL62WEcvq7WuO/qy1dxBPTSsbliGmqeEXjiHFPl+YvVs9k7V2nFJNu7QipeVze1uQZ9wT5LnFQN5+t0ejK8+31gbWRy7vcSzCfTuif3oWY7s0RuiMu6M9tCzA/OZ5zJHUyM5erWARmgM7T2tbm8WcQY6nzAuaXb5PeW2tvL7Bja56yUG3HpRgagNCk2LfsE4VSNm0yvPcq2vkh2OSO13yjEO1yPu9mGbH9NVzMxaf9EASuDfbgpuWi671yhsOeqmdcX1Ascnk+9KLzPiHWEh4Z13w5rCrxd4bDjourjz4nJ0RxeNHY+KLKwOBGt7ljnkz0dKl1K52ubV2jrNviKKP7wptu0V238LL2hGV+A865CPj5u9pa0InQcStDgubGlEs5OVSyMuZhebI/dch+vLRIwUOwjUOQty7Et0mfufIYNs1kN606XcOxSTxjOmCBUX/qCdfBbXj5zF8Om0wTZI0tl8/eql7FHs/s2gmWfiBDIX4ZUw/edFYKgno2vGXB4U7G+fYsPwwgj+PK5c3PjrpyxiWQ9yVcvw1YV7NN0/YImPq//k5yohiJRT7oRvlWZTJgnUsqftuZjmcwFmd4UjQLa7zj9zLRzIF042iXGl25A2yJ67c3SStqEPipO2SwBw/86HJnNPta2qZXj5NgZ+SekqzE4r17MH0J/dGGhg/AXJgRUjv28HztIyVKtkbHeFZ2w06Ur48p/6Tr+i3W6dSxlPfpT+7L9JcW8OOg/nMQtOn60yhQotiDGbNJw+k4pfMauVIa/be/sK4ajvVIG3qme/Tx8d1/w6W+WK0YO07qzpeArO6/cKhzMYmqZo4BrPWVwOqzmb5RYvRoRFcNRx9GfObIdVycf/mX47fLhg/JnAVUrDh6E5grmoDHv8AB3AAB3AAB3AAB3AAB3AAB3AAB3AAB3AAB3AABwRwAMdC8a8AAwAXZ8uTQnInBAAAAABJRU5ErkJggg=="

/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\static\\images\\tongzhi.png":
/*!*******************************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/static/images/tongzhi.png ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU4MDAzMTkyMUQ0MjExRUE4MzFCRjk1NzE1RTMyMTM0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU4MDAzMTkzMUQ0MjExRUE4MzFCRjk1NzE1RTMyMTM0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTgwMDMxOTAxRDQyMTFFQTgzMUJGOTU3MTVFMzIxMzQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTgwMDMxOTExRDQyMTFFQTgzMUJGOTU3MTVFMzIxMzQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6Ktj7QAAAH9klEQVR42txc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"

/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\static\\images\\xiaoxi.png":
/*!******************************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/static/images/xiaoxi.png ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNFQURFMTNGMUQ0MjExRUFBNTczQTc3RDI4RkJDMEIwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjNFQURFMTQwMUQ0MjExRUFBNTczQTc3RDI4RkJDMEIwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M0VBREUxM0QxRDQyMTFFQUE1NzNBNzdEMjhGQkMwQjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M0VBREUxM0UxRDQyMTFFQUE1NzNBNzdEMjhGQkMwQjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz41SXQpAAAEXUlEQVR42tSZaUhVQRTHn5WmZZuWbUaYRVHZvi+0EJUlrdiC0B5BICVUX+pDXyKKFqRAhJCIaF9sX4hs/VC0L1aGVpDlo9JK26x8/Q+dK8Np7r3vvsWXB37izL0z93/nnZlzZm6Yx+Nx1SarR39iYmIC0VdzkAjiQSOu+wDc4Bn45O8DSktL/wr20aLABDANDAXtbe4vAhfASXAW/PTloWHkEg5HuDXIAItBUx9flkY9C2SCj05GuI6Dh9QHa8BzsNIPsWQtwVrwEiwHdQM9wl3BXtDD5PoXcA08BIVc/gZagHagFxim+La0m2AWeBEIH04GB0FDUU/Ly1GQA8574ZPhYDRYAqbQYCnXBoDbYDrIs+rEziXSeJJIscdBF37AKS8nEN1zjidpd26nWjOejJN8FZwCdop7ysBMMBkU+OHD+dw/DUiFUh/Bv+Yop4K7sM+qLkOTbRA4EMA4sIfd4bUQfRgkeCuYGhwC0UodTaThfo6qmT0Bg0GxcI99utVDJ3gV6CbcYAyvncEyGuFxvLqoEzHdTjAFhdWibi6vl8G2x2CpqFsr13speAWIVMrkrydqMLfZxUukYU3AMrPAQblBCWjM136DTnaLeRAsCdxX1mk3B5+fMjRPVsSS7Q+BWBdHy1MijI/XuUSKaLgzhGnvDk1M+EfwGOX/z+BiCAWTH3/XaTMEt+KhN+wa+7DORnCEamFyndbxqUyEyT1x3McIk+uUON1Qyh14AlYL7iwaPDLpaCO4BHbzgp+o2cFcAUeYKyJaurhNPvdxifvU2T1R7qwKjhMXdZMtkhN3w2LBInHPSDBQKQ/kOtUWcVvDMsRSalixJoeuFhwtLlZoOqjSZGWVmozMZVOna1OlafdOlGOtkh9dfSVHQY+yR8sS95AL5CrlXK5TLUv5BT3cZ6WjXbOI4boRN2wrOAbagFtiJhsCKN/tw+U7ygsaVsI7mP7gDSdWOpOTulwV7NZMDKvdb5HFdQ/vHqyMXvSqzT1tNQlS9U8v08ae/8GZSV9RLlQFvxWjPIR3yaGyKCH4FXgvJ1eeaJAcQsHJrEGdzP+sBrmi0YIQCl4oysfM0ku3ODtIsoh6wTLaUT9Q0ssynoDfZHpJ8Ttbs4zVtG0WZxbZrE0bILaoFzlLml+DYulZY0XEzbSKaLRarBN122tomaPjrG2ibj0HGssQvEn4bQM+kUkIotiOvMtQT5jushbbnOEHSBXhuhVvSOsEaWQvc7hXXSFNl2OYCXgKZoBfSl0/0DsIPntdiK3iAXvi9GzttCa5bhcgofTidBqfwy6nip3DLmiZrZnZuwCOJgmbCOa5/n5qkEYuONvuHMTpN47RLu9P3iM5CCVwAKLdR7jF+Voqn/64/BFcIsrpAfZhSjM38PL1w0kCb2ZnODQ2C7DQcvbfDbz2e212gunbGp2y0/Grvx/z3JwRnuBE66svnXjjw3l8LkBhOl7EebuX/cJCC5yOpJmF1bZPt38EGAA8ngOoTyvMKAAAAABJRU5ErkJggg=="

/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\static\\images\\xitongshezhi.png":
/*!************************************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/static/images/xitongshezhi.png ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAIAAAC3ytZVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhCNENERTQ5MUQ0MjExRUE5Njk3OTVENjI3Q0MzNDY1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhCNENERTRBMUQ0MjExRUE5Njk3OTVENjI3Q0MzNDY1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEI0Q0RFNDcxRDQyMTFFQTk2OTc5NUQ2MjdDQzM0NjUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEI0Q0RFNDgxRDQyMTFFQTk2OTc5NUQ2MjdDQzM0NjUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz42AMjbAAAF/ElEQVR42uyc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"

/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\static\\images\\xitongtongzhi.png":
/*!*************************************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/static/images/xitongtongzhi.png ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAIAAAC3ytZVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZCMTBGRkZDMUQ0MjExRUE5RUUxQkQ3NzBFQTRDMERDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZCMTBGRkZEMUQ0MjExRUE5RUUxQkQ3NzBFQTRDMERDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkIxMEZGRkExRDQyMTFFQTlFRTFCRDc3MEVBNEMwREMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkIxMEZGRkIxRDQyMTFFQTlFRTFCRDc3MEVBNEMwREMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5976xaAAAEDUlEQVR42uyaS08TURTH586jQwt9SElQoDbhYSECstKgqAtNEKMRH4mPhTERVxKi7oxfwvghdMtacIcL3WqoCJoQFroA5NFCH9Ne/6QBH7HTB3OnnXpuZjGd3vPv7e+eOffcB7t7b1misltkQkA4CAfhIByEg3AQDsJBOAgH4SAchINwEA7CQTgIB+GgIqmVb4Eq6TrDTTLJDeO/xNHYKJ84rvf0qKGQ2njgl4eu/sguLRnRqPHufXJ1NWt/w5jNGwsd7eroqKevV2PMrBrn0oeP6cnJrS9fjdr0jvp6dud2/dApvaheYlJ/n9bf5595m3z5Kh6P85rCEQopjyZ8TU0lR27g645oz19sLC1lamRk6exQnz31l8EiV2AIc4jUAo7WFuXJY5/bzfYjAnOIQMrZOFwuNv7Qi6hhSeiBFAQdjGP0irvFui6FFASdigPv/IVhi1sPwbJjUIVxjAy7FatfdgiODLudh0PTpMFBXYQyZCHuMByRI5olEfSfMRXiTsMR0cS5tDhxITiQYre2CswRIM6Yo7zj93mqg8RF6ep1AvMlceLCcIhMH8WJ0+Ig4SAcFcYhi+TsvKzU6xUYSr1eWVGcg8Pvl1VVIA7kYE1BxTE42tqEL1sdDjsHR0e78HXNrk5NRJ4ui/Dk3qOFY51hSGtr2VSK8909A9zgIx4Wsxd3rF9zhncgcHR1FWjr+kZWVaVAQHa52F4n4wYf8RBfoYK5QnOzEg6rDsBxclA3cWP0PC6/r8DvokKupkk5e0avdhyqIp0/V2fCAqTU4joV1VDZhMjpId3nk6sax9CQHgzK+XHwkvIFVIZJ/mSMXb7krl4cHg+7dtVjEi/qSp+Yw8QkjsATQ5YO6lbiuHWzHnHUBFbZlE2mAg/GGizMUC3DgZHPJLYlk1wrN0+FIczzfYvx5cZ1T3XhwAA5dr/BpEIisa8TCebmF0fcPd1aFeHw+Zh5kN/nBLeguVUr1dZkMisr2fGJ1dw2/cYGz+7Evj/6c2DAJTPG/35cTJIryWwnYZ37nM4XIzJG4bTNVhxobizGceV1H6+8HweBPpJ38wpVhKNgg5gsNTSUP+Xa2uLcluNQNh2GSiZ4sLF891hetukUoU1rpd++ZypoXnU4Fhcz6XSZtjCEeU3hSKV4NFomDxjCvKZwoGCkXF8v+V/BBIa2NdI+HJmMNDOTKCk93d7mMMlkpBrEgbIZ41PTiSJ9BNWm3yQ2Y9zOFtp9RD8e56+ntiMRDbOMfLtHiJ3RT+m5ubSdflEZHLm3ZnY2vbBghMPKoYNKICDn1kHwHiH1xJiKccS22Fl5HHtjzfy8gUuqpkJb1oSDcBAOwkE4CAfhIByEg3AQDsJBOAgH4SAchINwEA4qkvRTgAEAbv80NeNu/iEAAAAASUVORK5CYII="

/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\static\\images\\yanzhengma.png":
/*!**********************************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/static/images/yanzhengma.png ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjEwNkY0RjM4MUQ0MjExRUFBRUEyQ0U1NDgxNUI3NTEyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjEwNkY0RjM5MUQ0MjExRUFBRUEyQ0U1NDgxNUI3NTEyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTA2RjRGMzYxRDQyMTFFQUFFQTJDRTU0ODE1Qjc1MTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTA2RjRGMzcxRDQyMTFFQUFFQTJDRTU0ODE1Qjc1MTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5LtIaJAAADRklEQVR42uyYfWhNYRzH7x2NVviDlZf9IVtqzLw1L+XO5N1IQhIJk5im5cpLJBTLexOxYkjjKmRCeUnu7rD9QXmbP7xmhSGbP9jadK/vr76rp9s5557nnDvdP/arT895nvOcc7/neX7P7/c81xuJRDyJZEmeBLOEE9TVqNHn89l51gsWgbVgLOtPQBk4D8KxXhAKheI2QrPAU3AR5IJuIBmMB2fBSzCPIjt0ymTo5LNughFsqwUFYDkIsi0TXOW9KR0haCS4BarABLa9AHPBOFAOzoE8MJ1TJ5YD7oL77OdaUDoIcHpmsu0dWMoRum7wzB0KWQBes20SeAyugSFOBa0CdXRcsa90YJmOihhOK8HtCsgGK0A922VEn4HVuoJyuVrEURvBZjAInARtGi7xl06eAYrBN67sMk6vbUE7eO8jyAL7QbOL8NIKSjlib9m2XUdQDksR8jmOca8BHOL1GB1BPVm6FZNMf/vAaRP7wrKH7UhNh01iwHNqKaBSiUOZnK5U1pt1Rugny94OxfRi3GoXcwzc4HUflk06ghpYphmMaCXjT6qFGIlFE1nfB4oYClRB9TqC3rMcHNUuIzaHSPTtG3VfRFYrDisraUtUn09KyrEtqI5ltsHIFfE6iz+epoxmkO1ifrDH4N1H+aHFOoJqlRGKnprjTKZhppYaMBk8oOOKFYLDFj72xizSmwmqVuZ8msF9SaZLGLUHgHsUF2aeO2HyXulbogi3Leg7k6HYQpM+ASbQFtbbmPcqLEbmAH1qt5PkGmCZD/qb9JHVNoP7I3H0yxbvk9U1n9c1TgTJNvQ3l7rfop848mxwO0Zs8jNyt3LvpC2oiVlZbB2zvVPLUFbVKfDD6QathNsPSSGnHe7B5dlLoDv4BXa62THKl2zkdR4F6lgXcAaMYn0NF4yrPXW54uCbwFaN5CqnksWslyrvcb3JL1BWxl5OX4pF/2HgkRIyLoAN8Tx1/OHyrmJ9JXhucPbqxwgth4LhSuxZZufgaLUfMjJxyKngIPNZOs9er8BDJt58Oq+H++dCbvbdHaVj7I3X80eO8Lw2lLRbC8PFLq7Q//JngwTD0RyRoBK3toGBjDmNTl7s7fx/qFOQS/snwAAVubH7SoNpGAAAAABJRU5ErkJggg=="

/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\static\\images\\zizhongchaxun.png":
/*!*************************************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/static/images/zizhongchaxun.png ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAIAAAC3ytZVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVCQzJCRTM5MUQ0MjExRUE4RjRDOUFCNEJFRDdGMzg4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVCQzJCRTNBMUQ0MjExRUE4RjRDOUFCNEJFRDdGMzg4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUJDMkJFMzcxRDQyMTFFQThGNEM5QUI0QkVEN0YzODgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUJDMkJFMzgxRDQyMTFFQThGNEM5QUI0QkVEN0YzODgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz77TgWXAAAFiElEQVR42uyca0xcRRTH/wPLUmi3gNBCVwjYmiAbMFhtiDYSoUoNbW2sH9Son3x8MMaaaIytVtPExFb9YPSLMbEffTQRmgaaVEtjCcZHIWJ4tGBtebW0UN6028KW8QzL7nIvl8de9i5se05uNsvszDnn/mbmzJw7N4inv5gAi0+iGAHjYByMg3EwDsbBOBgH42AcjINxMA7GwTgYB+NgHIyDhXEwDsaxULGFHrDAfU6kJSA+1rjChMSIG//14NLArEqcSdiwFo44pc1Qrt/E5SGcvaS0LVMc5HnJ/Xi2QCTGL6h+21V8/7s8fV5TuGk9nn9YZKUsSMPgdfzwh/ylAaFiIkJ1CkfduHureDQ76IY/N+Kbk5I6mTS8VixKcoPWUN2CL4/LkAyTkMWOV4vMsCCh+3/jCSGi1KcJFiSF2XilSCyjybJrE7bmGZRXNaNvVF9otyEzGfmZ8N/BYzlIcYjcdE18qW9Hex/Gb+mbJ6/CFpe+8Mk89A6jvHYZ4KBB8eIjxp2TnYb3f5KjboMwk5mC97aJtaunCqazoBh5sFJ29GFmSKDg+vEzxrZe2ix6R2RNy5JOFlc63izR+NfQFfiefhf2bhexNnVfmkuivRcflUvD6Phhmey4quroWpGePdsF6QzY6tS03V0iXOlLhyMjGXt3iOhpOn78U+4vlzWt0wbIOrxdKtR6qb05+ugZMtB5qFr2jUwOC2190vBOqSBtfiEr+49IsugvIU8Ur+SlwJG0Cvt2inh7oOTkGRz+S/XqVydk88VA+YNZeP1xoR/i0mB1HLiG31p9LLRLOGnYmBUoabqorJAtskh2/bIyVnlFvoUVx4oYfPCUSHEESuo78HWV9I5wjwcHKmVXf+DX4hy8sHn+4O+ZMGBBQm1Jg19I84EKSVa8847sknW/rHEo38jD8IVSWhTvWRP4c8yDujZZqF1oa/6VzxUEEOx6CF0D+LU5aFtFLtVWp7lgvaaErLucwu67G/KNPPz8mAwLDoHpc8S7dr5cOH/nr7SbsRY/o9V0ynO1Egh2u2pyslDGcVu2MomjuiXocdgzjNZuM7aoFbUNg4dmcUh09qP2QnCNyuqkueyIWh2pC+7eTl9QHppI7MwvtN+eku6xhVY+240Tjea3A5TmtSx4ZJFXh06ZzOfM4pC4Mqy20rSmzCvdg/i0YjLjlCZtUdvPjknSM6+QP+QV+WbO1qJ2pbRH3lc2j5e1bdhzWA66sahnEhL915Qe0jaHULJD/uh27uFK4WjHJXDuMt76Tm7JQbFLbEgNJKmUif7TgaN/y6Yu452VCXPDN/DJUZmbgZ0PiLwMxET7f8H5HlQ1yaoz8O7NTJuzLdJFsjvuwfEGuiSlm7QjjLNjyK3WgrHxKV9D9qxqsgMaO+mS9hhQNpwQpyJF74h62hgSW7ZQeUky7FaXZu8T0geZgUxH4OY4OvvQpbOwaHO2UHlpHYE5zIXcFh8sMA7GwTgYB+NgHIzjDsGh20dJeWfjEMtsdNjCYGN1nDpqcSaKGJ81QUmHB6M39DVTHNiRLxwrYLdpHmF0D8q6NpUQRTwOSjpL89W5pG6SCBi8qeJ9uUVXrI64U0RaIirrpdVELJ8sG7OgYyF8x7QwIjJb9CAlNMQiO3bQpKA5YnjDXiITEwbRdbaA4kwSkTpZyHFb9GTni6l3NHTd7rllHEg9UoUVXX3hG1TC4mcIwop/SZCRjHe3ibuTrHL63BUcrJAzX6RZjpMlOkq95WAdC5J7U9XLDZERO7KdSE2wPOZlrwOtNRGAg3YN4ZE4eyTg4Jzl9hELVhbhWxctTv5CeYJj4b7De+wShtzUAhO2SHGUYwfjYByMg3EwDsbBOBgH42AcjIOFcTAOxsE4GAfjYByMI1zyvwADAB+0/jiGSV4MAAAAAElFTkSuQmCC"

/***/ }),

/***/ "C:\\Users\\DELL\\Documents\\HBuilderProjects\\work\\store\\index.js":
/*!********************************************************************!*\
  !*** C:/Users/DELL/Documents/HBuilderProjects/work/store/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
_vue.default.use(_vuex.default);
var store = new _vuex.default.Store({
  state: {
    uid: '',
    history: [] },

  //切记：Vuex中store数据改变的唯一方法就是mutation！
  mutations: {
    changeUid: function changeUid(state, item) {
      state.uid = item;
    },
    changeHistory: function changeHistory(state, item) {
      state.history = item;
    } } });var _default =



store;exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map