"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _functional = require("../utils/functional");

var _button = _interopRequireDefault(require("../button"));

var _use = (0, _utils.use)('submit-bar'),
    sfc = _use[0],
    bem = _use[1],
    t = _use[2];

function SubmitBar(h, props, slots, ctx) {
  var tip = props.tip,
      price = props.price;
  var hasPrice = typeof price === 'number';
  return h("div", (0, _babelHelperVueJsxMergeProps["default"])([{
    "class": bem({
      'safe-area-inset-bottom': props.safeAreaInsetBottom
    })
  }, (0, _functional.inherit)(ctx)]), [slots.top && slots.top(), (slots.tip || tip) && h("div", {
    "class": bem('tip')
  }, [tip, slots.tip && slots.tip()]), h("div", {
    "class": bem('bar')
  }, [slots["default"] && slots["default"](), h("div", {
    "class": bem('text')
  }, [hasPrice && [h("span", [props.label || t('label')]), h("span", {
    "class": bem('price')
  }, [props.currency + " " + (price / 100).toFixed(props.decimalLength)])]]), h(_button["default"], {
    "attrs": {
      "square": true,
      "size": "large",
      "type": props.buttonType,
      "loading": props.loading,
      "disabled": props.disabled,
      "text": props.loading ? '' : props.buttonText
    },
    "on": {
      "click": function click() {
        (0, _functional.emit)(ctx, 'submit');
      }
    }
  })])]);
}

SubmitBar.props = {
  tip: String,
  label: String,
  loading: Boolean,
  disabled: Boolean,
  buttonText: String,
  safeAreaInsetBottom: Boolean,
  price: {
    type: Number,
    "default": null
  },
  decimalLength: {
    type: Number,
    "default": 2
  },
  currency: {
    type: String,
    "default": '¥'
  },
  buttonType: {
    type: String,
    "default": 'danger'
  }
};

var _default = sfc(SubmitBar);

exports["default"] = _default;