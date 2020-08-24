"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _functional = require("../utils/functional");

var _popup = require("../mixins/popup");

var _icon = _interopRequireDefault(require("../icon"));

var _loading = _interopRequireDefault(require("../loading"));

var _popup2 = _interopRequireDefault(require("../popup"));

var _use = (0, _utils.use)('actionsheet'),
    sfc = _use[0],
    bem = _use[1];

function Actionsheet(h, props, slots, ctx) {
  var title = props.title,
      cancelText = props.cancelText;

  var onCancel = function onCancel() {
    (0, _functional.emit)(ctx, 'input', false);
    (0, _functional.emit)(ctx, 'cancel');
  };

  var Header = function Header() {
    return h("div", {
      "class": [bem('header'), 'van-hairline--top-bottom']
    }, [title, h(_icon["default"], {
      "attrs": {
        "name": "close"
      },
      "class": bem('close'),
      "on": {
        "click": onCancel
      }
    })]);
  };

  var Option = function Option(item, index) {
    return h("div", {
      "class": [bem('item', {
        disabled: item.disabled || item.loading
      }), item.className, 'van-hairline--top'],
      "on": {
        "click": function click(event) {
          event.stopPropagation();

          if (!item.disabled && !item.loading) {
            if (item.callback) {
              item.callback(item);
            }

            (0, _functional.emit)(ctx, 'select', item, index);
          }
        }
      }
    }, [item.loading ? h(_loading["default"], {
      "class": bem('loading'),
      "attrs": {
        "size": "20px"
      }
    }) : [h("span", {
      "class": bem('name')
    }, [item.name]), item.subname && h("span", {
      "class": bem('subname')
    }, [item.subname])]]);
  };

  return h(_popup2["default"], (0, _babelHelperVueJsxMergeProps["default"])([{
    "class": bem({
      'safe-area-inset-bottom': props.safeAreaInsetBottom
    }),
    "attrs": {
      "value": props.value,
      "position": "bottom",
      "overlay": props.overlay,
      "lazyRender": props.lazyRender,
      "getContainer": props.getContainer,
      "closeOnClickOverlay": props.closeOnClickOverlay
    },
    "on": {
      "input": function input(value) {
        (0, _functional.emit)(ctx, 'input', value);
      }
    }
  }, (0, _functional.inherit)(ctx)]), [title ? Header() : props.actions.map(Option), slots["default"] && h("div", {
    "class": bem('content')
  }, [slots["default"]()]), cancelText && h("div", {
    "class": bem('cancel'),
    "on": {
      "click": onCancel
    }
  }, [cancelText])]);
}

Actionsheet.props = (0, _extends2["default"])({}, _popup.PopupMixin.props, {
  title: String,
  actions: Array,
  cancelText: String,
  safeAreaInsetBottom: Boolean,
  overlay: {
    type: Boolean,
    "default": true
  },
  closeOnClickOverlay: {
    type: Boolean,
    "default": true
  }
});

var _default = sfc(Actionsheet);

exports["default"] = _default;