"use strict";

exports.__esModule = true;
exports.FindParentMixin = void 0;

/**
 * find parent component by name
 */
var FindParentMixin = {
  data: function data() {
    return {
      parent: null
    };
  },
  methods: {
    findParent: function findParent(name) {
      var parent = this.$parent;

      while (parent) {
        if (parent.$options.name === name) {
          this.parent = parent;
          break;
        }

        parent = parent.$parent;
      }
    }
  }
};
exports.FindParentMixin = FindParentMixin;