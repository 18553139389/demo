"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _functional = require("../utils/functional");

var _use = (0, _utils.use)('loading'),
    sfc = _use[0],
    bem = _use[1];

var DEFAULT_COLOR = '#c9c9c9';

function Loading(h, props, slots, ctx) {
  var color = props.color,
      size = props.size,
      type = props.type;
  var colorType = color === 'white' || color === 'black' ? color : '';
  var style = {
    color: color === 'black' ? DEFAULT_COLOR : color,
    width: size,
    height: size
  };
  var Spin = [];

  if (type === 'spinner') {
    for (var i = 0; i < 12; i++) {
      Spin.push(h("i"));
    }
  }

  var Circular = type === 'circular' && h("svg", {
    "class": bem('circular'),
    "attrs": {
      "viewBox": "25 25 50 50"
    }
  }, [h("circle", {
    "attrs": {
      "cx": "50",
      "cy": "50",
      "r": "20",
      "fill": "none"
    }
  })]);
  return h("div", (0, _babelHelperVueJsxMergeProps["default"])([{
    "class": bem([type, colorType]),
    "style": style
  }, (0, _functional.inherit)(ctx, true)]), [h("span", {
    "class": bem('spinner', type)
  }, [Spin, Circular])]);
}

Loading.props = {
  size: String,
  type: {
    type: String,
    "default": 'circular'
  },
  color: {
    type: String,
    "default": DEFAULT_COLOR
  }
};

var _default = sfc(Loading);

exports["default"] = _default;