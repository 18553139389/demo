<template>
  <div class="box">
    <van-swipe :autoplay="3000" indicator-color="white" :height="180">
      <van-swipe-item
        v-for="(image, index) in images"
        :key="index"
        @touchstart="touchstart"
        @touchend="touchend"
      >
        <img class="imgs" v-lazy="image.image" @click.stop="imgurl(image.type,image.content)">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
export default {
  props: {
    images: {
      type: Array,
      default: [],
      oneX: "",
      twoX: ""
    }
  },
  data() {
    return {};
  },

  methods: {
    touchstart(e) {
      this.oneX = e.changedTouches[0].clientX;
    },
    touchend(e) {
      this.twoX = e.changedTouches[0].clientX;
    },
    imgurl(type, txt) {
      if (this.oneX == this.twoX) {
        //当滑动距离等于0时触发点击事件
        window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
        console.log(type, txt);
        if (type == 0) {
          this.$router.push({
            name: "Fuwen",
            params: {
              id: txt
            }
          });
        } else if (type == 1) {
          this.$router.push({
            name: "shop_detailfirst",
            params: {
              id: txt
            }
          });
        } else {
          this.$router.push({
            name: "goods_detailsx",
            params: {
              id: txt
            }
          });
        }
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.imgs {
  width: 100%;
  touch-action: none;
  height: 100%;
}
</style>
