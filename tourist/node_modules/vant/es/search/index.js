import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _extends from "@babel/runtime/helpers/esm/extends";
import { use } from '../utils';
import { inherit, emit } from '../utils/functional';
import { preventDefault } from '../utils/event';
import Field from '../field'; // Types

var _use = use('search'),
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
      emit(ctx, 'input', '');
      emit(ctx, 'cancel');
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
    on: _extends({}, ctx.listeners, {
      input: function input(value) {
        emit(ctx, 'input', value);
      },
      keypress: function keypress(event) {
        // press enter
        if (event.keyCode === 13) {
          preventDefault(event);
          emit(ctx, 'search', props.value);
        }

        emit(ctx, 'keypress', event);
      }
    })
  };
  var inheritData = inherit(ctx);
  delete inheritData.attrs;
  return h("div", _mergeJSXProps2([{
    "class": bem({
      'show-action': props.showAction
    }),
    "style": {
      background: props.background
    }
  }, inheritData]), [h("div", {
    "class": bem('content', props.shape)
  }, [Label(), h(Field, _mergeJSXProps([{
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
export default sfc(Search);