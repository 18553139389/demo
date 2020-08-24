"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _functional = require("../utils/functional");

var _router = require("../utils/router");

var _loading = _interopRequireDefault(require("../loading"));

var _use = (0, _utils.use)('button'),
    sfc = _use[0],
    bem = _use[1];

function Button(h, props, slots, ctx) {
  var tag = props.tag,
      type = props.type,
      disabled = props.disabled,
      loading = props.loading,
      hairline = props.hairline,
      loadingText = props.loadingText;

  var onClick = function onClick(event) {
    if (!loading && !disabled) {
      (0, _functional.emit)(ctx, 'click', event);
      (0, _router.functionalRoute)(ctx);
    }
  };

  var onTouchstart = function onTouchstart(event) {
    (0, _functional.emit)(ctx, 'touchstart', event);
  };

  var classes = [bem([type, props.size, {
    loading: loading,
    disabled: disabled,
    hairline: hairline,
    block: props.block,
    plain: props.plain,
    round: props.round,
    square: props.square,
    'bottom-action': props.bottomAction
  }]), {
    'van-hairline--surround': hairline
  }];
  return h(tag, (0, _babelHelperVueJsxMergeProps["default"])([{
    "class": classes,
    "attrs": {
      "type": props.nativeType,
      "disabled": disabled
    },
    "on": {
      "click": onClick,
      "touchstart": onTouchstart
    }
  }, (0, _functional.inherit)(ctx)]), [loading ? [h(_loading["default"], {
    "attrs": {
      "size": props.loadingSize,
      "color": type === 'default' ? undefined : ''
    }
  }), loadingText && h("span", {
    "class": bem('loading-text')
  }, [loadingText])] : h("span", {
    "class": bem('text')
  }, [slots["default"] ? slots["default"]() : props.text])]);
}

Button.props = (0, _extends2["default"])({}, _router.routeProps, {
  text: String,
  block: Boolean,
  plain: Boolean,
  round: Boolean,
  square: Boolean,
  loading: Boolean,
  hairline: Boolean,
  disabled: Boolean,
  nativeType: String,
  loadingText: String,
  bottomAction: Boolean,
  tag: {
    type: String,
    "default": 'button'
  },
  type: {
    type: String,
    "default": 'default'
  },
  size: {
    type: String,
    "default": 'normal'
  },
  loadingSize: {
    type: String,
    "default": '20px'
  }
});

var _default = sfc(Button);

exports["default"] = _default;