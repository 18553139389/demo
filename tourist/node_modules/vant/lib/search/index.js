"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _utils = require("../utils");

var _functional = require("../utils/functional");

var _event = require("../utils/event");

var _field = _interopRequireDefault(require("../field"));

var _use = (0, _utils.use)('search'),
    sfc = _use[0],
    bem = _use[1],
    t = _use[2];

function Search(h, props, slots, ctx) {
  var Label = function Label() {
    if (!slots.label && !props.label) {
      return null;
    }

    return h("div", {
      "class": bem('label')
    }, [slots.label ? slots.label() : props.label]);
  };

  var Action = function Action() {
    if (!props.showAction) {
      return null;
    }

    var onCancel = function onCancel() {
      (0, _functional.emit)(ctx, 'input', '');
      (0, _functional.emit)(ctx, 'cancel');
    };

    return h("div", {
      "class": bem('action')
    }, [slots.action ? slots.action() : h("div", {
      "on": {
        "click": onCancel
      }
    }, [t('cancel')])]);
  };

  var fieldData = {
    attrs: ctx.data.attrs,
    on: (0, _extends2["default"])({}, ctx.listeners, {
      input: function input(value) {
        (0, _functional.emit)(ctx, 'input', value);
      },
      keypress: function keypress(event) {
        // press enter
        if (event.keyCode === 13) {
          (0, _event.preventDefault)(event);
          (0, _functional.emit)(ctx, 'search', props.value);
        }

        (0, _functional.emit)(ctx, 'keypress', event);
      }
    })
  };
  var inheritData = (0, _functional.inherit)(ctx);
  delete inheritData.attrs;
  return h("div", (0, _babelHelperVueJsxMergeProps["default"])([{
    "class": bem({
      'show-action': props.showAction
    }),
    "style": {
      background: props.background
    }
  }, inheritData]), [h("div", {
    "class": bem('content', props.shape)
  }, [Label(), h(_field["default"], (0, _babelHelperVueJsxMergeProps["default"])([{
    "attrs": {
      "clearable": true,
      "type": "search",
      "value": props.value,
      "border": false,
      "leftIcon": "search"
    },
    "scopedSlots": {
      'left-icon': slots['left-icon']
    }
  }, fieldData]))]), Action()]);
}

Search.props = {
  value: String,
  label: String,
  showAction: Boolean,
  shape: {
    type: String,
    "default": 'square'
  },
  background: {
    type: String,
    "default": '#fff'
  }
};

var _default = sfc(Search);

exports["default"] = _default;