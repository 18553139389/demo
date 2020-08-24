import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";

/* eslint-disable prefer-spread */
import { use } from '../utils';
import { emit, inherit } from '../utils/functional';
import { preventDefault } from '../utils/event';
import Icon from '../icon'; // Types

var _use = use('rate'),
    sfc = _use[0],
    bem = _use[1];

function getRateStatus(value, index, allowHalf) {
  if (value >= index) {
    return 'full';
  }

  if (value + 0.5 >= index && allowHalf) {
    return 'half';
  }

  return 'void';
}

function Rate(h, props, slots, ctx) {
  var icon = props.icon,
      size = props.size,
      color = props.color,
      voidIcon = props.voidIcon,
      readonly = props.readonly,
      disabled = props.disabled,
      voidColor = props.voidColor,
      disabledColor = props.disabledColor;
  var list = [];

  for (var i = 1; i <= props.count; i++) {
    list.push(getRateStatus(props.value, i, props.allowHalf));
  }

  function onSelect(index) {
    if (!disabled && !readonly) {
      emit(ctx, 'input', index);
      emit(ctx, 'change', index);
    }
  }

  function onTouchMove(event) {
    if (readonly || disabled || !document.elementFromPoint) {
      return;
    }

    preventDefault(event);
    var _event$touches$ = event.touches[0],
        clientX = _event$touches$.clientX,
        clientY = _event$touches$.clientY;
    var target = document.elementFromPoint(clientX, clientY);

    if (target && target.dataset) {
      var score = target.dataset.score;
      /* istanbul ignore else */

      if (score) {
        onSelect(+score);
      }
    }
  }

  function renderStar(status, index) {
    var isFull = status === 'full';
    var isVoid = status === 'void';
    return h("div", {
      "key": index,
      "class": bem('item')
    }, [h(Icon, {
      "attrs": {
        "name": isFull ? icon : voidIcon,
        "size": size + "px",
        "data-score": index + 1,
        "color": disabled ? disabledColor : isFull ? color : voidColor
      },
      "class": bem('icon'),
      "on": {
        "click": function click() {
          onSelect(index + 1);
        }
      }
    }), props.allowHalf && h(Icon, {
      "attrs": {
        "name": isVoid ? voidIcon : icon,
        "size": size + "px",
        "data-score": index + 0.5,
        "color": disabled ? disabledColor : isVoid ? voidColor : color
      },
      "class": bem('icon', 'half'),
      "on": {
        "click": function click() {
          onSelect(index + 0.5);
        }
      }
    })]);
  }

  return h("div", _mergeJSXProps([{
    "class": bem()
  }, inherit(ctx), {
    "on": {
      "touchmove": onTouchMove
    }
  }]), [list.map(function (status, index) {
    return renderStar(status, index);
  })]);
}

Rate.props = {
  value: Number,
  readonly: Boolean,
  disabled: Boolean,
  allowHalf: Boolean,
  size: {
    type: Number,
    "default": 20
  },
  icon: {
    type: String,
    "default": 'star'
  },
  voidIcon: {
    type: String,
    "default": 'star-o'
  },
  color: {
    type: String,
    "default": '#ffd21e'
  },
  voidColor: {
    type: String,
    "default": '#c7c7c7'
  },
  disabledColor: {
    type: String,
    "default": '#bdbdbd'
  },
  count: {
    type: Number,
    "default": 5
  }
};
export default sfc(Rate);