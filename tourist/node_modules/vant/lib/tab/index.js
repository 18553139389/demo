"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _utils = require("../utils");

var _findParent = require("../mixins/find-parent");

/* eslint-disable object-shorthand */
var _use = (0, _utils.use)('tab'),
    sfc = _use[0],
    bem = _use[1];

var _default = sfc({
  mixins: [_findParent.FindParentMixin],
  props: {
    title: String,
    disabled: Boolean
  },
  data: function data() {
    return {
      inited: false
    };
  },
  computed: {
    index: function index() {
      return this.parent.tabs.indexOf(this);
    },
    selected: function selected() {
      return this.index === this.parent.curActive;
    }
  },
  watch: {
    'parent.curActive': function parentCurActive() {
      this.inited = this.inited || this.selected;
    },
    title: function title() {
      this.parent.setLine();
    }
  },
  created: function created() {
    this.findParent('van-tabs');
  },
  mounted: function mounted() {
    var tabs = this.parent.tabs;
    var index = this.parent.slots().indexOf(this.$vnode);
    tabs.splice(index === -1 ? tabs.length : index, 0, this);

    if (this.slots('title')) {
      this.parent.renderTitle(this.$refs.title, this.index);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.parent.tabs.splice(this.index, 1);
  },
  render: function render(h) {
    var slots = this.slots;
    var shouldRender = this.inited || !this.parent.lazyRender;
    return h("div", {
      "directives": [{
        name: "show",
        value: this.selected || this.parent.animated
      }],
      "class": bem('pane')
    }, [shouldRender ? slots() : h(), slots('title') && h("div", {
      "ref": "title"
    }, [slots('title')])]);
  }
});

exports["default"] = _default;