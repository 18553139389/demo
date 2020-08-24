"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _utils = require("../utils");

var _icon = _interopRequireDefault(require("../icon"));

var _info = _interopRequireDefault(require("../info"));

var _router = require("../utils/router");

var _use = (0, _utils.use)('tabbar-item'),
    sfc = _use[0],
    bem = _use[1];

var _default = sfc({
  props: (0, _extends2["default"])({}, _router.routeProps, {
    icon: String,
    dot: Boolean,
    info: [String, Number]
  }),
  data: function data() {
    return {
      active: false
    };
  },
  beforeCreate: function beforeCreate() {
    this.$parent.items.push(this);
  },
  destroyed: function destroyed() {
    this.$parent.items.splice(this.$parent.items.indexOf(this), 1);
  },
  methods: {
    onClick: function onClick(event) {
      this.$parent.onChange(this.$parent.items.indexOf(this));
      this.$emit('click', event);
      (0, _router.route)(this.$router, this);
    }
  },
  render: function render(h) {
    var icon = this.icon,
        slots = this.slots,
        active = this.active;
    var style = active ? {
      color: this.$parent.activeColor
    } : null;
    return h("div", {
      "class": bem({
        active: active
      }),
      "style": style,
      "on": {
        "click": this.onClick
      }
    }, [h("div", {
      "class": bem('icon', {
        dot: this.dot
      })
    }, [slots('icon', {
      active: active
    }) || icon && h(_icon["default"], {
      "attrs": {
        "name": icon
      }
    }), h(_info["default"], {
      "attrs": {
        "info": this.info
      }
    })]), h("div", {
      "class": bem('text')
    }, [slots('default', {
      active: active
    })])]);
  }
});

exports["default"] = _default;