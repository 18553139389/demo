"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _button = _interopRequireDefault(require("../button"));

var _functional = require("../utils/functional");

var _router = require("../utils/router");

var _use = (0, _utils.use)('goods-action-big-btn'),
    sfc = _use[0],
    bem = _use[1];

function GoodsActionBigBtn(h, props, slots, ctx) {
  var onClick = function onClick(event) {
    (0, _functional.emit)(ctx, 'click', event);
    (0, _router.functionalRoute)(ctx);
  };

  return h(_button["default"], (0, _babelHelperVueJsxMergeProps["default"])([{
    "attrs": {
      "square": true,
      "size": "large",
      "loading": props.loading,
      "disabled": props.disabled,
      "type": props.primary ? 'danger' : 'warning'
    },
    "class": bem(),
    "on": {
      "click": onClick
    }
  }, (0, _functional.inherit)(ctx)]), [slots["default"] ? slots["default"]() : props.text]);
}

GoodsActionBigBtn.props = (0, _extends2["default"])({}, _router.routeProps, {
  text: String,
  primary: Boolean,
  loading: Boolean,
  disabled: Boolean
});

var _default = sfc(GoodsActionBigBtn);

exports["default"] = _default;